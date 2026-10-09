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
  thresholdMinutes: number
  excludedSubmissionIds: Set<string>
  now: Date
  fetcher?: typeof fetch
}

export type ReviewAgeResult = { eligibleCount: number; agedCount: number }

export function reviewAgeSignalEvent(result: ReviewAgeResult) {
  return { status: result.agedCount ? 'aged' : 'clear', agedCount: result.agedCount }
}

export function reviewAgePolicyFromEnv(env: Record<string, string | undefined>) {
  const policyId = env.FOUNDATION_REVIEW_AGE_POLICY_ID || ''
  const threshold = env.FOUNDATION_REVIEW_AGE_THRESHOLD_MINUTES || ''
  const exclusions = env.FOUNDATION_REVIEW_AGE_EXCLUDE_SUBMISSIONS || ''
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{2,79}$/.test(policyId) || !/^[1-9]\d*$/.test(threshold)) {
    throw new Error('REVIEW_AGE_CONFIG_INVALID')
  }
  const thresholdMinutes = Number(threshold)
  if (!Number.isSafeInteger(thresholdMinutes) || thresholdMinutes * 60000 > Number.MAX_SAFE_INTEGER) {
    throw new Error('REVIEW_AGE_CONFIG_INVALID')
  }
  const ids = exclusions === 'none' ? [] : exclusions.split(',').map((value) => value.trim())
  if (!exclusions || ids.some((id) => !guid.test(id)) || new Set(ids).size !== ids.length) {
    throw new Error('REVIEW_AGE_CONFIG_INVALID')
  }
  return { thresholdMinutes, excludedSubmissionIds: new Set(ids) }
}

export async function scanVolunteerReviewAge(config: Config): Promise<ReviewAgeResult> {
  if (config.dataverseUrl !== 'https://jm1hq.crm.dynamics.com' || !guid.test(config.reviewTeamId) || !config.token
    || !Number.isSafeInteger(config.thresholdMinutes) || config.thresholdMinutes < 1
    || !Number.isFinite(config.now.getTime()) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(config.afterUtc)
    || !Number.isFinite(new Date(config.afterUtc).getTime())
    || Array.from(config.excludedSubmissionIds).some((id) => !guid.test(id))) {
    throw new Error('REVIEW_AGE_CONFIG_INVALID')
  }
  const base = new URL('/api/data/v9.2/jm1fnd_volunteerinquiries', config.dataverseUrl)
  base.searchParams.set('$select', 'jm1fnd_submissionid,jm1fnd_source,jm1fnd_reviewstate,jm1fnd_acceptedutc,_ownerid_value')
  base.searchParams.set('$filter', `jm1fnd_source eq '${source}' and jm1fnd_reviewstate eq 'PENDING_REVIEW' and _ownerid_value eq ${config.reviewTeamId} and jm1fnd_acceptedutc ge ${new Date(config.afterUtc).toISOString()}`)
  base.searchParams.set('$orderby', 'jm1fnd_acceptedutc asc')
  base.searchParams.set('$top', '100')
  const result: ReviewAgeResult = { eligibleCount: 0, agedCount: 0 }
  const cutoff = config.now.getTime() - config.thresholdMinutes * 60000
  const seen = new Set<string>()
  let next: string | undefined = base.toString()

  for (let page = 0; page < pageLimit && next; page += 1) {
    const response = await (config.fetcher || fetch)(next, {
      method: 'GET',
      headers: { Authorization: `Bearer ${config.token}`, Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) throw new Error('REVIEW_AGE_SCAN_UNAVAILABLE')
    const data = await response.json() as { value?: Inquiry[]; '@odata.nextLink'?: string }
    if (!Array.isArray(data.value)) throw new Error('REVIEW_AGE_SCAN_INVALID')
    for (const row of data.value) {
      const id = row.jm1fnd_submissionid
      const accepted = typeof row.jm1fnd_acceptedutc === 'string' ? new Date(row.jm1fnd_acceptedutc) : new Date(NaN)
      if (typeof id !== 'string' || !guid.test(id) || id === '00000000-0000-0000-0000-000000000000'
        || seen.has(id) || row.jm1fnd_source !== source || row.jm1fnd_reviewstate !== 'PENDING_REVIEW'
        || row._ownerid_value !== config.reviewTeamId || !Number.isFinite(accepted.getTime())
        || accepted < new Date(config.afterUtc) || accepted > config.now) {
        throw new Error('REVIEW_AGE_ROW_INVALID')
      }
      seen.add(id)
      if (config.excludedSubmissionIds.has(id)) continue
      result.eligibleCount += 1
      if (accepted.getTime() <= cutoff) result.agedCount += 1
    }
    next = data['@odata.nextLink']
    if (next) {
      const nextUrl = new URL(next)
      if (nextUrl.origin !== base.origin || nextUrl.pathname !== base.pathname) {
        throw new Error('REVIEW_AGE_NEXTLINK_INVALID')
      }
    }
  }
  if (next) throw new Error('REVIEW_AGE_PAGE_LIMIT')
  return result
}
