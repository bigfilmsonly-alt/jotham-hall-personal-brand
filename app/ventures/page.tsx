import type { Metadata } from "next";
import { VenturesIndex } from "./ventures-index";
import { SHARE_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // The root layout's template appends "| Jotham Hall".
  title: "Ventures",
  description: "The Jotham Hall portfolio: companies founded and products built with partners, including Verza TV, Peaceful Healing Rx, Evolve Longevity, and Lumi.",
  openGraph: {
    title: "Ventures | Jotham Hall",
    description: "Companies founded and products built with partners by Jotham Hall.",
    url: "https://jothamhall.com/ventures",
    images: [SHARE_IMAGE],
  },
  alternates: {
    canonical: "https://jothamhall.com/ventures",
  },
};

export default function VenturesPage() {
  return <VenturesIndex />;
}
