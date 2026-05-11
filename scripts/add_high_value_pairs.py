#!/usr/bin/env python3
"""
add_high_value_pairs.py
=======================
Adds hand-curated high-value city pairs that are not yet in ROUTE_DATA.
Each pair has verified distance/duration/highway based on standard road
references. Both directions are added; the reverse is generated with the
same data and a mirrored description.

Run after add_reverse_routes.py.
"""
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SPECIALS = {"cmc": "CMC", "ooty": "Ooty", "coonoor": "Coonoor", "rs": "RS"}

def title(slug: str) -> str:
    return " ".join(SPECIALS.get(w.lower(), w.capitalize()) for w in slug.split("-") if w)


# (from, to, distance_km, duration, highway, toll_range, description_seed)
NEW_PAIRS = [
    # ---- Tier-1 cross-state major-city pairs (highest search volume) ----
    ("chennai", "hyderabad", 625, "10–11 hours", "NH16", "INR 600–900",
     "The Chennai to Hyderabad corridor along NH16 (formerly NH5) passes through Nellore and Ongole. This is a long-haul route best suited for overnight or split-day travel. Multiple food and rest stops at Nellore, Ongole, and Vijayawada keep the journey manageable."),
    ("chennai", "cochin", 690, "11–12 hours", "NH544 / NH85", "INR 600–850",
     "Travel from Chennai to Cochin via Coimbatore and Palakkad along NH544 then NH85 across the Western Ghats. Cross into Kerala past Walayar checkpoint. A long but scenic ride best done with an early-morning start."),
    ("chennai", "trivandrum", 745, "12–13 hours", "NH44 / NH66", "INR 650–900",
     "The Chennai to Trivandrum drive is one of the longest South Indian routes. Travel via Madurai, Tirunelveli, and Kanyakumari district along NH44 then turn west on NH66. Recommend a two-day journey with an overnight halt at Madurai."),
    ("bangalore", "cochin", 565, "9–10 hours", "NH544 / NH85", "INR 500–700",
     "Drive from Bangalore to Cochin via Salem, Coimbatore, and Palakkad. The route crosses the Western Ghats through dense forest near Walayar. Best to start before 5 AM to clear Bangalore city traffic."),
    ("bangalore", "trivandrum", 715, "12 hours", "NH544 / NH66", "INR 600–850",
     "Travel from Bangalore to Trivandrum via Coimbatore and Trichur. The Western Ghats stretch through Palakkad gap offers cool mountain views. A long route that benefits from a Coimbatore halt for fresh meals."),
    ("bangalore", "goa", 560, "10 hours", "NH48 / NH66", "INR 500–700",
     "The Bangalore to Goa route via Hubli and Belgaum runs through the Deccan Plateau. The final stretch via NH66 along the Konkan coast is scenic but winding. Suitable for weekend beach getaways."),
    ("coimbatore", "trivandrum", 425, "7–8 hours", "NH544 / NH66", "INR 400–600",
     "Coimbatore to Trivandrum cuts through the Palakkad gap of the Western Ghats. The Kerala stretch via Thrissur and Kollam runs along the coast for the final leg. Cool weather most of the year."),
    ("madurai", "trivandrum", 305, "5–6 hours", "NH44 / NH66", "INR 250–400",
     "Travel from Madurai to Trivandrum via Tirunelveli and the western coastal road. Cross into Kerala past Aralvaimozhi gap. Convenient for connecting from Madurai Meenakshi Temple to Padmanabhaswamy Temple."),
    ("madurai", "cochin", 360, "6–7 hours", "NH85", "INR 300–500",
     "Drive from Madurai to Cochin via Theni and Kumily through the Periyar Tiger Reserve. The route crosses the Western Ghats with frequent wildlife sightings near Munnar. Spice plantations dot the descent into Kerala."),
    ("madurai", "tirupati", 600, "10 hours", "NH44 / NH69", "INR 550–750",
     "The Madurai to Tirupati pilgrimage route via Trichy, Vellore, and Chittoor is popular with families combining Meenakshi Temple and Tirumala darshan. Best to start before dawn for evening Tirupati arrival."),
    ("hyderabad", "tirupati", 565, "9–10 hours", "NH44 / NH69", "INR 500–700",
     "Hyderabad to Tirupati passes through Kurnool and Chittoor along NH44. A common pilgrimage corridor with frequent fuel and food stops. Early departure recommended to reach Tirumala before darshan queues lengthen."),
    ("hyderabad", "chennai", 625, "10–11 hours", "NH16", "INR 600–900",
     "The Hyderabad to Chennai stretch via Nellore is the longest south-bound run from Hyderabad. NH16 is a 4-lane expressway with smooth driving. Plan for a two-driver crew or overnight halt."),
    ("hyderabad", "coimbatore", 880, "14–15 hours", "NH44", "INR 750–1000",
     "A long inter-state run from Hyderabad to Coimbatore via Bangalore and Salem. Best done as a two-day journey with overnight stop at Bangalore or Salem. NH44 is well-maintained throughout."),
    ("chennai", "mysore", 475, "8–9 hours", "NH48 / NH275", "INR 450–600",
     "The Chennai to Mysore route goes via Bangalore on NH48 then onto the Bengaluru-Mysuru Expressway. The final stretch on the new expressway is one of India's smoothest highway sections."),
    ("chennai", "goa", 905, "15–16 hours", "NH48 / NH66", "INR 850–1100",
     "Chennai to Goa is one of the longest pan-South-India routes. Plan as a two-day journey via Bangalore and the Konkan coast. The final stretch via NH66 hugs the Arabian Sea."),

    # ---- Tier-2 South Indian routes ----
    ("salem", "bangalore", 215, "4 hours", "NH44", "INR 200–350",
     "The Salem to Bangalore route via Krishnagiri is a smooth NH44 drive through Tamil Nadu's western districts. Cross the Karnataka border near Hosur. Popular for industrial visitors and IT-corridor commuters."),
    ("salem", "tirupati", 415, "7 hours", "NH44 / NH69", "INR 400–550",
     "Drive from Salem to Tirupati via Krishnagiri, Vellore, and Chittoor. The route bypasses Chennai entirely. Many pilgrim families prefer this for direct Tirumala darshan access."),
    ("trichy", "bangalore", 345, "6–7 hours", "NH44", "INR 350–500",
     "Travel from Trichy to Bangalore through Salem and Krishnagiri along NH44. Cross into Karnataka past Hosur. A long but well-paved highway journey with multiple toll-plaza stops."),
    ("trichy", "trivandrum", 480, "8 hours", "NH44 / NH66", "INR 450–600",
     "Trichy to Trivandrum via Madurai and Tirunelveli ends on the western coastal road. Suitable for connecting Rock Fort Temple with Padmanabhaswamy Temple visits."),
    ("trichy", "hyderabad", 950, "15 hours", "NH44", "INR 850–1100",
     "An extended overland route from Trichy to Hyderabad via Bangalore. Plan a two-day journey with overnight stop at Bangalore or Anantapur. NH44 is the spine for the entire route."),
    ("madurai", "hyderabad", 1050, "16–17 hours", "NH44", "INR 950–1200",
     "Madurai to Hyderabad is a major pan-south overland run via Bangalore. Typically done as a 2-day journey with an overnight rest. NH44 covers the full route. Suitable for relocations and bulk family travel."),
    ("kanyakumari", "chennai", 705, "11–12 hours", "NH44", "INR 650–900",
     "The Kanyakumari to Chennai route runs the length of Tamil Nadu via Madurai and Trichy along NH44. Popular for pilgrim-tour return legs. Best to depart Kanyakumari in mid-morning to reach Chennai by night."),
    ("kanyakumari", "cochin", 320, "6 hours", "NH66", "INR 300–450",
     "Travel from Kanyakumari to Cochin along the Kerala coast on NH66. The route passes through Trivandrum, Kollam, and Alleppey backwaters. Beaches and lagoons line most of the highway."),
    ("vijayawada", "tirupati", 380, "6–7 hours", "NH16 / NH69", "INR 350–500",
     "Drive from Vijayawada to Tirupati via Ongole and Chittoor. The route ends with a climb to Tirumala via the seven hills. A pilgrim favorite for Andhra Pradesh families."),
    ("vijayawada", "chennai", 440, "7–8 hours", "NH16", "INR 400–550",
     "The Vijayawada to Chennai stretch along NH16 is a smooth expressway drive through Ongole and Nellore. AP coast road with toll-plaza density. Suitable for business and family travel."),
    ("vijayawada", "bangalore", 600, "10 hours", "NH44", "INR 550–750",
     "Travel from Vijayawada to Bangalore via Kurnool and Anantapur on NH44. Long but well-maintained highway. A common Telangana-Andhra to Karnataka relocation route."),

    # ---- Airport-specific cross-pairs ----
    ("chennai-airport", "tirupati", 145, "3 hours", "NH716", "INR 150–250",
     "Direct airport-to-Tirumala route — no city transit needed. From Chennai Airport, head north on NH716 via Tiruttani. Ideal for fliers continuing straight to darshan."),
    ("chennai-airport", "pondicherry", 145, "3 hours", "NH32 / ECR", "INR 100–200",
     "Skip the Chennai city transit — direct from MAA airport to Pondicherry via NH32. The route bypasses central Chennai entirely. Recommended for short Puducherry weekend trips."),
    ("chennai-airport", "bangalore", 355, "6–7 hours", "NH48", "INR 400–600",
     "Direct outstation transfer from MAA to Bangalore via NH48 through Vellore. Skip the airport-to-city hop entirely. Common for fliers continuing to Bangalore for work or family."),
    ("bangalore-airport", "mysore", 200, "3.5–4 hours", "NH275", "INR 200–300",
     "From BLR Kempegowda Airport directly to Mysore via the Bengaluru-Mysuru Expressway. Bypass Bangalore city completely. A smooth highway transfer for weekend Mysore Palace visitors."),
    ("bangalore-airport", "coorg", 285, "5–6 hours", "NH275 / SH88", "INR 250–400",
     "Direct from BLR to Coorg through Mysore and Kushalnagar. Skip Bangalore city traffic entirely. Ideal for honeymooners and weekend hill-station getaways landing at BLR."),
]


