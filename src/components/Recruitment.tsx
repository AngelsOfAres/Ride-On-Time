import { useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { FaUserFriends } from "react-icons/fa";
import { GiCrownedSkull } from "react-icons/gi";
import { IoSkull } from "react-icons/io5";

type Status = 'Mythic' | 'AotC' | 'Social';

interface ClassRecruitment {
  class: string;
  color: string;
  specs: Array<{ spec: string; status: Status }>;
}

const recruitment: ClassRecruitment[] = [
  {
    class: 'Warrior',
    color: '#9D9D9D',
    specs: [
      { spec: 'Arms', status: 'AotC' },
      { spec: 'Fury', status: 'Social' },
      { spec: 'Protection', status: 'Social' },
    ],
  },
  {
    class: 'Paladin',
    color: '#F48CBA',
    specs: [
      { spec: 'Holy', status: 'Mythic' },
      { spec: 'Protection', status: 'Social' },
      { spec: 'Retribution', status: 'AotC' },
    ],
  },
  {
    class: 'Hunter',
    color: '#AAD372',
    specs: [
      { spec: 'Beast Mastery', status: 'Mythic' },
      { spec: 'Marksmanship', status: 'Social' },
      { spec: 'Survival', status: 'Mythic' },
    ],
  },
  {
    class: 'Rogue',
    color: '#FFF468',
    specs: [
      { spec: 'Assassination', status: 'Mythic' },
      { spec: 'Outlaw', status: 'Mythic' },
      { spec: 'Subtlety', status: 'Mythic' },
    ],
  },
  {
    class: 'Priest',
    color: '#FFFFFF',
    specs: [
      { spec: 'Discipline', status: 'Mythic' },
      { spec: 'Holy', status: 'AotC' },
      { spec: 'Shadow', status: 'AotC' },
    ],
  },
  {
    class: 'Death Knight',
    color: '#C41E3A',
    specs: [
      { spec: 'Blood', status: 'Social' },
      { spec: 'Frost', status: 'Mythic' },
      { spec: 'Unholy', status: 'Mythic' },
    ],
  },
  {
    class: 'Shaman',
    color: '#0070DD',
    specs: [
      { spec: 'Elemental', status: 'Mythic' },
      { spec: 'Enhancement', status: 'AotC' },
      { spec: 'Restoration', status: 'Social' },
    ],
  },
  {
    class: 'Mage',
    color: '#69CCF0',
    specs: [
      { spec: 'Arcane', status: 'Mythic' },
      { spec: 'Fire', status: 'Mythic' },
      { spec: 'Frost', status: 'AotC' },
    ],
  },
  {
    class: 'Warlock',
    color: '#8788EE',
    specs: [
      { spec: 'Affliction', status: 'Mythic' },
      { spec: 'Demonology', status: 'Mythic' },
      { spec: 'Destruction', status: 'Mythic' },
    ],
  },
  {
    class: 'Monk',
    color: '#00FF98',
    specs: [
      { spec: 'Brewmaster', status: 'Social' },
      { spec: 'Mistweaver', status: 'Mythic' },
      { spec: 'Windwalker', status: 'AotC' },
    ],
  },
  {
    class: 'Druid',
    color: '#FF7C0A',
    specs: [
      { spec: 'Balance', status: 'Mythic' },
      { spec: 'Feral', status: 'AotC' },
      { spec: 'Guardian', status: 'Social' },
      { spec: 'Restoration', status: 'Mythic' },
    ],
  },
  {
    class: 'Evoker',
    color: '#33937F',
    specs: [
      { spec: 'Devastation', status: 'Mythic' },
      { spec: 'Augmentation', status: 'AotC' },
      { spec: 'Preservation', status: 'Mythic' },
    ],
  },
];

const statusConfig: Record<Status, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  Mythic: {
    icon: <GiCrownedSkull size={28} />,
    label: 'Mythic',
    color: '#6aad6a',
    bg: 'rgba(106,173,106,0.12)',
  },
  AotC: {
    icon: <IoSkull size={24} />,
    label: 'AotC',
    color: '#d4a44a',
    bg: 'rgba(212,164,74,0.12)',
  },
  Social: {
    icon: <FaUserFriends size={24} />,
    label: 'Social',
    color: '#2d88c5',
    bg: 'rgba(51,147,127,0.12)',
  },
};

