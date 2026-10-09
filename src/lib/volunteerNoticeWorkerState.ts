export type WorkerState = {
  startedAt: number
  lastAttemptAt: number
  lastSuccessAt: number
  lastError: string | null
  running: boolean
  timer?: ReturnType<typeof setInterval>
  acceptedReferences: Set<string>
  reviewAgeStatus: 'clear' | 'aged' | 'failed' | null
  reviewAgeLastSuccessAt: number
  reviewAgeLastError: string | null
}

const globalState = globalThis as typeof globalThis & { jm1FoundationNoticeWorker?: WorkerState }
const healthModuleLoadedAt = Date.now()

export function noticeWorkerState(): WorkerState {
  if (!globalState.jm1FoundationNoticeWorker) {
    globalState.jm1FoundationNoticeWorker = {
      startedAt: Date.now(), lastAttemptAt: 0, lastSuccessAt: 0, lastError: null,
      running: false, acceptedReferences: new Set<string>(),
      reviewAgeStatus: null, reviewAgeLastSuccessAt: 0, reviewAgeLastError: null,
    }
  }
  return globalState.jm1FoundationNoticeWorker
}

export function reviewAgeSignalHealth(): 'disabled' | 'starting' | 'clear' | 'aged' | 'failed' | 'stale' {
  if (process.env.FOUNDATION_REVIEW_AGE_SIGNAL_ENABLED !== 'true') return 'disabled'
  if (process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED !== 'true') return 'failed'
  const state = globalState.jm1FoundationNoticeWorker
  if (!state) return Date.now() - healthModuleLoadedAt < 120000 ? 'starting' : 'stale'
  if (state.reviewAgeLastError) return 'failed'
  if (!state.reviewAgeLastSuccessAt) return Date.now() - state.startedAt < 120000 ? 'starting' : 'stale'
  return Date.now() - state.reviewAgeLastSuccessAt < 600000 ? state.reviewAgeStatus || 'stale' : 'stale'
}

export function noticeWorkerHealth(): 'disabled' | 'starting' | 'ready' | 'failed' | 'stale' {
  if (process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED !== 'true') return 'disabled'
  const state = globalState.jm1FoundationNoticeWorker
  if (!state) return Date.now() - healthModuleLoadedAt < 120000 ? 'starting' : 'stale'
  if (state.lastError) return 'failed'
  if (!state.lastSuccessAt) return Date.now() - state.startedAt < 120000 ? 'starting' : 'stale'
  return Date.now() - state.lastSuccessAt < 600000 ? 'ready' : 'stale'
}
