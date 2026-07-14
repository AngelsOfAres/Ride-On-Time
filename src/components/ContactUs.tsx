import { useEffect, useRef, useState } from 'react';
import { FaDiscord } from "react-icons/fa";
import { SiBattledotnet } from "react-icons/si";

const officers = [
  { name: 'REVIKA', battleTag: 'kennedy#1639', discord: 'revika' },
  { name: 'KIL', battleTag: 'Lychenz#1926', discord: 'lychenz' },
  { name: 'ZEUS', battleTag: 'Zeus#9101', discord: 'x1ms' },
  { name: 'KINN', battleTag: 'kinetix#11410', discord: 'kinetixxx' },
  { name: 'ANGEL', battleTag: 'AngelOfAres#1382', discord: 'angel_of_ares' },
  { name: 'BERBALERB', battleTag: 'Berbalerb#8642', discord: 'purebchad' },
  { name: 'HITTA', battleTag: 'Hitta#1122', discord: 'hitta' },
  { name: 'BOOJIE', battleTag: 'Boojie#3344', discord: 'buggz0909' },
];

// ---- Palette tokens (kept local so the card is self-contained) ----
const GOLD_100 = '#ffd969';
const GOLD_300 = '#d1a94b';
const GOLD_500 = '#d19e38';
const GOLD_700 = '#b1812a';
const GOLD_900 = '#553d13';
const NAVY_900 = '#0d1730';
const NAVY_700 = '#16234a';
const NAVY_500 = '#24356b';
const CREAM = '#f7ecd3';

function BadgeIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `linear-gradient(155deg, ${GOLD_100}, ${GOLD_500})`,
        boxShadow: `inset 0 1px rgba(255,255,255,0.5), 0 1px 3px rgba(0,0,0,0.4)`,
      }}
    >
      {children}
    </div>
  );
}

function InfoPlaque({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-2 py-2"
      style={{
        background: `linear-gradient(155deg, ${NAVY_700}, ${NAVY_900})`,
        border: `1px solid ${GOLD_700}66`,
        boxShadow: `inset 0 1px rgba(255,255,255,0.06), inset 0 -6px 14px rgba(0,0,0,0.4)`,
      }}
    >
      <div className="flex items-center gap-2">
        <BadgeIcon>{icon}</BadgeIcon>
          <div className="mt-0.5 truncate text-sm sm:text-md md:text-lg font-medium" style={{ color: CREAM }}>
            {value}
          </div>
      </div>
    </div>
  );
}

function TiltCard({ officer }: { officer: { name: string; battleTag: string; discord: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const maxTilt = 8;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = -(py - 0.5) * maxTilt * 2;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
    });
    setGlow({ x: px * 100, y: py * 100, active: true });
  };

  const handleLeave = () => {
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)' });
    setGlow((prev) => ({ ...prev, active: false }));
  };

  return (
    <div style={{ perspective: '900px' }} className="reveal hover-card-wrapper">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative overflow-hidden rounded-[34px] p-4 sm:p-6 transition-all duration-300"
        style={{
          background: `linear-gradient(155deg, ${GOLD_100} 0%, ${GOLD_300} 32%, ${GOLD_500} 68%, ${GOLD_700} 100%)`,
          border: `1px solid ${GOLD_900}`,
          boxShadow: glow.active
            ? `inset 0 1px rgba(255,255,255,0.65), inset 0 -14px 26px rgba(90,58,10,0.45), 0 24px 56px rgba(0,0,0,0.4)`
            : `inset 0 1px rgba(255,255,255,0.5), inset 0 -10px 22px rgba(90,58,10,0.35), 0 12px 28px rgba(0,0,0,0.3)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms ease-out',
          ...style,
        }}
      >
        {/* warm metallic sheen that follows the cursor, like light catching foil */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glow.active ? 1 : 0,
            background: `radial-gradient(circle 140px at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.45), transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 shine"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.25), transparent 45%, rgba(120,84,20,0.15) 75%)`,
            opacity: 0.6,
          }}
        />

        <div style={{ transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}>
          <div className="mb-3 flex items-center justify-center">
            <div
              className="font-cinzel font-semibold text-xl sm:text-2xl md:text-2xl tracking-wide w-full text-center"
              style={{ color: NAVY_900, textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}
            >
              {officer.name}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-lg">
            <InfoPlaque icon={<SiBattledotnet color={NAVY_900} />} value={officer.battleTag} />
            <InfoPlaque icon={<FaDiscord color={NAVY_900} />} value={officer.discord} />
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-6 left-6 right-6 h-px opacity-70"
          style={{ background: `linear-gradient(90deg, transparent, ${NAVY_500}, transparent)` }}
        />
      </div>
    </div>
  );
}

export default function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );

    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: `linear-gradient(180deg, #06080f 0%, #0a0e1a 100%)` }}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        <div className="text-center mb-12 reveal">
          <span
            className="font-cinzel text-xs tracking-widest mb-4 inline-block"
            style={{ color: GOLD_300, letterSpacing: '0.3em' }}
          >
            CONTACT US
          </span>
          <h2 className="font-cinzel font-bold text-gold-gradient" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Officer Contacts
          </h2>
          <p className="mt-4 text-lg max-w-full mx-auto" style={{ color: '#9aa4bd', lineHeight: '1.8' }}>
            Reach out to any of our officers via Battle.net or Discord for recruitment questions, raid support, or guild information.
          </p>
        </div>

        <div className="font-cinzel reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {officers.map((officer) => (
            <TiltCard key={officer.name} officer={officer} />
          ))}
        </div>
      </div>
    </section>
  );
}