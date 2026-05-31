import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, services } from "@/lib/city-data";
import { CityPageContent } from "./city-page-content";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = cities.find((c) => c.slug === slug);
  if (!city) return {};

  const title = `AI Automation & Business Systems ${city.name} | Jotham Hall`;
  const description = `Jotham Hall helps ${city.name} entrepreneurs build AI-powered business systems. 50+ TV credits (Hallmark, Food Network, VH1, MTV, NBC). 500+ founders scaled. Free strategy call.`;

  return {
    title,
    description,
    keywords: [
      `AI automation consultant ${city.name}`,
      `business systems architect ${city.name}`,
      `AI consultant ${city.name}`,
      `ChatGPT consultant ${city.name}`,
      `revenue systems ${city.name}`,
      `vibe coding ${city.name}`,
      `fractional COO ${city.name}`,
      ...city.neighborhoods.map((n) => `business consultant ${n}`),
    ],
    openGraph: {
      title: `AI Automation & Business Systems | ${city.name} | Jotham Hall`,
      description: `AI-powered business systems for ${city.name} entrepreneurs. 500+ founders scaled. Free strategy call.`,
      url: `https://jothamhall.com/${city.slug}`,
    },
    alternates: { canonical: `https://jothamhall.com/${city.slug}` },
    other: {
      "geo.region": city.geoRegion,
      "geo.placename": city.name,
      "geo.position": `${city.latitude};${city.longitude}`,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = cities.find((c) => c.slug === slug);
  if (!city) notFound();

  return <CityPageContent city={city} services={services} />;
}
