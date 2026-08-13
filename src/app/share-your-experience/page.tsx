import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Share Your Experience',
  description: 'Share feedback with J Merrill Foundation about a program, volunteer experience, donation experience, participant experience, or sponsor partnership.',
}

const surveys = [
  {
    audience: 'Program or Volunteer Experience',
    phase: 'Phase 1',
    status: 'Open first',
    url: process.env.NEXT_PUBLIC_CUSTOMER_VOICE_FOUNDATION_PROGRAM_URL || 'https://nam.dcv.ms/fS2PAlt6O9',
    description: 'For people who joined a Foundation program, volunteered at an event, supported Story Hour, helped with a Reading Station, or worked with Community Table.',
    privacy: 'Do not include medical, financial, or other sensitive personal details.',
  },
  {
    audience: 'Donor Experience',
    phase: 'Phase 2',
    status: 'Prepared',
    url: process.env.NEXT_PUBLIC_CUSTOMER_VOICE_FOUNDATION_DONOR_URL,
    description: 'For donors sharing feedback about giving, acknowledgment, stewardship, or communication from the Foundation.',
    privacy: 'Donation records and receipt questions should use the secure payment or Foundation contact path, not public feedback text.',
  },
  {
    audience: 'Participant Experience',
    phase: 'Phase 3',
    status: 'Prepared',
    url: process.env.NEXT_PUBLIC_CUSTOMER_VOICE_FOUNDATION_PARTICIPANT_URL,
    description: 'For recipients, learners, students, families, or community members sharing program experience feedback.',
    privacy: 'Participant feedback is reviewed separately from donor and sponsor feedback to protect dignity and program privacy.',
  },
  {
    audience: 'Sponsor or Partner Experience',
    phase: 'Phase 4',
    status: 'Prepared',
    url: process.env.NEXT_PUBLIC_CUSTOMER_VOICE_FOUNDATION_SPONSOR_URL,
    description: 'For sponsors, funders, schools, churches, community organizations, and operating partners.',
    privacy: 'Partnership or funding details should stay tied to the right Foundation relationship and follow-up owner.',
  },
]

export default function ShareYourExperiencePage() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>
            Foundation Feedback
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '720px', marginBottom: '1.5rem' }}>
            Share Your<br />
            <em style={{ color: 'var(--secondary)' }}>Experience.</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '640px', lineHeight: 1.7 }}>
            Your feedback helps J Merrill Foundation improve programs, volunteer coordination, donor stewardship, participant care, and sponsor partnerships while keeping each relationship in its proper lane.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 600 }}>
              Start Here
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.15, marginBottom: '1rem' }}>
              Choose the feedback path that fits your relationship with the Foundation.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              The first Customer Voice survey is the broadest and lowest-risk path: program and volunteer experience feedback. Donor, participant, and sponsor feedback are separated so private details are not mixed into a single general survey.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {surveys.map((survey) => (
              <article
                key={survey.audience}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: survey.phase === 'Phase 1' ? '2px solid var(--primary)' : '1px solid rgba(147, 50, 158, 0.12)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 500 }}>
                    {survey.phase}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: survey.phase === 'Phase 1' ? '#1A6B3C' : 'var(--text-muted)', backgroundColor: survey.phase === 'Phase 1' ? '#D4EDDA' : 'var(--surface)', padding: '0.25rem 0.6rem', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                    {survey.status}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                    {survey.audience}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {survey.description}
                  </p>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, borderTop: '1px solid rgba(147, 50, 158, 0.1)', paddingTop: '1rem' }}>
                  {survey.privacy}
                </p>
                {survey.url ? (
                  <a
                    href={survey.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 'auto',
                      display: 'inline-block',
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      padding: '0.8rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    Share Your Experience
                  </a>
                ) : (
                  <a
                    href={`mailto:foundation@jmerrill.one?subject=${encodeURIComponent(`${survey.audience} Feedback`)}`}
                    style={{
                      marginTop: 'auto',
                      display: 'inline-block',
                      backgroundColor: survey.phase === 'Phase 1' ? 'var(--primary)' : 'var(--surface-mid)',
                      color: survey.phase === 'Phase 1' ? '#FFFFFF' : 'var(--dark)',
                      textDecoration: 'none',
                      padding: '0.8rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    Share Your Experience
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1rem' }}>
            Feedback Boundaries
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              'Donor feedback is not participant data.',
              'Participant feedback is not donor-facing CRM data.',
              'Volunteer feedback is not a Sales pipeline signal.',
              'Sponsor feedback is reviewed through partner and funding context.',
            ].map((rule) => (
              <div key={rule} style={{ borderLeft: '3px solid var(--primary)', padding: '0.75rem 0 0.75rem 1rem', backgroundColor: 'var(--surface)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--dark)', lineHeight: 1.6 }}>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
