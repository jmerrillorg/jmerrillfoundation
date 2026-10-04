import assert from 'node:assert/strict'
import { test } from 'node:test'
import { acceptVolunteerReceipt, parseVolunteerSubmission, ReceiptError, submissionHash } from '../src/lib/volunteerIntake.ts'

const raw = {
  submissionId: '4a8f4299-9b56-4070-88c9-aeb99c61ca32',
  firstName: 'Synthetic',
  lastName: 'Volunteer',
  email: 'synthetic@example.invalid',
  interest: 'story-hour',
  message: 'Test inquiry only',
  responseConsent: true,
  marketingOptIn: false,
}
const submission = parseVolunteerSubmission(raw)
assert.ok(submission)

const baseConfig = {
  dataverseUrl: 'https://jm1hq.crm.dynamics.com',
  reviewTeamId: 'b8774c84-9c68-4aa3-967d-a3f8ba7c7453',
  privacyNoticeUrl: 'https://jmerrill.foundation/privacy',
  token: 'test-token',
}

test('requires submitted contact identity and response-only consent', () => {
  assert.equal(parseVolunteerSubmission({ ...raw, responseConsent: false }), null)
  assert.equal(parseVolunteerSubmission({ ...raw, email: 'bad' }), null)
  assert.equal(parseVolunteerSubmission({ ...raw, submissionId: 'not-a-guid' }), null)
  assert.equal(parseVolunteerSubmission({ ...raw, interest: 'donation' }), null)
  assert.equal(parseVolunteerSubmission({ ...raw, marketingOptIn: undefined }), null)
})

test('create-only write returns a reference after Dataverse accepts the row', async () => {
  const calls = []
  const result = await acceptVolunteerReceipt(submission, {
    ...baseConfig,
    fetcher: async (url, options) => {
      calls.push({ url, options })
      return new Response(null, { status: 204 })
    },
  })
  assert.deepEqual(result, { referenceId: raw.submissionId, replay: false })
  assert.equal(calls.length, 1)
  assert.equal(calls[0].options.method, 'PATCH')
  assert.equal(calls[0].options.headers['If-None-Match'], '*')
  const payload = JSON.parse(calls[0].options.body)
  assert.equal(payload.jm1fnd_email, raw.email)
  assert.equal(payload.jm1fnd_reviewstate, 'PENDING_REVIEW')
  assert.equal(payload.jm1fnd_marketingoptin, false)
  assert.equal(payload['ownerid@odata.bind'], `/teams(${baseConfig.reviewTeamId})`)
  assert.equal(payload.jm1fnd_payloadhash, submissionHash(submission))
  assert.ok(!('jm1fnd_submissionid' in payload))
})

test('an exact replay returns the original reference without writing again', async () => {
  let writes = 0
  const result = await acceptVolunteerReceipt(submission, {
    ...baseConfig,
    fetcher: async (_url, options) => {
      if (options.method === 'PATCH') {
        writes += 1
        return new Response(null, { status: 412 })
      }
      return Response.json({ jm1fnd_payloadhash: submissionHash(submission) })
    },
  })
  assert.equal(writes, 1)
  assert.deepEqual(result, { referenceId: raw.submissionId, replay: true })
})

test('a changed-payload replay is rejected', async () => {
  await assert.rejects(
    acceptVolunteerReceipt(submission, {
      ...baseConfig,
      fetcher: async (_url, options) => options.method === 'PATCH'
        ? new Response(null, { status: 412 })
        : Response.json({ jm1fnd_payloadhash: 'another-hash' }),
    }),
    (error) => error instanceof ReceiptError && error.code === 'CONFLICT',
  )
})

test('Dataverse failure is not reported as accepted', async () => {
  await assert.rejects(
    acceptVolunteerReceipt(submission, {
      ...baseConfig,
      fetcher: async () => new Response(null, { status: 503 }),
    }),
    (error) => error instanceof ReceiptError && error.code === 'UNAVAILABLE',
  )
})
