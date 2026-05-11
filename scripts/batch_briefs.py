#!/usr/bin/env python3
"""
batch_briefs.py
================
Generate publish-ready SEO content briefs for every page on droptaxi.ai
by calling the Anthropic Claude API with the master prompt
(docs/master-seo-prompt.md) and per-page variable injection.

Output: one markdown file per page at docs/briefs/{slug}.md.

USAGE
-----
  1. Install dependency:
       pip install anthropic>=0.40
  2. Export your API key:
       set ANTHROPIC_API_KEY=sk-ant-...        (Windows cmd)
       $env:ANTHROPIC_API_KEY = "sk-ant-..."   (PowerShell)
       export ANTHROPIC_API_KEY=sk-ant-...     (bash)
  3. Dry-run to see the queue:
       python scripts/batch_briefs.py --dry-run
  4. Generate 5 briefs (smoke test):
       python scripts/batch_briefs.py --limit 5
  5. Full batch (all ~445 pages, ~1 hour, ~₹3,000-5,000 on Sonnet):
       python scripts/batch_briefs.py
  6. Higher-quality with Opus (slower, more expensive):
       python scripts/batch_briefs.py --model claude-opus-4-7

RESUME
------
Already-generated briefs (file exists in docs/briefs/) are skipped on
re-run. To regenerate a single page, delete its file first.

CONCURRENCY & RATE LIMITS
-------------------------
Default: 5 concurrent workers, 1.5s stagger. Adjust via --workers.
Anthropic default tier limits to ~50 RPM; we cap at ~40 RPM to leave
headroom for retries.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import os
import re
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

# anthropic SDK is imported lazily inside generate_one() so --dry-run works
# without it (the queue builder only reads local files).
def _require_anthropic():
    try:
        from anthropic import Anthropic, RateLimitError, APIError, APITimeoutError  # noqa: F401
        return Anthropic, RateLimitError, APIError, APITimeoutError
    except ImportError:
        print("ERROR: anthropic package not installed. Run: pip install anthropic>=0.40", file=sys.stderr)
        sys.exit(1)

ROOT = Path(__file__).parent.parent
PROMPT_PATH = ROOT / "docs" / "master-seo-prompt.md"
BRIEF_DIR = ROOT / "docs" / "briefs"
PAGES_TS = ROOT / "lib" / "pages.ts"
ROUTE_DATA_TS = ROOT / "lib" / "route-data.ts"

# ---------------------------------------------------------------------------
# Title-case helper (mirrors the one in lib/pages.ts so derived names match)
# ---------------------------------------------------------------------------
SPECIALS = {
    "cmc": "CMC",
    "ooty": "Ooty",
    "coonoor": "Coonoor",
    "rs": "RS",
    "kk": "KK",
    "omr": "OMR",
    "ecr": "ECR",
    "ntr": "NTR",
}


def title_case(slug: str) -> str:
    return " ".join(SPECIALS.get(w.lower(), w.capitalize()) for w in slug.split("-") if w)


# ---------------------------------------------------------------------------
# Queue construction — parse lib/pages.ts to enumerate every page slug
# ---------------------------------------------------------------------------
@dataclass
class BriefJob:
    slug: str
    page_type: str
    primary_keyword: str
    secondary_keywords: list[str] = field(default_factory=list)
    url_slug: str = ""
    search_intent: str = "Transactional"
    origin_city: str = "N/A"
    destination_city: str = "N/A"

    def variables_block(self) -> dict[str, str]:
        return {
            "PRIMARY_KEYWORD": self.primary_keyword,
            "SECONDARY_KEYWORDS": "; ".join(self.secondary_keywords),
            "URL_SLUG": self.url_slug,
            "PAGE_TYPE": self.page_type,
            "SEARCH_INTENT": self.search_intent,
            "ORIGIN_CITY": self.origin_city,
            "DESTINATION_CITY": self.destination_city,
        }


def route_keywords(from_city: str, to_city: str) -> tuple[str, list[str]]:
    """Generate primary + 15 secondary keywords for a route page."""
    fr = title_case(from_city)
    to = title_case(to_city)
    base = f"{fr.lower()} to {to.lower()}"
    primary = f"{base} drop taxi"
    secondary = [
        f"{base} one way taxi",
        f"{base} oneway taxi",
        f"{base} taxi",
        f"{base} cab",
        f"{base} taxi fare",
        f"{base} taxi booking",
        f"{base} cab booking",
        f"{base} outstation taxi",
        f"{base} call taxi",
        f"{base} innova",
        f"{base} sedan",
        f"cheap {base} taxi",
        f"best {base} drop taxi",
        f"{base} one way drop taxi",
        f"{base} taxi distance",
        f"{base} cab price",
    ]
    return primary, secondary


def city_keywords(city: str) -> tuple[str, list[str]]:
    c = title_case(city).lower()
    primary = f"drop taxi in {c}"
    secondary = [
        f"{c} drop taxi",
        f"{c} cab service",
        f"{c} one way taxi",
        f"{c} outstation taxi",
        f"{c} call taxi",
        f"drop taxi {c}",
        f"cab booking {c}",
        f"taxi service {c}",
        f"{c} airport taxi",
    ]
    return primary, secondary


def call_taxi_keywords(city: str) -> tuple[str, list[str]]:
    c = title_case(city).lower()
    primary = f"call taxi in {c}"
    secondary = [
        f"{c} call taxi",
        f"{c} taxi number",
        f"local taxi {c}",
        f"{c} cab booking",
        f"{c} taxi near me",
        f"{c} drop taxi",
    ]
    return primary, secondary


def airport_keywords(city: str) -> tuple[str, list[str]]:
    c = title_case(city).lower()
    primary = f"{c} airport taxi"
    secondary = [
        f"airport taxi in {c}",
        f"{c} airport pickup taxi",
        f"{c} airport drop taxi",
        f"{c} airport cab",
        f"taxi to {c} airport",
        f"{c} airport transfer",
    ]
    return primary, secondary


def parse_route_slug(slug: str) -> Optional[tuple[str, str]]:
    """Return (from, to) for a slug like 'chennai-to-madurai-taxi'."""
    m = re.match(r"^(.+)-to-(.+)-(taxi|cab)$", slug)
    if not m:
        return None
    return m.group(1), m.group(2)


def parse_city_slug(slug: str) -> Optional[str]:
    if slug.startswith("drop-taxi-in-"):
        return slug[len("drop-taxi-in-") :]
    if slug.startswith("drop-taxi-") and not slug.startswith("drop-taxi-in-"):
        return slug[len("drop-taxi-") :]
    return None


def parse_call_taxi_slug(slug: str) -> Optional[str]:
    if slug.startswith("call-taxi-in-"):
        return slug[len("call-taxi-in-") :]
    if slug.startswith("call-taxi-") and not slug.startswith("call-taxi-in-"):
        return slug[len("call-taxi-") :]
    return None


def parse_airport_slug(slug: str) -> Optional[str]:
    if slug.startswith("airport-taxi-in-"):
        return slug[len("airport-taxi-in-") :]
    if slug.startswith("airport-taxi-"):
        return slug[len("airport-taxi-") :]
    if slug.endswith("-airport-taxi"):
        return slug[: -len("-airport-taxi")]
    return None


def extract_slug_array(src: str, comment_marker: str) -> list[str]:
    """Find a `// ── ...{comment_marker}...` block followed by a string array.

    The marker is a substring search of the comment-line text after the box-
    drawing dashes — so 'City' will match '// ── City / drop-taxi pages (53)'.
    """
    # Iterate comment-block headers and pick those whose text contains the marker
    header_re = re.compile(r"//\s*──\s*([^\n─]+?)\s*─+", re.MULTILINE)
    slugs: list[str] = []
    for m in header_re.finditer(src):
        header_text = m.group(1)
        if comment_marker.lower() not in header_text.lower():
            continue
        # From the end of the header line, look for the next `...[ ... ].map`
        # block (the slug array) before the next comment header
        after = src[m.end():]
        next_header = header_re.search(after)
        scope_end = next_header.start() if next_header else len(after)
        block = after[:scope_end]
        # Each section may contain one or more `...[ ... ].map(...)` arrays
        for arr_m in re.finditer(r"\.\.\.\[(.*?)\]\.map\(", block, re.DOTALL):
            inner = arr_m.group(1)
            slugs.extend(re.findall(r'"([a-z][a-z0-9-]+)"', inner))
    return slugs


def build_queue() -> list[BriefJob]:
    """Scan lib/pages.ts for all slug arrays and derive BriefJobs."""
    pages = PAGES_TS.read_text(encoding="utf-8")
    queue: list[BriefJob] = []

    # Route pages (largest group)
    route_slugs = extract_slug_array(pages, "Route pages")
    for slug in route_slugs:
        parts = parse_route_slug(slug)
        if not parts:
            continue
        fr, to = parts
        primary, secondary = route_keywords(fr, to)
        queue.append(
            BriefJob(
                slug=slug,
                page_type="Route landing page",
                primary_keyword=primary,
                secondary_keywords=secondary,
                url_slug=f"/{slug}",
                search_intent="Transactional",
                origin_city=title_case(fr),
                destination_city=title_case(to),
            )
        )

    # City pages (covers "City / drop-taxi pages" and "Extra city-type pages")
    city_slugs = extract_slug_array(pages, "City") + extract_slug_array(pages, "Extra city")
    # Dedupe while preserving order
    city_slugs = list(dict.fromkeys(city_slugs))
    for slug in city_slugs:
        city = parse_city_slug(slug)
        if not city:
            continue
        primary, secondary = city_keywords(city)
        queue.append(
            BriefJob(
                slug=slug,
                page_type="District landing page",
                primary_keyword=primary,
                secondary_keywords=secondary,
                url_slug=f"/{slug}",
                search_intent="Commercial",
                origin_city=title_case(city),
                destination_city="N/A",
            )
        )

    # Call-taxi pages
    ct_slugs = extract_slug_array(pages, "Call taxi") + extract_slug_array(pages, "Call-taxi")
    for slug in ct_slugs:
        city = parse_call_taxi_slug(slug)
        if not city:
            continue
        primary, secondary = call_taxi_keywords(city)
        queue.append(
            BriefJob(
                slug=slug,
                page_type="Call-taxi page",
                primary_keyword=primary,
                secondary_keywords=secondary,
                url_slug=f"/{slug}",
                search_intent="Local",
                origin_city=title_case(city),
                destination_city="N/A",
            )
        )

    # Airport pages
    ap_slugs = extract_slug_array(pages, "Airport")
    for slug in ap_slugs:
        city = parse_airport_slug(slug)
        if not city:
            continue
        primary, secondary = airport_keywords(city)
        queue.append(
            BriefJob(
                slug=slug,
                page_type="Airport page",
                primary_keyword=primary,
                secondary_keywords=secondary,
                url_slug=f"/{slug}",
                search_intent="Transactional",
                origin_city=title_case(city),
                destination_city="N/A",
            )
        )

    return queue


# ---------------------------------------------------------------------------
# Prompt construction — split master prompt into system + user for caching
# ---------------------------------------------------------------------------
def load_split_prompt() -> tuple[str, str]:
    """Return (system_prompt, user_prompt_template).

    System prompt = static portion (PART 2-4 of the master prompt, no
    variables). User prompt template = the variables block (PART 1) only.
    Reconstruction at call time fills the template; the system prompt is
    cached by Anthropic across requests.
    """
    raw = PROMPT_PATH.read_text(encoding="utf-8")
    # The master prompt is wrapped with --- separators. Pull the inner body.
    # Strip the markdown wrapper if present.
    body = raw
    # Locate the strategist role declaration as the system-message start
    start = body.find("You are a senior SEO strategist")
    if start == -1:
        raise RuntimeError("Could not locate the strategist role line in master prompt")
    body = body[start:]
    # Truncate at the appendix / quick-reference section
    for marker in ("## QUICK-REFERENCE", "QUICK-REFERENCE:", "## BATCH AUTOMATION", "## DROPTAXI.AI-SPECIFIC"):
        idx = body.find(marker)
        if idx != -1:
            body = body[:idx].rstrip()
            break

    # Split body into pre-variables (system) and variables block (user template)
    # PART 1 variables block starts with the line PART 1 — INPUT VARIABLES
    part1_start = body.find("PART 1 — INPUT VARIABLES")
    part1_end = body.find("PART 2 — BUSINESS CONTEXT")
    if part1_start == -1 or part1_end == -1:
        raise RuntimeError("Could not split master prompt into system/user")

    intro = body[:part1_start].rstrip()
    user_template = body[part1_start:part1_end].strip()
    system_rest = body[part1_end:].strip()

    system_prompt = intro + "\n\n" + system_rest
    return system_prompt, user_template


def fill_variables(template: str, variables: dict[str, str]) -> str:
    for k, v in variables.items():
        template = template.replace("{{" + k + "}}", v)
    return template


# ---------------------------------------------------------------------------
# API call (with retry)
# ---------------------------------------------------------------------------
def generate_one(
    client,
    model: str,
    system_prompt: str,
    user_template: str,
    job: BriefJob,
    max_retries: int = 3,
) -> Optional[str]:
    _, RateLimitError, APIError, APITimeoutError = _require_anthropic()
    user_msg = fill_variables(user_template, job.variables_block())

    attempt = 0
    backoff = 4.0
    while attempt < max_retries:
        try:
            response = client.messages.create(
                model=model,
                max_tokens=8192,
                system=[
                    {
                        "type": "text",
                        "text": system_prompt,
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                messages=[{"role": "user", "content": user_msg}],
            )
            # response.content is a list of TextBlock; concatenate text blocks
            text_parts = []
            for block in response.content:
                if hasattr(block, "text"):
                    text_parts.append(block.text)
            return "".join(text_parts)
        except RateLimitError:
            wait = backoff * (2**attempt)
            print(f"  [{job.slug}] rate-limited, sleeping {wait:.0f}s...", flush=True)
            time.sleep(wait)
            attempt += 1
        except APITimeoutError:
            print(f"  [{job.slug}] timeout, retrying ({attempt + 1}/{max_retries})...", flush=True)
            time.sleep(backoff * (attempt + 1))
            attempt += 1
        except APIError as e:
            print(f"  [{job.slug}] API error: {e}; retrying...", flush=True)
            time.sleep(backoff)
            attempt += 1
    return None


# ---------------------------------------------------------------------------
# Main loop
# ---------------------------------------------------------------------------
def write_brief(slug: str, content: str) -> None:
    BRIEF_DIR.mkdir(parents=True, exist_ok=True)
    (BRIEF_DIR / f"{slug}.md").write_text(content, encoding="utf-8", newline="\n")


def already_done(slug: str) -> bool:
    return (BRIEF_DIR / f"{slug}.md").exists()


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--model", default=os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-4-6"),
                        help="Anthropic model ID (default: claude-sonnet-4-6)")
    parser.add_argument("--limit", type=int, default=0,
                        help="Generate at most N briefs (0 = unlimited)")
    parser.add_argument("--workers", type=int, default=5,
                        help="Concurrent API workers (default: 5)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show the queue and skip API calls")
    parser.add_argument("--only", default=None,
                        help="Generate only the slug given (e.g. chennai-to-madurai-taxi)")
    args = parser.parse_args()

    queue = build_queue()
    print(f"Discovered {len(queue)} pages in lib/pages.ts")

    if args.only:
        queue = [j for j in queue if j.slug == args.only]
        if not queue:
            print(f"  no page found with slug {args.only}")
            return

    # Skip already-generated
    pending = [j for j in queue if not already_done(j.slug)]
    print(f"  {len(queue) - len(pending)} already have briefs (skipping)")
    print(f"  {len(pending)} briefs to generate")

    if args.limit > 0:
        pending = pending[: args.limit]
        print(f"  limited to {len(pending)} this run")

    if args.dry_run:
        print("\nDry run — first 10 jobs:")
        for j in pending[:10]:
            print(f"  [{j.page_type}] {j.slug}  PK={j.primary_keyword}")
        return

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    system_prompt, user_template = load_split_prompt()
    Anthropic, *_ = _require_anthropic()
    client = Anthropic()
    print(f"\nModel: {args.model}")
    print(f"Workers: {args.workers}")
    print(f"System prompt size: {len(system_prompt):,} chars (cached after first request)")
    print()

    done = 0
    failed = 0

    def task(job: BriefJob) -> tuple[BriefJob, Optional[str]]:
        out = generate_one(client, args.model, system_prompt, user_template, job)
        return job, out

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(task, j): j for j in pending}
        for i, fut in enumerate(concurrent.futures.as_completed(futures), 1):
            job, content = fut.result()
            if content:
                write_brief(job.slug, content)
                done += 1
                print(f"[{i}/{len(pending)}] OK {job.slug} ({len(content):,} chars)", flush=True)
            else:
                failed += 1
                print(f"[{i}/{len(pending)}] FAIL {job.slug}", flush=True)

    print(f"\nDone. {done} written, {failed} failed. Briefs at: {BRIEF_DIR}")


if __name__ == "__main__":
    main()
