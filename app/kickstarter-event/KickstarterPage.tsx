'use client';

import { useEffect } from 'react';

interface KickstarterPageProps {
  kickstarterUrl: string;
}

export default function KickstarterPage({ kickstarterUrl }: KickstarterPageProps) {
  useEffect(() => {
    // Sticky CTA scroll behavior
    const sticky = document.getElementById('sticky');
    const hero = document.querySelector('header .cta-block') as HTMLElement;

    const handleScroll = () => {
      if (hero && sticky) {
        const passed = hero.getBoundingClientRect().bottom < 0;
        sticky.classList.toggle('visible', passed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKickstarterClick = (placement: string) => {
    // Track with Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', { 
        content_name: 'kickstarter_click', 
        placement 
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #1a1815;
          --surface: #252219;
          --text-primary: #E8E0D4;
          --text-body: #C4BDB2;
          --text-subtle: #A09B91;
          --copper: #B87333;
          --rosegold: #C4956A;
          --divider: rgba(184,115,51,0.15);
        }

        body {
          background: var(--bg);
          color: var(--text-body);
          overflow-x: hidden;
        }

        .grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          z-index: 100;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .wrap {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .narrow { max-width: 620px; margin: 0 auto; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade { opacity: 0; animation: fadeUp 1s ease-out forwards; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.3s; }
        .d3 { animation-delay: 0.5s; }
        .d4 { animation-delay: 0.7s; }

        header {
          padding: 72px 0 0;
          text-align: center;
        }

        .kicker {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--copper);
          margin-bottom: 32px;
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-weight: 500;
          font-size: clamp(46px, 8vw, 78px);
          line-height: 1.05;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        h1 em {
          font-style: italic;
          color: var(--copper);
        }

        .deck {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(20px, 3vw, 26px);
          color: var(--text-primary);
          margin-top: 18px;
          opacity: 0.85;
        }

        .lede {
          font-size: 21px;
          line-height: 1.65;
          color: var(--text-body);
          max-width: 540px;
          margin: 32px auto 0;
          letter-spacing: 0.01em;
        }

        .stats {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 0;
          margin: 48px auto 0;
          max-width: 560px;
          border-top: 1px solid var(--divider);
          border-bottom: 1px solid var(--divider);
        }

        .stat {
          flex: 1;
          padding: 26px 12px;
          text-align: center;
        }

        .stat + .stat { border-left: 1px solid var(--divider); }

        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 38px);
          font-weight: 500;
          color: var(--copper);
          line-height: 1;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-subtle);
          margin-top: 12px;
        }

        .cta-block { text-align: center; margin-top: 44px; }

        .btn {
          display: inline-block;
          background: linear-gradient(135deg, #B87333 0%, #C4956A 100%);
          color: #1a1815;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 18px 52px;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: linear-gradient(135deg, #C4956A 0%, #D4A97A 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 24px rgba(184,115,51,0.2);
        }

        .btn-note {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-subtle);
          margin-top: 18px;
        }

        .book {
          margin: 64px auto 0;
          max-width: 660px;
          padding: 0 32px;
        }

        .book img {
          width: 100%;
          height: auto;
          display: block;
        }

        main { padding: 72px 0 0; }

        main p {
          font-size: 20px;
          line-height: 1.8;
          letter-spacing: 0.01em;
          margin-bottom: 28px;
          color: var(--text-body);
        }

        main p.emphasis { color: var(--text-primary); }

        main em { font-style: italic; color: var(--text-primary); }

        .quote {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(26px, 3.4vw, 34px);
          line-height: 1.4;
          color: var(--copper);
          text-align: center;
          margin: 56px auto;
          max-width: 580px;
        }

        .rule {
          width: 40px;
          height: 2px;
          background: rgba(184,115,51,0.6);
          margin: 64px auto;
        }

        .proof {
          text-align: center;
          padding: 0 0 8px;
        }

        .proof .kicker { margin-bottom: 24px; }

        .proof p {
          font-size: 20px;
          line-height: 1.8;
          color: var(--text-primary);
          max-width: 560px;
          margin: 0 auto 28px;
        }

        footer {
          margin-top: 88px;
          padding: 40px 0 140px;
          border-top: 1px solid var(--divider);
          text-align: center;
        }

        footer p {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(160,155,145,0.3);
        }

        .sticky {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 90;
          padding: 14px 20px calc(14px + env(safe-area-inset-bottom));
          background: rgba(26,24,21,0.94);
          backdrop-filter: blur(8px);
          border-top: 1px solid var(--divider);
          transform: translateY(110%);
          transition: transform 0.35s ease;
        }

        .sticky.visible { transform: translateY(0); }

        .sticky .btn {
          display: block;
          text-align: center;
          padding: 16px 0;
        }

        @media (min-width: 641px) {
          .sticky { display: none; }
          footer { padding-bottom: 72px; }
        }

        @media (max-width: 640px) {
          .wrap { padding: 0 24px; }
          header { padding-top: 52px; }
          .lede { font-size: 19px; margin-top: 26px; }
          main p, .proof p { font-size: 18px; }
          .stats { margin-top: 40px; }
          .stat { padding: 20px 6px; }
          .book { padding: 0 24px; margin-top: 52px; }
          main { padding-top: 56px; }
          .btn { padding: 16px 36px; letter-spacing: 2px; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(184,115,51,0.2); border-radius: 2px; }
      `}</style>

      <div className="grain"></div>

      <header className="wrap">
        <p className="kicker fade d1">Funded in under 24 hours</p>

        <h1 className="fade d1">Be Rich <em>Now</em></h1>
        <p className="deck fade d2">How to Want Everything You Have</p>

        <p className="lede fade d2">For anyone who has stood on the mountain of success and wondered whether this is really it.</p>

        {/* Stats from live Kickstarter campaign */}
        <div className="stats fade d3">
          <div className="stat">
            <div className="stat-num">171%</div>
            <div className="stat-label">Funded</div>
          </div>
          <div className="stat">
            <div className="stat-num">50</div>
            <div className="stat-label">Backers</div>
          </div>
          <div className="stat">
            <div className="stat-num">29</div>
            <div className="stat-label">Days left</div>
          </div>
        </div>

        <div className="cta-block fade d3">
          <a 
            href={kickstarterUrl} 
            className="btn" 
            target="_blank" 
            rel="noopener"
            onClick={() => handleKickstarterClick('hero')}
          >
            Preorder on Kickstarter
          </a>
          <p className="btn-note">The campaign closes September 17</p>
        </div>
      </header>

      <div className="book fade d4">
        <img src="/assets/be-rich-now-cover.jpg" alt="Be Rich Now by Michael Winslow Brown" />
      </div>

      <main className="wrap">
        <div className="narrow">
          <p className="emphasis">The five most dangerous words in the English language are, <em>I'll finally be happy when</em>. I said those words to myself for twenty three years, through the Naval Academy and through every year after the exit that was supposed to end the wanting.</p>

          <p>The money arrived on schedule and the wanting stayed exactly where it was. Two years after I sold my company I was losing a hundred thousand dollars a month, still a millionaire on paper, and too ashamed to look in the mirror because I had tasted freedom and handed it back.</p>

          <p>No one had ever trained me on what to do after I had money. We do not rise to the level of our expectations, we fall to the level of our training, and I had none for the thing I had spent my whole life chasing.</p>

          <p><em>Be Rich Now</em> is the playbook I needed then. It walks through whose game you are actually playing, how much is genuinely enough, the money stories your nervous system inherited before you could read them, and the practice of wanting the life already sitting in front of you.</p>

          <p className="quote">Two and a half years of writing, three manuscripts burned to the ground, and one question that outlasted all of it.</p>

          <div className="rule"></div>

          <div className="proof">
            <p className="kicker">Why now</p>
            <p>The goal was twenty thousand dollars across thirty days, and readers cleared it in less than one. Backing the campaign puts an early copy in your hands this fall and helps carry the book into rooms it would not otherwise reach.</p>
            <div className="cta-block">
              <a 
                href={kickstarterUrl} 
                className="btn" 
                target="_blank" 
                rel="noopener"
                onClick={() => handleKickstarterClick('footer')}
              >
                Preorder on Kickstarter
              </a>
              <p className="btn-note">One click to the campaign page</p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>Be Rich Now &middot; Michael Winslow Brown</p>
      </footer>

      <div className="sticky" id="sticky">
        <a 
          href={kickstarterUrl} 
          className="btn" 
          target="_blank" 
          rel="noopener"
          onClick={() => handleKickstarterClick('sticky')}
        >
          Preorder on Kickstarter
        </a>
      </div>
    </>
  );
}
