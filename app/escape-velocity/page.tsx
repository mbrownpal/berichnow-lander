'use client';

import { useState } from 'react';

const CALCULATOR_URL = 'https://www.berichnow.com/magnets/escape-velocity';

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 26,
  lineHeight: 1.3,
  color: 'var(--text-primary)',
  margin: '48px 0 12px',
};

export default function EscapeVelocityPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setError('');

    try {
      const res = await fetch('/api/magnet/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, magnet: 'escape-velocity' }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit');
      setState('idle');
    }
  };

  return (
    <>
      <div className="grain"></div>
      <main className="page">
        <header className="hero">
          <p className="eyebrow fade d1">Be Rich Now · Free Calculator</p>
          <h1 className="fade d1">
            Escape <em>Velocity</em>
          </h1>
          <p className="subhead fade d2">
            The point where your assets cover your ideal life without you ever touching the
            principal. You can run the calculator for free.
          </p>
        </header>

        <hr className="rule fade d2" />

        <div className="column">
          <p className="lede fade d3">
            You put in what your ideal life costs each month and the capital you already have. The
            calculator returns your Escape Velocity number, and how long it will take to get there.
          </p>
          <p className="lede fade d3">Nothing is saved or sent. Everything stays in your browser.</p>

          <div className="fade d3">
            <h2 style={h2Style}>Your Escape Velocity number</h2>
            <p className="lede">
              The capital it would take for your assets to cover your ideal life, without touching
              the principal. The book uses a multiple of 33 times annual spending. You can change
              the multiple if you want.
            </p>

            <h2 style={h2Style}>What you enter</h2>
            <p className="lede">
              The monthly cost of the life you actually want, including taxes. That is your Ideal
              Spend, from the Unbreakable Year if you have already done it, or an honest estimate
              if you have not. Then today&apos;s take-home income and spending, the assets already
              producing income or ready to, and the assets that would count only if you sold them.
            </p>

            <h2 style={h2Style}>What you get back</h2>
            <p className="lede">
              Your number, the capital you already have, what is still to build, your monthly
              surplus, and the time to Escape Velocity, down to the month.
            </p>

            <h2 style={h2Style}>How to use it</h2>
            <p className="lede">
              Open it, enter the numbers you actually have, and stay honest on the valuations. The
              work stays on your machine. You can run it more than once as the numbers change.
            </p>

            <h2 style={h2Style}>Why I&apos;m sharing it</h2>
            <p className="lede">
              I wanted a way for you to see the number, and the gap, without sending me your
              financial life.
            </p>
            <p className="lede">This is a planning tool, not investment or tax advice.</p>
          </div>

          {state === 'done' ? (
            <div className="form fade d4" style={{ textAlign: 'center' }}>
              <h2 style={{ ...h2Style, marginTop: 0 }}>It&apos;s on the way.</h2>
              <p className="lede">
                Check your inbox for the link. If you&apos;d rather start right now, open it here:
              </p>
              <a className="btn" href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer">
                Open the Escape Velocity Calculator
              </a>
            </div>
          ) : (
            <form className="form fade d4" onSubmit={handleSubmit}>
              <label htmlFor="email" style={{ position: 'absolute', left: '-9999px' }}>
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === 'loading'}
              />
              <button className="btn" type="submit" disabled={state === 'loading'}>
                {state === 'loading' ? 'Sending...' : 'Send me the Escape Velocity Calculator'}
              </button>
              {error && (
                <p
                  style={{
                    color: 'var(--copper)',
                    textAlign: 'center',
                    marginTop: '16px',
                    fontSize: '14px',
                  }}
                >
                  {error}
                </p>
              )}
              <p className="privacy">
                You&apos;ll also get my weekly letter
                <br />
                Leave whenever you want
              </p>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
