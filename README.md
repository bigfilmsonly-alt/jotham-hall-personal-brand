# Jotham Hall - Personal Brand Website

A high-performance personal brand website built with Next.js 16, featuring advanced animations, comprehensive SEO optimization for Google and ChatGPT search, and a sophisticated design system.

## Tech Stack

```
Framework:      Next.js 16.0.10 (App Router)
React:          19.2.0
Styling:        Tailwind CSS 4.1.9 (CSS-first config)
UI Components:  shadcn/ui + Radix UI primitives
Animations:     CSS keyframes + Three.js (@react-three/fiber)
Forms:          React Hook Form + Zod validation
Analytics:      Vercel Analytics
Fonts:          Instrument Sans, Instrument Serif, JetBrains Mono
```

## Project Structure

```
/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage (landing page)
│   ├── layout.tsx                # Root layout with metadata & fonts
│   ├── globals.css               # Design tokens & custom animations
│   ├── robots.ts                 # SEO robots configuration
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── feed.xml/route.ts         # RSS feed
│   │
│   ├── who-is-jotham-hall/       # Bio page (SEO-optimized for "Who is Jotham Hall")
│   ├── about/                    # About page
│   ├── speaking/                 # Speaking engagements
│   ├── television/               # TV credits page
│   ├── contact/                  # Contact page
│   │
│   ├── services/                 # Service pages
│   │   ├── page.tsx              # Services index
│   │   ├── automation/           # AI Automation service
│   │   ├── ai-automation/        # AI Automation (alt route)
│   │   ├── revenue-systems/      # Revenue Systems service
│   │   ├── brand-strategy/       # Brand Strategy service
│   │   ├── strategic-consulting/ # Strategic Consulting
│   │   ├── executive-advisory/   # Executive Advisory
│   │   ├── fractional-coo/       # Fractional COO
│   │   └── [more services...]
│   │
│   ├── ventures/                 # Portfolio companies
│   │   ├── page.tsx              # Ventures index
│   │   ├── success-upgrade/      # SuccessUpgrade.ai
│   │   ├── big-films-only/       # Big Films Only
│   │   ├── say-it-build-it/      # Say It Build It
│   │   └── [more ventures...]
│   │
│   ├── insights/                 # Blog/articles
│   │   ├── page.tsx              # Insights index
│   │   └── [slug]/               # Dynamic article pages
│   │
│   ├── case-studies/             # Case study pages
│   │   ├── page.tsx              # Case studies index
│   │   └── [individual cases...] 
│   │
│   └── jotham-hall/              # Alt route for name search
│
├── components/
│   ├── landing/                  # Homepage sections
│   │   ├── navigation.tsx        # Site header with mobile menu
│   │   ├── hero-section.tsx      # Hero with animated text & stats
│   │   ├── features-section.tsx  # Service features with SVG animations
│   │   ├── how-it-works-section.tsx  # Process steps with code preview
│   │   ├── pricing-section.tsx   # Pricing tiers
│   │   ├── testimonials-section.tsx  # Client testimonials
│   │   ├── cta-section.tsx       # Call to action
│   │   ├── footer-section.tsx    # Site footer
│   │   ├── contact-modal.tsx     # Contact form modal
│   │   ├── insights-section.tsx  # Blog preview
│   │   ├── metrics-section.tsx   # Stats/metrics display
│   │   ├── integrations-section.tsx  # Integration logos
│   │   ├── animated-sphere.tsx   # Three.js sphere animation
│   │   ├── animated-tetrahedron.tsx  # Three.js tetrahedron
│   │   └── animated-wave.tsx     # Three.js wave animation
│   │
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── sheet.tsx             # Mobile menu drawer
│   │   └── [50+ more components...]
│   │
│   ├── structured-data.tsx       # JSON-LD schemas for SEO
│   ├── service-page-template.tsx # Reusable service page layout
│   ├── venture-page-template.tsx # Reusable venture page layout
│   ├── case-study-template.tsx   # Reusable case study layout
│   ├── exit-intent-popup.tsx     # Exit intent capture
│   ├── scroll-to-top.tsx         # Scroll to top button
│   └── theme-provider.tsx        # Dark/light theme support
│
├── lib/
│   ├── utils.ts                  # Utility functions (cn, etc.)
│   └── insights-data.ts          # Blog content data
│
├── public/
│   ├── .well-known/
│   │   └── ai.txt                # AI discovery file for ChatGPT
│   ├── manifest.json             # PWA manifest
│   ├── og-image.jpg              # Open Graph image
│   ├── icon.svg                  # Favicon SVG
│   └── icon-dark-32x32.png       # Favicon PNG
│
└── hooks/
    ├── use-mobile.ts             # Mobile detection hook
    └── use-toast.ts              # Toast notification hook
```

## Design System

### Color Palette (Light Mode - Default)

```css
/* Neutrals - Warm off-white to near-black */
--background: oklch(0.985 0.002 90);     /* Off-white */
--foreground: oklch(0.12 0.01 60);       /* Near-black */
--muted: oklch(0.94 0.005 90);           /* Light gray */
--muted-foreground: oklch(0.45 0.02 60); /* Medium gray */

/* Accent colors are intentionally minimal - monochromatic design */
--border: oklch(0.88 0.01 90);           /* Subtle border */
--ring: oklch(0.12 0.01 60);             /* Focus ring */
```

