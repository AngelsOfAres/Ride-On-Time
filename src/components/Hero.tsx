import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    // Scene setup
    const scene = new THREE.Scene();
    const getViewportSize = () => {
      const rect = section.getBoundingClientRect();
      return {
        width: Math.max(1, rect.width || window.innerWidth),
        height: Math.max(1, rect.height || window.innerHeight),
      };
    };

    const { width, height } = getViewportSize();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // === Ember particles ===
    const emberCount = 800;
    const emberGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(emberCount * 3);
    const colors = new Float32Array(emberCount * 3);
    const sizes = new Float32Array(emberCount);
    const speeds = new Float32Array(emberCount);
    const drifts = new Float32Array(emberCount);

    const goldPalette = [
      [1.0, 0.85, 0.2],
      [0.95, 0.65, 0.1],
      [1.0, 0.95, 0.5],
      [0.8, 0.55, 0.05],
      [0.6, 0.75, 1.0], // occasional blue
    ];

    for (let i = 0; i < emberCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const color = goldPalette[Math.floor(Math.random() * goldPalette.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];

      sizes[i] = Math.random() * 3 + 1;
      speeds[i] = Math.random() * 0.003 + 0.001;
      drifts[i] = (Math.random() - 0.5) * 0.001;
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    emberGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    emberGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Circular sprite texture
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,200,0.8)');
    gradient.addColorStop(1, 'rgba(255,200,50,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    const emberMat = new THREE.PointsMaterial({
      size: 0.08,
      map: spriteTexture,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // === Animate ===
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.005;

      const pos = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        pos[i * 3 + 1] += speeds[i];
        pos[i * 3] += drifts[i] + Math.sin(time + i) * 0.0002;

        if (pos[i * 3 + 1] > 7) {
          pos[i * 3 + 1] = -7;
          pos[i * 3] = (Math.random() - 0.5) * 20;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Camera micro-drift
      camera.position.x += (mouseRef.current.x * 0.3 - camera.position.x) * 0.1;
      camera.position.y += (-mouseRef.current.y * 0.2 - camera.position.y) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const { width, height } = getViewportSize();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(section);

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    setTimeout(() => setLoaded(true), 200);

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #0d1520 0%, #06080f 60%, #030408 100%)' }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        id="hero-canvas"
        className="absolute inset-0 h-full w-full"
      />

      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(201,162,39,0.08) 0%, transparent 70%)',
          animation: 'spotlight 6s ease-in-out infinite',
        }}
      />

      {/* Bottom fog */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,8,15,0.9), transparent)' }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center my-24 px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <div
          className={`transition-all duration-1000 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          style={{
            filter: loaded ? 'drop-shadow(0 0 40px rgba(201,162,39,0.4)) drop-shadow(0 0 80px rgba(201,162,39,0.15))' : 'none',
            transitionDelay: '0.1s',
          }}
        >
          <img
            src="logo.png"
            alt="Ride On Time - Guild Logo"
            className="w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] object-contain"
          />
        </div>

        {/* Eyebrow */}
        <div
          className={`flex items-center gap-4 mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="gold-separator" style={{ width: '60px' }} />
          <span
            className="font-cinzel tracking-widest"
            style={{ color: 'var(--gold-400)', letterSpacing: '0.3em', fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)' }}
          >
            WORLD OF WARCRAFT
          </span>
          <div className="gold-separator" style={{ width: '60px' }} />
        </div>

        {/* Guild name */}
        <h1
          className={`font-cinzel-decorative font-bold text-gold-gradient-bright mb-3 transition-all duration-700 leading-tight ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            transitionDelay: '0.5s',
            textShadow: '0 0 60px rgba(201,162,39,0.3)',
          }}
        >
          Ride On Time
        </h1>

        {/* Subtitle */}
        <p
          className={`font-cinzel text-lg md:text-base tracking-widest mb-2 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ color: 'var(--steel-light)', letterSpacing: '0.25em', transitionDelay: '0.7s', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
        >
          MYTHIC RAIDING GUILD
        </p>

        
        <p
          className={`font-cinzel text-sm md:text-base tracking-widest mb-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ color: 'var(--steel-light)', letterSpacing: '0.25em', transitionDelay: '0.7s' }}
        >
          STORMRAGE &nbsp;&bull;&nbsp; US
        </p>

        {/* Stats row */}
        <div
          className={`flex items-center gap-6 md:gap-10 mb-12 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.9s' }}
        >
          {[
            { value: '7/10', label: 'Mythic' },
            { value: 'CE | M+', label: 'Style' },
            { value: 'Top 100', label: 'Realm Rank' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-cinzel font-bold text-xl md:text-2xl text-gold-gradient">{stat.value}</span>
              <span className="font-cinzel text-xs tracking-widest mt-1" style={{ color: 'var(--steel)', letterSpacing: '0.15em' }}>{stat.label.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1.1s' }}
        >
          <button
            onClick={() => document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-cinzel text-sm tracking-widest px-10 py-3.5 relative overflow-hidden group"
            style={{
              letterSpacing: '0.2em',
              background: 'linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))',
              border: '1px solid rgba(201,162,39,0.5)',
              color: '#e8c84a',
            }}
          >
            <span className="relative z-10">JOIN THE GUILD</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(201,162,39,0.25), rgba(201,162,39,0.1))' }}
            />
          </button>
          <button
            onClick={() => document.getElementById('mythic')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-cinzel text-sm tracking-widest px-10 py-3.5 border hover:bg-white/5 transition-all duration-300"
            style={{
              letterSpacing: '0.2em',
              borderColor: 'rgba(136,153,170,0.3)',
              color: 'var(--steel-light)',
            }}
          >
            VIEW PROGRESSION
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 group ${loaded ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '1.4s' }}
      >
        <span
          className="font-cinzel text-xs tracking-widest group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--steel)', letterSpacing: '0.2em', fontSize: '10px' }}
        >
          SCROLL
        </span>
        <ChevronDown
          size={16}
          className="animate-bounce"
          style={{ color: 'var(--gold-400)' }}
        />
      </button>

    </section>
  );
}
