/*
  Insights articles. Slugs, titles, excerpts and dates are what search engines
  and app/feed.xml already know, so they stay fixed.

  The body is plain text with a few markers, one block per blank line:
    ## Heading            a section heading (h2)
    1. **Lead.** Text     a numbered list item; the bold lead renders as an h3
    - **Lead.** Text      the same, unnumbered (for items that name their own order)
    > Text                a pull quote
    [label](/path)        an inline link
  Read time is counted from the words, not typed by hand.
*/

/**
  next.config.mjs redirects /insights to /about, so the index page cannot be
  reached and articles do not link to it. When that redirect is removed, set
  this to true to show "All Insights" under each article.
*/
export const INSIGHTS_INDEX_LIVE = false;

const articles = [
  {
    id: 1,
    slug: "how-i-built-ai-first-ecosystem-paradise-protocol",
    category: "Strategy",
    title: "How I Built an AI First Ecosystem: The Paradise Protocol Story",
    excerpt: "I did not set out to build a life operating system. I set out to solve my own problem. Earlier this year I was running a digital agency, consulting, producing music, and managing brands.",
    fullContent: `I did not set out to build a life operating system. I set out to solve my own problem.

Earlier this year I was running a digital agency, consulting, producing music, and managing brands. Everything was working. Nothing felt connected. I had no way to see whether the daily choices I was making were actually compounding toward something coherent.

So I built Paradise Protocol for myself. Four pillars: health, wealth, love, happiness. A scoring system. Habit tracking. An AI coach that understood my context and pushed back on my patterns instead of just cheerleading.

Other founders soon asked me to build it for them. That is when I knew it was more than a personal tool. This was the operating system for people who refuse to compartmentalize their lives.

## What Building It Taught Me

1. **Systems beat willpower.** Every productivity system I had tried before failed because it required me to remember to use it. Paradise Protocol embeds itself into your morning. Log one metric. The AI synthesizes everything else. The system does the heavy lifting.

1. **Data only matters if it connects to behavior.** A life score is meaningless as a number. But when you see that a three week sleep deficit tanked your wealth pillar because you were making worse decisions, that number becomes a conversation with yourself.

1. **AI coaching accelerates self awareness.** The model has your full context. It does not give generic advice. It notices you have broken your meditation streak twice this month and asks why.

The ecosystem grew from there. [CRNC](/ventures/crnc) became the payments layer. [CodeVibe](/ventures/codevibe) became the way to build a website by describing it. [Success Upgrade](/ventures/success-upgrade) became the public brand reaching people at the beginning of their journey.

But Paradise Protocol is still the core. The proof of concept that personal operating systems work.

> The future is not more apps. It is one integrated system designed around how humans actually think: holistically, emotionally, and in patterns.

That is the bet I made, and it is what I am building.`,
    featured: false,
    publishedAt: "2024-12-15",
    keywords: ["AI ecosystem", "Paradise Protocol", "life operating system", "personal development", "AI coaching"]
  },
  {
    id: 2,
    slug: "daily-upgrade-compounding-small-decisions",
    category: "Personal Development",
    title: "The Daily Upgrade: Compounding Small Decisions Into Large Results",
    excerpt: "People overestimate what they can do in a year. They massively underestimate what they can do in a decade with one better decision made every single day.",
    fullContent: `People overestimate what they can do in a year. They massively underestimate what they can do in a decade with one better decision made every single day.

I learned this the hard way. For years I chased big leaps. The perfect business idea. The perfect moment to start. The dramatic transformation. None of it came. What actually changed my life was embarrassingly simple: I started making slightly better choices at 6 AM every day and refusing to negotiate with myself about it.

> Not perfect choices. Slightly better ones.

Sleep instead of scrolling. Water instead of coffee first thing. One hour of deep work before checking my phone. A three minute gratitude log before bed. None of these things felt significant on day one. By day ninety they had restructured my entire nervous system.

## The Daily Upgrade Stack

1. **Morning anchor.** One non negotiable habit that sets the tone. For me it is movement. The body moves, the mind follows.

1. **Deep work window.** Ninety minutes, phone in another room, one priority only. No meetings. No messages. The single most productive decision I make every day is protecting this window like my life depends on it.

1. **Evening audit.** Three questions before bed. What did I accomplish? What did I avoid? What do I do differently tomorrow? Takes four minutes. Builds more self awareness than any therapy session I have had.

1. **Weekly score.** Every Sunday I check my Paradise Protocol life score. Not to judge myself. To spot patterns.

The compound effect is real. Not motivational poster real. Mathematically, neurologically, demonstrably real. One percent better every day for a year is 37 times better by year end.

Do not be most people. Be the person who stays consistent when it feels pointless. That is where the gap opens up.`,
    featured: false,
    publishedAt: "2024-12-10",
    keywords: ["compound effect", "daily habits", "personal development", "productivity", "morning routine"]
  },
  {
    id: 3,
    slug: "beyond-saas-building-for-human-evolution",
    category: "Philosophy",
    title: "Beyond SaaS: Why I Am Building for Human Evolution",
    excerpt: "Every venture capitalist I have ever met wants the same slide. Total addressable market. Monthly recurring revenue. Churn rate. Growth curve.",
    fullContent: `Every venture capitalist I have ever met wants the same slide. Total addressable market. Monthly recurring revenue. Churn rate. Growth curve.

I understand why. Those metrics tell a clean story. They are easy to evaluate, easy to compare, easy to project.

> But they do not tell you whether the product is actually changing someone's life.

I started [Success Upgrade](/ventures/success-upgrade) because I believed something that is hard to put in a pitch deck: that the greatest ROI any human being can generate is investing in their own evolution. Health, mindset, relationships, financial intelligence. These compound in ways that spreadsheets cannot capture.

Most SaaS companies build tools that make existing behavior slightly more efficient. I am trying to build tools that change behavior at the root. That is a different mission. It requires a different product philosophy.

When I designed Paradise Protocol, I did not ask, “How do we increase daily active users?” I asked, “How do we make someone's life measurably better in ninety days?” When I built the AI coaching engine, I did not ask, “How do we increase session length?” I asked, “How do we make the AI say something so true about the user that they cannot ignore it?”

These are harder problems. The feedback loops are longer. The metrics are messier. But the products that come out the other end are ones people build their mornings around. That is the difference between utility and transformation.

I am not anti metrics. I track everything. But I track outcomes, not just activity. Did the user's health score improve? Did their income grow? Did they report stronger relationships? Did they feel better at the end of ninety days than the beginning?

Build for the human. The metrics follow.`,
    featured: false,
    publishedAt: "2024-12-05",
    keywords: ["SaaS", "human evolution", "product philosophy", "transformation", "Success Upgrade"]
  },
  {
    id: 4,
    slug: "vibe-coding-future-ai-assisted-development",
    category: "AI and Tools",
    title: "Vibe Coding: The Future of AI Assisted Development",
    excerpt: "Eighteen months ago, building an app meant hiring a development team, writing detailed specs, managing sprints, reviewing pull requests. That world is over.",
    fullContent: `Eighteen months ago, building an app meant hiring a development team, writing detailed specs, managing sprints, reviewing pull requests. The barrier to entry for non technical founders was enormous.

> That world is over.

Vibe coding has collapsed the gap between idea and product. I have watched founders with no coding background ship working web apps in days. I have done it myself, more than once.

## How the Workflow Actually Looks

1. You describe what you want to build in plain English. Not technical specs. Just the vision.

1. The AI generates the initial architecture.

1. You review it, react to it, refine it through conversation.

1. When something breaks, you describe the problem. The AI fixes it.

1. You iterate until it works.

Tools like Cursor and v0 by Vercel have made this a standard workflow for early stage product development. The developers I work with now let AI write much of the code, and their job has shifted to architecture and checking what it writes.

For founders, this changes everything. You no longer need to translate your vision through layers of technical intermediaries. You can validate ideas at a fraction of the cost. You can ship a working MVP in weeks instead of months.

This is why I built [CodeVibe](/ventures/codevibe), which turns a few sentences into a website, and [Say It Build It](/ventures/say-it-build-it), my free course on building by describing. Not to teach people to code in the traditional sense, but to help them build. The skill is not learning Python or JavaScript. The skill is learning how to think in systems, communicate with AI precisely, and iterate fast.

The builders who master vibe coding in the next two years will have an enormous advantage over those who are still waiting for the right technical cofounder.

Start building now. The tools are ready.`,
    // Featured: closest to what clients hire me for, and it links to a live venture.
    featured: true,
    publishedAt: "2024-11-28",
    keywords: ["vibe coding", "AI development", "no code", "Cursor", "v0", "startup development"]
  },
  {
    id: 5,
    slug: "personal-branding-most-valuable-asset",
    category: "Strategy",
    title: "Why Personal Branding Is Your Most Valuable Asset",
    excerpt: "Your personal brand is the only business asset that cannot be copied, commoditized, or acquired. Products can be replicated. Services can be undercut.",
    fullContent: `Your personal brand is the only business asset that cannot be copied, commoditized, or acquired.

Products can be replicated. Services can be undercut. Technology becomes obsolete. But the specific combination of your story, your expertise, your perspective, and the trust you have earned is permanently yours.

I have watched founders pour everything into their companies and nothing into themselves. Then the company pivots, gets acquired, or fails, and they are left starting from scratch. No audience, no reputation, no platform. The brand equity all lived in the business name.

I took the opposite approach. I built Jotham Hall as the primary brand. [Success Upgrade](/ventures/success-upgrade) is the platform. Every venture I build sits underneath the personal brand umbrella. This means if any one venture changes direction, the audience travels with me.

## The Personal Branding Framework That Actually Works

1. **Own one idea.** You cannot be the expert in everything. Pick the intersection that only you can own. For me it is AI powered human evolution. That specific combination of tech, personal development, and health optimization is my territory. Find yours.

1. **Document, do not perform.** The biggest mistake people make with personal branding is trying to appear successful instead of sharing the process of building. Document your actual journey. The failures, the pivots, the insights. Authenticity at scale is rarer than expertise.

1. **Consistency over virality.** One piece of content that reaches a million people is less valuable than showing up every day for three years to an audience of ten thousand who trust you completely.

1. **Cross pollinate your platforms.** Instagram is discovery. Your website is depth. Email is intimacy. YouTube is authority. Use each platform for what it does best and build bridges between them.

1. **Be the reference point.** The goal is not to be known. The goal is to be the person people think of when they encounter your category.

> Your personal brand is a long game. Most people quit before the compounding kicks in. Do not be most people.`,
    featured: false,
    publishedAt: "2024-11-20",
    keywords: ["personal branding", "thought leadership", "content strategy", "audience building", "founder brand"]
  },
  {
    id: 6,
    slug: "founder-os-operating-system-thinking",
    category: "Philosophy",
    title: "The Founder OS: Operating System Thinking Applied to Your Life",
    excerpt: "Every computer runs on an operating system. The OS manages resources, schedules tasks, handles inputs and outputs. Your life needs the same thing.",
    fullContent: `Every computer runs on an operating system. The OS manages resources, schedules tasks, handles inputs and outputs, and ensures that applications run efficiently without conflicting with each other.

> Your life needs the same thing.

Most people run their lives like a computer without an OS. Applications open randomly, resources allocated based on what screamed loudest that morning, no coherent system managing the whole thing. The result is exactly what you would expect: crashes, slowdowns, lost data, and a constant sense that you are behind.

A Founder OS is a personal operating system. A set of principles, routines, and decision frameworks that run quietly in the background of your life, ensuring that your highest priorities always get your best resources.

## How I Built Mine

1. **Core values as kernel.** The kernel is the deepest layer of an operating system. Your core values serve the same function. Mine are clarity, evolution, integrity, and craft. Every major decision I make runs through these four filters. If an opportunity compromises any of them, it is rejected at the kernel level.

1. **Morning routine as boot sequence.** Your computer's boot sequence initializes core systems before any applications can run. Your morning routine does the same. Movement, hydration, focused review of priorities, and one creative task before any communication.

1. **Deep work as processing power.** CPU time is finite. So is your cognitive bandwidth. I schedule my highest leverage work during the first ninety minutes after boot. Everything else fits around that protected window.

1. **Weekly review as defragmentation.** Every Sunday: review the week, close open loops, reprioritize projects, check life scores. Thirty minutes of defragmentation prevents months of fragmented execution.

1. **Annual architecture as system updates.** Zoom out. Evaluate which life applications are worth keeping, which need upgrading, and which should be uninstalled entirely.

The Founder OS is not about being robotic. It is about designing the conditions under which your best self can operate consistently.

Build your OS deliberately, or live by default. Those are the only two options.`,
    featured: false,
    publishedAt: "2024-11-12",
    keywords: ["Founder OS", "operating system", "productivity system", "life design", "personal management"]
  },
  {
    id: 7,
    slug: "running-multiple-ventures-without-burnout",
    category: "Ecosystem",
    title: "Running Multiple Ventures Without Burnout",
    excerpt: "I currently operate six active ventures. Digital agency. Life OS platform. Fintech company. Film production. Health brand. Content brand.",
    fullContent: `I currently operate six active ventures. Digital agency. Life OS platform. Fintech company. Film production. Health brand. Content brand. People always ask the same question: how do you manage all of it without burning out?

The honest answer is that I spent two years figuring out what not to do.

I tried to be operationally involved in everything. I tried to personally manage every client relationship, every product decision, every content calendar. I hit walls I did not see coming. Not dramatic burnout. The slow, grinding kind where you are technically functioning but creatively empty.

## Three Things Changed Everything

1. **Venture level clarity.** Each venture has one clear objective for the current quarter and one metric that determines success. Nothing else matters until that metric moves. This sounds obvious. Almost no one does it. The temptation to optimize everything simultaneously is the exact path to optimizing nothing.

1. **The twenty percent rule.** I give twenty percent of my time to strategy and vision across all ventures. The other eighty percent is protected for deep work on the one or two ventures currently in active build phase. Spreading eighty percent across six ventures produces six mediocre outcomes. Concentrating it produces one breakthrough that raises the floor for everything else.

1. **People who own outcomes, not just tasks.** The shift from managing tasks to assigning ownership changed my capacity more than any productivity system. Every venture, from the agency to [CodeVibe](/ventures/codevibe), has one clear owner. My AI agents handle first pass content. My job is vision, capital allocation, and removing obstacles. Not execution.

The ventures in maintenance mode keep running without my daily attention. The ventures in active build mode get everything I have.

> Running multiple ventures is not a bandwidth problem. It is a system design problem. Design the system correctly and the bandwidth expands to meet the vision.`,
    featured: false,
    publishedAt: "2024-11-05",
    keywords: ["multiple ventures", "portfolio entrepreneur", "burnout prevention", "venture management", "focus"]
  },
  {
    id: 8,
    slug: "art-basel-effect-building-relationships-that-compound",
    category: "Strategy",
    title: "The Art Basel Effect: Building Relationships That Compound",
    excerpt: "I met a CEO at Art Basel. A chance introduction at an event I almost did not attend. That conversation became one of my most important relationships.",
    fullContent: `I met a CEO at Art Basel. A chance introduction at an event I almost did not attend because I was tired and had an early flight the next morning.

That conversation became one of my most important relationships. His network, thinking, and vision line up with where I am headed. One evening in the right room can do what years of cold outreach rarely do.

This is the Art Basel Effect: the right room at the right moment can compress years of relationship building into a single evening. But you have to be in the room, you have to be prepared, and you have to know how to make the most of the moment when it arrives.

## Building Relationships That Actually Compound

1. **Quality over volume.** Most networking advice is wrong. You do not need a thousand connections. You need twenty people who would take your call on a Sunday and mean it when they offer to help. I would rather have twenty people like that in my network than two thousand LinkedIn connections who do not remember my last name.

1. **Bring value before you need it.** The worst networkers lead with what they want. The best ones lead with what they can give. When I met him, I was not pitching. I was asking about his vision, sharing what I was building, and looking for genuine overlap.

1. **Follow through immediately.** The first twenty four hours after meeting someone important are the most critical. I send a real message that references something specific from the conversation. This alone sets me apart from most of the people they met that week.

1. **Stay in their orbit consistently.** Relationships decay without maintenance. I have a simple system: every high priority contact gets a touchpoint at least once a month. A relevant article. A resource. A quick check in. Nothing transactional. Just presence.

1. **Elevate the events you attend.** Not every room is worth being in. I have become selective about which events justify my time. One Art Basel is worth ten generic networking dinners.

The most valuable assets I own are not software platforms or brand names. They are relationships with people who are building the future from a similar vantage point.

> Invest in those relationships like they are your most important portfolio. Because they are.`,
    featured: false,
    publishedAt: "2024-10-28",
    keywords: ["networking", "relationship building", "Art Basel", "high value connections", "business relationships"]
  },
  {
    id: 9,
    slug: "building-ai-powered-life-operating-system",
    category: "AI and Tools",
    title: "Building an AI Powered Life Operating System",
    excerpt: "The tools we use shape the lives we live. I spent years trying different productivity systems, apps, and frameworks. None of them worked until I built my own.",
    fullContent: `The tools we use shape the lives we live. I spent years trying different productivity systems, apps, and frameworks. None of them worked long term because they all made the same mistake: they tried to fit my life into their structure instead of building around how I actually think.

So I built my own.

The core insight was simple: humans do not optimize in silos. Health affects wealth. Relationships affect work. Energy affects decision making. Any system that treats these as separate categories is already broken.

Paradise Protocol tracks four pillars: health, wealth, love, and happiness. Each pillar has its own metrics, but the system surfaces connections between them. It noticed that my wealth score dips after a few nights of poor sleep. It noticed that my happiness rises in weeks with more deep conversations.

> These patterns were invisible to me before the system made them explicit.

The AI layer is what makes it work at scale. I do not have time to journal for an hour every day. But I can spend three minutes logging key metrics. The AI does the synthesis. It reads patterns across weeks and months that I would never spot in daily reflection.

The coaching prompts are not generic. They reference my actual data. Not “have you considered exercising more” but “your movement score has been declining for six days and historically this predicts a dip in your creative output within the next week.”

That specificity changes behavior in a way that generic advice never could.

Building this taught me that the future of personal development is not more content. It is better data infrastructure. Most people are drowning in advice but starving for self awareness. The system that wins is the one that makes self awareness automatic.

That is what I am building. That is what [Success Upgrade](/ventures/success-upgrade) is about.`,
    featured: false,
    publishedAt: "2024-10-20",
    keywords: ["AI life system", "personal operating system", "life optimization", "AI coaching", "Paradise Protocol"]
  },
  {
    id: 10,
    slug: "from-agency-to-ecosystem-evolution-story",
    category: "Ecosystem",
    title: "From Agency to Ecosystem: The Evolution Story",
    excerpt: "I started with a service business. Trading time for money, delivering results for clients, building a reputation one project at a time. It was the right move then.",
    fullContent: `I started with a service business. Trading time for money, delivering results for clients, building a reputation one project at a time. It was the right move then.

Services teach you things that products never will. You learn what people actually pay for, not what they say they want. You learn how to read clients, manage expectations, and deliver under pressure. You build a network of people who trust you with real problems.

But services do not scale. There is a ceiling. At some point, you are trading your best hours for revenue that is capped by your personal capacity.

The transition to an ecosystem was not a single moment. It was a gradual layering:

- **First layer: productized services.** I took the frameworks I was using with clients and turned them into repeatable packages with fixed pricing. This increased margins and reduced customization.

- **Second layer: digital products.** I took the knowledge embedded in those frameworks and turned it into content, courses, and tools that people could use without my direct involvement.

- **Third layer: software.** I took the processes that powered the products and turned them into AI powered platforms that can serve many people at once.

- **Fourth layer: ventures.** I took the credibility and capital from the first three layers and invested in building companies, not just projects.

Each layer funds and feeds the next. Client work generates case studies for content. Content generates leads for products. Products generate users for software. Software generates revenue for new ventures.

> This is what I mean by ecosystem thinking. Every piece of the business is connected to every other piece. Nothing exists in isolation.

The agency is still running. It is just one node in a larger system now. And the system keeps expanding.`,
    featured: false,
    publishedAt: "2024-10-12",
    keywords: ["agency to products", "business evolution", "ecosystem building", "scaling services", "productized services"]
  },
  {
    id: 11,
    slug: "health-wealth-connection-optimizing-both",
    category: "Personal Development",
    title: "The Health Wealth Connection: Optimizing Both",
    excerpt: "The most successful people I know are obsessed with their health. This is not coincidence. The connection between physical optimization and financial performance is direct.",
    fullContent: `The most successful people I know are obsessed with their health. This is not coincidence. The connection between physical optimization and financial performance is direct.

Energy is the foundation of everything. When your energy is low, your decision making suffers. You take shortcuts. You avoid hard conversations. You settle for good enough instead of pushing for great.

When your energy is high, you see opportunities others miss. You have the stamina for the difficult work. You show up consistently when others fade.

I track both health and wealth metrics in Paradise Protocol specifically because I see the connection in my own life. My best months in business tend to be my healthiest months. My worst business decisions tend to come during stretches of poor sleep or skipped workouts.

## My Health Stack

1. **Morning movement.** Thirty minutes minimum before any cognitive work. This is non negotiable. The body activates the brain.

1. **Sleep optimization.** Eight hours in bed, room cold, no screens for an hour before. Sleep is the highest leverage health investment you can make.

1. **Nutrition as fuel.** I eat for performance, not pleasure. This does not mean deprivation. It means intentionality about what goes into my body and when.

1. **Hydration protocol.** Three liters of water daily, more on active days. Many people drink too little water and wonder why they feel tired.

1. **Weekly recovery.** One full rest day with no work, no screens, no obligations. The nervous system needs complete reset.

> The wealthy people who do not prioritize health are borrowing against a future they may not get to spend. The compound interest on health decisions is real. Start investing now.`,
    featured: false,
    publishedAt: "2024-10-05",
    keywords: ["health optimization", "wealth building", "energy management", "sleep optimization", "performance"]
  },
  {
    id: 12,
    slug: "ai-agents-future-of-work",
    category: "AI and Tools",
    title: "AI Agents: The Future of Work Is Already Here",
    excerpt: "This year I handed three kinds of work to AI agents: content research, first drafts, and scheduling. They do that work faster and more consistently, and my time goes to the decisions.",
    fullContent: `This year I handed three kinds of work to AI agents: content research, first drafts, and scheduling. They do that work faster and more consistently, and my time goes to the decisions.

> This is not a prediction about the future. This is a report from the present.

## How I Think About AI Agents

- **Layer one: automation of repetitive tasks.** This is where most people stop. Email sorting, calendar management, data entry. Important but basic.

- **Layer two: first draft creation.** The AI generates content, code, designs, or analysis. A human reviews and refines. This is where productivity multiplies because the human is elevating rather than creating from scratch.

- **Layer three: autonomous decision making within constraints.** The AI makes real decisions based on predefined rules and learns from outcomes. This is where things get interesting.

- **Layer four: agent to agent collaboration.** Multiple AI agents working together on complex projects, with human oversight at key checkpoints.

I operate primarily at layers two and three now. My content agent produces first drafts that require minimal editing. My scheduling agent books meetings without my involvement. My research agent gathers the background I used to collect by hand.

The founders who learn to direct AI agents will move faster than those who do every task by hand.

The question is not whether AI will change work. The question is whether you will be early enough to benefit from the change.

Start experimenting now. The learning curve is steep but the payoff is exponential.`,
    featured: false,
    publishedAt: "2024-09-28",
    keywords: ["AI agents", "future of work", "automation", "AI workforce", "productivity"]
  },
  {
    id: 13,
    slug: "building-in-public-lessons-learned",
    category: "Strategy",
    title: "Building in Public: Lessons From Sharing the Journey",
    excerpt: "I share almost everything about my journey. The wins, the failures, the pivots, the numbers. This was a deliberate strategy that has paid dividends I did not expect.",
    fullContent: `I share almost everything about my journey. The wins, the failures, the pivots, the numbers. This was a deliberate strategy that has paid dividends I did not expect.

Building in public means documenting the process of creation as it happens. Not waiting until you have a success story to tell. Sharing the messy middle.

## Why This Works

1. **Trust compounds faster than content.** When people watch you struggle, iterate, and persist, they trust you in a way that polished success stories never achieve. They have seen behind the curtain. They know you are real.

1. **Feedback loops accelerate learning.** When I share what I am building, people respond with insights I would never have discovered alone. The audience becomes a distributed intelligence network for improving my work.

1. **Accountability creates consistency.** Public commitments are harder to break. When I say I am going to ship something, people are watching. That pressure produces output that internal motivation alone never would.

1. **Opportunities find you.** When people can see what you are building, the right partners and clients know where to find you. The visibility compounds.

The objections people raise are usually fear based. What if someone steals my idea? Ideas are not that valuable. Execution is everything. What if I fail publicly? Failure documented is more valuable than success hidden. What if I look foolish? You probably will sometimes. That is the price of authenticity.

The founders who win in the next decade will be the ones who build audiences while they build companies. The two are not separate activities. They reinforce each other.

> Start sharing before you are ready. The readiness comes from the sharing.`,
    featured: false,
    publishedAt: "2024-09-20",
    keywords: ["building in public", "transparency", "content strategy", "audience building", "founder journey"]
  }
];

