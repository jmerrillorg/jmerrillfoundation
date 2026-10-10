import type { TelemetryClient } from 'applicationinsights'

export type ReviewAgeSignal =
  | { status: 'clear' | 'aged'; agedCount: number }
  | { status: 'failed'; reason: string }

const permittedReasons = new Set([
  'REVIEW_AGE_CONFIG_INVALID',
  'REVIEW_AGE_SCAN_UNAVAILABLE',
  'REVIEW_AGE_SCAN_INVALID',
  'REVIEW_AGE_ROW_INVALID',
  'REVIEW_AGE_NEXTLINK_INVALID',
  'REVIEW_AGE_PAGE_LIMIT',
  'REVIEW_AGE_TELEMETRY_UNAVAILABLE',
])

let clientPromise: Promise<TelemetryClient> | null = null

export function reviewAgeFailureReason(error: unknown): string {
  return error instanceof Error && permittedReasons.has(error.message)
    ? error.message : 'REVIEW_AGE_UNAVAILABLE'
}

export function reviewAgeTelemetryEnvelope(signal: ReviewAgeSignal) {
  return {
    name: 'FND_REVIEW_AGE_SIGNAL',
    properties: signal.status === 'failed'
      ? { status: 'failed', reason: reviewAgeFailureReason(new Error(signal.reason)) }
      : { status: signal.status, agedCount: String(signal.agedCount) },
  }
}

export async function trackReviewAgeSignal(signal: ReviewAgeSignal): Promise<void> {
  const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
  if (!connectionString) throw new Error('REVIEW_AGE_TELEMETRY_UNAVAILABLE')
  clientPromise ??= import('applicationinsights').then(({ TelemetryClient }) =>
    new TelemetryClient(connectionString, { useGlobalProviders: false }))
  const client = await clientPromise
  client.trackEvent(reviewAgeTelemetryEnvelope(signal))
}
