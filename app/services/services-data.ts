import type { Metadata } from "next";
import { SHARE_IMAGE } from "@/lib/seo";

/*
  One list feeds /services, the four service pages, their metadata, and the
  "Other Services" links, so a service is edited in one place. The slugs are the
  URLs the tab bar's Services sheet and the footer link to; keep them.

  Copy rules for this site: no prices, no client counts, no results or
  percentages, no testimonials, no guarantees, no em dashes or hyphenated
  compounds, American English, first person. Proof points at real builds in
  lib/ventures.ts (name, status, preview and link come from there), and every
  `note` below restates a fact from that file. TV facts match
  app/credits/credits-content.tsx.

  This module has no "use client", so layouts can build metadata from it on the
  server and the client template can import it too.
*/

export type ServiceSlug =
  | "ai-automation"
  | "revenue-systems"
  | "strategic-consulting"
  | "systems-architecture";

export type ServiceStep = { title: string; detail: string };
export type ServiceDeliverable = { title: string; detail: string };
export type ServiceFaq = { question: string; answer: string };
export type ProofItem = { slug: string; note: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  // The /services card: the problem a visitor recognizes, and the fix in one line.
  problem: string;
  summary: string;
  // Hero: the outcome for a business owner, then one supporting sentence.
  headline: string;
  intro: string;
  forWho: string[];
  deliverablesTitle: string;
  deliverables: ServiceDeliverable[];
  // Always exactly three steps.
  steps: [ServiceStep, ServiceStep, ServiceStep];
  proof: ProofItem[];
  faqs: ServiceFaq[];
  closing: { headline: string; line: string };
  meta: { description: string; keywords: string[] };
};

// The TV record on every proof grid. Verified on /credits: 50+ credits, 2008 to present.
export const tvProof = {
  label: "15 Years · 50+ Credits",
  name: "Network TV",
  note: "Talent producer on Temptation Island, Ciao House, and Finding Mr. Christmas.",
};

const callFaq: ServiceFaq = {
  question: "What happens on the strategy call?",
  answer:
    "Thirty minutes, one on one with me. We look at where the business is stuck and what to fix first. You leave with a clear next step, whether or not we work together.",
};

const costFaq: ServiceFaq = {
  question: "What does it cost?",
  answer:
    "Every project is scoped to the business, so we cover price on the free call, before any work starts.",
};

const technicalFaq: ServiceFaq = {
  question: "Do I need to be technical?",
  answer: "No. I handle the technical work and explain every step in plain words.",
};

const verzaNote = "I built the website and iPhone app, and I ship its releases.";

