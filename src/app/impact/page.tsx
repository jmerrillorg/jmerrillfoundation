import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Impact',
  description: 'Real programs, real outcomes. See the work J Merrill Foundation has done in Columbus, Ohio and beyond.',
}

const milestones = [
  {
    year: '2023–Present',
    title: 'Community Table — Thanksgiving Meal Program',
    description: 'In partnership with the Byron Saunders Foundation, we serve a full Thanksgiving meal to families across Columbus — and we have grown every year: 25 families in 2023, 50 in 2024, 75 in 2025. Our 2026 goal is 150.',
    tag: 'Community Service',
    tagColor: '#1A6B3C',
    tagBg: '#D4EDDA',
  },
  {
    year: '2024',
    title: 'Literacy Bridge — ESL Classes Launched',
    description: 'We offered English as a Second Language instruction virtually via Microsoft Teams, serving adult learners across the Columbus metro area. The program is being reactivated in 2025 with expanded capacity.',
    tag: 'Education',
    tagColor: '#1A5276',
    tagBg: '#D6EAF8',
  },
  {
    year: '2023–2024',
    title: "Let Me Tell You About It — Chillicothe 8th Grade Publishing Project",
    description: 'We partnered with an 8th grade class in Chillicothe, Ohio to take students through a full writing and publishing experience. The result: a real, printed book authored by the students themselves. This project is the founding prototype of the Classroom Author Project.',
    tag: 'Signature Program',
    tagColor: '#7B4F00',
    tagBg: '#FFF3CD',
    highlight: true,
  },
  {
    year: '2023–Present',
    title: 'Mid-Ohio Food Bank Partnership',
    description: "Foundation volunteers have served alongside Mid-Ohio Food Bank staff at local food bank stores throughout Columbus, contributing hours to one of the region's most critical food security operations.",
    tag: 'Volunteerism',
    tagColor: '#5C2D91',
    tagBg: '#E8D5F5',
  },
  {
    year: 'Active',
    title: 'Parsons Avenue Reading Station — Charter #154418',
    description: 'A chartered Read In Color Little Free Library on Parsons Avenue serves the Scioto Southland community. Easy access. Diverse and representative children\'s books. Scan the QR code inside to access our digital Story Hour library.',
    tag: 'Physical Infrastructure',
    tagColor: '#1A6B3C',
    tagBg: '#D4EDDA',
  },
  {
    year: 'Active',
    title: 'Byron Saunders Foundation — Ongoing Partnership',
    description: 'Our standing partnership with the Byron Saunders Foundation anchors our Community Table program. Together we coordinate logistics, community outreach, and family identification for the annual Thanksgiving meal service.',
    tag: 'Partnership',
    tagColor: '#5C4A65',
    tagBg: '#F3EBF5',
  },
]

export default function ImpactPage() {
  return (
    <>
      {/* HEADER */}
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>
            Real Work. Real Outcomes.
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '700px' }}>
            Our Impact in<br />
            <em style={{ color: 'var(--secondary)' }}>the Community</em>
          </h1>
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ backgroundColor: 'var(--primary)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
            {[
              { value: '25→50→75', label: 'Families Served', note: '2023 · 2024 · 2025' },
              { value: '150', label: '2026 Goal', note: 'Thanksgiving Families' },
              { value: '1', label: 'Published Book', note: 'Chillicothe Project' },
              { value: '2', label: 'Active Partners', note: 'Byron Saunders, Mid-Ohio' },
              { value: '1', label: 'Reading Station', note: 'Charter #154418' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 600, color: '#FFFFFF' }}>{stat.value}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{stat.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.15rem' }}>{stat.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHILLICOTHE FEATURE */}
      <section style={{ padding: '6rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--dark)',
            borderRadius: '20px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: '50%', height: '100%',
              background: 'linear-gradient(135deg, rgba(147, 50, 158, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3rem', alignItems: 'start' }}>
              {/* Book Cover */}
              <img
                src="/let-me-tell-you-about-it-cover.jpg"
                alt="Let Me Tell You About It — book cover"
                style={{
                  width: '180px',
                  borderRadius: '6px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                  flexShrink: 0,
                }}
              />
              <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#F4B400', backgroundColor: 'rgba(244, 180, 0, 0.15)',
                padding: '0.3rem 0.85rem', borderRadius: '100px',
                display: 'inline-block', marginBottom: '1.5rem',
              }}>⭐ Signature Proof of Model</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                <em>Let Me Tell You About It</em>
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '1rem' }}>
                In partnership with a Chillicothe, Ohio 8th grade class, J Merrill Foundation took students through a complete writing and publishing process. The experience was not a simulation — it was real. The book is real. The students are real authors.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                <em>Let Me Tell You About It</em> is the founding proof point of the Classroom Author Project — our most distinctive and scalable program. This project demonstrates that the Foundation's model works: take students from blank page to published author, one school at a time.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                <a href="https://a.co/d/02Jsp9ek" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block',
                  backgroundColor: '#FF9900',
                  color: '#111111',
                  textDecoration: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}>
                  Buy on Amazon
                </a>
                <a href="https://www.barnesandnoble.com/w/let-me-tell-you-about-it-lisa-clark/1141822693?ean=9781954414983" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.35)',
                }}>
                  Buy on Barnes &amp; Noble
                </a>
              </div>
              <Link href="/classroom-author" style={{
                display: 'inline-block',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '100px',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}>
                Bring This Program to Your School →
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM HISTORY */}
      <section style={{ padding: '4rem 0 6rem', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '3rem' }}>
            Program History
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {milestones.map((m) => (
              <div key={m.title} style={{
                backgroundColor: m.highlight ? 'rgba(147, 50, 158, 0.04)' : '#FFFFFF',
                border: m.highlight ? '1px solid rgba(147, 50, 158, 0.2)' : '1px solid rgba(0,0,0,0.07)',
                borderRadius: '16px',
                padding: '2rem',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '2rem',
                alignItems: 'start',
              }}>
                <div style={{
                  backgroundColor: m.highlight ? 'var(--primary)' : 'var(--surface)',
                  color: m.highlight ? '#FFFFFF' : 'var(--primary)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {m.year}
                </div>
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--dark)' }}>{m.title}</h3>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em',
                      color: m.tagColor, backgroundColor: m.tagBg,
                      padding: '0.2rem 0.65rem', borderRadius: '100px',
                    }}>{m.tag}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S NEXT */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1rem' }}>
            What's Next
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            The Foundation is relaunching in 2026 with the Story Hour Library, expanded Classroom Author Project school partnerships, and a 150-family Thanksgiving goal. Every program is powered by our enterprise Microsoft technology stack.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/programs" style={{
              backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none',
              padding: '0.875rem 2rem', borderRadius: '100px', fontSize: '0.95rem', fontWeight: 500,
            }}>See All Programs</Link>
            <Link href="/donate" style={{
              backgroundColor: 'transparent', color: 'var(--primary)', textDecoration: 'none',
              padding: '0.875rem 2rem', borderRadius: '100px', fontSize: '0.95rem',
              border: '1px solid rgba(147, 50, 158, 0.3)',
            }}>Support the Work</Link>
          </div>
        </div>
      </section>
    </>
  )
}
