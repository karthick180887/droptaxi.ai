#!/usr/bin/env python3
"""
add_districts_to_nextjs.py
==========================
Bring district data that currently lives only in
scripts/generate_districts_data.py (the dead Python static-HTML pipeline)
into the live Next.js data sources:

  - lib/route-data.ts CITY_DATA  -> for each new district, append a CityInfo
  - lib/pages.ts city slug array -> append `drop-taxi-in-{slug}` for each

Skips any district whose slug already exists in CITY_DATA.

Idempotent: re-running with no new sources is a no-op.
"""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
PY_SRC = ROOT / "scripts" / "generate_districts_data.py"
ROUTE_DATA_TS = ROOT / "lib" / "route-data.ts"
PAGES_TS = ROOT / "lib" / "pages.ts"

SPECIALS = {"cmc": "CMC", "ooty": "Ooty", "coonoor": "Coonoor", "rs": "RS", "kk": "KK", "ntr": "NTR"}


def title(slug: str) -> str:
    return " ".join(SPECIALS.get(w.lower(), w.capitalize()) for w in slug.split("-") if w)


# ---------------------------------------------------------------------------
# Parse Python district tuples
# ---------------------------------------------------------------------------
def parse_python_districts(src: str) -> list[dict]:
    """Extract each (slug, name, apt_code, apt_dist, pickups, routes, nearby, popularFor) tuple."""
    # Match tuples like ("ariyalur", "Ariyalur", "TRZ", 55, "..", "..", "..", "..")
    # Tuples span multiple lines, so use DOTALL.
    pattern = re.compile(
        r'\(\s*"([a-z][a-z0-9-]+)"\s*,\s*'         # slug
        r'"([^"]+)"\s*,\s*'                         # name
        r'"([A-Z]{3})"\s*,\s*'                      # airport code
        r'(\d+)\s*,\s*'                             # airport distance
        r'"([^"]+)"\s*,\s*'                         # pickup points (pipe-separated)
        r'"([^"]+)"\s*,\s*'                         # routes (pipe-separated, colon-delimited)
        r'"([^"]+)"\s*,\s*'                         # nearby districts
        r'"([^"]+)"\s*\)',                          # popular for
        re.DOTALL,
    )
    out = []
    for m in pattern.finditer(src):
        slug, name, apt, apt_dist, pickups, routes_raw, nearby, popular = m.groups()
        # Parse routes: "Trichy:trichy:30:0.5|Thanjavur:thanjavur:60:1.5|..."
        routes = []
        for r in routes_raw.split("|"):
            parts = r.split(":")
            if len(parts) < 2:
                continue
            routes.append({"name": parts[0], "toSlug": parts[1]})
        out.append({
            "slug": slug,
            "name": name,
            "airportCode": apt,
            "airportDistance": int(apt_dist),
            "pickupPoints": pickups.split("|"),
            "routes": routes,
            "nearby": nearby.split("|"),
            "popularFor": popular,
        })
    return out


# ---------------------------------------------------------------------------
# Parse existing CITY_DATA keys from lib/route-data.ts
# ---------------------------------------------------------------------------
def existing_city_keys(rd: str) -> set[str]:
    m = re.search(r"export const CITY_DATA: Record<[^=]*=\s*\{", rd)
    if not m:
        raise RuntimeError("Could not locate CITY_DATA in route-data.ts")
    start = m.end()
    depth = 1
    i = start
    while i < len(rd) and depth > 0:
        if rd[i] == "{":
            depth += 1
        elif rd[i] == "}":
            depth -= 1
        i += 1
    block = rd[start : i - 1]
    # Top-level keys: lines starting with `  word:` at indent level 2
    return set(re.findall(r"^\s*([a-z][a-z0-9-]*):\s*\{", block, re.MULTILINE))


# ---------------------------------------------------------------------------
# Parse existing route page slugs to validate route hrefs
# ---------------------------------------------------------------------------
def existing_route_slugs(pages_src: str) -> set[str]:
    return set(re.findall(r'"([a-z][a-z0-9-]+-to-[a-z][a-z0-9-]+-(?:taxi|cab))"', pages_src))


