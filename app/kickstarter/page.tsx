export default function KickstarterComingSoon() {
  return (
    <div className="min-h-screen bg-[#1a1815] text-[#E8E0D4] flex items-center justify-center px-6">
      <div className="max-w-[620px] text-center space-y-8">
        {/* Headline */}
        <h1 
          className="font-serif text-[clamp(36px,5vw,52px)] leading-tight tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Kickstarter is<br />coming soon.
        </h1>

        {/* Body */}
        <div 
          className="text-[19px] leading-relaxed text-[#C4BDB2] space-y-6"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '0.01em',
            lineHeight: '1.8'
          }}
        >
          <p>
            If you're on the free chapter list, you'll get first access before anyone else. 
            Early bird pricing, signed editions, and exclusive backer rewards.
          </p>
          
          <p>
            I'll send you the link when it goes live on <strong style={{ color: '#E8E0D4' }}>August 18th</strong>.
          </p>
        </div>

        {/* Divider */}
        <div className="pt-8">
          <div 
            className="w-12 h-[2px] mx-auto"
            style={{ 
              background: 'linear-gradient(135deg, #B87333 0%, #C4956A 100%)',
              opacity: 0.6
            }}
          />
        </div>

        {/* CTA */}
        <div className="pt-4">
          <a
            href="/"
            className="inline-block px-12 py-4 text-[#1a1815] text-[12px] uppercase tracking-[3px] rounded-sm transition-all duration-300 hover:-translate-y-[1px]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: 'linear-gradient(135deg, #B87333 0%, #C4956A 100%)',
              fontWeight: 400,
              boxShadow: '0 0 0 rgba(184,115,51,0)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #C4956A 0%, #D4A97A 100%)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(184,115,51,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #B87333 0%, #C4956A 100%)';
              e.currentTarget.style.boxShadow = '0 0 0 rgba(184,115,51,0)';
            }}
          >
            Get the free chapter
          </a>
        </div>

        {/* Footer */}
        <div className="pt-16">
          <p 
            className="text-[10px] uppercase tracking-[2px]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'rgba(160,155,145,0.3)',
              fontWeight: 300
            }}
          >
            Be Rich Now · Unbreakable Wealth
          </p>
        </div>
      </div>

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:wght@400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
