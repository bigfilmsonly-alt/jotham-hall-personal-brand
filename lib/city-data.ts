/*
  Local landing pages: /miami and /miami/vibe-coding.

  Only Miami is live, because Jo is based in Miami Beach. next.config.mjs
  sends the old city pages (New York, Los Angeles, and the rest) to the home
  page, and /[city]/ai-automation, revenue-systems, personal-branding and
  fractional-coo to /services. VibeCoding is the one city service page still
  served. A city or service missing from the lists below returns 404.

  Same copy rules as lib/ventures.ts: no prices, no invented results or
  client stories, no scarcity, no em dashes or hyphenated compounds, American
  English. Proof comes from lib/ventures.ts and the TV credits on /credits.
  "{city}" in any string becomes the city's name and "{slug}" its URL slug
  (see localize at the bottom).
*/

import { getVenture } from "@/lib/ventures";

export interface ProofItem {
  /** A slug from lib/ventures.ts; the card takes its name and status from there. */
  slug: string;
  /** One plain line on what Jo built, true to lib/ventures.ts. */
  note: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
  /** Links the first place `label` appears in the answer. */
  link?: { label: string; href: string };
}

export interface Offer {
  name: string;
  outcome: string;
  href: string;
}

export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  geoRegion: string;
  latitude: number;
  longitude: number;
  /** The line above the headline. */
  eyebrow: string;
  /** Ventures shown as proof on the city page, in order. */
  proof: ProofItem[];
  /** The local question that closes the FAQ. */
  localFaq: Faq;
}

export const cities: CityData[] = [
  {
    slug: "miami",
    name: "Miami",
    state: "Florida",
    stateCode: "FL",
    geoRegion: "US-FL",
    latitude: 25.7617,
    longitude: -80.1918,
    eyebrow: "Based in Miami Beach",
    proof: [
      { slug: "verza-tv", note: "I built the streaming website and the iPhone app." },
      { slug: "peaceful-healing-rx", note: "I built the free app that explains visits, bills, and medications." },
      { slug: "evolve-longevity", note: "A Miami Beach clinic. I built its website and iPhone app." },
      { slug: "lumi", note: "My med spa app. The live demo runs as a Miami med spa." },
      { slug: "the-boat-goat", note: "Miami yacht charters. I built the website and booking flow." },
    ],
    localFaq: {
      q: "Do you work with businesses all over Miami?",
      a: "Yes. I am based in Miami Beach and serve businesses across Miami, from Brickell and Downtown to Wynwood, the Design District, Coral Gables, and Coconut Grove.",
    },
  },
];

/* The city page itself, for example /miami. */
export const cityPage = {
  title: "AI Automation & Business Systems in {city}",
  description:
    "AI automation for {city} business owners: systems that answer leads, book appointments, and follow up for you. Built by Jotham Hall, based in Miami Beach.",
  keywords: [
    "AI automation {city}",
    "AI automation consultant {city}",
    "AI consultant {city}",
    "business automation {city}",
    "business systems {city}",
    "revenue systems {city}",
    "vibe coding {city}",
  ],
  headline: "AI Automation That Grows Your {city} Business",
  intro: "I build systems that answer leads, book appointments, and follow up for you, so you get your time back.",
  offersTitle: "What I Build for {city} Businesses",
  offers: [
    {
      name: "AI Automation",
      outcome: "New leads answered, follow ups sent, and busywork handled for you.",
      href: "/services/ai-automation",
    },
    {
      name: "Revenue Systems",
      outcome: "Lead capture, booking, and follow up in one flow, so fewer customers slip away.",
      href: "/services/revenue-systems",
    },
    {
      name: "VibeCoding",
      outcome: "Apps and tools built with AI, or your team trained to build their own.",
      href: "/{slug}/vibe-coding",
    },
    {
      name: "Systems Architecture",
      outcome: "Your tools, data, and workflows designed to work as one.",
      href: "/services/systems-architecture",
    },
    {
      name: "Strategic Consulting",
      outcome: "A clear plan for what to fix first, and why.",
      href: "/services/strategic-consulting",
    },
  ] satisfies Offer[],
  steps: [
    { title: "Book a strategy call", body: "Tell me where leads, hours, or follow up slip through the cracks." },
    { title: "Get a clear plan", body: "I map what to automate first and show you what I would build." },
    { title: "I build it with you", body: "I set up the system, connect your tools, and show your team how to run it." },
  ] satisfies Step[],
  faqs: [
    {
      q: "What happens on the strategy call?",
      a: "We look at how your business runs today, where leads and hours slip away, and what I would build first. You leave knowing your next step.",
    },
    {
      q: "What does it cost?",
      a: "The call is free. If we are a good fit, you get a clear scope and quote before any work begins.",
    },
    {
      q: "Do I need to be technical?",
      a: "No. I build and set everything up, then show your team how to use it. If you want to build on your own, I can teach you that too.",
    },
  ] satisfies Faq[],
  closingTitle: "Tell Me What Slows You Down",
  closingBody: "One call, and you will know what to automate first.",
  notesTitle: "Notes for {city} Business Owners",
};

