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
                  Map the life you actually want and price it out month by month until you arrive at your Ideal Spend.
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
                <a href="/resources/money-stories.html" target="_blank" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Open Workbook →
                </a>
                <a href="/resources/Money-Stories-Workbook.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-subtle)', textDecoration: 'none', marginLeft: '16px' }}>
                  Download PDF
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
                  Bonus Chapters
                </h3>
                <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '12px' }}>
                  Coming soon.
                </p>
                <a href="/resources/Bonus-Chapters.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Download →
                </a>
              </li>
              <li style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', color: 'var(--copper)', marginBottom: '8px' }}>
                  House Manager Playbook
                </h3>
                <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '12px' }}>
                  Coming soon.
                </p>
                <a href="/resources/House-Manager-Playbook.pdf" download style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--copper)', textDecoration: 'none' }}>
                  Download →
                </a>
              </li>
            </ul>
          </div>

          <div style={{ maxWidth: '620px', margin: '64px auto 0', paddingTop: '48px', borderTop: '1px solid #9a5b34' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5pt', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9a5b34', marginBottom: '20px' }}>
              What Happens Now
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26pt', lineHeight: '1.3', fontWeight: 'normal', color: 'var(--text-heading)', marginBottom: '18px' }}>
              Your own story is the hardest one to see.
            </h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-body)', marginBottom: '32px' }}>
              It has had a lifetime to disguise itself as ordinary good judgment, which is why you can spot the same pattern in a friend inside of four minutes and miss it in yourself for thirty years. A room of people doing this work will name what you cannot, and you will do the same for them. Learn more about the community and take the next step on your journey.
            </p>
            <div style={{ textAlign: 'center' }}>
              <a href="/mastermind" style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--bg)', background: '#9a5b34', padding: '14px 28px', textDecoration: 'none', transition: 'all 0.3s ease', border: '1px solid #9a5b34' }}>
                About Unbreakable Wealth
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
