import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fractional COO Services | Jotham Hall",
  description: "Executive-level operations leadership, part-time with Jotham Hall. Get a fractional Chief Operating Officer to build systems, lead teams, and drive execution.",
  openGraph: {
    title: "Fractional COO Services | Jotham Hall",
    description: "Executive-level operations leadership, part-time with Jotham Hall.",
    url: "https://jothamhall.com/services/fractional-coo",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/fractional-coo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
