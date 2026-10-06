import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { MouseEvent } from 'react';
import { asset } from '../lib/assets.ts';
import { Reveal } from './Reveal.tsx';

export function MascotSection() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 18 });

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function onLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="section mascot" aria-labelledby="mascot-title">
      <div className="container mascot-layout">
        <Reveal>
          <div className="mascot-stage" onMouseMove={onMove} onMouseLeave={onLeave}>
            <span className="mascot-ring" aria-hidden="true" />
            <motion.div className="mascot-tilt" style={reduce ? undefined : { rotateX, rotateY }}>
              <img
                className="float-slow"
                src={asset('sihere-logo-circle-transparent-final.png')}
                alt="Circular emblem of the crowned SI king holding a glowing SI crystal, with the words SI is Here and $SIHERE."
                width={960}
                height={960}
                loading="lazy"
              />
            </motion.div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mascot-copy">
            <h2 id="mascot-title">MEET THE KING OF THE SI ERA</h2>
            <p>He watched humans discover the internet.</p>
            <p>He watched crypto arrive.</p>
            <p>He watched AI take over everyone&apos;s timeline.</p>
            <p>Then he put on the crown.</p>
            <p>
              The glowing crystal in his hands represents the arrival of SI — Super Intelligence.
            </p>
            <p className="mascot-closer">
              Cute enough for memes. Smart enough for Ethereum. Crowned for what comes next.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
