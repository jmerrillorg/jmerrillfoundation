'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/programs', label: 'Programs' },
  { href: '/impact', label: 'Our Impact' },
  { href: '/our-libraries', label: 'Reading Stations' },
  { href: '/classroom-author', label: 'Classroom Author' },
  { href: '/about', label: 'About' },
  { href: '/board', label: 'Join the Board' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(26, 16, 34, 0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(203, 170, 203, 0.15)' : 'none',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            J Merrill Foundation
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            color: 'var(--secondary)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}>
            Literacy · Community · Transformation
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'background-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-dark)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Donate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '0.5rem',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="flex md:hidden"
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#FFFFFF', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#FFFFFF', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#FFFFFF', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          backgroundColor: 'rgba(26, 16, 34, 0.99)',
          padding: '1.5rem',
          borderTop: '1px solid rgba(203, 170, 203, 0.15)',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                padding: '0.75rem 0',
                fontSize: '1rem',
                borderBottom: '1px solid rgba(203, 170, 203, 0.1)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '100px',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            Donate
          </Link>
        </div>
      )}
    </nav>
  )
}
