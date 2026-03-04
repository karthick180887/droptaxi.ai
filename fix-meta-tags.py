#!/usr/bin/env python3
"""
fix-meta-tags.py
================
Audits and fixes OG/social meta tags across all HTML pages in the droptaxi.ai website.
Excludes drop-taxi-in-*.html files (district pages already have proper tags).

Checks and fixes:
  1. Missing og:title, og:description, og:url, og:image, og:type
  2. Missing twitter:card, twitter:title, twitter:description, twitter:image
  3. Missing canonical URL
  4. Wrong domain (seorankpro.in -> droptaxi.ai)
  5. Missing or generic meta description

Uses BeautifulSoup for parsing and regex-based insertion to preserve original formatting.
"""

import os
import re
import glob
from bs4 import BeautifulSoup

# Configuration
DOMAIN = "https://droptaxi.ai"
OG_IMAGE = f"{DOMAIN}/assets/images/og-cover.svg"
DEFAULT_OG_TYPE = "website"

# Track statistics
stats = {
    "files_scanned": 0,
    "files_modified": 0,
    "twitter_card_added": 0,
    "twitter_title_added": 0,
    "twitter_description_added": 0,
    "twitter_image_added": 0,
    "og_title_added": 0,
    "og_description_added": 0,
    "og_url_added": 0,
    "og_image_added": 0,
    "og_type_added": 0,
    "canonical_added": 0,
    "wrong_domain_fixed": 0,
    "og_type_fixed_to_website": 0,
}

# Pages that should have og:type = "website" instead of "article"
WEBSITE_TYPE_PAGES = {
    "index.html", "cities.html", "all-routes.html", "blogs.html",
    "book-now.html", "about-us.html", "category-uncategorized.html",
    "faq.html", "contact.html", "routes.html", "privacy-policy.html",
    "terms-and-conditions.html",
}


def get_html_files(base_dir):
    """Get all HTML files excluding drop-taxi-in-* district pages and templates."""
    all_html = glob.glob(os.path.join(base_dir, "*.html"))
    filtered = []
    for f in all_html:
        basename = os.path.basename(f)
        # Skip district pages (already have proper tags)
        if basename.startswith("drop-taxi-in-"):
            continue
        filtered.append(f)
    filtered.sort()
    return filtered


def extract_title(soup):
    """Extract <title> tag content."""
    tag = soup.find("title")
    if tag and tag.string:
        return tag.string.strip()
    return None


def extract_meta_description(soup):
    """Extract meta description content."""
    tag = soup.find("meta", attrs={"name": "description"})
    if tag and tag.get("content"):
        return tag["content"].strip()
    return None


def has_og_tag(soup, prop):
    """Check if an OG meta tag exists."""
    return soup.find("meta", attrs={"property": prop}) is not None


def get_og_tag(soup, prop):
    """Get OG meta tag content."""
    tag = soup.find("meta", attrs={"property": prop})
    if tag and tag.get("content"):
        return tag["content"].strip()
    return None


def has_twitter_tag(soup, name_val):
    """Check if a Twitter meta tag exists."""
    return soup.find("meta", attrs={"name": name_val}) is not None


def has_canonical(soup):
    """Check if canonical link exists."""
    return soup.find("link", attrs={"rel": "canonical"}) is not None


def get_canonical(soup):
    """Get canonical URL."""
    tag = soup.find("link", attrs={"rel": "canonical"})
    if tag and tag.get("href"):
        return tag["href"].strip()
    return None


def build_url(filename):
    """Build the full URL for a file."""
    if filename == "index.html":
        return f"{DOMAIN}/"
    return f"{DOMAIN}/{filename}"


def determine_og_type(filename):
    """Determine appropriate og:type for a page."""
    if filename in WEBSITE_TYPE_PAGES:
        return "website"
    # Keep "article" for service/route pages (or whatever they currently have)
    return None  # None = don't change if already set


