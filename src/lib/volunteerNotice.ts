export const VOLUNTEER_RELAY_AUDIENCE = 'api://84530e9b-2842-4ca6-8fe6-1a11eed051d1/.default'
const relayUrl = 'https://func-jm1-acs-email-relay.azurewebsites.net/api/send-enterprise-governed-email'
const referenceFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export class NoticeError extends Error {
  constructor() {
    super('NOTICE_UNAVAILABLE')
  }
}

export async function sendVolunteerNotice(referenceId: string, token: string, fetcher: typeof fetch = fetch): Promise<void> {
  if (!referenceFormat.test(referenceId) || /^0{8}-0{4}-0{4}-0{4}-0{12}$/.test(referenceId) || !token) throw new NoticeError()
  const response = await fetcher(relayUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      brand: 'JMFN',
      to: 'foundation@jmerrill.one',
      templateId: 'FOUNDATION.VOLUNTEER_INQUIRY_NOTICE',
      templateVersion: '1.0.0',
      templateData: { referenceId: referenceId.toLowerCase() },
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new NoticeError()
  let result: unknown
  try {
    result = await response.json()
  } catch {
    throw new NoticeError()
  }
  if (!result || typeof result !== 'object') throw new NoticeError()
  const notice = result as { accepted?: unknown; deliveryState?: unknown; jm1MessageId?: unknown }
  if (notice.accepted !== true || notice.deliveryState !== 'ACCEPTED' || typeof notice.jm1MessageId !== 'string' || !notice.jm1MessageId) {
    throw new NoticeError()
  }
}
