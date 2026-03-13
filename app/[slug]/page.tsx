import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getAllSlugs } from "@/lib/pages";
import { SITE_URL } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoutePage from "@/components/pages/RoutePage";
import CityPage from "@/components/pages/CityPage";
import AirportPage from "@/components/pages/AirportPage";
import StaticPage from "@/components/pages/StaticPage";
import type { PageData } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return { title: "Page Not Found" };

  const pageUrl = `${SITE_URL}/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: pageUrl,
      siteName: "DropTaxi",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: `${SITE_URL}/images/og-cover.png`,
          width: 1200,
          height: 630,
          alt: page.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [
        {
          url: `${SITE_URL}/images/og-cover.png`,
          alt: page.h1,
        },
      ],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

function generateSchemaMarkup(data: PageData): object[] {
  const schemas: object[] = [];
  const pageUrl = `${SITE_URL}/${data.slug}`;

  // BreadcrumbList schema — all inner pages
  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.label,
        ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
      })),
    });
  }

  // Route pages — Service schema with enriched Offers
  if (data.pageType === "route") {
    const serviceSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: data.h1,
      description: data.description,
      serviceType: "One Way Taxi",
      url: pageUrl,
      provider: {
        "@type": "TaxiService",
        "@id": `${SITE_URL}/#taxiservice`,
        name: "DropTaxi",
      },
    };

    if (data.routeDetails?.fareBreakdown && data.routeDetails.fareBreakdown.length > 0) {
      serviceSchema.offers = data.routeDetails.fareBreakdown.map((fb) => ({
        "@type": "Offer",
        name: fb.carType,
        price: fb.fare.replace(/[^0-9.]/g, ""),
        priceCurrency: "INR",
        description: `${fb.carType} — ${data.h1} at ${fb.perKm}`,
        availability: "https://schema.org/InStock",
      }));

      // Extract cities for areaServed from slug
      const parts = data.slug.replace(/-taxi$/, "").split("-to-");
      if (parts.length === 2) {
        serviceSchema.areaServed = parts.map((p) =>
          p
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
        );
      }
    }

    schemas.push(serviceSchema);
  }

  // City pages — TaxiService schema
  if (data.pageType === "city") {
    const cityName = data.h1.replace(/^.*in\s+/i, "").replace(/^.*taxi\s*/i, "").trim() || data.h1;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `DropTaxi — ${cityName}`,
      description: data.description,
      telephone: "+919994940558",
      url: pageUrl,
      provider: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "DropTaxi",
      },
      areaServed: {
        "@type": "City",
        name: cityName,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        bestRating: "5",
        ratingCount: "10000",
      },
    });
  }

  // Airport pages — TaxiService with airport-specific data
  if (data.pageType === "airport") {
    const cityName = data.h1.replace(/airport\s*taxi\s*(in\s*)?/i, "").trim() || data.h1;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `DropTaxi Airport Transfer — ${cityName}`,
      description: data.description,
      telephone: "+919994940558",
      url: pageUrl,
      serviceType: "Airport Taxi Transfer",
      provider: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "DropTaxi",
      },
      areaServed: {
        "@type": "City",
        name: cityName,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        bestRating: "5",
        ratingCount: "10000",
      },
    });
  }

  // About page — Organization schema
  if (data.pageType === "static" && data.slug === "about-us") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "DropTaxi",
      url: SITE_URL,
      logo: `${SITE_URL}/images/og-cover.png`,
      telephone: "+919994940558",
      email: "enquiry@droptaxi.ai",
      description:
        "DropTaxi is a one way intercity taxi service operating across South India covering Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana, and Puducherry.",
      foundingDate: "2020",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      sameAs: ["https://wa.me/919994940558", "https://t.me/droptaxiaibot"],
    });
  }

  // Contact page — ContactPage schema
  if (data.pageType === "static" && data.slug === "contact") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact DropTaxi",
      url: pageUrl,
      mainEntity: {
        "@type": "TaxiService",
        "@id": `${SITE_URL}/#taxiservice`,
        name: "DropTaxi",
        telephone: "+919994940558",
        email: "enquiry@droptaxi.ai",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    });
  }

  // FAQ page — keep structured but no FAQPage schema (deprecated for non-gov sites)

  // Tariff page — PriceSpecification-like Service
  if (data.pageType === "static" && data.slug === "tariff") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "DropTaxi — One Way Taxi Tariff",
      description: data.description,
      url: pageUrl,
      serviceType: "One Way Taxi",
      provider: {
        "@type": "TaxiService",
        "@id": `${SITE_URL}/#taxiservice`,
        name: "DropTaxi",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Sedan",
          priceCurrency: "INR",
          price: "13.5",
          unitText: "per km",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "SUV",
          priceCurrency: "INR",
          price: "17.5",
          unitText: "per km",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Innova Crysta",
          priceCurrency: "INR",
          price: "21",
          unitText: "per km",
          availability: "https://schema.org/InStock",
        },
      ],
    });
  }

  return schemas;
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const schemas = generateSchemaMarkup(page);

  return (
    <>
      <Header />
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {page.pageType === "route" && <RoutePage data={page} />}
      {page.pageType === "city" && <CityPage data={page} />}
      {page.pageType === "airport" && <AirportPage data={page} />}
      {page.pageType === "static" && <StaticPage data={page} />}
      <Footer />
    </>
  );
}