/* ---------- Body parsing (runs on the server; the result is plain props) ---------- */

export type InlineSegment = { text: string; href?: string };

export type InsightListItem = { lead?: string; segments: InlineSegment[] };

export type InsightBlock =
  | { type: "paragraph"; segments: InlineSegment[] }
  | { type: "heading"; text: string }
  | { type: "quote"; segments: InlineSegment[] }
  | { type: "list"; ordered: boolean; items: InsightListItem[] };

/** Typographic apostrophes: someone's becomes someone’s. */
function typeset(text: string): string {
  return text.replace(/(\w)'(\w)/g, "$1’$2");
}

/** Splits text on [label](/path) links. */
export function inlineSegments(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const link = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = link.exec(text))) {
    if (match.index > last) segments.push({ text: typeset(text.slice(last, match.index)) });
    segments.push({ text: typeset(match[1]), href: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ text: typeset(text.slice(last)) });
  return segments;
}

export function parseInsightBody(body: string): InsightBlock[] {
  const blocks: InsightBlock[] = [];
  for (const raw of body.split(/\n\s*\n/)) {
    const chunk = raw.trim();
    if (!chunk) continue;
    if (chunk.startsWith("## ")) {
      blocks.push({ type: "heading", text: typeset(chunk.slice(3).trim()) });
      continue;
    }
    if (chunk.startsWith("> ")) {
      blocks.push({ type: "quote", segments: inlineSegments(chunk.slice(2).trim()) });
      continue;
    }
    const item = chunk.match(/^(-|\d+\.)\s+([\s\S]+)$/);
    if (item) {
      const ordered = item[1] !== "-";
      const lead = item[2].match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
      const entry: InsightListItem = lead
        ? { lead: typeset(lead[1].replace(/\.$/, "")), segments: inlineSegments(lead[2]) }
        : { segments: inlineSegments(item[2]) };
      const previous = blocks[blocks.length - 1];
      if (previous && previous.type === "list" && previous.ordered === ordered) previous.items.push(entry);
      else blocks.push({ type: "list", ordered, items: [entry] });
      continue;
    }
    blocks.push({ type: "paragraph", segments: inlineSegments(chunk) });
  }
  return blocks;
}

