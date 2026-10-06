import { motion } from 'framer-motion';
import { roadmapPhases } from '../data/roadmap.ts';
import { asset } from '../lib/assets.ts';
import { Reveal } from './Reveal.tsx';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Roadmap() {
  return (
    <section className="section roadmap" id="roadmap" aria-labelledby="roadmap-title">
      <div className="container">
        <Reveal>
          <h2 id="roadmap-title">THE SI TIMELINE</h2>
          <figure className="roadmap-figure">
            <img
              src={asset('sihere-roadmap.png')}
              alt="A glowing path rises through four phases from launch toward a crystal castle in the SI era."
              width={1600}
              height={716}
              loading="lazy"
            />
          </figure>
        </Reveal>
        <ol className="timeline">
          {roadmapPhases.map((phase, index) => (
            <motion.li
              key={phase.phase}
              className={`phase phase-${phase.phase}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.65, ease: EASE, delay: index * 0.04 }}
            >
              <p className="phase-kicker">Phase {phase.phase}</p>
              <h3>{phase.title}</h3>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
