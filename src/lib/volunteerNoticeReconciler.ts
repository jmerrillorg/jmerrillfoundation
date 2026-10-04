const source = 'jmerrill.foundation/volunteer'
const guid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const pageLimit = 10

type Inquiry = {
  jm1fnd_submissionid?: unknown
  jm1fnd_source?: unknown
  jm1fnd_reviewstate?: unknown
  jm1fnd_acceptedutc?: unknown
  _ownerid_value?: unknown
}

type Config = {
  dataverseUrl: string
  reviewTeamId: string
  afterUtc: string
  token: string
  acceptedReferences: Set<string>
  send: (referenceId: string) => Promise<void>
  fetcher?: typeof fetch
}

export type ReconcileResult = { scanned: number; accepted: number; failedReferences: string[] }

export async function reconcileVolunteerNotices(config: Config): Promise<ReconcileResult> {
  if (config.dataverseUrl !== 'https://jm1hq.crm.dynamics.com' || !guid.test(config.reviewTeamId) || !config.token) {
    throw new Error('RECONCILER_CONFIG_INVALID')
  }
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(config.afterUtc)) throw new Error('RECONCILER_CONFIG_INVALID')
  const after = new Date(config.afterUtc)
  if (!Number.isFinite(after.getTime())) throw new Error('RECONCILER_CONFIG_INVALID')
  const base = new URL('/api/data/v9.2/jm1fnd_volunteerinquiries', config.dataverseUrl)
  base.searchParams.set('$select', 'jm1fnd_submissionid,jm1fnd_source,jm1fnd_reviewstate,jm1fnd_acceptedutc,_ownerid_value')
  base.searchParams.set('$filter', `jm1fnd_source eq '${source}' and jm1fnd_reviewstate eq 'PENDING_REVIEW' and _ownerid_value eq ${config.reviewTeamId} and jm1fnd_acceptedutc ge ${after.toISOString()}`)
  base.searchParams.set('$orderby', 'jm1fnd_acceptedutc asc')
  base.searchParams.set('$top', '100')
  const fetcher = config.fetcher || fetch
  const result: ReconcileResult = { scanned: 0, accepted: 0, failedReferences: [] }
  let next: string | undefined = base.toString()

  for (let page = 0; page < pageLimit && next; page += 1) {
    const response = await fetcher(next, {
      method: 'GET',
      headers: { Authorization: `Bearer ${config.token}`, Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) throw new Error('RECONCILER_SCAN_UNAVAILABLE')
    const data = await response.json() as { value?: Inquiry[]; '@odata.nextLink'?: string }
    if (!Array.isArray(data.value)) throw new Error('RECONCILER_SCAN_INVALID')
    for (const row of data.value) {
      const id = row.jm1fnd_submissionid
      if (typeof id !== 'string' || !guid.test(id) || id === '00000000-0000-0000-0000-000000000000'
        || row.jm1fnd_source !== source || row.jm1fnd_reviewstate !== 'PENDING_REVIEW' || row._ownerid_value !== config.reviewTeamId
        || typeof row.jm1fnd_acceptedutc !== 'string'
        || !Number.isFinite(new Date(row.jm1fnd_acceptedutc).getTime()) || new Date(row.jm1fnd_acceptedutc) < after) {
        throw new Error('RECONCILER_ROW_INVALID')
      }
      result.scanned += 1
      if (config.acceptedReferences.has(id)) continue
      try {
        await config.send(id)
        config.acceptedReferences.add(id)
        result.accepted += 1
      } catch {
        result.failedReferences.push(id)
      }
    }
    next = data['@odata.nextLink']
    if (next) {
      const nextUrl = new URL(next)
      if (nextUrl.origin !== base.origin || nextUrl.pathname !== base.pathname) throw new Error('RECONCILER_NEXTLINK_INVALID')
    }
  }
  if (next) throw new Error('RECONCILER_PAGE_LIMIT')
  return result
}
