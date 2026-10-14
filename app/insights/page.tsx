import type { Metadata } from "next";
import { InsightsIndex } from "./insights-index";
import { insights, toInsightSummary } from "@/lib/insights-data";

const SITE = "https://jothamhall.com";
const description =
  "Strategic insights on AI automation, revenue systems, personal branding, and building scalable businesses. Lessons from building multiple ventures.";

// The root layout's title template adds "| Jotham Hall".
export const metadata: Metadata = {
  title: "Insights",
  description,
  keywords: ["business insights", "AI automation", "revenue systems", "personal branding", "startup strategy", "Jotham Hall blog"],
  openGraph: {
    title: "Insights | Jotham Hall",
    description: "Strategic insights on AI automation, revenue systems, and building scalable businesses.",
    type: "website",
    url: `${SITE}/insights`,
    siteName: "Jotham Hall",
    locale: "en_US",
    images: [{ url: "/og-jotham-hall.jpg", width: 1200, height: 630, alt: "Jotham Hall" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Jotham Hall",
    description: "Strategic insights on AI automation, revenue systems, and building scalable businesses.",
    images: ["/og-jotham-hall.jpg"],
  },
  alternates: {
    canonical: `${SITE}/insights`,
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE}/insights#blog`,
  name: "Insights by Jotham Hall",
  url: `${SITE}/insights`,
  description,
  inLanguage: "en-US",
  author: { "@type": "Person", "@id": `${SITE}/#person`, name: "Jotham Hall", url: SITE },
  blogPost: insights.map((insight) => ({
    "@type": "BlogPosting",
    headline: insight.title,
    url: `${SITE}/insights/${insight.slug}`,
    datePublished: insight.publishedAt,
  })),
};

export default function InsightsPage() {
  const featured = insights.find((insight) => insight.featured);
  const articles = insights.filter((insight) => insight !== featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema).replace(/</g, "\\u003c") }}
      />
      <InsightsIndex
        featured={featured ? toInsightSummary(featured) : null}
        articles={articles.map(toInsightSummary)}
      />
    </>
  );
}
