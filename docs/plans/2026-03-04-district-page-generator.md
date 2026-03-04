# District Page Generator + Domain Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the domain mismatch (seorankpro.in → droptaxi.ai) across all pages, then generate 185+ SEO-optimized district landing pages covering Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana, and Pondicherry with 1,200+ word content, fare tables, schema markup, and internal linking.

**Architecture:** Data-driven static page generator. A JSON data file defines all districts with routes/fares/metadata. A Python script reads this data + an HTML template to produce optimized static pages. Existing pages are overwritten with upgraded content. New pages are created for missing districts. Finally, sitemap.xml and mega-nav are regenerated.

**Tech Stack:** Python 3 (generator script), JSON (district data), HTML5/CSS (static pages), Schema.org JSON-LD

**DataForSEO Keyword Data Available:**
- Core: drop taxi (33,100), one way cab (12,100), outstation taxi (12,100), one way taxi (9,900)
- City: drop taxi chennai (5,400), drop taxi coimbatore (1,600), drop taxi madurai (1,600)
- Competitor data: taxida.in (50 ranked keywords), onewaydroptaxi.com (50 ranked keywords)
- SERP competitor rankings for top cities

---

## Task 1: Create districts-data.json

**Files:**
- Create: `data/districts-data.json`

**Step 1: Create the data directory**

```bash
mkdir -p data
```

**Step 2: Create the comprehensive district data JSON file**

The JSON structure per district:
```json
{
  "slug": "chennai",
  "name": "Chennai",
  "state": "Tamil Nadu",
  "stateShort": "TN",
  "isDistrict": true,
  "searchVolume": 5400,
  "nearestAirport": { "name": "Chennai International Airport", "code": "MAA", "distanceKm": 15 },
  "pickupPoints": ["Chennai Central Railway Station", "Chennai Egmore", "Tambaram", "Guindy", "OMR", "ECR", "Anna Nagar"],
  "routes": [
    { "to": "Bangalore", "toSlug": "bangalore", "distanceKm": 350, "durationHrs": 6, "sedanFare": 4799, "suvFare": 6999, "innovaFare": 7499 },
    ...
  ],
  "nearbyDistricts": ["chengalpattu", "kanchipuram", "tiruvallur", "ranipet", "vellore"],
  "popularFor": "Gateway to South India, Marina Beach, temples, IT corridor",
  "uniqueFaqs": [
    { "q": "What is the drop taxi fare from Chennai to Bangalore?", "a": "..." },
    ...
  ]
}
```

The file must contain entries for ALL of these locations:

**Tamil Nadu (38 districts + ~15 towns = 53):**
Districts: Ariyalur, Chengalpattu, Chennai, Coimbatore, Cuddalore, Dharmapuri, Dindigul, Erode, Kallakurichi, Kanchipuram, Kanyakumari, Karur, Krishnagiri, Madurai, Mayiladuthurai, Nagapattinam, Namakkal, Nilgiris, Perambalur, Pudukkottai, Ramanathapuram, Ranipet, Salem, Sivagangai, Tenkasi, Thanjavur, Theni, Thoothukudi, Tiruchirappalli, Tirunelveli, Tirupattur, Tirupur, Tiruvannamalai, Vellore, Viluppuram, Virudhunagar, Tiruvallur, Nagapattinam
Towns: Hosur, Ooty, Kodaikanal, Kumbakonam, Nagercoil, Karaikudi, Palani, Sivakasi, Srirangam, Chrompet, Koomapatti, Neyveli, Tiruchendur, Chidambaram, Velankanni

**Kerala (14 districts + ~8 towns = 22):**
Districts: Thiruvananthapuram, Kollam, Pathanamthitta, Alappuzha, Kottayam, Idukki, Ernakulam, Thrissur, Palakkad, Malappuram, Kozhikode, Wayanad, Kannur, Kasaragod
Towns: Kochi, Munnar, Alleppey, Thekkady, Guruvayur, Kovalam, Varkala, Kumarakom

**Karnataka (31 districts + ~8 towns = 39):**
Districts: Bagalkot, Ballari, Belagavi, Bengaluru Urban, Bengaluru Rural, Bidar, Chamarajanagar, Chikballapur, Chikkamagaluru, Chitradurga, Dakshina Kannada, Davangere, Dharwad, Gadag, Hassan, Haveri, Kalaburagi, Kodagu, Kolar, Koppal, Mandya, Mysuru, Raichur, Ramanagara, Shivamogga, Tumakuru, Udupi, Uttara Kannada, Vijayanagara, Vijayapura, Yadgir
Towns: Bangalore, Mysore, Mangalore, Hubli, Coorg, Hampi, Chikmagalur, Shimoga