export const services: Service[] = [
  {
    slug: "ai-automation",
    name: "AI Automation",
    problem: "Too much manual work",
    summary: "AI and automations take repetitive work off your plate.",
    headline: "Automate the work that eats your week",
    intro:
      "I build AI assistants and automations that handle the repetitive work, so you and your team can focus on clients.",
    forWho: [
      "You answer the same questions every day.",
      "Your team moves information between apps by hand.",
      "You know AI could help, but not where to start.",
    ],
    deliverablesTitle: "Your busywork, handled",
    deliverables: [
      {
        title: "An AI assistant",
        detail: "Answers common questions, qualifies leads, and books appointments, day and night.",
      },
      {
        title: "Automated workflows",
        detail: "Lead capture, onboarding, reminders, and invoicing run on their own.",
      },
      {
        title: "Connected tools",
        detail: "Your CRM, email, calendar, and payments share data, so nothing is typed twice.",
      },
      {
        title: "One clear view",
        detail: "A simple dashboard shows what each automation handled.",
      },
    ],
    steps: [
      { title: "Strategy Call", detail: "Free, 30 minutes. We find the tasks that cost you the most time." },
      { title: "Plan", detail: "I map what to automate first, the tools to use, and the scope." },
      { title: "Build", detail: "I build it, test it, and walk your team through it." },
    ],
    proof: [
      { slug: "lumi", note: "My app for med spas, with an assistant that answers client questions." },
      { slug: "peaceful-healing-rx", note: "I built this free app. It interprets for patients and explains bills in plain words." },
      { slug: "saas-agency", note: "My agency builds CRM, email, and SMS automation." },
      { slug: "ai-army", note: "My training for owners who want to automate their work. The waitlist is open." },
    ],
    faqs: [
      technicalFaq,
      {
        question: "Will it work with the tools I already use?",
        answer: "I start with the tools you have, and add a new one only when it clearly earns its place.",
      },
      {
        question: "Will AI replace my team?",
        answer: "No. It takes over the routine tasks, and your team keeps the work that needs a person.",
      },
      costFaq,
    ],
    closing: {
      headline: "Ready to hand off the busywork?",
      line: "Book a free 30 minute call, and we'll pick the first thing to automate.",
    },
    meta: {
      description:
        "AI assistants, automated workflows, and connected tools that take repetitive work off your team. See how it works and book a free strategy call.",
      keywords: ["AI automation", "AI assistant for business", "workflow automation", "business automation", "AI consultant", "Jotham Hall"],
    },
  },
  {
    slug: "revenue-systems",
    name: "Revenue Systems",
    problem: "Leads slipping through",
    summary: "A clear path from first click to paying client.",
    headline: "Turn more of your leads into clients",
    intro:
      "I build the path from first click to paying client: capture, instant follow up, booking, and tracking, so every lead gets a fast reply.",
    forWho: [
      "Leads come in, but some never hear back.",
      "Booking a call takes a string of messages.",
      "You can't see which marketing brings in clients.",
    ],
    deliverablesTitle: "The whole path, built",
    deliverables: [
      { title: "Lead capture", detail: "Pages and forms built to turn visitors into leads." },
      {
        title: "Instant follow up",
        detail: "Texts and emails that reply right away and stay in touch until they book.",
      },
      {
        title: "Booking and pipeline",
        detail: "Calls book straight onto your calendar, and every lead has a stage in your CRM.",
      },
      {
        title: "Revenue tracking",
        detail: "See where each client came from and which steps turn leads into sales.",
      },
    ],
    steps: [
      { title: "Strategy Call", detail: "Free, 30 minutes. We trace where your leads come from and what happens to each one." },
      { title: "Plan", detail: "I map every step a lead takes, with a clear scope." },
      { title: "Build", detail: "I build the pages, follow up, and pipeline, test every step, and launch." },
    ],
    proof: [
      { slug: "evolve-longevity", note: "I built the clinic's website, with treatment pages and consultation booking." },
      { slug: "lumi", note: "Booking, a skincare shop, and rewards on every visit, in each spa's own app." },
      { slug: "the-boat-goat", note: "I built the site and booking flow. Guests book by text, call, or a short form." },
      { slug: "voltage-capital", note: "I built the site and its free diagnostic for owners. Strategy calls book from the site." },
    ],
    faqs: [
      {
        question: "I already have a CRM. Do I need a new one?",
        answer: "Not necessarily. I start with what you have and change tools only when it clearly helps.",
      },
      callFaq,
      costFaq,
    ],
    closing: {
      headline: "Ready to stop losing leads?",
      line: "Book a free 30 minute call, and we'll find the gaps in your follow up.",
    },
    meta: {
      description:
        "Lead capture, instant follow up, booking, and tracking built as one system, so more of your leads become clients. Book a free strategy call.",
      keywords: ["revenue systems", "lead follow up", "sales pipeline", "CRM setup", "client acquisition", "Jotham Hall"],
    },
  },
  {
    slug: "strategic-consulting",
    name: "Strategic Consulting",
    problem: "No clear next move",
    summary: "A focused plan for what to do next, in the right order.",
    headline: "Know exactly what to do next",
    intro:
      "I help owners cut through the noise, choose the right priorities, and turn them into a plan the team can run.",
    forWho: [
      "You're busy every day, but not sure it's on the right things.",
      "You have more ideas than time, and no way to rank them.",
      "A big decision is coming: a launch, a hire, a new market, or a sale.",
    ],
    deliverablesTitle: "Clarity you can act on",
    deliverables: [
      { title: "A clear diagnosis", detail: "Where the business stands, and the bottleneck holding it back." },
      { title: "A focused plan", detail: "Priorities for the next 90 days, in order, with milestones." },
      { title: "Positioning and revenue model", detail: "How you stand out, who you sell to, and how you make money." },
      { title: "Advice along the way", detail: "Answers as decisions come up, so the plan actually gets done." },
    ],
    steps: [
      { title: "Strategy Call", detail: "Free, 30 minutes. You walk me through the business and the decision in front of you." },
      { title: "Plan", detail: "I study the numbers and the market, then write your plan." },
      { title: "Advise", detail: "We meet on a steady rhythm and adjust as results come in." },
    ],
    proof: [
      { slug: "evolve-longevity", note: "Strategic partner to the clinic, from growth strategy to its website and app." },
      { slug: "success-upgrade", note: "My company for entrepreneurs: agency, AI training, mentorship, and strategy calls." },
      { slug: "mediamd", note: "Creative Director for a company that helps medical practices get found." },
    ],
    faqs: [
      {
        question: "Is this a one time plan or ongoing?",
        answer: "Either. Some owners want a plan to run on their own. Others want me alongside them as they go.",
      },
      {
        question: "Can you also build what the plan calls for?",
        answer: "Yes. When the plan needs automation, a revenue system, or an app, I can build it too.",
      },
      callFaq,
      costFaq,
    ],
    closing: {
      headline: "Ready for a plan?",
      line: "Book a free 30 minute call, and bring your next big decision.",
    },
    meta: {
      description:
        "A clear diagnosis, a focused 90 day plan, and advice while you execute, for owners facing their next big decision. Book a free strategy call.",
      keywords: ["strategic consulting", "business strategy", "growth plan", "business advisor", "founder advisor", "Jotham Hall"],
    },
  },
  {
    slug: "systems-architecture",
    name: "Systems Architecture",
    problem: "Tools that don't connect",
    summary: "One connected system your team can run without you.",
    headline: "Run the business on systems, not on you",
    intro:
      "I design and build the connected tools, workflows, and processes that let your business grow without you in the middle of everything.",
    forWho: [
      "Your tools don't talk to each other.",
      "Every decision and handoff runs through you.",
      "You're about to hire and need processes that scale.",
    ],
    deliverablesTitle: "One system, fully connected",
    deliverables: [
      { title: "A systems map", detail: "Every tool, workflow, and handoff in the business, with the friction points marked." },
      { title: "The right stack", detail: "Tools chosen and connected around how your team actually works." },
      { title: "The build", detail: "Websites, apps, CRM, and automations, built with your team or mine." },
      { title: "Documented processes", detail: "Clear written steps, so the work doesn't depend on you." },
    ],
    steps: [
      { title: "Strategy Call", detail: "Free, 30 minutes. You show me how work moves around the business today." },
      { title: "Design", detail: "I map the current systems and design the new ones around your team." },
      { title: "Build", detail: "I build and connect everything, document it, and hand it over." },
    ],
    proof: [
      { slug: "verza-tv", note: verzaNote },
      { slug: "peaceful-healing-rx", note: "I built the app: interpreting, visit summaries, bill help, and a medication tracker." },
      { slug: "lumi", note: "One app for each med spa: booking, a shop, rewards, and an assistant." },
      { slug: "evolve-longevity", note: "I built the clinic's website and iPhone app as its strategic partner." },
    ],
    faqs: [
      {
        question: "Do you design it, or build it too?",
        answer: "Both. I design the system, then build it.",
      },
      technicalFaq,
      costFaq,
    ],
    closing: {
      headline: "Ready to connect the business?",
      line: "Book a free 30 minute call, and we'll map where your systems break down.",
    },
    meta: {
      description:
        "Connected tools, workflows, and documented processes, designed and built so your business runs without everything going through you. Book a free strategy call.",
      keywords: ["systems architecture", "business systems", "operations design", "tech stack integration", "process documentation", "Jotham Hall"],
    },
  },
];

