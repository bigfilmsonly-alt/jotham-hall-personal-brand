import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, localize, proofVentures, services } from "@/lib/city-data";
import { ServicePageContent } from "./service-page-content";

// Only city and service pairs from lib/city-data.ts (today /miami/vibe-coding).
// next.config.mjs redirects the retired service URLs before they reach this
// route, and any other pair returns 404.
export function generateStaticParams() {
  return cities.flatMap((city) => services.map((service) => ({ city: city.slug, service: service.slug })));
}

function find(citySlug: string, serviceSlug: string) {
  const city = cities.find((c) => c.slug === citySlug);
  const service = services.find((s) => s.slug === serviceSlug);
  return city && service ? { city, service: localize(service, city) } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const found = find(citySlug, serviceSlug);
  if (!found) return {};
  const { city, service } = found;

  const url = `https://jothamhall.com/${city.slug}/${service.slug}`;
  const shareTitle = `${service.name} in ${city.name} | Jotham Hall`;

  // The root layout template adds "| Jotham Hall" to the title.
  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    openGraph: {
      title: shareTitle,
      description: service.description,
      url,
      type: "website",
      siteName: "Jotham Hall",
      locale: "en_US",
      images: [{ url: "/og-image.jpg", width: 1024, height: 1024, alt: "Jotham Hall" }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: service.description,
      images: ["/og-image.jpg"],
    },
    alternates: { canonical: url },
    other: {
      "geo.region": city.geoRegion,
      "geo.placename": city.name,
      "geo.position": `${city.latitude};${city.longitude}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ city: string; service: string }> }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const found = find(citySlug, serviceSlug);
  if (!found) notFound();
  const { city, service } = found;

  const cityUrl = `https://jothamhall.com/${city.slug}`;
  const url = `${cityUrl}/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${service.name} in ${city.name}`,
        serviceType: "AI app development and training",
        url,
        provider: { "@id": "https://jothamhall.com/#person" },
        areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.state } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://jothamhall.com" },
          { "@type": "ListItem", position: 2, name: city.name, item: cityUrl },
          { "@type": "ListItem", position: 3, name: service.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ServicePageContent
        city={{ slug: city.slug, name: city.name }}
        copy={{
          name: service.name,
          headline: service.headline,
          intro: service.intro,
          steps: service.steps,
          faqs: service.faqs,
          closingTitle: service.closingTitle,
          closingBody: service.closingBody,
        }}
        ventures={proofVentures(service.proof)}
      />
    </>
  );
}
