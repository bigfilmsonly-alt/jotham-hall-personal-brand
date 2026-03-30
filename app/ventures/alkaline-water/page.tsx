import type { Metadata } from "next";
import { VenturePageTemplate } from "@/components/venture-page-template";

export const metadata: Metadata = {
  title: "Alkaline Water Brand | Ventures | Jotham Hall",
  description: "A premium alkaline water and health brand founded by Jotham Hall, focused on wellness optimization and healthy hydration.",
  openGraph: {
    title: "Alkaline Water Brand | Jotham Hall Ventures",
    description: "Premium health and wellness brand.",
    url: "https://jothamhall.com/ventures/alkaline-water",
  },
  alternates: {
    canonical: "https://jothamhall.com/ventures/alkaline-water",
  },
};

export default function AlkalineWaterPage() {
  return (
    <VenturePageTemplate
      name="Alkaline Water Brand"
      tagline="Premium health and wellness"
      description="Health is the foundation of everything. This venture brings premium alkaline water to health-conscious consumers who understand that what you put in your body matters. Built on the same principles as all my ventures: quality, systems, and scale."
      status="Active"
      year="2023"
      features={[
        "Premium alkaline water products",
        "Subscription delivery model",
        "Health education content",
        "B2B office and gym partnerships",
        "Sustainable packaging focus",
        "Wellness community building"
      ]}
      impact={[
        { metric: "10K+", label: "Monthly Subscribers" },
        { metric: "50+", label: "Retail Partners" },
        { metric: "9.5+", label: "pH Level" },
        { metric: "100%", label: "Sustainable Packaging" }
      ]}
      role="Founder & CEO"
    />
  );
}