/** The body as plain words, markers removed (word counts, structured data). */
export function insightPlainText(body: string): string {
  return body
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/^(##|>|-|\d+\.)\s+/gm, "")
    .replace(/\*\*/g, "");
}

export function insightWordCount(body: string): number {
  return insightPlainText(body).split(/\s+/).filter(Boolean).length;
}

/* ---------- Public data ---------- */

export const insights = articles.map((article) => ({
  ...article,
  // About 200 words a minute, rounded up.
  readTime: `${Math.max(1, Math.ceil(insightWordCount(article.fullContent) / 200))} min read`,
}));

export type Insight = (typeof insights)[number];

/** What a list row needs; keeps full article text out of client bundles. */
export type InsightSummary = Pick<Insight, "slug" | "title" | "excerpt" | "category" | "readTime" | "publishedAt">;

export function toInsightSummary({ slug, title, excerpt, category, readTime, publishedAt }: Insight): InsightSummary {
  return { slug, title, excerpt, category, readTime, publishedAt };
}

/** Dates are stored as YYYY-MM-DD; format in UTC so no time zone shifts the day. */
export function formatInsightDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function getInsightBySlug(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}

export function getAllInsightSlugs() {
  return insights.map((insight) => insight.slug);
}

/** Closest articles first: shared keywords count most, then category, then recency. */
export function getRelatedInsights(slug: string, count = 2): Insight[] {
  const current = getInsightBySlug(slug);
  if (!current) return [];
  const keywords = new Set(current.keywords.map((keyword) => keyword.toLowerCase()));
  return insights
    .filter((insight) => insight.slug !== slug)
    .map((insight) => ({
      insight,
      score:
        insight.keywords.filter((keyword) => keywords.has(keyword.toLowerCase())).length * 3 +
        (insight.category === current.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.insight.publishedAt.localeCompare(a.insight.publishedAt))
    .slice(0, count)
    .map(({ insight }) => insight);
}
