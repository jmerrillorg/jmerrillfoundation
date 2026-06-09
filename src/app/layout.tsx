import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'J Merrill Foundation Inc. — Literacy. Community. Transformation.',
    template: '%s | J Merrill Foundation Inc.',
  },
  description: 'J Merrill Foundation Inc. advances literacy, dignity, authorship, and community access across Columbus, Ohio by helping people tell their stories and build stronger futures.',
  keywords: ['literacy', 'Columbus Ohio', 'nonprofit', 'community', 'education', 'children', 'reading'],
  authors: [{ name: 'J Merrill Foundation Inc.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jmerrill.org',
    siteName: 'J Merrill Foundation Inc.',
    title: 'J Merrill Foundation Inc. — Literacy. Community. Transformation.',
    description: 'Advancing literacy, dignity, authorship, and community access across Columbus, Ohio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J Merrill Foundation Inc.',
    description: 'Advancing literacy, dignity, authorship, and community access across Columbus, Ohio.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
