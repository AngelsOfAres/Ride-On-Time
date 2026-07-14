import { useEffect, useRef, type PointerEvent, type CSSProperties } from 'react';
import { IoShieldSharp } from 'react-icons/io5';
import { GiHealthNormal } from "react-icons/gi";
import { RiSwordFill } from "react-icons/ri";

type Role = 'Tank' | 'Healer' | 'DPS';

interface Member {
  name: string;
  classColor: string;
  className: string;
  spec: string;
  role: Role;
  realm: string;
}

export const members: Member[] = [
  { name: 'Revikkuh', classColor: '#0070DE', className: 'Shaman', spec: 'Restoration', role: 'Healer', realm: 'stormrage' },
  { name: 'Booj', classColor: '#00FF96', className: 'Monk', spec: 'Brewmaster', role: 'Tank', realm: 'sargeras' },
  { name: 'Berbatea', classColor: '#00FF96', className: 'Monk', spec: 'Brewmaster', role: 'Tank', realm: 'malganis' },
  { name: 'Killed', classColor: '#C41E3A', className: 'Death Knight', spec: 'Blood', role: 'Tank', realm: 'garrosh' },
  { name: 'Imzeus', classColor: '#C69B6D', className: 'Warrior', spec: 'Fury', role: 'DPS', realm: 'stormrage' },
  { name: 'Kinnpi', classColor: '#ffffff', className: 'Priest', spec: 'Discipline', role: 'Healer', realm: 'thrall' },
  { name: 'Angelofares', classColor: '#AAD372', className: 'Hunter', spec: 'Marksmanship', role: 'DPS', realm: 'illidan' },
  { name: 'Pepperjacked', classColor: '#3FC7EB', className: 'Mage', spec: 'Frost', role: 'DPS', realm: 'proudmoore' },
  { name: 'Narfjones', classColor: '#F48CBA', className: 'Paladin', spec: 'Retribution', role: 'DPS', realm: 'stormrage' },
  { name: 'Morraice', classColor: '#C41E3A', className: 'Death Knight', spec: 'Unholy', role: 'DPS', realm: 'thrall' },
  { name: 'Xuelin', classColor: '#A330C9', className: 'Demon Hunter', spec: 'Devourer', role: 'DPS', realm: 'illidan' },
  { name: 'Fuzzyxo', classColor: '#FF7C0A', className: 'Druid', spec: 'Restoration', role: 'Healer', realm: 'tichondrius' },
  { name: 'Boxxed', classColor: '#AAD372', className: 'Hunter', spec: 'Beast Mastery', role: 'DPS', realm: 'stormrage' },
  { name: 'Hotdaug', classColor: '#33937F', className: 'Evoker', spec: 'Augmentation', role: 'DPS', realm: 'stormrage' },
  { name: 'Mutegen', classColor: '#FFF468', className: 'Rogue', spec: 'Subtlety', role: 'DPS', realm: 'dalaran' },
  { name: 'Terdfarmer', classColor: '#ffffff', className: 'Priest', spec: 'Shadow', role: 'DPS', realm: 'zuljin' },
  { name: 'Æsîr', classColor: '#C41E3A', className: 'Death Knight', spec: 'Frost', role: 'DPS', realm: 'wyrmrest-accord' },
  { name: 'Lailanna', classColor: '#F48CBA', className: 'Paladin', spec: 'Retribution', role: 'Healer', realm: 'stormrage' },
  { name: 'Siegez', classColor: '#AAD372', className: 'Hunter', spec: 'Survival', role: 'DPS', realm: 'area52' },
  { name: 'Velastaria', classColor: '#3FC7EB', className: 'Mage', spec: 'Frost', role: 'DPS', realm: 'proudmoore' },
  { name: 'Lathel', classColor: '#3FC7EB', className: 'Mage', spec: 'Frost', role: 'DPS', realm: 'thrall' },
  { name: 'Snippysnap', classColor: '#33937F', className: 'Evoker', spec: 'Preservation', role: 'Healer', realm: 'malganis' },
  { name: 'Yoloswagcrew', classColor: '#F48CBA', className: 'Paladin', spec: 'Holy', role: 'DPS', realm: 'arthas' },
  { name: 'Oriaris', classColor: '#8788EE', className: 'Warlock', spec: 'Demonology', role: 'DPS', realm: 'thrall' },
  { name: 'Alottalicki', classColor: '#F48CBA', className: 'Paladin', spec: 'Retribution ', role: 'DPS', realm: 'stormrage' },
];

const roleColors: Record<Role, string> = {
  Tank: '#4aaae8',
  Healer: '#6aad6a',
  DPS: '#e84a4a',
};

const roleIcons: Record<Role, React.ReactNode> = {
  Tank: <IoShieldSharp size={16} />,
  Healer: <GiHealthNormal size={16} />,
  DPS: <RiSwordFill size={16} />,
};

