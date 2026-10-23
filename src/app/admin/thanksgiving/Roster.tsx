'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { rosterUrlWithoutAuthFragment } from '@/lib/thanksgivingRosterUrl'
import './roster.css'

type Reservation = { name: string; email: string; phone: string; address: string; unit: string; city: string; state: string; zip: string; reference: string; acceptedAt: string }
type Snapshot = { state: 'ready'; refreshedAt: string; capacity: number; accepted: number; remaining: number; reservations: Reservation[] }
type Sort = 'accepted-newest' | 'accepted-oldest' | 'name' | 'reference'

const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/New_York' }).format(new Date(value))

export default function Roster() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'unauthorized' | 'unavailable'>('loading')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('accepted-oldest')
  const refresh = useCallback(async () => {
    setState('loading')
    setSnapshot(null)
    try {
      const response = await fetch('/api/admin/thanksgiving', { cache: 'no-store', credentials: 'same-origin' })
      if (response.status === 403) { setState('unauthorized'); return }
      if (!response.ok) { setState('unavailable'); return }
      const result = await response.json() as Snapshot
      if (result.state !== 'ready' || !Array.isArray(result.reservations)) { setState('unavailable'); return }
      setSnapshot(result)
      setState('ready')
    } catch { setState('unavailable') }
  }, [])
  useEffect(() => {
    const cleanUrl = rosterUrlWithoutAuthFragment(window.location.hash, window.location.pathname, window.location.search)
    if (cleanUrl) window.history.replaceState(window.history.state, '', cleanUrl)
    void refresh()
  }, [refresh])

  const visible = useMemo(() => {
    const term = query.trim().toLocaleLowerCase()
    return (snapshot?.reservations || []).filter(item => !term || [item.name, item.email, item.phone, item.address, item.unit, item.zip, item.reference].some(value => value?.toLocaleLowerCase().includes(term))).sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name) || a.acceptedAt.localeCompare(b.acceptedAt)
      if (sort === 'reference') return a.reference.localeCompare(b.reference)
      return sort === 'accepted-newest' ? b.acceptedAt.localeCompare(a.acceptedAt) : a.acceptedAt.localeCompare(b.acceptedAt)
    })
  }, [snapshot, query, sort])

  return <section className="roster" aria-label="Private Thanksgiving reservation roster">
    <div className="roster-heading">
      <div><p className="roster-eyebrow">J Merrill Foundation / private operations</p><h1>Thanksgiving reservations</h1><p className="roster-event">Friday, November 20, 2026 · 4–7 p.m. · 434 Hillpine Dr., Columbus, OH 43207</p></div>
      <div className="roster-actions"><button type="button" onClick={() => void refresh()} disabled={state === 'loading'}>Refresh</button><button type="button" onClick={() => window.print()} disabled={state !== 'ready'}>Print list</button></div>
    </div>
    {state === 'loading' && <p role="status" className="roster-notice">Loading the private reservation ledger…</p>}
    {state === 'unauthorized' && <div role="alert" className="roster-notice"><strong>Private roster unavailable.</strong> Sign in with the authorized Foundation administrator account. <a href="/.auth/login/aad?post_login_redirect_uri=%2Fadmin%2Fthanksgiving">Sign in</a></div>}
    {state === 'unavailable' && <div role="alert" className="roster-notice"><strong>Current reservations unavailable.</strong> No prior count is shown because it may be stale. Try Refresh; if the problem continues, check Foundation operations alerts and the private ledger.</div>}
    {snapshot && state === 'ready' && <>
      <div className="roster-summary" aria-label="Current capacity"><div><strong>{snapshot.accepted}</strong><span>Accepted reservations</span></div><div><strong>{snapshot.remaining}</strong><span>Boxes remaining of {snapshot.capacity}</span></div><p>Refreshed {formatDate(snapshot.refreshedAt)} ET<br />Reservations only; pickup has not been recorded.</p></div>
      <div className="roster-controls"><label>Search households<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Name, contact, address, or reference" /></label><label>Sort by<select value={sort} onChange={event => setSort(event.target.value as Sort)}><option value="accepted-oldest">Acceptance date: oldest</option><option value="accepted-newest">Acceptance date: newest</option><option value="name">Household name</option><option value="reference">Reservation reference</option></select></label><p aria-live="polite">Showing {visible.length} of {snapshot.accepted}</p></div>
      <div className="roster-list">{visible.map(item => <article className="roster-row" key={item.reference}><div className="roster-person"><h2>{item.name}</h2><p>{item.address}{item.unit ? `, ${item.unit}` : ''}<br />{item.city}, {item.state} {item.zip}</p></div><div className="roster-contact"><span>Contact</span><p>{item.phone || 'No phone'}<br />{item.email || 'No email'}</p></div><div className="roster-reference"><span>Reference</span><p>{item.reference}</p><span>Accepted</span><p>{formatDate(item.acceptedAt)} ET</p></div></article>)}</div>
      {visible.length === 0 && <p className="roster-empty">No reservations match this search.</p>}
    </>}
  </section>
}
