import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import TrustBar from './sections/TrustBar';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Services from './sections/Services';
import CTAPrimary from './sections/CTAPrimary';
import CaseStudies from './sections/CaseStudies';
import FAQ from './sections/FAQ';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // GSAP ScrollTrigger is registered globally outside, no need for Lenis overhead here
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Problem />
        <Solution />
        <Services />
        <CTAPrimary />
        <CaseStudies />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
