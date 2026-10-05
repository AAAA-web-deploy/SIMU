import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = dot.current;
    if (!fine || reduce || !el) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        el.style.opacity = '1';
        frame = 0;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden h-3 w-3 rounded-full opacity-0 mix-blend-screen md:block"
      style={{
        background: 'radial-gradient(circle, #ffffff 0%, #72d4ff 45%, transparent 72%)',
        boxShadow: '0 0 18px 6px rgba(54, 167, 255, 0.45)',
      }}
    />
  );
}
