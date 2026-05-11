#!/usr/bin/env python3
"""
add_district_routes.py
======================
For every tier-2 district in scripts/generate_districts_data.py, mine the
"popular routes" field and add district -> major-hub routes to ROUTE_DATA
+ the route slug array in lib/pages.ts.

Only routes where the destination is one of ~12 major hubs are added,
to keep the page-count expansion focused on high-search-volume pairs.
After running, re-run scripts/add_reverse_routes.py to auto-fill the
reverse direction for each new route.

Idempotent: skips any (from, to) pair that already exists in ROUTE_DATA.
"""
from __future__ import annotations

import os
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
PY_SRC = ROOT / "scripts" / "generate_districts_data.py"
ROUTE_DATA_TS = ROOT / "lib" / "route-data.ts"
PAGES_TS = ROOT / "lib" / "pages.ts"

# Major hubs - destinations worth adding from any tier-2 district origin
MAJOR_HUBS = {
    "chennai", "bangalore", "mysore", "coimbatore", "madurai", "trichy",
    "salem", "hyderabad", "cochin", "trivandrum", "mangalore", "tirupati",
    "vijayawada", "ernakulam", "kochi", "pondicherry",
}

# Minimum distance to be worth a dedicated page (below this, the page
# would just show the 130 km minimum-billing fare anyway)
MIN_KM = 40

SPECIALS = {"cmc": "CMC", "ooty": "Ooty", "coonoor": "Coonoor", "rs": "RS"}


def title(slug: str) -> str:
    return " ".join(SPECIALS.get(w.lower(), w.capitalize()) for w in slug.split("-") if w)


def parse_python_districts(src: str):
    """Yield (slug, name, popularFor, [(to_name, to_slug, km, hours), ...])."""
    pattern = re.compile(
        r'\(\s*"([a-z][a-z0-9-]+)"\s*,\s*'         # slug
        r'"([^"]+)"\s*,\s*'                         # name
        r'"[A-Z]{3}"\s*,\s*\d+\s*,\s*'              # airport (ignored)
        r'"[^"]+"\s*,\s*'                           # pickups (ignored)
        r'"([^"]+)"\s*,\s*'                         # routes
        r'"[^"]+"\s*,\s*'                           # nearby (ignored)
        r'"([^"]+)"\s*\)',                          # popularFor
        re.DOTALL,
    )
    for m in pattern.finditer(src):
        slug, name, routes_raw, popular = m.groups()
        routes = []
        for r in routes_raw.split("|"):
            parts = r.split(":")
            if len(parts) >= 4:
                to_name, to_slug, km, hrs = parts[0], parts[1], int(parts[2]), float(parts[3])
                routes.append((to_name, to_slug, km, hrs))
        yield slug, name, popular, routes


def parse_existing_routes(rd: str) -> set[tuple[str, str]]:
    return set(
        (m.group(1), m.group(2))
        for m in re.finditer(
            r'"([a-z][a-z0-9-]+?)-to-([a-z][a-z0-9-]+?)-(?:taxi|cab)"\s*:\s*\{',
            rd,
        )
    )


def duration_str(hrs: float) -> str:
    if hrs == int(hrs):
        return f"{int(hrs)}–{int(hrs)+1} hours"
    rounded = round(hrs * 2) / 2
    low = max(1, int(rounded))
    high = low + 1
    return f"{low}–{high} hours"


def toll_estimate(km: int) -> str:
    if km < 60:
        return "INR 50–100"
    if km < 150:
        return "INR 100–250"
    if km < 300:
        return "INR 200–400"
    if km < 500:
        return "INR 350–550"
    return "INR 500–800"


def highway_hint(fr: str, to: str) -> str:
    """Rough highway designation based on known TN/KA/AP corridors."""
    # NH44 spine (Bangalore-Salem-Coimbatore-Madurai-Trichy)
    nh44_cities = {"bangalore", "salem", "coimbatore", "madurai", "trichy", "krishnagiri", "dharmapuri", "namakkal", "dindigul"}
    if fr in nh44_cities and to in nh44_cities:
        return "NH44"
    # NH48 / NH16 east coast
    nh48 = {"chennai", "vellore", "bangalore", "hosur"}
    if fr in nh48 and to in nh48:
        return "NH48"
    # NH16 AP coast
    nh16 = {"chennai", "vijayawada", "ongole", "nellore", "hyderabad", "guntur"}
    if fr in nh16 and to in nh16:
        return "NH16"
    # NH85 Kerala
    nh85 = {"cochin", "munnar", "kumily", "thekkady", "alleppey"}
    if fr in nh85 or to in nh85:
        return "NH85"
    return ""  # blank means "Highway: ..." line is omitted


