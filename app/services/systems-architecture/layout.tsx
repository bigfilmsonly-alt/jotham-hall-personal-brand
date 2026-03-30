import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Systems Architecture | Jotham Hall",
  description: "Design and implement scalable business infrastructure with Jotham Hall. From workflows to tech stacks, every piece designed for growth.",
  openGraph: {
    title: "Systems Architecture | Jotham Hall",
    description: "Design and implement scalable business infrastructure with Jotham Hall.",
    url: "https://jothamhall.com/services/systems-architecture",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/systems-architecture",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