const useCardTilt = () => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    // don't perform tilt for touch pointers so native scrolling works
    if ((e as PointerEvent).pointerType === 'touch') return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 24;
    const rotateX = -((y / rect.height) - 0.5) * 24;

    ref.current.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0px)`;

    ref.current.style.setProperty('--mx', `${x}px`);
    ref.current.style.setProperty('--my', `${y}px`);
  };

  const onLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform =
      'rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return {
    ref,
    onMove,
    onLeave,
  };
};

function RosterCard({ member }: { member: Member; index: number }) {
  const tilt = useCardTilt();
  const realm = member.realm || 'illidan';
  // Preserve special characters (é, î, Æ, etc.) and percent-encode them,
  // rather than stripping them — that's what raider.io/armory expect.
  // e.g. "Æsîr" -> "%C3%86s%C3%AEr"
  const slug = encodeURIComponent(
    member.name.replace(/['\s]+/g, '-')
  );
  const url = `https://worldofwarcraft.blizzard.com/en-us/character/us/${realm}/${slug}/`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block roster-card-link"
      style={{ display: 'block', touchAction: 'pan-y', perspective: '1400px' }}
    >
      <div
        ref={tilt.ref}
        onPointerMove={tilt.onMove}
        onPointerLeave={tilt.onLeave}
        className="group roster-card relative overflow-hidden rounded-xl p-6"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          willChange: 'transform',
          transform: 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(var(--card-scale,1))',
          transition: 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms ease-out',
          background: 'rgba(20, 36, 82, 0.72)',
          border: '1px solid transparent',
          backgroundImage: `
            linear-gradient(rgba(12, 14, 19, 0.72),rgba(16, 18, 22, 0.72)),
            linear-gradient(
              135deg,
              rgba(255,255,255,.15),
              transparent 30%,
              rgba(255,255,255,.04),
              transparent 70%,
              rgba(255,255,255,.18)
            )`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box,border-box',
          boxShadow: `
            inset 0 1px rgba(255,255,255,.08),
            inset 0 -10px 25px rgba(0, 0, 0, 0.5),
            0 25px 55px rgba(0, 0, 0, 0.45)`,
          '--mx': '50px',
          '--my': '50px',
        } as CSSProperties}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(-10px)',
            background: '#03091d',
            filter: 'brightness(.65)',
            zIndex: 0,
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at var(--mx) var(--my), ${member.classColor}45, transparent 55%)`,
            opacity: 0.85,
            zIndex: 1,
          }}
        />

        <div
          className="shine absolute inset-0 pointer-events-none"
          style={{ zIndex: 2, opacity: 0.8, mixBlendMode: 'screen', borderRadius: 'inherit' }}
        />

        {/* External links (hidden until hover) */}
        <div
          className="card-links absolute flex gap-3 items-center"
          style={{ zIndex: 60, top: 68, right: 10 }}
        >
          <a
            href={`https://raider.io/characters/us/${realm}/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on raider.io`}
          >
            <img
              src="https://cdn.raiderio.net/images/brand/Mark_2ColorWhite.png"
              alt="raider.io"
              style={{ width: 22, height: 22, display: 'block', transform: 'translateZ(44px)' }}
            />
          </a>

          <a
            href={`https://www.warcraftlogs.com/character/us/${realm}/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on Warcraft Logs`}
          >
            <img
              src="https://assets.rpglogs.com/img/warcraft/header-logo.png"
              alt="warcraftlogs"
              style={{ width: 22, height: 22, display: 'block', transform: 'translateZ(44px)' }}
            />
          </a>
        </div>

        <div
          className="absolute top-4 right-4 flex items-center justify-center"
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            transform: 'translateZ(55px)',
            background: `${roleColors[member.role]}18`,
            border: `1px solid ${roleColors[member.role]}66`,
            color: roleColors[member.role],
            boxShadow: `0 0 22px ${roleColors[member.role]}55`,
          }}
        >
          {roleIcons[member.role]}
        </div>

        <div
          className="font-cinzel font-semibold text-xl mb-0.5"
          style={{ transform: 'translateZ(34px)' }}
        >
          {member.name}
        </div>

        <div
          className="font-cinzel text-md"
          style={{
            transform: 'translateZ(22px)',
            color: member.classColor,
            textShadow: `0 0 6px ${member.classColor}`,
          }}
        >
          {member.spec} {member.className}
        </div>
      </div>
    </a>
  );
}

export default function Roster() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="roster"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06080f 0%, #0a0e1a 50%, #06080f 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse 40% 30% at 80% 50%, rgba(30,58,92,0.5) 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col items-center text-center mb-16">
          <span
            className="font-cinzel text-xs tracking-widest mb-4"
            style={{ color: 'var(--gold-400)', letterSpacing: '0.3em' }}
          >
            MEET THE TEAM
          </span>
          <h2
            className="font-cinzel font-bold text-gold-gradient mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            The Mythic Roster
          </h2>
          <div className="gold-separator" />
        </div>

        {/* Role summary */}
        <div className="reveal grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
          {(['Tank', 'Healer', 'DPS'] as Role[]).map(role => {
            const count = members.filter(m => m.role === role).length;
            return (
              <div
                key={role}
                className="flex flex-col items-center gap-2 py-4 px-3"
                style={{
                  background: `${roleColors[role]}10`,
                  border: `1px solid ${roleColors[role]}30`,
                }}
              >
                <span className="text-xl">{roleIcons[role]}</span>
                <span className="font-cinzel font-bold text-4xl" style={{ color: roleColors[role] }}>{count}</span>
                <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--steel)', letterSpacing: '0.1em', fontSize: '16px' }}>
                  {(role === 'DPS' ? 'DPS' : `${role}s`).toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Member grid */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((member, i) => (
            <RosterCard key={`${member.name}-${i}`} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}