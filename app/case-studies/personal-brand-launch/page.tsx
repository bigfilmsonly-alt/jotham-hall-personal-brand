import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-study-template";

export const metadata: Metadata = {
  title: "Personal Brand Launch | Case Study | Jotham Hall",
  description: "How Jotham Hall helped an executive build a 100K following and launch a successful personal brand from scratch.",
  openGraph: {
    title: "Personal Brand Launch | Case Study",
    description: "0 to 100K followers through strategic personal branding.",
    url: "https://jothamhall.com/case-studies/personal-brand-launch",
  },
  alternates: {
    canonical: "https://jothamhall.com/case-studies/personal-brand-launch",
  },
};

export default function PersonalBrandCaseStudy() {
  return (
    <CaseStudyTemplate
      title="0 to 100K Followers"
      client="Executive Turned Creator"
      industry="Personal Brand"
      duration="12 Months"
      challenge="A Fortune 500 executive was leaving corporate to launch a consulting practice. Despite 20 years of expertise, they had zero online presence, no audience, and no idea how to position themselves in a crowded market of business coaches and consultants."
      solution={[
        "Developed unique positioning that differentiated from generic business coaches",
        "Created content pillars based on proprietary frameworks from corporate experience",
        "Built content production system with batching and repurposing workflows",
        "Launched on LinkedIn and Twitter with platform-specific strategies",
        "Implemented engagement system for community building and relationship development",
        "Developed lead magnet and email funnel for audience monetization"
      ]}
      results={[
        { metric: "100K", description: "Combined social following" },
        { metric: "$350K", description: "First year consulting revenue" },
        { metric: "15", description: "Speaking engagements booked" },
        { metric: "25K", description: "Email subscribers" },
        { metric: "3", description: "Corporate training contracts" },
        { metric: "1", description: "Book deal secured" }
      ]}
      testimonial={{
        quote: "Jotham helped me find my voice and build an audience that actually wants to buy. Within a year I was earning more than my corporate salary working half the hours.",
        name: "Former Fortune 500 Executive",
        role: "Now Independent Consultant"
      }}
      services={["Personal Branding", "Content Strategy", "Strategic Consulting"]}
    />
  );
}
