#!/usr/bin/env python3
"""
add_reverse_routes.py
=====================
Scans lib/route-data.ts for one-way route entries (A -> B) and generates the
reverse entries (B -> A) with mirrored distance/duration/highway/toll data and
a context-aware description. Inserts the new entries into ROUTE_DATA and adds
the new slugs to the route page array in lib/pages.ts.

Run once. Idempotent: skips any reverse that already exists.
"""
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---- Title-case (matches the helper in lib/pages.ts) ---------------------
SPECIALS = {
    "cmc": "CMC",
    "ooty": "Ooty",
    "coonoor": "Coonoor",
    "rs": "RS",
    "kk": "KK",
    "omr": "OMR",
    "ecr": "ECR",
}


def title(slug: str) -> str:
    return " ".join(
        SPECIALS.get(w.lower(), w.capitalize())
        for w in slug.split("-")
        if w
    )


# ---- Parse existing routes ----------------------------------------------
def parse_routes(rd: str):
    """Returns dict[(from, to)] -> {kind, distance, duration, highway, toll, desc}."""
    pattern = re.compile(
        r'"([a-z0-9-]+?)-to-([a-z0-9-]+?)-(taxi|cab)"\s*:\s*\{'
        r'\s*distance:\s*(\d+),\s*duration:\s*"([^"]+)"'
        r'(?:,\s*highway:\s*"([^"]+)")?'
        r'(?:,\s*tollEstimate:\s*"([^"]+)")?'
        r'(?:,\s*description:\s*"([^"]*?)")?'
        r'\s*,?\s*\}',
        re.DOTALL,
    )
    out = {}
    for m in pattern.finditer(rd):
        fr, to, kind, dist, dur, hwy, toll, desc = m.groups()
        out[(fr, to)] = {
            "kind": kind,
            "distance": int(dist),
            "duration": dur,
            "highway": hwy,
            "toll": toll,
            "desc": desc or "",
        }
    return out


def reverse_description(orig_from: str, orig_to: str, info: dict) -> str:
    """Build a description for the reverse direction."""
    fr, to = title(orig_to), title(orig_from)  # reverse-direction city names
    base = (
        f"Travel from {fr} to {to} along the same {info['distance']} km route, "
        f"approximately {info['duration']} by road"
    )
    if info["highway"]:
        base += f" via {info['highway']}"
    base += ". "
    # Append a snippet from the original description for route context if available
    orig = info["desc"]
    if orig:
        # Strip any sentence that starts with "Best to start" / "Ideal for" /
        # "Popular" — those are direction-agnostic and read fine in reverse.
        # Take everything after the first period to avoid duplicating the
        # "X to Y" lead-in from the original.
        if "." in orig:
            tail = orig.split(".", 1)[1].strip()
            if tail:
                base += tail
    base += f" Early morning departures from {fr} avoid both peak city traffic and afternoon glare."
    return base


def generate_reverse_entry(orig_from: str, orig_to: str, info: dict) -> str:
    """Return the multi-line TypeScript entry for the reverse route."""
    slug = f"{info_to_slug_part(orig_to)}-to-{info_to_slug_part(orig_from)}-{info['kind']}"
    lines = [f'  "{slug}": {{']
    lines.append(f'    distance: {info["distance"]}, duration: "{info["duration"]}",')
    if info["highway"]:
        lines.append(f'    highway: "{info["highway"]}",')
    if info["toll"]:
        lines.append(f'    tollEstimate: "{info["toll"]}",')
    desc = reverse_description(orig_from, orig_to, info)
    # Escape any embedded double quotes
    desc = desc.replace('"', '\\"')
    lines.append(f'    description: "{desc}",')
    lines.append("  },")
    return "\n".join(lines), slug


def info_to_slug_part(s: str) -> str:
    return s


# ---- Insert into lib/route-data.ts --------------------------------------
def insert_into_route_data(rd: str, entries_block: str) -> str:
    """Insert entries just before the closing `};` of ROUTE_DATA."""
    # ROUTE_DATA is the only Record we need to modify; CITY_DATA is below it.
    # Find ROUTE_DATA opening, then find its matching closing brace.
    m = re.search(r'export const ROUTE_DATA: Record<[^=]*=\s*\{', rd)
    if not m:
        raise RuntimeError("Could not find ROUTE_DATA declaration")
    start = m.end()
    # Walk the string tracking brace depth to find the matching close
    depth = 1
    i = start
    while i < len(rd) and depth > 0:
        if rd[i] == "{":
            depth += 1
        elif rd[i] == "}":
            depth -= 1
        i += 1
    if depth != 0:
        raise RuntimeError("Could not match ROUTE_DATA closing brace")
    close_brace_idx = i - 1  # index of the '}' that closes ROUTE_DATA
    insertion = "\n\n  // ── Reverse-direction routes (auto-generated) ─────────────\n" + entries_block + "\n"
    return rd[:close_brace_idx] + insertion + rd[close_brace_idx:]


# ---- Insert slugs into lib/pages.ts -------------------------------------
def insert_slugs_into_pages(pages_src: str, new_slugs: list) -> str:
    """Add new route slugs to the existing route array in pages.ts."""
    # Find the route-page slug array: starts with `...[` after the
    # "Route pages" comment and ends with `].map((slug) => {`.
    m = re.search(r"//\s*── Route pages.*?\n\s*\.\.\.\[", pages_src, re.DOTALL)
    if not m:
        # Fall back: look for the line just before the map() call
        m2 = re.search(r"(\s*)\]\.map\(\(slug\)\s*=>\s*\{\s*\n\s*const \[from, to\]", pages_src)
        if not m2:
            raise RuntimeError("Could not find route slug array in pages.ts")
        insert_at = m2.start(0)
        indent = m2.group(1)
    else:
        # Find the closing `]` of this array
        # Walk forward from m.end() looking for `].map`
        m2 = re.search(r"\n(\s*)\]\.map\(\(slug\)\s*=>\s*\{\s*\n\s*const \[from, to\]", pages_src[m.end():])
        if not m2:
            raise RuntimeError("Could not find closing `].map` of route slug array")
        insert_at = m.end() + m2.start()
        indent = m2.group(1) + "  "

    addition = "\n" + "\n".join(f'{indent}"{s}",' for s in new_slugs) + "\n  "
    return pages_src[:insert_at] + addition + pages_src[insert_at:]


# ---- Main ----------------------------------------------------------------
def main():
    rd_path = os.path.join(BASE, "lib", "route-data.ts")
    pages_path = os.path.join(BASE, "lib", "pages.ts")

    with open(rd_path, "r", encoding="utf-8") as f:
        rd = f.read()
    with open(pages_path, "r", encoding="utf-8") as f:
        pages = f.read()

    routes = parse_routes(rd)
    print(f"Parsed {len(routes)} existing routes")

    entries = []
    new_slugs = []
    for (fr, to), info in routes.items():
        if (to, fr) in routes:
            continue
        entry, slug = generate_reverse_entry(fr, to, info)
        entries.append(entry)
        new_slugs.append(slug)

    if not entries:
        print("No missing reverses — nothing to do.")
        return

    print(f"Generating {len(entries)} reverse-direction entries")

    entries_block = "\n".join(entries)
    new_rd = insert_into_route_data(rd, entries_block)
    new_pages = insert_slugs_into_pages(pages, new_slugs)

    with open(rd_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_rd)
    with open(pages_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_pages)

    print(f"Updated {rd_path}")
    print(f"Updated {pages_path}")
    print(f"Added {len(new_slugs)} new route slugs")


if __name__ == "__main__":
    main()
