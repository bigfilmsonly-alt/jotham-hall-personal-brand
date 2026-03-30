import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-study-template";

export const metadata: Metadata = {
  title: "SaaS Revenue Transformation | Case Study | Jotham Hall",
  description: "How Jotham Hall helped a B2B SaaS company achieve 300% revenue growth in 6 months through automated sales systems and pricing optimization.",
  openGraph: {
    title: "SaaS Revenue Transformation | Case Study",
    description: "300% revenue growth in 6 months through automated sales systems.",
    url: "https://jothamhall.com/case-studies/saas-revenue-transformation",
  },
  alternates: {
    canonical: "https://jothamhall.com/case-studies/saas-revenue-transformation",
  },
};

export default function SaaSCaseStudy() {
  return (
    <CaseStudyTemplate
      title="3x Revenue in 6 Months"
      client="B2B SaaS Company"
      industry="Technology"
      duration="6 Months"
      challenge="A growing B2B SaaS platform was stuck at $80K MRR despite strong product-market fit. Manual sales processes, inconsistent pricing, and founder-dependent deal closing were limiting growth. They needed systems that could scale without adding headcount."
      solution={[
        "Audited entire sales funnel and identified 12 friction points causing deal abandonment",
        "Implemented automated lead scoring and nurturing sequences that qualified prospects before human touch",
        "Redesigned pricing tiers with value-based positioning, increasing average contract value by 65%",
        "Built automated onboarding that reduced time-to-value from 14 days to 3 days",
        "Created sales playbooks and trained team on consultative selling approach",
        "Deployed revenue analytics dashboard for real-time visibility into pipeline health"
      ]}
      results={[
        { metric: "300%", description: "Revenue growth in 6 months" },
        { metric: "$240K", description: "New MRR achieved" },
        { metric: "65%", description: "Increase in average deal size" },
        { metric: "3 Days", description: "Reduced onboarding time" },
        { metric: "45%", description: "Improvement in close rate" },
        { metric: "0", description: "Additional sales hires needed" }
      ]}
      testimonial={{
        quote: "Jotham did not just consult. He rebuilt our entire revenue engine. The systems he put in place are still driving growth a year later.",
        name: "Founder & CEO",
        role: "B2B SaaS Platform"
      }}
      services={["Revenue Systems", "Automation", "Strategic Consulting", "Systems Architecture"]}
    />
  );
}
