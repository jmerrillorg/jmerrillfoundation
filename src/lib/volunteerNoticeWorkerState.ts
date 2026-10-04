export type WorkerState = {
  startedAt: number
  lastAttemptAt: number
  lastSuccessAt: number
  lastError: string | null
  running: boolean
  timer?: ReturnType<typeof setInterval>
  acceptedReferences: Set<string>
}

const globalState = globalThis as typeof globalThis & { jm1FoundationNoticeWorker?: WorkerState }
const healthModuleLoadedAt = Date.now()

export function noticeWorkerState(): WorkerState {
  if (!globalState.jm1FoundationNoticeWorker) {
    globalState.jm1FoundationNoticeWorker = {
      startedAt: Date.now(), lastAttemptAt: 0, lastSuccessAt: 0, lastError: null,
      running: false, acceptedReferences: new Set<string>(),
    }
  }
  return globalState.jm1FoundationNoticeWorker
}

export function noticeWorkerHealth(): 'disabled' | 'starting' | 'ready' | 'failed' | 'stale' {
  if (process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED !== 'true') return 'disabled'
  const state = globalState.jm1FoundationNoticeWorker
  if (!state) return Date.now() - healthModuleLoadedAt < 120000 ? 'starting' : 'stale'
  if (state.lastError) return 'failed'
  if (!state.lastSuccessAt) return Date.now() - state.startedAt < 120000 ? 'starting' : 'stale'
  return Date.now() - state.lastSuccessAt < 600000 ? 'ready' : 'stale'
}
