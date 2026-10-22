import type { Ledger } from './mealReservation'

export function rosterSnapshot(ledger: Ledger, refreshedAt: string) {
  return {
    state: 'ready' as const,
    refreshedAt,
    capacity: ledger.capacity,
    accepted: ledger.reservations.length,
    remaining: ledger.capacity - ledger.reservations.length,
    reservations: ledger.reservations.map(({ name, email, phone, address, unit, city, state, zip, reference, acceptedAt }) => ({ name, email, phone, address, unit, city, state, zip, reference, acceptedAt })),
  }
}
