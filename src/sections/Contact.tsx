import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle, Calendar, Send, Check } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  { icon: Mail, label: 'dxvyank@gmail.com', sublabel: null, href: 'mailto:dxvyank@gmail.com' },
  { icon: MessageCircle, label: 'Chat on WhatsApp', sublabel: '+91 7827724709', href: 'https://wa.me/917827724709' },
  { icon: Calendar, label: 'Book a Free Call', sublabel: '15-min consultation', href: '#' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business: '', message: '', _gotcha: '' });
  const [turnstileToken, setTurnstileToken] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      alert('Please complete the anti-spam check.');
      return;
    }

    // Simple frontend bot check: if honeypot is filled, abort silently
    if (formData._gotcha) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', phone: '', business: '', message: '', _gotcha: '' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ ...formData, token: turnstileToken }),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', business: '', message: '', _gotcha: '' });
        setTurnstileToken('');
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Oops! There was a problem submitting your form. Please try again.');
      }
    } catch (error) {
      alert('Oops! There was a network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding" style={{
      background: `radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.02) 0%, transparent 50%), linear-gradient(180deg, #0c0c0c 0%, #000000 100%)`,
    }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
        <div ref={leftRef} className="lg:col-span-2">
          <p className="eyebrow mb-5">Contact</p>
          <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-tight">
            Let's Work <span className="glow-text">Together</span>
          </h2>
          <p className="text-neutral-400 text-lg sm:text-xl leading-relaxed mt-5 max-w-[400px]">
            If you want a modern website, better local visibility, and more leads for your business, feel free to contact me.
          </p>
          <div className="space-y-4 mt-10">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a key={method.label} href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass-card !p-5 flex items-center gap-4 no-underline hover:!border-white/30 group">
                  <Icon className="w-6 h-6 text-white flex-shrink-0" />
                  <div>
                    <p className="text-white text-base font-medium group-hover:text-white transition-colors">{method.label}</p>
                    {method.sublabel && <p className="text-neutral-400 text-sm mt-0.5">{method.sublabel}</p>}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div ref={rightRef} className="lg:col-span-3">
          <div className="glass-card !p-10 sm:!p-12">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-18 h-18 rounded-full bg-green-500/20 flex items-center justify-center mb-5" style={{width:'72px',height:'72px'}}>
                  <Check className="w-9 h-9 text-green-500" />
                </div>
                <h3 className="text-white font-semibold text-2xl mb-3">Message Sent Successfully!</h3>
                <p className="text-[#9a9aaa] text-base">Thank you for reaching out. We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for bot protection */}
                <input type="text" name="_gotcha" value={formData._gotcha} onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })} style={{ display: 'none' }} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input type="text" name="name" placeholder="Your Name" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-glass" />
                  <input type="email" name="email" placeholder="your@email.com" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-glass" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-glass" />
                  <input type="text" name="business" placeholder="Your Business Name" value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })} className="input-glass" />
                </div>
                <textarea name="message" placeholder="Tell us about your project..." rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="input-glass resize-none" />
                <div className="flex justify-center py-2">
                  <Turnstile siteKey="0x4AAAAAADTH2usAvNPxxZT_" onSuccess={(token) => setTurnstileToken(token)} />
                </div>
                <button type="submit" disabled={isSubmitting || !turnstileToken} className="btn-primary w-full !mt-4 !py-4 !text-base disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
