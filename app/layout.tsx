import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StructuredData } from '@/components/structured-data'
import { MobileTabBar } from '@/components/landing/mobile-tab-bar'
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
    default: 'Jotham Hall | Entrepreneur, TV Producer & Founder of SuccessUpgrade.ai',
    template: '%s | Jotham Hall'
  },
  description: 'Jotham Hall is an entrepreneur, television producer, and technology founder. Founder of SuccessUpgrade.ai and Big Films Only. TV credits include Finding Mr. Christmas, Ciao House, Temptation Island, and more.',
  generator: 'v0.app',
  keywords: ['Jotham Hall', 'Who is Jotham Hall', 'Jotham Hall entrepreneur', 'Jotham Hall television producer', 'Jotham Hall TV producer', 'Jotham Hall Miami', 'Jotham Hall Miami Beach', 'Jotham Hall Success Upgrade', 'Jotham Hall founder', 'SuccessUpgrade.ai', 'Big Films Only', 'Finding Mr Christmas', 'Ciao House', 'Temptation Island', 'Snake in the Grass', 'After Happily Ever After', 'reality TV producer', 'talent producer'],
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
    title: 'Jotham Hall - Entrepreneur, Television Producer, Founder of SuccessUpgrade.ai',
    description: 'Jotham Hall is an entrepreneur, television producer, and technology founder known for reality TV production (50+ shows) and AI systems for business automation. Founder of SuccessUpgrade.ai and Big Films Only.',
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
        alt: 'Jotham Hall - Entrepreneur, AI Strategist & Founder of Success Upgrade',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@successupgrade_',
    creator: '@successupgrade_',
    title: 'Jotham Hall - Entrepreneur, Television Producer, Founder',
    description: 'Television producer with 50+ reality TV credits. Founder of SuccessUpgrade.ai and Big Films Only. Based in Miami Beach.',
    images: {
      url: '/og-image.jpg',
      alt: 'Jotham Hall - Entrepreneur, AI Strategist & Founder of Success Upgrade',
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
      </head>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <MobileTabBar />
        <Analytics />
      </body>
    </html>
  )
}
