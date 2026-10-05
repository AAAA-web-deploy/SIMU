import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal.tsx';

type Score = {
  label: string;
  display: string;
  countTo?: number;
  suffix?: string;
  caption: string;
};

const scores: Score[] = [
  { label: 'Intelligence', display: '2 / 10', countTo: 2, suffix: ' / 10', caption: 'Promising room for improvement.' },
  { label: 'Confidence', display: '11 / 10', countTo: 11, suffix: ' / 10', caption: 'Unexplained.' },
  { label: 'Coffee consumption', display: '∞', caption: 'Finance is investigating.' },
  { label: 'Production incidents', display: 'Classified', caption: 'Legal advised us not to publish this.' },
  { label: 'Meme ability', display: '100 / 10', countTo: 100, suffix: ' / 10', caption: 'Finally, a useful skill.' },
  { label: 'Still employed?', display: 'Somehow', caption: 'HR refuses to comment.' },
];

export function PerformanceReview() {
  return (
    <section id="performance" className="scroll-mt-24 bg-secondary px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker">Quarterly</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl lg:text-7xl">Intern performance review</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">Management reluctantly completed the quarterly evaluation.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scores.map((score, index) => (
            <ScoreCard key={score.label} score={score} index={index} />
          ))}
        </div>
        <p className="mt-6 font-mono text-sm text-gold-bright">Task failed successfully.</p>
      </div>
    </section>
  );
}

function ScoreCard({ score, index }: { score: Score; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="glass-panel h-full rounded-3xl p-6">
        <h3 className="font-grotesk text-xs font-bold tracking-[0.16em] text-blue-bright uppercase">{score.label}</h3>
        <p className="display mt-4 text-4xl text-ink sm:text-5xl">
          <ScoreValue score={score} />
        </p>
        <p className="mt-3 text-muted">{score.caption}</p>
      </article>
    </Reveal>
  );
}

function ScoreValue({ score }: { score: Score }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || score.countTo === undefined || reduce) return;
    const target = score.countTo;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, reduce, score.countTo]);

  const shown =
    score.countTo === undefined || reduce ? score.display : `${value}${score.suffix ?? ''}`;
  return <span ref={ref}>{shown}</span>;
}