// The /services index.
export const servicesIndex = {
  headline: "Grow the business, not your hours",
  intro:
    "I build the systems that let owners grow without working more. Pick where you're stuck, or book a call and I'll point you to the right fix.",
  steps: [
    { title: "Strategy Call", detail: "Free, 30 minutes, with me. We find what is holding the business back." },
    { title: "Plan", detail: "You get a clear plan: what to build, in what order, and the scope." },
    { title: "Build", detail: "I build it, launch it, and hand it over so your team can run it." },
  ] as [ServiceStep, ServiceStep, ServiceStep],
  proof: [
    { slug: "verza-tv", note: verzaNote },
    { slug: "peaceful-healing-rx", note: "I built this free app that explains visits, bills, and medications in plain words." },
    { slug: "evolve-longevity", note: "Strategic partner. I built the clinic's website and iPhone app." },
    { slug: "lumi", note: "My app for med spas: booking, a shop, rewards, and an assistant." },
  ] as ProofItem[],
  faqs: [
    {
      question: "Which service is right for me?",
      answer: "Start with the problem that costs you the most today. The others can come later.",
    },
    callFaq,
    costFaq,
  ] as ServiceFaq[],
  closing: {
    headline: "Not sure which one fits?",
    line: "Book a free 30 minute call, and we'll pick your first fix.",
  },
};

export function getService(slug: ServiceSlug): Service {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const service = getService(slug);
  const url = `https://jothamhall.com/services/${service.slug}`;
  return {
    // The root layout's template appends "| Jotham Hall".
    title: `${service.name} | Services`,
    description: service.meta.description,
    keywords: service.meta.keywords,
    openGraph: {
      title: `${service.name} | Jotham Hall`,
      description: service.summary,
      type: "website",
      url,
      images: [SHARE_IMAGE],
    },
    alternates: { canonical: url },
  };
}
