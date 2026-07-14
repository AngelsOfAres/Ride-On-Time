import { useEffect, useRef, useState } from 'react';

type Difficulty = 'Heroic' | 'Mythic';

const raids = [
  {
    name: 'The Voidspire',
    tier: 'Midnight - Season 1',
    image: 'https://wow.zamimg.com/uploads/guide/header/37357f1e59c5b49de2c0dd9af4b11529888f67ce.jpg',
    bosses: [
      'Imperator Averzian',
      'Vorasius',
      'Fallen-King Salhadaar',
      'Vaelgor & Ezzorak',
      'Lightblinded Vanguard',
      'Crown of the Cosmos (Current Prog)',
    ],
    progress: {
      Heroic: 6,
      Mythic: 5,
    },
  },
  {
    name: 'The Dreamrift',
    tier: 'Midnight - Season 1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCGZ0OLZnEIgfwUEGxSDRNdOyvG0vCc2LyDFMAcQdRxZHZJrzHqFIKDSk&s=10',
    bosses: [
      'Chimaerus',
    ],
    progress: {
      Heroic: 1,
      Mythic: 1,
    },
  },
  {
    name: "March on Quel'Danas",
    tier: 'Midnight - Season 1',
    image: 'https://wow.zamimg.com/uploads/guide/header/fcfbc7d789bd78e9aa578cb8f3bf7d3c707ee39a.jpg',
    bosses: [
      "Belo'ren, Child of Al'ar",
      "L'ura, Midnight Falls",
    ],
    progress: {
      Heroic: 2,
      Mythic: 0,
    },
  },
  {
    name: 'Sporefall',
    tier: 'Midnight - Season 1',
    image: 'https://wow.zamimg.com/uploads/screenshots/normal/1288541.jpg',
    bosses: [
      'Rotmire',
    ],
    progress: {
      Heroic: 1,
      Mythic: 1,
    },
  },
];

const difficultyColors: Record<Difficulty, { bar: string; text: string; badge: string }> = {
  Heroic: {
    bar: 'linear-gradient(90deg, #1a5a8a, #2a8acd)',
    text: '#4aaae8',
    badge: 'rgba(26,90,138,0.2)',
  },
  Mythic: {
    bar: 'linear-gradient(90deg, #7a2a8a, #c44acd)',
    text: '#d46ae8',
    badge: 'rgba(122,42,138,0.2)',
  },
};
interface ProgressBarProps {
  killed: number;
  total: number;
  difficulty: Difficulty;
  animate: boolean;
}

interface ProgressBarProps {
  killed: number;
  total: number;
  difficulty: Difficulty;
  animate: boolean;
}

