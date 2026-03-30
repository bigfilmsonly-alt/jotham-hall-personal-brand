import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Systems | Jotham Hall",
  description: "Build intelligent AI systems that work 24/7. Custom AI agents, workflow automation, and integration architecture designed to eliminate bottlenecks and scale operations.",
  keywords: ["AI automation", "AI agents", "workflow automation", "business automation", "Jotham Hall AI", "AI consultant"],
  openGraph: {
    title: "AI Automation Systems | Jotham Hall",
    description: "Build intelligent AI systems that work 24/7. Custom AI agents, workflow automation, and integration architecture.",
    type: "website",
    url: "https://jothamhall.com/services/ai-automation",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/ai-automation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
