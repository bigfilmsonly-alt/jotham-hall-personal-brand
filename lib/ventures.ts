/*
  One list feeds the Ventures index, every /ventures/[slug] page, the sitemap and
  the tab bar's Ventures sheet, so a venture is added or edited in one place.

  Copy rules for this site: no em dashes or hyphenated compounds, American
  English, no prices, and nothing a visitor cannot check on the venture's own
  site. Partner builds name the founder and state Jo's actual role.
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
  role: string;
  description: string;
  features: string[];
  links: { label: string; href: string }[];
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
    links: [{ label: "Visit Success Upgrade", href: "https://www.successupgrade.ai/" }],
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
    links: [{ label: "See SaaS Agency", href: "https://www.successupgrade.ai/saas-agency" }],
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
    links: [{ label: "Start the Free Course", href: "https://www.sayitbuildit.com/" }],
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
    links: [{ label: "Join the Waitlist", href: "https://www.aiarmy.com/" }],
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
    links: [{ label: "Visit Big Films Only", href: "https://www.bigfilmsonly.com/" }],
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
    links: [{ label: "Visit BookTalent", href: "https://www.booktalent.co/" }],
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
    links: [{ label: "Visit Electro Hydration", href: "https://electrohydration.com/" }],
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
    links: [
      { label: "Watch Verza TV", href: "https://www.verzatv.com/" },
      { label: "App Store", href: "https://apps.apple.com/us/app/verza-tv-vertical-drama/id6752884623" },
    ],
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
    links: [{ label: "Visit Evolve Longevity", href: "https://www.evolvelongevity.co/" }],
    featured: true,
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
    links: [{ label: "Visit MediaMD", href: "https://mediamd.com/" }],
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
    links: [{ label: "Visit The Boat Goat", href: "https://www.theboatgoat.co/" }],
  },
];

export function getVenture(slug: string) {
  return ventures.find((venture) => venture.slug === slug);
}
