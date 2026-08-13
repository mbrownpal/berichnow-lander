import Link from 'next/link';

export default function KickstarterComingSoon() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:wght@400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-[#1a1815] text-[#E8E0D4] flex items-center justify-center px-6">
        <div className="max-w-[620px] text-center space-y-8">
          {/* Headline */}
          <h1 
            className="text-[clamp(36px,5vw,52px)] leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Kickstarter is<br />coming soon.
          </h1>

          {/* Body */}
          <div 
            className="text-[19px] text-[#C4BDB2] space-y-6"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '0.01em',
              lineHeight: '1.8'
            }}
          >
            <p>
              If you&apos;re on the free chapter list, you&apos;ll get first access before anyone else. 
              Early bird pricing, signed editions, and exclusive backer rewards.
            </p>
            
            <p>
              I&apos;ll send you the link when it goes live on <strong className="text-[#E8E0D4]">August 18th</strong>.
            </p>
          </div>

          {/* Divider */}
          <div className="pt-8">
            <div 
              className="w-12 h-[2px] mx-auto opacity-60"
              style={{ 
                background: 'linear-gradient(135deg, #B87333 0%, #C4956A 100%)'
              }}
            />
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block px-12 py-4 text-[#1a1815] text-[12px] uppercase tracking-[3px] rounded-sm transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_4px_24px_rgba(184,115,51,0.2)]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: 'linear-gradient(135deg, #B87333 0%, #C4956A 100%)',
                fontWeight: 400
              }}
            >
              Get the free chapter
            </Link>
          </div>

          {/* Footer */}
          <div className="pt-16">
            <p 
              className="text-[10px] uppercase tracking-[2px] opacity-30"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: '#A09B91',
                fontWeight: 300
              }}
            >
              Be Rich Now · Unbreakable Wealth
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
