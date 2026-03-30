import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Systems | Jotham Hall",
  description: "Build predictable revenue machines. Lead generation, sales automation, and client acquisition systems designed to scale your business without scaling headcount.",
  keywords: ["revenue systems", "lead generation", "sales automation", "client acquisition", "Jotham Hall revenue", "business scaling"],
  openGraph: {
    title: "Revenue Systems | Jotham Hall",
    description: "Build predictable revenue machines. Lead generation, sales automation, and client acquisition systems.",
    type: "website",
    url: "https://jothamhall.com/services/revenue-systems",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/revenue-systems",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
