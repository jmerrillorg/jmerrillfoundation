import assert from 'node:assert/strict'
import { test } from 'node:test'
import { reviewAgePolicyFromEnv, reviewAgeSignalEvent, scanVolunteerReviewAge } from '../src/lib/volunteerReviewAge.ts'
import { noticeWorkerState, reviewAgeSignalHealth } from '../src/lib/volunteerNoticeWorkerState.ts'

const team = 'e00e50e4-d6bf-f111-aaaf-6045bdd69435'
const synthetic = '73d47e87-5661-49b3-9f35-66f9e1bd40fb'
const eligible = '11111111-1111-4111-8111-111111111111'
const fresh = '22222222-2222-4222-8222-222222222222'
const now = new Date('2026-10-05T12:00:00.000Z')

function row(id, accepted = '2026-10-05T10:00:00.000Z') {
  return {
    jm1fnd_submissionid: id,
    jm1fnd_source: 'jmerrill.foundation/volunteer',
    jm1fnd_reviewstate: 'PENDING_REVIEW',
    jm1fnd_acceptedutc: accepted,
    _ownerid_value: team,
  }
}

function config(overrides = {}) {
  return {
    dataverseUrl: 'https://jm1hq.crm.dynamics.com',
    reviewTeamId: team,
    afterUtc: '2026-10-04T15:43:00Z',
    token: 'synthetic-token',
    thresholdMinutes: 60,
    excludedSubmissionIds: new Set([synthetic]),
    now,
    fetcher: async () => Response.json({ value: [row(synthetic), row(eligible)] }),
    ...overrides,
  }
}

test('requires explicit policy identity, age threshold, and exclusion declaration', () => {
  const values = {
    FOUNDATION_REVIEW_AGE_POLICY_ID: 'FND-REVIEW-AGE-APPROVED',
    FOUNDATION_REVIEW_AGE_AFTER_UTC: '2026-10-04T15:43:00Z',
    FOUNDATION_REVIEW_AGE_THRESHOLD_MINUTES: '60',
    FOUNDATION_REVIEW_AGE_EXCLUDE_SUBMISSIONS: synthetic,
  }
  assert.throws(() => reviewAgePolicyFromEnv({}), /REVIEW_AGE_CONFIG_INVALID/)
  assert.deepEqual(reviewAgePolicyFromEnv(values), {
    afterUtc: '2026-10-04T15:43:00Z',
    thresholdMinutes: 60,
    excludedSubmissionIds: new Set([synthetic]),
  })
  assert.deepEqual(reviewAgePolicyFromEnv({ ...values, FOUNDATION_REVIEW_AGE_EXCLUDE_SUBMISSIONS: 'none' }).excludedSubmissionIds, new Set())
  for (const change of [
    { FOUNDATION_REVIEW_AGE_POLICY_ID: '' },
    { FOUNDATION_REVIEW_AGE_AFTER_UTC: '' },
    { FOUNDATION_REVIEW_AGE_AFTER_UTC: 'not-a-timestamp' },
    { FOUNDATION_REVIEW_AGE_THRESHOLD_MINUTES: '0' },
    { FOUNDATION_REVIEW_AGE_THRESHOLD_MINUTES: '1.5' },
    { FOUNDATION_REVIEW_AGE_EXCLUDE_SUBMISSIONS: '' },
    { FOUNDATION_REVIEW_AGE_EXCLUDE_SUBMISSIONS: `${synthetic},${synthetic}` },
    { FOUNDATION_REVIEW_AGE_EXCLUDE_SUBMISSIONS: 'bad-id' },
  ]) assert.throws(() => reviewAgePolicyFromEnv({ ...values, ...change }), /REVIEW_AGE_CONFIG_INVALID/)
})

test('scopes the scan and excludes synthetic references without reading private content', async () => {
  const result = await scanVolunteerReviewAge(config({ fetcher: async (url, options) => {
    const parsed = new URL(url)
    assert.equal(parsed.origin, 'https://jm1hq.crm.dynamics.com')
    assert.equal(parsed.pathname, '/api/data/v9.2/jm1fnd_volunteerinquiries')
    assert.equal(parsed.searchParams.get('$select'), 'jm1fnd_submissionid,jm1fnd_source,jm1fnd_reviewstate,jm1fnd_acceptedutc,_ownerid_value')
    assert.match(parsed.searchParams.get('$filter'), /jm1fnd_source eq 'jmerrill.foundation\/volunteer'/)
    assert.match(parsed.searchParams.get('$filter'), /jm1fnd_reviewstate eq 'PENDING_REVIEW'/)
    assert.match(parsed.searchParams.get('$filter'), new RegExp(`_ownerid_value eq ${team}`))
    assert.match(parsed.searchParams.get('$filter'), /jm1fnd_acceptedutc ge 2026-10-04T15:43:00.000Z/)
    assert.equal(options.headers.Authorization, 'Bearer synthetic-token')
    return Response.json({ value: [row(synthetic), row(eligible), row(fresh, '2026-10-05T11:30:00.000Z')] })
  } }))
  assert.deepEqual(result, { eligibleCount: 2, agedCount: 1 })
  const event = reviewAgeSignalEvent(result)
  assert.deepEqual(event, { status: 'aged', agedCount: 1 })
  assert.doesNotMatch(JSON.stringify(event), new RegExp(`${synthetic}|${eligible}|email|message`))
})

