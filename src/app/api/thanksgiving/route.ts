import { NextRequest, NextResponse } from 'next/server'
import { parseSubmission, reserve, validateLedger, ReservationError } from '@/lib/mealReservation'
import { mealStore } from '@/lib/mealStore'
import { thanksgiving as event } from '@/lib/thanksgiving'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const reply = (status: number, body: object) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
export async function GET() {
  if (process.env.THANKSGIVING_REGISTRATION_ENABLED !== 'true') return reply(503, { state: 'unavailable' })
  try {
    const { ledger } = await mealStore().read()
    validateLedger(ledger, event.event, event.capacity)
    return reply(200, { state: ledger.reservations.length >= event.capacity ? 'full' : 'open' })
  } catch { return reply(503, { state: 'unavailable' }) }
}
export async function POST(request: NextRequest) {
  if (process.env.THANKSGIVING_REGISTRATION_ENABLED !== 'true') return reply(503, { error: 'UNAVAILABLE' })
  if (!['https://jmerrill.foundation', 'https://www.jmerrill.foundation'].includes(request.headers.get('origin') || '')) return reply(403, { error: 'INVALID' })
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, { error: 'INVALID' })
  try {
    const raw = await request.text()
    if (raw.length > 4096) return reply(413, { error: 'INVALID' })
    const result = await reserve(mealStore(), parseSubmission(JSON.parse(raw)), event.event, event.capacity)
    return reply(200, { success: true, reference: result.reference })
  } catch (error) {
    const code = error instanceof ReservationError ? error.message : error instanceof SyntaxError ? 'INVALID' : 'UNAVAILABLE'
    const status = code === 'INVALID' ? 400 : ['FULL', 'DUPLICATE', 'CONFLICT'].includes(code) ? 409 : 503
    return reply(status, { error: code })
  }
}
