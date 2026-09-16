import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json({
    ok: true,
    service: 'jmerrill-foundation',
    environment: process.env.JM1_SLOT_ENVIRONMENT || 'production',
    health: 'ready',
    release_sha: process.env.JM1_RELEASE_SHA || 'unknown',
    runtime: 'app-service',
  })
}
