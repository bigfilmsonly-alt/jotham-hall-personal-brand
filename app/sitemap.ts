import { MetadataRoute } from 'next'
import { insights } from '@/lib/insights-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jothamhall.com'
  
  // Core pages (highest priority)
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/jotham-hall`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/who-is-jotham-hall`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/speaking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/television`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
  ]

  // Services index
  const servicesIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
  ]

  // Service pages
  const servicePages: MetadataRoute.Sitemap = [
    'ai-automation',
    'revenue-systems', 
    'brand-strategy',
    'strategic-consulting',
    'systems-architecture',
    'automation',
    'personal-branding',
    'content-strategy',
    'business-development',
    'executive-advisory',
    'fractional-coo',
    'speaking',
  ].map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Case studies
  const caseStudyPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...['saas-revenue-transformation', 'agency-systems-overhaul', 'ecommerce-automation', 'personal-brand-launch', 'startup-advisory'].map(slug => ({
      url: `${baseUrl}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]

  // Ventures
  const venturePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ventures`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...['success-upgrade', 'big-films-only', 'say-it-build-it', 'saas-agency', 'alkaline-water'].map(slug => ({
      url: `${baseUrl}/ventures/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]

  // Insights index
  const insightsIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic insight pages
  const insightPages: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...corePages,
    ...servicesIndex,
    ...servicePages,
    ...caseStudyPages,
    ...venturePages,
    ...insightsIndex,
    ...insightPages,
  ]
}
