export default function PrivateRosterNotFound() {
  return <section style={{ maxWidth: 720, margin: '0 auto', padding: '8rem 1.5rem 4rem', minHeight: '65vh' }}>
    <h1 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Private roster unavailable</h1>
    <p>This roster is available only to the authorized Foundation reviewer.</p>
    <a href="/.auth/logout" style={{ textDecoration: 'underline' }}>Sign out to use a different account</a>
  </section>
}
