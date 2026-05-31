import { MetadataRoute } from "next";
import { cities, services } from "@/lib/city-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jothamhall.com";
  const now = new Date().toISOString();

  const mainPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tv-credits`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/who-is-jotham-hall`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/ventures`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/speaking`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: city.slug === "miami" ? 0.95 : 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    services.map((service) => ({
      url: `${baseUrl}/${city.slug}/${service.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: city.slug === "miami" ? 0.9 : 0.85,
    }))
  );

  return [...mainPages, ...cityPages, ...servicePages];
}