def parse_existing(rd: str) -> set:
    pattern = re.compile(r'"([a-z0-9-]+?)-to-([a-z0-9-]+?)-(taxi|cab)"\s*:', re.MULTILINE)
    return {(m.group(1), m.group(2)) for m in pattern.finditer(rd)}


def make_entry(fr: str, to: str, dist: int, dur: str, hwy: str, toll: str, desc: str) -> str:
    desc_escaped = desc.replace('"', '\\"')
    return (
        f'  "{fr}-to-{to}-taxi": {{\n'
        f'    distance: {dist}, duration: "{dur}",\n'
        f'    highway: "{hwy}",\n'
        f'    tollEstimate: "{toll}",\n'
        f'    description: "{desc_escaped}",\n'
        f'  }},'
    )


def reverse_desc(fr: str, to: str, dist: int, dur: str, hwy: str, orig: str) -> str:
    base = (
        f"Travel from {title(to)} to {title(fr)} along the same {dist} km route, "
        f"approximately {dur} by road via {hwy}. "
    )
    if "." in orig:
        tail = orig.split(".", 1)[1].strip()
        if tail:
            base += tail + " "
    base += f"Early morning departures from {title(to)} avoid peak city traffic and afternoon glare."
    return base


def insert_into_route_data(rd: str, entries_block: str) -> str:
    m = re.search(r'export const ROUTE_DATA: Record<[^=]*=\s*\{', rd)
    if not m:
        raise RuntimeError("Could not find ROUTE_DATA declaration")
    start = m.end()
    depth = 1
    i = start
    while i < len(rd) and depth > 0:
        if rd[i] == "{": depth += 1
        elif rd[i] == "}": depth -= 1
        i += 1
    close_brace_idx = i - 1
    insertion = "\n\n  // ── Hand-curated high-value pairs ─────────────────────────\n" + entries_block + "\n"
    return rd[:close_brace_idx] + insertion + rd[close_brace_idx:]


