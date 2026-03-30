import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking Engagements | Jotham Hall",
  description: "Book Jotham Hall for keynotes, workshops, and executive sessions on AI, automation, systems thinking, personal branding, and entrepreneurship.",
  openGraph: {
    title: "Speaking Engagements | Jotham Hall",
    description: "Book Jotham Hall for keynotes, workshops, and executive sessions.",
    url: "https://jothamhall.com/services/speaking",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/speaking",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
