# DropTaxi SEO Website

Static SEO-focused website for a South India one way taxi business.

## Pages

- `index.html` - Home page and lead capture
- `routes.html` - Route and fare intent page
- `cities.html` - Service area page
- `contact.html` - Booking and contact page
- `one-way-cab-booking.html` - Booking intent landing page
- `drop-taxi-in-chennai.html` - City SEO page
- `drop-taxi-in-coimbatore.html` - City SEO page
- `drop-taxi-in-trichy.html` - City SEO page
- `chennai-to-bangalore-taxi.html` - Route SEO page
- `bangalore-to-chennai-taxi.html` - Route SEO page
- `chennai-to-pondicherry-taxi.html` - Route SEO page
- `hyderabad-to-vijayawada-taxi.html` - Route SEO page

## SEO Reports

- `reports/dataforseo-seo-report.json` - Raw DataForSEO output used for optimization
- `reports/seo-action-plan.md` - Keyword + SERP findings and implementation map
- `reports/route-keyword-candidates.json` - Route keyword volume pull used for page selection
- `reports/generated-route-pages.json` - 20 generated route pages from the selected keywords
- `reports/competitor-sitemap-urls.json` - Full URL extraction from competitor sitemap index
- `reports/competitor-page-audit.json` - On-page crawl audit across competitor URLs
- `reports/competitor-ranked-keywords-top1000.json` - Competitor ranking keyword sample from DataForSEO Labs
- `reports/competitor-gap-keywords-volume.json` - Volume checks for uncovered competitor clusters
- `reports/competitor-gap-pages-generated.json` - 15 additional gap pages generated
- `reports/competitor-sitemap-dataforseo-analysis.md` - Final competitor strategy analysis and implementation summary
- `reports/phase2-top40-update-report.json` - Validation report for phase-2 upgrades on top 40 pages
- `reports/seo-216-implementation-summary.md` - Full 216-page implementation status

## Current Configuration

- Domain: `https://www.seorankpro.in`
- Phone display: `063838 83922`
- Phone dial link / WhatsApp: `916383883922`
- Email: `enquiry@seorankpro.in`

If you need to change these values later, update all HTML files plus:

- `robots.txt`
- `sitemap.xml`

## Current Site Scale

- Total HTML pages: `232`
- Competitor sitemap coverage implemented: `216 / 216` mapped pages
- Includes route pages, city pages, airport pages, service pages, and SEO hub pages.

## Run Locally

Use any static server from project root:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