interface ApplicationForm {
  name: string;
  realm: string;
  team: string;
  contact: string;
  class: string;
  spec: string;
  experience: string;
  message: string;
}

export default function Recruitment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState<ApplicationForm>({
    name: '',
    realm: '',
    team: '',
    contact: '',
    class: '',
    spec: '',
    message: '',
    experience: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const formBody = new FormData();
    formBody.append('character', form.name);
    formBody.append('realm', form.realm);
    formBody.append('team', form.team);           // Changed from 'server'
    formBody.append('contact', form.contact);
    formBody.append('class', form.class);
    formBody.append('spec', form.spec);
    formBody.append('message', form.message);
    formBody.append('experience', form.experience);

    try {
      const response = await fetch('https://www.formdump.com/api/f/702cadf9-5e99-4544-aedc-3394ba5c52e4', {
        method: 'POST',
        body: formBody,
      });

      if (!response.ok) {
        throw new Error(`Formdump submit failed: ${response.status}`);
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Submit failed');
      console.error(error);
    }
  };

  const updateForm = (field: keyof ApplicationForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="recruitment"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06080f 0%, #0a0e1a 50%, #06080f 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse 50% 40% at 30% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col items-center text-center mb-16">
          <span
            className="font-cinzel text-xs tracking-widest mb-4"
            style={{ color: 'var(--gold-400)', letterSpacing: '0.3em' }}
          >
            LOOKING FOR MORE
          </span>
          <h2
            className="font-cinzel font-bold text-gold-gradient mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Recruitment
          </h2>
          <div className="gold-separator mb-6" />
          <p
            className="max-w-full text-lg leading-relaxed"
            style={{ color: 'var(--steel-light)', lineHeight: '1.8' }}
          >
            We're always looking for exceptional players to strengthen our guild roster. Check your class and spec below, then apply.
            <br></br><br></br>
            If you are a casual player looking for a new home, we also welcome social members to join our community!
          </p>
        </div>

        <div className="reveal flex items-center justify-center gap-6 mb-10 flex-wrap">
          {(['Mythic', 'AotC', 'Social'] as Status[]).map(s => (
            <div key={s} className="flex items-center gap-2">
              <span style={{ color: statusConfig[s].color }}>{statusConfig[s].icon}</span>
              <span className="font-cinzel text-lg tracking-widest" style={{ color: 'var(--steel)', letterSpacing: '0.15em' }}>
                {statusConfig[s].label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Class grid */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {recruitment.map((cls) => (
            <div key={cls.class} className="relative group ..."> {/* Keep your existing card styles */}
              {/* ... card content ... */}
              <div className="relative z-10">
                <div className="font-cinzel font-semibold text-md my-4" style={{ /* existing styles */ }}>
                  {cls.class}
                </div>
                <div className="flex flex-col gap-2">
                  {cls.specs.map(({ spec, status }) => {
                    const cfg = statusConfig[status];
                    return (
                      <div
                        key={spec}
                        className="flex items-center justify-between px-3 py-2"
                        style={{ background: cfg.bg, border: `1px solid ${cfg.color}20` }}
                      >
                        <span className="font-cinzel text-sm" style={{ color: '#d8d8d8' }}>
                          {spec}
                        </span>
                        <div className="flex items-center gap-1" style={{ color: cfg.color }}>
                          {cfg.icon}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application form */}
        <div
          className="reveal max-w-4xl mx-auto p-8 md:p-12"
          style={{
            background: 'rgba(10,14,26,0.8)',
            border: '1px solid rgba(201,162,39,0.15)',
          }}
        >
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8">
              <div
                className="w-16 h-16 flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(106,173,106,0.1)',
                  border: '1px solid rgba(106,173,106,0.3)',
                  color: '#6aad6a',
                }}
              >
                <CheckCircle size={32} />
              </div>
              <h3 className="font-cinzel font-bold text-xl mb-3 text-gold-gradient">Application Received</h3>
              <p className="text-sm" style={{ color: 'var(--steel-light)', lineHeight: '1.7' }}>
                Your application has been submitted. Our officers will review it within 48 hours and reach out via Battle.net or Discord.
              </p>
            </div>
          ) : (
          <>
            <div className="text-center mb-8">
              <h3 className="font-cinzel font-bold text-xl mb-2" style={{ color: '#f5e088' }}>
                Apply to the Guild
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { field: 'name' as const, label: 'Character Name', placeholder: 'Revika' },
                  { field: 'realm' as const, label: 'Realm', placeholder: 'Stormrage' },
                  { field: 'team' as const, label: 'Team', isSelect: true },
                  { field: 'contact' as const, label: 'Battle.net/Discord', placeholder: 'Revika#1234/revika' },
                ].map(({ field, label, placeholder, isSelect }) => (
                  <div key={field}>
                    <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--steel-light)', letterSpacing: '0.15em' }}>
                      {label.toUpperCase()}
                    </label>
                    
                    {isSelect ? (
                      <select
                        value={form.team}
                        onChange={e => updateForm('team', e.target.value)}
                        required
                        className="w-full px-4 py-3 text-sm font-cinzel outline-none transition-all duration-200 appearance-none"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(201,162,39,0.2)',
                          color: '#fdf4d3',
                          letterSpacing: '0.05em',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23e8c84a' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                          backgroundPosition: 'right 12px center',   // Moved arrow left from the edge
                          backgroundSize: '20px',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <option value="" style={{ background: '#1a2238', color: '#fdf4d3' }}>
                          Select Team
                        </option>
                        <option value="Mythic" style={{ background: '#1a2238', color: '#fdf4d3' }}>
                          Mythic
                        </option>
                        <option value="AotC" style={{ background: '#1a2238', color: '#fdf4d3' }}>
                          AotC
                        </option>
                        <option value="Social Guildie" style={{ background: '#1a2238', color: '#fdf4d3' }}>
                          Social Guildie
                        </option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={form[field] as string}
                        onChange={e => updateForm(field, e.target.value)}
                        required
                        className="w-full px-4 py-3 text-sm font-cinzel outline-none transition-all duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(201,162,39,0.2)',
                          color: '#fdf4d3',
                          letterSpacing: '0.05em',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.5)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(201,162,39,0.2)')}
                      />
                    )}
                  </div>
                ))}
              </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { field: 'class' as const, label: 'Class', placeholder: 'Mage' },
                    { field: 'spec' as const, label: 'Spec', placeholder: 'Frost' },
                  ].map(({ field, label, placeholder }) => (
                    <div key={field}>
                      <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--steel-light)', letterSpacing: '0.15em' }}>
                        {label.toUpperCase()}
                      </label>
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={form[field]}
                        onChange={e => updateForm(field, e.target.value)}
                        required
                        className="w-full px-4 py-3 text-sm font-cinzel outline-none transition-all duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(201,162,39,0.2)',
                          color: '#fdf4d3',
                          letterSpacing: '0.05em',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.5)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(201,162,39,0.2)')}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--steel-light)', letterSpacing: '0.15em' }}>
                    EXPERIENCE
                  </label>
                  <input
                    type="text"
                    placeholder="8/8 Manaforge Omega CE"
                    value={form.experience}
                    onChange={e => updateForm('experience', e.target.value)}
                    className="w-full px-4 py-3 text-sm font-cinzel outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(201,162,39,0.2)',
                      color: '#fdf4d3',
                      letterSpacing: '0.05em',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(201,162,39,0.2)')}
                  />
                </div>

                <div>
                  <label className="block font-cinzel text-xs tracking-widest mb-2" style={{ color: 'var(--steel-light)', letterSpacing: '0.15em' }}>
                    TELL US ABOUT YOURSELF
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Why do you want to join Ride On Time? What makes you stand out?"
                    value={form.message}
                    onChange={e => updateForm('message', e.target.value)}
                    className="w-full px-4 py-3 text-sm font-cinzel outline-none transition-all duration-200 resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(201,162,39,0.2)',
                      color: '#fdf4d3',
                      letterSpacing: '0.05em',
                      lineHeight: '1.6',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(201,162,39,0.2)')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 font-cinzel text-sm tracking-widest relative overflow-hidden group mt-2"
                  style={{
                    letterSpacing: '0.2em',
                    background: 'linear-gradient(135deg, rgba(201,162,39,0.2), rgba(201,162,39,0.08))',
                    border: '1px solid rgba(201,162,39,0.5)',
                    color: '#e8c84a',
                  }}
                >
                  <span className="relative z-10">APPLY</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(201,162,39,0.3), rgba(201,162,39,0.15))' }}
                  />
                </button>

                {submitError && (
                  <div className="text-sm text-center text-red-300 mt-3" style={{ color: '#f29b9b' }}>
                    {submitError}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
