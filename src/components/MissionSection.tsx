import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { assetSize, assets } from '../config/assets.ts';
import { Reveal } from './Reveal.tsx';

export function Missions() {
  return (
    <div id="missions" className="scroll-mt-24">
      <Intro />
      <TrainAi />
      <FixRobotaxi />
      <LaunchRocket />
      <ScaleEthereum />
    </div>
  );
}

function Intro() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker">The internship</p>
          <h2 className="display mt-3 max-w-4xl text-5xl sm:text-7xl">
            One intern.
            <span className="mt-2 block">Infinite assignments.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Every breakthrough in technology creates another job for the least qualified employee in the building.
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <img
            src={assets.missionGrid}
            alt="The intern presenting a résumé board to a startled interview panel of people and robots."
            width={assetSize.missionGrid.width}
            height={assetSize.missionGrid.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-3xl object-cover object-center"
          />
        </Reveal>
      </div>
    </section>
  );
}

function TrainAi() {
  return (
    <section className="bg-secondary px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="kicker">Mission 01</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">Train Super Intelligence</h2>
          <div className="mt-6 space-y-3 text-lg leading-relaxed text-muted">
            <p>The AI had read every textbook.</p>
            <p>Every scientific paper.</p>
            <p>Every line of code.</p>
            <p>Every philosophical argument.</p>
            <p className="text-ink">Then the intern arrived.</p>
          </div>
        </Reveal>
        <Reveal>
          <img
            src={assets.aiLab}
            alt="Super Intelligence lobby, where the intern arrived with coffee and production access."
            width={assetSize.aiLab.width}
            height={assetSize.aiLab.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-3xl object-cover object-center shadow-[0_0_80px_rgba(54,167,255,0.15)]"
          />
        </Reveal>
      </div>
      <div className="mx-auto mt-14 max-w-7xl">
        <Reveal>
          <p className="display text-5xl text-gold-bright sm:text-7xl lg:text-8xl">He showed it memes.</p>
          <p className="mt-4 max-w-xl text-lg text-muted">Training accuracy immediately became impossible to measure.</p>
          <p className="mt-4 font-mono text-sm text-blue-bright">Thinking… probably.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Stat label="Super Intelligence" value="99.9%" note="Still compiling." />
          <Stat label="Intern intelligence" value="2%" note="Rounded up." />
          <Stat label="Intern confidence" value="114%" note="Unsupervised." highlight />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, note, highlight = false }: { label: string; value: string; note: string; highlight?: boolean }) {
  return (
    <article className={`rounded-3xl border p-6 ${highlight ? 'border-gold/50 bg-panel shadow-[0_0_32px_rgba(255,182,41,0.15)]' : 'border-white/10 bg-panel/70'}`}>
      <p className="font-grotesk text-xs font-bold tracking-[0.16em] text-muted uppercase">{label}</p>
      <p className={`display mt-3 text-5xl ${highlight ? 'gold-text' : 'text-ink'}`}>{value}</p>
      <p className="mt-2 text-sm text-muted">{note}</p>
    </article>
  );
}

function FixRobotaxi() {
  const rows = [
    ['Computer Vision', 'Online', false],
    ['Navigation', 'Online', false],
    ['AI', 'Online', false],
    ['Intern Nearby', 'Warning', true],
  ] as const;

  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="order-2 lg:order-1">
          <p className="kicker">Mission 02</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">Fix the robotaxi</h2>
          <p className="mt-6 text-lg text-muted">Thousands of engineers spent years developing autonomous driving.</p>
          <blockquote className="mt-8 border-l-4 border-gold pl-5">
            <p className="display text-3xl text-ink sm:text-5xl">“Have you tried turning it off and on again?”</p>
            <footer className="mt-3 font-hand text-3xl text-gold-bright">— Intern</footer>
          </blockquote>
          <p className="mt-6 text-lg text-ink">Engineering requested that he step away from the vehicle.</p>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <img
            src={assets.robotaxi}
            alt="The intern sprinting through the lab with coffee while a robotaxi sits behind a do-not-touch sign."
            width={assetSize.robotaxi.width}
            height={assetSize.robotaxi.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-3xl object-cover object-center"
          />
          <div className="glass-panel mt-4 rounded-3xl p-5 font-mono text-sm">
            <p className="font-grotesk font-bold tracking-[0.16em] text-blue-bright uppercase">Robotaxi diagnostics</p>
            <ul className="mt-4 space-y-2">
              {rows.map(([name, status, warn]) => (
                <li key={name} className="flex items-center justify-between gap-4 border-b border-white/10 py-2">
                  <span>{name}</span>
                  <span className={warn ? 'text-gold-bright' : 'text-emerald-300'}>{status}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const launchLabels = ['Do not press', 'Seriously.', 'Intern, no.'];

function LaunchRocket() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [shout, setShout] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      document.body.classList.remove('screen-shake');
    };
  }, []);

  function startCycle() {
    if (timer.current) return;
    setIndex(1);
    timer.current = window.setInterval(() => {
      setIndex((value) => (value + 1) % launchLabels.length);
    }, 700);
  }

  function stopCycle() {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setIndex(0);
  }

  function press() {
    setShout(true);
    if (!reduce) document.body.classList.add('screen-shake');
    window.setTimeout(() => {
      setShout(false);
      document.body.classList.remove('screen-shake');
    }, 1600);
  }

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="kicker">Mission 03</p>
            <h2 className="display mt-3 text-4xl sm:text-6xl">Launch the rocket</h2>
            <div className="mt-6 max-w-xl space-y-3 text-lg text-muted">
              <p>Mission Control had hundreds of engineers.</p>
              <p>Decades of experience.</p>
              <p>Billions in hardware.</p>
              <p className="text-ink">Unfortunately…</p>
            </div>
          </Reveal>
          <p className="font-hand text-3xl text-gold-bright lg:pb-4">Engineering has left the chat.</p>
        </div>
        <Reveal className="relative mt-8">
          <img
            src={assets.rocket}
            alt="The intern at a desk with a rocket on the launch pad visible through the window."
            width={assetSize.rocket.width}
            height={assetSize.rocket.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-3xl object-cover object-center"
          />
        </Reveal>
        <div className="mt-10 text-center">
          <p className="display text-4xl sm:text-6xl lg:text-7xl">The intern had the button.</p>
          <button
            type="button"
            className="mx-auto mt-8 flex h-52 w-52 items-center justify-center rounded-full border-4 border-gold bg-[radial-gradient(circle_at_40%_35%,#ff5a3c,#9d1c16_70%)] px-6 text-center font-display text-2xl leading-none text-white uppercase shadow-[0_0_50px_rgba(255,70,40,0.45)] transition motion-safe:hover:scale-105"
            onMouseEnter={startCycle}
            onMouseLeave={stopCycle}
            onFocus={startCycle}
            onBlur={stopCycle}
            onClick={press}
            aria-describedby="launch-warning"
          >
            {launchLabels[index]}
          </button>
          <p id="launch-warning" className="sr-only">
            This button stays on the page. It does not launch anything.
          </p>
          <p className="mt-6 min-h-10 font-display text-2xl tracking-wide text-gold-bright sm:text-4xl" role="status">
            {shout ? 'Who gave him access?' : ''}
          </p>
        </div>
      </div>
    </section>
  );
}

function ScaleEthereum() {
  return (
    <section className="relative overflow-hidden bg-secondary px-5 py-20 md:px-8 md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {['12% 18%', '78% 22%', '20% 72%', '84% 70%', '50% 46%'].map((position, index) => (
          <span
            key={position}
            className="absolute h-10 w-10 rotate-45 border border-blue/30"
            style={{ left: position.split(' ')[0], top: position.split(' ')[1], opacity: 0.35 + index * 0.08 }}
          />
        ))}
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="kicker">Mission 04</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">Scale Ethereum</h2>
          <div className="mt-6 space-y-3 text-lg leading-relaxed text-muted">
            <p>Someone told the intern Ethereum needed to scale.</p>
            <p>Unfortunately, nobody explained what that meant.</p>
          </div>
          <p className="display mt-8 text-4xl text-gold-bright sm:text-6xl">So he brought a weighing scale.</p>
          <div className="glass-panel mt-8 grid gap-6 rounded-3xl p-6 sm:grid-cols-2">
            <div>
              <p className="font-grotesk text-xs font-bold tracking-[0.16em] text-blue-bright uppercase">Ethereum weight</p>
              <p className="display mt-2 text-4xl">Unknown</p>
            </div>
            <div>
              <p className="font-grotesk text-xs font-bold tracking-[0.16em] text-gold uppercase">Intern conclusion</p>
              <p className="mt-2 font-hand text-4xl text-gold-bright">“Pretty heavy.”</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">A joke about a weighing scale. Not a claim about Ethereum itself.</p>
        </Reveal>
        <Reveal>
          <img
            src={assets.ethereum}
            alt="The intern working at a laptop while a rocket launches beyond the Super Intelligence campus."
            width={assetSize.ethereum.width}
            height={assetSize.ethereum.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-3xl object-cover object-center"
          />
        </Reveal>
      </div>
    </section>
  );
}
