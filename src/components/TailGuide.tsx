import { useEffect, useRef } from 'react';
import { art } from '../assets';
import styles from './TailGuide.module.css';

export function TailGuide() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const paint = () => {
      const show = window.scrollY > window.innerHeight * 0.7;
      el.style.opacity = show ? '0.9' : '0';
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <img ref={ref} className={styles.tail} src={art.whaleTail} alt="" />;
}
