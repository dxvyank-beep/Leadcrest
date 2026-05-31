import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  'Takes more than 3 seconds to load',
  'Not showing up on Google Maps',
  'No way for customers to contact you instantly',
  'Looks outdated on mobile phones',
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current!, { scrollTrigger: { trigger: section, start: 'top 85%', once: true }, x: -30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.from(rightRef.current!, { scrollTrigger: { trigger: section, start: 'top 85%', once: true }, y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{
      background: 'linear-gradient(180deg, #0c0c0c 0%, #000000 100%)',
    }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div ref={leftRef}>
          <p className="eyebrow mb-5">The Problem</p>
          <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-tight">
            Most Local Business Websites <span className="glow-text">Lose Customers</span>
          </h2>
          <p className="text-neutral-400 text-lg sm:text-xl leading-relaxed max-w-[520px] mt-5">
            Many local businesses have slow websites, poor mobile design, weak SEO, and no proper lead system. This causes lost calls, fewer customers, and lower visibility on Google.
          </p>
        </div>
        <div ref={rightRef} className="glass-card glass-card-red !p-10">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-5" />
          <h3 className="text-white font-semibold text-2xl mb-6">
            Your Current Website Might Be Costing You Money
          </h3>
          <ul className="space-y-4">
            {problems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-neutral-400 text-base sm:text-lg">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
