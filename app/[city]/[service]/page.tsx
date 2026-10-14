import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, services } from "@/lib/city-data";
import { ServicePageContent } from "./service-page-content";

export function generateStaticParams() { return []; }

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  const service = services.find((s) => s.slug === serviceSlug);
  if (!city || !service) return {};

  return {
    title: `${service.name} ${city.name} | ${service.name} Consultant | Jotham Hall`,
    description: `${service.longDescription} Serving ${city.name} and ${city.state}. Practical AI systems and automation.`,
    keywords: [
      ...service.keywords.map((k) => `${k} ${city.name}`),
      `${service.slug} consultant ${city.name}`,
      `best ${service.slug} ${city.name}`,
    ],
    openGraph: {
      title: `${service.name} | ${city.name} | Jotham Hall`,
      description: `${service.description}. Serving ${city.name}. Free strategy call.`,
      url: `https://jothamhall.com/${city.slug}/${service.slug}`,
    },
    alternates: { canonical: `https://jothamhall.com/${city.slug}/${service.slug}` },
    other: {
      "geo.region": city.geoRegion,
      "geo.placename": city.name,
      "geo.position": `${city.latitude};${city.longitude}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ city: string; service: string }> }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  const service = services.find((s) => s.slug === serviceSlug);
  if (!city || !service) notFound();

  return <ServicePageContent city={city} service={service} />;
}
