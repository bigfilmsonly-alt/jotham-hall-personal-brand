"use client";

import { ServicePageTemplate } from "@/components/service-page-template";

export default function BusinessDevelopmentPage() {
  return (
    <ServicePageTemplate
      title="Business Development"
      subtitle="Partnerships, deals, and revenue opportunities"
      description="Growth is not just about marketing. I help identify and close strategic partnerships, joint ventures, and business development opportunities that accelerate your trajectory."
      benefits={[
        "Partnership identification and outreach",
        "Deal structuring and negotiation",
        "Joint venture development",
        "Strategic alliance building",
        "Referral network creation",
        "Revenue share arrangements"
      ]}
      process={[
        { step: "01", title: "Target", description: "Identify ideal partners and opportunities" },
        { step: "02", title: "Approach", description: "Develop outreach strategy and materials" },
        { step: "03", title: "Negotiate", description: "Structure deals that benefit all parties" },
        { step: "04", title: "Execute", description: "Implement and manage partnerships" }
      ]}
      idealFor={[
        "Companies seeking strategic partnerships",
        "Founders looking for distribution deals",
        "Businesses wanting referral networks",
        "Anyone pursuing joint ventures"
      ]}
      investment="Retainer + success fee structure"
    />
  );
}
