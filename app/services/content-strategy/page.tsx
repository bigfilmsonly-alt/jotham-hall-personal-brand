"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function ContentStrategyPage() {
  return (
    <ServicePageTemplate
      title="Content Strategy"
      subtitle="Create content that converts and builds authority"
      description="Content without strategy is just noise. I develop content ecosystems that attract your ideal clients, establish authority, and drive measurable business results across every platform."
      benefits={[
        "Content calendar and editorial planning",
        "Platform-specific content strategies",
        "SEO and search optimization",
        "Content repurposing systems",
        "Analytics and performance tracking",
        "Team and workflow development"
      ]}
      process={[
        { step: "01", title: "Audit", description: "Analyze current content and competitors" },
        { step: "02", title: "Strategy", description: "Develop comprehensive content roadmap" },
        { step: "03", title: "Execute", description: "Create and distribute high-impact content" },
        { step: "04", title: "Measure", description: "Track results and optimize continuously" }
      ]}
      idealFor={[
        "Businesses with inconsistent content",
        "Founders who know they should post more",
        "Companies wanting organic lead generation",
        "Anyone building a media presence"
      ]}
      investment="Starting at $4,000/month"
    />
  );
}
