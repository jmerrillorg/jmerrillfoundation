import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story of J Merrill Foundation Inc. — a Columbus nonprofit advancing literacy, dignity, authorship, and community access.',
}

export default function AboutPage() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>Our Story</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '700px' }}>
            Built for This Moment —<br />
            <em style={{ color: 'var(--secondary)' }}>Where Literacy, Dignity, and Community Meet.</em>
          </h1>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1.5rem' }}>
            Mission Statement
          </h2>
          <div style={{ backgroundColor: 'var(--primary)', borderRadius: '16px', padding: '2.5rem', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: '#FFFFFF', fontStyle: 'italic', lineHeight: 1.6 }}>
              "J Merrill Foundation Inc. exists to advance literacy in all its forms — reading, writing, digital, and financial — by equipping individuals and communities with the resources, relationships, and technology to tell their stories and transform their futures."
            </p>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1.25rem' }}>
            Founding Story
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            J Merrill Foundation was founded by Jackie Smith Jr. to help people and communities access the tools, relationships, and encouragement that literacy makes possible. From the beginning, the Foundation was designed to serve more than one program or moment. Literacy, in all its forms, was the anchor.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            The Foundation's earliest programming began with the Thanksgiving meal program in partnership with the Byron Saunders Foundation, grew to include ESL classes and Mid-Ohio Food Bank volunteering, and reached its highest expression with the Chillicothe 8th Grade publishing project — where students became published authors.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '3rem' }}>
            Through board changes and the disruption of COVID-19, the Foundation paused. In 2026, it is active again — not as a restart, but as a maturation. The programs are proven. The stewardship systems are in place. The mission is clearer than ever.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1.25rem' }}>
            How J Merrill One Supports the Work
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            The Foundation is supported by the broader J Merrill One ecosystem, which includes publishing, financial education, media, and faith-community relationships. That support gives the Foundation access to practical experience, creative capacity, and community relationships without making the ecosystem the center of the mission.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
            The Foundation also uses professional nonprofit tools to coordinate programs, keep records, support reporting, and steward community trust responsibly. Technology matters here because it helps the work stay organized, accountable, and ready to grow.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Organization Type', value: '501(c)(3) Nonprofit' },
              { label: 'Founded', value: 'Columbus, Ohio' },
              { label: 'Support Context', value: 'J Merrill One' },
              { label: 'Stewardship Tools', value: 'Nonprofit technology systems' },
              { label: 'Little Free Library', value: 'Charter #154418' },
              { label: 'Contact', value: 'foundation@jmerrill.one' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(147, 50, 158, 0.1)', borderRadius: '10px', padding: '1.25rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>{item.label}</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--dark)' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--dark)' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: '#FFFFFF', marginBottom: '2.5rem' }}>
            Leadership
          </h2>
          <div style={{ backgroundColor: 'rgba(147, 50, 158, 0.12)', border: '1px solid rgba(147, 50, 158, 0.25)', borderRadius: '16px', padding: '2.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', flexShrink: 0 }}>JS</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#FFFFFF', fontWeight: 500, marginBottom: '0.25rem' }}>Jackie Smith Jr.</h3>
              <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>Founder & CEO, J Merrill Foundation Inc. | Founder & CEO, J Merrill One</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                Jackie founded J Merrill Foundation to carry the community mission of J Merrill One into direct literacy work. He built the Foundation's operating systems from the ground up and now leads its 2026 relaunch. The Foundation's board is currently being rebuilt and expanded to reflect the community it serves.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>Board seats are open. We are building the governance team now.</p>
            <Link href="/board" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '0.875rem 2rem', borderRadius: '100px', fontSize: '0.95rem', fontWeight: 500 }}>
              See Open Board Seats
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
