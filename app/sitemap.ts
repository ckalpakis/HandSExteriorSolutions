import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl, services, locations } = siteConfig;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${siteUrl}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Service × location combo pages — e.g. /services/window-cleaning/tampa.
  // These are what actually target "[service] in [town]" search intent,
  // so they need to be in the sitemap just like the plain service and
  // location pages, not left for crawlers to discover only via links.
  const serviceLocationRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    locations.map((l) => ({
      url: `${siteUrl}/services/${s.slug}/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...serviceLocationRoutes];
}
