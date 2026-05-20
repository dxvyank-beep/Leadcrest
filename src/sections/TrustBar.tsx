import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 75, suffix: '+', label: 'Sites Launched' },
  { value: 3, suffix: 'x', label: 'Avg. Traffic Growth' },
  { value: 85, suffix: '%', label: 'Client Retention' },
  { value: 24, suffix: '/7', label: 'Lead Capture' },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const triggers: ScrollTrigger[] = [];
    stats.forEach((stat, i) => {
      const el = numberRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      const st = ScrollTrigger.create({
        trigger: section, start: 'top 90%', once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: stat.value, duration: 2, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.val) + stat.suffix; },
          });
        },
      });
      triggers.push(st);
    });
    return () => { triggers.forEach(st => st.kill()); };
  }, []);

  return (
    <section id="trust" ref={sectionRef} className="w-full py-20" style={{
      background: 'linear-gradient(180deg, #0a0014 0%, #120024 50%, #0a0014 100%)',
      borderTop: '1px solid rgba(168, 85, 247, 0.06)',
    }}>
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 text-center">
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <span ref={(el) => { numberRefs.current[i] = el; }}
              className="glow-text font-bold text-5xl md:text-6xl tracking-tight">
              0{stat.suffix}
            </span>
            <p className="text-[#9a9aaa] text-base mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
