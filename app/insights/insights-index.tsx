"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/landing/contact-modal";
import Link from "next/link";
import { insights } from "@/lib/insights-data";

export function InsightsIndex() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const featuredPost = insights.find(post => post.featured);
  const regularPosts = insights.filter(post => !post.featured);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Button onClick={() => setIsContactOpen(true)} className="rounded-full">
            Work With Me
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            From the Founder
          </span>
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Insights
          </h1>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Strategic thinking on AI, systems, and building businesses that scale without burning out.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-16 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <Link 
              href={`/insights/${featuredPost.slug}`}
              className={`group block p-8 lg:p-12 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-foreground text-background text-xs font-mono uppercase tracking-wider">
                  Featured
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {featuredPost.readTime}
                </span>
              </div>
              <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-4 group-hover:text-muted-foreground transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-2 text-sm text-foreground">
                Read article
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-xl font-display mb-8">All Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {regularPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className={`group bg-background p-6 lg:p-8 hover:bg-foreground/[0.02] transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: `${150 + index * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-foreground/20" />
                  <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-display tracking-tight mb-3 group-hover:text-muted-foreground transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm text-foreground group-hover:text-muted-foreground transition-colors">
                  Read
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
