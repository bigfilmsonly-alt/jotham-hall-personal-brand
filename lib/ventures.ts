/*
  One list feeds the Ventures index, every /ventures/[slug] page, the in site
  viewer at /ventures/[slug]/site, the sitemap and the tab bar's Ventures sheet,
  so a venture is added or edited in one place.

  Copy rules for this site: no em dashes or hyphenated compounds, American
  English, no prices, and nothing a visitor cannot check on the venture's own
  site. Partner builds name the founder where it is public and state Jo's
  actual role; where the role is not on record, leave `role` out rather than
  guess, and the page simply omits the line.

  `site` opens inside jothamhall.com, so the visitor never leaves. Every one of
  these sites allowlists jothamhall.com in its frame-ancestors header; a new
  venture needs the same header on its own site before its viewer can load.
  `links` is only for places that refuse to be framed by anyone, like the App
  Store, and those open normally.
*/

export const ventureGroups = ["Founded", "Built With Partners"] as const;

export type Venture = {
  slug: string;
  name: string;
  group: (typeof ventureGroups)[number];
  category: string;
  tagline: string;
  status: string;
  year?: string;
  role?: string;
  description: string;
  features: string[];
  site: string;
  visitLabel: string;
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export const ventures: Venture[] = [
  {
    slug: "success-upgrade",
    name: "Success Upgrade",
    group: "Founded",
    category: "Platform",
    tagline: "Systems that run the business you built.",
    status: "Live",
    year: "2024",
    role: "Founder and CEO",
    description:
      "Success Upgrade is my home base for entrepreneurs. It brings my agency, my AI training path, mentorship, strategy calls, and every one of my brands together in one app.",
    features: [
      "SaaS Agency: websites, apps, video, and follow up systems from one team",
      "The Path: a guided AI training program",
      "Mentorship plans and strategy calls with me",
      "Big Films Only, Electro Hydration, and my other brands one tap away",
    ],
    site: "https://www.successupgrade.ai/",
    visitLabel: "Visit Success Upgrade",
    featured: true,
  },
  {
    slug: "saas-agency",
    name: "SaaS Agency",
    group: "Founded",
    category: "Agency",
    tagline: "Your website, funnel, and follow up, built by one team.",
    status: "Live",
    role: "Founder and Managing Director",
    description:
      "SaaS Agency is the build arm of Success Upgrade. One team designs and builds a business's website, video, and follow up system, with itemized pricing shown before any work begins.",
    features: [
      "Websites and mobile web apps, including App Store submission",
      "Search and AI answer engine visibility",
      "AI video content",
      "CRM, email, and SMS automation",
      "Ad campaigns on Facebook, Google, and TikTok",
    ],
    site: "https://www.successupgrade.ai/saas-agency",
    visitLabel: "See SaaS Agency",
  },
  {
    slug: "say-it-build-it",
    name: "Say It Build It",
    group: "Founded",
    category: "Course",
    tagline: "Build real apps by describing them. Free.",
    status: "Live",
    year: "2024",
    role: "Founder and instructor",
    description:
      "Say It Build It is a free crash course that teaches anyone to build working apps by describing what they want in plain words. No coding, no signup, and no credit card to start.",
    features: [
      "Lessons that go from an idea to a deployed app",
      "A library of prompts to copy and use",
      "A playbook for turning what you build into income",
    ],
    site: "https://www.sayitbuildit.com/",
    visitLabel: "Start the Free Course",
    featured: true,
  },
  {
    slug: "ai-army",
    name: "AI Army",
    group: "Founded",
    category: "AI training",
    tagline: "Practical AI for entrepreneurs.",
    status: "Waitlist Open",
    role: "Founder",
    description:
      "AI Army is training, community, and expert help for entrepreneurs who want to build products, automate their work, and grow with AI. Training and community access open soon, and the waitlist is open now.",
    features: [
      "Practical AI training for business owners",
      "A community of entrepreneurs building with AI",
      "Expert help on business projects",
    ],
    site: "https://www.aiarmy.com/",
    visitLabel: "Join the Waitlist",
  },
  {
    slug: "lumi",
    name: "Lumi",
    group: "Founded",
    category: "Med spa app",
    tagline: "A white label app for luxury med spas.",
    status: "Live Demo",
    role: "Founder",
    description:
      "Lumi gives a med spa its own branded app for booking, a skincare shop, rewards, and an assistant that answers client questions. The live demo runs as a Miami med spa.",
    features: [
      "Treatment booking",
      "A skincare shop inside the app",
      "Rewards on every visit",
      "An assistant for client questions",
      "Each practice's own brand",
    ],
    site: "https://builtbyjothamhall.vercel.app/",
    visitLabel: "Open the Demo",
  },
  {
    slug: "big-films-only",
    name: "Big Films Only",
    group: "Founded",
    category: "Production",
    tagline: "Film and video production for networks, brands, and artists.",
    status: "Live",
    role: "Founder",
    description:
      "Big Films Only is my production company. It shoots commercials, music videos, and branded content, and its team has worked on network shows including Finding Mr. Christmas on Hallmark, Temptation Island on USA Network, and Ciao House on Food Network.",
    features: [
      "Commercials and branded content",
      "Music videos",
      "Lifestyle and nightlife films",
      "AI production and animated video",
      "Shoots in Oakland, Los Angeles, Miami, New York, and Dubai",
    ],
    site: "https://www.bigfilmsonly.com/",
    visitLabel: "Visit Big Films Only",
  },
  {
    slug: "booktalent",
    name: "BookTalent",
    group: "Founded",
    category: "Talent marketplace",
    tagline: "The marketplace and agency for booking verified talent.",
    status: "Live",
    role: "Cofounder and CEO",
    description:
      "BookTalent connects actors, models, influencers, musicians, and creators with the producers and brands who book them. Talent builds a profile for free, and bookers search by exactly what a campaign needs. It is a division of Big Films Only.",
    features: [
      "Free profiles for actors, models, influencers, musicians, and creators",
      "Search by exactly who a campaign needs",
      "Verified talent profiles",
    ],
    site: "https://www.booktalent.co/",
    visitLabel: "Visit BookTalent",
  },
  {
    slug: "electro-hydration",
    name: "Electro Hydration",
    group: "Founded",
    category: "Wellness",
    tagline: "Premium water ionizers and home hydration systems.",
    status: "Live",
    role: "Founder",
    description:
      "Electro Hydration sells water ionizers made in Japan, along with bath, shower, and filtration systems. A short guided path matches each home to the right unit.",
    features: [
      "A guided path that recommends the right unit",
      "Every model compared side by side",
      "Bath, shower, and filtration systems",
    ],
    site: "https://electrohydration.com/",
    visitLabel: "Visit Electro Hydration",
  },
  {
    slug: "verza-tv",
    name: "Verza TV",
    group: "Built With Partners",
    category: "Streaming",
    tagline: "Short vertical dramas, reality, and music, made for your phone.",
    status: "On the App Store",
    year: "2025",
    role: "Built the website and iPhone app, and ships its releases",
    description:
      "Verza TV is a streaming service for short vertical series, founded by Alan Mruvka. Viewers watch dramas, reality, anime, and music on the web and in the iPhone app.",
    features: [
      "Vertical episodes made for watching on a phone",
      "Drama, reality, anime, music, and Spanish language collections",
      "Streams on the web and in the iPhone app",
    ],
    site: "https://www.verzatv.com/",
    visitLabel: "Watch Verza TV",
    // Apple refuses to be framed by any site, so the store link opens normally.
    links: [{ label: "App Store", href: "https://apps.apple.com/us/app/verza-tv-vertical-drama/id6752884623" }],
    featured: true,
  },
  {
    slug: "evolve-longevity",
    name: "Evolve Longevity",
    group: "Built With Partners",
    category: "Longevity clinic",
    tagline: "A longevity and recovery clinic in Miami Beach.",
    status: "Live",
    role: "Strategic partner. Built the website and the iPhone app",
    description:
      "Evolve Longevity is a longevity and recovery clinic in Miami Beach, founded by Connor Wade. I am a strategic partner, and I built the clinic's website and its iPhone app, which is now in private beta.",
    features: [
      "Clinic website with treatment pages and consultation booking",
      "An iPhone app for clients, now in private beta",
      "Content and growth strategy",
    ],
    site: "https://www.evolvelongevity.co/",
    visitLabel: "Visit Evolve Longevity",
    featured: true,
  },
  {
    slug: "peaceful-healing-rx",
    name: "Peaceful Healing Rx",
    group: "Built With Partners",
    category: "Patient app",
    tagline: "Understand every word your doctor says.",
    status: "Live",
    role: "Built the app",
    description:
      "Peaceful Healing Rx is a free app that helps patients, families, and caregivers understand their care in their own language. It interprets what was said, offers ASL by video, and explains visits, bills, and medications in plain words.",
    features: [
      "Interpreting in the patient's language, or ASL by video",
      "Visit summaries with clear next steps",
      "Insurance bills and denials explained in plain words",
      "A medication tracker",
      "Free, with no account, and notes that stay on the device",
    ],
    site: "https://peacefulhealingrx.com/",
    visitLabel: "Visit Peaceful Healing Rx",
  },
  {
    slug: "crnc",
    name: "CRNC",
    group: "Built With Partners",
    category: "Payments",
    tagline: "Pay. Earn. Own.",
    status: "Private Beta",
    description:
      "CRNC is a payments platform where transactions cost almost nothing and settle in seconds. Customers earn rewards on every payment, and creators and customers share in the revenue.",
    features: [
      "Payments that settle in seconds",
      "Rewards earned on every transaction",
      "Revenue shared between creators and customers",
    ],
    site: "https://crnc.ai/",
    visitLabel: "Visit CRNC",
  },
  {
    slug: "codevibe",
    name: "CodeVibe",
    group: "Built With Partners",
    category: "AI website builder",
    tagline: "Your business. Beautifully built.",
    status: "Live",
    description:
      "CodeVibe turns a few sentences into a website or an interactive app prototype. Describe the business, shape the design by asking, and publish, with no coding.",
    features: [
      "Websites written from a short description",
      "Interactive app prototypes",
      "Changes made by asking",
    ],
    site: "https://www.codevibe.com/",
    visitLabel: "Visit CodeVibe",
  },
  {
    slug: "mediamd",
    name: "MediaMD",
    group: "Built With Partners",
    category: "Healthcare marketing",
    tagline: "Patient apps and AI search for medical practices.",
    status: "Live",
    role: "Creative Director",
    description:
      "MediaMD helps medical practices get found in search and AI answers, and gives their patients one branded app to book visits, shop, collect rewards, and refer friends.",
    features: [
      "Custom patient apps built around each practice's brand",
      "SEO and AI search visibility",
      "Booking, rewards, and referrals in one place",
      "For medical, dental, aesthetics, dermatology, and longevity practices",
    ],
    site: "https://mediamd.com/",
    visitLabel: "Visit MediaMD",
  },
  {
    slug: "growdoc",
    name: "GrowDoc",
    group: "Built With Partners",
    category: "Healthcare growth",
    tagline: "The growth partner for medical practices.",
    status: "Live",
    description:
      "GrowDoc helps medical practices bring in more patients, with paid ads, search, websites, and apps handled by one team.",
    features: [
      "Paid ads on Facebook, Instagram, TikTok, and Google",
      "Search visibility that brings patients without ad spend",
      "Patient apps and software",
      "For med spas, longevity clinics, plastic surgeons, and chiropractors",
    ],
    site: "https://www.growdoc.com/",
    visitLabel: "Visit GrowDoc",
  },
  {
    slug: "websitewave",
    name: "WebsiteWave",
    group: "Built With Partners",
    category: "Web agency",
    tagline: "Websites that rank and convert.",
    status: "Live",
    description:
      "WebsiteWave builds custom websites designed to rank in local search and turn visitors into customers, along with mobile apps for the businesses behind them.",
    features: [
      "Custom website design",
      "Local search pages for every service and city",
      "Mobile app development",
    ],
    site: "https://www.websitewave.com/",
    visitLabel: "Visit WebsiteWave",
  },
  {
    slug: "voltage-capital",
    name: "Voltage Capital",
    group: "Built With Partners",
    category: "Private investment",
    tagline: "Scale to sell.",
    status: "Live",
    role: "Built the website and its diagnostic",
    description:
      "Voltage Capital is a private investment firm that helps profitable operators grow enterprise value, strengthen recurring revenue, and prepare their companies for a sale.",
    features: [
      "A free Scale to Sell diagnostic for owners",
      "Growth packages and a transformation roadmap",
      "Strategy calls booked from the site",
    ],
    site: "https://www.voltage-cap.com/",
    visitLabel: "Visit Voltage Capital",
  },
  {
    slug: "the-boat-goat",
    name: "The Boat Goat",
    group: "Built With Partners",
    category: "Yacht charters",
    tagline: "Luxury yacht charters in Miami.",
    status: "Live",
    role: "Built the website and booking flow",
    description:
      "The Boat Goat is Lex Lindquist's Miami yacht charter company. Guests browse boats by size and budget, then book directly with Lex by text, call, or a short request form.",
    features: [
      "Boats grouped by size, style, and budget",
      "Direct text and call booking with the owner",
      "A request form that matches guests to a boat by date and budget",
    ],
    site: "https://www.theboatgoat.co/",
    visitLabel: "Visit The Boat Goat",
  },
];

export function getVenture(slug: string) {
  return ventures.find((venture) => venture.slug === slug);
}