def insert_slugs(pages_src: str, new_slugs: list) -> str:
    m = re.search(r"\n(\s*)\]\.map\(\(slug\)\s*=>\s*\{\s*\n\s*const \[from, to\]", pages_src)
    if not m:
        raise RuntimeError("Could not find route slug array close in pages.ts")
    insert_at = m.start()
    indent = m.group(1) + "  "
    addition = "\n" + "\n".join(f'{indent}"{s}",' for s in new_slugs)
    return pages_src[:insert_at] + addition + pages_src[insert_at:]


def main():
    rd_path = os.path.join(BASE, "lib", "route-data.ts")
    pages_path = os.path.join(BASE, "lib", "pages.ts")

    with open(rd_path, "r", encoding="utf-8") as f:
        rd = f.read()
    with open(pages_path, "r", encoding="utf-8") as f:
        pages_src = f.read()

    existing = parse_existing(rd)
    print(f"Existing routes: {len(existing)}")

    entries = []
    new_slugs = []
    skipped = 0
    for fr, to, dist, dur, hwy, toll, desc in NEW_PAIRS:
        # Forward
        if (fr, to) not in existing:
            entries.append(make_entry(fr, to, dist, dur, hwy, toll, desc))
            new_slugs.append(f"{fr}-to-{to}-taxi")
        else:
            skipped += 1
        # Reverse
        if (to, fr) not in existing:
            entries.append(make_entry(to, fr, dist, dur, hwy, toll, reverse_desc(fr, to, dist, dur, hwy, desc)))
            new_slugs.append(f"{to}-to-{fr}-taxi")
        else:
            skipped += 1

    if not entries:
        print("All curated pairs already exist — nothing to add.")
        return

    print(f"Adding {len(entries)} new entries ({skipped} already existed)")

    entries_block = "\n".join(entries)
    new_rd = insert_into_route_data(rd, entries_block)
    new_pages = insert_slugs(pages_src, new_slugs)

    with open(rd_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_rd)
    with open(pages_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_pages)

    print(f"Wrote {rd_path}")
    print(f"Wrote {pages_path}")
    print(f"Added {len(new_slugs)} new route slugs")


if __name__ == "__main__":
    main()
