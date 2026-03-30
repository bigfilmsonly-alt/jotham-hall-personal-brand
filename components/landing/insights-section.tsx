"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Clock, X } from "lucide-react";

const insights = [
  {
    id: 1,
    category: "Strategy",
    readTime: "8 min",
    title: "How I Built an AI First Ecosystem: The Paradise Protocol Story",
    excerpt: "I did not set out to build a life operating system. I set out to solve my own problem. It was 2024. I was running a digital agency, consulting with high net worth individuals, producing music, managing brands.",
    fullContent: `I did not set out to build a life operating system. I set out to solve my own problem.

It was 2024. I was running a digital agency, consulting with high net worth individuals, producing music, managing brands. Everything was working. Nothing felt integrated. My health was climbing. My business was scaling. But I had no way to see whether the daily choices I was making were actually compounding toward something coherent.

So I built Paradise Protocol for myself. Four pillars: health, wealth, love, happiness. A scoring system. Habit tracking. An AI coach that understood my context and pushed back on my patterns instead of just cheerleading.

Within ninety days, three other founders asked me to build it for them. That is when I knew this was not just a personal tool. This was the operating system for people who refuse to compartmentalize their lives.

Here is what building it taught me:

Systems beat willpower. Every productivity system I had tried before failed because it required me to remember to use it. Paradise Protocol embeds itself into your morning. Log one metric. The AI synthesizes everything else. The system does the heavy lifting.

Data only matters if it connects to behavior. A life score is meaningless as a number. But when you see that a three week sleep deficit tanked your wealth pillar because you were making worse decisions, that number becomes a conversation with yourself.

AI coaching accelerates self awareness. The model has your full context. It does not give generic advice. It notices you have broken your meditation streak twice this month and asks why.

The ecosystem scaled from there. CRNC became the fintech layer for health entrepreneurs. CodeVibe became the vibe coding layer for building faster. Success Upgrade became the public brand reaching people at the beginning of their journey.

But Paradise Protocol is still the core. The proof of concept that personal operating systems work.

The future is not more apps. It is one integrated system designed around how humans actually think: holistically, emotionally, and in patterns.

That is the bet I made. That is what we are building.`,
    featured: true,
  },
  {
    id: 2,
    category: "Personal Development",
    readTime: "6 min",
    title: "The Daily Upgrade: Compounding Small Decisions Into Large Results",
    excerpt: "People overestimate what they can do in a year. They massively underestimate what they can do in a decade with one better decision made every single day.",
    fullContent: `People overestimate what they can do in a year. They massively underestimate what they can do in a decade with one better decision made every single day.

I learned this the hard way. For years I chased big leaps. The perfect business idea. The perfect moment to start. The dramatic transformation. None of it came. What actually changed my life was embarrassingly simple: I started making slightly better choices at 6 AM every day and refusing to negotiate with myself about it.

Not perfect choices. Slightly better ones.

Sleep instead of scrolling. Water instead of coffee first thing. One hour of deep work before checking my phone. A three minute gratitude log before bed. None of these things felt significant on day one. By day ninety they had restructured my entire nervous system.

Here is the framework I use. I call it the Daily Upgrade Stack:

Morning anchor. One non negotiable habit that sets the tone. For me it is movement. The body moves, the mind follows.

Deep work window. Ninety minutes, phone in another room, one priority only. No meetings. No messages. The single most productive decision I make every day is protecting this window like my life depends on it.

Evening audit. Three questions before bed. What did I accomplish? What did I avoid? What do I do differently tomorrow? Takes four minutes. Builds more self awareness than any therapy session I have had.

Weekly score. Every Sunday I check my Paradise Protocol life score. Not to judge myself. To spot patterns.

The compound effect is real. Not motivational poster real. Mathematically, neurologically, demonstrably real. One percent better every day for a year is 37 times better by year end.

Do not be most people. Be the person who stays consistent when it feels pointless. That is where the gap opens up.`,
    featured: false,
  },
  {
    id: 3,
    category: "Philosophy",
    readTime: "7 min",
    title: "Beyond SaaS: Why I Am Building for Human Evolution",
    excerpt: "Every venture capitalist I have ever met wants the same slide. Total addressable market. Monthly recurring revenue. Churn rate. Growth curve.",
    fullContent: `Every venture capitalist I have ever met wants the same slide. Total addressable market. Monthly recurring revenue. Churn rate. Growth curve.

I understand why. Those metrics tell a clean story. They are easy to evaluate, easy to compare, easy to project.

But they do not tell you whether the product is actually changing someone's life.

I started Success Upgrade because I believed something that is hard to put in a pitch deck: that the greatest ROI any human being can generate is investing in their own evolution. Health, mindset, relationships, financial intelligence. These compound in ways that spreadsheets cannot capture.

Most SaaS companies build tools that make existing behavior slightly more efficient. I am trying to build tools that change behavior at the root. That is a different mission. It requires a different product philosophy.

When I designed Paradise Protocol, I did not ask how do we increase daily active users. I asked how do we make someone's life measurably better in ninety days. When I built the AI coaching engine, I did not ask how do we increase session length. I asked how do we make the AI say something so true about the user that they cannot ignore it.

These are harder problems. The feedback loops are longer. The metrics are messier. But the products that come out the other end are ones people build their mornings around. That is the difference between utility and transformation.

I am not anti metrics. I track everything. But I track outcomes, not just activity. Did the user's health score improve? Did their income grow? Did they report stronger relationships? Did they feel better at the end of ninety days than the beginning?

Build for the human. The metrics follow.`,
    featured: false,
  },
  {
    id: 4,
    category: "AI and Tools",
    readTime: "5 min",
    title: "Vibe Coding: The Future of AI Assisted Development",
    excerpt: "Eighteen months ago, building an app meant hiring a development team, writing detailed specs, managing sprints, reviewing pull requests. That world is over.",
    fullContent: `Eighteen months ago, building an app meant hiring a development team, writing detailed specs, managing sprints, reviewing pull requests. The barrier to entry for non technical founders was enormous.

That world is over.

Vibe coding has collapsed the gap between idea and product. I have watched founders with zero coding experience ship functional web apps in seventy two hours. I have done it myself, multiple times.

Here is how the workflow actually looks:

You describe what you want to build in plain English. Not technical specs. Just the vision. The AI generates the initial architecture. You review it, react to it, refine it through conversation. When something breaks, you describe the problem. The AI fixes it. You iterate until it works.

Tools like Cursor, Claude Code, and v0 by Vercel have made this the standard workflow for early stage product development. The developers I work with now use AI to write eighty percent of the code. Their job has shifted from writing syntax to making architectural decisions and quality checking AI output.

For founders, this changes everything. You no longer need to translate your vision through layers of technical intermediaries. You can validate ideas at a fraction of the cost. You can ship a working MVP in weeks instead of months.

This is why I built CodeVibe. Not to teach people to code in the traditional sense, but to teach them to build. The skill is not learning Python or JavaScript. The skill is learning how to think in systems, communicate with AI precisely, and iterate fast.

The builders who master vibe coding in the next two years will have an enormous advantage over those who are still waiting for the right technical co founder.

Start building now. The tools are ready.`,
    featured: false,
  },
  {
    id: 5,
    category: "Strategy",
    readTime: "9 min",
    title: "Why Personal Branding Is Your Most Valuable Asset",
    excerpt: "Your personal brand is the only business asset that cannot be copied, commoditized, or acquired. Products can be replicated. Services can be undercut.",
    fullContent: `Your personal brand is the only business asset that cannot be copied, commoditized, or acquired.

Products can be replicated. Services can be undercut. Technology becomes obsolete. But the specific combination of your story, your expertise, your perspective, and the trust you have earned is permanently yours.

I have watched founders pour everything into their companies and nothing into themselves. Then the company pivots, gets acquired, or fails, and they are left starting from scratch. No audience, no reputation, no platform. The brand equity all lived in the business name.

I took the opposite approach. I built Jotham Hall as the primary brand. Success Upgrade is the platform. Every venture I build sits underneath the personal brand umbrella. This means if any one venture changes direction, the audience travels with me.

Here is the personal branding framework that actually works:

Own one idea. You cannot be the expert in everything. Pick the intersection that only you can own. For me it is AI powered human evolution. That specific combination of tech, personal development, and health optimization is my territory. Find yours.

Document, do not perform. The biggest mistake people make with personal branding is trying to appear successful instead of sharing the process of building. Document your actual journey. The failures, the pivots, the insights. Authenticity at scale is rarer than expertise.

Consistency over virality. One piece of content that reaches a million people is less valuable than showing up every day for three years to an audience of ten thousand who trust you completely.

Cross pollinate your platforms. Instagram is discovery. Your website is depth. Email is intimacy. YouTube is authority. Use each platform for what it does best and build bridges between them.

Be the reference point. The goal is not to be known. The goal is to be the person people think of when they encounter your category.

Your personal brand is a long game. Most people quit before the compounding kicks in. Do not be most people.`,
    featured: false,
  },
  {
    id: 6,
    category: "Philosophy",
    readTime: "12 min",
    title: "The Founder OS: Operating System Thinking Applied to Your Life",
    excerpt: "Every computer runs on an operating system. The OS manages resources, schedules tasks, handles inputs and outputs. Your life needs the same thing.",
    fullContent: `Every computer runs on an operating system. The OS manages resources, schedules tasks, handles inputs and outputs, and ensures that applications run efficiently without conflicting with each other.

Your life needs the same thing.

Most people run their lives like a computer without an OS. Applications open randomly, resources allocated based on what screamed loudest that morning, no coherent system managing the whole thing. The result is exactly what you would expect: crashes, slowdowns, lost data, and a constant sense that you are behind.

A Founder OS is a personal operating system. A set of principles, routines, and decision frameworks that run quietly in the background of your life, ensuring that your highest priorities always get your best resources.

Here is how I built mine:

Core values as kernel. The kernel is the deepest layer of an operating system. Your core values serve the same function. Mine are clarity, evolution, integrity, and craft. Every major decision I make runs through these four filters. If an opportunity compromises any of them, it is rejected at the kernel level.

Morning routine as boot sequence. Your computer's boot sequence initializes core systems before any applications can run. Your morning routine does the same. Movement, hydration, focused review of priorities, and one creative task before any communication.

Deep work as processing power. CPU time is finite. So is your cognitive bandwidth. I schedule my highest leverage work during the first ninety minutes after boot. Everything else fits around that protected window.

Weekly review as defragmentation. Every Sunday: review the week, close open loops, reprioritize projects, check life scores. Thirty minutes of defragmentation prevents months of fragmented execution.

Annual architecture as system updates. Zoom out. Evaluate which life applications are worth keeping, which need upgrading, and which should be uninstalled entirely.

The Founder OS is not about being robotic. It is about designing the conditions under which your best self can operate consistently.

Build your OS deliberately, or live by default. Those are the only two options.`,
    featured: false,
  },
  {
    id: 7,
    category: "Ecosystem",
    readTime: "6 min",
    title: "Running Multiple Ventures Without Burnout",
    excerpt: "I currently operate six active ventures. Digital agency. Life OS platform. Fintech company. Film production. Health brand. Content brand.",
    fullContent: `I currently operate six active ventures. Digital agency. Life OS platform. Fintech company. Film production. Health brand. Content brand. People always ask the same question: how do you manage all of it without burning out?

The honest answer is that I spent two years figuring out what not to do.

I tried to be operationally involved in everything. I tried to personally manage every client relationship, every product decision, every content calendar. I hit walls I did not see coming. Not dramatic burnout. The slow, grinding kind where you are technically functioning but creatively empty.

Three things changed everything:

Venture level clarity. Each venture has one clear objective for the current quarter and one metric that determines success. Nothing else matters until that metric moves. This sounds obvious. Almost no one does it. The temptation to optimize everything simultaneously is the exact path to optimizing nothing.

The twenty percent rule. I give twenty percent of my time to strategy and vision across all ventures. The other eighty percent is protected for deep work on the one or two ventures currently in active build phase. Spreading eighty percent across six ventures produces six mediocre outcomes. Concentrating it produces one breakthrough that raises the floor for everything else.

People who own outcomes, not just tasks. The shift from managing tasks to assigning ownership changed my capacity more than any productivity system. Jackson owns the agency operations. The developer team owns the CodeVibe build. My AI agents own first pass content. My job is vision, capital allocation, and removing obstacles. Not execution.

The ventures that are running in maintenance mode still generate revenue, still serve clients, still grow. Just without my daily attention. The ventures in active build mode get everything I have.

Running multiple ventures is not a bandwidth problem. It is a system design problem. Design the system correctly and the bandwidth expands to meet the vision.`,
    featured: false,
  },
  {
    id: 8,
    category: "Strategy",
    readTime: "7 min",
    title: "The Art Basel Effect: Building Relationships That Compound",
    excerpt: "I met Jimmy at Art Basel. A chance introduction at an event I almost did not attend. He is now one of my highest priority relationships.",
    fullContent: `I met Jimmy at Art Basel. A chance introduction at an event I almost did not attend because I was tired and had an early flight the next morning.

He is now one of my highest priority relationships. A CEO whose network, thinking, and vision align exactly with where I am headed. One conversation at Art Basel opened doors that would have taken years of cold outreach to approach.

This is the Art Basel Effect: the right room at the right moment can compress years of relationship building into a single evening. But you have to be in the room, you have to be prepared, and you have to know how to make the most of the moment when it arrives.

Here is what I have learned about building relationships that actually compound:

Quality over volume. Most networking advice is wrong. You do not need a thousand connections. You need twenty people who would take your call on a Sunday and mean it when they offer to help. I would rather have twenty people like that in my network than two thousand LinkedIn connections who do not remember my last name.

Bring value before you need it. The worst networkers lead with what they want. The best ones lead with what they can give. When I met Jimmy, I was not pitching him. I was asking about his vision, sharing what I was building, and looking for genuine overlap.

Follow through immediately. The first twenty four hours after meeting someone important are the most critical. I send a real message that references something specific from the conversation. This alone puts me in a different category from ninety percent of the people they met that week.

Stay in their orbit consistently. Relationships decay without maintenance. I have a simple system: every high priority contact gets a touchpoint at least once a month. A relevant article. A resource. A quick check in. Nothing transactional. Just presence.

Elevate the events you attend. Not every room is worth being in. I have become selective about which events justify my time. One Art Basel is worth ten generic networking dinners.

The most valuable assets I own are not software platforms or brand names. They are relationships with people who are building the future from a similar vantage point.

Invest in those relationships like they are your most important portfolio. Because they are.`,
    featured: false,
  },
];

