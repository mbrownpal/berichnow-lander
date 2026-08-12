'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResourcesGate() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for library access cookie on mount
  useEffect(() => {
    if (document.cookie.includes('library_access=true')) {
      router.push('/resources/library');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/resources/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Set 30-day cookie
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = `library_access=true; path=/; expires=${expiryDate.toUTCString()}`;

      // Redirect to library
      router.push('/resources/library');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grain"></div>
      <main className="page">
        <header className="hero">
          <p className="eyebrow fade d1">Be Rich Now · Companion Workbooks</p>
          <h1 className="fade d1">
            The <em>Workbooks</em>
          </h1>
          <p className="subhead fade d2">
            Reading the book will change how you think about wealth. Doing the work will change how
            you live.
          </p>
        </header>

        <hr className="rule fade d2" />

        <div className="column">
          <p className="lede fade d3">
            Every framework in the book has an exercise behind it, and these are those exercises,
            built to be filled in rather than read. Enter your email and I'll send you all of them,
            including two bonus resources I built for my private clients.
          </p>

          <ul className="contents fade d3">
            <li>
              <span className="idx">01</span>
              <span className="nm">The Unbreakable Year</span>
            </li>
            <li>
              <span className="idx">02</span>
              <span className="nm">Money Stories Workbook</span>
            </li>
            <li>
              <span className="idx">03</span>
              <span className="nm">Escape Velocity Wealth Snapshot</span>
            </li>
            <li>
              <span className="idx">04</span>
              <span className="nm">The Freedom Audit</span>
            </li>
            <li>
              <span className="idx">+</span>
              <span className="nm">Annual Planning Stack</span>
              <span className="tagx">Bonus</span>
            </li>
            <li>
              <span className="idx">+</span>
              <span className="nm">House Manager Playbook</span>
              <span className="tagx">Bonus</span>
            </li>
          </ul>

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
              disabled={loading}
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send me the workbooks'}
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
              You'll also get my weekly letter
              <br />
              Leave whenever you want
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
