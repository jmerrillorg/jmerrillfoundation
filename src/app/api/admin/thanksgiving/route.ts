import { NextRequest, NextResponse } from 'next/server'
import { thanksgivingReviewerAccess } from '@/lib/thanksgivingRosterAuth'
import { mealStore } from '@/lib/mealStore'
import { validateLedger } from '@/lib/mealReservation'
import { thanksgiving } from '@/lib/thanksgiving'
import { rosterSnapshot } from '@/lib/thanksgivingRoster'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store, max-age=0', 'X-Robots-Tag': 'noindex, nofollow', 'Pragma': 'no-cache' }

export async function GET(request: NextRequest) {
  if (process.env.THANKSGIVING_ROSTER_ENABLED !== 'true') return NextResponse.json({ state: 'unavailable' }, { status: 503, headers })
  const access = await thanksgivingReviewerAccess(request.headers.get('x-ms-token-aad-id-token'))
  if (access !== 'authorized') return NextResponse.json({ state: access }, { status: access === 'unavailable' ? 503 : 403, headers })
  try {
    const { ledger } = await mealStore().read()
    validateLedger(ledger, thanksgiving.event, thanksgiving.capacity)
    return NextResponse.json(rosterSnapshot(ledger, new Date().toISOString()), { headers })
  } catch {
    return NextResponse.json({ state: 'unavailable' }, { status: 503, headers })
  }
}
