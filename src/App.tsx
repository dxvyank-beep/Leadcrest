import { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';

// Lazy-load below-the-fold sections to reduce initial JS bundle
const TrustBar = lazy(() => import('./sections/TrustBar'));
const Problem = lazy(() => import('./sections/Problem'));
const Solution = lazy(() => import('./sections/Solution'));
const Services = lazy(() => import('./sections/Services'));
const CTAPrimary = lazy(() => import('./sections/CTAPrimary'));
const CaseStudies = lazy(() => import('./sections/CaseStudies'));
const FAQ = lazy(() => import('./sections/FAQ'));
const About = lazy(() => import('./sections/About'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after lazy components load
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <TrustBar />
          <Problem />
          <Solution />
          <Services />
          <CTAPrimary />
          <CaseStudies />
          <FAQ />
          <About />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
