const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const services = ['Website Development', 'Local SEO', 'GBP Optimization', 'Lead Generation'];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="pt-20 pb-10" style={{
      background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 50%), #000000`,
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          <div>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '30px', padding: '5px 16px' }}>
              <span className="text-white font-bold text-lg tracking-wide">Leadcrest</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white ml-0.5 mb-0.5" style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)' }}></span>
            </div>
            <p className="text-neutral-400 text-[15px] mt-4 leading-relaxed">
              Helping Local Businesses Get More Calls, Leads & Customers
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="mailto:dxvyank@gmail.com" className="text-[#9a9aaa] hover:text-white transition-colors" aria-label="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </a>
              <a href="tel:+917827724709" className="text-[#9a9aaa] hover:text-white transition-colors" aria-label="Phone">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </a>
              <a href="https://wa.me/917827724709" target="_blank" rel="noopener noreferrer" className="text-[#9a9aaa] hover:text-white transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="eyebrow !text-xs mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-neutral-400 text-[15px] hover:text-white transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow !text-xs mb-5">Services</p>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
                    className="text-neutral-400 text-[15px] hover:text-white transition-colors duration-300">{service}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow !text-xs mb-5">About Leadcrest</p>
            <p className="text-neutral-400 text-[14px] leading-relaxed">
              Leadcrest is a results-driven digital marketing agency specializing in local business growth. We help plumbers, HVAC companies, contractors, kitchen remodelers, and pest control businesses dominate their local markets.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-neutral-400 text-sm tracking-wide">&copy; 2024 Leadcrest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
