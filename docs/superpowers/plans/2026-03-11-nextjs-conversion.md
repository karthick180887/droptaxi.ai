# DropTaxi Next.js Conversion & Tilt Deployment

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the 232-page static HTML DropTaxi site to a Next.js 16 App Router project with the same dark glassmorphism design, preserving all SEO content, and deploy via Tilt on port 3005.

**Architecture:** Next.js App Router with a `[slug]` catch-all for all 232 pages. Page content is stored as structured data in `lib/pages.ts`. The existing dark glassmorphism CSS is kept as-is in `globals.css` (no Tailwind conversion — the design is distinct from other sites). Shared layout components (Header, Footer, FloatingCTA) are React components. Static generation via `generateStaticParams`.

**Tech Stack:** Next.js 16.1.4, React 19, TypeScript, Inter font (Google Fonts via next/font), existing CSS design system (dark glassmorphism), Docker multi-stage build, Kubernetes, Tilt

**Domain:** `seorankpro.in` (current canonical URL in the HTML pages)

**Key Design Decisions:**
- Keep the existing CSS as-is (no Tailwind) — the dark glassmorphism theme is unique and complete
- All 232 pages use a data-driven `[slug]` route with `generateStaticParams`
- Page data is extracted from HTML files into a structured TypeScript data file
- Header mega-nav is converted to a React client component
- WhatsApp quote form becomes a React client component
- Google Ads tag (AW-17807110881) goes in layout.tsx via next/script

---

## Chunk 1: Project Scaffold & Infrastructure

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `.gitignore`
- Create: `next-env.d.ts`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "droptaxi",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "lucide-react": "^0.562.0",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create .gitignore**

Standard Next.js gitignore: `node_modules/`, `.next/`, `out/`, `.env*.local`

- [ ] **Step 5: Run npm install**

Run: `cd E:/Websites/droptaxi && npm install`
Expected: `node_modules/` created, `package-lock.json` generated

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts .gitignore
git commit -m "chore: initialize Next.js 16 project for DropTaxi"
```

---

### Task 2: Docker & Kubernetes Setup

**Files:**
- Create: `Dockerfile`
- Create: `k8s-deployment.yaml`

- [ ] **Step 1: Create Dockerfile**

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

- [ ] **Step 2: Create k8s-deployment.yaml**

Namespace: `droptaxi`, Deployment name: `droptaxi-web`, image: `docker.io/karthick1808/droptaxi-web:latest`, Ingress hosts: `seorankpro.in` and `www.seorankpro.in`. Follow the exact pattern from onewaytaxi's k8s-deployment.yaml but with droptaxi-specific values.

- [ ] **Step 3: Commit**

```bash
git add Dockerfile k8s-deployment.yaml
git commit -m "chore: add Docker and Kubernetes deployment config"
```

---

### Task 3: Add to Tiltfile

**Files:**
- Modify: `E:/Websites/Tiltfile` (append after line 65)

- [ ] **Step 1: Add droptaxi block to Tiltfile**

Append after the OneWayTaxi block:

```python
### DropTaxi Website ###

docker_build(
  'docker.io/karthick1808/droptaxi-web',
  './droptaxi',
  dockerfile='./droptaxi/Dockerfile',
)

k8s_yaml('./droptaxi/k8s-deployment.yaml')
k8s_resource('droptaxi-web', port_forwards='3005:3000', labels="frontend")

