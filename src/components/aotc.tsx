import { useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  Ban,
  Trophy,
  Sparkles,
  Dice5,
  ShieldOff,
  LogOut,
  Users,
  Clock,
  Handshake,
} from 'lucide-react';

interface VibePoint {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const vibePoints: VibePoint[] = [
  {
    icon: <Trophy size={22} />,
    title: 'Heroic Clears, Vault-Optimized',
    description:
      "We push a clean heroic clear every week — skips included once they're unlocked — so alts and Mythic raiders can fill out their Great Vault without burning a second raid night.",
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Achievement Runs',
    description:
      'Once AOTC is locked in, we keep it light: achievement runs and fun content for anyone who wants to stick around late-season.',
  },
  {
    icon: <Dice5 size={22} />,
    title: 'Loot Is a Dice Roll',
    description:
      "We roll on loot, plain and simple. Use your bonus rolls — a DPS winning your BiS healing trinket is part of the charm, not a tragedy.",
  },
  {
    icon: <ShieldOff size={22} />,
    title: 'No Lockouts, No Log-Diving',
    description:
      "We don't hold lockouts hostage and we're not combing Warcraft Logs after the raid. Go play something else between raids — we'll still be here next Tuesday.",
  },
  {
    icon: <LogOut size={22} />,
    title: 'Once You\u2019ve Won, Make Room',
    description:
      "This crew isn't a permanent home for parse-chasers. Once you're geared and cleared, we'd rather you pass the torch than make the next casual feel behind.",
  },
  {
    icon: <Users size={22} />,
    title: 'Borrowed Strats, Zero Pressure',
    description:
      "We'll happily steal strats from the guild's Mythic team. Just don't treat Tuesday nights as a tryout for it — that's a different, harder beast entirely.",
  },
];

const welcomeList = [
  'Anyone not currently on the active Mythic roster',
  'Benched or rostered-out Mythic raiders — think sportsmanship clause, not punishment',
  'Alts gearing up for the Mythic vault on an off-night',
  'All classes and specs, no exceptions',
];

const notForList = [
  'Active Mythic roster members and their alts, so casual night actually stays casual',
  'Parse-watching, gearscore checks, or lockout gatekeeping',
  'Anyone looking to treat AOTC as a speed bump on the way to Mythic',
];

export default function AOTCTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="aotc"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06080f 0%, #0a0e1a 50%, #06080f 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 40% 30% at 80% 20%, rgba(30,58,92,0.4) 0%, transparent 70%),
                            radial-gradient(ellipse 40% 30% at 20% 80%, rgba(201,162,39,0.08) 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col items-center text-center mb-16">
          <span
            className="font-cinzel text-xs tracking-widest mb-4"
            style={{ color: 'var(--gold-400)', letterSpacing: '0.3em' }}
          >
            TUESDAY NIGHTS &middot; A DIFFERENT KIND OF RAID
          </span>
          <h2
            className="font-cinzel font-bold text-gold-gradient mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Remember When Raiding Was Fun?
          </h2>
          <div className="gold-separator mb-8" />
          <p
            className="max-w-3xl leading-relaxed font-light"
            style={{ color: 'var(--steel-light)', lineHeight: '1.8', fontSize: '1.15rem' }}
          >
            Before difficulties existed, showing up was the whole game. The AOTC Team brings that back. We enjoy the art, the music, and the boss design, get our Ahead of the Curve, and log
            off. No parses. No gearscore checks. No held lockouts. Just people who want to see the raid and have a good time doing it.
          </p>
        </div>

        {/* Who's welcome / not */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div
            className="reveal hover-card-wrapper relative overflow-hidden p-6 md:p-8"
            style={{
              background: 'rgba(10,14,26,0.7)',
              border: '1px solid rgba(106,173,106,0.22)',
              boxShadow: '0 20px 45px rgba(0,0,0,0.35)',
            }}
          >
            <div className="shine absolute inset-0 pointer-events-none" style={{ opacity: 0.35, mixBlendMode: 'screen' }} />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(106,173,106,0.6), transparent)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(106,173,106,0.12)', border: '1px solid rgba(106,173,106,0.35)' }}
                >
                  <CheckCircle2 size={18} style={{ color: '#6aad6a' }} />
                </div>
                <h3
                  className="font-cinzel font-semibold text-sm tracking-widest"
                  style={{ color: '#6aad6a', letterSpacing: '0.18em' }}
                >
                  WHO'S WELCOME
                </h3>
              </div>
              <ul className="flex flex-col gap-4">
                {welcomeList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#6aad6a', opacity: 0.85 }} />
                    <span className="font-cinzel text-sm" style={{ color: '#d8d8d8', lineHeight: '1.65' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="reveal hover-card-wrapper relative overflow-hidden p-6 md:p-8"
            style={{
              background: 'rgba(10,14,26,0.7)',
              border: '1px solid rgba(232,74,74,0.22)',
              boxShadow: '0 20px 45px rgba(0,0,0,0.35)',
            }}
          >
            <div className="shine absolute inset-0 pointer-events-none" style={{ opacity: 0.35, mixBlendMode: 'screen' }} />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(232,74,74,0.6), transparent)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(232,74,74,0.1)', border: '1px solid rgba(232,74,74,0.3)' }}
                >
                  <Ban size={18} style={{ color: '#e87a7a' }} />
                </div>
                <h3
                  className="font-cinzel font-semibold text-sm tracking-widest"
                  style={{ color: '#e87a7a', letterSpacing: '0.18em' }}
                >
                  NOT FOR
                </h3>
              </div>
              <ul className="flex flex-col gap-4">
                {notForList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#e87a7a', opacity: 0.85 }} />
                    <span className="font-cinzel text-sm" style={{ color: '#d8d8d8', lineHeight: '1.65' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* If you're good enough note */}
        <div
          className="reveal border-gold-glow mb-6 flex items-center justify-center gap-3 px-6 py-5 text-center flex-wrap"
          style={{ background: 'rgba(201,162,39,0.04)' }}
        >
          <Handshake size={18} style={{ color: 'var(--gold-400)', flexShrink: 0 }} />
          <p className="font-cinzel text-sm" style={{ color: 'var(--steel-light)', lineHeight: '1.7' }}>
            If a Mythic officer wants to poach one of our standouts for the Mythic roster, great. That's the system working.
          </p>
        </div>

        {/* Vibe grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {vibePoints.map((point, i) => (
            <div
              key={point.title}
              className="reveal hover-card-wrapper group/vibe relative p-6 overflow-hidden"
              style={{
                background: 'rgba(10,14,26,0.7)',
                border: '1px solid rgba(201,162,39,0.14)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="shine absolute inset-0 pointer-events-none"
                style={{ opacity: 0.5, mixBlendMode: 'screen' }}
              />
              <div
                className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover/vibe:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.15) 0%, transparent 70%)' }}
              />
              <div className="relative z-10">
                <div
                  className="w-11 h-11 flex items-center justify-center mb-4 transition-all duration-300 group-hover/vibe:scale-110"
                  style={{
                    background: 'rgba(201,162,39,0.1)',
                    border: '1px solid rgba(201,162,39,0.22)',
                    color: 'var(--gold-400)',
                  }}
                >
                  {point.icon}
                </div>
                <h4
                  className="font-cinzel font-semibold text-sm mb-2"
                  style={{ color: '#e8e8e8', letterSpacing: '0.03em' }}
                >
                  {point.title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--steel-light)', lineHeight: '1.65' }}>
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info strip */}
        <div
          className="reveal flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 mb-10"
          style={{ background: 'rgba(10,14,26,0.7)', border: '1px solid rgba(201,162,39,0.15)' }}
        >
          {[
            { icon: <Clock size={18} />, label: 'RAID TIME', value: <>Tuesday &nbsp;&bull;&nbsp; 9:00 &ndash; 11:00 PM EST</> },
            { icon: <Trophy size={18} />, label: 'CURRENT PROGRESSION', value: <>9/9 H Midnight S1 &nbsp;&bull;&nbsp; 1/1 H Sporefall</> },
            { icon: <Users size={18} />, label: 'NEEDS', value: <>All Classes &amp; Specs</> },
          ].map((entry) => (
            <div
              key={entry.label}
              className="flex-1 flex items-center gap-4 px-6 py-6 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)', color: 'var(--gold-400)' }}
              >
                {entry.icon}
              </div>
              <div>
                <div
                  className="font-cinzel text-xs tracking-widest mb-1"
                  style={{ color: 'var(--steel)', letterSpacing: '0.15em' }}
                >
                  {entry.label}
                </div>
                <div className="font-cinzel text-sm" style={{ color: '#e8e8e8' }}>
                  {entry.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}