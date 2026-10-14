import type { Metadata } from "next";
import { PathRoom } from "./path-room";

export const metadata: Metadata = {
  // The root layout's template appends "| Jotham Hall".
  title: "The Path",
  description: "Free AI training from Jotham Hall: every mission, every walkthrough, every video.",
  // A frame around the training has nothing of its own to index; the Services page carries it.
  robots: { index: false, follow: true },
  alternates: { canonical: "https://jothamhall.com/services" },
};

export default function PathPage() {
  return <PathRoom />;
}