# ---------------------------------------------------------------------------
# Build TypeScript CityInfo entry for one new district
# ---------------------------------------------------------------------------
def make_entry(d: dict, available_routes: set[str]) -> str:
    """Generate the TS code block for a CityInfo entry."""
    slug = d["slug"]
    name = d["name"]

    pickup_lines = ", ".join(f'"{p}"' for p in d["pickupPoints"])

    # popularRoutes: only include routes that actually exist as Next.js pages
    routes_entries = []
    for r in d["routes"]:
        # Try both directions: {slug}-to-{toSlug}-taxi and {toSlug}-to-{slug}-taxi
        fwd = f"{slug}-to-{r['toSlug']}-taxi"
        rev = f"{r['toSlug']}-to-{slug}-taxi"
        fwd_cab = f"{slug}-to-{r['toSlug']}-cab"
        for cand in (fwd, fwd_cab):
            if cand in available_routes:
                routes_entries.append(f'{{ name: "{name} to {r["name"]}", href: "/{cand}" }}')
                break
    routes_block = ",\n      ".join(routes_entries) if routes_entries else ""

    desc = f"{name} is known for {d['popularFor'].lower()}. DropTaxi provides one way drop taxi and outstation cab service from {name} to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010."

    # Quote keys containing hyphens (TS object-literal syntax requires it)
    key = f'"{slug}"' if "-" in slug else slug
    lines = [
        f"  {key}: {{",
        f"    pickupPoints: [{pickup_lines}],",
        f"    popularRoutes: [",
    ]
    if routes_block:
        lines.append(f"      {routes_block}")
    lines.append("    ],")
    lines.append(f'    description: "{desc}",')
    lines.append("  },")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Insert into CITY_DATA (just before closing `};` of the Record)
# ---------------------------------------------------------------------------
def insert_into_city_data(rd: str, block: str) -> str:
    m = re.search(r"export const CITY_DATA: Record<[^=]*=\s*\{", rd)
    if not m:
        raise RuntimeError("CITY_DATA not found")
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
    insertion = "\n\n  // ── Tier-2 districts (auto-generated from Python pipeline) ──\n" + block + "\n"
    return rd[:close] + insertion + rd[close:]


# ---------------------------------------------------------------------------
# Insert slugs into the city array in lib/pages.ts
# ---------------------------------------------------------------------------
def insert_city_slugs(pages_src: str, new_slugs: list[str]) -> str:
    # Find the `// ── City / drop-taxi pages` block and the `].map((slug)` close
    header = re.search(r"//\s*── City\s*/\s*drop-taxi pages.*?\n\s*\.\.\.\[", pages_src, re.DOTALL)
    if not header:
        raise RuntimeError("City slug array not found in pages.ts")
    start = header.end()
    close = re.search(r"\n(\s*)\]\.map\(\(slug\)\s*=>\s*makeCityPage", pages_src[start:])
    if not close:
        raise RuntimeError("Could not find close of city slug array")
    insert_at = start + close.start()
    indent = close.group(1) + "  "
    addition = "\n" + "\n".join(f'{indent}"drop-taxi-in-{s}",' for s in new_slugs)
    return pages_src[:insert_at] + addition + pages_src[insert_at:]


def main():
    py = PY_SRC.read_text(encoding="utf-8")
    rd = ROUTE_DATA_TS.read_text(encoding="utf-8")
    pages_src = PAGES_TS.read_text(encoding="utf-8")

    districts = parse_python_districts(py)
    print(f"Parsed {len(districts)} districts from Python pipeline")

    existing = existing_city_keys(rd)
    print(f"CITY_DATA already has {len(existing)} keys")

    new_districts = [d for d in districts if d["slug"] not in existing]
    print(f"Net new districts to add: {len(new_districts)}")

    if not new_districts:
        print("Nothing to add.")
        return

    available_routes = existing_route_slugs(pages_src)
    print(f"Route inventory available for popularRoutes wiring: {len(available_routes)}")

    entries = [make_entry(d, available_routes) for d in new_districts]
    block = "\n".join(entries)
    new_rd = insert_into_city_data(rd, block)

    new_slugs = [d["slug"] for d in new_districts]
    new_pages = insert_city_slugs(pages_src, new_slugs)

    ROUTE_DATA_TS.write_text(new_rd, encoding="utf-8", newline="\n")
    PAGES_TS.write_text(new_pages, encoding="utf-8", newline="\n")

    print(f"\nWrote {ROUTE_DATA_TS}")
    print(f"Wrote {PAGES_TS}")
    print(f"Added {len(new_slugs)} new districts to CITY_DATA + pages.ts")


if __name__ == "__main__":
    main()
