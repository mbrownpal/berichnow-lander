'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function EscapeVelocityCalculator() {
  useEffect(() => {
    // Calculator logic from the robust HTML version
    const calc = () => {
      const num = (id: string) => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (!el) return 0;
        const v = parseFloat(String(el.value).replace(/[^0-9.]/g, ''));
        return isNaN(v) ? 0 : v;
      };

      const money = (n: number) => {
        if (!isFinite(n)) return '—';
        return '$' + Math.round(n).toLocaleString('en-US');
      };

      const moneyShort = (n: number) => {
        if (!isFinite(n)) return '—';
        if (Math.abs(n) >= 1000000)
          return '$' + (n / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'M';
        if (Math.abs(n) >= 1000) return '$' + Math.round(n / 1000) + 'k';
        return '$' + Math.round(n);
      };

      const yearsText = (y: number) => {
        if (!isFinite(y) || y < 0) return '—';
        if (y <= 0) return 'Reached';
        if (y > 60) return '60+ yrs';
        const wy = Math.floor(y);
        let m = Math.round((y - wy) * 12);
        if (m === 12) {
          m = 0;
        }
        if (wy === 0) return m + ' mo';
        return wy + ' yr' + (m ? ' ' + m + ' mo' : '');
      };

      const burn = num('burn');
      const res = document.getElementById('results');
      if (burn <= 0) {
        res?.classList.add('dormant');
        return;
      }
      res?.classList.remove('dormant');

      const mult = num('mult') || 33;
      const annualBurn = burn * 12;
      const target = annualBurn * mult;

      const liquid = num('liquid');
      const retire = num('retire');
      const cf = num('cashflow');
      const capCf = cf * 12 * mult;
      const free = liquid + retire + capCf;
      const conv = num('biz') + num('re') + num('other');
      const gap = Math.max(0, target - free);

      const evTarget = document.getElementById('evTarget');
      const evSub = document.getElementById('evSub');
      if (evTarget) evTarget.textContent = money(target);
      if (evSub)
        evSub.textContent =
          'Your ideal life costs ' +
          money(burn) +
          ' a month. Covering it forever takes ' +
          money(target) +
          ' working on your behalf.';

      const pFree = Math.min(100, (free / target) * 100);
      const pConv = Math.min(100 - pFree, (conv / target) * 100);
      const segFree = document.getElementById('segFree') as HTMLElement;
      const segConv = document.getElementById('segConv') as HTMLElement;
      if (segFree) segFree.style.width = pFree + '%';
      if (segConv) segConv.style.width = pConv + '%';

      const kFree = document.getElementById('kFree');
      const kConv = document.getElementById('kConv');
      const kGap = document.getElementById('kGap');
      if (kFree) kFree.textContent = moneyShort(free);
      if (kConv) kConv.textContent = moneyShort(conv);
      if (kGap) kGap.textContent = moneyShort(gap);

      // Timeline
      const income = num('income');
      const spend = num('spend');
      const surplus = income - spend;
      const growth = num('growth') / 100 || 0.08;

      const timeTo = (pv: number, annualAdd: number, target: number, r: number) => {
        if (pv >= target) return 0;
        let bal = pv;
        const mr = Math.pow(1 + r, 1 / 12) - 1;
        const add = annualAdd / 12;
        for (let m = 1; m <= 720; m++) {
          bal = bal * (1 + mr) + add;
          if (bal >= target) return m / 12;
        }
        return Infinity;
      };

      const yrs = timeTo(free, surplus * 12, target, growth);
      const sTime = document.getElementById('sTime');
      const sTimeN = document.getElementById('sTimeN');
      const sSave = document.getElementById('sSave');
      const sSaveN = document.getElementById('sSaveN');

      if (sTime) sTime.textContent = yearsText(yrs);
      if (sTimeN)
        sTimeN.textContent =
          free >= target
            ? 'Your assets already cover your ideal life.'
            : surplus <= 0 && free < target
            ? 'With no surplus, growth alone has to carry it.'
            : 'At ' + money(surplus) + ' saved a month.';
      if (sSave) sSave.textContent = income > 0 || spend > 0 ? money(surplus) : '—';
      if (sSaveN)
        sSaveN.textContent =
          income > 0 || spend > 0
            ? surplus > 0
              ? money(surplus * 12) + ' a year toward freedom'
              : 'You are drawing down each month'
            : '';

      // Levels
      const l1 = burn * 12;
      const l2 = annualBurn * 5;
      const setLvl = (id: string, aid: string, done: boolean, txt: string) => {
        const el = document.getElementById(id);
        el?.classList.toggle('done', done);
        const mark = el?.querySelector('.mark');
        if (mark) mark.textContent = done ? 'Reached' : id.replace('lvl', 'Level ');
        const amt = document.getElementById(aid);
        if (amt) amt.textContent = txt;
      };

      setLvl('lvl1', 'a1', liquid >= l1, '12 months liquid · ' + moneyShort(l1));
      setLvl('lvl2', 'a2', liquid + retire >= l2, '5 years invested · ' + moneyShort(l2));
      setLvl('lvl3', 'a3', free >= target, moneyShort(target));
    };

    // Attach listeners
    const ids = [
      'burn',
      'income',
      'spend',
      'liquid',
      'retire',
      'cashflow',
      'biz',
      're',
      'other',
      'mult',
      'growth',
    ];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', calc);
    });

    calc();
  }, []);

  return (
    <>
      <div className="grain"></div>
      <style jsx global>{`
        .wrap {
          max-width: 680px;
          margin: 0 auto;
          padding: 72px 32px 80px;
        }
        .hero {
          text-align: center;
        }
        .results {
          margin: 48px 0 0;
          padding: 36px 32px 32px;
          background: var(--surface);
          border: 1px solid var(--divider);
          border-radius: 2px;
        }
        .results.dormant .live {
          display: none;
        }
        .results .prompt {
          display: none;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-subtle);
          text-align: center;
          line-height: 2.2;
          margin: 0;
        }
        .results.dormant .prompt {
          display: block;
        }
        .bignum {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(38px, 6vw, 58px);
          line-height: 1.1;
          color: var(--text-primary);
          text-align: center;
          margin: 0;
        }
        .biglabel {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--copper);
          text-align: center;
          margin: 0 0 14px;
        }
        .bigsub {
          font-size: 17px;
          color: var(--text-body);
          text-align: center;
          margin: 16px 0 0;
          line-height: 1.7;
        }
        .bar {
          display: flex;
          height: 10px;
          width: 100%;
          margin: 36px 0 0;
          background: rgba(184, 115, 51, 0.12);
          border-radius: 1px;
          overflow: hidden;
        }
        .seg-free {
          background: linear-gradient(135deg, #b87333, #c4956a);
          transition: width 0.5s ease;
        }
        .seg-conv {
          background: repeating-linear-gradient(
            45deg,
            rgba(184, 115, 51, 0.55) 0 4px,
            rgba(184, 115, 51, 0.18) 4px 8px
          );
          transition: width 0.5s ease;
        }
        .key {
          display: flex;
          flex-wrap: wrap;
          gap: 20px 28px;
          margin: 20px 0 0;
        }
        .key div {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-subtle);
        }
        .key b {
          display: block;
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          color: var(--text-primary);
          margin-top: 6px;
        }
        .swatch {
          display: inline-block;
          width: 16px;
          height: 6px;
          margin-right: 8px;
          vertical-align: middle;
          border-radius: 1px;
        }
        .sw-free {
          background: linear-gradient(135deg, #b87333, #c4956a);
        }
        .sw-conv {
          background: repeating-linear-gradient(
            45deg,
            rgba(184, 115, 51, 0.55) 0 3px,
            rgba(184, 115, 51, 0.18) 3px 6px
          );
        }
        .sw-gap {
          background: rgba(184, 115, 51, 0.12);
        }
        .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          margin: 32px 0 0;
          background: var(--divider);
          border: 1px solid var(--divider);
        }
        .stat {
          background: var(--surface);
          padding: 20px 18px;
        }
        .stat .l {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-subtle);
          margin: 0;
        }
        .stat .v {
          font-family: var(--font-display);
          font-size: 26px;
          color: var(--text-primary);
          margin: 8px 0 0;
          line-height: 1.2;
        }
        .stat .n {
          font-size: 15px;
          color: var(--text-subtle);
          margin: 4px 0 0;
          line-height: 1.5;
        }
        .levels {
          margin: 28px 0 0;
          border-top: 1px solid var(--divider);
        }
        .lvl {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 13px 0;
          border-bottom: 1px solid var(--divider);
        }
        .lvl .mark {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--text-subtle);
          flex: 0 0 auto;
          min-width: 56px;
        }
        .lvl.done .mark {
          color: var(--copper);
        }
        .lvl .nm {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--text-subtle);
        }
        .lvl.done .nm {
          color: var(--text-primary);
        }
        .lvl .amt {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 1px;
          color: var(--text-subtle);
        }
        section {
          margin: 64px 0 0;
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 26px;
          color: var(--text-primary);
          margin: 0 0 6px;
        }
        .sechint {
          font-size: 17px;
          color: var(--text-subtle);
          margin: 0 0 28px;
          line-height: 1.7;
        }
        .field {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 11px 0;
          border-bottom: 1px solid var(--divider);
        }
        .field label {
          flex: 1;
          font-size: 18px;
          color: var(--text-body);
          line-height: 1.4;
        }
        .field label small {
          display: block;
          font-size: 14px;
          color: var(--text-subtle);
          line-height: 1.5;
          margin-top: 2px;
        }
        .money {
          position: relative;
          flex: 0 0 168px;
        }
        .money span {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-subtle);
          font-size: 16px;
          pointer-events: none;
        }
        input[type='text'] {
          width: 100%;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 2px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 17px;
          padding: 12px 14px 12px 28px;
          text-align: right;
          transition: border-color 0.2s ease;
        }
        input[type='text']:focus {
          border-color: var(--copper);
          outline: none;
        }
        input.pct {
          padding-left: 14px;
        }
        .money.pctwrap span {
          left: auto;
          right: 14px;
        }
        .money.pctwrap input {
          text-align: right;
          padding-right: 30px;
          padding-left: 14px;
        }
        .textlink {
          display: block;
          text-align: center;
          margin: 22px 0 0;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-subtle);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .textlink:hover {
          color: var(--copper);
        }
        .brandmark {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--footer);
          text-align: center;
          margin: 72px 0 0;
        }
        @media (max-width: 640px) {
          .wrap {
            padding: 64px 24px 64px;
          }
          .field {
            flex-wrap: wrap;
            gap: 8px;
          }
          .money {
            flex: 1 0 100%;
          }
          input[type='text'] {
            text-align: left;
          }
          .stats {
            grid-template-columns: 1fr;
          }
          .results {
            padding: 28px 22px;
          }
        }
      `}</style>

      <div className="wrap">
        <header className="hero">
          <p className="eyebrow">Be Rich Now · Chapter Four</p>
          <h1>
            Escape <em>Velocity</em>
          </h1>
          <p className="subhead">
            The point where your assets cover your ideal life without you ever touching the
            principal.
          </p>
          <p className="privacy">
            Nothing saved · Nothing sent · Everything stays in your browser
          </p>
        </header>

        <div className="results dormant" id="results">
          <p className="prompt">
            Enter your Ideal Spend below
            <br />
            and your number appears here
          </p>
          <div className="live">
            <p className="biglabel">Your Escape Velocity Number</p>
            <p className="bignum" id="evTarget">
              $0
            </p>
            <p className="bigsub" id="evSub"></p>

            <div className="bar">
              <div className="seg-free" id="segFree" style={{ width: '0%' }}></div>
              <div className="seg-conv" id="segConv" style={{ width: '0%' }}></div>
            </div>
            <div className="key">
              <div>
                <span className="swatch sw-free"></span>Freedom capital<b id="kFree">$0</b>
              </div>
              <div>
                <span className="swatch sw-conv"></span>Convertible<b id="kConv">$0</b>
              </div>
              <div>
                <span className="swatch sw-gap"></span>Still to build<b id="kGap">$0</b>
              </div>
            </div>

            <div className="stats">
              <div className="stat">
                <p className="l">Time to Escape Velocity</p>
                <p className="v" id="sTime">
                  —
                </p>
                <p className="n" id="sTimeN"></p>
              </div>
              <div className="stat">
                <p className="l">Monthly surplus</p>
                <p className="v" id="sSave">
                  —
                </p>
                <p className="n" id="sSaveN"></p>
              </div>
            </div>

            <div className="levels">
              <div className="lvl" id="lvl1">
                <span className="mark">Level 1</span>
                <span className="nm">Safety</span>
                <span className="amt" id="a1"></span>
              </div>
              <div className="lvl" id="lvl2">
                <span className="mark">Level 2</span>
                <span className="nm">Stability</span>
                <span className="amt" id="a2"></span>
              </div>
              <div className="lvl" id="lvl3">
                <span className="mark">Level 3</span>
                <span className="nm">Escape Velocity</span>
                <span className="amt" id="a3"></span>
              </div>
            </div>
          </div>
        </div>

        <hr className="rule" />

        <section>
          <h2>Your ideal life</h2>
          <p className="sechint">
            From the Unbreakable Year. What your ideal life costs every month, including taxes.
          </p>
          <div className="field">
            <label>
              Ideal Spend <small>Monthly cost of the life you actually want</small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="burn" inputMode="numeric" placeholder="30,000" />
            </div>
          </div>
        </section>

        <section>
          <h2>Cash flow today</h2>
          <p className="sechint">What actually moves through your accounts right now.</p>
          <div className="field">
            <label>
              Monthly income <small>Take-home from all sources, including a spouse</small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="income" inputMode="numeric" placeholder="40,000" />
            </div>
          </div>
          <div className="field">
            <label>
              Monthly spending <small>Everything out, including taxes and debt payments</small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="spend" inputMode="numeric" placeholder="30,000" />
            </div>
          </div>
        </section>

        <section>
          <h2>Freedom capital</h2>
          <p className="sechint">Assets already producing income, or ready to at any moment.</p>
          <div className="field">
            <label>
              Liquid portfolio <small>Cash, stocks, funds, bonds, crypto</small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="liquid" inputMode="numeric" placeholder="1,000,000" />
            </div>
          </div>
          <div className="field">
            <label>
              Retirement accounts <small>401k, IRA, Roth, cash value insurance</small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="retire" inputMode="numeric" placeholder="0" />
            </div>
          </div>
          <div className="field">
            <label>
              Net monthly asset cashflow{' '}
              <small>
                Rentals, royalties, notes. Subtract mortgage, taxes, insurance, maintenance and
                vacancy before entering.
              </small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="cashflow" inputMode="numeric" placeholder="0" />
            </div>
          </div>
        </section>

        <section>
          <h2>Convertible capital</h2>
          <p className="sechint">Assets that become freedom capital only when you sell them.</p>
          <div className="field">
            <label>
              Primary business <small>Enter your honest valuation, net of business debt</small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="biz" inputMode="numeric" placeholder="0" />
            </div>
          </div>
          <div className="field">
            <label>
              Investment real estate equity{' '}
              <small>Value minus what you owe. Skip anything already counted as cashflow above.</small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="re" inputMode="numeric" placeholder="0" />
            </div>
          </div>
          <div className="field">
            <label>
              Other illiquid holdings <small>Private deals, syndications, restricted stock</small>
            </label>
            <div className="money">
              <span>$</span>
              <input type="text" id="other" inputMode="numeric" placeholder="0" />
            </div>
          </div>
        </section>

        <section style={{ marginTop: '48px' }}>
          <div className="field">
            <label>
              Multiple of annual spending <small>The book uses 33. Some schools use 27.</small>
            </label>
            <div className="money pctwrap">
              <input type="text" className="pct" id="mult" inputMode="numeric" defaultValue="33" />
            </div>
          </div>
          <div className="field">
            <label>
              Investment growth rate <small>Applied to freedom capital on the way there</small>
            </label>
            <div className="money pctwrap">
              <span>%</span>
              <input type="text" className="pct" id="growth" inputMode="numeric" defaultValue="8" />
            </div>
          </div>
        </section>

        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <Link href="/resources/library" className="textlink">
            ← Back to Library
          </Link>
        </div>

        <p className="brandmark">Unbreakable Wealth · berichnow.com</p>
      </div>
    </>
  );
}
