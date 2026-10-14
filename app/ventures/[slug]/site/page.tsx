import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VentureEmbed } from "@/components/venture-embed";
import { getVenture, ventures } from "@/lib/ventures";

export const dynamicParams = false;

export function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) return {};
  return {
    // The root layout's template appends "| Jotham Hall".
    title: venture.name,
    // A frame around another site has nothing of its own to index. The venture's
    // page is the one search should find, so this points there and stays out.
    robots: { index: false, follow: true },
    alternates: { canonical: `https://jothamhall.com/ventures/${venture.slug}` },
  };
}

export default async function VentureSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();
  return <VentureEmbed name={venture.name} site={venture.site} slug={venture.slug} />;
}
