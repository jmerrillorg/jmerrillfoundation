'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--dark)', color: 'rgba(255,255,255,0.7)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem', fontWeight: 500 }}>
              J Merrill Foundation Inc.
            </h3>
            <p style={{ fontSize: '0.7rem', color: 'rgba(203, 170, 203, 0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 400 }}>
              A J Merrill One Company
            </p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem' }}>
              The Community Impact Operating Layer of J Merrill One — advancing literacy in all its forms across Columbus, Ohio and beyond.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              501(c)(3) Nonprofit Organization
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>Programs</h4>
            {[
              { href: '/programs', label: 'All Programs' },
              { href: '/story-hour', label: 'Story Hour Library' },
              { href: '/classroom-author', label: 'Classroom Author Project' },
              { href: '/our-libraries', label: 'Reading Stations' },
              { href: '/programs#literacy-bridge', label: 'Literacy Bridge (ESL)' },
              { href: '/programs#community-table', label: 'Community Table' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >{link.label}</Link>
            ))}
          </div>

          {/* Organization */}
          <div>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>Organization</h4>
            {[
              { href: '/about', label: 'About the Foundation' },
              { href: '/impact', label: 'Our Impact' },
              { href: '/board', label: 'Join the Board' },
              { href: '/volunteer', label: 'Volunteer' },
              { href: '/donate', label: 'Donate' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >{link.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 500 }}>Contact</h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.6)' }}>Headquartered in Columbus, OH</p>
            <a href="mailto:foundation@jmerrill.one" style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >foundation@jmerrill.one</a>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>Little Free Library</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Charter #154418 · Columbus, OH</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(203, 170, 203, 0.15)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} J Merrill Foundation Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="https://jmerrill.one" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>J Merrill One</Link>
            <Link href="https://jmerrill.pub" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Publishing</Link>
            <Link href="https://jmerrill.financial" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Financial</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
