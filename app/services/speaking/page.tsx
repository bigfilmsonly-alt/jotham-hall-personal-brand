"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function SpeakingPage() {
  return (
    <ServicePageTemplate
      title="Speaking"
      subtitle="Keynotes, workshops, and executive sessions"
      description="I speak on AI, automation, systems thinking, personal branding, and entrepreneurship. From keynotes to intimate workshops, I deliver actionable insights that audiences can implement immediately."
      benefits={[
        "Keynote presentations (45-90 min)",
        "Half and full-day workshops",
        "Executive team sessions",
        "Virtual and in-person formats",
        "Customized content for your audience",
        "Follow-up resources and materials"
      ]}
      process={[
        { step: "01", title: "Consult", description: "Understand your audience and objectives" },
        { step: "02", title: "Customize", description: "Tailor content to your specific needs" },
        { step: "03", title: "Deliver", description: "High-energy, actionable presentation" },
        { step: "04", title: "Follow-up", description: "Resources and continued engagement" }
      ]}
      idealFor={[
        "Conferences and industry events",
        "Corporate leadership retreats",
        "Mastermind groups and communities",
        "University and educational programs"
      ]}
      investment="Starting at $5,000 per engagement"
    />
  );
}
