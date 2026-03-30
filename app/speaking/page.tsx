import type { Metadata } from 'next'
import { SpeakingPage } from './speaking-page'

export const metadata: Metadata = {
  title: 'Speaking Engagements | Jotham Hall',
  description: 'Book Jotham Hall for keynotes, workshops, and speaking engagements on AI automation, entrepreneurship, business systems, and creative technology. Based in Miami Beach.',
  keywords: ['Jotham Hall speaker', 'AI keynote speaker', 'entrepreneurship speaker', 'Miami Beach speaker', 'business automation speaker', 'tech speaker'],
  openGraph: {
    title: 'Speaking Engagements | Jotham Hall',
    description: 'Book Jotham Hall for keynotes and workshops on AI, automation, and entrepreneurship.',
    type: 'website',
    url: 'https://jothamhall.com/speaking',
  },
  alternates: {
    canonical: 'https://jothamhall.com/speaking',
  },
}

export default function Page() {
  return <SpeakingPage />
}
