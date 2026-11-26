'use client';

import { useState } from 'react';

const GUIDE_URL =
  'https://docs.google.com/document/d/1CTA7e5Bf25S99RKR3yQHBsQOe0zsosw-aQMbva1R2hA/copy';

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 26,
  lineHeight: 1.3,
  color: 'var(--text-primary)',
  margin: '48px 0 12px',
};

export default function AnnualPlanningPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setError('');

    try {
      const res = await fetch('/api/plan/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
          <p className="eyebrow fade d1">Be Rich Now · Free Guide</p>
          <h1 className="fade d1">
            The Annual Planning <em>Stack</em>
          </h1>
          <p className="subhead fade d2">
            The three exercises Claire and I use to design each year before it starts. You can have
            the whole thing for free.
          </p>
        </header>

        <hr className="rule fade d2" />

        <div className="column">
          <p className="lede fade d3">
            A great life does not happen by accident. It must be designed with intention.
          </p>
          <p className="lede fade d3">
            At the end of every year, Claire and I set aside an entire day for annual planning. It
            has become one of our most sacred rituals, and these three exercises are how we spend
            that day.
          </p>

          <ul className="contents fade d3">
            <li>
              <span className="idx">01</span>
              <span className="nm">The Year in Review</span>
            </li>
            <li>
              <span className="idx">02</span>
              <span className="nm">The Unbreakable Year</span>
            </li>
            <li>
              <span className="idx">03</span>
              <span className="nm">Word of the Year</span>
            </li>
          </ul>

          <div className="fade d3">
            <h2 style={h2Style}>01 · The Year in Review</h2>
            <p className="lede">
              Twenty-five questions across the areas of your life for an honest accounting of the
              year behind you: the good, the bad, and the patterns that keep holding you back.
              You&apos;ll look at what gave you energy, what drained it, what you changed your mind
              about, and where fear ran the show. My personal favorite asks how present you were
              for the important moments.
            </p>

            <h2 style={h2Style}>02 · The Unbreakable Year</h2>
            <p className="lede">
              My signature exercise for designing your rich life. You define what wealth looks like
              across health, relationships, time, mind and soul. You design an ideal day, week,
              month and year, and then you price it out. You come away knowing what your best life
              actually costs, along with the changes you can make today for free, like putting your
              phone away at dinner.
            </p>

            <h2 style={h2Style}>03 · Word of the Year</h2>
            <p className="lede">
              You choose a single word to act as your north star for the next twelve months. It
              works as a reminder and as a filter for decisions, so you stay aligned when life gets
              busy. One year my word was Purpose. I wore it on a bracelet so I would ask myself
              every single day: &quot;Am I living my purpose today?&quot;
            </p>

            <h2 style={h2Style}>How to use it</h2>
            <p className="lede">
              Block a few hours, with your partner if you have one, somewhere you won&apos;t be
              interrupted. You can work through it in one sitting or spread it over a few days. Each
              exercise builds on the one before it, so start with the Year in Review.
            </p>
            <p className="lede">
              We do ours in December, and a birthday or the start of a new quarter works just as
              well. Any point where you want to look back honestly and decide what comes next is a
              good time to start.
            </p>

            <h2 style={h2Style}>Why I&apos;m sharing it</h2>
            <p className="lede">
              I&apos;ve used this stack for years, personally and with clients, my community, and
              team members across our companies. It has helped me live more intentionally, make
              better decisions, protect my time, and stay grounded in challenging seasons.
            </p>
            <p className="lede">You cannot hit a target if you don&apos;t know where you are aiming.</p>
          </div>

          {state === 'done' ? (
            <div className="form fade d4" style={{ textAlign: 'center' }}>
              <h2 style={{ ...h2Style, marginTop: 0 }}>It&apos;s on the way.</h2>
              <p className="lede">
                Check your inbox for your copy. If you&apos;d rather start right now, open it here:
              </p>
              <a className="btn" href={GUIDE_URL} target="_blank" rel="noopener noreferrer">
                Open the Annual Planning Stack
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
                {state === 'loading' ? 'Sending...' : 'Send me the Annual Planning Stack'}
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
