import { useEffect, useRef, useState } from 'react';
import { art, CRITICAL_ART } from '../assets';
import { timingsForViewport, type SceneTimings } from '../config/timings';
import { preloadImages } from '../lib/preload';
import { Eyes } from './Eyes';
import styles from './IntroStage.module.css';

type Scene = 'loading' | 'eyes' | 'reveal' | 'dream' | 'suit';

const CAPTION: Record<Scene, string> = {
  loading: '',
  eyes: '',
  reveal: 'Meet MIWO.',
  dream: "Someday... I'll be a whale.",
  suit: 'Whale mode: ON.',
};

type Props = {
  active: boolean;
  fading: boolean;
  onDone: () => void;
};

export function IntroStage({ active, fading, onDone }: Props) {
  const [scene, setScene] = useState<Scene>('loading');
  const [progress, setProgress] = useState(6);
  const timings = useRef<SceneTimings>(timingsForViewport());
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onDone();
  };

  useEffect(() => {
    if (!active) return;
    let cancel = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const T = timings.current;
    const started = performance.now();

    const sequence = async () => {
      const progressTimer = window.setInterval(() => {
        const spent = performance.now() - started;
        setProgress(Math.min(92, 8 + (spent / T.loadingMax) * 84));
      }, 80);
      timers.push(progressTimer);

      await Promise.race([preloadImages(CRITICAL_ART), wait(T.loadingMax)]);
      if (cancel) return;
      const spent = performance.now() - started;
      if (spent < T.loadingMin) await wait(T.loadingMin - spent);
      if (cancel) return;
      setProgress(100);
      setScene('eyes');
      await wait(T.eyes);
      if (cancel) return;
      setScene('reveal');
      await wait(T.reveal);
      if (cancel) return;
      setScene('dream');
      await wait(T.dream);
      if (cancel) return;
      setScene('suit');
      await wait(T.suit);
      if (cancel) return;
      finish();
    };

    void sequence();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => {
      if (motion.matches) finish();
    };
    motion.addEventListener('change', onMotion);

    return () => {
      cancel = true;
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener('keydown', onKey);
      motion.removeEventListener('change', onMotion);
    };
    // finish is stable for this mount; parent remounts the stage per replay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const caption = CAPTION[scene];

  return (
    <div
      className={`${styles.stage} ${styles[scene]} ${fading ? styles.fading : ''}`}
      role="region"
      aria-label="Opening"
    >
      <img className={styles.void} src={art.introVoid} alt="" />
      <img className={styles.dreamBg} src={art.dreamSky} alt="" />
      <div className={styles.spotlight} />
      <div className={styles.dawn} />

      {scene === 'loading' && (
        <div className={styles.loader}>
          <Eyes className={styles.tinyEyes} glance={false} />
          <p>OPENING MIWO&apos;S LITTLE WORLD...</p>
          <div
            className={styles.track}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Loading MIWO"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className={styles.eyeLayer} aria-hidden={scene === 'loading' || scene === 'eyes' ? undefined : true}>
        {scene !== 'loading' && <Eyes />}
      </div>

      <img className={styles.bare} src={art.original} alt={scene === 'reveal' ? 'MIWO waving, lavender tie visible' : ''} />
      <img className={styles.suited} src={art.costume} alt={scene === 'suit' ? 'MIWO in a blue whale costume' : ''} />

      <div className={styles.thoughts} aria-hidden="true">
        <span />
        <span />
        <img src={art.whaleTail} alt="" />
      </div>

      <div className={styles.splash} aria-hidden="true">
        <img src={art.whaleTail} alt="" />
      </div>

      {caption && (
        <p className={styles.caption} aria-live="polite">
          {caption}
        </p>
      )}
    </div>
  );
}
