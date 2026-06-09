import Link from 'next/link'
import type { Metadata } from 'next'
import ProgramCards from '@/components/ProgramCards'

export const metadata: Metadata = {
  title: 'J Merrill Foundation Inc. — Literacy. Community. Transformation.',
}

const impactStats = [
  { value: '75+', label: 'Families Served', sub: 'Thanksgiving 2025' },
  { value: '150', label: 'Family Goal', sub: 'Thanksgiving 2026' },
  { value: '1', label: 'Published Book', sub: 'Chillicothe 8th Grade' },
  { value: '1', label: 'Reading Station', sub: 'Charter #154418' },
]

const programs = [
  {
    title: 'Community Table',
    tag: 'Active',
    tagColor: '#1A6B3C',
    tagBg: '#D4EDDA',
    description: 'Our flagship community service program. In partnership with the Byron Saunders Foundation, we serve Thanksgiving meals to families across Columbus. 25 families in 2023, 50 in 2024, 75 in 2025. Our 2026 goal: 150.',
    icon: '🍽',
    href: '/programs#community-table',
  },
  {
    title: 'Story Hour Library',
    tag: 'In Development',
    tagColor: '#5C2D91',
    tagBg: '#E8D5F5',
    description: 'A free digital reading library in development for 2026 where volunteers read children\'s books on screen. Children will be able to access the library anytime. Community voices, reading to community children.',
    icon: '📖',
    href: '/story-hour',
  },
  {
    title: 'Classroom Author Project',
    tag: 'Signature',
    tagColor: '#7B4F00',
    tagBg: '#FFF3CD',
    description: 'Our most distinctive program. We partner with schools to take students from blank page to published author. The Chillicothe 8th Grade class proved it works — their book is real, printed, and in the world.',
    icon: '✍',
    href: '/classroom-author',
  },
  {
    title: 'Reading Stations',
    tag: 'Active',
    tagColor: '#1A6B3C',
    tagBg: '#D4EDDA',
    description: 'A chartered network of Read In Color Little Free Libraries embedded in Columbus communities. Charter #154418 is live. Scan the QR code inside to access our digital Story Hour library.',
    icon: '📚',
    href: '/our-libraries',
  },
  {
    title: 'Literacy Bridge',
    tag: 'Relaunching',
    tagColor: '#1A5276',
    tagBg: '#D6EAF8',
    description: 'ESL instruction offered virtually for adult learners. We offered classes in 2024, and Literacy Bridge is being relaunched in 2026 with a dedicated instructor and a weekly schedule.',
    icon: '🌐',
    href: '/programs#literacy-bridge',
  },
  {
    title: 'DigiReady',
    tag: 'Coming 2026',
    tagColor: '#5C4A65',
    tagBg: '#F3EBF5',
    description: 'Digital literacy workshops for community members who need confidence with everyday tools, job readiness, online access, and practical technology skills.',
    icon: '💻',
    href: '/programs#digiready',
  },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        backgroundColor: 'var(--dark)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '6rem',
      }}>
        {/* Background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(147, 50, 158, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(163, 196, 220, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(203, 170, 203, 0.06) 0%, transparent 50%)
          `,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '780px' }}>

            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'rgba(147, 50, 158, 0.2)',
              border: '1px solid rgba(147, 50, 158, 0.4)',
              borderRadius: '100px', padding: '0.35rem 1rem',
              marginBottom: '2rem',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--secondary)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 400 }}>
                Columbus, Ohio · Community Literacy Initiative
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 500,
              color: '#FFFFFF',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}>
              Literacy is not just reading words.
              <br />
              <em style={{ color: 'var(--secondary)', fontStyle: 'italic' }}>It is reading the world.</em>
            </h1>

            {/* Sub */}
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '580px',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontWeight: 300,
            }}>
              J Merrill Foundation Inc. equips individuals and communities with the resources, relationships, and technology to tell their stories and transform their futures.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
              <Link href="/volunteer" style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.875rem 2rem',
                borderRadius: '100px',
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'all 0.2s',
                display: 'inline-block',
              }}>
                Get Involved
              </Link>
              <Link href="/impact" style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.875rem 2rem',
                borderRadius: '100px',
                fontSize: '0.95rem',
                fontWeight: 400,
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'all 0.2s',
                display: 'inline-block',
              }}>
                See Our Impact
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', maxWidth: '600px' }}>
              {impactStats.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', marginTop: '0.25rem', fontWeight: 500 }}>{stat.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.1rem' }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION STRIP */}
      <section style={{ backgroundColor: 'var(--primary)', padding: '3rem 0' }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.5,
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            "J Merrill Foundation Inc. exists to advance literacy in all its forms — equipping individuals and communities with the resources, relationships, and technology to tell their stories and transform their futures."
          </p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section style={{ padding: '6rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 500 }}>What We Do</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.15 }}>
              Programs Built for<br />
              <em style={{ color: 'var(--primary)' }}>Real Community Impact</em>
            </h2>
          </div>

          <ProgramCards programs={programs} />
        </div>
      </section>

      {/* CHILLICOTHE STORY */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '40%', height: '100%',
          background: 'linear-gradient(135deg, rgba(147, 50, 158, 0.15) 0%, transparent 70%)',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>
                Signature Proof of Model
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                <em>Let Me Tell You About It</em> —<br />
                <span style={{ color: 'var(--secondary)' }}>From Students to Published Authors</span>
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                We partnered with Chillicothe, Ohio's 8th grade class — not to teach them about writing, but to make them authors. The result was a real, published book that carries their voices into the world.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '2rem' }}>
                That project is not just history. It is the prototype for the Classroom Author Project — a repeatable, fundable model we are bringing to schools across Ohio.
              </p>
              <Link href="/classroom-author" style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: 'var(--secondary)',
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '100px',
                fontSize: '0.9rem',
                border: '1px solid rgba(203, 170, 203, 0.4)',
                transition: 'all 0.2s',
              }}>
                Learn About the Program →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Book Cover */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src="/let-me-tell-you-about-it-cover.jpg"
                  alt="Let Me Tell You About It — book cover"
                  style={{
                    width: '100%',
                    maxWidth: '280px',
                    borderRadius: '8px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                />
              </div>
              {/* Quote */}
              <div style={{
                backgroundColor: 'rgba(147, 50, 158, 0.12)',
                border: '1px solid rgba(147, 50, 158, 0.25)',
                borderRadius: '16px',
                padding: '2rem',
              }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  "We did not just teach students to write. We made them authors. That changes how they see themselves — and how the world sees them."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 600, color: '#FFFFFF', fontSize: '1rem',
                  }}>JS</div>
                  <div>
                    <p style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 500 }}>Jackie Smith Jr.</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>Founder & CEO, J Merrill Foundation Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READING STATION */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 500 }}>Free Books in the Neighborhood</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.2, marginBottom: '1rem' }}>
                The Parsons Avenue Reading Station
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Our chartered Read In Color Little Free Library on Parsons Avenue is the Foundation's physical presence in the community — a place where books are always free, always available, and always representative of the people who live nearby.
              </p>
              <Link href="/our-libraries" style={{
                display: 'inline-block',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '100px',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}>
                Find a Reading Station
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Charter Number', value: '#154418' },
                { label: 'Location', value: 'Columbus, OH' },
                { label: 'Designation', value: 'Read In Color' },
                { label: 'Access', value: 'Easy Access' },
              ].map(item => (
                <div key={item.label} style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(147, 50, 158, 0.12)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{item.label}</p>
                  <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--dark)' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOARD RECRUITMENT CTA */}
      <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 500 }}>Governance Rebuild — Open Now</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            We Are Building Our Board.
            <br /><em style={{ color: 'var(--primary)' }}>We Are Looking for You.</em>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            J Merrill Foundation is active again with a clear mission, responsible systems for coordinating the work, and real programs that have already changed lives. We need board members who believe literacy is infrastructure.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/board" style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '0.875rem 2.25rem',
              borderRadius: '100px',
              fontSize: '0.95rem',
              fontWeight: 500,
              display: 'inline-block',
            }}>
              See Open Board Seats
            </Link>
            <Link href="/volunteer" style={{
              backgroundColor: 'transparent',
              color: 'var(--primary)',
              textDecoration: 'none',
              padding: '0.875rem 2.25rem',
              borderRadius: '100px',
              fontSize: '0.95rem',
              fontWeight: 400,
              border: '1px solid rgba(147, 50, 158, 0.3)',
              display: 'inline-block',
            }}>
              Volunteer Instead
            </Link>
          </div>
        </div>
      </section>

      {/* DONATE STRIP */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--primary)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#FFFFFF', fontWeight: 500, marginBottom: '0.4rem' }}>
              Help fund the next reader.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              Your gift helps fund books, literacy access, community programs, and responsible program operations.
            </p>
          </div>
          <Link href="/donate" style={{
            backgroundColor: '#FFFFFF',
            color: 'var(--primary)',
            textDecoration: 'none',
            padding: '0.875rem 2.25rem',
            borderRadius: '100px',
            fontSize: '0.95rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            Donate Now
          </Link>
        </div>
      </section>
    </>
  )
}
