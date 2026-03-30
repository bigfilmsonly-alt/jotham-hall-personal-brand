import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation Services | Jotham Hall",
  description: "Eliminate repetitive tasks and scale operations with Jotham Hall. Build automation systems that handle the repetitive work so you can focus on high-value activities.",
  openGraph: {
    title: "Automation Services | Jotham Hall",
    description: "Eliminate repetitive tasks and scale operations with Jotham Hall.",
    url: "https://jothamhall.com/services/automation",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/automation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