/* City service pages, for example /miami/vibe-coding. */
export interface CityService {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  headline: string;
  intro: string;
  proof: ProofItem[];
  steps: Step[];
  faqs: Faq[];
  closingTitle: string;
  closingBody: string;
}

export const services: CityService[] = [
  {
    slug: "vibe-coding",
    name: "VibeCoding",
    title: "VibeCoding Consultant in {city}",
    description:
      "VibeCoding in {city}: describe the app or tool you need in plain words, and Jotham Hall builds it with AI or teaches your team to. Based in Miami Beach.",
    keywords: [
      "vibe coding {city}",
      "VibeCoding {city}",
      "VibeCoding consultant {city}",
      "AI app development {city}",
      "no code apps {city}",
      "Cursor AI",
      "Claude AI",
      "v0",
    ],
    headline: "VibeCoding in {city}: Real Apps Without a Dev Team",
    intro: "Describe what you need in plain words, and I build it with AI or teach your team to build it themselves.",
    proof: [
      { slug: "verza-tv", note: "I built the streaming website and the iPhone app." },
      { slug: "peaceful-healing-rx", note: "I built the free patient app that explains visits, bills, and medications." },
      { slug: "evolve-longevity", note: "A Miami Beach clinic. I built its website and its iPhone app, now in private beta." },
      { slug: "lumi", note: "My white label app for med spas, with booking, a shop, and rewards." },
      { slug: "say-it-build-it", note: "My free course that teaches anyone to build apps by describing them." },
    ],
    steps: [
      { title: "Book a strategy call", body: "Describe the app or tool you need in plain words." },
      { title: "See it working early", body: "I build a first version with AI, so you can click through it and shape it." },
      { title: "Launch and hand off", body: "I connect it to your business, launch it, and show your team how to change it." },
    ],
    faqs: [
      {
        q: "What is VibeCoding?",
        a: "Building software by describing what you want in plain words. AI writes the code, and I shape it, test it, and ship it.",
      },
      {
        q: "What can you build?",
        a: "Apps, websites, booking flows, and internal tools. I built the Verza TV iPhone app, the Peaceful Healing Rx patient app, and the booking flow for The Boat Goat in Miami.",
      },
      {
        q: "Can you teach my team instead?",
        a: "Yes. I teach teams to build working apps by describing them. My free course, Say It Build It, is a good place to start.",
        link: { label: "Say It Build It", href: "/ventures/say-it-build-it" },
      },
      {
        q: "What does it cost?",
        a: "The call is free. If we are a good fit, you get a clear scope and quote before any work begins.",
      },
    ],
    closingTitle: "Tell Me What You Want to Build",
    closingBody: "One call, and you will know what it takes to build it.",
  },
];

/** Fills "{city}" and "{slug}" in every string of a copy object. */
export function localize<T>(value: T, city: Pick<CityData, "name" | "slug">): T {
  return JSON.parse(
    JSON.stringify(value).replaceAll("{city}", city.name).replaceAll("{slug}", city.slug)
  ) as T;
}

export type ProofVenture = { slug: string; name: string; status: string; note: string };

/** Proof cards: name and status from lib/ventures.ts, the note from here. */
export function proofVentures(items: ProofItem[]): ProofVenture[] {
  return items.flatMap(({ slug, note }) => {
    const venture = getVenture(slug);
    return venture ? [{ slug, name: venture.name, status: venture.status, note }] : [];
  });
}
