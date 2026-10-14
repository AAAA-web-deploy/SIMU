import { useEffect, useRef } from 'react';
import { art } from '../assets';
import { WHALE_MODE_MS } from '../config/timings';
import styles from './OceanHero.module.css';

const BUBBLES = [
  { l: '6%', b: '28%', s: 22, d: '0s', t: '9s' },
  { l: '18%', b: '46%', s: 14, d: '1s', t: '11s' },
  { l: '12%', b: '16%', s: 10, d: '2s', t: '8s' },
  { l: '30%', b: '62%', s: 16, d: '0.4s', t: '12s' },
  { l: '42%', b: '22%', s: 12, d: '1.6s', t: '10s' },
  { l: '70%', b: '18%', s: 18, d: '0.2s', t: '13s' },
  { l: '78%', b: '34%', s: 11, d: '2.2s', t: '9s' },
  { l: '86%', b: '48%', s: 20, d: '0.8s', t: '12s' },
  { l: '58%', b: '12%', s: 9, d: '1.2s', t: '8s' },
  { l: '24%', b: '72%', s: 13, d: '1.8s', t: '10s' },
  { l: '64%', b: '58%', s: 15, d: '0.6s', t: '11s' },
  { l: '90%', b: '14%', s: 8, d: '2.4s', t: '9s' },
];

type Props = {
  whaleOn: boolean;
  onWhale: (active: boolean) => void;
};

export function OceanHero({ whaleOn, onWhale }: Props) {
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const go = () => {
    onWhale(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => onWhale(false), WHALE_MODE_MS);
  };

  return (
    <section id="ocean" className={`${styles.hero} ${whaleOn ? styles.whaleOn : ''}`} aria-labelledby="miwo-title">
      {/* Painterly sky sits above the flat ocean SVG, which is only the sea foundation. */}
      <div className={styles.sky} />
      <div className={styles.sun} aria-hidden="true" />
      <div className={styles.warm} aria-hidden="true" />
      <div className={styles.cloudA} aria-hidden="true" />
      <div className={styles.cloudB} aria-hidden="true" />
      <div className={styles.cloudC} aria-hidden="true" />
      <div className={styles.seaPaint} />
      <img className={styles.plate} src={art.oceanSurface} alt="" />
      <DistantWhale />
      <div className={styles.bubbles} aria-hidden="true">
        {BUBBLES.map((bubble) => (
          <img
            key={`${bubble.l}-${bubble.b}`}
            src={art.bubble}
            alt=""
            className={styles.bubble}
            style={{
              left: bubble.l,
              bottom: bubble.b,
              width: bubble.s,
              animationDelay: bubble.d,
              animationDuration: bubble.t,
            }}
          />
        ))}
      </div>
      <div className={styles.waveBack}>
        <div className={styles.waveTrack}>
          <img src={art.wave} alt="" />
          <img src={art.wave} alt="" />
        </div>
      </div>
      <div className={styles.miwoSlot}>
        <img
          className={styles.miwo}
          src={art.costume}
          alt="MIWO in a blue whale costume, standing in the daylight ocean"
          width={1050}
          height={1050}
          fetchPriority="high"
        />
      </div>
      <div className={styles.waveFront}>
        <div className={styles.waveTrack}>
          <img src={art.wave} alt="" />
          <img src={art.wave} alt="" />
        </div>
      </div>
      <div className={styles.copy}>
        <h1 id="miwo-title">
          <span>MICRO</span>
          <span>PANIC</span>
        </h1>
        <p className={styles.ticker}>$MIWO</p>
        <p className={styles.slogan}>
          Micro Bag.
          <br />
          Whale-Sized Feelings.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => go()}
            aria-pressed={whaleOn}
            aria-describedby="bag-label"
          >
            GO FULL WHALE
          </button>
          <p id="bag-label" className={styles.bag}>
            BAG: STILL MICRO
          </p>
        </div>
        {whaleOn && (
          <p className={styles.confidence} role="status">
            CONFIDENCE: 100
          </p>
        )}
      </div>
    </section>
  );
}

function DistantWhale() {
  return (
    <svg className={styles.whale} viewBox="0 0 640 280" aria-hidden="true">
      <path
        d="M40 150 Q20 70 90 48 C130 78 170 96 210 108 C300 20 470 28 560 90 Q610 70 630 20 Q656 100 610 150 Q604 190 540 214 C390 270 150 230 70 176 Z"
        fill="#2f86c4"
        stroke="#d7f3ff"
        strokeWidth="8"
      />
      <ellipse cx="300" cy="150" rx="160" ry="36" fill="#9fd4f4" opacity="0.75" />
      <circle cx="112" cy="92" r="7" fill="#102840" />
      <path d="M96 118 Q120 142 156 128" stroke="#e7f8ff" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
