'use client'
import Link from 'next/link'

type Program = {
  title: string
  tag: string
  tagColor: string
  tagBg: string
  description: string
  icon: string
  href: string
}

export default function ProgramCards({ programs }: { programs: Program[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
      {programs.map((program) => (
        <Link
          key={program.title}
          href={program.href}
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(147, 50, 158, 0.1)',
              borderRadius: '16px',
              padding: '2rem',
              height: '100%',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = 'var(--primary)'
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = '0 12px 40px rgba(147, 50, 158, 0.12)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = 'rgba(147, 50, 158, 0.1)'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem' }}>{program.icon}</span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em',
                color: program.tagColor, backgroundColor: program.tagBg,
                padding: '0.25rem 0.75rem', borderRadius: '100px',
              }}>{program.tag}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '0.75rem' }}>
              {program.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {program.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
