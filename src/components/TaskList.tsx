import { motion, useReducedMotion } from 'framer-motion';
import { assetSize, assets } from '../config/assets.ts';
import { Reveal } from './Reveal.tsx';

const tasks = [
  { label: 'Make coffee', done: true },
  { label: 'Train Super Intelligence', done: false },
  { label: 'Fix Robotaxi', done: false },
  { label: 'Debug robot', done: false },
  { label: 'Launch rocket', done: false },
  { label: 'Scale Ethereum', done: false },
  { label: "Don't press red button", done: false },
  { label: "Don't destroy civilization", done: false },
];

export function TaskList() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.1fr]">
        <Reveal className="relative order-2 mx-auto w-full max-w-sm lg:order-1">
          <motion.img
            src={assets.taskList}
            alt="The intern running with a laptop, a headset, and a cup of coffee."
            width={assetSize.taskList.width}
            height={assetSize.taskList.height}
            loading="lazy"
            decoding="async"
            className="w-full object-contain"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p className="absolute top-6 -left-2 -rotate-6 rounded-md bg-[#ffe56a] px-3 py-2 font-hand text-xl text-[#2a2208] shadow-lg sm:text-2xl">
            Do not give intern root access
          </p>
        </Reveal>

        <Reveal delay={0.08} className="order-1 lg:order-2">
          <h2 className="display text-4xl sm:text-6xl lg:text-7xl">
            Management gave him
            <span className="mt-2 block">eight simple tasks.</span>
          </h2>
          <div className="notebook relative mt-8 overflow-hidden rounded-3xl px-6 py-8 sm:px-12">
            <h3 className="font-grotesk text-sm font-bold tracking-[0.18em] uppercase">Today's intern tasks</h3>
            <ul className="relative z-10 mt-6 space-y-3 pl-4">
              {tasks.map((task, index) => (
                <motion.li
                  key={task.label}
                  className="flex items-center gap-3 text-lg sm:text-xl"
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : index * 0.06, duration: 0.35 }}
                >
                  <span
                    className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 ${
                      task.done ? 'border-[#c0392b] text-[#c0392b]' : 'border-[#1c140c]/50'
                    }`}
                    aria-hidden="true"
                  >
                    {task.done ? '✓' : ''}
                  </span>
                  <span className={task.done ? 'text-[#1c140c]' : 'text-[#1c140c]/80'}>{task.label}</span>
                </motion.li>
              ))}
            </ul>
            <p className="relative z-10 mt-8 font-hand text-3xl text-[#5c3b22]">“Seems easy.” — Intern</p>
            <div className="coffee-stain pointer-events-none absolute right-6 bottom-4" aria-hidden="true" />
          </div>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-blue/25 bg-black/50 p-4 font-mono text-sm text-blue-bright">
            <span className="text-gold">$ sudo fix-everything</span>
            {'\n'}permission denied
          </pre>
        </Reveal>
      </div>
    </section>
  );
}
