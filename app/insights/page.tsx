import { Metadata } from "next";
import { InsightsIndex } from "./insights-index";

export const metadata: Metadata = {
  title: "Insights | Jotham Hall",
  description: "Strategic insights on AI automation, revenue systems, personal branding, and building scalable businesses. Lessons from building multiple ventures.",
  keywords: ["business insights", "AI automation", "revenue systems", "personal branding", "startup strategy", "Jotham Hall blog"],
  openGraph: {
    title: "Insights | Jotham Hall",
    description: "Strategic insights on AI automation, revenue systems, and building scalable businesses.",
    type: "website",
    url: "https://jothamhall.com/insights",
  },
  alternates: {
    canonical: "https://jothamhall.com/insights",
  },
};

export default function InsightsPage() {
  return <InsightsIndex />;
}
