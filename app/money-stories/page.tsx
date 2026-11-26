'use client';

import { useState } from 'react';

const WORKBOOK_HTML = 'https://www.berichnow.com/magnets/money-stories.html';
const WORKBOOK_PDF = 'https://www.berichnow.com/magnets/Money-Stories-Workbook.pdf';

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 26,
  lineHeight: 1.3,
  color: 'var(--text-primary)',
  margin: '48px 0 12px',
};

export default function MoneyStoriesPage() {
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
        body: JSON.stringify({ email, magnet: 'money-stories' }),
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
          <p className="eyebrow fade d1">Be Rich Now · Free Workbook</p>
          <h1 className="fade d1">
            The Money Stories <em>Workbook</em>
          </h1>
          <p className="subhead fade d2">
            A guided excavation of the beliefs that are spending your money for you. You can have
            the whole workbook for free.
          </p>
        </header>

        <hr className="rule fade d2" />

        <div className="column">
          <p className="lede fade d3">
            Your relationship with money was installed before you had any say in the matter, and it
            has been running your decisions ever since.
          </p>
          <p className="lede fade d3">
            What follows is the excavation. Every question in this workbook has been asked in a room
            with high earners, and the moment that matters is when someone hears themselves say a
            sentence they have been carrying since they were seven years old. You cannot get that
            moment by reading. You get it by writing.
          </p>

          <ul className="contents fade d3">
            <li>
              <span className="idx">01</span>
              <span className="nm">What You Inherited</span>
            </li>
            <li>
              <span className="idx">02</span>
              <span className="nm">The Ten Stories</span>
            </li>
            <li>
              <span className="idx">03</span>
              <span className="nm">The Winds Beneath</span>
            </li>
            <li>
              <span className="idx">04</span>
              <span className="nm">What You Are Pretending Not To Know</span>
            </li>
            <li>
              <span className="idx">05</span>
              <span className="nm">Running The Loop</span>
            </li>
          </ul>

          <div className="fade d3">
            <h2 style={h2Style}>01 · What You Inherited</h2>
            <p className="lede">
              Your childhood brain made meaning out of whatever evidence was around. Those
              conclusions sit upstream of your behavior today. This part starts with a one-word
              baseline, then the Money Autobiography: twelve questions, ten minutes each, written
              by hand.
            </p>

            <h2 style={h2Style}>02 · The Ten Stories</h2>
            <p className="lede">
              After several years of retreats and a few hundred long conversations with high
              earners, the same stories kept walking through the door wearing different clothes. You
              will find the ones you carry, then choose the one you will work.
            </p>

            <h2 style={h2Style}>03 · The Winds Beneath</h2>
            <p className="lede">
              Your stories sit on top of something older. This part helps you name the drive
              underneath the story, the one that shows up more than the others.
            </p>

            <h2 style={h2Style}>04 · What You Are Pretending Not To Know</h2>
            <p className="lede">
              Stories and patterns explain how you got here. This part is the honest inventory of
              what you already know and have not been willing to say.
            </p>

            <h2 style={h2Style}>05 · Running The Loop</h2>
            <p className="lede">
              Excavation on its own is self-indulgence. This part is the Alignment Loop, the
              process for catching the pattern in the moment and turning it into a move you can
              repeat.
            </p>

            <h2 style={h2Style}>How to use it</h2>
            <p className="lede">
              Print the PDF and use a pen. Handwriting is slower than your defenses, which is the
              entire point. Do not do this all at once. Five parts, five sittings, one per day or
              one per week. Start with the one-word baseline, then Part One.
            </p>

            <h2 style={h2Style}>Why I&apos;m sharing it</h2>
            <p className="lede">
              I have used these questions for years, with clients and in rooms of high earners. The
              value of every page is set by how honest you are willing to be on it. The only rule
              is to tell the truth. Nobody else is going to read this.
            </p>
          </div>

          {state === 'done' ? (
            <div className="form fade d4" style={{ textAlign: 'center' }}>
              <h2 style={{ ...h2Style, marginTop: 0 }}>It&apos;s on the way.</h2>
              <p className="lede">
                Check your inbox for your copy. If you&apos;d rather start right now, open it here:
              </p>
              <a className="btn" href={WORKBOOK_HTML} target="_blank" rel="noopener noreferrer">
                Open the workbook
              </a>
              <p className="lede" style={{ marginTop: 24 }}>
                <a href={WORKBOOK_PDF} target="_blank" rel="noopener noreferrer">
                  Download the PDF
                </a>
              </p>
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
                {state === 'loading' ? 'Sending...' : 'Send me the Money Stories Workbook'}
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
