import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Mythic', href: '#mythic' },
  { label: 'AotC', href: '#aotc' },
  { label: 'Recruitment', href: '#recruitment' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const navHeight = document.querySelector('nav')?.clientHeight ?? 160;
      const sections = links.map(l => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - navHeight - 10) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
    setActive(id);

    const el = document.getElementById(id);
    if (!el) return;

    const navHeight = document.querySelector('nav')?.clientHeight ?? 160;
    const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
    window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'
      }`}
      style={{
        border: '1px solid',
        borderColor: scrolled ? 'rgba(201,162,39,0.15)' : 'transparent',
        opacity: scrolled ? 1 : 0.98,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 md:h-32 flex items-center justify-between">
        {/* Logo mark */}
        <button
          onClick={() => handleNav('#home')}
          className="flex items-center gap-3 group"
        >
          <img
            src="logo.png"
            alt="Ride On Time"
            className="h-16 sm:h-20 md:h-32 w-auto object-contain transition-all duration-300 group-hover:scale-110"
            style={{ filter: 'drop-shadow(0 0 2px rgba(201,162,39,0.5))' }}
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`font-cinzel tracking-widest transition-all duration-300 relative group ${
                active === link.href.slice(1)
                  ? 'text-gold-400'
                  : 'text-steel-light hover:text-white'
              }`}
              style={{ letterSpacing: '0.15em', fontSize: '1rem' }}
            >
              {link.label.toUpperCase()}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-300 ${
                  active === link.href.slice(1) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => handleNav('#recruitment')}
            className="font-cinzel tracking-widest px-5 py-2 border border-yellow-400/40 text-yellow-300 hover:bg-yellow-400/10 hover:border-yellow-400/70 transition-all duration-300 hover:scale-105"
            style={{ letterSpacing: '0.15em', fontSize: '1rem' }}
          >
            APPLY NOW
          </button>
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
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-steel-light hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden glass-dark transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="font-cinzel tracking-widest text-left text-steel-light hover:text-yellow-300 transition-colors py-1"
              style={{ letterSpacing: '0.15em', fontSize: '1rem' }}
            >
              {link.label.toUpperCase()}
            </button>
          ))}
          <button
            onClick={() => handleNav('#recruitment')}
            className="font-cinzel tracking-widest px-5 py-2 border border-yellow-400/40 text-yellow-300 mt-2 w-full"
            style={{ letterSpacing: '0.15em', fontSize: '1rem' }}
          >
            APPLY NOW
          </button>

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

        </div>
      </div>
    </nav>
  );
}