import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Consulting | Jotham Hall",
  description: "High-level business strategy and growth planning with Jotham Hall. Develop clear strategic roadmaps that align vision with execution for founders and executives.",
  openGraph: {
    title: "Strategic Consulting | Jotham Hall",
    description: "High-level business strategy and growth planning with Jotham Hall.",
    url: "https://jothamhall.com/services/strategic-consulting",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/strategic-consulting",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
