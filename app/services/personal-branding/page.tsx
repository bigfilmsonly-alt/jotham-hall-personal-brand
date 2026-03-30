"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function PersonalBrandingPage() {
  return (
    <ServicePageTemplate
      title="Personal Branding"
      subtitle="Build an audience and authority in your niche"
      description="Your personal brand is your most valuable business asset. I help founders and executives craft compelling narratives, build audiences, and position themselves as the go-to authority in their space."
      benefits={[
        "Brand positioning and messaging",
        "Content strategy development",
        "Social media presence optimization",
        "Thought leadership positioning",
        "Speaking and media opportunities",
        "Community building frameworks"
      ]}
      process={[
        { step: "01", title: "Define", description: "Clarify your unique value proposition and story" },
        { step: "02", title: "Position", description: "Identify your niche and differentiation" },
        { step: "03", title: "Create", description: "Develop content strategy and assets" },
        { step: "04", title: "Amplify", description: "Build distribution and grow audience" }
      ]}
      idealFor={[
        "Founders building thought leadership",
        "Executives transitioning to consulting",
        "Entrepreneurs launching personal brands",
        "Anyone who wants to monetize expertise"
      ]}
      investment="Starting at $7,500 per engagement"
    />
  );
}
