"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function ExecutiveAdvisoryPage() {
  return (
    <ServicePageTemplate
      title="Executive Advisory"
      subtitle="Ongoing strategic guidance for leaders"
      description="Having a trusted advisor changes everything. I provide ongoing executive advisory for founders and leaders who want a strategic thinking partner to help navigate growth, challenges, and opportunities."
      benefits={[
        "Weekly or bi-weekly advisory calls",
        "Unlimited async support via voice/text",
        "Decision-making guidance",
        "Network and introduction access",
        "Accountability and goal tracking",
        "Crisis management support"
      ]}
      process={[
        { step: "01", title: "Align", description: "Define goals, challenges, and priorities" },
        { step: "02", title: "Engage", description: "Regular strategic sessions and support" },
        { step: "03", title: "Adapt", description: "Adjust approach based on evolving needs" },
        { step: "04", title: "Grow", description: "Continuous evolution and results" }
      ]}
      idealFor={[
        "CEOs and founders seeking a sounding board",
        "Executives making critical decisions",
        "Leaders navigating transitions",
        "Anyone who values strategic partnership"
      ]}
      investment="Starting at $3,000/month"
    />
  );
}
