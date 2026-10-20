import type { Metadata } from 'next'
import { thanksgiving as event } from '@/lib/thanksgiving'
import ReservationForm from './ReservationForm'
export const metadata: Metadata = { title: `Reserve a Thanksgiving meal box | ${event.organization}`, description: `${event.organization}, in partnership with the Byron Saunders Foundation. One box per household. Pickup ${event.date}, ${event.time}, ${event.address}.` }
export default function ThanksgivingPage() {
  return <><div aria-hidden="true" style={{ height: 96, background: '#1a1025' }} /><section aria-label="Thanksgiving meal reservations" style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem 4rem', color: '#29241f', background: '#fff' }}>
    <p style={{ textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 14 }}>{event.organization}</p>
    <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1, margin: '1rem 0' }}>A Thanksgiving table for your household.</h1>
    <p style={{ fontSize: 20, lineHeight: 1.6 }}>In partnership with the Byron Saunders Foundation, we’re providing Thanksgiving meal boxes for our community. Limited quantities available.</p>
    <section aria-labelledby="box-contents" style={{ margin: '2rem 0', lineHeight: 1.7 }}>
      <h2 id="box-contents" style={{ fontSize: 26, marginBottom: 12 }}>What’s in the box?</h2>
      <p>Each family meal box includes gravy, boxed potatoes, stuffing, candied yams, canned corn, green beans and fruit, cranberry sauce, canned pumpkin, a boxed dessert, roll or muffin mix, and evaporated milk.</p>
      <p style={{ marginTop: 12 }}><strong>Also included: a $20 gift card toward a turkey or a meat of your choice.</strong></p>
    </section>
    <section aria-label="Pickup details" style={{ background: '#f4eadc', borderRadius: 16, padding: 24, margin: '2rem 0' }}>
      <h2 style={{ fontSize: 24, marginBottom: 12 }}>Your pickup</h2>
      <p><strong>{event.date}</strong><br />{event.time}<br />{event.address}</p>
    </section>
    <h2 style={{ fontSize: 26 }}>Reserve one meal box</h2>
    <p style={{ lineHeight: 1.7, margin: '1rem 0' }}>Open to the community, with no geographic or other eligibility restrictions. One box per household, first come, first served. Limited quantities available. Registration closes when all boxes are reserved. Please submit only once for your household. Your confirmation will appear on screen after a successful reservation; save or print it for pickup.</p>
    <ReservationForm />
    <p style={{ marginTop: 24 }}>Need help or need to cancel? Contact <a style={{ textDecoration: 'underline' }} href={`mailto:${event.contact}`}>{event.contact}</a>.</p>
  </section></>
}
