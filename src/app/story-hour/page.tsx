import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Story Hour Library',
  description: 'A free digital library where volunteers read children\'s books aloud. No account required. Always free.',
}

export default function StoryHourPage() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div className="container">
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#5C2D91', backgroundColor: '#E8D5F5', padding: '0.3rem 0.85rem', borderRadius: '100px', display: 'inline-block', marginBottom: '1.5rem' }}>In Development for 2026</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '700px', marginBottom: '1.5rem' }}>
            Story Hour Library —<br />
            <em style={{ color: 'var(--secondary)' }}>Community Voices Reading to Community Children.</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: 1.7 }}>
            A free digital library in development for 2026 where volunteers record themselves reading children's books. Children will be able to access the library anytime — no account, no login, no cost.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '3rem' }}>
            How Story Hour Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {[
              { icon: '🎙', title: 'Volunteer Readers Record', description: 'Community members, educators, AIC congregation members, and J Merrill Publishing authors record themselves reading a children\'s book. Simple setup — phone, tablet, or laptop.' },
              { icon: '✅', title: 'Foundation Reviews', description: 'Every recording goes through a content and quality review before publishing. Copyright compliance, audio quality, and child-appropriateness are verified.' },
              { icon: '📺', title: 'Added to the Library', description: 'Approved readings are added to the Story Hour digital library. The book title, reader name, and a purchase link are attached to every video.' },
              { icon: '📱', title: 'Children Watch Free', description: 'Any child can access the library without an account. No sign-up, no subscription, no cost. Scan the QR code at any Reading Station to reach the library.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(147, 50, 158, 0.1)', borderRadius: '14px', padding: '1.75rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>

          {/* QR BRIDGE */}
          <div style={{ backgroundColor: 'var(--dark)', borderRadius: '16px', padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                The QR Bridge
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                Every J Merrill Foundation Reading Station has a weatherproof QR code placard inside the box. Scan it to go directly to the Story Hour library — connecting the physical book in the child's hand to a reading of that book on screen.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--dark)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>📱</div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>QR code → Story Hour Library</p>
            </div>
          </div>
        </div>
      </section>

      {/* COPYRIGHT */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--surface)' }}>
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '1.25rem' }}>
            What Books Can Be Read?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
            We operate a strict two-tier copyright model to protect the Foundation and our volunteer readers:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { tier: 'Tier 1 — Available at Launch', items: ['Public domain children\'s books', 'J Merrill Publishing titles', 'Books with written publisher authorization'], color: '#1A6B3C', bg: '#D4EDDA' },
              { tier: 'Tier 2 — Expansion Phase', items: ['Licensed publisher agreements', 'Author consent agreements', 'Publisher partnership conversations'], color: '#1A5276', bg: '#D6EAF8' },
            ].map(tier => (
              <div key={tier.tier} style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '12px', padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: tier.color, backgroundColor: tier.bg, padding: '0.25rem 0.65rem', borderRadius: '100px', display: 'inline-block', marginBottom: '0.75rem' }}>{tier.tier}</span>
                <ul style={{ paddingLeft: '1.25rem' }}>
                  {tier.items.map(item => (
                    <li key={item} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.3rem', lineHeight: 1.6 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER CTA */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--primary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Become a Story Hour Reader
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            You do not need to be a professional. You need to love a book and be willing to read it on camera. Every voice matters in this library.
          </p>
          <Link href="/volunteer" style={{ display: 'inline-block', backgroundColor: '#FFFFFF', color: 'var(--primary)', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '100px', fontSize: '1rem', fontWeight: 600 }}>
            Sign Up as a Reader
          </Link>
        </div>
      </section>
    </>
  )
}
