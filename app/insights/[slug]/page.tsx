import { notFound } from "next/navigation";
import { fitDescription } from "@/lib/seo";
import type { Metadata } from "next";
import {
  INSIGHTS_INDEX_LIVE,
  formatInsightDate,
  getAllInsightSlugs,
  getInsightBySlug,
  getRelatedInsights,
  insightWordCount,
  parseInsightBody,
  toInsightSummary,
} from "@/lib/insights-data";
import { InsightContent } from "./insight-content";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE = "https://jothamhall.com";
const AUTHOR = { "@type": "Person", "@id": `${SITE}/#person`, name: "Jotham Hall", url: SITE };

export async function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

// The root layout's title template adds "| Jotham Hall", so titles here stay bare.
// A title that would pass 65 characters with it drops it, so search shows it whole.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return { title: "Insight Not Found" };
  }

  const url = `${SITE}/insights/${insight.slug}`;
  return {
    title: `${insight.title} | Jotham Hall`.length > 65 ? { absolute: insight.title } : insight.title,
    description: fitDescription(insight.excerpt),
    keywords: insight.keywords,
    authors: [{ name: "Jotham Hall", url: SITE }],
    openGraph: {
      title: insight.title,
      description: fitDescription(insight.excerpt),
      type: "article",
      publishedTime: insight.publishedAt,
      authors: ["Jotham Hall"],
      tags: insight.keywords,
      url,
      siteName: "Jotham Hall",
      locale: "en_US",
      images: [{ url: "/og-jotham-hall.jpg", width: 1200, height: 630, alt: "Jotham Hall" }],
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: fitDescription(insight.excerpt),
      images: ["/og-jotham-hall.jpg"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const url = `${SITE}/insights/${insight.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: insight.title,
    description: insight.excerpt,
    image: `${SITE}/og-jotham-hall.jpg`,
    author: AUTHOR,
    publisher: AUTHOR,
    datePublished: insight.publishedAt,
    dateModified: insight.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    keywords: insight.keywords.join(", "),
    articleSection: insight.category,
    wordCount: insightWordCount(insight.fullContent),
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <InsightContent
        title={insight.title}
        category={insight.category}
        readTime={insight.readTime}
        publishedAt={insight.publishedAt}
        dateLabel={formatInsightDate(insight.publishedAt)}
        blocks={parseInsightBody(insight.fullContent)}
        related={getRelatedInsights(insight.slug).map(toInsightSummary)}
        showIndexLink={INSIGHTS_INDEX_LIVE}
      />
    </>
  );
}
