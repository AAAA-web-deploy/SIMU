import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { assetSize, assets } from '../config/assets.ts';
import { useMinWidth } from '../lib/media.ts';
import { Reveal } from './Reveal.tsx';

const notes = [
  { label: 'Who gave the intern prod access?', detail: 'The ticket is still open. The intern closed the laptop on it.' },
  { label: 'Do not give intern admin access', detail: 'Posted after the coffee incident. Ignored after the coffee incident.' },
  { label: 'Employee warning #37', detail: 'Please stop teaching the model new catchphrases.' },
  { label: 'AI + memes', detail: 'The only training data anybody can confirm.' },
  { label: 'To the moon', detail: 'He heard the phrase and started packing a suitcase.' },
  { label: 'Good ideas', detail: 'There were some. Execution was a separate department.' },
  { label: 'Rocket plans', detail: 'Mostly doodles. One of them got scheduled.' },
  { label: 'Ethereum notes', detail: 'Page one: “pretty heavy.” Page two: blank.' },
  { label: 'Coffee receipts', detail: 'Finance printed these. Then printed more.' },
];

export function MemeWall() {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMinWidth(1024);
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker">Office files</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl lg:text-7xl">Internal documents leaked.</h2>
        </Reveal>
        <div ref={frame} className="relative mt-8 overflow-hidden rounded-3xl">
          <motion.img
            src={assets.memeWall}
            alt="An office wall covered with intern notes, rocket sketches, task lists, and coffee receipts."
            width={assetSize.memeWall.width}
            height={assetSize.memeWall.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full origin-center object-cover object-center lg:scale-110"
            style={desktop && !reduce ? { y } : undefined}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {notes.map((note) => {
            const active = open === note.label;
            return (
              <button
                key={note.label}
                type="button"
                className={`rounded-full border px-3 py-2 text-left font-grotesk text-xs font-bold tracking-[0.08em] uppercase ${
                  active ? 'border-gold bg-gold text-[#1a1204]' : 'border-white/15 bg-panel text-ink hover:border-blue-bright'
                }`}
                aria-expanded={active}
                onClick={() => setOpen(active ? null : note.label)}
              >
                {note.label}
              </button>
            );
          })}
        </div>
        <p className="mt-4 min-h-12 max-w-2xl text-muted" role="status">
          {notes.find((note) => note.label === open)?.detail ?? 'Pick a label. The wall has opinions.'}
        </p>
      </div>
    </section>
  );
}
