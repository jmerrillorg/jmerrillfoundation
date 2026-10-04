'use client'

import { FormEvent, useState } from 'react'

const submissionKey = 'jm1fnd-volunteer-submission-id'

export default function VolunteerForm({ privacyNoticeUrl }: { privacyNoticeUrl: string }) {
  const [busy, setBusy] = useState(false)
  const [referenceId, setReferenceId] = useState('')
  const [pendingReferenceId, setPendingReferenceId] = useState('')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    const form = event.currentTarget
    const values = new FormData(form)
    let submissionId = sessionStorage.getItem(submissionKey)
    if (!submissionId) {
      submissionId = crypto.randomUUID()
      sessionStorage.setItem(submissionKey, submissionId)
    }
    try {
      const response = await fetch('/api/volunteer-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          firstName: values.get('firstName'),
          lastName: values.get('lastName'),
          email: values.get('email'),
          interest: values.get('interest'),
          message: values.get('message'),
          responseConsent: values.get('responseConsent') === 'on',
          marketingOptIn: values.get('marketingOptIn') === 'on',
        }),
      })
      const result = await response.json() as { success?: boolean; referenceId?: string; message?: string }
      if (!response.ok || !result.success || !result.referenceId) {
        if (result.referenceId) setPendingReferenceId(result.referenceId)
        throw new Error(result.message || 'We cannot receive this request right now. Please email the Foundation.')
      }
      sessionStorage.removeItem(submissionKey)
      setPendingReferenceId('')
      setReferenceId(result.referenceId)
      form.reset()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'We cannot receive this request right now. Please email the Foundation.')
    } finally {
      setBusy(false)
    }
  }

  if (referenceId) {
    return <div role="status" style={{ lineHeight: 1.6 }}>
      <p>Thank you. Your inquiry was received.</p>
      <p>Reference: <strong>{referenceId}</strong></p>
      <p>The Foundation team will review it. This confirmation does not mean a volunteer placement has been made.</p>
    </div>
  }

  const field = { display: 'block', width: '100%', minHeight: '44px', padding: '0.65rem', marginTop: '0.35rem', border: '1px solid #8B8290', borderRadius: '4px', font: 'inherit' }
  const label = { display: 'block', fontSize: '0.9rem', color: 'var(--dark)', marginBottom: '1rem' }
  return <form onSubmit={submit}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
      <label style={label}>First name <input name="firstName" autoComplete="given-name" required maxLength={80} style={field} /></label>
      <label style={label}>Last name <input name="lastName" autoComplete="family-name" required maxLength={80} style={field} /></label>
    </div>
    <label style={label}>Email <input name="email" type="email" autoComplete="email" required maxLength={254} style={field} /></label>
    <label style={label}>I am interested in
      <select name="interest" required defaultValue="" style={field}>
        <option value="" disabled>Select an opportunity</option>
        <option value="volunteer">Volunteering</option>
        <option value="board">Board service</option>
        <option value="school">School partnership</option>
        <option value="story-hour">Story Hour</option>
        <option value="reading-station">Reading Station</option>
        <option value="partner">Community partnership</option>
        <option value="other">Other Foundation inquiry</option>
      </select>
    </label>
    <label style={label}>Anything else we should know? <textarea name="message" maxLength={700} rows={4} style={{ ...field, resize: 'vertical' }} /></label>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
      We use the name and email you provide to respond to this inquiry. See the <a href={privacyNoticeUrl}>Foundation privacy notice</a>. Do not include sensitive personal details.
    </p>
    <label style={{ ...label, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
      <input type="checkbox" name="responseConsent" required style={{ marginTop: '0.2rem' }} />
      <span>I agree that J Merrill Foundation may contact me about this inquiry.</span>
    </label>
    <label style={{ ...label, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
      <input type="checkbox" name="marketingOptIn" style={{ marginTop: '0.2rem' }} />
      <span>I would also like optional updates about Foundation programs and events.</span>
    </label>
    {error && <p role="alert" style={{ color: '#9D2626', marginBottom: '1rem' }}>{error} {pendingReferenceId && <span>Reference: <strong>{pendingReferenceId}</strong>. </span>}<a href="mailto:foundation@jmerrill.one">Email the Foundation</a>.</p>}
    <button type="submit" disabled={busy} style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', padding: '0.85rem 1.25rem', border: 0, borderRadius: '4px', cursor: busy ? 'wait' : 'pointer', font: 'inherit', fontWeight: 600 }}>
      {busy ? 'Sending...' : 'Send inquiry'}
    </button>
  </form>
}
