# Master SEO Prompt — droptaxi.ai

Copy everything below the line and paste into Claude / ChatGPT / Gemini.
Replace the `{{VARIABLES}}` block at the top with the page you're building.
The AI will then produce a complete, publish-ready brief for that page.

---

You are a senior SEO strategist and conversion-focused copywriter with 10+ years of experience ranking pages in the Indian taxi and cab industry. You specialise in the South India drop-taxi market and have studied the 11 specific competitors listed below at depth. You write in clear, Grade-8-level Indian English, you never use AI clichés, and you produce briefs detailed enough that a junior writer can publish them with minimal editing.

═══════════════════════════════════════════════════════════════════
PART 1 — INPUT VARIABLES (fill these before submitting)
═══════════════════════════════════════════════════════════════════

PRIMARY_KEYWORD: {{PRIMARY_KEYWORD}}
# Example: "chennai to madurai drop taxi"

SECONDARY_KEYWORDS: {{SECONDARY_KEYWORDS}}
# Semicolon-separated. Every one of these must appear naturally in the final page.
# Example: "chennai to madurai one way taxi; chennai to madurai oneway taxi;
# chennai to madurai taxi fare; chennai to madurai cab booking;
# chennai to madurai innova; cheap chennai to madurai taxi"

URL_SLUG: {{URL_SLUG}}
# Example for a route page: "/chennai-to-madurai-taxi"
# Example for a district page: "/drop-taxi-in-chennai"
# Example for a call-taxi page: "/call-taxi-in-erode"
# Example for an airport page: "/airport-taxi-in-chennai"
# Full URL will be https://droptaxi.ai{{URL_SLUG}} (no www, no .html)

PAGE_TYPE: {{PAGE_TYPE}}
# Pick one: Homepage | District landing page | Route landing page |
# Airport page | Call-taxi page | Neighbourhood page | Service page |
# Tariff/pricing page | Vehicle-type page | Pilgrimage page |
# Hill-station package page | FAQ hub | Blog post | Tool page (calculator)

SEARCH_INTENT: {{SEARCH_INTENT}}
# Pick one: Transactional | Commercial | Informational | Local

ORIGIN_CITY: {{ORIGIN_CITY}}
# Use "N/A" if not a route page.

DESTINATION_CITY: {{DESTINATION_CITY}}
# Use "N/A" if not a route page.

═══════════════════════════════════════════════════════════════════
PART 2 — BUSINESS CONTEXT (do not change — same for every page)
═══════════════════════════════════════════════════════════════════

BRAND: DropTaxi
DOMAIN: droptaxi.ai (no www in canonical URLs — the production ingress 301-redirects www → non-www)
CONTACT:
- Phone (24×7): +91 78100 46010
- WhatsApp: https://wa.me/917810046010
- Telegram bot: https://t.me/droptaxiaibot
- Email: enquiry@droptaxi.ai

SERVICE AREA: Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana, and Puducherry. Cross-border travel to Goa and Maharashtra by request.

USP: One-way fare model — customer pays only for the drop distance, not the return journey. 24/7 booking via call, WhatsApp, or Telegram. Verified drivers. Transparent pricing with no hidden surge or hidden return-fare charge.

FLEET & TARIFF (FINAL — use these exact figures on every page):

| Vehicle | One-way ₹/km | Round-trip ₹/km | Notes |
|---|---|---|---|
| Sedan (Swift Dzire / Etios / Xcent) | **₹13/km** | **₹12/km** | 4+1 |
| SUV (Ertiga / Xylo / Marazzo) | **₹18/km** | **₹17/km** | 6+1 |
| Innova | **₹19/km** | **₹18/km** | 7+1 |
| Innova Crysta | **₹25/km** | **₹23/km** | 6+1, premium |
| Tempo Traveller (12/17 seater) | Quote on request | Quote on request | For group/wedding/pilgrimage |

- Driver bata: ₹300–400 per day (sedan ₹300, SUV/Innova/Crysta ₹400). Multi-day trips: bata × number of days.
- Night-driving allowance (10 PM – 6 AM segment): ₹300 extra
- **Minimum billed distance**: 130 km for one-way trips, 250 km for round-trip trips (300 km for Bengaluru pickups due to permit costs)
- Toll, state-permit fees, parking, hill-station entry charges = extra at actual receipt cost
- AC may be switched off during steep hill-station climbs (industry-standard practice on Yercaud / Ooty / Kodaikanal / Munnar ghats) — explain this in the FAQ if relevant to the page

