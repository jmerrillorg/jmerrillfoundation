import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Classroom Author Project',
  description: 'From student to published author, one school at a time. J Merrill Foundation\'s signature literacy initiative.',
}

export default function ClassroomAuthorPage() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--dark)', paddingTop: '10rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', background: 'linear-gradient(135deg, rgba(147, 50, 158, 0.2) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#F4B400', backgroundColor: 'rgba(244, 180, 0, 0.15)', padding: '0.3rem 0.85rem', borderRadius: '100px', display: 'inline-block', marginBottom: '1.5rem' }}>⭐ Signature Initiative</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.1, maxWidth: '750px', marginBottom: '1.5rem' }}>
            From Student to<br />
            <em style={{ color: 'var(--secondary)' }}>Published Author.</em><br />
            One School at a Time.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: 1.7 }}>
            The Classroom Author Project is J Merrill Foundation's most distinctive program — a multi-week writing residency that takes students through a complete publishing experience, ending with a real, printed book in the world.
          </p>
        </div>
      </section>

      {/* PROOF POINT */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 500 }}>Founding Prototype</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                <em>Let Me Tell You About It</em><br />
                Chillicothe, Ohio — 8th Grade
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                We did not pilot a writing workshop. We published a book with an 8th grade class in Chillicothe, Ohio. The students wrote it. J Merrill Publishing printed it. The book is real.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                This project proved the model: when you treat students as authors — not as students writing — they produce work that deserves to be published. Because it does.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                <em>Let Me Tell You About It</em> is the prototype for every Classroom Author Project partnership that follows. The model is repeatable, fundable, and uniquely J Merrill.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <a href="https://a.co/d/02Jsp9ek" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block',
                  backgroundColor: '#FF9900',
                  color: '#111111',
                  textDecoration: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}>
                  Buy on Amazon
                </a>
                <a href="https://www.barnesandnoble.com/w/let-me-tell-you-about-it-lisa-clark/1141822693?ean=9781954414983" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block',
                  backgroundColor: 'transparent',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  border: '1px solid rgba(147, 50, 158, 0.3)',
                }}>
                  Buy on Barnes &amp; Noble
                </a>
              </div>
              <Link href="/impact" style={{ display: 'inline-block', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, borderBottom: '1px solid rgba(147, 50, 158, 0.3)', paddingBottom: '2px' }}>
                See the full impact story →
              </Link>
            </div>
            <div>
              <div style={{ backgroundColor: 'var(--primary)', borderRadius: '16px', padding: '2.5rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  "We did not just teach students to write. We made them authors. That changes how they see themselves — and how the world sees them."
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>— Jackie Smith Jr., Founder</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { label: 'School', value: 'Chillicothe, OH' },
                  { label: 'Grade', value: '8th Grade' },
                  { label: 'Output', value: 'Published Book' },
                  { label: 'Publisher', value: 'J Merrill Publishing' },
                ].map(item => (
                  <div key={item.label} style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(147, 50, 158, 0.1)', borderRadius: '10px', padding: '1rem' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{item.label}</p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--dark)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '3rem', textAlign: 'center' }}>
            How the Program Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'School Partnership', description: 'We partner with a classroom, teacher, or school program. We handle the publishing process end-to-end.' },
              { step: '02', title: 'Writing Residency', description: 'Foundation mentors lead students through story structure, drafting, editing, and revision over multiple weeks.' },
              { step: '03', title: 'Editorial Review', description: 'Manuscripts go through a professional editorial process — the same process every J Merrill author experiences.' },
              { step: '04', title: 'Published & Printed', description: 'The book is printed by J Merrill Publishing. Students hold a physical copy of their work in their hands.' },
              { step: '05', title: 'On Sale', description: 'The anthology is listed on jmerrill.pub and sold publicly. Proceeds are split between the Foundation and the student authors.' },
            ].map(s => (
              <div key={s.step} style={{ backgroundColor: '#FAFAFA', border: '1px solid rgba(147, 50, 158, 0.08)', borderRadius: '14px', padding: '1.75rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 500 }}>{s.step}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '0.6rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YOUTH AUTHOR PIPELINE */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface)' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1rem' }}>
            Youth Author Pipeline
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
            Not in a partner school? Students ages 8–18 can apply to the Youth Author Pipeline individually. Each year we publish an annual anthology featuring selected submissions from the pipeline — and the top manuscript receives a full J Merrill Publishing review.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Applications for the inaugural 2025 Youth Anthology open soon.
          </p>
          <Link href="/volunteer" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '0.875rem 2rem', borderRadius: '100px', fontSize: '0.95rem', fontWeight: 500 }}>
            Express Interest
          </Link>
        </div>
      </section>

      {/* SCHOOL CTA */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--dark)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Bring the Program to Your School
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            We partner with educators, school administrators, and community organizations to design a writing residency that fits your students and your schedule. The only requirement: a classroom ready to become published authors.
          </p>
          <Link href="/volunteer" style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '100px', fontSize: '1rem', fontWeight: 500 }}>
            Submit a School Partnership Inquiry
          </Link>
        </div>
      </section>
    </>
  )
}
