import type { Metadata } from "next";
import { CreditsContent } from "./credits-content";

// The root layout's title template appends "| Jotham Hall", so the page title
// stops before it. Open Graph titles skip the template, so they carry it.
export const metadata: Metadata = {
  title: "Television Credits & Filmography",
  description:
    "Jotham Hall's television credits: 50+ credits across 15 years for Hallmark, Food Network, VH1, MTV, USA Network, NBC, and BET, including Temptation Island and Finding Mr. Christmas.",
  keywords: [
    "Jotham Hall credits",
    "Jotham Hall filmography",
    "Jotham Hall television producer",
    "Jotham Hall talent producer",
    "Temptation Island",
    "Flavor of Love",
    "Rock of Love",
    "I Love Money",
    "From G's to Gents",
    "Ciao House",
    "Snake in the Grass",
    "Finding Mr Christmas",
    "After Happily Ever After",
    "51 Minds Entertainment",
    "Big Films Only",
    "reality TV producer",
  ],
  openGraph: {
    title: "Television Credits & Filmography | Jotham Hall",
    description:
      "50+ television credits across 15 years. Reality and competition series for Hallmark, Food Network, VH1, MTV, USA Network, NBC, and BET.",
    url: "https://jothamhall.com/credits",
    siteName: "Jotham Hall",
    type: "profile",
    images: [{ url: "https://jothamhall.com/jotham-hall-headshot.jpg" }],
  },
  alternates: {
    canonical: "https://jothamhall.com/credits",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jotham Hall",
  url: "https://jothamhall.com/credits",
  image: "https://jothamhall.com/jotham-hall-headshot.jpg",
  jobTitle: "Television Producer & AI Systems Architect",
  description:
    "Television producer with 50+ credits across 15 years (Hallmark, Food Network, VH1, MTV, USA Network, NBC, BET). Founder of Success Upgrade and Big Films Only.",
  homeLocation: { "@type": "Place", name: "Miami Beach, Florida" },
  worksFor: [
    {
      "@type": "Organization",
      name: "Success Upgrade",
      url: "https://www.successupgrade.ai",
    },
    { "@type": "Organization", name: "Big Films Only" },
  ],
  knowsAbout: [
    "Television Production",
    "Reality TV",
    "Unscripted Television",
    "Talent Producing",
    "AI Automation",
    "Business Systems",
    "VibeCoding",
  ],
  sameAs: [
    "https://www.successupgrade.ai",
    "https://www.linkedin.com/in/jotham-hall-b6b9491b2",
    "https://www.instagram.com/successupgrade_",
    "https://www.tiktok.com/@successupgrade_",
  ],
};

const creditsList = [
  { name: "Finding Mr. Christmas", company: "Hallmark Channel" },
  { name: "Ciao House", company: "Food Network" },
  { name: "Temptation Island", company: "USA Network" },
  { name: "Snake in the Grass", company: "NBC" },
  { name: "After Happily Ever After", company: "BET" },
  { name: "Flavor of Love", company: "VH1" },
  { name: "Rock of Love", company: "VH1" },
  { name: "I Love Money", company: "VH1" },
  { name: "For the Love of Ray J", company: "VH1" },
  { name: "Real Chance of Love", company: "VH1" },
  { name: "From G's to Gents", company: "MTV" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Jotham Hall Television Credits",
  itemListElement: creditsList.map((credit, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "TVSeries",
      name: credit.name,
      productionCompany: { "@type": "Organization", name: credit.company },
      contributor: {
        "@type": "Person",
        name: "Jotham Hall",
        roleName: "Talent Producer",
      },
    },
  })),
};

// No FAQPage here: the page no longer shows a FAQ, and the site wide schema in
// components/structured-data.tsx already answers "Who is Jotham Hall?" on
// every page, so a second FAQPage block would only duplicate it.

export default function CreditsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <CreditsContent />
    </>
  );
}
