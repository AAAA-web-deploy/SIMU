import { useCallback, useEffect, useRef, useState } from 'react';
import { hasSeenIntro, markIntroSeen } from './lib/preload';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { FloatNav } from './components/FloatNav';
import { IntroStage } from './components/IntroStage';
import { OceanHero } from './components/OceanHero';
import { Descent } from './components/Descent';
import { MoodSea } from './components/MoodSea';
import { MemeWorkshop } from './components/MemeWorkshop';
import { Hatch } from './components/Hatch';
import { PostcardEnd } from './components/PostcardEnd';
import { BagDrawer } from './components/BagDrawer';
import { CrewDialog } from './components/CrewDialog';
import { TailGuide } from './components/TailGuide';

type Overlay = 'bag' | 'crew' | null;

export function App() {
  const reduced = usePrefersReducedMotion();
  const startQuiet = reduced || hasSeenIntro();
  const [mode, setMode] = useState<'intro' | 'ready'>(startQuiet ? 'ready' : 'intro');
  const [run, setRun] = useState(0);
  const [introMounted, setIntroMounted] = useState(!startQuiet);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [moodId, setMoodId] = useState<string | null>(null);
  const [spriteId, setSpriteId] = useState('costume');
  const [whaleOn, setWhaleOn] = useState(false);
  const [note, setNote] = useState('');
  const finished = useRef(startQuiet);

  useEffect(() => {
    if (startQuiet) markIntroSeen();
  }, [startQuiet]);

  const scrollLocked = mode === 'intro' || overlay !== null || moodId !== null;

  useEffect(() => {
    document.body.style.overflow = scrollLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [scrollLocked]);

  useEffect(() => {
    if (mode === 'intro') {
      setIntroMounted(true);
      return;
    }
    const id = window.setTimeout(() => setIntroMounted(false), reduced ? 0 : 400);
    return () => window.clearTimeout(id);
  }, [mode, reduced, run]);

  const finishIntro = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    markIntroSeen();
    setMode('ready');
  }, []);

  const scrollToId = useCallback((id: string) => {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }, 40);
  }, [reduced]);

  const openBag = () => {
    finishIntro();
    setMoodId(null);
    setOverlay('bag');
  };

  const openCrew = () => {
    finishIntro();
    setMoodId(null);
    setOverlay('crew');
  };

  const openWorkshop = (id?: string) => {
    if (id) setSpriteId(id);
    setMoodId(null);
    setOverlay(null);
    finishIntro();
    window.setTimeout(() => {
      document.getElementById('workshop')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      document.getElementById('caption')?.focus();
    }, 50);
  };

  const replay = () => {
    if (reduced) {
      setNote('Reduced motion is on, so the intro stays still.');
      scrollToId('dream');
      return;
    }
    setOverlay(null);
    setMoodId(null);
    setNote('');
    setWhaleOn(false);
    finished.current = false;
    window.scrollTo({ top: 0, behavior: 'auto' });
    setRun((value) => value + 1);
    setMode('intro');
  };

  return (
    <>
      <a
        className="skip-link"
        href="#content"
        onClick={(event) => {
          if (mode !== 'intro') return;
          event.preventDefault();
          finishIntro();
          window.setTimeout(() => document.getElementById('content')?.focus(), 40);
        }}
      >
        Skip to content
      </a>
      <FloatNav
        introActive={mode === 'intro'}
        onSkip={finishIntro}
        onCrew={openCrew}
        onBag={openBag}
        onMeme={() => openWorkshop()}
      />
      {introMounted && (
        <IntroStage key={run} active={mode === 'intro'} fading={mode === 'ready'} onDone={finishIntro} />
      )}
      <main id="content" tabIndex={-1} aria-hidden={mode === 'intro' ? true : undefined}>
        <OceanHero whaleOn={whaleOn} onWhale={setWhaleOn} />
        <Descent />
        <MoodSea
          activeId={moodId}
          onOpen={(id) => {
            setOverlay(null);
            setMoodId(id);
          }}
          onClose={() => setMoodId(null)}
          onMake={(id) => openWorkshop(id)}
        />
        <MemeWorkshop spriteId={spriteId} onSprite={setSpriteId} />
        <Hatch onOpen={openBag} />
        <PostcardEnd onReplay={replay} note={note} />
      </main>
      <TailGuide />
      {overlay === 'bag' && <BagDrawer onClose={() => setOverlay(null)} />}
      {overlay === 'crew' && <CrewDialog onClose={() => setOverlay(null)} />}
    </>
  );
}
