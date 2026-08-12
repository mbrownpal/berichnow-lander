'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <style jsx>{`
        .hero {
          max-width: 1240px;
          margin: 0 auto;
          padding: 64px 56px 80px;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 80px;
          align-items: center;
          min-height: 100vh;
          position: relative;
          z-index: 2;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
        }

        .label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--copper);
          margin-bottom: 32px;
        }

        .title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(48px, 5.6vw, 84px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 18px;
        }

        .title em {
          font-style: italic;
          font-weight: 500;
          background: linear-gradient(135deg, #C4956A 0%, #B87333 50%, #D4A97A 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .subtitle {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(19px, 1.6vw, 22px);
          color: var(--text-subtle);
          line-height: 1.5;
          margin-bottom: 48px;
        }

        .cta-block {
          margin-top: 32px;
        }

        .cta-text {
          font-size: 18px;
          color: var(--text-body);
          margin-bottom: 20px;
        }

        .cover-wrap {
          position: relative;
        }

        .cover {
          width: 100%;
          height: auto;
          display: block;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
        }

        @media (max-width: 960px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 56px;
            padding: 56px 32px;
          }
          .title {
            font-size: 40px;
          }
          .subtitle {
            font-size: 20px;
          }
        }
      `}</style>

      <main className="hero">
        <div className="hero-copy">
          <div className="label">Mike Brown</div>
          <h1 className="title">
            Be <em>Rich</em> Now
          </h1>
          <p className="subtitle">How to want everything you have. Coming Fall 2026.</p>
          <div className="cta-block">
            <p className="cta-text" style={{ marginBottom: '12px', fontSize: '17px' }}>
              Get the first chapter free.
            </p>
            <Link href="#" className="btn" style={{ marginBottom: '16px' }}>
              Send Me Chapter One
            </Link>
            <p style={{ fontSize: '14px', color: 'var(--text-subtle)', textAlign: 'center' }}>
              You'll also be first to know when the book drops. No spam. Just the book.
            </p>
          </div>
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(184, 115, 51, 0.15)' }}>
            <p style={{ fontSize: '16px', color: 'var(--text-body)', marginBottom: '16px' }}>
              Can't wait for the book?
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-subtle)', marginBottom: '12px', lineHeight: '1.6' }}>
              The Freedom Audit is the companion tool that maps where you actually stand across the six dimensions of a rich life.
            </p>
            <a href="https://freedomaudit.berichnow.com" target="_blank" rel="noopener" style={{ fontSize: '14px', color: 'var(--copper)', textDecoration: 'none' }}>
              Take the Freedom Audit →
            </a>
          </div>
        </div>
        <div className="cover-wrap">
          <img
            src="/be-rich-now-cover.PNG"
            alt="Be Rich Now book cover"
            className="cover"
          />
        </div>
      </main>
    </>
  );
}
