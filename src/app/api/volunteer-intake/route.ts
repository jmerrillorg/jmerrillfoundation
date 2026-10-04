import { ManagedIdentityCredential } from '@azure/identity'
import { NextRequest, NextResponse } from 'next/server'
import { acceptVolunteerReceipt, isGuid, parseVolunteerSubmission, ReceiptError } from '@/lib/volunteerIntake'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const allowedOrigins = new Set(['https://jmerrill.foundation', 'https://www.jmerrill.foundation'])
const requests = new Map<string, { count: number; until: number }>()

function reply(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

function rateLimited(request: NextRequest): boolean {
  const now = Date.now()
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (requests.size > 10000) requests.clear()
  const state = requests.get(ip)
  if (!state || state.until <= now) {
    requests.set(ip, { count: 1, until: now + 60_000 })
    return false
  }
  state.count += 1
  return state.count > 10
}

export async function POST(request: NextRequest) {
  if (process.env.FOUNDATION_INTAKE_ENABLED !== 'true') return reply(503, { success: false, fallbackEmail: 'foundation@jmerrill.one' })
  if (!allowedOrigins.has(request.headers.get('origin') || '')) return reply(403, { success: false })
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, { success: false })
  if (rateLimited(request)) return reply(429, { success: false, fallbackEmail: 'foundation@jmerrill.one' })

  let body: unknown
  try {
    const raw = await request.text()
    if (raw.length > 4096) return reply(413, { success: false })
    body = JSON.parse(raw)
  } catch {
    return reply(400, { success: false })
  }
  const submission = parseVolunteerSubmission(body)
  if (!submission) return reply(400, { success: false, message: 'Please check the form and try again.' })

  const dataverseUrl = process.env.FOUNDATION_DATAVERSE_URL || ''
  const reviewTeamId = process.env.FOUNDATION_REVIEW_TEAM_ID || ''
  const privacyNoticeUrl = process.env.FOUNDATION_PRIVACY_NOTICE_URL || ''
  if (dataverseUrl !== 'https://jm1hq.crm.dynamics.com' || !isGuid(reviewTeamId) || !privacyNoticeUrl.startsWith('https://')) {
    return reply(503, { success: false, fallbackEmail: 'foundation@jmerrill.one' })
  }

  try {
    const credential = new ManagedIdentityCredential()
    const accessToken = await credential.getToken(`${dataverseUrl}/.default`)
    if (!accessToken?.token) throw new Error('No managed identity token')
    const receipt = await acceptVolunteerReceipt(submission, {
      dataverseUrl, reviewTeamId, privacyNoticeUrl, token: accessToken.token,
    })
    return reply(202, { success: true, referenceId: receipt.referenceId, idempotentReplay: receipt.replay })
  } catch (error) {
    if (error instanceof ReceiptError && error.code === 'CONFLICT') {
      return reply(409, { success: false, message: 'This request changed after it was sent. Please email the Foundation.', fallbackEmail: 'foundation@jmerrill.one' })
    }
    console.error('Foundation volunteer intake receipt unavailable', error instanceof ReceiptError ? error.code : 'AUTH_OR_NETWORK')
    return reply(503, { success: false, message: 'We cannot receive this request right now. Please email the Foundation.', fallbackEmail: 'foundation@jmerrill.one' })
  }
}
