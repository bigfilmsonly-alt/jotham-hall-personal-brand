import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jotham Hall | Strategic Consultant & Systems Architect",
  description: "Jotham Hall is a strategic consultant and systems architect specializing in AI automation, revenue system design, and operational infrastructure for founders and entrepreneurs.",
  keywords: ["Jotham Hall", "about Jotham Hall", "strategic consultant", "systems architect", "AI automation expert", "business consultant Bay Area"],
  openGraph: {
    title: "About Jotham Hall | Strategic Consultant & Systems Architect",
    description: "Jotham Hall is a strategic consultant and systems architect specializing in AI automation, revenue system design, and operational infrastructure.",
    url: "https://jothamhall.com/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jotham Hall | Strategic Consultant & Systems Architect",
    description: "Strategic consultant and systems architect specializing in AI automation and revenue systems.",
  },
  alternates: {
    canonical: "https://jothamhall.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
