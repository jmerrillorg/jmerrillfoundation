import { ManagedIdentityCredential } from '@azure/identity'
import { reconcileVolunteerNotices } from '@/lib/volunteerNoticeReconciler'
import { noticeWorkerState } from '@/lib/volunteerNoticeWorkerState'
import { sendVolunteerNotice, VOLUNTEER_RELAY_AUDIENCE } from '@/lib/volunteerNotice'

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs' || process.env.FOUNDATION_NOTICE_RECONCILE_ENABLED !== 'true') return
  const state = noticeWorkerState()
  if (state.timer) return

  async function run() {
    if (state.running) return
    state.running = true
    state.lastAttemptAt = Date.now()
    try {
      const dataverseUrl = process.env.FOUNDATION_DATAVERSE_URL || ''
      if (process.env.FOUNDATION_RELAY_ENABLED !== 'true' || !process.env.FOUNDATION_NOTICE_RECONCILE_AFTER_UTC) {
        throw new Error('RECONCILER_CONFIG_INVALID')
      }
      const credential = new ManagedIdentityCredential()
      const receiptToken = await credential.getToken(`${dataverseUrl}/.default`)
      const relayToken = await credential.getToken(VOLUNTEER_RELAY_AUDIENCE)
      if (!receiptToken?.token || !relayToken?.token) throw new Error('RECONCILER_AUTH_UNAVAILABLE')
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
      state.lastError = error instanceof Error && error.message.startsWith('RECONCILER_') ? error.message : 'RECONCILER_UNAVAILABLE'
      console.error('Foundation notice reconciliation unavailable', state.lastError)
    } finally {
      state.running = false
    }
  }

  state.timer = setInterval(run, 60000)
  void run()
}