**Andhra Pradesh (26 districts + ~5 towns = 31):**
Districts: Anantapur, Chittoor, East Godavari, Guntur, Kadapa, Krishna, Kurnool, Nellore, Prakasam, Srikakulam, Visakhapatnam, Vizianagaram, West Godavari, Alluri Sitharama Raju, Anakapalli, Bapatla, Eluru, Kakinada, Konaseema, NTR, Palnadu, Parvathipuram Manyam, Sri Sathya Sai, Nandyal, Tirupati, Annamayya
Towns: Vijayawada, Vizag, Rajahmundry, Ongole, Nellore

**Telangana (33 districts + ~3 towns = 36):**
Districts: Adilabad, Bhadradri Kothagudem, Hanumakonda, Hyderabad, Jagtial, Jangaon, Jayashankar Bhupalpally, Jogulamba Gadwal, Kamareddy, Karimnagar, Khammam, Kumuram Bheem Asifabad, Mahabubabad, Mahabubnagar, Mancherial, Medak, Medchal-Malkajgiri, Mulugu, Nagarkurnool, Nalgonda, Narayanpet, Nirmal, Nizamabad, Peddapalli, Rajanna Sircilla, Rangareddy, Sangareddy, Siddipet, Suryapet, Vikarabad, Wanaparthy, Warangal, Yadadri Bhuvanagiri
Towns: Secunderabad, Warangal, Shamshabad

**Pondicherry (4):**
Pondicherry, Karaikal, Mahe, Yanam

**Route data requirements per district:**
- Minimum 3 routes, maximum 8 routes per district
- Each route needs: destination name, slug, distance in km, duration in hours, sedan fare (₹11-13/km), SUV fare (₹18-20/km), Innova fare (₹19-22/km)
- Fares calculated as: sedan = distanceKm * 13 + 300 (driver bata), SUV = distanceKm * 19 + 400, innova = distanceKm * 21 + 400
- Routes should be to the nearest major cities and popular destinations

**Step 3: Validate JSON structure**

```bash
python3 -c "import json; d=json.load(open('data/districts-data.json')); print(f'Total districts: {len(d)}')"
```

Expected: `Total districts: 185` (approximately)

---

## Task 2: Create the HTML page template

**Files:**
- Create: `templates/drop-taxi-district.html`

**Step 1: Create templates directory**

```bash
mkdir -p templates
```

**Step 2: Create the HTML template file**

The template uses Python string `.format()` placeholders like `{city_name}`, `{state}`, etc.

Key requirements:
- Domain: ALL URLs must use `https://droptaxi.ai/` (NOT seorankpro.in)
- Title pattern: `Drop Taxi in {city_name} | One Way Cab ₹11/km | DropTaxi`
- Meta description: `Book drop taxi in {city_name} starting ₹11/km. 24/7 one way cab, outstation taxi with AC cars, verified drivers. Instant booking, no return fare. Call 063838 83922.`
- Canonical: `https://droptaxi.ai/drop-taxi-in-{slug}.html`
- Content: 1,200+ words with all sections from SEO report

**Template must include these sections in order:**
1. Head with meta tags, schema (TaxiService + BreadcrumbList + FAQPage)
2. Mega-nav header (use `{mega_nav}` placeholder — injected by generator)
3. Breadcrumbs: Home > Cities > {state} > Drop Taxi in {city_name}
4. H1 + lead paragraph with NLP terms
5. "Why Choose DropTaxi in {city_name}" — 5 USPs
6. "Popular Drop Taxi Routes from {city_name}" — fare table (Sedan/SUV/Innova)
7. "One Way Taxi Fare Chart from {city_name}" — full fare table
8. "Available Car Options" — Sedan, SUV, Innova, Tempo Traveller descriptions
9. "Airport Drop & Pickup" (if has airport) or "Nearest Airport Transfer"
10. "How to Book Drop Taxi in {city_name}" — 4-step process
11. "Verified Customer Feedback" — 2-3 review blocks
12. "Frequently Asked Questions" — 5-6 unique FAQs with details element
13. "Nearby Cities" — internal links grid to neighboring districts
14. Footer

**Schema markup (3 blocks):**

Block 1 — TaxiService:
```json
{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "DropTaxi {city_name}",
  "url": "https://droptaxi.ai/drop-taxi-in-{slug}.html",
  "telephone": "+91-63838-83922",
  "email": "enquiry@droptaxi.ai",
  "areaServed": "{city_name}, {state}",
  "priceRange": "₹11/km onwards",
  "openingHoursSpecification": { "dayOfWeek": [...all 7...], "opens": "00:00", "closes": "23:59" }
}
```

Block 2 — BreadcrumbList:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://droptaxi.ai/" },
    { "position": 2, "name": "Cities", "item": "https://droptaxi.ai/cities.html" },
    { "position": 3, "name": "Drop Taxi in {city_name}", "item": "https://droptaxi.ai/drop-taxi-in-{slug}.html" }
  ]
}
```

Block 3 — FAQPage:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [... 5-6 Q&A objects from district data ...]
}
```

