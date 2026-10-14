import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VenturePageTemplate } from "@/components/venture-page-template";
import { getVenture, ventures } from "@/lib/ventures";

export const dynamicParams = false;

export function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) return {};
  const url = `https://jothamhall.com/ventures/${venture.slug}`;
  return {
    // The root layout's template appends "| Jotham Hall".
    title: `${venture.name} | Ventures`,
    description: venture.description,
    openGraph: {
      title: `${venture.name} | Jotham Hall Ventures`,
      description: venture.tagline,
      url,
    },
    alternates: { canonical: url },
  };
}

export default async function VenturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();
  return <VenturePageTemplate venture={venture} />;
}
