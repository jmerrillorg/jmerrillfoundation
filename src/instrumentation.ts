import { ManagedIdentityCredential } from '@azure/identity'
import { reconcileVolunteerNotices } from '@/lib/volunteerNoticeReconciler'
import { noticeWorkerState } from '@/lib/volunteerNoticeWorkerState'
import { sendVolunteerNotice, VOLUNTEER_RELAY_AUDIENCE } from '@/lib/volunteerNotice'
import { reviewAgePolicyFromEnv, reviewAgeSignalEvent, scanVolunteerReviewAge } from '@/lib/volunteerReviewAge'
import { reviewAgeFailureReason, trackReviewAgeSignal } from '@/lib/reviewAgeTelemetry'

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs' || process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED !== 'true') return
  const state = noticeWorkerState()
  if (state.timer) return

  async function run() {
    if (state.running) return
    state.running = true
    state.lastAttemptAt = Date.now()
    const ageEnabled = process.env.FOUNDATION_REVIEW_AGE_SIGNAL_ENABLED === 'true'
    let ageAttempted = false
    async function failReviewAge(error: unknown) {
      state.reviewAgeStatus = 'failed'
      state.reviewAgeLastError = reviewAgeFailureReason(error)
      const signal = { status: 'failed' as const, reason: state.reviewAgeLastError }
      try { await trackReviewAgeSignal(signal) } catch { /* Missing heartbeat is the transport-failure alert. */ }
      console.error('FND_REVIEW_AGE_SIGNAL', JSON.stringify(signal))
    }
    try {
      const dataverseUrl = process.env.FOUNDATION_DATAVERSE_URL || ''
      if (process.env.FOUNDATION_RELAY_ENABLED !== 'true' || !process.env.FOUNDATION_NOTICE_RECONCILE_AFTER_UTC) {
        throw new Error('RECONCILER_CONFIG_INVALID')
      }
      const credential = new ManagedIdentityCredential()
      const receiptToken = await credential.getToken(`${dataverseUrl}/.default`)
      if (!receiptToken?.token) throw new Error('RECONCILER_AUTH_UNAVAILABLE')
      if (ageEnabled) {
        ageAttempted = true
        try {
          const policy = reviewAgePolicyFromEnv(process.env)
          const result = await scanVolunteerReviewAge({
            dataverseUrl,
            reviewTeamId: process.env.FOUNDATION_REVIEW_TEAM_ID || '',
            token: receiptToken.token,
            ...policy,
            now: new Date(),
          })
          state.reviewAgeStatus = result.agedCount ? 'aged' : 'clear'
          state.reviewAgeLastSuccessAt = Date.now()
          state.reviewAgeLastError = null
          const signal = reviewAgeSignalEvent(result)
          await trackReviewAgeSignal(signal)
          console.warn('FND_REVIEW_AGE_SIGNAL', JSON.stringify(signal))
        } catch (error) {
          await failReviewAge(error)
        }
      }
      const relayToken = await credential.getToken(VOLUNTEER_RELAY_AUDIENCE)
      if (!relayToken?.token) throw new Error('RECONCILER_AUTH_UNAVAILABLE')
      const result = await reconcileVolunteerNotices({
        dataverseUrl,
        reviewTeamId: process.env.FOUNDATION_REVIEW_TEAM_ID || '',
        afterUtc: process.env.FOUNDATION_NOTICE_RECONCILE_AFTER_UTC,
        token: receiptToken.token,
        acceptedReferences: state.acceptedReferences,
        send: (referenceId) => sendVolunteerNotice(referenceId, relayToken.token),
      })
      if (result.failedReferences.length) {
        console.error('Foundation notice reconciliation failed references', result.failedReferences.join(','))
        throw new Error('RECONCILER_NOTICES_UNAVAILABLE')
      }
      if (state.acceptedReferences.size > 2000) state.acceptedReferences.clear()
      state.lastSuccessAt = Date.now()
      state.lastError = null
    } catch (error) {
      if (ageEnabled && !ageAttempted) {
        await failReviewAge(error)
      }
      state.lastError = error instanceof Error && error.message.startsWith('RECONCILER_') ? error.message : 'RECONCILER_UNAVAILABLE'
      console.error('Foundation notice reconciliation unavailable', state.lastError)
    } finally {
      state.running = false
    }
  }

  state.timer = setInterval(run, 60000)
  void run()
}
