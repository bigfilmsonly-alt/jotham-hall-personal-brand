import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, services } from "@/lib/city-data";
import { ServicePageContent } from "./service-page-content";

export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const city of cities) {
    for (const service of services) {
      params.push({ city: city.slug, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  const service = services.find((s) => s.slug === serviceSlug);
  if (!city || !service) return {};

  return {
    title: `${service.name} ${city.name} | ${service.name} Consultant | Jotham Hall`,
    description: `${service.longDescription} Serving ${city.name} and ${city.state}. 500+ founders scaled. Free strategy call.`,
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
