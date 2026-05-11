# Batch SEO Brief Generator — Usage

`scripts/batch_briefs.py` generates a publish-ready SEO content brief for
every page on droptaxi.ai by calling the Anthropic Claude API with the
master prompt at `docs/master-seo-prompt.md` and per-page variable
injection. Output: one markdown file at `docs/briefs/{slug}.md`.

## Quick start

```bash
# 1. Install the Anthropic Python SDK
pip install -r scripts/requirements.txt

# 2. Set your API key (get one at https://console.anthropic.com/)
#    PowerShell:
$env:ANTHROPIC_API_KEY = "sk-ant-..."
#    bash:
export ANTHROPIC_API_KEY=sk-ant-...

# 3. Preview the queue without spending any money
python scripts/batch_briefs.py --dry-run

# 4. Smoke-test with 5 briefs (~₹40, ~5 min)
python scripts/batch_briefs.py --limit 5

# 5. Generate one specific page
python scripts/batch_briefs.py --only chennai-to-bangalore-taxi

# 6. Full batch (all ~423 pages, ~75 min, ~₹2,500-3,500 on Sonnet)
python scripts/batch_briefs.py
```

## What gets generated

Each brief is ~4,000 words of publish-ready markdown structured to the
11-section master-prompt schema:

1. SERP analysis with named competitor URLs and exploitable weaknesses
2. Meta block (title + description + canonical + OG/Twitter)
3. Page outline (H1 → H3, every secondary keyword mapped)
4. Section-by-section content with real fares, named locations, internal links
5. Five complete JSON-LD schema blocks (TaxiService, Breadcrumb, FAQPage,
   Service+Offer, AggregateRating+Review)
6. Internal linking plan (10-15 links classified by funnel position)
7. Image plan (5-8 images with filenames, alt text, source notes)
8. Beat-the-competitors checklist (6-10 concrete tactics)
9. Tamil + Tanglish voice-search section
10. Tracking & measurement plan (GA4 events, GSC queries, ranking forecast)
11. Pre-publish QC checklist

## Pages covered

`build_queue()` parses `lib/pages.ts` and discovers:

| Page type | Count | Slug pattern |
|---|---|---|
| Route landing pages | ~310 | `{from}-to-{to}-taxi` or `-cab` |
| District / city hubs | ~50 | `/drop-taxi-in-{city}` |
| Call-taxi local pages | ~50 | `/call-taxi-in-{city}` or `/call-taxi-{city}` |
| Airport pages | ~14 | `/airport-taxi-in-{city}` or `/{city}-airport-taxi` |

**Static pages (~35)** like `/about-us`, `/tariff`, `/contact`, `/book-now`
are not auto-included — each needs hand-coded primary/secondary keywords.
Generate those manually with `--only` after editing the script or by
pasting `docs/master-seo-prompt.md` into Claude/ChatGPT directly.

## Resume on failure

The script skips any page that already has a file at
`docs/briefs/{slug}.md`. To regenerate a single brief, delete the file
first then re-run with `--only {slug}`.

## Cost & speed

The script uses **Anthropic prompt caching** on the static portion of
the master prompt (PART 2-4: business context, competitors, task
structure). After the first request, ~9 KB of system prompt is cached
and reused at 10% cost — meaningful savings across 400+ calls.

| Model | Input $/M | Output $/M | Per brief | × 423 |
|---|---|---|---|---|
| **claude-sonnet-4-6** (default) | $3 | $15 | ~$0.07 | **~$30** (₹2,500) |
| claude-opus-4-7 | $15 | $75 | ~$0.45 | ~$190 (₹16,000) |

Concurrency default is 5 workers, which lands at ~40 RPM (under
Anthropic's 50 RPM default-tier limit with headroom for retries). Full
batch completes in ~75 minutes.

## After generation

Each brief is plain markdown. To deploy the content:

**Quick path** — Open the brief, copy the section §7 trust paragraph, and
paste it into the `description` field of the matching entry in
`lib/route-data.ts` `ROUTE_DATA`. The Next.js build picks up the new
description automatically. Catches ~70% of the SEO lift with minimal
code changes.

**Full path** — Extend `RouteInfo` (in `lib/route-data.ts`) and the
`RoutePage` React component to render the brief's structured fields
(fare table, pickup zones, drop zones, FAQ, schema, Tamil section).
Then iterate over the briefs in a build step that pre-populates the
extended fields. This is the long-term right answer if you batch-publish
all 400+ briefs.

The brief itself is the source-of-truth artifact; the page renderer is
just one consumer of it.

## Troubleshooting

- **`ANTHROPIC_API_KEY not set`** — export the env var (see Quick start)
- **`rate-limited`** — script auto-backs-off; just wait
- **`anthropic package not installed`** — `pip install -r scripts/requirements.txt`
- **Same page generated twice** — check that the slug isn't listed in
  two arrays in `lib/pages.ts` (we de-dupe in queue but the second one
  silently wins)
- **A brief is too short / missing sections** — re-run with
  `--model claude-opus-4-7` for that slug; Opus produces deeper output

## Generated briefs already in this repo

| Slug | Status | Author |
|---|---|---|
| `chennai-to-madurai-taxi` | Manual reference brief (template demo) | Claude session 2026-05-12 |

This first manual brief established the format; all subsequent briefs
should match its depth and structure. The batch script's output will
follow the same shape because both share `docs/master-seo-prompt.md`.
