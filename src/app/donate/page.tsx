import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support J Merrill Foundation literacy programs. Your gift helps fund books, literacy access, community programs, and responsible program operations.',
}

const tiers = [
  { name: 'Literacy Circle', amount: '$500/yr', description: 'Helps support books, literacy access, and community program operations. Recognition may be offered according to Foundation policy.', color: 'var(--text-muted)', bg: 'var(--surface)' },
  { name: 'Story Champion', amount: '$2,500/yr', description: 'Helps support Story Hour development, reader coordination, and access to read-aloud experiences for children and families.', color: 'var(--primary)', bg: 'rgba(147, 50, 158, 0.05)', featured: true },
  { name: 'Legacy Partner', amount: '$10,000/yr', description: 'Helps support larger program needs, school partnerships, reading access, and community literacy work over time.', color: '#1A5276', bg: '#D6EAF8' },
  { name: 'Sustaining Gift', amount: '$50,000+', description: 'Helps support long-term Foundation capacity and program sustainability. Legacy giving conversations may be coordinated separately upon request.', color: '#7B4F00', bg: '#FFF3CD' },
]

export default function DonatePage() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>Support the Work</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '700px', marginBottom: '1.5rem' }}>
            Every Dollar<br />
            <em style={{ color: 'var(--secondary)' }}>Can Help Open a Door.</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '520px', lineHeight: 1.7 }}>
            Your donation supports the Parsons Avenue Reading Station, Story Hour Library, the Classroom Author Project, and Community Table — programs that reach children, families, and adult learners across Columbus.
          </p>
        </div>
      </section>

      {/* DONATE FORM AREA */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(147, 50, 158, 0.15)', borderRadius: '20px', padding: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '0.75rem' }}>
              Make a Donation
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Secure online giving. J Merrill Foundation Inc. is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the extent permitted by law.
            </p>

            <a
              href="https://www.iatspayments.com/saaura/PA1DF17C67029D9662"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: 500,
                textAlign: 'center',
                transition: 'background-color 0.2s',
              }}
            >
              Donate Now →
            </a>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
              You will be redirected to our secure payment portal.
            </p>
          </div>

          {/* WHERE IT GOES */}
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '1.25rem' }}>
            Where Your Gift Goes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Reading Station Restocks', description: 'Funds diverse, representative books for the Parsons Avenue station and future network stations.' },
              { label: 'Story Hour Library', description: 'Covers storage, platform costs, and volunteer coordination for our digital reading library.' },
              { label: 'Classroom Author Project', description: 'Funds printing, editorial support, and distribution for student-authored books.' },
              { label: 'Community Table', description: 'Supports Thanksgiving meal logistics, food costs, and distribution toward the 150-family goal in 2026.' },
              { label: 'Literacy Bridge (ESL)', description: 'Funds instructor stipends, curriculum, and virtual learning access for ESL program participants.' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(147, 50, 158, 0.08)', borderRadius: '10px', padding: '1.25rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', alignItems: 'start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--dark)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.label}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAMED GIVING */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '0.75rem' }}>Named Giving Tiers</h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto' }}>For donors who want to make a larger commitment to literacy, access, and community transformation.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {tiers.map(tier => (
              <div key={tier.name} style={{
                backgroundColor: tier.bg,
                border: tier.featured ? `2px solid var(--primary)` : '1px solid rgba(147, 50, 158, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                position: 'relative',
              }}>
                {tier.featured && (
                  <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '100px', whiteSpace: 'nowrap' }}>Most Popular</span>
                )}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: tier.color, marginBottom: '0.5rem', fontWeight: 500 }}>{tier.amount}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '0.75rem' }}>{tier.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{tier.description}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
            To discuss larger gifts, legacy giving, or donor questions, contact{' '}
            <a href="mailto:foundation@jmerrill.one" style={{ color: 'var(--primary)', textDecoration: 'none' }}>foundation@jmerrill.one</a>
          </p>
        </div>
      </section>
    </>
  )
}
