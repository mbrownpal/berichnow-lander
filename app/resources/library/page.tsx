import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ResourceLibrary() {
  // Server-side cookie check
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get('library_access')?.value === 'true';

  if (!hasAccess) {
    redirect('/resources');
  }

  return (
    <>
      <div className="grain"></div>
      <main className="page">
        <header className="hero">
          <p className="eyebrow fade d1">Be Rich Now · Companion Workbooks</p>
          <h1 className="fade d1">
            Everything is <em>here</em>.
          </h1>
          <p className="subhead fade d2">
            Start with the Unbreakable Year. Everything downstream depends on knowing what your
            ideal life actually costs, and the rest will make more sense once you have that number.
          </p>
        </header>

        <hr className="rule fade d2" />

        <div className="column">
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-primary)', marginBottom: '24px' }}>
              Resources
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: 'var(--copper)', marginBottom: '8px' }}>
                  01. The Unbreakable Year
                </h3>
                <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '12px' }}>
                  Map the life you actually want and price it out month by month until you arrive at your Perfect Burn Rate.
                </p>
                <a href="/resources/unbreakable-year.html" target="_blank" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Open Workbook →
                </a>
                <a href="/resources/Unbreakable-Year-Workbook.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-subtle)', textDecoration: 'none', marginLeft: '16px' }}>
                  Download PDF
                </a>
              </li>
              <li style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: 'var(--copper)', marginBottom: '8px' }}>
                  02. Money Stories Workbook
                </h3>
                <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '12px' }}>
                  Surface the inherited scripts running your financial decisions, then name the fear sitting underneath each one.
                </p>
                <a href="/resources/Money-Stories-Workbook.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Download →
                </a>
              </li>
              <li style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: 'var(--copper)', marginBottom: '8px' }}>
                  03. Escape Velocity Wealth Snapshot
                </h3>
                <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '12px' }}>
                  Calculate the number that makes work optional, along with the timeline to reach it down to the month.
                </p>
                <a href="/resources/calculator" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Open calculator →
                </a>
              </li>
              <li style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: 'var(--copper)', marginBottom: '8px' }}>
                  04. The Freedom Audit
                </h3>
                <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '12px' }}>
                  Score yourself across the five pillars and find out which one is costing you the most right now.
                </p>
                <a href="https://freedomaudit.berichnow.com" target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Take the audit →
                </a>
              </li>
            </ul>
          </div>

          <hr style={{ width: '40px', height: '2px', background: 'var(--copper)', opacity: 0.6, border: 0, margin: '48px auto' }} />

          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-subtle)', textAlign: 'center', marginBottom: '32px' }}>
              Bonus Resources
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: 'var(--copper)', marginBottom: '8px' }}>
                  Annual Planning Stack
                </h3>
                <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '12px' }}>
                  Description pending.
                </p>
                <a href="/resources/Annual-Planning-Stack.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Download →
                </a>
              </li>
              <li style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: 'var(--copper)', marginBottom: '8px' }}>
                  House Manager Playbook
                </h3>
                <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '12px' }}>
                  Description pending.
                </p>
                <a href="/resources/House-Manager-Playbook.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Download →
                </a>
              </li>
            </ul>
          </div>

          <div style={{ maxWidth: '620px', margin: '64px auto 0', paddingTop: '48px', borderTop: '1px solid var(--divider)', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '28px' }}>
              Some people finish these and want to go further with a room of people doing the same work.
            </p>
            <a href="https://unbreakablewealth.com/about-us/" target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.3s ease' }}>
              About Unbreakable Wealth
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
