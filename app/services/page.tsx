import type { Metadata } from "next";
import { ServicesIndex } from "./services-index";
import { SHARE_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // The root layout's template appends "| Jotham Hall".
  title: "Services",
  description:
    "AI automation, revenue systems, strategic consulting, and systems architecture for business owners. Pick where you're stuck, or book a free strategy call.",
  keywords: [
    "AI automation",
    "revenue systems",
    "strategic consulting",
    "systems architecture",
    "business systems consultant",
    "Jotham Hall services",
  ],
  openGraph: {
    title: "Services | Jotham Hall",
    description: "AI automation, revenue systems, strategy, and connected business systems for owners who want to grow without working more.",
    type: "website",
    url: "https://jothamhall.com/services",
    images: [SHARE_IMAGE],
  },
  alternates: {
    canonical: "https://jothamhall.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesIndex />;
}