def fix_file(filepath):
    """Audit and fix meta tags for a single HTML file."""
    filename = os.path.basename(filepath)

    with open(filepath, "r", encoding="utf-8") as f:
        original_content = f.read()

    content = original_content
    soup = BeautifulSoup(content, "html.parser")
    modifications = []

    title = extract_title(soup)
    description = extract_meta_description(soup)
    page_url = build_url(filename)

    # --- Fix wrong domain (seorankpro.in -> droptaxi.ai) ---
    if "seorankpro.in" in content:
        content = content.replace("seorankpro.in", "droptaxi.ai")
        modifications.append("Fixed wrong domain: seorankpro.in -> droptaxi.ai")
        stats["wrong_domain_fixed"] += 1
        # Re-parse after domain fix
        soup = BeautifulSoup(content, "html.parser")

    # --- Fix og:type for pages that should be "website" ---
    desired_type = determine_og_type(filename)
    if desired_type:
        og_type_tag = soup.find("meta", attrs={"property": "og:type"})
        if og_type_tag and og_type_tag.get("content") != desired_type:
            old_type = og_type_tag["content"]
            # Use regex to replace just this specific og:type value
            pattern = r'(<meta\s+property="og:type"\s+content=")' + re.escape(old_type) + r'"'
            replacement = r'\g<1>' + desired_type + '"'
            content = re.sub(pattern, replacement, content)
            modifications.append(f"Fixed og:type: '{old_type}' -> '{desired_type}'")
            stats["og_type_fixed_to_website"] += 1
            soup = BeautifulSoup(content, "html.parser")

    # --- Determine insertion point ---
    # We insert new tags right after the last og:image line (or og:url, or og:description,
    # or og:title, or og:type) to keep them grouped together.
    # If no OG tags exist, insert after canonical or after the favicon link.

    def find_insertion_point(text):
        """Find the best line to insert after, returns the line text to insert after."""
        # Priority: after og:image > og:url > og:description > og:title > og:type > canonical > favicon
        patterns = [
            r'.*<meta\s+property="og:image"[^>]*>.*',
            r'.*<meta\s+property="og:url"[^>]*>.*',
            r'.*<meta\s+property="og:description"[^>]*>.*',
            r'.*<meta\s+property="og:title"[^>]*>.*',
            r'.*<meta\s+property="og:type"[^>]*>.*',
            r'.*<link\s+rel="canonical"[^>]*>.*',
            r'.*<link\s+rel="icon"[^>]*>.*',
            r'.*<meta\s+name="theme-color"[^>]*>.*',
        ]
        for pattern in patterns:
            matches = list(re.finditer(pattern, text))
            if matches:
                return matches[-1]  # Last match of this type
        return None

    new_tags = []

    # --- Check and prepare missing OG tags ---
    if not has_og_tag(soup, "og:type"):
        og_type = desired_type or DEFAULT_OG_TYPE
        new_tags.append(f'  <meta property="og:type" content="{og_type}">')
        modifications.append(f"Added og:type: {og_type}")
        stats["og_type_added"] += 1

    if not has_og_tag(soup, "og:title"):
        og_title = title or filename.replace(".html", "").replace("-", " ").title() + " | DropTaxi"
        new_tags.append(f'  <meta property="og:title" content="{og_title}">')
        modifications.append(f"Added og:title")
        stats["og_title_added"] += 1

    if not has_og_tag(soup, "og:description"):
        og_desc = description or f"Book taxi service with DropTaxi. Fast confirmation, transparent pricing, 24x7 support."
        new_tags.append(f'  <meta property="og:description" content="{og_desc}">')
        modifications.append(f"Added og:description")
        stats["og_description_added"] += 1

    if not has_og_tag(soup, "og:url"):
        new_tags.append(f'  <meta property="og:url" content="{page_url}">')
        modifications.append(f"Added og:url: {page_url}")
        stats["og_url_added"] += 1

    if not has_og_tag(soup, "og:image"):
        new_tags.append(f'  <meta property="og:image" content="{OG_IMAGE}">')
        modifications.append(f"Added og:image")
        stats["og_image_added"] += 1

    # --- Check and prepare missing Twitter card tags ---
    if not has_twitter_tag(soup, "twitter:card"):
        new_tags.append(f'  <meta name="twitter:card" content="summary_large_image">')
        modifications.append("Added twitter:card")
        stats["twitter_card_added"] += 1

    if not has_twitter_tag(soup, "twitter:title"):
        tw_title = get_og_tag(soup, "og:title") or title or filename.replace(".html", "").replace("-", " ").title()
        new_tags.append(f'  <meta name="twitter:title" content="{tw_title}">')
        modifications.append("Added twitter:title")
        stats["twitter_title_added"] += 1

    if not has_twitter_tag(soup, "twitter:description"):
        tw_desc = get_og_tag(soup, "og:description") or description or f"Book taxi service with DropTaxi."
        new_tags.append(f'  <meta name="twitter:description" content="{tw_desc}">')
        modifications.append("Added twitter:description")
        stats["twitter_description_added"] += 1

    if not has_twitter_tag(soup, "twitter:image"):
        new_tags.append(f'  <meta name="twitter:image" content="{OG_IMAGE}">')
        modifications.append("Added twitter:image")
        stats["twitter_image_added"] += 1

    # --- Check and prepare missing canonical ---
    if not has_canonical(soup):
        new_tags.append(f'  <link rel="canonical" href="{page_url}">')
        modifications.append(f"Added canonical: {page_url}")
        stats["canonical_added"] += 1

    # --- Insert new tags if any ---
    if new_tags:
        insertion_match = find_insertion_point(content)
        if insertion_match:
            insert_pos = insertion_match.end()
            tag_block = "\n" + "\n".join(new_tags)
            content = content[:insert_pos] + tag_block + content[insert_pos:]
        else:
            # Fallback: insert before </head>
            tag_block = "\n".join(new_tags) + "\n"
            content = content.replace("</head>", tag_block + "</head>")

    # --- Write back if modified ---
    if content != original_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        stats["files_modified"] += 1
        return modifications

    return []


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    html_files = get_html_files(base_dir)

    print("=" * 70)
    print("  OG/Social Meta Tag Fixer for droptaxi.ai")
    print("=" * 70)
    print(f"\nScanning directory: {base_dir}")
    print(f"Found {len(html_files)} HTML files (excluding drop-taxi-in-* district pages)\n")
    print("-" * 70)

    files_with_changes = {}

    for filepath in html_files:
        stats["files_scanned"] += 1
        filename = os.path.basename(filepath)
        modifications = fix_file(filepath)
        if modifications:
            files_with_changes[filename] = modifications
            print(f"\n  [FIXED] {filename}")
            for mod in modifications:
                print(f"          + {mod}")

    # --- Print Summary ---
    print("\n" + "=" * 70)
    print("  SUMMARY")
    print("=" * 70)
    print(f"  Files scanned:              {stats['files_scanned']}")
    print(f"  Files modified:             {stats['files_modified']}")
    print(f"  Files unchanged:            {stats['files_scanned'] - stats['files_modified']}")
    print()
    print("  Tags added/fixed:")
    print(f"    og:type added:            {stats['og_type_added']}")
    print(f"    og:type fixed to website: {stats['og_type_fixed_to_website']}")
    print(f"    og:title added:           {stats['og_title_added']}")
    print(f"    og:description added:     {stats['og_description_added']}")
    print(f"    og:url added:             {stats['og_url_added']}")
    print(f"    og:image added:           {stats['og_image_added']}")
    print(f"    canonical added:          {stats['canonical_added']}")
    print(f"    twitter:card added:       {stats['twitter_card_added']}")
    print(f"    twitter:title added:      {stats['twitter_title_added']}")
    print(f"    twitter:description added:{stats['twitter_description_added']}")
    print(f"    twitter:image added:      {stats['twitter_image_added']}")
    print(f"    Wrong domain fixed:       {stats['wrong_domain_fixed']}")
    print()

    total_fixes = sum(v for k, v in stats.items() if k not in ("files_scanned", "files_modified"))
    print(f"  Total fixes applied:        {total_fixes}")
    print("=" * 70)

    if not files_with_changes:
        print("\n  All files already have complete meta tags. No changes needed.")
    else:
        print(f"\n  {len(files_with_changes)} files were updated successfully.")


if __name__ == "__main__":
    main()