test('threshold boundary, paging, restart, and clear heartbeat are deterministic', async () => {
  let pages = 0
  const fetcher = async (url) => {
    pages += 1
    return pages % 2 === 1
      ? Response.json({ value: [row(eligible, '2026-10-05T11:00:00.000Z')], '@odata.nextLink': 'https://jm1hq.crm.dynamics.com/api/data/v9.2/jm1fnd_volunteerinquiries?$skiptoken=next' })
      : Response.json({ value: [row(fresh, '2026-10-05T11:00:00.001Z')] })
  }
  const first = await scanVolunteerReviewAge(config({ fetcher }))
  assert.deepEqual(first, { eligibleCount: 2, agedCount: 1 })
  assert.deepEqual(await scanVolunteerReviewAge(config({ fetcher })), first)
  const cleared = await scanVolunteerReviewAge(config({ fetcher: async () => Response.json({ value: [] }) }))
  assert.deepEqual(cleared, { eligibleCount: 0, agedCount: 0 })
  assert.deepEqual(reviewAgeSignalEvent(cleared), { status: 'clear', agedCount: 0 })
})

test('fails closed on wrong source/team, duplicate row, future timestamp, and invalid continuation', async () => {
  for (const bad of [
    { ...row(eligible), jm1fnd_source: 'jmerrill.pub/author' },
    { ...row(eligible), _ownerid_value: '00000000-0000-0000-0000-000000000001' },
    row(eligible, '2026-10-05T12:01:00.000Z'),
  ]) await assert.rejects(scanVolunteerReviewAge(config({ fetcher: async () => Response.json({ value: [bad] }) })), /REVIEW_AGE_ROW_INVALID/)
  await assert.rejects(scanVolunteerReviewAge(config({ fetcher: async () => Response.json({ value: [row(eligible), row(eligible)] }) })), /REVIEW_AGE_ROW_INVALID/)
  await assert.rejects(scanVolunteerReviewAge(config({ fetcher: async () => Response.json({ value: [row(eligible)], '@odata.nextLink': 'https://outside.example.invalid/collect' }) })), /REVIEW_AGE_NEXTLINK_INVALID/)
})

test('scan and configuration failures never report a clear queue', async () => {
  await assert.rejects(scanVolunteerReviewAge(config({ thresholdMinutes: 0 })), /REVIEW_AGE_CONFIG_INVALID/)
  await assert.rejects(scanVolunteerReviewAge(config({ afterUtc: '2026-10-06T00:00:00Z' })), /REVIEW_AGE_CONFIG_INVALID/)
  await assert.rejects(scanVolunteerReviewAge(config({ fetcher: async () => new Response(null, { status: 503 }) })), /REVIEW_AGE_SCAN_UNAVAILABLE/)
  await assert.rejects(scanVolunteerReviewAge(config({ fetcher: async () => Response.json({ value: {} }) })), /REVIEW_AGE_SCAN_INVALID/)
  await assert.rejects(scanVolunteerReviewAge(config({ fetcher: async () => Response.json({ value: [], '@odata.nextLink': 'https://jm1hq.crm.dynamics.com/api/data/v9.2/jm1fnd_volunteerinquiries?$skiptoken=loop' }) })), /REVIEW_AGE_PAGE_LIMIT/)
})

test('default-off health distinguishes aged, clear, failed, and stale without failing site health', () => {
  const beforeAge = process.env.FOUNDATION_REVIEW_AGE_SIGNAL_ENABLED
  const beforeNotice = process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED
  const state = noticeWorkerState()
  const before = { status: state.reviewAgeStatus, success: state.reviewAgeLastSuccessAt, error: state.reviewAgeLastError }
  try {
    delete process.env.FOUNDATION_REVIEW_AGE_SIGNAL_ENABLED
    assert.equal(reviewAgeSignalHealth(), 'disabled')
    process.env.FOUNDATION_REVIEW_AGE_SIGNAL_ENABLED = 'true'
    assert.equal(reviewAgeSignalHealth(), 'failed')
    process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED = 'true'
    state.reviewAgeLastError = null
    state.reviewAgeLastSuccessAt = Date.now()
    state.reviewAgeStatus = 'aged'
    assert.equal(reviewAgeSignalHealth(), 'aged')
    state.reviewAgeStatus = 'clear'
    assert.equal(reviewAgeSignalHealth(), 'clear')
    state.reviewAgeLastError = 'REVIEW_AGE_SCAN_UNAVAILABLE'
    assert.equal(reviewAgeSignalHealth(), 'failed')
    state.reviewAgeLastError = null
    state.reviewAgeLastSuccessAt = Date.now() - 601000
    assert.equal(reviewAgeSignalHealth(), 'stale')
  } finally {
    if (beforeAge === undefined) delete process.env.FOUNDATION_REVIEW_AGE_SIGNAL_ENABLED
    else process.env.FOUNDATION_REVIEW_AGE_SIGNAL_ENABLED = beforeAge
    if (beforeNotice === undefined) delete process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED
    else process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED = beforeNotice
    state.reviewAgeStatus = before.status
    state.reviewAgeLastSuccessAt = before.success
    state.reviewAgeLastError = before.error
  }
})
