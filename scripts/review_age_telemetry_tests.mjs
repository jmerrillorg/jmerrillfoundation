import assert from 'node:assert/strict'
import { test } from 'node:test'
import { reviewAgeFailureReason, reviewAgeTelemetryEnvelope } from '../src/lib/reviewAgeTelemetry.ts'

test('review-age telemetry contains only status and count', () => {
  assert.deepEqual(reviewAgeTelemetryEnvelope({ status: 'aged', agedCount: 2 }), {
    name: 'FND_REVIEW_AGE_SIGNAL',
    properties: { status: 'aged', agedCount: '2' },
  })
  assert.deepEqual(reviewAgeTelemetryEnvelope({ status: 'clear', agedCount: 0 }), {
    name: 'FND_REVIEW_AGE_SIGNAL',
    properties: { status: 'clear', agedCount: '0' },
  })
})

test('untrusted failure text cannot enter the telemetry envelope', () => {
  const unsafe = new Error('REVIEW_AGE_SCAN_UNAVAILABLE private@example.invalid')
  assert.equal(reviewAgeFailureReason(unsafe), 'REVIEW_AGE_UNAVAILABLE')
  assert.deepEqual(reviewAgeTelemetryEnvelope({ status: 'failed', reason: unsafe.message }), {
    name: 'FND_REVIEW_AGE_SIGNAL',
    properties: { status: 'failed', reason: 'REVIEW_AGE_UNAVAILABLE' },
  })
  assert.equal(reviewAgeFailureReason(new Error('REVIEW_AGE_ROW_INVALID')), 'REVIEW_AGE_ROW_INVALID')
})
