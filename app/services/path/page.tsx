import type { Metadata } from "next";
import { PathRoom } from "./path-room";
import { SHARE_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // The root layout's template appends "| Jotham Hall".
  title: "The Path",
  description: "Free AI training from Jotham Hall: every mission, every walkthrough, every video.",
  // A shared link to the Path shows the Path, not the home page.
  openGraph: {
    title: "The Path | Jotham Hall",
    description: "Free AI training: every mission, every walkthrough, every video.",
    url: "https://jothamhall.com/services/path",
    images: [SHARE_IMAGE],
  },
  // A frame around the training has nothing of its own to index; the Services page carries it.
  robots: { index: false, follow: true },
  alternates: { canonical: "https://jothamhall.com/services" },
};

export default function PathPage() {
  return <PathRoom />;
}
