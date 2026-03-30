import { notFound } from "next/navigation";
import { Metadata } from "next";
import { insights, getInsightBySlug, getAllInsightSlugs } from "@/lib/insights-data";
import { InsightContent } from "./insight-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  
  if (!insight) {
    return {
      title: "Insight Not Found | Jotham Hall",
    };
  }

  return {
    title: `${insight.title} | Jotham Hall`,
    description: insight.excerpt,
    keywords: insight.keywords,
    authors: [{ name: "Jotham Hall", url: "https://jothamhall.com" }],
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      type: "article",
      publishedTime: insight.publishedAt,
      authors: ["Jotham Hall"],
      tags: insight.keywords,
      url: `https://jothamhall.com/insights/${insight.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.excerpt,
    },
    alternates: {
      canonical: `https://jothamhall.com/insights/${insight.slug}`,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  return <InsightContent insight={insight} />;
}
