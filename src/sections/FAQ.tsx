import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { question: 'Will I own the website?', answer: 'Yes, absolutely. Once the project is completed and paid for, you have 100% ownership of the website and its assets. No strings attached.' },
  { question: 'Do you write the content?', answer: 'We provide content structures and can help write conversion-focused copy. If you have specific industry knowledge, we blend it into the design.' },
  { question: 'What is Local SEO?', answer: 'It is the process of optimizing your online presence so you appear in local search results (like Google Maps) when people search for your services near them.' },
  { question: 'Why not use WordPress?', answer: 'We build custom coded websites that are much faster, more secure, and less bloated than WordPress, leading to better user experiences and higher conversions.' },
  { question: 'How long does a build take?', answer: 'Typically, a standard local business website takes between 2 to 4 weeks from kickoff to launch, depending on the complexity of your requirements.' },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Fade in the header
      gsap.from(headerRef.current!, { scrollTrigger: { trigger: section, start: 'top 85%', once: true }, y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      
      const getScrollAmount = () => {
        const containerWidth = containerRef.current!.scrollWidth;
        // Scroll exactly enough to show the last card, plus a little padding
        return -(containerWidth - window.innerWidth + window.innerWidth * 0.1);
      };

      gsap.to(containerRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 10%", 
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="pt-32 pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center" style={{
      background: `radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.05) 0%, transparent 50%), linear-gradient(180deg, #0d0018 0%, #0a0014 100%)`,
    }}>
      <div className="max-w-[1200px] mx-auto px-6 w-full mb-12">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="text-white font-bold text-[32px] sm:text-[40px] leading-tight tracking-tight">
              Common <span className="glow-text">Questions</span>
            </h2>
          </div>
        </div>
      </div>
        
      <div style={{ marginLeft: 'max(24px, calc((100vw - 1152px) / 2))' }}>
        <div ref={containerRef} className="flex gap-6 w-max pr-12">
          {faqs.map((faq, index) => (
            <div key={index} className="w-[300px] sm:w-[400px] lg:w-[450px]">
              <div className="glass-card !p-8 h-full flex flex-col group hover:!border-purple-light/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-5 text-purple-light group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-white font-semibold text-[19px] mb-3 leading-snug">{faq.question}</h3>
                <p className="text-[#9a9aaa] text-[15px] leading-relaxed flex-grow">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
