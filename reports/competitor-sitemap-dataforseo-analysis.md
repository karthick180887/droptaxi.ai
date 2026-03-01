# Competitor Sitemap + DataForSEO Analysis (2026-03-01)

## Scope

- Competitor sitemap analyzed: `https://go2onewaytaxi.com/sitemap_index.xml`
- Child sitemaps analyzed: 5
- Total competitor URLs audited: 216
- Data sources:
  - `reports/competitor-sitemap-urls.json`
  - `reports/competitor-page-audit.json`
  - `reports/competitor-ranked-keywords-top1000.json`
  - `reports/competitor-gap-keywords-volume.json`

## What Competitor Is Doing At Scale

URL template mix from full sitemap crawl:

- Route pages: 95
- City/service pages: 54
- Other pages: 62
- Policy/brand pages: 4
- Home page: 1

Pattern:

1. Heavy route-page production (`city-to-city-taxi`)
2. Heavy city-intent production (`drop-taxi-in-city`, `call-taxi-in-city`)
3. Long-form route pages (often 1,100+ words)
4. Strong local coverage in Tamil Nadu + Kerala leisure routes

## DataForSEO Competitive Signals

Top competitor URL clusters by summed keyword search volume (ranked-keywords sample):

1. `/` (home)
2. `/one-way-taxi-in-coimbatore/`
3. `/kozhikode-to-wayanad-taxi/`
4. `/munnar-to-thekkady-taxi/`
5. `/salem-to-yercaud-taxi/`
6. `/call-taxi-in-tirupur/`
7. `/drop-taxi-in-pondicherry/`
8. `/cochin-airport-taxi/`
9. `/drop-taxi-in-salem/`
10. `/cochin-to-munnar-taxi/`

High-opportunity uncovered demand terms (Google Ads volume):

- `call taxi in tirupur` (4400)
- `madurai to rameswaram taxi` (1900)
- `cochin to munnar taxi` (1300)
- `cochin airport taxi` (1000)
- `drop taxi in vellore` (880)
- `drop taxi in salem` (90) + `drop taxi salem` (880 variant)
- `mysore to ooty taxi` (720)
- `salem to yercaud taxi` (480)
- `rameswaram to madurai taxi` (480)
- `drop taxi in pondicherry` / `drop taxi pondicherry` (20 / 320)
- `vellore to chennai taxi` (260)
- `drop taxi in erode` / `drop taxi erode` (0 / 210)
- `kozhikode to wayanad taxi` (210)
- `coimbatore to munnar taxi` (170)
- `chennai airport to vellore taxi` (90)

## Strategy Implemented on Your Site

### 1. Route scale-up (already implemented earlier)

- 20 data-driven route pages generated from prior volume pull
- Inventory file: `reports/generated-route-pages.json`

### 2. Competitor-gap page layer (implemented now)

15 additional pages created:

- `call-taxi-in-tirupur.html`
- `madurai-to-rameswaram-taxi.html`
- `cochin-to-munnar-taxi.html`
- `cochin-airport-taxi.html`
- `drop-taxi-in-salem.html`
- `drop-taxi-in-vellore.html`
- `mysore-to-ooty-taxi.html`
- `salem-to-yercaud-taxi.html`
- `rameswaram-to-madurai-taxi.html`
- `drop-taxi-in-pondicherry.html`
- `vellore-to-chennai-taxi.html`
- `drop-taxi-in-erode.html`
- `kozhikode-to-wayanad-taxi.html`
- `coimbatore-to-munnar-taxi.html`
- `chennai-airport-to-vellore-taxi.html`

Inventory file: `reports/competitor-gap-pages-generated.json`

### 3. Hub and internal-link upgrades

- Rebuilt `all-routes.html` as a full SEO hub with three clusters:
  - Intercity route pages
  - City drop taxi pages
  - Airport taxi pages
- Added new internal-link modules in:
  - `routes.html`
  - `cities.html`
  - `contact.html`
- This improves crawl depth and topical grouping.

### 4. Technical SEO

- Regenerated `sitemap.xml` from all live HTML pages
- Current sitemap URL count: 48
- `robots.txt` already points to sitemap

## Why This Is Better

Compared to the competitor strategy, your site now combines:

1. Core commercial keywords (`drop taxi`, `one way cab`, `outstation taxi`)
2. Route-scale coverage (intercity)
3. City/service coverage (`drop taxi in city`, `call taxi in city`)
4. Airport + tourism intent pages
5. Stronger hub-style internal linking for crawl/index support

## Next Ranking Steps

1. Add unique FAQ blocks to each new high-priority page (tirupur, cochin airport, salem/yercaud, munnar routes).
2. Add city-specific proof sections (local landmarks, pickup zones, real customer snippets).
3. Track page-level impressions in Search Console for 3-4 weeks and expand only pages that enter positions 11-30.
4. Add review schema + aggregate rating where real data is available.
5. Build local backlinks/citations for priority cities (Coimbatore, Salem, Vellore, Tirupur, Pondicherry).