---

## Task 3: Create the Python generator script

**Files:**
- Create: `generate-pages.py`

**Step 1: Write the generator script**

The script must:

1. Load `data/districts-data.json`
2. Load `templates/drop-taxi-district.html`
3. Load `templates/mega-nav.html` (shared navigation snippet)
4. For each district:
   a. Build fare table HTML from routes array
   b. Build FAQ HTML + schema from uniqueFaqs
   c. Build nearby cities HTML grid from nearbyDistricts
   d. Build airport section (conditional on nearestAirport)
   e. Fill all template placeholders
   f. Write to `drop-taxi-in-{slug}.html`
5. Generate `sitemap.xml` with ALL pages (existing + new), domain = droptaxi.ai
6. Generate `robots.txt` with correct sitemap URL
7. Print summary report: total pages generated, new vs updated

**Key logic:**
```python
# Fare calculation (if not provided)
sedan_fare = distance_km * 13 + 300
suv_fare = distance_km * 19 + 400
innova_fare = distance_km * 21 + 400

# Slug generation
slug = city_name.lower().replace(' ', '-').replace('.', '')
filename = f"drop-taxi-in-{slug}.html"
```

**Step 2: Run the generator**

```bash
python3 generate-pages.py
```

Expected output:
```
Loading district data... 185 districts loaded.
Generating pages...
  [1/185] drop-taxi-in-ariyalur.html (NEW)
  [2/185] drop-taxi-in-chengalpattu.html (UPDATED)
  ...
  [185/185] drop-taxi-in-yanam.html (NEW)
Generating sitemap.xml... 400+ URLs
Generating robots.txt...
Done! Generated 185 district pages (33 updated, 152 new)
```

**Step 3: Verify output**

```bash
# Count generated district pages
ls drop-taxi-in-*.html | wc -l
# Should be ~185

# Check a sample page has correct domain
grep -c "droptaxi.ai" drop-taxi-in-chennai.html
# Should be 10+ occurrences

# Check NO old domain references
grep -c "seorankpro.in" drop-taxi-in-chennai.html
# Should be 0

# Check word count of content
python3 -c "
import re
html = open('drop-taxi-in-chennai.html').read()
text = re.sub('<[^>]+>', ' ', html)
words = len(text.split())
print(f'Word count: {words}')
"
# Should be 1200+
```

---

## Task 4: Fix domain references in ALL existing non-district pages

**Files:**
- Modify: All 232 existing HTML files
- Modify: `sitemap.xml`
- Modify: `robots.txt`

**Step 1: Global find-and-replace domain across all HTML files**

```bash
# Replace all occurrences of www.seorankpro.in with droptaxi.ai
find . -name "*.html" -exec sed -i 's|https://www.seorankpro.in|https://droptaxi.ai|g' {} +
find . -name "*.html" -exec sed -i 's|www.seorankpro.in|droptaxi.ai|g' {} +
find . -name "*.html" -exec sed -i 's|seorankpro.in|droptaxi.ai|g' {} +
```

**Step 2: Fix email references**

```bash
find . -name "*.html" -exec sed -i 's|enquiry@droptaxi.ai|enquiry@droptaxi.ai|g' {} +
```

Note: After the domain replace, `enquiry@seorankpro.in` becomes `enquiry@droptaxi.ai`. If you want to keep the old email, we need to handle this. Otherwise the email update is intentional.

**Step 3: Verify no old domain references remain**

```bash
grep -rl "seorankpro.in" *.html | wc -l
# Should be 0
```

---

## Task 5: Create the mega-nav template

**Files:**
- Create: `templates/mega-nav.html`

**Step 1: Extract current mega-nav from an existing page and update**

The mega-nav must include:
- Routes dropdown (organized by origin city — Chennai, Bangalore, Madurai, Coimbatore, Salem, Pondicherry, More)
- Cities dropdown (organized by state — Tamil Nadu, Kerala, Karnataka, AP, Telangana, Pondicherry)
- Airport dropdown
- More dropdown (Services, Company)
- Book Now CTA

The Cities dropdown must now include ALL states:
```html
<div class="mega-col">
  <h4>Drop Taxi — Tamil Nadu</h4>
  <!-- Top 18 TN cities -->
</div>
<div class="mega-col">
  <h4>Drop Taxi — Kerala</h4>
  <!-- Top 14 Kerala cities -->
  <h4>Drop Taxi — Karnataka</h4>
  <!-- Top 8 Karnataka cities -->
</div>
<div class="mega-col">
  <h4>Drop Taxi — AP & Telangana</h4>
  <!-- Top 10 AP+TS cities -->
  <h4>Drop Taxi — Pondicherry</h4>
  <!-- 4 Pondicherry locations -->
</div>
<div class="mega-col">
  <h4>Call Taxi — Popular</h4>
  <!-- Existing call taxi links -->
</div>
```

