"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function FractionalCOOPage() {
  return (
    <ServicePageTemplate
      title="Fractional COO"
      subtitle="Executive-level operations leadership, part-time"
      description="Not ready for a full-time COO but need operational leadership? I step in as your fractional Chief Operating Officer to build systems, lead teams, and drive execution while you focus on vision and growth."
      benefits={[
        "Operational strategy and execution",
        "Team leadership and management",
        "Process optimization and documentation",
        "Vendor and partner management",
        "Financial operations oversight",
        "Growth infrastructure development"
      ]}
      process={[
        { step: "01", title: "Assess", description: "Evaluate current operations and needs" },
        { step: "02", title: "Plan", description: "Develop operational roadmap and priorities" },
        { step: "03", title: "Lead", description: "Execute as embedded member of leadership" },
        { step: "04", title: "Scale", description: "Build toward full-time hire or continued fractional" }
      ]}
      idealFor={[
        "Startups at $1M-$10M revenue",
        "Founder-led companies needing operational support",
        "Businesses preparing for funding or exit",
        "Companies in growth transitions"
      ]}
      investment="Starting at $8,000/month"
    />
  );
}
