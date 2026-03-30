import type { Metadata } from "next";
import { VenturePageTemplate } from "@/components/venture-page-template";

export const metadata: Metadata = {
  title: "Big Films Only | Ventures | Jotham Hall",
  description: "Big Films Only is a film production and creative studio founded by Jotham Hall, creating compelling visual content for brands and entertainment.",
  openGraph: {
    title: "Big Films Only | Jotham Hall Ventures",
    description: "Film production and creative studio.",
    url: "https://jothamhall.com/ventures/big-films-only",
  },
  alternates: {
    canonical: "https://jothamhall.com/ventures/big-films-only",
  },
};

export default function BigFilmsOnlyPage() {
  return (
    <VenturePageTemplate
      name="Big Films Only"
      tagline="Film production and creative studio"
      description="Big Films Only is a creative production company focused on bringing powerful stories to life. We produce content that moves people, from brand films to documentaries to entertainment projects. Every project is approached with the same philosophy: go big or go home."
      status="Active"
      year="2023"
      features={[
        "Brand film and commercial production",
        "Documentary filmmaking",
        "Music video production",
        "Creative direction and strategy",
        "Post-production and editing",
        "Distribution and placement"
      ]}
      impact={[
        { metric: "50+", label: "Projects Completed" },
        { metric: "10M+", label: "Views Generated" },
        { metric: "25+", label: "Brand Partners" },
        { metric: "5", label: "Award Nominations" }
      ]}
      role="Founder & Executive Producer"
    />
  );
}
