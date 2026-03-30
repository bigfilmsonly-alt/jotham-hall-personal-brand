import type { Metadata } from "next";
import { VenturePageTemplate } from "@/components/venture-page-template";

export const metadata: Metadata = {
  title: "Success Upgrade | Ventures | Jotham Hall",
  description: "Success Upgrade is an AI-powered life operating system founded by Jotham Hall. A multi-faceted ecosystem helping entrepreneurs build wealth and optimize their lives.",
  openGraph: {
    title: "Success Upgrade | Jotham Hall Ventures",
    description: "AI-powered life operating system for entrepreneurs.",
    url: "https://jothamhall.com/ventures/success-upgrade",
  },
  alternates: {
    canonical: "https://jothamhall.com/ventures/success-upgrade",
  },
};

export default function SuccessUpgradePage() {
  return (
    <VenturePageTemplate
      name="Success Upgrade"
      tagline="AI-powered life operating system"
      description="Success Upgrade is a multi-faceted ecosystem designed to help entrepreneurs, creators, and visionaries build wealth, optimize their lives, and scale through AI and automation. Built on the Paradise Protocol framework: four pillars of health, wealth, love, and happiness."
      status="Active"
      year="2024"
      website="https://www.successupgrade.ai/"
      features={[
        "AI-powered productivity and planning tools",
        "Wealth building frameworks and systems",
        "Health optimization protocols",
        "Relationship and network development",
        "Content creation and personal branding",
        "Community of high-performers"
      ]}
      impact={[
        { metric: "10K+", label: "Community Members" },
        { metric: "4", label: "Core Pillars" },
        { metric: "100+", label: "AI Tools Built" },
        { metric: "24/7", label: "Always Evolving" }
      ]}
      role="Founder & CEO"
    />
  );
}
