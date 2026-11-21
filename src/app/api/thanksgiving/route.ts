export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const headers = { 'Cache-Control': 'no-store' }

export function GET() {
  return Response.json({ state: 'closed' }, { headers })
}

export function POST() {
  return Response.json({ error: 'CLOSED' }, { status: 410, headers })
}
