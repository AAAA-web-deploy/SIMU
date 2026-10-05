import { Community } from './components/Community.tsx';
import { CursorGlow } from './components/CursorGlow.tsx';
import { FinalCta } from './components/FinalCta.tsx';
import { Footer } from './components/Footer.tsx';
import { Future } from './components/Future.tsx';
import { Hero } from './components/Hero.tsx';
import { Marquee } from './components/Marquee.tsx';
import { MemeWall } from './components/MemeWall.tsx';
import { Missions } from './components/MissionSection.tsx';
import { Navbar } from './components/Navbar.tsx';
import { PerformanceReview } from './components/PerformanceReview.tsx';
import { FirstDay, HiringMistake } from './components/StoryChapter.tsx';
import { TaskList } from './components/TaskList.tsx';
import { TokenCard } from './components/TokenCard.tsx';
import { TransparencyPanel } from './components/TransparencyPanel.tsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <CursorGlow />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Marquee />
        <HiringMistake />
        <FirstDay />
        <TaskList />
        <Missions />
        <MemeWall />
        <TokenCard />
        <TransparencyPanel />
        <PerformanceReview />
        <Community />
        <Future />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
