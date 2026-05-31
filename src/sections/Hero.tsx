import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to(btnsRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2')
      .to(trustRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    return () => { 
      tl.kill(); 
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Spotlight Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-75 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 pt-24 sm:pt-0 text-center drop-shadow-2xl">
        <p ref={eyebrowRef} className="eyebrow mb-6 opacity-0 translate-y-5">
          Local Business Marketing Agency
        </p>

        <h1
          ref={headingRef}
          className="text-white font-bold text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.08] tracking-tight opacity-0 translate-y-8 [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]"
        >
          Helping Local Businesses Get More{' '}
          <span className="glow-text">Calls, Leads & Customers</span>
        </h1>

        <p
          ref={subRef}
          className="text-neutral-400 text-lg sm:text-xl leading-relaxed max-w-[640px] mx-auto mt-6 opacity-0 translate-y-5"
        >
          I build fast, modern websites with local SEO and Google Business Profile optimization for plumbers, contractors, HVAC companies, and other local businesses.
        </p>

        <div
          ref={btnsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 opacity-0 scale-95"
        >
          <a href="tel:+917827724709" className="btn-primary no-underline">
            <span>Book Free Call</span>
          </a>
          <button onClick={() => scrollTo('#work')} className="btn-secondary">
            View My Work
          </button>
        </div>

        <div
          ref={trustRef}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-14 opacity-0"
        >
          {['Mobile Optimized', 'SEO Ready', 'Fast Loading', 'Lead Focused'].map((item) => (
            <span key={item} className="flex items-center gap-2 text-[15px] text-neutral-400">
              <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollTo('#trust')}
          className="text-white/40 hover:text-white/70 transition-colors animate-bounce-slow"
          aria-label="Scroll down"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
