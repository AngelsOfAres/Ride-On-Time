export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (href: string) => {
      const id = href.slice(1);

      const el = document.getElementById(id);
      if (!el) return;

      const navHeight = document.querySelector('nav')?.clientHeight ?? 160;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
    };

  return (
    <footer
      className="relative pb-16 pt-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #06080f 0%, #030408 100%)',
        borderTop: '1px solid rgba(201,162,39,0.1)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,162,39,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            className="flex items-center gap-3 group"
          >
            <img
              src="logo.png"
              alt="Ride On Time"
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 2px rgba(201,162,39,0.5))', marginBottom: '-1.2rem' }}
            />
          </button>

          {/* Name */}
          <div>
            <div
              className="font-cinzel-decorative font-bold text-gold-gradient mb-1"
              style={{ fontSize: '2rem' }}
            >
              Ride On Time
            </div>
            <div
              className="font-cinzel text-md tracking-widest mb-1"
              style={{ color: 'var(--steel)', letterSpacing: '0.25em' }}
            >
              MYTHIC RAID GUILD
            </div>
            <div
              className="font-cinzel text-xs tracking-widest"
              style={{ color: 'var(--steel)', letterSpacing: '0.25em' }}
            >
              STORMRAGE &nbsp;&bull;&nbsp; US
            </div>
          </div>

          {/* Separator */}
          <div className="gold-separator-full max-w-xs" />

          {/* Links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Mythic', href: '#mythic' },
              { label: 'AotC', href: '#aotc' },
              { label: 'Recruitment', href: '#recruitment' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="font-cinzel text-xs tracking-widest transition-colors duration-200 hover:text-yellow-300"
                style={{ color: 'var(--steel)', letterSpacing: '0.15em' }}
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* Raid schedule */}
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-2 px-3 py-3"
            style={{
              background: 'rgba(201,162,39,0.05)',
              border: '1px solid rgba(201,162,39,0.12)',
            }}
          >
            <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold-400)', letterSpacing: '0.15em' }}>
              RAID DAYS
            </span>
            <span className="hidden sm:block w-px h-3 mx-2" style={{ background: 'rgba(201,162,39,0.3)' }} />
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs" style={{ color: 'var(--steel-light)', letterSpacing: '0.05em' }}>
                Thursday &nbsp;&bull;&nbsp; Friday
              </span>
              <span className="w-px h-3 mx-2" style={{ background: 'rgba(201,162,39,0.3)' }} />
              <span className="font-cinzel text-xs" style={{ color: 'var(--steel)', letterSpacing: '0.05em' }}>
                9 PM – 12AM EST
              </span>
            </div>
          </div>

          {/* Discord CTA */}
          <a
            href="https://discord.gg/kXzyhamxae"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-3 px-6 py-3 group transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(88,101,242,0.08)',
              border: '1px solid rgba(88,101,242,0.35)',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 127.14 96.36"
              className="transition-transform duration-300"
              style={{ fill: '#5865F2' }}
            >
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            <span
              className="font-cinzel text-xs tracking-widest transition-colors duration-200"
              style={{ color: '#a3aef2', letterSpacing: '0.15em' }}
            >
              JOIN US ON DISCORD
            </span>
          </a>

          {/* Copyright */}
          <p
            className="font-cinzel text-xs"
            style={{ color: 'rgba(136,153,170,0.4)', letterSpacing: '0.1em', fontSize: '11px' }}
          >
            &copy; {year} RIDE ON TIME — WORLD OF WARCRAFT GUILD.
            <br></br>
            NOT AFFILIATED WITH BLIZZARD ENTERTAINMENT.
          </p>
        </div>
      </div>
    </footer>
  );
}