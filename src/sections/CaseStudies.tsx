import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  { category: 'WEBSITE + SEO', title: 'Plumbing Website', problem: 'The business needed a modern website that looked trustworthy and worked well on mobile devices.', solution: 'I designed a clean plumbing website with strong call-to-action sections, mobile optimization, and local SEO structure.', image: '/images/case-plumbing-ai.webp', href: undefined },
  { category: 'WEBSITE DESIGN', title: 'HVAC Website', problem: 'The old website looked outdated and was difficult to use on mobile.', solution: 'I redesigned the layout, improved speed, and created a more professional experience focused on generating leads.', image: '/images/case-hvac-ai.webp', href: 'https://valleyhvac.netlify.app/' },
  { category: 'LOCAL SEO + DESIGN', title: 'Pest Control Website', problem: 'The business needed a website that clearly explained services and encouraged visitors to contact them quickly.', solution: 'I built a fast and modern service-based website with strong contact sections and conversion-focused design.', image: '/images/case-pest-ai.webp', href: 'https://pestcontrolshield.netlify.app/' },
  { category: 'FULL SERVICE', title: 'Roofing Website', problem: 'The business needed a premium-looking website to showcase roofing and construction services professionally.', solution: 'I built a fast, quality-driven roofing website designed for longevity and aesthetic excellence with an intuitive UI.', image: '/images/case-roofing-ai.webp', href: 'https://onewayroofing.netlify.app/' },
];

const categories = ['All', 'WEBSITE + SEO', 'WEBSITE DESIGN', 'LOCAL SEO + DESIGN', 'FULL SERVICE'];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredStudies = activeFilter === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!, { scrollTrigger: { trigger: section, start: 'top 85%', once: true }, y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.from(gridRef.current!.children, { scrollTrigger: { trigger: section, start: 'top 80%', once: true }, y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate items on filter change
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
      );
    }
    // Refresh ScrollTrigger to ensure animations adjust to new height
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [activeFilter]);

  return (
    <section id="work" ref={sectionRef} className="section-padding" style={{
      background: `radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 50%), linear-gradient(180deg, #0d0018 0%, #120024 50%, #0d0018 100%)`,
    }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={headerRef} className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5">Our Work</p>
            <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-tight">
              Selected <span className="glow-text">Projects</span>
            </h2>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 border ${
                  activeFilter === category 
                  ? 'bg-purple-light/20 text-purple-light border-purple-light/50' 
                  : 'bg-white/5 text-[#9a9aaa] border-transparent hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => {
            const isClickable = !!study.href;
            const CardTag = isClickable ? 'a' : 'div';
            return (
            <CardTag key={study.title} href={study.href} target={isClickable ? "_blank" : undefined} rel={isClickable ? "noopener noreferrer" : undefined}
              className={`rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group block ${isClickable ? 'cursor-pointer' : ''}`}
              style={{ background: 'rgba(18,0,36,0.6)', border: '1px solid rgba(168,85,247,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', textDecoration: 'none' }}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={study.image} alt={study.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,0,20,0.9)] via-[rgba(10,0,20,0.3)] to-transparent" />
                <span className="absolute top-4 left-4 eyebrow !text-xs !tracking-[0.15em]">{study.category}</span>
              </div>
              <div className="p-8">
                <h3 className="text-white font-semibold text-xl mb-3">{study.title}</h3>
                <div className="space-y-2">
                  <p className="text-[15px] text-[#9a9aaa]"><span className="text-purple-light font-medium">Problem: </span>{study.problem}</p>
                  <p className="text-[15px] text-[#9a9aaa]"><span className="text-purple-light font-medium">Solution: </span>{study.solution}</p>
                </div>
              </div>
            </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
