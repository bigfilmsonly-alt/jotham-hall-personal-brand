"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/landing/contact-modal";
import Link from "next/link";

interface Insight {
  id: number;
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  fullContent: string;
  featured: boolean;
  publishedAt: string;
  keywords: string[];
}

interface Props {
  insight: Insight;
}

export function InsightContent({ insight }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const paragraphs = insight.fullContent.split("\n\n");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": insight.title,
    "description": insight.excerpt,
    "image": "https://jothamhall.com/og-image.jpg",
    "author": {
      "@type": "Person",
      "name": "Jotham Hall",
      "url": "https://jothamhall.com",
      "jobTitle": "Entrepreneur & AI Strategist"
    },
    "publisher": {
      "@type": "Person",
      "name": "Jotham Hall",
      "url": "https://jothamhall.com"
    },
    "datePublished": insight.publishedAt,
    "dateModified": insight.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://jothamhall.com/insights/${insight.slug}`
    },
    "keywords": insight.keywords.join(", "),
    "articleSection": insight.category
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link href="/insights" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
          <Button onClick={() => setIsContactOpen(true)} className="rounded-full">
            Work With Me
          </Button>
        </div>
      </nav>

      {/* Article Header */}
      <article className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Meta */}
          <div className={`flex flex-wrap items-center justify-center gap-4 mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {insight.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
              <Clock className="w-3 h-3" />
              {insight.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span className="text-xs font-mono text-muted-foreground">
              {new Date(insight.publishedAt).toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight text-center mb-8 leading-tight transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {insight.title}
          </h1>

          {/* Author */}
          <div className={`flex items-center justify-center gap-4 mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
              <span className="text-lg font-display">JH</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Jotham Hall</div>
              <div className="text-sm text-muted-foreground">Strategic Consultant & Systems Architect</div>
            </div>
          </div>

          {/* Content */}
          <div className={`prose prose-lg max-w-none transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-foreground/80 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <div className="flex flex-wrap justify-center gap-2">
              {insight.keywords.map((keyword) => (
                <span key={keyword} className="px-3 py-1 bg-foreground/5 text-sm text-muted-foreground rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto px-6 lg:px-12 mt-20">
          <div className="p-8 lg:p-12 bg-foreground text-background text-center">
            <h2 className="text-2xl lg:text-3xl font-display mb-4">
              Ready to build systems that scale?
            </h2>
            <p className="text-background/70 mb-8 max-w-md mx-auto">
              Let us turn these insights into action for your business.
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsContactOpen(true)} 
              variant="outline" 
              className="rounded-full px-8 h-14 text-base border-background/20 text-background hover:bg-background/10 group"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </article>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
