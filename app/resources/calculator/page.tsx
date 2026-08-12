'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EscapeVelocityCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  
  const [results, setResults] = useState<{
    escapeNumber: number;
    remainingNeeded: number;
    monthsToFreedom: number;
    yearsToFreedom: number;
    targetDate: string;
  } | null>(null);

  const calculate = () => {
    const expenses = parseFloat(monthlyExpenses) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlySavings) || 0;
    const rate = parseFloat(withdrawalRate) / 100 || 0.04;

    const annualExpenses = expenses * 12;
    const escapeNumber = annualExpenses / rate;
    const remainingNeeded = Math.max(0, escapeNumber - savings);
    const monthsToFreedom = monthly > 0 ? Math.ceil(remainingNeeded / monthly) : 0;
    const yearsToFreedom = monthsToFreedom / 12;
    
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + monthsToFreedom);

    setResults({
      escapeNumber: Math.round(escapeNumber),
      remainingNeeded: Math.round(remainingNeeded),
      monthsToFreedom,
      yearsToFreedom: Math.round(yearsToFreedom * 10) / 10,
      targetDate: targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    });
  };

  return (
    <>
      <div className="grain"></div>
      <main className="page">
        <header className="hero">
          <p className="eyebrow fade d1">Be Rich Now · Resource 03</p>
          <h1 className="fade d1">
            Escape <em>Velocity</em>
          </h1>
          <p className="subhead fade d2">
            Calculate the number that makes work optional, along with the timeline to reach it down
            to the month.
          </p>
        </header>

        <hr className="rule fade d2" />

        <div className="column">
          <div className="fade d3" style={{ maxWidth: '480px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
              <label
                htmlFor="expenses"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--copper)',
                  marginBottom: '8px',
                }}
              >
                Monthly Expenses ($)
              </label>
              <input
                type="number"
                id="expenses"
                placeholder="5000"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  padding: '14px 18px',
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label
                htmlFor="savings"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--copper)',
                  marginBottom: '8px',
                }}
              >
                Current Savings ($)
              </label>
              <input
                type="number"
                id="savings"
                placeholder="100000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  padding: '14px 18px',
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label
                htmlFor="monthly"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--copper)',
                  marginBottom: '8px',
                }}
              >
                Monthly Savings ($)
              </label>
              <input
                type="number"
                id="monthly"
                placeholder="2000"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  padding: '14px 18px',
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label
                htmlFor="rate"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--copper)',
                  marginBottom: '8px',
                }}
              >
                Safe Withdrawal Rate (%)
              </label>
              <input
                type="number"
                id="rate"
                placeholder="4"
                step="0.1"
                value={withdrawalRate}
                onChange={(e) => setWithdrawalRate(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  padding: '14px 18px',
                }}
              />
            </div>

            <button className="btn" onClick={calculate}>
              Calculate
            </button>

            {results && (
              <div
                style={{
                  marginTop: '48px',
                  padding: '32px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '21px',
                    color: 'var(--text-primary)',
                    marginBottom: '24px',
                    fontWeight: 500,
                  }}
                >
                  Your Numbers
                </h2>

                <div style={{ marginBottom: '20px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--text-subtle)',
                      marginBottom: '6px',
                    }}
                  >
                    Escape Velocity Number
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      color: 'var(--copper)',
                      fontWeight: 500,
                    }}
                  >
                    ${results.escapeNumber.toLocaleString()}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--text-subtle)',
                      marginBottom: '6px',
                    }}
                  >
                    Remaining Needed
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    ${results.remainingNeeded.toLocaleString()}
                  </div>
                </div>

                {results.monthsToFreedom > 0 && (
                  <>
                    <div style={{ marginBottom: '20px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color: 'var(--text-subtle)',
                          marginBottom: '6px',
                        }}
                      >
                        Time to Freedom
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '24px',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {results.yearsToFreedom} years ({results.monthsToFreedom} months)
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color: 'var(--text-subtle)',
                          marginBottom: '6px',
                        }}
                      >
                        Target Date
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '24px',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {results.targetDate}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <Link
              href="/resources/library"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--text-subtle)',
                textDecoration: 'none',
              }}
            >
              ← Back to Library
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
