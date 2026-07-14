import { useEffect, useRef, useState } from 'react';
import { Shield, Crown, Users } from 'lucide-react';
import Pillars3D from './Pillars3D';

interface StatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
}

function AnimatedStat({ end, suffix = '', prefix = '', label, icon }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * end));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(end);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 p-3 sm:p-6 relative group">
      <div
        className="p-3 rounded-full mb-1 transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'rgba(201,162,39,0.1)',
          border: '1px solid rgba(201,162,39,0.2)',
          color: 'var(--gold-400)',
        }}
      >
        {icon}
      </div>
      <div className="font-cinzel font-bold text-2xl sm:text-3xl md:text-4xl text-gold-gradient">
        {prefix}{count}{suffix}
      </div>
      <div className="font-cinzel text-xs tracking-widest text-center" style={{ color: 'var(--steel)', letterSpacing: '0.15em' }}>
        {label.toUpperCase()}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #06080f 0%, #0a0e1a 50%, #06080f 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 40% 30% at 20% 50%, rgba(30,58,92,0.4) 0%, transparent 70%),
                            radial-gradient(ellipse 40% 30% at 80% 50%, rgba(201,162,39,0.08) 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        {/* Section header */}
        <div className="reveal flex flex-col items-center text-center mb-20">
          <span
            className="font-cinzel text-xs tracking-widest mb-4"
            style={{ color: 'var(--gold-400)', letterSpacing: '0.3em' }}
          >
            OUR STORY
          </span>
          <h2
            className="font-cinzel font-bold text-gold-gradient mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            The Guild
          </h2>
          <div className="gold-separator" />
          <div
            className="mt-8 w-full leading-relaxed font-light"
            style={{ color: 'var(--steel-light)', lineHeight: '1.8', fontSize: '1.2rem' }}
          >
            Welcome to Ride On Time, where we prove that "Cutting Edge" and "Clinical Depression" don't have to be synonyms.
            <br /><br />
            We are a group of former CE and Mythic raiders with CE aspirations, who decided to build our own guild and community from the ground up, with a focus on building a long-lasting guild to try and find that sweet spot of high performance and low ego.
            <br /><br />
            To accomplish that, we prioritize respect for each other's time and efforts. Which means that raiders may be benched if they are not putting in the effort to improve their performance, learning from their mistakes, or failing to show up on time and ready to roll.
            It also means that we always remember that we are hitting virtual dragons for digital pants. It's not that serious.
            <br /><br />
            <div className="mt-3 space-y-2">
              We offer a consistent core group of officers and players with decades of combined experience in raids, mythic plus, who are willing to help gear, review logs, discuss ways to improve, as well as just chill.<br />
              Flasks, repairs, food, and other raid essentials are provided.
              <br /><br />
              If this sounds appealing to you, hit us up on discord and join for a raid or a night of dungeons, and see if the vibes vibe.
            </div>
          </div>
        </div>

        {/* Three pillars (3D replacement) */}
        <Pillars3D />

        {/* Stats */}
        <div
          className="reveal grid grid-cols-3 md:grid-cols-3 gap-0 border border-yellow-400/10 text-center"
          style={{ background: 'rgba(10,14,26,0.6)' }}
        >
          <AnimatedStat end={120} suffix="+" label="Guild Members" icon={<Users size={20} />} />
          <AnimatedStat end={2026} label="Established" icon={<Crown size={20} />} />
          <AnimatedStat end={100} prefix="Top " label="Realm" icon={<Shield size={20} />} />
        </div>
      </div>
    </section>
  );
}
