import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  'Blazing fast load speeds under 2 seconds',
  'Ranks on page 1 for local searches',
  'Captures leads 24/7 with smart forms',
  'Looks stunning on every device',
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current!, { scrollTrigger: { trigger: section, start: 'top 85%', once: true }, x: -30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.from(rightRef.current!, { scrollTrigger: { trigger: section, start: 'top 85%', once: true }, x: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="section-padding" style={{
      background: `radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.08) 0%, transparent 50%), linear-gradient(180deg, #060010 0%, #0a0014 100%)`,
    }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div ref={leftRef} className="glass-card glass-card-green !p-10 order-2 lg:order-1">
          <CheckCircle className="w-12 h-12 text-green-500 mb-5" />
          <h3 className="text-white font-semibold text-2xl mb-6">A Website That Works as Hard as You Do</h3>
          <ul className="space-y-4">
            {solutions.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#9a9aaa] text-base sm:text-lg">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div ref={rightRef} className="order-1 lg:order-2">
          <p className="eyebrow mb-5">Our Approach</p>
          <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-tight">
            We Build Digital Assets That <span className="glow-text">Convert</span>
          </h2>
          <p className="text-[#9a9aaa] text-lg sm:text-xl leading-relaxed max-w-[520px] mt-5">
            Leadcrest specializes in creating websites specifically for local service businesses. Every site we build is optimized for mobile speed, local search rankings, and lead generation — turning your website into a 24/7 marketing machine.
          </p>
          <button onClick={() => scrollTo('#services')} className="btn-secondary mt-10">
            See Our Services
          </button>
        </div>
      </div>
    </section>
  );
}
