#!/usr/bin/env python3
"""
Generate drop-taxi-in-{slug}.html district pages from JSON data + HTML template.
Also regenerates sitemap.xml and robots.txt with correct domain (droptaxi.ai).
"""
import json, os, glob, datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOMAIN = "https://droptaxi.ai"
TODAY = datetime.date.today().isoformat()

def load_file(path):
    with open(os.path.join(BASE_DIR, path), "r", encoding="utf-8") as f:
        return f.read()

def load_json(path):
    with open(os.path.join(BASE_DIR, path), "r", encoding="utf-8") as f:
        return json.load(f)

def calc_fares(distance_km):
    return {
        "sedan": distance_km * 13 + 300,
        "suv": distance_km * 19 + 400,
        "innova": distance_km * 21 + 400,
    }

def build_fare_table_rows(routes):
    rows = []
    for r in routes:
        f = calc_fares(r["distanceKm"])
        dur = r["durationHrs"]
        dur_str = f"{int(dur)}h" if dur == int(dur) else f"{dur}h"
        rows.append(
            f'              <tr>\n'
            f'                <td>{r["to"]}</td>\n'
            f'                <td>{r["distanceKm"]} km</td>\n'
            f'                <td>{dur_str}</td>\n'
            f'                <td>₹{f["sedan"]:,}</td>\n'
            f'                <td>₹{f["suv"]:,}</td>\n'
            f'                <td>₹{f["innova"]:,}</td>\n'
            f'              </tr>'
        )
    return "\n".join(rows)

def build_faq_html(faqs):
    items = []
    for faq in faqs:
        items.append(
            f'          <details class="faq-item">\n'
            f'            <summary>{faq["q"]}</summary>\n'
            f'            <p>{faq["a"]}</p>\n'
            f'          </details>'
        )
    return "\n".join(items)

def build_faq_schema(faqs):
    entities = []
    for faq in faqs:
        entities.append({
            "@type": "Question",
            "name": faq["q"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq["a"]
            }
        })
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": entities
    }
    return json.dumps(schema, indent=4, ensure_ascii=False)

def build_nearby_links(nearby_slugs, all_districts_by_slug):
    links = []
    for ns in nearby_slugs:
        if ns in all_districts_by_slug:
            d = all_districts_by_slug[ns]
            links.append(
                f'          <a href="drop-taxi-in-{d["slug"]}.html" class="nearby-card">'
                f'Drop Taxi in {d["name"]}</a>'
            )
    return "\n".join(links)

def build_airport_section(district):
    apt = district.get("nearestAirport", {})
    name = district["name"]
    if apt.get("distanceKm", 999) <= 30:
        title = f"Airport Taxi Service in {name}"
        content = (
            f'<p><strong>{apt["name"]} ({apt["code"]})</strong> is just {apt["distanceKm"]} km from {name} city centre. '
            f'DropTaxi provides reliable airport pickup and drop service from {name} to {apt["name"]} and vice versa. '
            f'Book an AC sedan, SUV, or Innova for a comfortable ride to or from the airport.</p>\n'
            f'<p>Whether you have an early morning flight or a late-night arrival, our verified drivers will be ready at your pickup point. '
            f'No surge pricing, no waiting &mdash; just call or WhatsApp for instant airport cab booking from {name}.</p>'
        )
    else:
        title = f"Nearest Airport to {name}"
        content = (
            f'<p>The nearest airport to {name} is <strong>{apt["name"]} ({apt["code"]})</strong>, located approximately {apt["distanceKm"]} km away. '
            f'DropTaxi offers comfortable one way taxi service from {name} to {apt["name"]} and return transfers from the airport to {name}.</p>\n'
            f'<p>Book a sedan, SUV, or Innova for your airport transfer. Our drivers are experienced with airport routes and ensure you reach well before your flight departure. '
            f'Toll charges and parking fees, if any, are shown transparently before booking.</p>'
        )
    return title, content


