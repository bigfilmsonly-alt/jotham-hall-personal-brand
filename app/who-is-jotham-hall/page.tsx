import type { Metadata } from 'next'
import { WhoIsJothamHall } from './who-is-jotham-hall'

export const metadata: Metadata = {
  title: 'Who is Jotham Hall? | Entrepreneur, AI Strategist & Creative Technologist',
  description: 'Jotham Hall is an entrepreneur, AI strategist, and creative technologist based in Miami Beach. Founder of Success Upgrade, Big Films Only, and Say It Build It. Learn about his journey, projects, and mission.',
  keywords: ['Who is Jotham Hall', 'Jotham Hall biography', 'Jotham Hall entrepreneur', 'Jotham Hall AI strategist', 'Jotham Hall Miami Beach', 'Jotham Hall Success Upgrade', 'Jotham Hall founder'],
  alternates: {
    canonical: 'https://jothamhall.com/who-is-jotham-hall',
  },
  openGraph: {
    title: 'Who is Jotham Hall?',
    description: 'Entrepreneur, AI Strategist, and Creative Technologist based in Miami Beach.',
    url: 'https://jothamhall.com/who-is-jotham-hall',
    type: 'profile',
  },
}

export default function Page() {
  return <WhoIsJothamHall />
}
