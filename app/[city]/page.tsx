import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, cityPage, localize, proofVentures } from "@/lib/city-data";
import { CityPageContent } from "./city-page-content";

// Only the cities in lib/city-data.ts (Miami). The old city URLs redirect in
// next.config.mjs, and anything else at the top level falls through to 404.
export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

function findCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) return {};

  const copy = localize(cityPage, city);
  const url = `https://jothamhall.com/${city.slug}`;
  const shareTitle = `AI Automation in ${city.name} | Jotham Hall`;

  // The root layout template adds "| Jotham Hall" to the title.
  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    openGraph: {
      title: shareTitle,
      description: copy.description,
      url,
      type: "website",
      siteName: "Jotham Hall",
      locale: "en_US",
      images: [{ url: "/og-jotham-hall.jpg", width: 1200, height: 630, alt: "Jotham Hall" }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: copy.description,
      images: ["/og-jotham-hall.jpg"],
    },
    alternates: { canonical: url },
    other: {
      "geo.region": city.geoRegion,
      "geo.placename": city.name,
      "geo.position": `${city.latitude};${city.longitude}`,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) notFound();

  const copy = localize(cityPage, city);
  const url = `https://jothamhall.com/${city.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `AI Automation and Business Systems in ${city.name}`,
        serviceType: "AI automation consulting",
        url,
        provider: { "@id": "https://jothamhall.com/#person" },
        areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.state } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://jothamhall.com" },
          { "@type": "ListItem", position: 2, name: city.name, item: url },
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
      <CityPageContent
        copy={{
          slug: city.slug,
          eyebrow: city.eyebrow,
          headline: copy.headline,
          intro: copy.intro,
          offersTitle: copy.offersTitle,
          offers: copy.offers,
          steps: copy.steps,
          faqs: [...copy.faqs, city.localFaq],
          closingTitle: copy.closingTitle,
          closingBody: copy.closingBody,
        }}
        ventures={proofVentures(city.proof)}
      />
    </>
  );
}
