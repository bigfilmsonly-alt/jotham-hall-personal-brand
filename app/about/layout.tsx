import type { Metadata } from "next";

const description =
  "Jotham Hall spent 15 years producing network TV, with 50+ credits on Hallmark, Food Network, NBC, VH1, and MTV, and now builds AI systems and apps for businesses.";

// The square headshot as the share image: this is the profile page.
// openGraph and twitter here replace the root layout's blocks rather than
// merging with them, so the image has to be named again.
const image = { url: "/jotham-hall-headshot.jpg", width: 1024, height: 1024, alt: "Jotham Hall" };

export const metadata: Metadata = {
  // The root layout's template appends "| Jotham Hall".
  title: "About: AI Systems Architect and TV Producer",
  description,
  keywords: [
    "Jotham Hall",
    "about Jotham Hall",
    "who is Jotham Hall",
    "Jotham Hall TV producer",
    "AI systems architect",
    "app developer",
    "talent producer",
    "Miami Beach",
  ],
  openGraph: {
    title: "About Jotham Hall",
    description,
    url: "https://jothamhall.com/about",
    siteName: "Jotham Hall",
    locale: "en_US",
    type: "profile",
    firstName: "Jotham",
    lastName: "Hall",
    images: [image],
  },
  twitter: {
    card: "summary",
    title: "About Jotham Hall",
    description,
    images: [image],
  },
  alternates: {
    canonical: "https://jothamhall.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
