import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Join J Merrill Foundation as a volunteer reader, board member, program supporter, or community advocate.',
}

const opportunities = [
  {
    icon: '📖',
    title: 'Story Hour Reader',
    description: 'Record yourself reading a children\'s book. We add it to our digital library where children access it free anytime. No professional experience needed — just a love of reading.',
    commitment: '1–2 hours, one-time or recurring',
    tag: 'Remote',
  },
  {
    icon: '🍽',
    title: 'Community Table',
    description: 'Help us serve Thanksgiving meals to Columbus families. Our 2026 goal is 150 families. We need help with food prep, distribution, and logistics.',
    commitment: '1 day, November 2026',
    tag: 'In-Person',
  },
  {
    icon: '📚',
    title: 'Reading Station Steward',
    description: 'Adopt the Parsons Avenue Reading Station. Restock books monthly, report condition, and serve as the community steward for Charter #154418.',
    commitment: '1 hour per month',
    tag: 'In-Person',
  },
  {
    icon: '✍',
    title: 'Classroom Author Mentor',
    description: 'Work with student writers in school partnership programs. Share your experience as a writer, editor, or storyteller to guide students through the publishing process.',
    commitment: 'Flexible — school schedule',
    tag: 'Hybrid',
  },
  {
    icon: '🌐',
    title: 'ESL Instructor',
    description: 'Teach English as a Second Language virtually. We are relaunching Literacy Bridge in 2026 and need a certified or experienced ESL instructor.',
    commitment: '2–4 hours per week',
    tag: 'Remote',
  },
  {
    icon: '🏛',
    title: 'Board Member',
    description: 'Join the Foundation\'s board of directors. We have open seats across multiple disciplines. See the Board page for specific seat descriptions.',
    commitment: 'Quarterly meetings + committee work',
    tag: 'Governance',
    href: '/board',
  },
]

const tagColors: Record<string, { color: string; bg: string }> = {
  Remote: { color: '#1A5276', bg: '#D6EAF8' },
  'In-Person': { color: '#1A6B3C', bg: '#D4EDDA' },
  Hybrid: { color: '#7B4F00', bg: '#FFF3CD' },
  Governance: { color: '#5C2D91', bg: '#E8D5F5' },
}

export default function VolunteerPage() {
  return (
    <>
      {/* HEADER */}
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>
            Get Involved
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '700px', marginBottom: '1.5rem' }}>
            Your Time Is<br />
            <em style={{ color: 'var(--secondary)' }}>Someone's First Chapter.</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', lineHeight: 1.7 }}>
            Every volunteer role at J Merrill Foundation touches literacy in some form. Read aloud. Serve a meal. Mentor a young author. Show up.
          </p>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '2.5rem' }}>
            Volunteer Opportunities
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {opportunities.map((opp) => {
              const tc = tagColors[opp.tag]
              return (
                <div key={opp.title} style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(147, 50, 158, 0.1)',
                  borderRadius: '16px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '2rem' }}>{opp.icon}</span>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 500,
                      color: tc.color, backgroundColor: tc.bg,
                      padding: '0.25rem 0.65rem', borderRadius: '100px',
                    }}>{opp.tag}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '0.5rem' }}>{opp.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{opp.description}</p>
                  </div>
                  <div style={{
                    marginTop: 'auto',
                    padding: '0.75rem',
                    backgroundColor: 'var(--surface)',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    ⏱ {opp.commitment}
                  </div>
                </div>
              )
            })}
          </div>

          {/* FORM EMBED */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(147, 50, 158, 0.15)',
            borderRadius: '20px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '0.75rem' }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Start with the Foundation interest form. It helps us route volunteer interest, board interest, school partnership inquiries, Story Hour reader interest, Reading Station requests, youth author or classroom author inquiries, ESL support interest, and other Foundation questions to the right next step.
            </p>

            {/* Microsoft Forms Embed */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(147, 50, 158, 0.1)' }}>
              <iframe
                src="https://forms.microsoft.com/Pages/ResponsePage.aspx?id=XgctNReOaUGfjiLmlGzmbWLYUJckILxClwf4SzJd-xlUQktYVVZWRjg0SFc0RjNSWVVJOUMzNVZCNi4u"
                width="100%"
                height="600"
                style={{ border: 'none', display: 'block' }}
                title="JM1 Foundation Constituent Intake Form"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
