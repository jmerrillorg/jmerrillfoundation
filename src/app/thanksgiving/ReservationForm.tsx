"use client"
import { useEffect, useRef, useState } from 'react'
import { thanksgiving as event } from '@/lib/thanksgiving'
const errors: Record<string, string> = { FULL: 'All meal boxes are reserved. Registration is now closed.', DUPLICATE: 'A reservation already exists for this household. Please contact us if you need help with it.', CONFLICT: 'This form changed after submission. Please contact us before submitting again.', INVALID: 'Please check your contact information and household address.', UNAVAILABLE: 'Registration is temporarily unavailable. Please try again shortly.', BUSY: 'Registration is busy. Please try again using this same form.' }
export default function ReservationForm() {
  const [state, setState] = useState('loading')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState('')
  const requestId = useRef('')
  useEffect(() => { requestId.current = crypto.randomUUID(); fetch('/api/thanksgiving', { cache: 'no-store' }).then(r => r.json()).then(v => setState(v.state)).catch(() => setState('unavailable')) }, [])
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy) return
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setBusy(true); setMessage('')
    try {
      const response = await fetch('/api/thanksgiving', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, requestId: requestId.current, householdConsent: data.householdConsent === 'on' }) })
      const body = await response.json()
      if (response.ok && body.reference) { setReference(body.reference); setState('reserved') }
      else { setMessage(errors[body.error] || errors.UNAVAILABLE); if (body.error === 'FULL') setState('full') }
    } catch { setMessage('We could not confirm the result. Please retry this same form so we can check your reservation without reserving another box.') }
    finally { setBusy(false) }
  }
  if (state === 'reserved') return <section role="status" style={{ padding: 24, background: '#e8f2e7', borderRadius: 12 }}><h2>Your meal box is reserved.</h2><p>Save or print this confirmation.</p><p><strong>Reference: {reference}</strong></p><p>{event.date} · {event.time}<br />{event.address}</p><button type="button" onClick={() => window.print()} style={{ textDecoration: 'underline', paddingTop: 16 }}>Print confirmation</button></section>
  if (state !== 'open') return <p role="status" style={{ padding: 24, background: '#f4eadc', borderRadius: 12 }}>{state === 'full' ? errors.FULL : state === 'loading' ? 'Checking availability…' : errors.UNAVAILABLE}</p>
  const fields = [['name', 'Your name', 'text', 'name', 120], ['email', 'Email (email or phone required)', 'email', 'email', 254], ['phone', 'Phone (email or phone required)', 'tel', 'tel', 30], ['address', 'Household street address', 'text', 'address-line1', 180], ['unit', 'Apartment or unit (if applicable)', 'text', 'address-line2', 40], ['city', 'City', 'text', 'address-level2', 100], ['state', 'State', 'text', 'address-level1', 60], ['zip', 'ZIP code', 'text', 'postal-code', 10]] as const
  return <form onSubmit={submit} style={{ display: 'grid', gap: 18 }}>
    <p>Your information is used privately to manage your reservation, avoid duplicate household requests and contact you about pickup. It is not displayed publicly or used to sign you up for marketing.</p>
    <fieldset disabled={busy} style={{ display: 'grid', gap: 18, border: 0, padding: 0 }}>
    {fields.map(([name, label, type, autoComplete, maxLength]) => <label key={name} htmlFor={name} style={{ display: 'grid', gap: 6, fontWeight: 600 }}>{label}<input id={name} name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} required={!['unit', 'email', 'phone'].includes(name)} style={{ border: '1px solid #756b60', borderRadius: 6, padding: 12, fontWeight: 400, background: '#fff', color: '#29241f', width: '100%' }} /></label>)}
    <label style={{ display: 'flex', gap: 10, alignItems: 'start' }}><input type="checkbox" name="householdConsent" required style={{ marginTop: 5 }} /><span>I am requesting one box for my household and have not already reserved one through this sign-up. You may contact me about this reservation.</span></label>
    <button type="submit" style={{ padding: 16, background: '#653e24', color: '#fff', borderRadius: 8, fontWeight: 700 }}>{busy ? 'Reserving your box…' : 'Reserve my meal box'}</button>
    </fieldset>
    <p role="alert">{message}</p>
  </form>
}
