import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { assetSize, assets } from '../config/assets.ts';
import { Reveal } from './Reveal.tsx';

const experience = [
  ['AI', 'Watched tutorial.'],
  ['Rockets', 'Played simulator.'],
  ['Ethereum', 'Owns 0.003 ETH.'],
  ['Coffee', 'Expert.'],
  ['Memes', 'Full-time.'],
];

export function HiringMistake() {
  const stampRef = useRef<HTMLDivElement>(null);
  const stamped = useInView(stampRef, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  return (
    <section id="story" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="kicker">Chapter 01</p>
          <h2 className="display mt-3 text-5xl text-ink sm:text-7xl">The hiring mistake.</h2>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-muted">
            <p>Humanity was building Super Intelligence.</p>
            <p>The AI could reason.</p>
            <p>The robots could work.</p>
            <p>The cars could drive themselves.</p>
            <p>The rockets could fly.</p>
            <p className="text-ink">Everything was going perfectly.</p>
            <p className="text-xl text-ink">Then HR hired the intern.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="glass-panel relative rounded-3xl p-6 sm:p-8">
            <p className="font-grotesk text-xs font-bold tracking-[0.2em] text-blue-bright uppercase">Résumé</p>
            <h3 className="display mt-3 text-3xl text-ink sm:text-4xl">Super Intelligence Intern</h3>
            <p className="mt-6 font-grotesk text-sm font-bold tracking-[0.18em] text-gold uppercase">Experience</p>
            <dl className="mt-4 space-y-4">
              {experience.map(([role, detail]) => (
                <div key={role} className="border-b border-white/10 pb-3">
                  <dt className="font-grotesk font-bold tracking-wide text-ink uppercase">{role}</dt>
                  <dd className="text-muted">{detail}</dd>
                </div>
              ))}
            </dl>
            <div ref={stampRef} className="mt-8 flex justify-end">
              <motion.p
                className="stamp px-4 py-3 text-2xl sm:text-3xl"
                initial={reduce ? false : { scale: 1.7, opacity: 0, rotate: -18 }}
                animate={stamped ? { scale: 1, opacity: 1, rotate: -8 } : undefined}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 12 }}
              >
                Status: Hired
              </motion.p>
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-14 max-w-7xl">
        <figure className="relative overflow-hidden rounded-3xl">
          <img
            src={assets.firstDay}
            alt="The intern holding a résumé across from a panel of robots in a Super Intelligence boardroom."
            width={assetSize.firstDay.width}
            height={assetSize.firstDay.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-cover object-center"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent p-6 sm:p-10">
            <p className="display max-w-4xl text-3xl text-ink sm:text-5xl lg:text-6xl">
              Nobody knows how he passed the interview.
            </p>
            <p className="mt-3 font-hand text-3xl text-gold-bright">Including him.</p>
          </figcaption>
        </figure>
      </Reveal>

      <Reveal className="mx-auto mt-8 max-w-7xl">
        <figure className="overflow-hidden rounded-3xl border border-white/10">
          <img
            src={assets.origin}
            alt="The intern at a laptop, with a rocket launch, robotaxis, and the Super Intelligence campus outside."
            width={assetSize.origin.width}
            height={assetSize.origin.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-cover object-center"
          />
        </figure>
        <p className="mt-4 text-center font-mono text-xs tracking-[0.16em] text-muted uppercase">
          $ sudo hire-intern · permission granted · regret loading
        </p>
      </Reveal>
    </section>
  );
}

const timeline = [
  { time: '09:00', text: 'Arrived late.', hot: false },
  { time: '09:07', text: 'Spilled coffee.', hot: false },
  { time: '09:12', text: 'Received production access.', hot: false },
  { time: '09:13', text: 'Civilization entered a new era.', hot: true },
];

export function FirstDay() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();

  return (
    <section ref={sectionRef} className="relative scroll-mt-24 overflow-hidden px-5 py-16 md:px-8 md:py-24">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 15% 0%, rgba(255,40,48,0.45), transparent 46%), radial-gradient(ellipse at 90% 100%, rgba(255,40,48,0.28), transparent 42%)',
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduce ? { opacity: [0, 0.95, 0.15, 0.8, 0] } : { opacity: 0 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker">Chapter 02</p>
          <h2 className="display mt-3 text-5xl sm:text-7xl">His first day.</h2>
        </Reveal>
        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1.45fr_0.7fr]">
          <img
            src={assets.aiLab}
            alt="The intern spilling coffee in the Super Intelligence lobby beside a glowing do-not-touch sign."
            width={assetSize.aiLab.width}
            height={assetSize.aiLab.height}
            loading="lazy"
            decoding="async"
            className="h-full min-h-64 w-full rounded-3xl object-cover object-center"
          />
          <ol className="grid gap-3">
            {timeline.map((item) => (
              <li
                key={item.time}
                className={`rounded-2xl border px-4 py-3 ${
                  item.hot ? 'border-gold bg-panel shadow-[0_0_30px_rgba(255,182,41,0.2)]' : 'border-white/10 bg-panel/80'
                }`}
              >
                <p className={`font-grotesk text-sm font-bold tracking-[0.16em] ${item.hot ? 'text-gold-bright' : 'text-blue-bright'}`}>
                  {item.time}
                </p>
                <p className={`mt-1 ${item.hot ? 'text-lg font-semibold text-ink' : 'text-ink/90'}`}>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="display max-w-4xl text-4xl sm:text-6xl lg:text-7xl">What could possibly go wrong?</p>
          <div className="max-w-xs rounded-2xl border border-blue/30 bg-panel px-4 py-3 text-sm text-blue-bright">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-bright" aria-hidden="true" />
            Intern has joined production
          </div>
        </div>
        <p className="mt-6 inline-block -rotate-2 rounded-md bg-[#ffe56a] px-3 py-2 font-hand text-2xl text-[#2a2208] shadow-lg">
          Prod fuel
        </p>
      </div>
    </section>
  );
}
