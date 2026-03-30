"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function SystemsArchitecturePage() {
  return (
    <ServicePageTemplate
      title="Systems Architecture"
      subtitle="Design and implement scalable business infrastructure"
      description="Your business is only as strong as its systems. I architect the operational backbone that lets you scale without chaos. From workflows to tech stacks, every piece designed for growth."
      benefits={[
        "End-to-end operational system design",
        "Tech stack selection and integration",
        "Workflow automation blueprints",
        "Team structure optimization",
        "Process documentation",
        "Scalability planning"
      ]}
      process={[
        { step: "01", title: "Audit", description: "Map current systems, identify friction points" },
        { step: "02", title: "Design", description: "Architect new systems for scale and efficiency" },
        { step: "03", title: "Build", description: "Implement systems with your team or mine" },
        { step: "04", title: "Optimize", description: "Continuous improvement and refinement" }
      ]}
      idealFor={[
        "Businesses drowning in manual processes",
        "Founders who are the bottleneck",
        "Companies preparing to scale teams",
        "Operations-heavy businesses"
      ]}
      investment="Starting at $10,000 per project"
    />
  );
}