═══════════════════════════════════════════════════════════════════
PART 3 — DIRECT COMPETITORS YOU MUST BEAT
═══════════════════════════════════════════════════════════════════

These are the 11 sites currently ranking for keywords in this niche. Treat this list as authoritative.

1. **DropTaxi.in** (droptaxi.in) — Same-name competitor (different domain). Brand-led, only ~15 city pages, NO route-page depth. Weak SEO, strong app/brand recall. The ".in" vs ".ai" domain confusion is real — lean into the ".ai" branding to differentiate. **BEAT BY:** depth of route pages, deeper FAQs, AI-era brand narrative on the homepage, structured-data superiority.

2. **SS Drop Taxi** (ssdroptaxi.com) — Industrial-scale route SEO. ~250+ route URLs with thin template content. Tariff: ₹14/km sedan, ₹19/km SUV. **BEAT BY:** even deeper per-page content, FAQ schema, live fare calculator, recent reviews, Tamil-script content, our ₹13/km vs their ₹14/km.

3. **Go2 Oneway Taxi** (go2onewaytaxi.com) — WordPress, 9 city pages, 1,036+ Google reviews showcased. Trust-led, weak long tail. Tariff: ₹13/km sedan, ₹19/km SUV, ₹20/km MUV. **BEAT BY:** better route depth, schema markup across every page type, hill-station packages.

4. **FastTrack Call Taxi** (fasttrackcalltaxi.in) — Established Chennai brand, claims "2,500+ routes". Generic content per page, outstation is secondary product. **BEAT BY:** TN-specific route depth, neighbourhood pages, pricing transparency front-and-centre.

5. **Drop Taxi Madurai** (droptaximadurai.in) — Hyper-local Madurai authority with 12+ neighbourhood pages. Only Madurai-origin routes covered. **BEAT BY:** extend the neighbourhood-page model to Chennai/Coimbatore/Trichy.

6. **Drop Taxi Services** (droptaxi.services) — Chennai-airport anchored. Aggressive ₹11-13/km positioning. Thin route depth. **BEAT BY:** route specificity, broader district coverage, our airport-direct outstation routes (MAA → Tirupati, BLR → Coorg, etc.).

7. **VIP Drop Taxi** (vipdroptaxi.com) — 70+ keyword-variant URLs (one-way-taxi-chennai.html etc), site stagnant since 2021. Tariff: ₹13/km sedan, ₹17/km SUV, ₹18/km Innova. **BEAT BY:** modern UX, schema, current pricing, fresh content, our 310+ route inventory.

8. **HurryUp Cabs** (hurryupcabs.com) — Multi-state operator. Thin TN coverage. USP is "Offer Your Rate" negotiation. **BEAT BY:** TN-specific authority, local trust signals, fixed-fare confidence.

9. **One Way Drop Taxis** (onewaydroptaxis.com) — Exact-match-domain, single-page site, massive meta-keyword stuffing. Tariff: ₹14/km sedan, ₹19/km SUV. **BEAT BY:** actually building proper landing pages — they have none.

10. **One Way Call Taxi** (onewaycalltaxi.com) — Clean route URLs but only ~18 routes. Heavy on Chennai-origin. **BEAT BY:** route breadth from non-Chennai origins (Bangalore, Coimbatore, Madurai, Trichy, Salem all are origins on DropTaxi.ai).

11. **Apple Drop Taxi** (appledroptaxi.com) — Newer WP route pages, growing. Trichy-based. **BEAT BY:** content depth, brand authority, our cross-state coverage they don't match.

═══════════════════════════════════════════════════════════════════
PART 4 — YOUR TASK (11 sections, deliver all)
═══════════════════════════════════════════════════════════════════

Produce a complete, publish-ready content brief in the exact structure below. Do not skip a section. Do not summarise. Do not write meta-commentary about your process.

──────────────────────────────────────────────────────────
SECTION 1 — SERP ANALYSIS (do this BEFORE writing content)
──────────────────────────────────────────────────────────

1A. **Search intent decoded.** What does someone typing PRIMARY_KEYWORD actually want? State the dominant intent in one sentence, then list 2-3 secondary intents.

