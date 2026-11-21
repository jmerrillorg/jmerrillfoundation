import Image from 'next/image'
import type { Metadata } from 'next'
import { thanksgiving as event } from '@/lib/thanksgiving'
export const metadata: Metadata = {
  title: '2026 Thanksgiving meal box reservations closed | ' + event.organization,
  description: '2026 Thanksgiving meal box reservations are closed.',
}
export default function ThanksgivingPage() {
  return <><div aria-hidden="true" style={{ height: 96, background: '#1a1025' }} /><section aria-label="Thanksgiving meal reservations" style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem 4rem', color: '#29241f', background: '#fff' }}>
    <p style={{ textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 14 }}>{event.organization}</p>
    <Image src="/thanksgiving-2026-header.png" alt="A welcoming Thanksgiving table with autumn flowers, a roast turkey and traditional sides" width={2164} height={727} priority sizes="(max-width: 860px) 100vw, 812px" style={{ width: '100%', height: 'auto', borderRadius: 16, marginTop: 20, marginBottom: 24 }} />
    <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1, margin: '1rem 0' }}>2026 Thanksgiving meal box reservations are closed.</h1>
    <p style={{ fontSize: 20, lineHeight: 1.6 }}>Thank you to our volunteers and the Byron Saunders Foundation for helping us serve our community.</p>
    <p style={{ marginTop: 24 }}>Questions about the event? Contact <a style={{ textDecoration: 'underline' }} href={'mailto:' + event.contact}>{event.contact}</a>.</p>
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
