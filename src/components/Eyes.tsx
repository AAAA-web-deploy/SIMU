import { useEffect, useState, type CSSProperties } from 'react';
import styles from './Eyes.module.css';

type Props = {
  reducedMotion?: boolean;
  className?: string;
  glance?: boolean;
};

const STEPS = [
  { x: -14, y: 0 },
  { x: 14, y: 2 },
  { x: 4, y: -14 },
  { x: 0, y: 0 },
];

export function Eyes({ reducedMotion = false, className = '', glance = true }: Props) {
  const focus = useGlance(reducedMotion || !glance);

  return (
    <svg
      className={`${styles.eyes} ${className}`}
      viewBox="0 0 620 290"
      role="img"
      aria-label="MIWO glances around with curious wide eyes"
    >
      <path d="M65 65 Q145 45 220 52" stroke="#fff8e9" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M350 41 Q441 26 524 62" stroke="#fff8e9" strokeWidth="8" fill="none" strokeLinecap="round" />
      <g className={styles.pair}>
        <ellipse cx="175" cy="171" rx="105" ry="116" fill="#fff9e8" stroke="#15131b" strokeWidth="10" />
        <ellipse cx="427" cy="155" rx="115" ry="131" fill="#fff9e8" stroke="#15131b" strokeWidth="10" />
        <ellipse cx="148" cy="130" rx="28" ry="16" fill="#fff" opacity="0.7" />
        <ellipse cx="392" cy="112" rx="30" ry="16" fill="#fff" opacity="0.65" />
        <g style={{ transform: `translate(${focus.x}px, ${focus.y}px)` } as CSSProperties} className={styles.pupils}>
          <circle cx="198" cy="176" r="24" fill="#181625" />
          <circle cx="458" cy="158" r="25" fill="#181625" />
          <circle cx="190" cy="166" r="6" fill="#fff" />
          <circle cx="448" cy="148" r="6" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

function useGlance(frozen: boolean) {
  const [focus, setFocus] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (frozen) return;
    let i = 0;
    const id = window.setInterval(() => {
      setFocus(STEPS[i % STEPS.length]);
      i += 1;
    }, 460);
    return () => window.clearInterval(id);
  }, [frozen]);
  return focus;
}
