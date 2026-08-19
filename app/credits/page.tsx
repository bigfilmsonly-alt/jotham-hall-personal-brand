import type { Metadata } from "next";
import { CreditsContent } from "./credits-content";

export const metadata: Metadata = {
  title: "Credits & Filmography | Jotham Hall - Television Producer",
  description:
    "Jotham Hall's television credits and filmography. 50+ credits across 15 years as Talent Producer for VH1, MTV, NBC, USA Network, Food Network, and Hallmark, including Temptation Island, Flavor of Love, Ciao House, and Finding Mr. Christmas.",
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
    "51 Minds Entertainment",
    "Big Films Only",
    "reality TV producer",
  ],
  openGraph: {
    title: "Credits & Filmography | Jotham Hall - Television Producer",
    description:
      "50+ television credits across 15 years. Reality and unscripted TV for VH1, MTV, NBC, USA Network, Food Network, and Hallmark.",
    url: "https://jothamhall.com/credits",
    images: [{ url: "https://jothamhall.com/jotham-hall.jpg" }],
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
  image: "https://jothamhall.com/jotham-hall.jpg",
  jobTitle: "Television Producer & AI Systems Architect",
  description:
    "Television producer with 50+ credits across 15 years (VH1, MTV, NBC, USA Network, Food Network, Hallmark). Founder of Success Upgrade and Big Films Only.",
  homeLocation: { "@type": "Place", name: "Miami, Florida" },
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Jotham Hall?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jotham Hall is a television producer with over 50 credits across 15 years on VH1, MTV, NBC, USA Network, Food Network, and Hallmark. He is the founder of Success Upgrade and Big Films Only, where he builds AI systems for businesses.",
      },
    },
    {
      "@type": "Question",
      name: "What has Jotham Hall produced?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "His credits include Temptation Island, Flavor of Love, Rock of Love, I Love Money, From G's to Gents, Ciao House, Snake in the Grass, and Finding Mr. Christmas.",
      },
    },
    {
      "@type": "Question",
      name: "What does Jotham Hall do now?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "He builds AI powered business systems and custom software through Success Upgrade, and produces film and content through Big Films Only.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Jotham Hall based?",
      acceptedAnswer: { "@type": "Answer", text: "Miami, Florida." },
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CreditsContent />
    </>
  );
}
