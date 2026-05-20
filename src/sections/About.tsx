import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const focusPoints = [
  'Built specifically for local service businesses',
  'Every element designed to capture leads',
  'Optimized for the devices your customers use',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current!, {
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        x: -30, opacity: 0, duration: 0.7, ease: 'power3.out',
      });
      gsap.from(rightRef.current!, {
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        x: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding" style={{
      background: `radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.06) 0%, transparent 50%), linear-gradient(180deg, #060010 0%, #0a0014 100%)`,
    }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div ref={leftRef}>
          <p className="eyebrow mb-5">About Us</p>
          <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-tight">
            Who We <span className="glow-text">Help</span>
          </h2>
          <p className="text-[#9a9aaa] text-lg sm:text-xl leading-relaxed mt-5">
            Hey, I'm Divyank, a web developer. I help local businesses improve their online presence through modern websites, local SEO, and Google Business Profile optimization.
          </p>
          <p className="text-[#9a9aaa] text-lg sm:text-xl leading-relaxed mt-4">
            My focus is simple: build fast, clean, and conversion-focused websites that help businesses generate more leads and customers online.
          </p>
          <p className="text-[#9a9aaa] text-lg sm:text-xl leading-relaxed mt-4">
            I mainly work with local service businesses like plumbers, contractors, HVAC companies, kitchen remodelers, and other home service brands.
          </p>
        </div>
        <div ref={rightRef} className="glass-card glass-card-gold !p-10">
          <Target className="w-12 h-12 text-purple-light mb-5" />
          <h3 className="text-white font-semibold text-2xl mb-6">Why Our Websites Convert</h3>
          <ul className="space-y-4">
            {focusPoints.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#9a9aaa] text-base sm:text-lg">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
