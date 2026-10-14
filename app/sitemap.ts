import type { MetadataRoute } from "next";
import { ventures } from "@/lib/ventures";
export default function sitemap(): MetadataRoute.Sitemap { const baseUrl = "https://jothamhall.com"; const now = new Date(); return [
{ url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
{ url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
{ url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
{ url: `${baseUrl}/ventures`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
{ url: `${baseUrl}/speaking`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
{ url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
{ url: `${baseUrl}/credits`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
{ url: `${baseUrl}/miami`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
...ventures.map((venture) => ({ url: `${baseUrl}/ventures/${venture.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
]; }
