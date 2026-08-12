'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(
              60% 50% at 75% 38%,
              rgba(184, 115, 51, 0.1) 0%,
              rgba(0, 0, 0, 0) 60%
            ),
            radial-gradient(
              80% 60% at 50% 100%,
              rgba(0, 0, 0, 0.45) 0%,
              rgba(0, 0, 0, 0) 60%
            );
        }

        .wrap {
          position: relative;
          z-index: 2;
        }

        .hero {
          max-width: 1240px;
          margin: 0 auto;
          padding: 64px 56px 80px;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 80px;
          align-items: center;
          min-height: 100vh;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
        }

        .hero-copy .label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--copper);
          margin-bottom: 32px;
          display: inline-flex;
          align-items: center;
          gap: 14px;
        }

        .hero-copy .label .bar {
          width: 24px;
          height: 1px;
          background: var(--copper);
          opacity: 0.55;
        }

        .hero-copy h1.title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(48px, 5.6vw, 84px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 18px;
        }

        .hero-copy h1.title em {
          font-style: italic;
          font-weight: 500;
          background: linear-gradient(135deg, #c4956a 0%, #b87333 50%, #d4a97a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-copy .subtitle {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(19px, 1.6vw, 22px);
          color: var(--text-subtle);
          line-height: 1.5;
          margin-bottom: 32px;
        }

        .hero-copy .author {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-subtle);
          margin-bottom: 48px;
        }

        .hero-copy .author .by {
          color: rgba(160, 155, 145, 0.5);
          margin-right: 10px;
        }

        .hero-copy .opening {
          font-family: var(--font-body);
          font-size: 21px;
          line-height: 1.8;
          color: var(--text-body);
          max-width: 520px;
        }

        .hero-pq {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--divider);
          max-width: 520px;
        }

        .hero-pq q {
          quotes: none;
          display: block;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 40px);
          line-height: 1.2;
          color: var(--copper);
          letter-spacing: -0.005em;
        }


        .hero-book {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-book .book {
          display: block;
          height: clamp(420px, 68vh, 640px);
          width: auto;
          max-width: 100%;
          filter: drop-shadow(0 50px 60px rgba(0, 0, 0, 0.6))
            drop-shadow(0 12px 20px rgba(0, 0, 0, 0.45));
        }

        .hero-book::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -10px;
          width: 55%;
          height: 32px;
          transform: translateX(-50%);
          background: radial-gradient(
            50% 50% at 50% 50%,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0) 70%
          );
          filter: blur(14px);
          z-index: -1;
        }

        .hero-book::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 70%;
          height: 70%;
          transform: translate(-50%, -52%);
          background: radial-gradient(
            circle,
            rgba(184, 115, 51, 0.18) 0%,
            rgba(184, 115, 51, 0) 60%
          );
          filter: blur(40px);
          z-index: -1;
          opacity: 0.85;
        }

        .col {
          max-width: 620px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .col p {
          font-family: var(--font-body);
          font-size: 20px;
          line-height: 1.85;
          color: var(--text-body);
          margin-bottom: 30px;
          font-weight: 400;
          letter-spacing: 0.005em;
          text-align: left;
        }

        .col p.lift {
          color: var(--text-primary);
          font-weight: 500;
        }

        .col p.declare {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(22px, 2.4vw, 26px);
          color: var(--text-primary);
          line-height: 1.45;
          letter-spacing: -0.005em;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        .col p.declare em {
          font-style: italic;
          color: var(--rosegold);
          font-weight: 500;
        }

        .divider {
          max-width: 620px;
          margin: 32px auto;
          padding: 0 32px;
        }
        .divider i {
          display: block;
          width: 40px;
          height: 1px;
          background: var(--border);
        }

        .capture-wrap {
          max-width: 760px;
          margin: 80px auto 0;
          padding: 48px 32px 0;
          border-top: 1px solid var(--divider);
        }

        .capture {
          max-width: 520px;
          margin: 0 auto;
        }

        .capture .lead {
          font-family: var(--font-body);
          font-size: 20px;
          color: var(--text-primary);
          margin-bottom: 16px;
          line-height: 1.5;
          text-align: center;
        }

        .capture .lead em {
          font-style: italic;
          color: var(--rosegold);
          font-weight: 500;
        }

        .capture form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .capture input {
          font-family: var(--font-body);
          font-size: 17px;
          color: var(--text-primary);
          background: var(--surface);
          border: 1px solid rgba(184, 115, 51, 0.3);
          border-radius: 1px;
          padding: 14px 18px;
          outline: none;
          width: 100%;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .capture input::placeholder {
          color: var(--text-subtle);
          font-style: italic;
          opacity: 0.95;
        }

        .capture input:focus {
          border-color: var(--copper);
          box-shadow: 0 0 0 3px rgba(184, 115, 51, 0.1);
          background: #2a2620;
        }

        .capture button {
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1a1815;
          background: linear-gradient(135deg, #b87333 0%, #c4956a 100%);
          border: none;
          border-radius: 1px;
          cursor: pointer;
          padding: 14px 36px;
          width: 100%;
          transition: transform 0.25s ease, box-shadow 0.3s ease, background 0.3s ease;
          box-shadow: 0 8px 24px rgba(184, 115, 51, 0.1);
        }

        .capture button:hover:not(:disabled) {
          background: linear-gradient(135deg, #c4956a 0%, #d4a97a 100%);
          transform: translateY(-1px);
          box-shadow: 0 14px 36px rgba(184, 115, 51, 0.22);
        }

        .capture button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message {
          text-align: center;
          font-family: var(--font-body);
          font-size: 19px;
          color: var(--rosegold);
          padding: 20px;
          background: rgba(184, 115, 51, 0.08);
          border: 1px solid rgba(184, 115, 51, 0.25);
          border-radius: 2px;
          margin: 16px 0;
        }

        .error-message {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #ef4444;
          margin-top: 12px;
        }

        .capture .fineprint {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(160, 155, 145, 0.6);
          margin-top: 18px;
        }

        .secondary {
          max-width: 620px;
          margin: 96px auto 0;
          padding: 0 32px;
          text-align: left;
        }

        .secondary .heading {
          font-family: var(--font-body);
          font-size: 19px;
          color: var(--text-primary);
          margin-bottom: 14px;
          line-height: 1.5;
        }

        .secondary .body {
          font-family: var(--font-body);
          font-size: 19px;
          color: var(--text-body);
          line-height: 1.75;
          margin-bottom: 22px;
        }

        .secondary a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--copper);
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(184, 115, 51, 0.35);
          transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }

        .secondary a:hover {
          color: var(--rosegold);
          border-bottom-color: var(--copper);
        }
        .secondary a .arrow {
          transition: transform 0.25s ease;
        }
        .secondary a:hover .arrow {
          transform: translateX(4px);
        }

        footer {
          text-align: center;
          padding: 96px 32px 40px;
        }

        footer .sig {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(160, 155, 145, 0.4);
        }

        footer .sig .dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--copper);
          margin: 0 10px;
          vertical-align: middle;
          opacity: 0.55;
        }

        @media (max-width: 980px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 48px 32px 64px;
            min-height: auto;
            text-align: left;
          }
          .hero-book {
            order: 1;
          }
          .hero-copy {
            order: 2;
            align-items: flex-start;
          }
          .hero-book .book {
            height: clamp(320px, 56vh, 460px);
          }
          .hero-copy h1.title {
            font-size: 48px;
          }
          .hero-copy .opening {
            font-size: 19px;
            line-height: 1.75;
            max-width: 100%;
          }
          .hero-pq {
            margin-top: 22px;
            padding-top: 20px;
            max-width: 100%;
          }
          .hero-pq q {
            font-size: 28px;
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 32px 24px 48px;
            gap: 32px;
          }
          .hero-copy .label {
            font-size: 10px;
            letter-spacing: 0.26em;
            margin-bottom: 22px;
            gap: 10px;
          }
          .hero-copy .label .bar {
            width: 16px;
          }
          .hero-copy h1.title {
            font-size: 42px;
          }
          .hero-copy .subtitle {
            font-size: 19px;
            margin-bottom: 22px;
          }
          .hero-copy .author {
            font-size: 10px;
            letter-spacing: 0.26em;
            margin-bottom: 32px;
          }
          .hero-copy .opening {
            font-size: 19px;
            font-size: 19px;
          }
          .hero-pq {
            margin-top: 18px;
            padding-top: 18px;
          }
          .hero-pq q {
            font-size: 25px;
            line-height: 1.25;
          }
          .hero-book .book {
            height: clamp(280px, 48vh, 380px);
          }
          .col {
            padding: 0 26px;
          }
          .col p {
            font-size: 19px;
            font-size: 19px;
            line-height: 1.75;
            margin-bottom: 24px;
          }
          .col p.declare {
            font-size: 21px;
            line-height: 1.4;
          }
          .divider {
            padding: 0 26px;
          }
          .capture-wrap {
            margin-top: 64px;
            padding: 40px 24px 0;
          }
          .secondary {
            padding: 0 26px;
            margin-top: 72px;
          }
          .secondary .heading {
            font-size: 19px;
          }
          .secondary .body {
            font-size: 17px;
            line-height: 1.7;
          }
          footer {
            padding: 72px 24px 36px;
          }
          footer .sig {
            font-size: 9px;
            letter-spacing: 0.18em;
            line-height: 1.6;
          }
          footer .sig .dot {
            margin: 0 8px;
          }
        }
      `}</style>

      <div className="wrap">
        <header className="hero">
          <div className="hero-copy">
            <div className="label">
              <span className="bar"></span>
              <span>Coming Fall 2026</span>
            </div>
            <h1 className="title">
              Be <em>Rich</em> Now
            </h1>
            <p className="subtitle">How to want everything you have.</p>
            <div className="author">
              <span className="by">A book by</span>Mike Brown
            </div>
            <p className="opening">
              You've spent years building the life you're supposed to want. You did all the
              things they said would make you happy. But late at night, when you finally slow
              down and get quiet, the question haunts you:
            </p>
            <div className="hero-pq">
              <q>"Is this really it?"</q>
            </div>
          </div>

          <div className="hero-book">
            <img className="book" src="/be-rich-now-cover.PNG" alt="Be Rich Now — Mike Brown" />
          </div>
        </header>

        <section className="col" style={{ marginTop: '32px' }}>
          <p className="declare">
            Somewhere, deep inside, you know you are meant for <em>more</em>.
          </p>
          <p className="lift">This book is for you.</p>
        </section>

        <div className="divider">
          <i></i>
        </div>

        <section className="col">
          <p>
            Most books about wealth ask you to choose. Be grateful or be ambitious. Slow down or
            scale up. Find peace or chase greatness. But what if you didn't have to choose?
          </p>

          <p>
            What if the richest version of your life is already here, and the only thing standing
            between you and it is the belief that something is still missing?
          </p>

          <p>And what if that allowed you to dream bigger than you ever thought possible?</p>

          <p>
            <em style={{ fontStyle: 'italic' }}>Be Rich Now</em> is a book for people who have
            built a successful life and still feel the gap. It examines why financial success fails
            to deliver the freedom it promised, and what actually does.
          </p>

          <p className="declare" style={{ marginTop: '20px' }}>
            This is not another book about making more money. This is the book that will show you
            how to <em>become free</em>.
          </p>
        </section>

        <section className="capture-wrap">
          <div className="capture">
            <p className="lead">
              Get the <em>first chapter</em> free.
            </p>

            {success ? (
              <div className="success-message">
                ✓ Check your email! Chapter one is on its way.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Me Chapter One'}
                </button>
              </form>
            )}

            {error && <p className="error-message">{error}</p>}

            <p className="fineprint">
              You'll also be first to know when the book drops. No spam. Just the book.
            </p>
          </div>
        </section>

        <section className="secondary">
          <p className="heading">Can't wait for the book?</p>
          <p className="body">
            The Freedom Audit is the companion tool that maps where you actually stand across the
            six dimensions of a rich life. 30–45 minutes. Radically honest. The results will show
            you the gap the book was written to close.
          </p>
          <a href="https://freedomaudit.berichnow.com">
            Take the Freedom Audit <span className="arrow">→</span>
          </a>
        </section>

        <footer>
          <div className="sig">
            Unbreakable Wealth <span className="dot"></span> berichnow.com
          </div>
        </footer>
      </div>
    </>
  );
}
