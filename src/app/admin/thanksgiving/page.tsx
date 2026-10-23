import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { thanksgivingReviewerAccess } from '@/lib/thanksgivingRosterAuth'
import Roster from './Roster'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Thanksgiving reservations', robots: { index: false, follow: false } }

export default async function ThanksgivingRosterPage() {
  if (process.env.THANKSGIVING_ROSTER_ENABLED !== 'true') notFound()
  const token = (await headers()).get('x-ms-token-aad-id-token')
  if (!token) redirect('/.auth/login/aad?post_login_redirect_uri=%2Fadmin%2Fthanksgiving')
  if (await thanksgivingReviewerAccess(token) !== 'authorized') notFound()
  return <><div className="roster-nav-band" aria-hidden="true" /><Roster /></>
}
