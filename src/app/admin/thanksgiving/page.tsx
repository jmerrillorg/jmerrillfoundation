import type { Metadata } from 'next'
import Roster from './Roster'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Thanksgiving reservations', robots: { index: false, follow: false } }

export default function ThanksgivingRosterPage() {
  return <><div className="roster-nav-band" aria-hidden="true" /><Roster /></>
}
