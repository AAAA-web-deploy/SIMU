import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { assetSize, assets } from '../config/assets.ts';
import { useMinWidth } from '../lib/media.ts';
import { Reveal } from './Reveal.tsx';

export function Future() {
  const frame = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMinWidth(1024);
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="future" ref={frame} className="relative scroll-mt-24 overflow-hidden">
      <motion.img
        src={assets.future}
        alt="The intern running toward a rocket launch, with robots, a robotaxi, and the Super Intelligence campus behind him."
        width={assetSize.future.width}
        height={assetSize.future.height}
        loading="lazy"
        decoding="async"
        className="h-[70vh] min-h-[28rem] w-full object-cover object-center lg:h-[88vh] lg:scale-110"
        style={desktop && !reduce ? { y } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/20" />
      <div className="absolute inset-0 flex items-end">
        <Reveal className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <h2 className="display max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
            His internship
            <span className="mt-2 block">has just begun.</span>
          </h2>
          <div className="mt-6 max-w-xl space-y-2 text-lg text-ink/90">
            <p>AI gets smarter.</p>
            <p>Robots get better.</p>
            <p>Cars drive themselves.</p>
            <p>Rockets go farther.</p>
            <p>Ethereum keeps evolving.</p>
            <p>And unfortunately for everyone…</p>
          </div>
          <p className="display mt-8 max-w-5xl text-3xl text-gold-bright sm:text-5xl lg:text-6xl">
            The intern keeps showing up for work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