function ProgressBar({ killed, total, difficulty, animate }: ProgressBarProps) {
  const pct = animate ? (killed / total) * 100 : 0;
  const colors = difficultyColors[difficulty];

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 progress-bar-track">
        <div
          className="progress-bar-fill h-full"
          style={{
            width: `${pct}%`,
            background: colors.bar,
            transition: animate ? 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

export default function RaidProgress() {
  const [activeRaid, setActiveRaid] = useState(0);
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>('Mythic');
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          sectionRef.current?.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Re-animate when raid tab changes
  const handleRaidChange = (index: number) => {
    if (index === activeRaid) return;
    setAnimate(false);
    setActiveRaid(index);
    setTimeout(() => setAnimate(true), 50);
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    if (difficulty === activeDifficulty) return;
    setAnimate(false);
    setActiveDifficulty(difficulty);
    setTimeout(() => setAnimate(true), 50);
  };

  const raid = raids[activeRaid];
  const killed = raid.progress[activeDifficulty];
  const total = raid.bosses.length;

  return (
    <section
      id="mythic"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06080f 0%, #0d1420 50%, #06080f 100%)' }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,162,39,0.08) 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col items-center text-center mb-16">
          <span
            className="font-cinzel text-xs tracking-widest mb-4"
            style={{ color: 'var(--gold-400)', letterSpacing: '0.3em' }}
          >
            RAID PROGRESSION
          </span>
          <h2
            className="font-cinzel font-bold text-gold-gradient mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Current Tier
          </h2>
          <div className="gold-separator" />
        </div>

        {/* Raid card */}
        <div className="reveal border border-yellow-400/10" style={{ background: 'rgba(10,14,26,0.7)' }}>
          {/* Raid tabs */}
            <div className="flex flex-col sm:flex-row divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:divide-white/10 border-b border-yellow-400/10">
              {raids.map((raidTab, index) => (
                <button
                  key={raidTab.name}
                  onClick={() => handleRaidChange(index)}
                  className="flex-1 py-3 px-3 sm:px-4 text-center font-cinzel text-sm tracking-widest transition-all duration-300"
                  style={{
                    letterSpacing: '0.12em',
                    color: activeRaid === index ? 'var(--gold-300)' : 'var(--steel)',
                    background: activeRaid === index ? 'rgba(201,162,39,0.08)' : 'transparent',
                    borderBottom: activeRaid === index ? '2px solid var(--gold-300)' : '2px solid transparent',
                  }}
                >
                  <span className="uppercase block" style={{ fontSize: '0.85rem' }}>
                    {raidTab.name}
                  </span>
                </button>
              ))}
            </div>

          {/* Raid banner */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img
              src={raid.image}
              alt={raid.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.9) saturate(0.9)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(10,14,26,0.95) 100%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span
                className="font-cinzel text-xs tracking-widest block mb-2"
                style={{ color: 'var(--gold-400)', letterSpacing: '0.25em' }}
              >
                {raid.tier}
              </span>
              <h3 className="font-cinzel font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
                {raid.name}
              </h3>
            </div>
          </div>

          {/* Difficulty tabs */}
          <div className="flex border-b border-yellow-400/10 mt-4">
            {(['Heroic', 'Mythic'] as Difficulty[]).map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className="flex-1 py-3 text-center font-cinzel text-xs tracking-widest transition-all duration-300"
                style={{
                  letterSpacing: '0.2em',
                  color: activeDifficulty === difficulty ? 'var(--gold-300)' : 'var(--steel)',
                  background: activeDifficulty === difficulty ? 'rgba(201,162,39,0.08)' : 'transparent',
                  borderBottom: activeDifficulty === difficulty ? '2px solid var(--gold-300)' : '2px solid transparent',
                }}
              >
                {difficulty.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Boss list */}
          <div className="p-6 md:p-8">
            {/* Overall progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--steel)', letterSpacing: '0.15em' }}>
                  OVERALL PROGRESS
                </span>
                <span
                  className="font-cinzel font-bold text-sm"
                  style={{ color: difficultyColors[activeDifficulty].text }}
                >
                  {killed}/{total} BOSSES
                </span>
              </div>
              <ProgressBar killed={killed} total={total} difficulty={activeDifficulty} animate={animate} />
            </div>

            {/* Individual bosses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {raid.bosses.map((boss, i) => {
                const isKilled = i < killed;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 px-4 transition-all duration-300"
                    style={{
                      background: isKilled
                        ? `${difficultyColors[activeDifficulty].badge}`
                        : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isKilled ? `${difficultyColors[activeDifficulty].text}30` : 'rgba(255,255,255,0.05)'}`,
                    }}
                  >
                    <div
                      className="w-6 h-6 flex items-center justify-center flex-shrink-0 font-cinzel font-bold text-xs"
                      style={{
                        background: isKilled ? difficultyColors[activeDifficulty].bar : 'rgba(255,255,255,0.05)',
                        color: isKilled ? '#fff' : 'var(--steel)',
                        borderRadius: '50%',
                      }}
                    >
                      {isKilled ? '✓' : i + 1}
                    </div>
                    <span
                      className="font-cinzel text-sm flex-1"
                      style={{
                        color: isKilled ? '#e8e8e8' : 'var(--steel)',
                        textDecoration: isKilled ? 'none' : 'none',
                      }}
                    >
                      {boss}
                    </span>
                    {isKilled && (
                      <span
                        className="font-cinzel text-xs tracking-wider"
                        style={{ color: difficultyColors[activeDifficulty].text, letterSpacing: '0.1em', fontSize: '10px' }}
                      >
                        DEFEATED
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
