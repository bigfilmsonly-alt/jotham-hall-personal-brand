import type { Metadata } from "next";
import { TvCreditsContent } from "./tv-credits-content";

export const metadata: Metadata = {
  title: "Television Credits | Jotham Hall - Talent Producer",
  description:
    "Jotham Hall's television credits as Talent Producer. 50+ reality TV shows including Finding Mr. Christmas (Hallmark), Ciao House (Food Network), Temptation Island, Flavor of Love, and more.",
  keywords: [
    "Jotham Hall TV credits",
    "Jotham Hall television",
    "Jotham Hall talent producer",
    "Finding Mr Christmas",
    "Ciao House",
    "Temptation Island",
    "Snake in the Grass",
    "Flavor of Love",
    "reality TV producer",
    "51 Minds Entertainment",
    "Big Films Only",
  ],
  openGraph: {
    title: "Television Credits | Jotham Hall - Talent Producer",
    description:
      "Jotham Hall's television credits as Talent Producer. 50+ reality TV shows including Finding Mr. Christmas (Hallmark), Ciao House (Food Network), Temptation Island, Flavor of Love, and more.",
    url: "https://jothamhall.com/tv-credits",
  },
  alternates: {
    canonical: "https://jothamhall.com/tv-credits",
  },
};

export default function TvCreditsPage() {
  return <TvCreditsContent />;
}
