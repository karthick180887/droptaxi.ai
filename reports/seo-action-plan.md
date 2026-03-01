# DataForSEO SEO Action Plan (2026-03-01)

## Scope

Analysis location: India  
Language: English  
Sources: DataForSEO `keywords_data`, `serp`, and `dataforseo_labs` endpoints.

## Keyword Findings

High-priority core terms:

| Keyword | Search Volume | Competition | CPC |
|---|---:|---|---:|
| drop taxi | 33,100 | Medium | 0.34 |
| one way cab | 12,100 | High | 0.22 |
| outstation taxi | 12,100 | High | 0.30 |
| one way taxi | 9,900 | Medium | 0.32 |

High-intent city and route terms:

| Keyword | Search Volume |
|---|---:|
| drop taxi in chennai | 5,400 |
| drop taxi in trichy | 1,900 |
| drop taxi in coimbatore | 1,600 |
| one way cab booking | 1,600 |
| chennai to pondicherry taxi | 2,400 |
| bangalore to chennai taxi | 1,000 |
| hyderabad to vijayawada taxi | 880 |
| chennai to bangalore taxi | 720 |

## SERP Findings

Recurring domains across target queries:

1. `makemytrip.com`
2. `goibibo.com`
3. `savaari.com`
4. `oneway.cab`
5. `bharattaxi.com`

Competitor (`go2onewaytaxi.com`) visibility pattern:

- Home page ranks for broad terms (`one way drop taxi`, `oneway drop taxi`).
- City-specific pages rank for local intent (`drop taxi chennai`, `drop taxi trichy`, `coimbatore taxi`).
- Route-specific pages rank for travel pairs (`chennai to pondicherry taxi`, etc.).

## Implemented Site Enhancements

Page-level optimization and internal-linking updates:

- `index.html`
- `routes.html`
- `cities.html`
- `contact.html`

New SEO landing pages:

- `one-way-cab-booking.html`
- `drop-taxi-in-chennai.html`
- `drop-taxi-in-coimbatore.html`
- `drop-taxi-in-trichy.html`
- `chennai-to-bangalore-taxi.html`
- `bangalore-to-chennai-taxi.html`
- `chennai-to-pondicherry-taxi.html`
- `hyderabad-to-vijayawada-taxi.html`
- `all-routes.html`

Additional 20 data-driven route pages generated from live route keyword volumes:

- `bangalore-to-mysore-taxi.html`
- `coimbatore-to-ooty-taxi.html`
- `vijayawada-to-hyderabad-taxi.html`
- `pondicherry-to-chennai-taxi.html`
- `mysore-to-bangalore-taxi.html`
- `bangalore-to-tirupati-taxi.html`
- `chennai-to-tirupati-taxi.html`
- `chennai-to-vellore-taxi.html`
- `trichy-to-chennai-taxi.html`
- `chennai-to-trichy-taxi.html`
- `bangalore-to-hyderabad-taxi.html`
- `bangalore-to-coimbatore-taxi.html`
- `hyderabad-to-bangalore-taxi.html`
- `chennai-to-madurai-taxi.html`
- `ooty-to-bangalore-taxi.html`
- `bangalore-to-pondicherry-taxi.html`
- `ooty-to-coimbatore-taxi.html`
- `chennai-to-coimbatore-taxi.html`
- `tirupati-to-chennai-taxi.html`
- `bangalore-to-madurai-taxi.html`

Technical SEO updates:

- `sitemap.xml` regenerated from all HTML pages (33 URLs)
- shared style support for breadcrumbs and landing-card sections in `assets/css/styles.css`
- raw data export saved to `reports/dataforseo-seo-report.json`
- route selection data saved to `reports/route-keyword-candidates.json`
- generated page inventory saved to `reports/generated-route-pages.json`

## Next SEO Tasks (Post-Launch)

1. Submit sitemap in Google Search Console.
2. Publish Google Business Profile and map it to city pages.
3. Add reviews/testimonials with `Review` schema.
4. Monitor impressions/clicks and expand route pages where rankings enter positions 11-30.
5. Add unique FAQs and local proof (photos/reviews) to top-converting route pages.