export function InsightsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (expandedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expandedId]);

  const expandedPost = insights.find((post) => post.id === expandedId);

  return (
    <>
      <section
        id="insights"
        ref={sectionRef}
        className="relative py-20 lg:py-24 border-t border-foreground/10"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Compact Header */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-10 text-center lg:text-left">
            <div>
              <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-xs font-mono text-muted-foreground mb-3">
                                From the Founder
              </span>
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-display tracking-tight transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Insights
              </h2>
            </div>
          </div>

          {/* Compact 4x2 Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10">
            {insights.map((post, index) => (
              <button
                key={post.id}
                onClick={() => setExpandedId(post.id)}
                className={`group relative text-left bg-background p-4 lg:p-5 hover:bg-foreground/[0.03] transition-all duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${50 + index * 30}ms` }}
              >
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-sm lg:text-base font-display tracking-tight mt-2 mb-2 group-hover:text-muted-foreground transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Read
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for full article */}
      {expandedPost && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/95 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setExpandedId(null);
          }}
        >
          <div className="relative w-full max-w-3xl mx-4 my-8 sm:my-16 bg-background border border-foreground/10">
            {/* Close button */}
            <button
              onClick={() => setExpandedId(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article content */}
            <article className="p-8 sm:p-12 lg:p-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {expandedPost.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-foreground/20" />
                <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {expandedPost.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8 leading-tight">
                {expandedPost.title}
              </h1>

              <div className="space-y-6">
                {expandedPost.fullContent.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-foreground/10">
                <button
                  onClick={() => setExpandedId(null)}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to Insights
                </button>
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
}