**Step 2: The generator injects this into all pages via `{mega_nav}` placeholder**

---

## Task 6: Regenerate sitemap.xml

**Files:**
- Modify: `sitemap.xml`

The generator script (Task 3) handles this, but the sitemap must include:
1. All existing non-district pages (routes, airports, call-taxi, blog, etc.) — domain = droptaxi.ai
2. All 185 new/updated district pages — domain = droptaxi.ai
3. Priority: homepage 1.0, district pages 0.9, route pages 0.85, other 0.8
4. lastmod: today's date
5. changefreq: weekly for district/route pages, monthly for static pages

---

## Task 7: Update robots.txt

**Files:**
- Modify: `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://droptaxi.ai/sitemap.xml
```

---

## Task 8: Manual polish — top 20 highest-traffic districts

**Files:**
- Modify: 20 specific district HTML files

After generation, manually review and enhance these 20 pages:

1. `drop-taxi-in-chennai.html` (SV: 5,400)
2. `drop-taxi-in-coimbatore.html` (SV: 1,600)
3. `drop-taxi-in-madurai.html` (SV: 1,600)
4. `drop-taxi-in-trichy.html` (SV: 1,900)
5. `drop-taxi-in-bangalore.html` (SV: ~1,000)
6. `drop-taxi-in-salem.html` (SV: ~880)
7. `drop-taxi-in-vellore.html` (SV: ~880)
8. `drop-taxi-in-hyderabad.html` (SV: ~500)
9. `drop-taxi-in-tirunelveli.html` (SV: ~400)
10. `drop-taxi-in-erode.html` (SV: ~210)
11. `drop-taxi-in-hosur.html`
12. `drop-taxi-in-pondicherry.html`
13. `drop-taxi-in-trivandrum.html`
14. `drop-taxi-in-thanjavur.html`
15. `drop-taxi-in-kochi.html` (NEW)
16. `drop-taxi-in-mysore.html` (NEW)
17. `drop-taxi-in-tirupati.html` (NEW)
18. `drop-taxi-in-vizag.html` (NEW)
19. `drop-taxi-in-mangalore.html` (NEW)
20. `drop-taxi-in-warangal.html` (NEW)

**Polish checklist per page:**
- [ ] Verify fare accuracy (distances match Google Maps)
- [ ] Add 1-2 unique paragraphs about the city (tourism, business relevance)
- [ ] Verify pickup points are real locations
- [ ] Verify nearest airport is correct
- [ ] Verify nearby districts are geographically accurate
- [ ] Add city-specific FAQ (e.g., "Is toll included on Chennai-Bangalore route?")
- [ ] Verify internal links work
- [ ] Test page in browser

---

## Task 9: Final validation

**Step 1: Validate all pages**
```bash
python3 -c "
import os, re
pages = [f for f in os.listdir('.') if f.startswith('drop-taxi-in-') and f.endswith('.html')]
print(f'Total district pages: {len(pages)}')

errors = []
for p in pages:
    html = open(p).read()
    if 'seorankpro.in' in html:
        errors.append(f'{p}: contains old domain')
    if 'droptaxi.ai' not in html:
        errors.append(f'{p}: missing new domain')
    if '<table' not in html.lower():
        errors.append(f'{p}: missing fare table')
    text = re.sub('<[^>]+>', ' ', html)
    if len(text.split()) < 800:
        errors.append(f'{p}: content too thin ({len(text.split())} words)')

if errors:
    for e in errors:
        print(f'ERROR: {e}')
else:
    print('All pages validated successfully!')
"
```

**Step 2: Validate sitemap**
```bash
python3 -c "
import xml.etree.ElementTree as ET
tree = ET.parse('sitemap.xml')
urls = tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
print(f'Sitemap URLs: {len(urls)}')
bad = [u.text for u in urls if 'seorankpro' in u.text]
print(f'Bad domain refs: {len(bad)}')
"
```

Expected: 400+ URLs, 0 bad domain refs

**Step 3: Check a random sample in browser**
```bash
python3 -m http.server 8080
```
Open: http://localhost:8080/drop-taxi-in-chennai.html

---

## Execution Order

1. Task 1: districts-data.json (largest task — data entry for 185 districts)
2. Task 5: mega-nav template
3. Task 2: HTML page template
4. Task 3: Python generator script
5. Task 4: Fix domain on existing non-district pages
6. Task 6: Sitemap (auto-generated by script)
7. Task 7: robots.txt
8. Task 8: Manual polish top 20
9. Task 9: Final validation
