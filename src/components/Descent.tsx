import { useEffect, useRef } from 'react';
import { art } from '../assets';
import styles from './Descent.module.css';

const CANDLES = [
  { id: 'a', x: '8%', h: 36, up: true },
  { id: 'b', x: '18%', h: 58, up: false },
  { id: 'c', x: '30%', h: 44, up: true },
  { id: 'd', x: '42%', h: 72, up: true },
  { id: 'e', x: '54%', h: 40, up: false },
  { id: 'f', x: '66%', h: 64, up: false },
  { id: 'g', x: '78%', h: 48, up: true },
  { id: 'h', x: '88%', h: 30, up: false },
];

export function Descent() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      const passed = Math.min(Math.max(-rect.top, 0), total);
      el.style.setProperty('--depth', (passed / total).toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={ref} className={styles.descent} aria-label="Sinking from the surface">
      <div className={styles.sticky}>
        <img className={styles.depth} src={art.oceanDepth} alt="" />
        <div className={styles.rays} aria-hidden="true" />
        <div className={styles.candles} aria-hidden="true">
          {CANDLES.map((candle) => (
            <span
              key={candle.id}
              className={candle.up ? styles.up : styles.down}
              style={{ left: candle.x, height: candle.h }}
            />
          ))}
        </div>
        <div className={styles.story}>
          <p className={styles.lineA}>Whales move millions. MIWO moves emotionally.</p>
          <p className={styles.lineB}>I can&apos;t move the market. The market moves me.</p>
          <p className={styles.note}>Decorative crests. Not a live chart.</p>
        </div>
      </div>
    </section>
  );
}
