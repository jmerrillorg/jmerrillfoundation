import { createHash } from 'node:crypto'

export const INTAKE_CONSENT_VERSION = 'foundation-response-only-2026-10-04-v1'

const interests = new Set(['volunteer', 'board', 'school', 'story-hour', 'reading-station', 'partner', 'other'])
const guid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export type VolunteerSubmission = {
  submissionId: string
  firstName: string
  lastName: string
  email: string
  interest: string
  message: string
  responseConsent: true
  marketingOptIn: boolean
}

export function isGuid(value: string): boolean {
  return guid.test(value)
}

function clean(value: unknown, limit: number): string {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, limit + 1)
    : ''
}

export function parseVolunteerSubmission(value: unknown): VolunteerSubmission | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const body = value as Record<string, unknown>
  const submissionId = clean(body.submissionId, 36).toLowerCase()
  const firstName = clean(body.firstName, 80)
  const lastName = clean(body.lastName, 80)
  const email = clean(body.email, 254).toLowerCase()
  const interest = clean(body.interest, 40)
  const message = clean(body.message, 700)
  if (!guid.test(submissionId) || !firstName || firstName.length > 80 || !lastName || lastName.length > 80) return null
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  if (!interests.has(interest) || message.length > 700 || body.responseConsent !== true) return null
  if (typeof body.marketingOptIn !== 'boolean') return null
  return { submissionId, firstName, lastName, email, interest, message, responseConsent: true, marketingOptIn: body.marketingOptIn }
}

export function submissionHash(submission: VolunteerSubmission): string {
  return createHash('sha256').update(JSON.stringify(submission)).digest('hex')
}

export type ReceiptResult = { referenceId: string; replay: boolean }
export type ReceiptErrorCode = 'CONFLICT' | 'UNAVAILABLE'

export class ReceiptError extends Error {
  readonly code: ReceiptErrorCode

  constructor(code: ReceiptErrorCode) {
    super(code)
    this.code = code
  }
}

type ReceiptConfig = {
  dataverseUrl: string
  reviewTeamId: string
  privacyNoticeUrl: string
  token: string
  fetcher?: typeof fetch
}

export async function acceptVolunteerReceipt(submission: VolunteerSubmission, config: ReceiptConfig): Promise<ReceiptResult> {
  const fetcher = config.fetcher || fetch
  const key = `jm1fnd_submissionid='${submission.submissionId}'`
  const url = `${config.dataverseUrl.replace(/\/$/, '')}/api/data/v9.2/jm1fnd_volunteerinquiries(${key})`
  const hash = submissionHash(submission)
  const headers = {
    Authorization: `Bearer ${config.token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0',
  }
  const created = await fetcher(url, {
    method: 'PATCH',
    headers: { ...headers, 'If-None-Match': '*' },
    body: JSON.stringify({
      jm1fnd_name: `Volunteer inquiry ${submission.submissionId}`,
      jm1fnd_fullname: `${submission.firstName} ${submission.lastName}`,
      jm1fnd_email: submission.email,
      jm1fnd_interest: submission.interest,
      jm1fnd_message: submission.message,
      jm1fnd_responseconsent: true,
      jm1fnd_consenttextversion: INTAKE_CONSENT_VERSION,
      jm1fnd_marketingoptin: submission.marketingOptIn,
      jm1fnd_privacynoticeurl: config.privacyNoticeUrl,
      jm1fnd_acceptedutc: new Date().toISOString(),
      jm1fnd_payloadhash: hash,
      jm1fnd_reviewstate: 'PENDING_REVIEW',
      jm1fnd_source: 'jmerrill.foundation/volunteer',
      'ownerid@odata.bind': `/teams(${config.reviewTeamId})`,
    }),
    cache: 'no-store',
  })
  if (created.ok) return { referenceId: submission.submissionId, replay: false }
  if (created.status !== 412) throw new ReceiptError('UNAVAILABLE')

  const existing = await fetcher(`${url}?$select=jm1fnd_payloadhash`, {
    method: 'GET', headers, cache: 'no-store',
  })
  if (!existing.ok) throw new ReceiptError('UNAVAILABLE')
  const record = await existing.json() as { jm1fnd_payloadhash?: string }
  if (record.jm1fnd_payloadhash !== hash) throw new ReceiptError('CONFLICT')
  return { referenceId: submission.submissionId, replay: true }
}
