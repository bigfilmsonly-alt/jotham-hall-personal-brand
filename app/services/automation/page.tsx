"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function AutomationPage() {
  return (
    <ServicePageTemplate
      title="Automation"
      subtitle="Eliminate repetitive tasks and scale operations"
      description="Time is your most valuable asset. I build automation systems that handle the repetitive work so you can focus on high-value activities. From lead nurturing to fulfillment, everything runs on autopilot."
      benefits={[
        "Lead capture and nurturing automation",
        "Client onboarding sequences",
        "Invoicing and payment automation",
        "Reporting and analytics dashboards",
        "Email and communication workflows",
        "Task and project management automation"
      ]}
      process={[
        { step: "01", title: "Map", description: "Document all manual, repetitive processes" },
        { step: "02", title: "Prioritize", description: "Identify highest-impact automation opportunities" },
        { step: "03", title: "Automate", description: "Build and test automation workflows" },
        { step: "04", title: "Monitor", description: "Track performance and optimize continuously" }
      ]}
      idealFor={[
        "Founders spending 20+ hours/week on admin",
        "Service businesses with repetitive delivery",
        "Teams with manual data entry",
        "Anyone who wants their time back"
      ]}
      investment="Starting at $3,000 per automation"
    />
  );
}
