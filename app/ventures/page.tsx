import type { Metadata } from "next";
import { VenturesIndex } from "./ventures-index";

export const metadata: Metadata = {
  // The root layout's template appends "| Jotham Hall".
  title: "Ventures",
  description: "The Jotham Hall portfolio: companies founded and products built with partners, including Success Upgrade, Verza TV, Evolve Longevity, Big Films Only, and BookTalent.",
  openGraph: {
    title: "Ventures | Jotham Hall",
    description: "Companies founded and products built with partners by Jotham Hall.",
    url: "https://jothamhall.com/ventures",
  },
  alternates: {
    canonical: "https://jothamhall.com/ventures",
  },
};

export default function VenturesPage() {
  return <VenturesIndex />;
}
