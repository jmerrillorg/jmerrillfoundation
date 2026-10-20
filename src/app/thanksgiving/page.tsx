import type { Metadata } from 'next'
import { thanksgiving as event } from '@/lib/thanksgiving'
import ReservationForm from './ReservationForm'
export const metadata: Metadata = { title: `Reserve a Thanksgiving meal box | ${event.organization}`, description: `${event.organization}, in partnership with the Byron Saunders Foundation. One box per household. Pickup ${event.date}, ${event.time}, ${event.address}.` }
export default function ThanksgivingPage() {
  return <main style={{ maxWidth: 860, margin: '0 auto', padding: '8rem 1.5rem 4rem', color: '#29241f', background: '#fff' }}>
    <p style={{ textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 14 }}>{event.organization}</p>
    <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1, margin: '1rem 0' }}>A Thanksgiving table for your household.</h1>
    <p style={{ fontSize: 20, lineHeight: 1.6 }}>In partnership with the Byron Saunders Foundation, we’re providing {event.capacity} Thanksgiving meal boxes for our community.</p>
    <section aria-label="Pickup details" style={{ background: '#f4eadc', borderRadius: 16, padding: 24, margin: '2rem 0' }}>
      <h2 style={{ fontSize: 24, marginBottom: 12 }}>Your pickup</h2>
      <p><strong>{event.date}</strong><br />{event.time}<br />{event.address}</p>
    </section>
    <h2 style={{ fontSize: 26 }}>Reserve one meal box</h2>
    <p style={{ lineHeight: 1.7, margin: '1rem 0' }}>Open to the community, with no geographic or other eligibility restrictions. One box per household, first come, first served. Registration closes when all {event.capacity} boxes are reserved. This is a local sign-up; you do not need to register again with the Byron Saunders Foundation.</p>
    <ReservationForm />
    <p style={{ marginTop: 24 }}>Need help or need to cancel? Contact <a style={{ textDecoration: 'underline' }} href={`mailto:${event.contact}`}>{event.contact}</a>.</p>
  </main>
}
