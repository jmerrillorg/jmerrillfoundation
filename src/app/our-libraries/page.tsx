import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Reading Stations',
  description: 'J Merrill Foundation Read In Color Little Free Library network. Find a Reading Station near you in Columbus, Ohio.',
}

export default function OurLibrariesPage() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>Physical Community Infrastructure</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '700px', marginBottom: '1.5rem' }}>
            Reading Stations —<br />
            <em style={{ color: 'var(--secondary)' }}>Free Books, Always.</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', lineHeight: 1.7 }}>
            A chartered network of Read In Color Little Free Libraries embedded in Columbus communities. Books are always free. Always representative. Always available.
          </p>
        </div>
      </section>

      {/* FEATURED STATION */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#1A6B3C', backgroundColor: '#D4EDDA', padding: '0.25rem 0.75rem', borderRadius: '100px', display: 'inline-block', marginBottom: '1.25rem' }}>Active Station</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.2, marginBottom: '1rem' }}>
                Parsons Avenue Reading Station
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Located on Parsons Avenue in Columbus's Scioto Southland neighborhood, this is the Foundation's first chartered Little Free Library. It holds the Read In Color designation — meaning every book in the box represents diverse voices, backgrounds, and communities.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Inside the box, you will find a QR code that links directly to our Story Hour digital library — connecting the physical book in your hands to a video of someone reading it aloud. No account required.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Charter Number', value: '#154418' },
                  { label: 'Location', value: 'Columbus, OH' },
                  { label: 'Neighborhood', value: 'Scioto Southland' },
                  { label: 'Designation', value: 'Read In Color' },
                  { label: 'Access Type', value: 'Easy Access' },
                  { label: 'QR Bridge', value: 'Story Hour Library' },
                ].map(item => (
                  <div key={item.label} style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(147, 50, 158, 0.1)', borderRadius: '10px', padding: '1rem' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{item.label}</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--dark)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--dark)', borderRadius: '20px', padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📚</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#FFFFFF', fontWeight: 500, marginBottom: '0.75rem' }}>
                Find the QR Code Inside
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Every Reading Station has a weatherproof QR code placard. Scan it to access our free Story Hour digital reading library — no account, no sign-up required.
              </p>
              <Link href="/story-hour" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '0.75rem 1.75rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 500 }}>
                Visit Story Hour Library
              </Link>
            </div>
          </div>

          {/* BECOME A STEWARD */}
          <div style={{ backgroundColor: 'var(--surface)', borderRadius: '16px', padding: '2.5rem', maxWidth: '700px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '0.75rem' }}>
              Sponsor a Restock
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Our Reading Stations run on community support. Sponsor a monthly restock of the Parsons Avenue station and keep diverse, representative books in the hands of Columbus families. Every donation funds books, not overhead.
            </p>
            <Link href="/donate" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '0.75rem 1.75rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 500 }}>
              Sponsor a Restock
            </Link>
          </div>
        </div>
      </section>

      {/* EXPANSION */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1rem' }}>
            Expanding the Network
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Phase 2 of our Reading Station program brings new stations to sites near Agape International Cathedral, Chillicothe (our Classroom Author Project partner school), Mid-Ohio Food Bank volunteer sites, and re-entry transitional housing in Franklin County.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Each new station is charter-registered, QR-enabled, and tracked in our Dataverse system. Impact data feeds directly into our board governance dashboard and grant reporting.
          </p>
          <Link href="/volunteer" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '0.875rem 2rem', borderRadius: '100px', fontSize: '0.95rem', fontWeight: 500 }}>
            Request a Station for Your Community
          </Link>
        </div>
      </section>
    </>
  )
}
