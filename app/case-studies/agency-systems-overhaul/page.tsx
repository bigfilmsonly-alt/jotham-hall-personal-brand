import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-study-template";

export const metadata: Metadata = {
  title: "Agency Systems Overhaul | Case Study | Jotham Hall",
  description: "How Jotham Hall helped a digital marketing agency save 40 hours per week by building operational infrastructure that eliminated the founder bottleneck.",
  openGraph: {
    title: "Agency Systems Overhaul | Case Study",
    description: "40 hours per week saved through operational infrastructure.",
    url: "https://jothamhall.com/case-studies/agency-systems-overhaul",
  },
  alternates: {
    canonical: "https://jothamhall.com/case-studies/agency-systems-overhaul",
  },
};

export default function AgencyCaseStudy() {
  return (
    <CaseStudyTemplate
      title="From Chaos to Clarity"
      client="Digital Marketing Agency"
      industry="Marketing"
      duration="4 Months"
      challenge="A 15-person digital marketing agency was drowning in operational chaos. The founder was involved in every client decision, project management was scattered across tools, and the team was working nights and weekends just to keep up. Growth had stalled because there was no capacity to take on new clients."
      solution={[
        "Mapped all operational processes and identified the founder as the single point of failure in 80% of workflows",
        "Designed and implemented project management system with clear ownership and escalation paths",
        "Created client onboarding automation that reduced setup time from 2 weeks to 2 days",
        "Built reporting dashboards that gave clients self-serve access to campaign performance",
        "Established weekly rhythm meetings and async communication protocols",
        "Trained team leads to handle client relationships independently"
      ]}
      results={[
        { metric: "40 Hrs", description: "Weekly time saved for founder" },
        { metric: "50%", description: "Increase in client capacity" },
        { metric: "2 Days", description: "New client onboarding time" },
        { metric: "92%", description: "Client retention rate achieved" },
        { metric: "Zero", description: "Weekend work required" },
        { metric: "3x", description: "Team productivity improvement" }
      ]}
      testimonial={{
        quote: "I finally took my first real vacation in 4 years. The agency ran better without me there than it ever had with me grinding every day.",
        name: "Agency Owner",
        role: "Digital Marketing Agency"
      }}
      services={["Systems Architecture", "Automation", "Executive Advisory", "Fractional COO"]}
    />
  );
}
