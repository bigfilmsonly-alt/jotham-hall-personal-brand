import type { Metadata } from 'next'
import { TelevisionCredits } from './television-credits'

export const metadata: Metadata = {
  title: 'Television Credits | Jotham Hall - Television Producer',
  description: 'Jotham Hall\'s television production credits including Finding Mr. Christmas (Hallmark), Ciao House (Food Network), Temptation Island (USA Network), Snake in the Grass (NBC), After Happily Ever After (BET), and over 50 reality TV shows.',
  keywords: ['Jotham Hall TV', 'Jotham Hall television', 'Jotham Hall producer', 'Finding Mr Christmas', 'Ciao House', 'Temptation Island', 'Snake in the Grass', 'After Happily Ever After', 'reality TV producer'],
  openGraph: {
    title: 'Television Credits | Jotham Hall',
    description: 'Jotham Hall\'s television production credits spanning over 50 reality TV shows on networks including Hallmark, Food Network, USA Network, NBC, BET, MTV, and VH1.',
    url: 'https://jothamhall.com/television',
  },
}

export default function TelevisionPage() {
  return <TelevisionCredits />
}
