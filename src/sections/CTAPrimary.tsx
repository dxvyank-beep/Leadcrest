import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTAPrimary() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = [headingRef.current, paraRef.current, btnRef.current].filter(Boolean);
    // Set initial hidden state explicitly so they're never visible before animation
    gsap.set(els, { opacity: 0, y: 24 });
    const ctx = gsap.context(() => {
      gsap.to(els, {
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.15,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{
      background: `radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 60%), #000000`,
    }}>
      <div className="max-w-[760px] mx-auto px-6 text-center">
        <h2 ref={headingRef} className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-tight">
          Ready To <span className="glow-text">Grow Your Business</span> Online?
        </h2>
        <p ref={paraRef} className="text-neutral-400 text-lg sm:text-xl leading-relaxed mt-5">
          Let's build a website that helps your business get more leads, more calls, and more customers.
        </p>
        <a ref={btnRef} href="tel:+917827724709" className="btn-primary !px-12 !py-5 !text-lg mt-10 no-underline inline-flex">
          <span>Book A Free Call</span>
        </a>
      </div>
    </section>
  );
}
