import { MotionConfig } from 'framer-motion';
import { About } from './components/About.tsx';
import { Community } from './components/Community.tsx';
import { ContractSection } from './components/ContractSection.tsx';
import { FAQ } from './components/FAQ.tsx';
import { FinalCTA } from './components/FinalCTA.tsx';
import { Footer } from './components/Footer.tsx';
import { Hero } from './components/Hero.tsx';
import { HowToBuy } from './components/HowToBuy.tsx';
import { MascotSection } from './components/MascotSection.tsx';
import { MemeGallery } from './components/MemeGallery.tsx';
import { MemeStatement } from './components/MemeStatement.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Roadmap } from './components/Roadmap.tsx';
import { Tokenomics } from './components/Tokenomics.tsx';
import { TransitionStory } from './components/TransitionStory.tsx';
import { WhyNow } from './components/WhyNow.tsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <TransitionStory />
        <About />
        <MascotSection />
        <WhyNow />
        <MemeStatement />
        <HowToBuy />
        <Tokenomics />
        <Roadmap />
        <Community />
        <MemeGallery />
        <ContractSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