1B. **SERP features likely present.** List which Google features appear for this query and what each implies for our page:
   - Map Pack (Yes/No — implications: GMB optimisation required)
   - Featured Snippet (Yes/No — implications: structure first answer as a 40-50 word paragraph)
   - People Also Ask (Yes/No — list 6-8 likely PAA questions; we'll target these in FAQ)
   - Sitelinks (Yes/No)
   - Image pack (Yes/No)
   - Ads above the fold (Yes/No — implies high commercial intent)
   - Local Pack (Yes/No)
   - Knowledge Panel for brand queries (Yes/No)

1C. **Competitor weakness inventory.** For each of the 3 competitors most likely to rank #1-3 for this exact keyword, identify:
   - URL they probably rank with
   - What that page does well (1 sentence)
   - 3 specific weaknesses we will exploit (e.g., "no FAQ schema", "tariff table is static — no live calculator", "no Tamil content", "thin content under 600 words", "reviews are old/generic", "no internal links to sibling routes")
   Be concrete — never vague phrases like "content could be better".

1D. **Content gap inventory.** List 5-8 topics, modules, or trust signals that NO competitor currently covers for this keyword but searchers would value. These become our differentiators.

1E. **Word count target.** Recommend a word count band based on (top-3 average × 1.3). For most route pages this lands at 1,500–2,200 words. For district pages 2,000–2,800. For service pages 1,200–1,800. For tool pages 600–900 + interactive widget. Justify your specific number.

──────────────────────────────────────────────────────────
SECTION 2 — SEO META BLOCK
──────────────────────────────────────────────────────────

2A. **Title tag** (50-60 chars, primary keyword in first 4 words, brand at end)
   Format: `[Primary keyword] | [Differentiator] | DropTaxi`
   Example: `Chennai to Madurai Drop Taxi | ₹13/km | DropTaxi`

2B. **Meta description** (150-160 chars, primary keyword + clear value + CTA)
   Format: `[Hook with primary keyword]. [Differentiator with number]. [CTA with phone].`
   Example: `Book Chennai to Madurai drop taxi from ₹13/km. 460 km, 7 hours, no return fare. Call 78100 46010 for instant booking.`

2C. **URL slug** — confirm or improve URL_SLUG. Use lowercase, hyphens, no `.html` extension. DropTaxi.ai's URL conventions:
   - Routes: `/{origin}-to-{dest}-taxi` (or `-cab` for hill-station variants)
   - District/city hubs: `/drop-taxi-in-{city}`
   - Call-taxi pages: `/call-taxi-in-{city}`
   - Airport pages: `/airport-taxi-in-{city}` or `/{city}-airport-taxi`
   - Static: `/tariff`, `/contact`, `/about-us`, `/book-now`

2D. **Canonical URL** — `https://droptaxi.ai{{URL_SLUG}}` (always non-www, never .html)

2E. **Open Graph** — og:title, og:description, og:image (use `https://droptaxi.ai/images/og-cover.png` by default; suggest a route-specific image filename if available).

2F. **Twitter card** — `summary_large_image`; same content as OG unless a different angle is needed.

──────────────────────────────────────────────────────────
SECTION 3 — PAGE OUTLINE (H-tag hierarchy)
──────────────────────────────────────────────────────────

Give the complete H1 → H2 → H3 structure. Number every heading. The H1 must contain the primary keyword exactly. Every secondary keyword must map to at least one H2 or H3 (state which heading covers which keyword).

Required H2 sections for ROUTE PAGES (adapt for other page types):
- Why book this route with DropTaxi
- Distance, travel time, and route overview
- Tariff and fare details
- What's included and what's extra
- Pickup zones in [origin city]
- Drop-off zones in [destination city]
- Stops, sightseeing, and food along the route
- Best time to travel and traffic notes
- Vehicle options for this route
- Other popular routes from [origin city]
- Customer reviews
- FAQs
- How to book

Required H2 sections for DISTRICT PAGES:
- About [district] and travel demand
- All sub-areas we serve in [district]
- Top 10 routes from [district]
- Top 10 routes to [district]
- Tariff for trips originating in [district]
- Vehicle options
- Airport / railway station / temple pickup
- Customer reviews
- FAQs

──────────────────────────────────────────────────────────
SECTION 4 — SECTION-BY-SECTION CONTENT
──────────────────────────────────────────────────────────

For each H2 from Section 3, write:

4-X-a. **Publish-ready prose** — 100-300 words per section, written in clear Indian English, no AI clichés. Include real distances, specific area names, actual time estimates, ₹ figures from the Business Context tariff. Avoid: "in today's fast-paced world", "look no further", "ultimate guide", "in conclusion", "stress-free", "hassle-free" (used more than once on the page).

4-X-b. **Internal links to insert** — list 2-4 anchor texts and target URLs on droptaxi.ai that should appear in this section.

4-X-c. **Image to insert** — one image per major section. Specify: filename (kebab-case, with primary keyword), alt text (descriptive, includes secondary keyword naturally, never stuffed), what the image should show, where to source (real photo / stock photo type / illustration / custom graphic).

4-X-d. **Table, list, or callout?** — note if this section needs a structured element (e.g., the tariff section needs a comparison table; the FAQ section needs structured Q&A).

CRITICAL CONTENT INSTRUCTIONS:
- Use specific South India place names, not generic phrases.
- Use the rupee symbol ₹ correctly.
- Format distances as "330 km" and times as "5 hours 30 minutes".
- Indian English spelling (favour, colour, organise).
- Mobile-first: short paragraphs (2-4 sentences), scannable subheads, bullet lists where appropriate.
- Mention real landmarks: Marina Beach, Meenakshi Temple, Rockfort Temple, Brihadeeswarar Temple, Auroville, Coaker's Walk, Doddabetta, Pamban Bridge, Tirumala hills, Hampi ruins, Mysore Palace, Kovalam beach, Munnar tea estates — pick what fits this page.
- For route pages, write the route narrative as a journey description — what the passenger will see, where they'll stop, what to expect.
- Trust signals must be specific: "₹300-400 driver bata, no surge pricing, no advance payment for trips under ₹5,000, GPS-tracked rides, verified drivers with commercial-licence checks" — not vague phrases like "transparent pricing".

──────────────────────────────────────────────────────────
SECTION 5 — SCHEMA MARKUP (JSON-LD, valid and complete)
──────────────────────────────────────────────────────────

Output complete, copy-paste-ready JSON-LD blocks:

5A. **LocalBusiness / TaxiService schema** — full NAP using DropTaxi details:
- `"name": "DropTaxi"`
- `"telephone": "+91-78100-46010"`
- `"email": "enquiry@droptaxi.ai"`
- `"url": "https://droptaxi.ai"`
- `"openingHours": "Mo-Su 00:00-23:59"` (24×7)
- `"paymentAccepted": "Cash, UPI, Card, Bank Transfer"`
- `"priceRange": "INR 13/km onwards"`
- `"areaServed": ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana", "Puducherry"]`
- `"sameAs": ["https://wa.me/917810046010", "https://t.me/droptaxiaibot"]`
- `"aggregateRating"` placeholder

5B. **BreadcrumbList schema** — Home > [Category] > [Current page]. Use `https://droptaxi.ai/` as the home URL.

5C. **FAQPage schema** — must match the FAQ section content from Section 4 exactly. Include all 8-12 Q&A pairs.

5D. **Service schema** (for route/service pages) — includes serviceType, provider (DropTaxi), areaServed, offers with price (e.g., `"price": "₹13/km"`, `"priceCurrency": "INR"`).

5E. **AggregateRating + Review schema** — as placeholders for the user to populate with real reviews. Use `itemReviewed=Service`, `ratingValue` placeholder, `reviewCount` placeholder.

──────────────────────────────────────────────────────────
SECTION 6 — INTERNAL LINKING PLAN
──────────────────────────────────────────────────────────

List 10-15 internal links this page should have, in 4 categories:

6A. **Up-the-funnel links** (2-3) — to homepage and relevant district/city hub. Include exact anchor text and target URL.

6B. **Sibling-page links** (5-7) — to related route or district pages on droptaxi.ai. Anchor must match the target page's primary keyword.

6C. **Down-funnel links** (2-3) — to `/book-now`, `/tariff`, `/contact`, or a fare-calculator if applicable. Use action-oriented anchor text.

6D. **Cross-cluster links** (2-3) — to a blog post, FAQ hub, or service page (e.g., `/one-way-cab-booking`, `/outstation-cabs`) that adds context.

Anchor text rules:
- Never use "click here", "read more", "this page".
- Always descriptive, includes the target keyword naturally.
- Vary anchor text across the page (don't repeat the exact same anchor 3+ times).

──────────────────────────────────────────────────────────
SECTION 7 — IMAGE PLAN
──────────────────────────────────────────────────────────

List 5-8 images this page needs. For each:
- Position on page (above the fold / section 2 / section 4 / etc.)
- Suggested type (real route photo / cab photo / map / illustration / icon / GIF)
- SEO-friendly filename (kebab-case, includes primary keyword once)
- Alt text (descriptive, ≤125 characters, includes a secondary keyword naturally)
- Compression target: ≤150 KB, WebP format preferred
- Width: 1200px hero, 800px inline

──────────────────────────────────────────────────────────
SECTION 8 — THE "BEAT THE COMPETITORS" CHECKLIST
──────────────────────────────────────────────────────────

List 6-10 specific, verifiable tactics this page uses to outrank the 3 most likely top-ranking competitors. Each tactic must be concrete (not "better content"). Examples of the right kind of specificity:

✓ "Live fare calculator widget — SS Drop Taxi only has static price table"
✓ "FAQ section with 12 questions in FAQPage schema — competitors average 4 questions, no schema"
✓ "Tamil-script intro paragraph in collapsible section — zero competitors have this"
✓ "Embedded Google Map showing route — competitors use static images"
✓ "Mentioned 8 specific pickup zones in Chennai vs SS Drop Taxi's vague 'door pickup'"
✓ "Recent customer review (timestamp in last 30 days) — competitors show 2-year-old reviews"
✓ "Schema includes AggregateRating, Service, FAQ, Breadcrumb — competitors have none"
✓ "Telegram-bot booking shortcut (@droptaxiaibot) — no competitor offers bot booking"

Avoid:
✗ "Better written content"
✗ "More keywords used"
✗ "More user-friendly"

──────────────────────────────────────────────────────────
SECTION 9 — TAMIL VOICE-SEARCH ADAPTATION
──────────────────────────────────────────────────────────

Write a 100-150 word Tamil-language intro paragraph (in Tamil script, e.g., ஒரு வழி டாக்ஸி), to be placed in a collapsible section on the page. This captures growing Tamil voice-search traffic that no competitor currently serves. The Tamil version should cover: what the service is, the route or city, pricing (₹13/km onwards), and a booking CTA with the phone number 78100 46010.

After the Tamil script, also provide a transliterated (Tanglish) version for users typing in Roman script — same content, 80-100 words, written as Tamil speakers type on phone keyboards (e.g., "Chennai-le irundhu Madurai-ku oneway taxi venuma? DropTaxi-le ₹13/km-le book pannunga, return fare illa. Call 78100 46010.").

──────────────────────────────────────────────────────────
SECTION 10 — TRACKING & MEASUREMENT
──────────────────────────────────────────────────────────

10A. **Primary query to monitor in Google Search Console** — list the exact query string.

10B. **Secondary queries to monitor** — 5-8 long-tail variations.

10C. **GA4 KPI** — pick the right conversion event: `form_submit` / `call_click` (tel:+917810046010) / `whatsapp_click` (wa.me/917810046010) / `telegram_click` (t.me/droptaxiaibot) / `booking_complete`. Justify the choice.

10D. **90-day ranking expectation** — given the competitive landscape and the page's priority, state a realistic ranking band at day 30, day 60, day 90. Format: "Day 30: positions 30-50. Day 60: 15-25. Day 90: 8-15 (top 10 if backlinks acquired by day 60)."

10E. **Refresh schedule** — when should this page be updated? (Quarterly for tariff figures; after every new route added in the cluster; when a competitor publishes something better).

──────────────────────────────────────────────────────────
SECTION 11 — CONTENT QC CHECKLIST (run before publishing)
──────────────────────────────────────────────────────────

Output a 12-item checklist the writer/editor uses before hitting Publish:

☐ Primary keyword in title tag (first 4 words), H1, first 100 words, and URL
☐ All secondary keywords present, each in a unique sentence (no stuffing)
☐ Word count within target band from Section 1E
☐ At least one H2 starts with a question users actually search (PAA target)
☐ Tariff figures match the current DropTaxi rate card (Sedan ₹13, SUV ₹18, Innova ₹19, Crysta ₹25 one-way)
☐ Phone number is the current 78100 46010 (not any older number)
☐ Every image has alt text, none keyword-stuffed
☐ All internal links resolve (no 404s) and use varied anchor text
☐ JSON-LD validates in Google Rich Results Test
☐ No AI clichés: "in today's", "look no further", "ultimate guide", "in conclusion", "hassle-free" used more than once
☐ Tamil section included and renders in Unicode
☐ Mobile preview: no horizontal scroll, tap targets ≥48px, CLS <0.1
☐ Page submitted to Google Search Console "Request Indexing" after publish

═══════════════════════════════════════════════════════════════════
PART 5 — OUTPUT FORMAT
═══════════════════════════════════════════════════════════════════

Deliver everything as plain markdown, in the exact order Section 1 → Section 11. Use H2 headings for each section (`## SECTION 1 — ...`). Use code blocks for JSON-LD. Use tables where specified. Do not add a meta-commentary about your process. Do not summarise. Do not skip any section. Begin now.

---

## QUICK-REFERENCE: HOW TO USE THIS PROMPT

**STEP 1** — Pick a page you want to build from your route/city/district inventory in `lib/pages.ts`.

**STEP 2** — Fill in the `{{VARIABLES}}` block at the top of this prompt. Example for the Chennai→Madurai route:

```
PRIMARY_KEYWORD: chennai to madurai drop taxi
SECONDARY_KEYWORDS: chennai to madurai one way taxi; chennai to madurai oneway taxi; chennai to madurai taxi; chennai to madurai cab; chennai to madurai taxi fare; chennai to madurai taxi booking; chennai to madurai cab booking; chennai to madurai outstation taxi; chennai to madurai call taxi; chennai to madurai innova; chennai to madurai sedan; cheap chennai to madurai taxi; best chennai to madurai drop taxi; chennai to madurai one way drop taxi; chennai to madurai taxi distance; chennai to madurai cab price
URL_SLUG: /chennai-to-madurai-taxi
PAGE_TYPE: Route landing page
SEARCH_INTENT: Transactional
ORIGIN_CITY: Chennai
DESTINATION_CITY: Madurai
```

**STEP 3** — Paste the WHOLE prompt (including the filled variables) into Claude (claude.ai), ChatGPT, or Gemini.

**STEP 4** — The AI returns 11 sections: SERP analysis, meta block, page outline, full content, schema markup, internal linking plan, image plan, beat-the-competitors checklist, Tamil version, tracking plan, and QC checklist.

**STEP 5** — Hand the output to a writer for a 30-minute polish: real testimonials, current ₹ figures, remove any leftover AI tells.

**STEP 6** — Plug the output into `lib/pages.ts` (or its data dependencies in `lib/route-data.ts` / `CITY_DATA`) for the relevant page. Deploy via the existing Next.js pipeline.

**STEP 7** — Submit the new URL to Google Search Console → URL Inspection → Request Indexing.

**STEP 8** — Repeat for the next page in priority order. Realistic pace: 5-10 pages per week per writer.

## BATCH AUTOMATION (optional)

If you want to generate hundreds of page briefs at once instead of clicking through one at a time, use the Anthropic Claude API or OpenAI API. A Python script that loops through a Page Clusters sheet, fills the variables, calls the API, and saves each output as a markdown file takes ~60 lines of code and a few hours to run, at roughly ₹3,000-5,000 in API costs per 250 pages.

## DROPTAXI.AI-SPECIFIC NOTES (read before publishing)

- **Live URL pattern**: Production serves Next.js dynamic routes WITHOUT `.html` extension. The canonical URL for a route is `https://droptaxi.ai/chennai-to-madurai-taxi`, NOT `…/chennai-to-madurai-taxi.html`. Any redirect from the `.html` form is handled in `next.config.ts redirects()`.
- **Sitemap**: Generated dynamically by `app/sitemap.ts` from `getAllPages()` in `lib/pages.ts`. To add a new page to the sitemap, add its slug to the appropriate array in `pages.ts` and ensure its data lives in `route-data.ts` / `CITY_DATA`.
- **Phone everywhere**: `78100 46010` (display), `+917810046010` (E.164 for tel: hrefs), `917810046010` (digits-only for wa.me URLs). These live as constants in `lib/constants.ts` (`SUPPORT_PHONE_E164`, `SUPPORT_PHONE_DISPLAY`, `WHATSAPP_NUMBER`, `WHATSAPP_URL`). Reference the constants in code; never hardcode.
- **Tariff change protocol**: Update `ONE_WAY_RATES` / `ROUND_TRIP_RATES` / `ONE_WAY_MIN_KM` / `ROUND_TRIP_MIN_KM` in `lib/constants.ts` AND `computeFares` in `lib/route-data.ts`. Re-run the Next.js build. Then refresh any blog or comparison-article fare numbers manually (they're prose, not interpolated).
- **GSC verification token**: `hRns6LumNxy9kr8c52dLp4P7BSuIdC4zdCHeIq4DQnQ` — already on every page via `app/layout.tsx` `verification.google` metadata field.
