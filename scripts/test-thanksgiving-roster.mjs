import test from 'node:test'
import assert from 'node:assert/strict'
import { generateKeyPairSync, createSign } from 'node:crypto'
import { thanksgivingReviewerAccess } from '../src/lib/thanksgivingRosterAuth.ts'
import { rosterSnapshot } from '../src/lib/thanksgivingRoster.ts'

const tenant = '352d075e-8e17-4169-9f8e-22e6946ce66d'
const client = '11111111-1111-1111-1111-111111111111'
const reviewer = '9750d862-2024-42bc-9707-f84b325dfb19'
const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 })
const old = { ...process.env }
const oldFetch = globalThis.fetch
process.env.THANKSGIVING_ROSTER_ENABLED = 'true'
process.env.THANKSGIVING_ROSTER_TENANT_ID = tenant
process.env.THANKSGIVING_ROSTER_CLIENT_ID = client
process.env.THANKSGIVING_ROSTER_REVIEWER_OID = reviewer
globalThis.fetch = async () => new Response(JSON.stringify({ keys: [{ ...publicKey.export({ format: 'jwk' }), kid: 'test', use: 'sig' }] }), { status: 200 })

function token(override = {}) {
  const now = Math.floor(Date.now() / 1000)
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', kid: 'test' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({ aud: client, iss: `https://login.microsoftonline.com/${tenant}/v2.0`, tid: tenant, oid: reviewer, exp: now + 300, nbf: now - 30, ...override })).toString('base64url')
  const signature = createSign('RSA-SHA256').update(`${header}.${payload}`).sign(privateKey).toString('base64url')
  return `${header}.${payload}.${signature}`
}

test('authorized reviewer needs a valid audience-bound signed token', async () => {
  assert.equal(await thanksgivingReviewerAccess(token()), 'authorized')
  assert.equal(await thanksgivingReviewerAccess(null), 'unauthorized')
  assert.equal(await thanksgivingReviewerAccess(token({ oid: 'someone-else' })), 'unauthorized')
  assert.equal(await thanksgivingReviewerAccess(token({ aud: 'another-app' })), 'unauthorized')
  assert.equal(await thanksgivingReviewerAccess(token({ exp: 1 })), 'unauthorized')
  const signed = token().split('.')
  signed[1] = Buffer.from(JSON.stringify({ oid: reviewer, aud: client, iss: `https://login.microsoftonline.com/${tenant}/v2.0`, tid: tenant, exp: Math.floor(Date.now() / 1000) + 300, nbf: 1, changed: true })).toString('base64url')
  assert.equal(await thanksgivingReviewerAccess(signed.join('.')), 'unauthorized')
})

test('disabled roster and identity verification failure deny access', async () => {
  process.env.THANKSGIVING_ROSTER_ENABLED = 'false'
  assert.equal(await thanksgivingReviewerAccess(token()), 'unavailable')
  process.env.THANKSGIVING_ROSTER_ENABLED = 'true'
  globalThis.fetch = async () => { throw Error('identity unavailable') }
  assert.equal(await thanksgivingReviewerAccess(token()), 'unavailable')
  globalThis.fetch = oldFetch
  process.env = old
})

test('capacity and private-field projection use the same ledger', () => {
  const reservation = { name: 'Fixture Family', email: '', phone: '6145550100', address: '1 Test St', unit: '', city: 'Columbus', state: 'OH', zip: '43207', reference: 'fixture-ref', acceptedAt: '2026-10-22T00:00:00Z', householdKey: 'private', payloadHash: 'private', requestId: 'private', householdConsent: true }
  const result = rosterSnapshot({ event: 'fixture', capacity: 60, reservations: [reservation] }, '2026-10-22T12:00:00Z')
  assert.equal(result.accepted, 1)
  assert.equal(result.remaining, 59)
  assert.equal(result.refreshedAt, '2026-10-22T12:00:00Z')
  assert.equal(JSON.stringify(result).includes('householdKey'), false)
  assert.equal(JSON.stringify(result).includes('payloadHash'), false)
})
