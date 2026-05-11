import type { NextConfig } from "next";

// City slugs that used to live at /drop-taxi-{city}; the canonical Next.js
// route is /drop-taxi-in-{city}. Each slug below produces a 301 from both
// the .html form (legacy backlinks from the old static site) and the bare
// alt slug to the canonical route.
const ALT_CITY_SLUGS = [
  "cuddalore",
  "erode",
  "hyderabad",
  "madurai",
  "munnar",
  "neyveli",
  "srirangam",
  "thanjavur",
  "tirunelveli",
  "villupuram",
] as const;

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    const altCanonical = ALT_CITY_SLUGS.flatMap((slug) => [
      // /drop-taxi-madurai.html -> /drop-taxi-in-madurai (single hop)
      {
        source: `/drop-taxi-${slug}.html`,
        destination: `/drop-taxi-in-${slug}`,
        permanent: true,
      },
      // /drop-taxi-madurai -> /drop-taxi-in-madurai
      {
        source: `/drop-taxi-${slug}`,
        destination: `/drop-taxi-in-${slug}`,
        permanent: true,
      },
    ]);
    return [
      ...altCanonical,
      // Universal .html stripper for any other legacy backlink shape
      // (e.g. /chennai-to-bangalore-taxi.html -> /chennai-to-bangalore-taxi).
      // Placed last so the more specific alt-form rules above win first.
      {
        source: "/:slug.html",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://maps.googleapis.com; frame-ancestors 'none'" },
        ],
      },
    ];
  },
};

export default nextConfig;
