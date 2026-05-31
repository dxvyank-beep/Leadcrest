import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTAPrimary() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current!.children, {
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{
      background: `radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 60%), #000000`,
    }}>
      <div ref={contentRef} className="max-w-[760px] mx-auto px-6 text-center">
        <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-tight">
          Ready To <span className="glow-text">Grow Your Business</span> Online?
        </h2>
        <p className="text-neutral-400 text-lg sm:text-xl leading-relaxed mt-5">
          Let's build a website that helps your business get more leads, more calls, and more customers.
        </p>
        <a href="tel:+917827724709" className="btn-primary !px-12 !py-5 !text-lg mt-10 no-underline inline-block">
          <span>Book A Free Call</span>
        </a>
      </div>
    </section>
  );
}
