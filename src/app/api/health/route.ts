import { NextResponse } from 'next/server'
import { noticeWorkerHealth } from '@/lib/volunteerNoticeWorkerState'

export const dynamic = 'force-dynamic'

export function GET() {
  const noticeReconciliation = noticeWorkerHealth()
  const ready = noticeReconciliation === 'disabled' || noticeReconciliation === 'starting' || noticeReconciliation === 'ready'
  return NextResponse.json({
    ok: ready,
    service: 'jmerrill-foundation',
    environment: process.env.JM1_SLOT_ENVIRONMENT || 'production',
    health: ready ? 'ready' : 'degraded',
    release_sha: process.env.JM1_RELEASE_SHA || 'unknown',
    runtime: 'app-service',
    notice_reconciliation: noticeReconciliation,
  }, { status: ready ? 200 : 503 })
}
