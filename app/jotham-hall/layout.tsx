import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jotham Hall | Strategic Consultant, Systems Architect, AI Automation Expert",
  description: "Jotham Hall is a strategic consultant and systems architect specializing in AI automation, revenue system design, business transformation, and founder operating systems. Founder of Success Upgrade, Big Films Only, and Say It Build It.",
  keywords: ["Jotham Hall", "who is Jotham Hall", "Jotham Hall consultant", "Jotham Hall AI", "Jotham Hall systems architect", "Jotham Hall Success Upgrade", "strategic consultant", "AI automation expert"],
  openGraph: {
    title: "Jotham Hall | Strategic Consultant & Systems Architect",
    description: "Jotham Hall is a strategic consultant and systems architect helping founders scale with AI automation, revenue systems, and operational infrastructure.",
    url: "https://jothamhall.com/jotham-hall",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jotham Hall | Strategic Consultant & Systems Architect",
    description: "Strategic consultant and systems architect specializing in AI automation and revenue systems.",
  },
  alternates: {
    canonical: "https://jothamhall.com/jotham-hall",
  },
};

export default function JothamHallLayout({ children }: { children: React.ReactNode }) {
  return children;
}