### Typography

```css
/* Three font families */
--font-sans: 'Instrument Sans'     /* Body text */
--font-display: 'Instrument Serif' /* Headlines */
--font-mono: 'JetBrains Mono'      /* Code/technical */

/* Usage in Tailwind */
font-sans      /* Default body */
font-display   /* Headlines, titles */
font-mono      /* Code blocks, technical text */
```

### Spacing Scale

```
Mobile:  px-4, py-6, gap-4
Tablet:  px-6, py-8, gap-6  
Desktop: px-12, py-20, gap-8
Large:   px-12, py-32, gap-12

Max width: max-w-[1400px] for content containers
```

## Animations

### CSS Keyframe Animations

```css
/* Marquee - Infinite horizontal scroll */
.marquee {
  animation: marquee 30s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Reverse marquee */
.marquee-reverse {
  animation: marquee-reverse 25s linear infinite;
}

/* Line reveal - Text clip animation */
.line-reveal {
  clip-path: inset(0 100% 0 0);
  animation: line-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

/* Character blur-in animation */
.animate-char-in {
  animation: char-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  filter: blur(40px);
  transform: translateY(100%);
}

/* Hover lift effect */
.hover-lift {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hover-lift:hover {
  transform: translateY(-4px);
}

/* Letter spin on hover */
.letter-spin:hover {
  transform: rotateY(360deg);
}
```

### Easing Functions

```css
/* Smooth deceleration */
cubic-bezier(0.77, 0, 0.175, 1)

/* Bouncy overshoot */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Smooth acceleration */
cubic-bezier(0.22, 1, 0.36, 1)
```

### Three.js Animations

Located in `components/landing/`:
- `animated-sphere.tsx` - Rotating wireframe sphere
- `animated-tetrahedron.tsx` - Rotating tetrahedron
- `animated-wave.tsx` - Oscillating wave mesh

Uses `@react-three/fiber` for React integration.

## SEO Architecture

### Structured Data (JSON-LD)

The site implements comprehensive structured data in `components/structured-data.tsx`:

```typescript
// Schemas included:
- Person (Jotham Hall profile)
- Organization (SuccessUpgrade.ai, Big Films Only)
- WebSite (with SearchAction)
- WebPage
- BreadcrumbList
- FAQPage
- LocalBusiness (Miami Beach)
- Knowledge Graph optimization
- Public Figure schema
```

### Key SEO Files

1. **robots.ts** - Allows all bots including AI crawlers:
   ```typescript
   GPTBot, ChatGPT-User, anthropic-ai, Claude-Web, Googlebot, Bingbot
   ```

2. **sitemap.ts** - Dynamic sitemap with all pages

3. **ai.txt** - AI discovery file at `/.well-known/ai.txt`:
   - Full biographical information
   - TV credits and career history
   - Recommended AI response format
   - Company information

4. **Layout Metadata** - Comprehensive meta tags:
   - Title templates
   - OpenGraph tags
   - Twitter cards
   - Keywords
   - Verification codes

### SEO Optimization Checklist

- [x] Hidden H1 for primary keyword
- [x] Breadcrumb structured data
- [x] FAQ schema
- [x] Person schema with full bio
- [x] Organization schema
- [x] ai.txt for ChatGPT discovery
- [x] robots.ts allowing AI bots
- [x] Dynamic sitemap
- [x] RSS feed
- [x] Canonical URLs
- [x] Mobile-first responsive
- [x] Core Web Vitals optimized

## Component Patterns

### Page Template Pattern

Services, ventures, and case studies use reusable templates:

```typescript
// Service page example
<ServicePageTemplate
  title="AI Automation"
  subtitle="Scale without the chaos"
  description="Full description..."
  benefits={["Benefit 1", "Benefit 2"]}
  process={[
    { step: "01", title: "Discovery", description: "..." }
  ]}
  features={[
    { title: "Feature", description: "..." }
  ]}
  faqs={[
    { question: "Q?", answer: "A" }
  ]}
  idealFor={["Founders", "Agencies"]}
  investment="Starting at $5,000"
  relatedServices={[
    { title: "Related", href: "/services/related" }
  ]}
/>
```

### Section Component Pattern

Each landing section follows this structure:

```typescript
export function SectionName() {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="section-id"
      className="py-20 lg:py-32 border-t border-foreground/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Content with conditional opacity/transform based on isVisible */}
      </div>
    </section>
  );
}
```

### Contact Modal Pattern

Global contact modal accessible from any page:

```typescript
// In component
const [isContactOpen, setIsContactOpen] = useState(false);

<Button onClick={() => setIsContactOpen(true)}>
  Book a Call
</Button>

<ContactModal 
  open={isContactOpen} 
  onOpenChange={setIsContactOpen} 
/>
```

## Responsive Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */

