import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Development | Jotham Hall",
  description: "Strategic partnerships, deals, and revenue opportunities with Jotham Hall. Identify and close partnerships that accelerate your business trajectory.",
  openGraph: {
    title: "Business Development | Jotham Hall",
    description: "Strategic partnerships, deals, and revenue opportunities with Jotham Hall.",
    url: "https://jothamhall.com/services/business-development",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/business-development",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
