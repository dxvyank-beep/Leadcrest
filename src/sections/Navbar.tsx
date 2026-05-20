import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
        style={{
          width: 'min(92%, 1200px)',
          background: scrolled
            ? 'rgba(10, 0, 30, 0.7)'
            : 'rgba(10, 0, 30, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '60px',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(168,85,247,0.08)'
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <div className="px-6 lg:px-8 h-[64px] flex items-center justify-between">
          {/* Logo in curved box */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="flex items-center"
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))',
                border: '1px solid rgba(168,85,247,0.25)',
                borderRadius: '30px',
                padding: '6px 18px',
              }}
            >
              <span className="text-white font-bold text-lg tracking-wide">Leadcrest</span>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-purple ml-0.5 mb-1"
                style={{ boxShadow: '0 0 8px rgba(168,85,247,0.8)' }}
              ></span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-white/70 hover:text-purple-light text-[15px] font-medium uppercase tracking-[0.06em] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="tel:+917827724709"
            className="hidden md:inline-flex btn-primary !py-2.5 !px-7 !text-[15px]"
          >
            <span>Free Call</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-[30px] transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            rgba(10, 0, 20, 0.98)
          `,
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-white text-2xl font-semibold hover:text-purple-light transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+917827724709"
            className="btn-primary mt-4"
          >
            <span>Free Call</span>
          </a>
        </div>
      </div>
    </>
  );
}
