import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Search, MapPin, Filter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Code, title: 'Website Development', description: 'Modern websites built for speed, mobile users, and conversions. Custom designs that make your business stand out.' },
  { icon: Search, title: 'Local SEO', description: 'SEO optimization to improve visibility on Google search results. Get found when customers search for your services.' },
  { icon: MapPin, title: 'GBP Optimization', description: 'Google Business Profile optimization to help local businesses rank better locally. Dominate Google Maps.' },
  { icon: Filter, title: 'Lead Generation', description: 'Contact forms, click-to-call systems, WhatsApp integration, and booking flows. Never miss a lead again.' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!, { scrollTrigger: { trigger: section, start: 'top 85%', once: true }, y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.from(card, { scrollTrigger: { trigger: section, start: 'top 80%', once: true }, y: 50, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 * i });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding" style={{
      background: `radial-gradient(ellipse at 20% 30%, rgba(168,85,247,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(236,72,153,0.05) 0%, transparent 50%), linear-gradient(180deg, #0a0014 0%, #0d0018 50%, #0a0014 100%)`,
    }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <p className="eyebrow mb-5">Our Services</p>
          <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-tight">
            Everything You Need to <span className="glow-text">Win Online</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={service.title} ref={(el) => { cardsRef.current[i] = el; }} className="glass-card !p-9 text-center sm:text-left">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto sm:mx-0"
                  style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.1))', border: '1px solid rgba(168,85,247,0.2)' }}>
                  <Icon className="w-8 h-8 text-purple-light" />
                </div>
                <h3 className="text-white font-semibold text-xl mt-6">{service.title}</h3>
                <p className="text-[#9a9aaa] text-base sm:text-[17px] mt-3 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
