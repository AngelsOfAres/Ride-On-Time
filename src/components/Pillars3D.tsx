import { useRef, useState } from 'react';
import { Sword, Shield, Crown } from 'lucide-react';

function TiltCard({
  item,
}: {
  item: { title: string; body: string; icon: React.ReactNode; delay: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 -> 1
    const py = (e.clientY - rect.top) / rect.height; // 0 -> 1

    const maxTilt = 8; // degrees
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = -(py - 0.5) * maxTilt * 2;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale3d(1.02,1.02,1.02)`,
    });
    setGlow({ x: px * 100, y: py * 100, active: true });
  };

  const handleLeave = () => {
    setStyle({
      transform:
        'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1,1,1)',
    });
    setGlow((g) => ({ ...g, active: false }));
  };

  return (
    <div
      style={{ perspective: '900px', transitionDelay: item.delay }}
      className="reveal hover-card-wrapper hover-card"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative p-8 corner-ornament group hover:border-gold-glow overflow-hidden rounded-xl"
        style={{
          background: 'rgba(20, 36, 82, 0.72)',
          border: '1px solid transparent',
          backgroundImage: `
            linear-gradient(rgba(12, 14, 19, 0.72), rgba(16, 18, 22, 0.72)),
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
          transformStyle: 'preserve-3d',
          transition: 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms ease-out, box-shadow 180ms ease-out',
          boxShadow: glow.active
            ? 'inset 0 1px rgba(255,255,255,.08), inset 0 -10px 25px rgba(0, 0, 0, 0.5), 0 25px 55px rgba(0, 0, 0, 0.45)'
            : 'inset 0 1px rgba(255,255,255,.08), inset 0 -10px 25px rgba(0, 0, 0, 0.28), 0 12px 28px rgba(0, 0, 0, 0.3)',
          ...style,
        }}
      >
        {/* Cursor-tracked spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glow.active ? 1 : 0,
            background: `radial-gradient(circle 120px at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.12), transparent 70%)`,
          }}
        />

        {/* Diagonal shine sweep */}
        <div
          className="shine pointer-events-none absolute inset-0"
          style={{ zIndex: 2 }}
        />

        {/* Content lifted in Z-space so it visually separates from the card face on tilt */}
        <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
          <div
            className="mb-5 p-3 inline-flex transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
            style={{
              background: 'rgba(201,162,39,0.08)',
              border: '1px solid rgba(201,162,39,0.15)',
              color: 'var(--gold-400)',
              boxShadow: glow.active ? '0 8px 16px rgba(201,162,39,0.06)' : 'none',
              transition: 'transform 300ms, box-shadow 300ms',
            }}
          >
            {item.icon}
          </div>
          <h3
            className="font-cinzel font-semibold text-lg mb-3"
            style={{ color: '#e8e8e8' }}
          >
            {item.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--steel-light)', lineHeight: '1.7' }}
          >
            {item.body}
          </p>
        </div>

        {/* Bottom edge highlight to sell the "raised" 3D feel */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
          }}
        />
      </div>
    </div>
  );
}

export default function Pillars3D() {
  const pillars = [
    {
      title: 'Progression First',
      body: 'We raid with purpose. Every pull is analyzed, every wipe a lesson. Our structured approach to mythic progression keeps us efficient and competitive.',
      icon: <Sword size={22} />,
      delay: '0ms',
    },
    {
      title: 'Tight Community',
      body: "Beyond the raid team, Ride On Time is a home. We run keys together, theorycraft late into the night, and celebrate each other's victories.",
      icon: <Shield size={22} />,
      delay: '200ms',
    },
    {
      title: 'Long Legacy',
      body: 'Our raiders have multiple tiers of Cutting Edge achievements. A track record built on consistency, smart recruiting, and leadership that knows what it takes.',
      icon: <Crown size={22} />,
      delay: '400ms',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {pillars.map((item, i) => (
        <TiltCard key={i} item={item} />
      ))}
    </div>
  );
}
