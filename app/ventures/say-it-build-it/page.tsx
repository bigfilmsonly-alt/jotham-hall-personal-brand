import type { Metadata } from "next";
import { VenturePageTemplate } from "@/components/venture-page-template";

export const metadata: Metadata = {
  title: "Say It Build It | Ventures | Jotham Hall",
  description: "Say It Build It is an AI development and vibe coding agency founded by Jotham Hall, turning ideas into functional products through AI-assisted development.",
  openGraph: {
    title: "Say It Build It | Jotham Hall Ventures",
    description: "AI development and vibe coding agency.",
    url: "https://jothamhall.com/ventures/say-it-build-it",
  },
  alternates: {
    canonical: "https://jothamhall.com/ventures/say-it-build-it",
  },
};

export default function SayItBuildItPage() {
  return (
    <VenturePageTemplate
      name="Say It Build It"
      tagline="AI development and vibe coding agency"
      description="Say It Build It represents the future of software development. Using vibe coding and AI-assisted development, we collapse the gap between idea and product. Non-technical founders can now build real products in days, not months. We handle everything from concept to deployed application."
      status="Active"
      year="2024"
      features={[
        "AI-assisted rapid prototyping",
        "Full-stack application development",
        "MVP builds in days not months",
        "No-code and low-code solutions",
        "Technical consulting for non-technical founders",
        "Ongoing maintenance and iteration"
      ]}
      impact={[
        { metric: "100+", label: "Apps Built" },
        { metric: "10x", label: "Faster Development" },
        { metric: "80%", label: "Cost Reduction" },
        { metric: "48hr", label: "Average MVP Time" }
      ]}
      role="Founder & Lead Developer"
    />
  );
}
