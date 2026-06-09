import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Programs',
  description: 'J Merrill Foundation programs connect reading, writing, digital access, language access, and family support as forms of literacy and community dignity.',
}

export default function ProgramsPage() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>What We Do</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '650px' }}>
            Programs Built for<br /><em style={{ color: 'var(--secondary)' }}>Every Form of Literacy</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '620px', lineHeight: 1.7, marginTop: '1.5rem' }}>
            Reading, writing, digital access, language access, and family support are connected. Our programs meet people at those intersections so literacy can become confidence, authorship, and practical access.
          </p>
        </div>
      </section>

      {/* Community Table */}
      <section id="community-table" style={{ padding: '5rem 0', backgroundColor: '#FAFAFA', scrollMarginTop: '80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#1A6B3C', backgroundColor: '#D4EDDA', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>Active</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#5C4A65', backgroundColor: '#F3EBF5', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>Community Service</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.15, marginBottom: '1.25rem' }}>🍽 Community Table</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Our flagship community service program. Each year, J Merrill Foundation partners with the Byron Saunders Foundation to provide a full Thanksgiving meal to families across Columbus, Ohio.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                We have grown from 25 families in 2023 to 50 in 2024 and 75 in 2025. Our 2026 goal is 150 families. Every family receiving a meal also receives literacy resources — a book, a reading guide, or access to our Story Hour library.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary)', fontWeight: 600 }}>75</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Families served, 2025</div></div>
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary)', fontWeight: 600 }}>150</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2026 goal</div></div>
              </div>
              <Link href="/volunteer" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '0.75rem 1.75rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 500 }}>
                Volunteer for Community Table
              </Link>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', borderRadius: '16px', padding: '2.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '1rem' }}>Program Details</h4>
              {[
                { label: 'Partner', value: 'Byron Saunders Foundation' },
                { label: 'Frequency', value: 'Annual — Thanksgiving' },
                { label: 'Location', value: 'Columbus, Ohio' },
                { label: '2025 Served', value: '75 families' },
                { label: '2026 Goal', value: '150 families' },
                { label: 'Literacy Add-On', value: 'Book in every bag' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid rgba(147, 50, 158, 0.1)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--dark)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Literacy Bridge */}
      <section id="literacy-bridge" style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', scrollMarginTop: '80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'var(--dark)', borderRadius: '16px', padding: '2.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '1.25rem' }}>Program Details</h4>
              {[
                { label: 'Status', value: 'Relaunching 2026' },
                { label: 'Delivery', value: 'Virtual instruction' },
                { label: 'Target', value: 'Adult ESL learners' },
                { label: 'Last Active', value: '2024' },
                { label: 'Instructor Need', value: 'Certified ESL instructor' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>{item.label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#FFFFFF' }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#1A5276', backgroundColor: '#D6EAF8', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>Relaunching</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#5C4A65', backgroundColor: '#F3EBF5', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>ESL</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.15, marginBottom: '1.25rem' }}>🌐 Literacy Bridge</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                English as a Second Language instruction delivered virtually for adult learners across the Columbus metro. We offered ESL classes in 2024, and Literacy Bridge is being relaunched in 2026 with a dedicated instructor and a regular weekly schedule.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Our relationship with Agape International Cathedral helps connect this program with multilingual community members, alongside broader outreach to non-native English speakers across Columbus.
              </p>
              <Link href="/volunteer" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '0.75rem 1.75rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 500 }}>
                Volunteer as ESL Instructor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DigiReady */}
      <section id="digiready" style={{ padding: '5rem 0', backgroundColor: '#FAFAFA', scrollMarginTop: '80px' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#5C4A65', backgroundColor: '#F3EBF5', padding: '0.25rem 0.75rem', borderRadius: '100px', display: 'inline-block', marginBottom: '1.5rem' }}>Coming 2026</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.15, marginBottom: '1.25rem' }}>💻 DigiReady</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
            Digital literacy workshops for community members who need confidence with everyday technology. Computer basics, common productivity tools, job readiness, online forms, and practical digital independence are the heart of the program.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
            DigiReady is being designed to give community learners patient, practical support with the tools many jobs, schools, and public services now expect people to use.
          </p>
          <Link href="/volunteer" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '0.75rem 1.75rem', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 500 }}>
            Express Interest
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--primary)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#FFFFFF', fontWeight: 500, marginBottom: '0.4rem' }}>See our full program impact.</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Chillicothe. Thanksgiving. Mid-Ohio Food Bank. It all started here.</p>
          </div>
          <Link href="/impact" style={{ backgroundColor: '#FFFFFF', color: 'var(--primary)', textDecoration: 'none', padding: '0.875rem 2.25rem', borderRadius: '100px', fontSize: '0.95rem', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
            Our Impact
          </Link>
        </div>
      </section>
    </>
  )
}
