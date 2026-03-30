import type { Metadata } from "next";
import { CaseStudiesIndex } from "./case-studies-index";

export const metadata: Metadata = {
  title: "Case Studies | Jotham Hall",
  description: "Real results from real clients. Explore case studies showcasing how Jotham Hall has helped businesses scale through strategic consulting, AI automation, and systems architecture.",
  openGraph: {
    title: "Case Studies | Jotham Hall",
    description: "Real results from real clients. Explore case studies showcasing business transformation.",
    url: "https://jothamhall.com/case-studies",
  },
  alternates: {
    canonical: "https://jothamhall.com/case-studies",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndex />;
}
