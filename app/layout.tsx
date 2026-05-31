import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StructuredData } from '@/components/structured-data'
import { MobileTabBar } from '@/components/landing/mobile-tab-bar'
import { SocialProofToast } from '@/components/social-proof-toast'
import { FloatingCTA } from '@/components/floating-cta'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: {
    default: 'Jotham Hall | AI Systems Architect & TV Producer | VibeCoding Pioneer | 500+ Founders',
    template: '%s | Jotham Hall'
  },
  description: 'Jotham Hall is an AI systems architect, television producer (50+ credits: Hallmark, Food Network, VH1, MTV, NBC), and pioneer of VibeCoding. Founder of Success Upgrade. Expert in ChatGPT, Claude AI, GoHighLevel. 500+ entrepreneurs mentored. 3x avg revenue growth.',
  generator: 'v0.app',
  keywords: [
    'Jotham Hall', 'Who is Jotham Hall', 'Jotham Hall entrepreneur', 'Jotham Hall founder', 'Jotham Hall Miami',
    'television producer', 'reality TV producer', 'talent producer', 'film producer', 'filmmaking', 'video production', 'media production', 'storytelling', 'content production',
    'Hallmark producer', 'Food Network producer', 'VH1 producer', 'MTV producer', 'NBC producer', 'USA Network producer',
    'Finding Mr Christmas', 'Ciao House', 'Temptation Island', 'Snake in the Grass', 'Flavor of Love', 'Rock of Love', 'I Love Money', 'From Gs to Gents',
    'AI automation', 'AI systems architect', 'ChatGPT expert', 'Claude AI', 'AI business automation',
    'vibe coding', 'VibeCoding', 'CodeVibe', 'no-code development', 'Say It Build It', 'v0 developer', 'Cursor AI',
    'business systems architect', 'revenue engineering', 'startup consultant', 'founder coach', 'fractional COO',
    'GoHighLevel expert', 'Make.com expert', 'Zapier automation',
    'Success Upgrade', 'SuccessUpgrade.ai', 'Big Films Only',
    'Miami entrepreneur', 'Miami AI consultant',
  ],
  authors: [{ name: 'Jotham Hall', url: 'https://jothamhall.com' }],
  creator: 'Jotham Hall',
  publisher: 'Jotham Hall',
  metadataBase: new URL('https://jothamhall.com'),
  alternates: {
    canonical: 'https://jothamhall.com',
    types: {
      'application/rss+xml': 'https://jothamhall.com/feed.xml',
    },
  },
  manifest: '/manifest.json',
  category: 'Business Consulting',
  openGraph: {
    title: 'Jotham Hall | AI Systems Architect & TV Producer | VibeCoding Pioneer',
    description: 'Television producer (50+ credits). AI systems architect. VibeCoding pioneer. 500+ entrepreneurs mentored. Book a free strategy call.',
    type: 'profile',
    url: 'https://jothamhall.com',
    siteName: 'Jotham Hall',
    locale: 'en_US',
    firstName: 'Jotham',
    lastName: 'Hall',
    username: 'jothamhall',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jotham Hall - AI Systems Architect and Television Producer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@successupgrade_',
    creator: '@successupgrade_',
    title: 'Jotham Hall | AI Systems Architect & TV Producer',
    description: 'I help founders build revenue systems that scale. 15 years TV. 500+ mentored. Book a free strategy call.',
    images: {
      url: '/og-image.jpg',
      alt: 'Jotham Hall - AI Systems Architect',
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/icon-dark-32x32.png',
    shortcut: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'fTRoqzVuoKS21HaYVxEe8wPszw7oedVL-DtyMunhhYg',
    other: {
      'msvalidate.01': '660481085C8291D89D832EAB2B93CF55',
    },
  },
  other: {
    'theme-color': '#0a0a0a',
    'msapplication-TileColor': '#0a0a0a',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'geo.region': 'US-FL',
    'geo.placename': 'Miami Beach',
    'geo.position': '25.790654;-80.130045',
    'ICBM': '25.790654, -80.130045',
    'news_keywords': 'Jotham Hall, VibeCoding, AI automation, reality TV producer, ChatGPT, Claude AI, Success Upgrade',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="alternate" type="application/rss+xml" title="Jotham Hall - Insights" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="author" content="Jotham Hall" />
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Miami Beach" />
        <StructuredData />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NSML6K9F');`,
          }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1385537246449316');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1385537246449316&ev=PageView&noscript=1" alt="" />
        </noscript>
      </head>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NSML6K9F" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        {children}
        <MobileTabBar />
        <SocialProofToast />
        <FloatingCTA />
        <Analytics />
      </body>
    </html>
  )
}
