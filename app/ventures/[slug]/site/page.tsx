import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VentureEmbed } from "@/components/venture-embed";
import { getVenture, ventures } from "@/lib/ventures";
import { SHARE_IMAGE, fitDescription } from "@/lib/seo";
import { canFrameIn } from "@/lib/frame-check";

export const dynamicParams = false;
// Each viewer re-checks once an hour whether its guest still lets this site frame it.
export const revalidate = 3600;

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
    title: venture.name,
    description: venture.searchDescription ?? fitDescription(venture.description),
    openGraph: {
      title: `${venture.name} | Jotham Hall Ventures`,
      description: venture.tagline,
      url,
      images: [SHARE_IMAGE],
    },
    // A frame around another site has nothing of its own to index. The venture's
    // page is the one search should find, so this points there and stays out.
    robots: { index: false, follow: true },
    alternates: { canonical: url },
  };
}

export default async function VentureSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();
  const framable = await canFrameIn(venture.site);
  return (
    <VentureEmbed
      name={venture.name}
      site={venture.site}
      backHref={`/ventures/${venture.slug}`}
      backLabel={venture.name}
      framable={framable}
    />
  );
}
