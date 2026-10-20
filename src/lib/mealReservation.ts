import { createHash, randomUUID } from 'node:crypto'

export type Submission = { requestId: string; name: string; email: string; phone: string; address: string; unit: string; city: string; state: string; zip: string; householdConsent: true }
export type Reservation = Submission & { reference: string; householdKey: string; payloadHash: string; acceptedAt: string }
export type Ledger = { event: string; capacity: number; reservations: Reservation[] }
export type Store = { read(): Promise<{ ledger: Ledger; etag: string }>; replace(ledger: Ledger, etag: string): Promise<boolean> }
export class ReservationError extends Error {}
const normalized = (s: string) => s.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]/g, '')
export function parseSubmission(input: unknown): Submission {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new ReservationError('INVALID')
  const b = input as Record<string, unknown>
  const limits = { requestId: 36, name: 120, email: 254, phone: 30, address: 180, unit: 40, city: 100, state: 60, zip: 10 }
  const result: Record<string, string | boolean> = {}
  for (const [key, limit] of Object.entries(limits)) {
    const value = typeof b[key] === 'string' ? (b[key] as string).trim() : ''
    if ((!['unit', 'email', 'phone'].includes(key) && !value) || value.length > limit || /[\u0000-\u001f]/.test(value)) throw new ReservationError('INVALID')
    result[key] = value
  }
  if (!/^[a-f0-9-]{36}$/i.test(String(result.requestId)) || (!!result.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(result.email))) || !/^\d{5}(-\d{4})?$/.test(String(result.zip)) || (!!result.phone && String(result.phone).replace(/\D/g, '').length < 10) || (!result.email && !result.phone) || b.householdConsent !== true) throw new ReservationError('INVALID')
  result.email = String(result.email).toLowerCase()
  result.householdConsent = true
  return result as Submission
}
export function validateLedger(ledger: Ledger, event: string, capacity: number) {
  if (ledger.event !== event || ledger.capacity !== capacity || !Array.isArray(ledger.reservations) || ledger.reservations.length > capacity || ledger.reservations.some(r => !r.reference || !r.householdKey || !r.payloadHash) || new Set(ledger.reservations.map(r => r.householdKey)).size !== ledger.reservations.length) throw new ReservationError('UNAVAILABLE')
}
export async function reserve(store: Store, submission: Submission, event: string, capacity: number) {
  const householdKey = createHash('sha256').update([submission.address, submission.unit, submission.zip.slice(0, 5)].map(normalized).join('|')).digest('hex')
  const payloadHash = createHash('sha256').update(JSON.stringify(submission)).digest('hex')
  for (let attempt = 0; attempt < 8; attempt++) {
    const { ledger, etag } = await store.read()
    validateLedger(ledger, event, capacity)
    const replay = ledger.reservations.find(r => r.requestId === submission.requestId)
    if (replay) {
      if (replay.payloadHash !== payloadHash) throw new ReservationError('CONFLICT')
      return { reference: replay.reference, replay: true }
    }
    if (ledger.reservations.some(r => r.householdKey === householdKey)) throw new ReservationError('DUPLICATE')
    if (ledger.reservations.length >= capacity) throw new ReservationError('FULL')
    const reservation = { ...submission, reference: randomUUID(), householdKey, payloadHash, acceptedAt: new Date().toISOString() }
    if (await store.replace({ ...ledger, reservations: [...ledger.reservations, reservation] }, etag)) return { reference: reservation.reference, replay: false }
  }
  throw new ReservationError('BUSY')
}
