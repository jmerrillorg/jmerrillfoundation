import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Volunteer Inquiry Privacy Notice',
  description: 'How J Merrill Foundation handles information submitted through its volunteer inquiry form.',
}

export default function VolunteerInquiryPrivacyNotice() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--dark)', padding: '9rem 0 3rem' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', fontWeight: 500 }}>
            Volunteer Inquiry Privacy Notice
          </h1>
        </div>
      </section>
      <section style={{ padding: '3rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '760px', lineHeight: 1.75 }}>
          <p>This notice applies to the J Merrill Foundation volunteer inquiry form. It does not cover donations, program participation, or feedback surveys.</p>
          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem' }}>Information we receive</h2>
          <p>We receive the name, email address, area of interest, and any message you submit. Please do not include sensitive personal information in the message.</p>
          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem' }}>How we use it</h2>
          <p>We use this information to review and respond to your inquiry. Agreeing to be contacted about your inquiry is required to submit the form; it does not enroll you in marketing communications or guarantee a volunteer placement.</p>
          <p>Updates about Foundation programs and events are a separate, optional choice. The updates box is unchecked by default. We do not treat inquiry consent as marketing consent.</p>
          <h2 style={{ fontSize: '1.25rem', marginTop: '2rem' }}>Review and questions</h2>
          <p>Authorized Foundation reviewers handle inquiries in the Foundation's business system. For questions about your inquiry or the information you submitted, email <a href="mailto:foundation@jmerrill.one">foundation@jmerrill.one</a>.</p>
        </div>
      </section>
    </>
  )
}