def build_description(fr_name: str, to_name: str, km: int, popular_for: str) -> str:
    base = (
        f"Travel from {fr_name} to {to_name} on a direct one-way drop taxi route covering {km} km."
    )
    if popular_for:
        base += f" {fr_name} is known for {popular_for.lower()}."
    base += (
        f" DropTaxi provides sedan from INR 13/km with verified drivers, fixed fare, and 24x7 booking on 78100 46010."
    )
    return base


def make_route_entry(fr_slug: str, to_slug: str, km: int, hrs: float, popular_for: str, fr_name: str, to_name: str) -> str:
    hwy = highway_hint(fr_slug, to_slug)
    toll = toll_estimate(km)
    desc = build_description(fr_name, to_name, km, popular_for).replace('"', '\\"')
    lines = [f'  "{fr_slug}-to-{to_slug}-taxi": {{']
    lines.append(f'    distance: {km}, duration: "{duration_str(hrs)}",')
    if hwy:
        lines.append(f'    highway: "{hwy}",')
    lines.append(f'    tollEstimate: "{toll}",')
    lines.append(f'    description: "{desc}",')
    lines.append("  },")
    return "\n".join(lines)


def insert_into_route_data(rd: str, block: str) -> str:
    m = re.search(r"export const ROUTE_DATA: Record<[^=]*=\s*\{", rd)
    if not m:
        raise RuntimeError("ROUTE_DATA not found")
    start = m.end()
    depth = 1
    i = start
    while i < len(rd) and depth > 0:
        if rd[i] == "{":
            depth += 1
        elif rd[i] == "}":
            depth -= 1
        i += 1
    close = i - 1
    insertion = "\n\n  // ── Tier-2 district routes (origins from mined district data) ──\n" + block + "\n"
    return rd[:close] + insertion + rd[close:]


def insert_slugs(pages_src: str, new_slugs: list[str]) -> str:
    """Insert new route slugs just before the existing route .map() close."""
    m = re.search(r"\n(\s*)\]\.map\(\(slug\)\s*=>\s*\{\s*\n\s*const \[from, to\]", pages_src)
    if not m:
        raise RuntimeError("Could not find route slug array close in pages.ts")
    insert_at = m.start()
    indent = m.group(1) + "  "
    addition = "\n" + "\n".join(f'{indent}"{s}",' for s in new_slugs)
    return pages_src[:insert_at] + addition + pages_src[insert_at:]


def main():
    py = PY_SRC.read_text(encoding="utf-8")
    rd = ROUTE_DATA_TS.read_text(encoding="utf-8")
    pages_src = PAGES_TS.read_text(encoding="utf-8")

    existing = parse_existing_routes(rd)
    print(f"Existing routes: {len(existing)}")

    entries: list[str] = []
    new_slugs: list[str] = []
    seen_in_batch: set[tuple[str, str]] = set()

    candidates = 0
    filtered_short = 0
    filtered_not_hub = 0
    filtered_exists = 0
    filtered_dup = 0

    for fr_slug, fr_name, popular_for, routes in parse_python_districts(py):
        for to_name, to_slug, km, hrs in routes:
            candidates += 1
            if to_slug not in MAJOR_HUBS:
                filtered_not_hub += 1
                continue
            if km < MIN_KM:
                filtered_short += 1
                continue
            if (fr_slug, to_slug) in existing:
                filtered_exists += 1
                continue
            if (fr_slug, to_slug) in seen_in_batch:
                filtered_dup += 1
                continue
            seen_in_batch.add((fr_slug, to_slug))
            entries.append(make_route_entry(fr_slug, to_slug, km, hrs, popular_for, fr_name, to_name))
            new_slugs.append(f"{fr_slug}-to-{to_slug}-taxi")

    print(f"Candidates examined:       {candidates}")
    print(f"  - skipped: short (<{MIN_KM}km): {filtered_short}")
    print(f"  - skipped: not a major hub:    {filtered_not_hub}")
    print(f"  - skipped: already exists:     {filtered_exists}")
    print(f"  - skipped: dup in batch:       {filtered_dup}")
    print(f"  Net new routes to add:         {len(entries)}")

    if not entries:
        return

    block = "\n".join(entries)
    new_rd = insert_into_route_data(rd, block)
    new_pages = insert_slugs(pages_src, new_slugs)
    ROUTE_DATA_TS.write_text(new_rd, encoding="utf-8", newline="\n")
    PAGES_TS.write_text(new_pages, encoding="utf-8", newline="\n")
    print("Wrote lib/route-data.ts and lib/pages.ts")


if __name__ == "__main__":
    main()