def generate_district_page(district, template, mega_nav, all_districts_by_slug):
    fare_rows = build_fare_table_rows(district["routes"])
    faq_html = build_faq_html(district["uniqueFaqs"])
    faq_schema = build_faq_schema(district["uniqueFaqs"])
    nearby_links = build_nearby_links(district["nearbyDistricts"], all_districts_by_slug)
    airport_title, airport_content = build_airport_section(district)

    # Use str.replace instead of .format() to avoid issues with CSS braces
    page = template
    page = page.replace("{city_name}", district["name"])
    page = page.replace("{slug}", district["slug"])
    page = page.replace("{state}", district["state"])
    page = page.replace("{popular_for}", district["popularFor"])
    page = page.replace("{fare_table_rows}", fare_rows)
    page = page.replace("{faq_html}", faq_html)
    page = page.replace("{faq_schema}", faq_schema)
    page = page.replace("{nearby_links}", nearby_links)
    page = page.replace("{mega_nav}", mega_nav)
    page = page.replace("{airport_section_title}", airport_title)
    page = page.replace("{airport_section_content}", airport_content)

    return page


def generate_sitemap(all_html_files):
    """Generate sitemap.xml covering all HTML files."""
    lines = ['<?xml version="1.0" encoding="UTF-8"?>']
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    # Priority rules
    def get_priority(fname):
        if fname == "index.html":
            return "1.0"
        if fname.startswith("drop-taxi-in-"):
            return "0.9"
        if "-to-" in fname:
            return "0.85"
        if fname.startswith("call-taxi-") or fname.startswith("airport-taxi"):
            return "0.85"
        return "0.8"

    def get_changefreq(fname):
        if fname == "index.html":
            return "daily"
        if fname.startswith("drop-taxi-in-") or "-to-" in fname:
            return "weekly"
        return "monthly"

    for fname in sorted(all_html_files):
        url = f"{DOMAIN}/{fname}"
        pri = get_priority(fname)
        freq = get_changefreq(fname)
        lines.append("  <url>")
        lines.append(f"    <loc>{url}</loc>")
        lines.append(f"    <lastmod>{TODAY}</lastmod>")
        lines.append(f"    <changefreq>{freq}</changefreq>")
        lines.append(f"    <priority>{pri}</priority>")
        lines.append("  </url>")

    lines.append("</urlset>")
    return "\n".join(lines)


def main():
    # Load data
    print("Loading district data...", end=" ")
    districts = load_json("data/districts-data.json")
    print(f"{len(districts)} districts loaded.")

    template = load_file("templates/drop-taxi-district.html")
    mega_nav = load_file("templates/mega-nav.html")

    # Build slug lookup
    by_slug = {d["slug"]: d for d in districts}

    # Track existing vs new
    existing_files = set(glob.glob(os.path.join(BASE_DIR, "drop-taxi-in-*.html")))
    existing_basenames = {os.path.basename(f) for f in existing_files}

    new_count = 0
    updated_count = 0

    print("Generating pages...")
    for i, district in enumerate(districts, 1):
        filename = f"drop-taxi-in-{district['slug']}.html"
        filepath = os.path.join(BASE_DIR, filename)

        page_html = generate_district_page(district, template, mega_nav, by_slug)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(page_html)

        if filename in existing_basenames:
            updated_count += 1
            status = "UPDATED"
        else:
            new_count += 1
            status = "NEW"

        if i <= 5 or i == len(districts):
            print(f"  [{i}/{len(districts)}] {filename} ({status})")
        elif i == 6:
            print(f"  ... generating remaining pages ...")

    # Collect ALL html files for sitemap
    all_html = [os.path.basename(f) for f in glob.glob(os.path.join(BASE_DIR, "*.html"))]
    # Exclude non-page files
    exclude = {"elementor-hf-footer.html", "elementor-hf-header.html", "category-uncategorized.html"}
    all_html = [f for f in all_html if f not in exclude]

    # Generate sitemap
    print(f"Generating sitemap.xml... ", end="")
    sitemap_xml = generate_sitemap(all_html)
    with open(os.path.join(BASE_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap_xml)
    print(f"{len(all_html)} URLs")

    # Generate robots.txt
    robots = f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n"
    with open(os.path.join(BASE_DIR, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(robots)
    print("Generated robots.txt")

    print(f"\nDone! Generated {len(districts)} district pages ({updated_count} updated, {new_count} new)")
    print(f"Sitemap: {len(all_html)} URLs")


if __name__ == "__main__":
    main()
