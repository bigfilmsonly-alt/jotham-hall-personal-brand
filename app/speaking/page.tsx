import type { Metadata } from 'next'
import { SpeakingPage } from './speaking-page'

// The root layout's title template appends "| Jotham Hall", so the title here
// stays bare. Open Graph and Twitter titles are not templated, so they carry it.
const title = 'Speaking Engagements'
const description =
  'Book Jotham Hall, a TV producer of 15 years turned AI systems architect, for keynotes, workshops, and podcasts. Based in Miami Beach, available worldwide.'
const headshot = { url: '/jotham-hall.jpg', width: 1024, height: 1024, alt: 'Jotham Hall' }

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Jotham Hall speaker',
    'AI keynote speaker',
    'AI workshop',
    'vibe coding speaker',
    'entrepreneurship speaker',
    'Miami Beach speaker',
    'podcast guest',
  ],
  openGraph: {
    title: `${title} | Jotham Hall`,
    description,
    type: 'website',
    url: 'https://jothamhall.com/speaking',
    siteName: 'Jotham Hall',
    images: [headshot],
  },
  twitter: {
    card: 'summary',
    site: '@successupgrade_',
    creator: '@successupgrade_',
    title: `${title} | Jotham Hall`,
    description,
    images: [headshot.url],
  },
  alternates: {
    canonical: 'https://jothamhall.com/speaking',
  },
}

// Same @id as the Person in components/structured-data.tsx, so search engines
// read this as more about that one person. Only verified facts: no engagement
// history, audience sizes or reviews are claimed.
const speakerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://jothamhall.com/#person',
  name: 'Jotham Hall',
  url: 'https://jothamhall.com',
  image: 'https://jothamhall.com/jotham-hall.jpg',
  jobTitle: ['AI Systems Architect', 'Television Producer'],
  description:
    'Television producer with 50+ TV credits over 15 years, now an AI systems architect. Available for keynotes, workshops, fireside chats, and podcast interviews. Based in Miami Beach, Florida.',
  homeLocation: { '@type': 'Place', name: 'Miami Beach, Florida' },
  knowsAbout: [
    'AI Automation',
    'AI Agents',
    'Vibe Coding',
    'Business Systems',
    'Personal Branding',
    'Television Production',
  ],
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Speaking engagements',
      serviceType: 'Keynotes, workshops, fireside chats, and podcast interviews',
      areaServed: 'Worldwide',
    },
  },
  sameAs: [
    'https://www.linkedin.com/in/jotham-hall-b6b9491b2',
    'https://www.instagram.com/successupgrade_',
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakerSchema).replace(/</g, '\\u003c') }}
      />
      <SpeakingPage />
    </>
  )
}
