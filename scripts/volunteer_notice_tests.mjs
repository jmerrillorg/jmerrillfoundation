import assert from 'node:assert/strict'
import { test } from 'node:test'
import { NoticeError, sendVolunteerNotice } from '../src/lib/volunteerNotice.ts'

const referenceId = '4a8f4299-9b56-4070-88c9-aeb99c61ca32'

test('only the Foundation reference is sent to the fixed internal relay template', async () => {
  let calls = 0
  await sendVolunteerNotice(referenceId.toUpperCase(), 'test-token', async (url, options) => {
    calls += 1
    assert.equal(url, 'https://func-jm1-acs-email-relay.azurewebsites.net/api/send-enterprise-governed-email')
    assert.equal(options.method, 'POST')
    assert.equal(options.headers.Authorization, 'Bearer test-token')
    const body = JSON.parse(options.body)
    assert.deepEqual(body, {
      brand: 'JMFN',
      to: 'foundation@jmerrill.one',
      templateId: 'FOUNDATION.VOLUNTEER_INQUIRY_NOTICE',
      templateVersion: '1.0.0',
      templateData: { referenceId },
    })
    return Response.json({ accepted: true, deliveryState: 'ACCEPTED', jm1MessageId: 'synthetic' })
  })
  assert.equal(calls, 1)
})

test('rejects missing identity or invalid reference without calling the relay', async () => {
  let calls = 0
  const fetcher = async () => { calls += 1; return Response.json({ accepted: true }) }
  await assert.rejects(sendVolunteerNotice('bad', 'token', fetcher), NoticeError)
  await assert.rejects(sendVolunteerNotice('00000000-0000-0000-0000-000000000000', 'token', fetcher), NoticeError)
  await assert.rejects(sendVolunteerNotice(referenceId, '', fetcher), NoticeError)
  assert.equal(calls, 0)
})

test('does not treat a denied, ambiguous, or malformed relay result as notice accepted', async () => {
  for (const response of [
    new Response(null, { status: 403 }),
    Response.json({ accepted: false, deliveryState: 'HELD' }),
    Response.json({ accepted: true, deliveryState: 'RESERVED', jm1MessageId: 'synthetic' }),
    Response.json({ accepted: true, deliveryState: 'ACCEPTED' }),
    new Response('invalid json', { status: 200 }),
  ]) {
    await assert.rejects(sendVolunteerNotice(referenceId, 'token', async () => response), NoticeError)
  }
})

test('network ambiguity is not blindly retried', async () => {
  let calls = 0
  await assert.rejects(sendVolunteerNotice(referenceId, 'token', async () => {
    calls += 1
    throw new Error('network timeout')
  }))
  assert.equal(calls, 1)
})
