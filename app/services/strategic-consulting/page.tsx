"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function StrategicConsultingPage() {
  return (
    <ServicePageTemplate
      title="Strategic Consulting"
      subtitle="High-level business strategy and growth planning"
      description="I work with founders and executives to develop clear strategic roadmaps that align vision with execution. No fluff, no frameworks for frameworks sake. Just actionable strategy that moves the needle."
      benefits={[
        "Clear 90-day and annual strategic roadmaps",
        "Competitive positioning and market analysis",
        "Revenue model optimization",
        "Organizational structure design",
        "Decision-making frameworks",
        "Growth bottleneck identification"
      ]}
      process={[
        { step: "01", title: "Discovery", description: "Deep dive into your business, market position, and goals" },
        { step: "02", title: "Analysis", description: "Identify gaps, opportunities, and strategic priorities" },
        { step: "03", title: "Strategy", description: "Develop actionable roadmap with clear milestones" },
        { step: "04", title: "Execution", description: "Ongoing advisory to ensure implementation" }
      ]}
      idealFor={[
        "Founders scaling from 6 to 7 figures",
        "Executives leading transformation initiatives",
        "Entrepreneurs entering new markets",
        "Business owners preparing for exits"
      ]}
      investment="Starting at $5,000/month"
    />
  );
}
