import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-study-template";

export const metadata: Metadata = {
  title: "Startup Advisory - Series A | Case Study | Jotham Hall",
  description: "How Jotham Hall helped a fintech startup raise $5M Series A through strategic advisory from pitch deck to term sheet.",
  openGraph: {
    title: "Startup Advisory | Case Study",
    description: "$5M Series A raised through strategic advisory.",
    url: "https://jothamhall.com/case-studies/startup-advisory",
  },
  alternates: {
    canonical: "https://jothamhall.com/case-studies/startup-advisory",
  },
};

export default function StartupCaseStudy() {
  return (
    <CaseStudyTemplate
      title="Series A Ready"
      client="Fintech Startup"
      industry="Finance"
      duration="8 Months"
      challenge="A fintech startup with strong traction needed to raise Series A but had never fundraised before. The founding team were technical experts with no investor network, a weak pitch deck, and unclear positioning against well-funded competitors."
      solution={[
        "Refined positioning and narrative to highlight unique competitive advantages",
        "Rebuilt pitch deck with clear story arc and compelling data visualization",
        "Developed financial model with realistic projections and clear unit economics",
        "Created investor targeting strategy focused on fintech-focused VCs",
        "Coached founders on pitch delivery and investor Q&A preparation",
        "Facilitated introductions to 15 relevant investors from personal network"
      ]}
      results={[
        { metric: "$5M", description: "Series A raised" },
        { metric: "2.5x", description: "Oversubscribed round" },
        { metric: "45", description: "Investor meetings held" },
        { metric: "8", description: "Term sheets received" },
        { metric: "60 Days", description: "From first pitch to close" },
        { metric: "18 Mo", description: "Runway secured" }
      ]}
      testimonial={{
        quote: "We had no idea what we were doing with fundraising. Jotham not only helped us tell our story better, he opened doors we never could have opened ourselves.",
        name: "Co-founder & CEO",
        role: "Fintech Startup"
      }}
      services={["Strategic Consulting", "Executive Advisory", "Business Development"]}
    />
  );
}
