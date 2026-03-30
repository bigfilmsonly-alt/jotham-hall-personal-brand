import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-study-template";

export const metadata: Metadata = {
  title: "E-commerce Automation | Case Study | Jotham Hall",
  description: "How Jotham Hall helped an e-commerce brand achieve 95% automation rate for order processing, inventory management, and customer service.",
  openGraph: {
    title: "E-commerce Automation | Case Study",
    description: "95% automation rate achieved for e-commerce operations.",
    url: "https://jothamhall.com/case-studies/ecommerce-automation",
  },
  alternates: {
    canonical: "https://jothamhall.com/case-studies/ecommerce-automation",
  },
};

export default function EcommerceCaseStudy() {
  return (
    <CaseStudyTemplate
      title="Fully Automated Fulfillment"
      client="E-commerce Brand"
      industry="Retail"
      duration="3 Months"
      challenge="A fast-growing DTC brand was processing 500+ orders daily with a team of 8 doing manual order processing, inventory updates, and customer service. Errors were costing thousands monthly, and scaling meant hiring more people they could not afford."
      solution={[
        "Integrated all sales channels into unified order management system with automatic routing",
        "Built inventory sync automation that updated stock across 5 platforms in real-time",
        "Implemented AI-powered customer service that handled 80% of inquiries without human intervention",
        "Created automated fulfillment workflows with carrier selection optimization",
        "Designed exception handling protocols for the 5% of orders requiring human review",
        "Built real-time analytics for inventory forecasting and reorder automation"
      ]}
      results={[
        { metric: "95%", description: "Order processing automated" },
        { metric: "$45K", description: "Monthly labor cost reduction" },
        { metric: "99.8%", description: "Order accuracy rate" },
        { metric: "6 to 2", description: "Team size reduction needed" },
        { metric: "2 Hrs", description: "Average fulfillment time" },
        { metric: "4.9", description: "Customer satisfaction rating" }
      ]}
      testimonial={{
        quote: "We went from 8 people barely keeping up to 2 people easily managing 3x the volume. The ROI was immediate and ongoing.",
        name: "Founder",
        role: "DTC E-commerce Brand"
      }}
      services={["Automation", "AI Automation", "Systems Architecture"]}
    />
  );
}
