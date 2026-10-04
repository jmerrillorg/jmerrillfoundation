import assert from 'node:assert/strict'
import { test } from 'node:test'
import { reconcileVolunteerNotices } from '../src/lib/volunteerNoticeReconciler.ts'
import { noticeWorkerHealth, noticeWorkerState } from '../src/lib/volunteerNoticeWorkerState.ts'

const id = '73d47e87-5661-49b3-9f35-66f9e1bd40fb'
const team = 'e00e50e4-d6bf-f111-aaaf-6045bdd69435'
const row = {
  jm1fnd_submissionid: id,
  jm1fnd_source: 'jmerrill.foundation/volunteer',
  jm1fnd_reviewstate: 'PENDING_REVIEW',
  jm1fnd_acceptedutc: '2026-10-04T15:30:00.000Z',
  _ownerid_value: team,
}

function config(overrides = {}) {
  return {
    dataverseUrl: 'https://jm1hq.crm.dynamics.com',
    reviewTeamId: team,
    afterUtc: '2026-10-04T15:00:00.000Z',
    token: 'synthetic-token',
    acceptedReferences: new Set(),
    send: async () => {},
    fetcher: async () => Response.json({ value: [row] }),
    ...overrides,
  }
}

test('scans only the Foundation source/team and sends a stable reference', async () => {
  const sent = []
  const result = await reconcileVolunteerNotices(config({
    send: async (referenceId) => sent.push(referenceId),
    fetcher: async (url, options) => {
      const parsed = new URL(url)
      assert.equal(parsed.origin, 'https://jm1hq.crm.dynamics.com')
      assert.equal(parsed.pathname, '/api/data/v9.2/jm1fnd_volunteerinquiries')
      assert.match(parsed.searchParams.get('$filter'), /jm1fnd_source eq 'jmerrill.foundation\/volunteer'/)
      assert.match(parsed.searchParams.get('$filter'), /jm1fnd_reviewstate eq 'PENDING_REVIEW'/)
      assert.match(parsed.searchParams.get('$filter'), new RegExp(`_ownerid_value eq ${team}`))
      assert.match(parsed.searchParams.get('$filter'), /jm1fnd_acceptedutc ge 2026-10-04T15:00:00.000Z/)
      assert.equal(options.headers.Authorization, 'Bearer synthetic-token')
      return Response.json({ value: [row] })
    },
  }))
  assert.deepEqual(result, { scanned: 1, accepted: 1, failedReferences: [] })
  assert.deepEqual(sent, [id])
})

test('rescan after process restart relies on relay idempotency, while same-process repeats are skipped', async () => {
  const acceptedReferences = new Set()
  let sends = 0
  const options = config({ acceptedReferences, send: async () => { sends += 1 } })
  await reconcileVolunteerNotices(options)
  await reconcileVolunteerNotices(options)
  assert.equal(sends, 1)
  await reconcileVolunteerNotices(config({ send: async () => { sends += 1 } }))
  assert.equal(sends, 2)
})

test('records a failed send for health signaling and retries it on the next sweep', async () => {
  const acceptedReferences = new Set()
  let attempts = 0
  const options = config({ acceptedReferences, send: async () => {
    attempts += 1
    if (attempts === 1) throw new Error('relay unavailable')
  } })
  assert.deepEqual(await reconcileVolunteerNotices(options), { scanned: 1, accepted: 0, failedReferences: [id] })
  assert.deepEqual(await reconcileVolunteerNotices(options), { scanned: 1, accepted: 1, failedReferences: [] })
  assert.equal(attempts, 2)
})

test('fails closed on cross-team rows and external continuation links', async () => {
  await assert.rejects(reconcileVolunteerNotices(config({
    fetcher: async () => Response.json({ value: [{ ...row, _ownerid_value: '00000000-0000-0000-0000-000000000001' }] }),
  })), /RECONCILER_ROW_INVALID/)
  await assert.rejects(reconcileVolunteerNotices(config({
    fetcher: async () => Response.json({ value: [row], '@odata.nextLink': 'https://outside.example.invalid/collect' }),
  })), /RECONCILER_NEXTLINK_INVALID/)
})

test('treats scan errors, invalid cutoff, and missing rows as failures', async () => {
  await assert.rejects(reconcileVolunteerNotices(config({ afterUtc: 'not-a-date' })), /RECONCILER_CONFIG_INVALID/)
  await assert.rejects(reconcileVolunteerNotices(config({ afterUtc: '2026-10-04' })), /RECONCILER_CONFIG_INVALID/)
  await assert.rejects(reconcileVolunteerNotices(config({ fetcher: async () => new Response(null, { status: 503 }) })), /RECONCILER_SCAN_UNAVAILABLE/)
  await assert.rejects(reconcileVolunteerNotices(config({ fetcher: async () => Response.json({ value: {} }) })), /RECONCILER_SCAN_INVALID/)
})

test('enabled worker health distinguishes ready, failed, and stale reconciliation', () => {
  const original = process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED
  try {
    process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED = 'true'
    const state = noticeWorkerState()
    state.lastError = null
    state.lastSuccessAt = Date.now()
    assert.equal(noticeWorkerHealth(), 'ready')
    state.lastError = 'RECONCILER_NOTICES_UNAVAILABLE'
    assert.equal(noticeWorkerHealth(), 'failed')
    state.lastError = null
    state.lastSuccessAt = Date.now() - 601000
    assert.equal(noticeWorkerHealth(), 'stale')
  } finally {
    if (original === undefined) delete process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED
    else process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED = original
  }
})
