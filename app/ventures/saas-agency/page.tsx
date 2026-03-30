import type { Metadata } from "next";
import { VenturePageTemplate } from "@/components/venture-page-template";

export const metadata: Metadata = {
  title: "SaaS Agency | Ventures | Jotham Hall",
  description: "A full-service digital agency founded by Jotham Hall, providing marketing, development, and growth services for SaaS and technology companies.",
  openGraph: {
    title: "SaaS Agency | Jotham Hall Ventures",
    description: "Full-service digital agency for SaaS companies.",
    url: "https://jothamhall.com/ventures/saas-agency",
  },
  alternates: {
    canonical: "https://jothamhall.com/ventures/saas-agency",
  },
};

export default function SaaSAgencyPage() {
  return (
    <VenturePageTemplate
      name="SaaS Agency"
      tagline="Full-service digital agency"
      description="A full-service digital agency focused on helping SaaS and technology companies grow. We handle everything from brand strategy and design to development and growth marketing. Our systems-first approach means every client gets infrastructure that scales."
      status="Active"
      year="2022"
      features={[
        "Brand strategy and positioning",
        "Website design and development",
        "Growth marketing and demand generation",
        "Content creation and management",
        "Marketing automation setup",
        "Analytics and performance optimization"
      ]}
      impact={[
        { metric: "50+", label: "Clients Served" },
        { metric: "$10M+", label: "Revenue Generated" },
        { metric: "200%", label: "Average Client Growth" },
        { metric: "95%", label: "Client Retention" }
      ]}
      role="Founder & Managing Director"
    />
  );
}