### End of DropTaxi ###
```

- [ ] **Step 2: Commit**

```bash
git add Tiltfile
git commit -m "chore: add droptaxi to Tiltfile on port 3005"
```

---

## Chunk 2: Core Layout, CSS & Shared Components

### Task 4: Global CSS & Layout

**Files:**
- Create: `app/globals.css` — Copy the entire `assets/css/styles.css` as-is
- Create: `app/layout.tsx`
- Create: `public/` directory — Copy all images from `assets/images/`

- [ ] **Step 1: Copy CSS file**

Copy `assets/css/styles.css` content into `app/globals.css`. No modifications needed — it's a self-contained design system.

- [ ] **Step 2: Copy public assets**

Copy `assets/images/*` into `public/images/`. This includes: `favicon.svg`, `og-cover.svg`, `hero-highway.png`, `fleet-showcase.png`, `car-interior.png`, `driver-professional.png`, `happy-customers.png`, `airport-pickup.png`.

Also copy `site.webmanifest` to `public/` if it exists.

- [ ] **Step 3: Create app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Drop Taxi & One Way Cab in South India | DropTaxi",
  description: "Book drop taxi and one way cab service across South India. Fast confirmation, transparent one way taxi price, verified drivers, and 24x7 support.",
  keywords: ["drop taxi", "one way cab", "one way taxi South India", "one way cab booking", "outstation cabs one way"],
  authors: [{ name: "DropTaxi" }],
  icons: { icon: "/images/favicon.svg" },
  openGraph: {
    type: "website",
    title: "One Way Taxi in South India | DropTaxi",
    description: "Reliable one way cabs across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana, and Puducherry.",
    url: "https://www.seorankpro.in/",
    siteName: "DropTaxi",
    images: [{ url: "https://www.seorankpro.in/images/og-cover.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Way Taxi in South India | DropTaxi",
    description: "Book one way intercity taxis with transparent pricing and fast confirmation.",
    images: ["https://www.seorankpro.in/images/og-cover.svg"],
  },
  metadataBase: new URL("https://www.seorankpro.in"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17807110881"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-17807110881');`}
        </Script>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx public/
git commit -m "feat: add global layout, CSS design system, and public assets"
```

---

### Task 5: Constants & Site Data

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Create lib/constants.ts**

```ts
export const APP_NAME = "DropTaxi";
export const SUPPORT_PHONE = "+91 63838 83922";
export const WHATSAPP_NUMBER = "916383883922";
export const SUPPORT_EMAIL = "enquiry@seorankpro.in";
export const SITE_URL = "https://www.seorankpro.in";
export const GTAG_ID = "AW-17807110881";

export const VEHICLE_TYPES = [
  { name: "Sedan", description: "Budget-friendly choice for 2-4 passengers and medium luggage." },
  { name: "SUV", description: "Extra comfort for family travel and long-route convenience." },
  { name: "Innova Crysta", description: "Premium option for group travel and corporate bookings." },
  { name: "Tempo Traveller", description: "For large groups and pilgrimage travel." },
];

export const TRUST_BADGES = ["No Return Fare", "24x7 Live Support", "GPS-Tracked Trips", "Verified Drivers"];
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add site constants and configuration"
```

---

### Task 6: Header Component (Client Component)

**Files:**
- Create: `components/Header.tsx`

- [ ] **Step 1: Create Header.tsx**

Convert the mega-nav HTML structure to a React client component. The mega-nav has 4 dropdown sections: Routes (from major cities), Cities (drop-taxi and call-taxi), Airport, More (services + company). Use `useState` for mobile menu toggle and mega-dropdown hover/click behavior. Use `Link` from `next/link` for navigation. Remove `.html` extensions from all links.

Key data to embed:
- Route links grouped by "From Chennai", "From Bangalore", "From Madurai", "From Coimbatore", "From Salem", "From Pondicherry"
- City links for drop-taxi and call-taxi locations
- Airport transfer links
- Service and company pages

Use `"use client"` directive. Port the JS behavior from `site.js` (mobile toggle, mega-dropdown hover intent with 200ms delay, escape key close).

- [ ] **Step 2: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add Header component with mega-nav"
```

---

### Task 7: Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

Server component. Contains 3-column grid: Brand info, Quick Links, Contact. Copyright line at bottom. Matches the existing footer HTML structure. All links use next/link without `.html` extensions.

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 8: FloatingCTA Component

**Files:**
- Create: `components/FloatingCTA.tsx`

- [ ] **Step 1: Create FloatingCTA.tsx**

Client component with WhatsApp and Call floating buttons (bottom-right), matching the pattern from onewaytaxi but using the DropTaxi phone number and brand colors (indigo/amber from the CSS variables).

- [ ] **Step 2: Commit**

```bash
git add components/FloatingCTA.tsx
git commit -m "feat: add FloatingCTA component"
```

---

## Chunk 3: Page Data & Dynamic Routes

### Task 9: Page Data Structure

**Files:**
- Create: `lib/pages.ts`

- [ ] **Step 1: Design the page data interface**

```ts
export type PageType = 'home' | 'route' | 'city' | 'call-taxi' | 'airport' | 'static';

export interface RoutePage {
  slug: string;
  type: 'route';
  from: string;
  to: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  fare: string;
  distance: string;
  travelTime: string;
  breadcrumbs: { label: string; href: string }[];
}

export interface CityPage {
  slug: string;
  type: 'city' | 'call-taxi';
  city: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  breadcrumbs: { label: string; href: string }[];
}

export interface AirportPage {
  slug: string;
  type: 'airport';
  city: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  breadcrumbs: { label: string; href: string }[];
}

export interface StaticPage {
  slug: string;
  type: 'static';
  title: string;
  metaDescription: string;
  h1: string;
}

export type PageData = RoutePage | CityPage | AirportPage | StaticPage;
```

- [ ] **Step 2: Extract page data from HTML files**

Write a node script (`scripts/extract-pages.ts`) that reads all 232 HTML files, extracts title, meta description, h1, lead text, breadcrumbs, and page-specific data (fare, distance, travel time for routes). Output as a TypeScript data file.

Alternatively, manually define the data arrays for each page type since the HTML content follows predictable patterns.

The key data arrays:
- `ROUTE_PAGES`: ~105 entries with from, to, slug, fare, distance, travelTime
- `CITY_PAGES`: ~45 entries (drop-taxi-in-X pattern)
- `CALL_TAXI_PAGES`: ~40 entries (call-taxi-in-X pattern)
- `AIRPORT_PAGES`: ~10 entries
- `STATIC_PAGES`: about-us, contact, faq, reviews, blogs, tariff, privacy-policy, terms-and-conditions, all-routes, cities, routes, one-way-cab-booking, outstation-cabs, book-now

Export `getAllPages()` and `getPageBySlug(slug)` functions.

- [ ] **Step 3: Commit**

```bash
git add lib/pages.ts scripts/
git commit -m "feat: add page data structure and extraction"
```

---

### Task 10: Dynamic [slug] Route

**Files:**
- Create: `app/[slug]/page.tsx`

- [ ] **Step 1: Create the catch-all slug page**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getAllPages } from "@/lib/pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import RoutePage from "@/components/pages/RoutePage";
import CityPage from "@/components/pages/CityPage";
import AirportPage from "@/components/pages/AirportPage";
import StaticPage from "@/components/pages/StaticPage";

export function generateStaticParams() {
  return getAllPages().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `https://www.seorankpro.in/${page.slug}`,
      siteName: "DropTaxi",
      type: "website",
    },
    alternates: {
      canonical: `https://www.seorankpro.in/${page.slug}`,
    },
  };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <Header />
      <main id="main-content" className="page-main">
        {page.type === "route" && <RoutePage data={page} />}
        {(page.type === "city" || page.type === "call-taxi") && <CityPage data={page} />}
        {page.type === "airport" && <AirportPage data={page} />}
        {page.type === "static" && <StaticPage data={page} />}
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/[slug]/page.tsx
git commit -m "feat: add dynamic [slug] route with static generation"
```

---

### Task 11: Page Template Components

**Files:**
- Create: `components/pages/RoutePage.tsx`
- Create: `components/pages/CityPage.tsx`
- Create: `components/pages/AirportPage.tsx`
- Create: `components/pages/StaticPage.tsx`
- Create: `components/shared/Breadcrumbs.tsx`
- Create: `components/shared/FAQSection.tsx`
- Create: `components/shared/QuoteCard.tsx`

- [ ] **Step 1: Create Breadcrumbs component**

Server component rendering `<ol class="breadcrumbs">` with links matching the existing HTML structure.

- [ ] **Step 2: Create QuoteCard component**

Client component with the WhatsApp quote form (pickup, drop, date, car type, phone). On submit, opens WhatsApp with pre-filled message. Matches the existing `quote-card` HTML class.

- [ ] **Step 3: Create FAQSection component**

Server component rendering `<details>/<summary>` elements within `faq-list` class.

- [ ] **Step 4: Create RoutePage component**

Renders: breadcrumbs, eyebrow "One Way Route Page", h1, lead, route snapshot (fare, distance, travel time), quote card, car types section, FAQ section, explore more section.

- [ ] **Step 5: Create CityPage component**

Renders: breadcrumbs, eyebrow (city service type), h1, lead, booking highlights, quote card, FAQ section, explore more section.

- [ ] **Step 6: Create AirportPage component**

Renders: breadcrumbs, eyebrow "Airport Taxi Service", h1, lead, service details, quote card, FAQ section.

- [ ] **Step 7: Create StaticPage component**

Handles about-us, contact, faq, reviews, blogs, tariff, privacy-policy, terms pages. Each gets a tailored content section rendered from the page data.

- [ ] **Step 8: Commit**

```bash
git add components/pages/ components/shared/
git commit -m "feat: add page template components (Route, City, Airport, Static)"
```

---

## Chunk 4: Homepage & SEO

### Task 12: Homepage

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create homepage**

Server component that renders the full homepage matching the existing `index.html` structure:
1. Hero section with quote form
2. Hero banner image
3. Popular routes grid
4. Most booked pages grid
5. Fleet & service gallery
6. Why DropTaxi features grid
7. Service coverage section with stats
8. How booking works steps
9. FAQ section
10. CTA band

Use the existing CSS classes: `hero`, `hero-grid`, `hero-copy`, `quote-card`, `route-grid`, `route-card`, `landing-grid`, `landing-card`, `trust-gallery`, `feature-grid`, `check-list`, `stat-card`, `steps`, `faq-list`, `cta-band`.

Include JSON-LD schema markup for WebSite, TaxiService, FAQPage, and BreadcrumbList.

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add homepage with hero, routes, fleet, FAQ, and CTA sections"
```

---

### Task 13: SEO Files

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create robots.ts**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.seorankpro.in/sitemap.xml",
  };
}
```

- [ ] **Step 2: Create sitemap.ts**

Generate sitemap entries for all 232 pages + homepage. Use `getAllPages()` to get all slugs.

- [ ] **Step 3: Create not-found.tsx**

Simple 404 page matching the dark glassmorphism theme with a link back to homepage.

- [ ] **Step 4: Commit**

```bash
git add app/robots.ts app/sitemap.ts app/not-found.tsx
git commit -m "feat: add robots.txt, sitemap.xml, and 404 page"
```

---

### Task 14: Schema Markup Component

**Files:**
- Create: `components/shared/SchemaMarkup.tsx`

- [ ] **Step 1: Create SchemaMarkup**

Server component that renders JSON-LD schema for each page type:
- Route pages: `Service` schema with provider TaxiService, areaServed, offers with price
- City pages: `Service` schema with provider TaxiService, areaServed, serviceType
- Homepage: `WebSite` + `TaxiService` + `FAQPage` schemas
- All pages: `BreadcrumbList` schema

- [ ] **Step 2: Commit**

```bash
git add components/shared/SchemaMarkup.tsx
git commit -m "feat: add JSON-LD schema markup component"
```

---

## Chunk 5: Build Verification & Launch

### Task 15: Build & Verify

- [ ] **Step 1: Run local build**

Run: `cd E:/Websites/droptaxi && npm run build`
Expected: Successful build with 232+ static pages generated

- [ ] **Step 2: Test locally**

Run: `npm run dev`
Verify: Homepage loads at localhost:3000, route pages load (e.g., `/chennai-to-bangalore-taxi`), city pages load (e.g., `/drop-taxi-in-chennai`), mega-nav works, WhatsApp form works, responsive design intact.

- [ ] **Step 3: Verify URL parity**

All 232 original HTML URLs (minus `.html` extension) should resolve to the correct Next.js pages. Spot-check 10+ pages across all page types.

- [ ] **Step 4: Test Tilt deployment**

Run: `tilt up` from `E:/Websites/`
Verify: droptaxi-web resource appears on port 3005

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete DropTaxi Next.js conversion — 232 pages, dark glassmorphism theme"
```

---

## File Structure Summary

```
droptaxi/
├── app/
│   ├── globals.css          (existing CSS design system, copied from assets/css/styles.css)
│   ├── layout.tsx           (root layout with Inter font, gtag, metadata)
│   ├── page.tsx             (homepage)
│   ├── not-found.tsx        (404 page)
│   ├── robots.ts            (robots.txt)
│   ├── sitemap.ts           (sitemap.xml)
│   └── [slug]/
│       └── page.tsx          (dynamic route for all 232 pages)
├── components/
│   ├── Header.tsx           (client: mega-nav with mobile support)
│   ├── Footer.tsx           (server: footer grid)
│   ├── FloatingCTA.tsx      (client: WhatsApp + Call floating buttons)
│   ├── pages/
│   │   ├── RoutePage.tsx    (template: city-to-city routes)
│   │   ├── CityPage.tsx     (template: drop-taxi-in-X and call-taxi-in-X)
│   │   ├── AirportPage.tsx  (template: airport taxi pages)
│   │   └── StaticPage.tsx   (template: about, contact, faq, etc.)
│   └── shared/
│       ├── Breadcrumbs.tsx
│       ├── FAQSection.tsx
│       ├── QuoteCard.tsx    (client: WhatsApp quote form)
│       └── SchemaMarkup.tsx
├── lib/
│   ├── constants.ts         (phone, email, brand name, vehicle types)
│   └── pages.ts             (all 232 page data entries + lookup functions)
├── public/
│   └── images/              (copied from assets/images/)
├── scripts/
│   └── extract-pages.ts     (optional: HTML-to-data extraction script)
├── Dockerfile
├── k8s-deployment.yaml
├── package.json
├── tsconfig.json
├── next.config.ts
└── .gitignore
```

## URL Migration Notes

All existing URLs drop the `.html` extension:
- `chennai-to-bangalore-taxi.html` → `/chennai-to-bangalore-taxi`
- `drop-taxi-in-chennai.html` → `/drop-taxi-in-chennai`
- `call-taxi-in-erode.html` → `/call-taxi-in-erode`
- `airport-taxi-in-chennai.html` → `/airport-taxi-in-chennai`
- `about-us.html` → `/about-us`

The `index.html` maps to `/` (homepage).

Consider adding redirects in `next.config.ts` for `.html` URLs if needed for SEO continuity.