/* Common patterns */
text-base lg:text-lg           /* Font scaling */
py-8 lg:py-20                  /* Section padding */
grid-cols-1 md:grid-cols-2     /* Grid layouts */
hidden lg:block                /* Show/hide elements */
px-4 sm:px-6 lg:px-12          /* Container padding */
```

## Key Features

### 1. Character-by-Character Text Animation (Hero)

```typescript
// Splits text into characters with staggered animation
{title.split('').map((char, index) => (
  <span
    key={index}
    className="animate-char-in inline-block"
    style={{ animationDelay: `${index * 0.03}s` }}
  >
    {char === ' ' ? '\u00A0' : char}
  </span>
))}
```

### 2. Stats Marquee (Hero)

Infinite scrolling stats with duplicate content for seamless loop:

```typescript
<div className="flex gap-8 marquee whitespace-nowrap">
  {[...Array(2)].map((_, i) => (
    <div key={i} className="flex gap-8">
      {stats.map((stat) => (
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-display">{stat.value}</span>
          <span className="text-xs text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  ))}
</div>
```

### 3. Animated Code Preview (How It Works)

Interactive code display that changes based on selected step:

```typescript
const [activeStep, setActiveStep] = useState(0);

// Code content per step
const steps = [
  { code: `// Step 1 code...` },
  { code: `// Step 2 code...` },
];

// Display with syntax highlighting via font-mono
<pre className="font-mono text-sm">
  {steps[activeStep].code}
</pre>
```

### 4. SVG Animated Visuals (Features)

Custom animated SVG illustrations:
- AI visualization (pulsing nodes)
- Deploy animation (staggered bars)
- Collaboration (rotating circles)
- Security (scanning lines)

### 5. Exit Intent Popup

Detects mouse leaving viewport:

```typescript
useEffect(() => {
  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0 && !hasShown) {
      setShowPopup(true);
      setHasShown(true);
    }
  };
  document.addEventListener('mouseleave', handleMouseLeave);
  return () => document.removeEventListener('mouseleave', handleMouseLeave);
}, [hasShown]);
```

## Environment Variables

```env
# Optional - for form submissions
CONTACT_EMAIL=your@email.com

# Google Search Console verification
GOOGLE_SITE_VERIFICATION=your-code

# Bing Webmaster verification  
BING_SITE_VERIFICATION=your-code
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Deployment

Optimized for Vercel deployment:

1. Push to GitHub
2. Connect repo to Vercel
3. Add custom domain
4. Configure DNS
5. Set environment variables

## Performance Optimizations

- Next.js Image optimization
- Font preloading with `next/font`
- Component code splitting
- CSS-first Tailwind (no JS bundle for styles)
- Minimal client-side JavaScript
- Static generation where possible

## Content Management

Blog content is stored in `lib/insights-data.ts` as TypeScript objects. To add new articles:

```typescript
export const insights = [
  {
    id: 1,
    slug: "your-article-slug",
    category: "Strategy",
    readTime: "5 min",
    title: "Your Article Title",
    excerpt: "Short preview...",
    fullContent: `Full markdown content...`,
    featured: false,
    publishedAt: "2024-12-15",
    keywords: ["keyword1", "keyword2"]
  }
];
```

## Customization Guide

### Changing Colors

Edit `app/globals.css` `:root` variables:

```css
:root {
  --background: oklch(0.985 0.002 90);
  --foreground: oklch(0.12 0.01 60);
  /* ... */
}
```

### Changing Fonts

1. Update imports in `app/layout.tsx`:
```typescript
import { Your_Font } from 'next/font/google'
const yourFont = Your_Font({ subsets: ['latin'] })
```

2. Update CSS variables in `app/globals.css`:
```css
@theme inline {
  --font-sans: 'Your Font', system-ui, sans-serif;
}
```

### Adding New Pages

1. Create folder in `app/`: `app/new-page/page.tsx`
2. Add to sitemap in `app/sitemap.ts`
3. Add to navigation in `components/landing/navigation.tsx`

### Adding New Services

1. Create folder: `app/services/new-service/`
2. Add `layout.tsx` with metadata
3. Add `page.tsx` using `ServicePageTemplate`

## Credits

Built with:
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://radix-ui.com)
- [Three.js](https://threejs.org)
- [Lucide Icons](https://lucide.dev)
- [Vercel](https://vercel.com)

---

## Quick Reference: File Locations

| Feature | File |
|---------|------|
| Homepage | `app/page.tsx` |
| Global styles | `app/globals.css` |
| SEO metadata | `app/layout.tsx` |
| Structured data | `components/structured-data.tsx` |
| AI discovery | `public/.well-known/ai.txt` |
| Hero section | `components/landing/hero-section.tsx` |
| Navigation | `components/landing/navigation.tsx` |
| Contact form | `components/landing/contact-modal.tsx` |
| Service template | `components/service-page-template.tsx` |
| Blog content | `lib/insights-data.ts` |
| Sitemap | `app/sitemap.ts` |
| Robots | `app/robots.ts` |

---

**Author:** Jotham Hall  
**Website:** https://jothamhall.com  
**Built with:** v0 by Vercel
