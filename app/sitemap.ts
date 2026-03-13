import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/pages";

const LAST_UPDATED = "2026-03-12";

function getPriority(pageType: string, slug: string): number {
  if (slug === "all-routes" || slug === "cities") return 0.9;
  switch (pageType) {
    case "route":
      return 0.8;
    case "city":
      return 0.7;
    case "airport":
      return 0.75;
    default:
      if (
        slug === "tariff" ||
        slug === "one-way-cab-booking" ||
        slug === "outstation-cabs" ||
        slug === "book-now"
      )
        return 0.7;
      if (slug === "about-us" || slug === "contact" || slug === "faq" || slug === "reviews")
        return 0.6;
      return 0.5;
  }
}

function getChangeFrequency(
  pageType: string,
): "daily" | "weekly" | "monthly" | "yearly" {
  switch (pageType) {
    case "route":
      return "weekly";
    case "city":
      return "weekly";
    case "airport":
      return "weekly";
    default:
      return "monthly";
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.droptaxi.ai";
  const pages = getAllPages();

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: getChangeFrequency(page.pageType),
    priority: getPriority(page.pageType, page.slug),
  }));

  return [
    {
      url: baseUrl,
      lastModified: LAST_UPDATED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...pageEntries,
  ];
}
