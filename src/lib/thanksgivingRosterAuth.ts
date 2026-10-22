import { createPublicKey, verify, type JsonWebKey } from 'node:crypto'

type Claims = { aud?: string; iss?: string; tid?: string; oid?: string; exp?: number; nbf?: number }
type Jwk = JsonWebKey & { kid?: string; kty?: string; use?: string }

const decode = (part: string) => JSON.parse(Buffer.from(part, 'base64url').toString('utf8'))

export async function thanksgivingReviewerAccess(token: string | null): Promise<'authorized' | 'unauthorized' | 'unavailable'> {
  const tenant = process.env.THANKSGIVING_ROSTER_TENANT_ID
  const client = process.env.THANKSGIVING_ROSTER_CLIENT_ID
  const reviewer = process.env.THANKSGIVING_ROSTER_REVIEWER_OID
  if (process.env.THANKSGIVING_ROSTER_ENABLED !== 'true' || !tenant || !client || !reviewer) return 'unavailable'
  if (!token || token.length > 12000) return 'unauthorized'
  let parts: string[]
  let kid: string
  try {
    parts = token.split('.')
    if (parts.length !== 3) return 'unauthorized'
    const header = decode(parts[0]) as { alg?: string; kid?: string }
    const claims = decode(parts[1]) as Claims
    const now = Math.floor(Date.now() / 1000)
    if (header.alg !== 'RS256' || !header.kid || claims.aud !== client || claims.iss !== `https://login.microsoftonline.com/${tenant}/v2.0` || claims.tid !== tenant || claims.oid !== reviewer || !claims.exp || claims.exp <= now || (claims.nbf && claims.nbf > now)) return 'unauthorized'
    kid = header.kid
  } catch { return 'unauthorized' }
  try {
    const response = await fetch(`https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`, { cache: 'no-store', signal: AbortSignal.timeout(5000) })
    if (!response.ok) return 'unavailable'
    const { keys } = await response.json() as { keys?: Jwk[] }
    const key = keys?.find(candidate => candidate.kid === kid && candidate.kty === 'RSA' && (!candidate.use || candidate.use === 'sig'))
    if (!key) return 'unauthorized'
    return verify('RSA-SHA256', Buffer.from(`${parts[0]}.${parts[1]}`), createPublicKey({ key, format: 'jwk' }), Buffer.from(parts[2], 'base64url')) ? 'authorized' : 'unauthorized'
  } catch {
    return 'unavailable'
  }
}
