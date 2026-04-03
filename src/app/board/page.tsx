import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Join the Board',
  description: 'J Merrill Foundation is rebuilding its board of directors. We are looking for community leaders who believe literacy is infrastructure.',
}

const seats = [
  {
    title: 'Vice Chair',
    description: 'Community leader with nonprofit governance experience. Partners with the Founder to set strategic direction and represent the Foundation externally.',
    skills: ['Nonprofit leadership', 'Community relationships', 'Strategic thinking'],
    priority: 'Immediate',
  },
  {
    title: 'Secretary',
    description: 'Detail-oriented professional responsible for meeting minutes, official records, and organizational documentation. Critical to governance integrity.',
    skills: ['Documentation', 'Organizational skills', 'Attention to detail'],
    priority: 'Immediate',
  },
  {
    title: 'Treasurer',
    description: 'Financial oversight, budget review, and 990 preparation support. CPA or accounting background strongly preferred.',
    skills: ['Financial management', 'Nonprofit accounting', 'Budget analysis'],
    priority: 'Immediate',
  },
  {
    title: 'Education & Literacy Seat',
    description: 'An educator, librarian, or academic who can guide curriculum development, school partnerships, and literacy program design.',
    skills: ['Education background', 'Curriculum knowledge', 'School relationships'],
    priority: 'Priority',
  },
  {
    title: 'Technology Seat',
    description: 'IT professional or technologist with nonprofit or enterprise technology experience. Ideal candidate has Microsoft 365 or Power Platform familiarity.',
    skills: ['Technology leadership', 'Microsoft stack', 'Digital literacy'],
    priority: 'Priority',
  },
  {
    title: 'Community At-Large',
    description: 'A trusted community voice representing the populations we serve. Brings lived experience and constituent perspective to every board decision.',
    skills: ['Community ties', 'Diverse perspective', 'Advocacy background'],
    priority: 'Open',
  },
  {
    title: 'Faith Community Liaison',
    description: 'A representative from Agape International Cathedral or the broader faith community, helping bridge our AIC partnership and volunteer pipeline.',
    skills: ['Faith community connection', 'Volunteer coordination', 'Community trust'],
    priority: 'Open',
  },
]

const priorityColors: Record<string, { color: string; bg: string }> = {
  Immediate: { color: '#1A6B3C', bg: '#D4EDDA' },
  Priority: { color: '#7B4F00', bg: '#FFF3CD' },
  Open: { color: '#5C4A65', bg: '#F3EBF5' },
}

export default function BoardPage() {
  return (
    <>
      {/* HEADER */}
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>
            Governance Rebuild — Open Now
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '750px', marginBottom: '1.5rem' }}>
            We Are Building a Board<br />
            <em style={{ color: 'var(--secondary)' }}>That Believes Literacy Is Infrastructure.</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '580px', lineHeight: 1.7 }}>
            J Merrill Foundation is relaunching with a live technology platform, real programs with proven results, and a mission that connects publishing, faith, financial empowerment, and community service. We need board members who want to govern something that matters.
          </p>
        </div>
      </section>

      {/* WHY NOW */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {[
              {
                icon: '🏛',
                title: 'Real Infrastructure',
                description: 'The Foundation operates on a Microsoft 365 enterprise stack — the same technology powering J Merrill One. Board members have access to real governance dashboards, program data, and impact metrics.',
              },
              {
                icon: '📖',
                title: 'Proven Programs',
                description: 'We have already published a book with Chillicothe 8th graders, grown our Thanksgiving meal program from 25 families in 2023 to 75 in 2025, offered ESL classes, and operate a chartered Little Free Library. This is not a startup pitch.',
              },
              {
                icon: '🌱',
                title: 'A Mission That Expands',
                description: 'Literacy is our anchor, but our scope is intentionally broad — reading, writing, digital, and financial literacy. There is room for every board member\'s expertise to matter here.',
              },
            ].map(item => (
              <div key={item.title} style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(147, 50, 158, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>

          {/* Open Seats */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '2rem' }}>
            Open Board Seats ({seats.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {seats.map((seat) => {
              const pc = priorityColors[seat.priority]
              return (
                <div key={seat.title} style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(147, 50, 158, 0.1)',
                  borderRadius: '14px',
                  padding: '1.75rem 2rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1.5rem',
                  alignItems: 'start',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--dark)' }}>{seat.title}</h3>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 500, color: pc.color, backgroundColor: pc.bg,
                        padding: '0.2rem 0.65rem', borderRadius: '100px',
                      }}>{seat.priority}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>{seat.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {seat.skills.map(skill => (
                        <span key={skill} style={{
                          fontSize: '0.75rem', color: 'var(--primary)',
                          backgroundColor: 'var(--surface)',
                          padding: '0.25rem 0.65rem', borderRadius: '100px',
                          border: '1px solid rgba(147, 50, 158, 0.15)',
                        }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* APPLICATION */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--dark)' }}>
        <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Ready to Apply?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Submit your interest and tell us which seat you are applying for and why the Foundation's mission resonates with you. We will follow up within 5 business days to schedule a conversation.
          </p>
          <Link href="/volunteer?type=board" style={{
            display: 'inline-block',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            textDecoration: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '100px',
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
          }}>
            Apply for a Board Seat
          </Link>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
            Or email us directly at{' '}
            <a href="mailto:foundation@jmerrill.one" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>
              foundation@jmerrill.one
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
