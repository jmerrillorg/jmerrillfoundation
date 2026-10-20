import type { Ledger, Store } from './mealReservation'
// One private event ledger. Conditional writes make allocation and deduplication atomic.
// Never initialize a missing ledger in a request: deletion must not reopen capacity.
export function mealStore(): Store {
  const url = process.env.THANKSGIVING_LEDGER_URL || ''
  const identityEndpoint = process.env.IDENTITY_ENDPOINT || ''
  const identityHeader = process.env.IDENTITY_HEADER || ''
  if (!/^https:\/\/[a-z0-9]+\.blob\.core\.windows\.net\/thanksgiving-2026\/reservations\.json$/.test(url) || !identityEndpoint || !identityHeader) throw new Error('STORE_NOT_CONFIGURED')
  async function headers() {
    const tokenUrl = new URL(identityEndpoint)
    tokenUrl.searchParams.set('resource', 'https://storage.azure.com/')
    tokenUrl.searchParams.set('api-version', '2019-08-01')
    const response = await fetch(tokenUrl, { headers: { 'X-IDENTITY-HEADER': identityHeader }, cache: 'no-store', signal: AbortSignal.timeout(10000) })
    if (!response.ok) throw new Error('STORE_IDENTITY')
    const token = await response.json()
    if (!token.access_token) throw new Error('STORE_IDENTITY')
    return { Authorization: `Bearer ${token.access_token}`, 'x-ms-version': '2023-11-03' }
  }
  return {
    async read() {
      const response = await fetch(url, { headers: await headers(), cache: 'no-store', signal: AbortSignal.timeout(10000) })
      const etag = response.headers.get('etag')
      if (!response.ok || !etag) throw new Error('STORE_READ')
      return { ledger: await response.json() as Ledger, etag }
    },
    async replace(ledger, etag) {
      const response = await fetch(url, { method: 'PUT', headers: { ...await headers(), 'If-Match': etag, 'x-ms-blob-type': 'BlockBlob', 'Content-Type': 'application/json' }, body: JSON.stringify(ledger), signal: AbortSignal.timeout(10000) })
      if (response.status === 412) return false
      if (!response.ok) throw new Error('STORE_WRITE')
      return true
    },
  }
}
