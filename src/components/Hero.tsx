import { motion, useReducedMotion } from 'framer-motion';
import { Bot, Coffee, Diamond, Rocket } from 'lucide-react';
import type { ReactNode } from 'react';
import { assetSize, assets } from '../config/assets.ts';
import { token } from '../config/token.ts';
import { BuyLink } from './Brand.tsx';

const stars = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 86}%`,
  size: (index % 3) + 1,
  delay: `${(index % 8) * 0.35}s`,
}));

const buildings = [28, 46, 34, 62, 40, 78, 52, 36, 70, 44, 58, 32, 66, 48];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(54,167,255,0.22),transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_80%,rgba(255,182,41,0.08),transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(114,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(114,212,255,0.06) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 75%)',
          }}
        />
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay }}
          />
        ))}
        <div className="beam top-[-20%] left-[18%] -rotate-12" />
        <div className="beam top-[-10%] right-[8%] rotate-6" style={{ animationDelay: '1.4s' }} />
        <div className="absolute inset-x-0 bottom-0 flex h-40 items-end gap-1 opacity-40 sm:h-56">
          {buildings.map((height, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-blue/25 to-transparent"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="kicker">Welcome to Super Intelligence</p>
          <h1 className="display mt-4 max-w-3xl text-[2.7rem] text-ink sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            The smartest company
            <span className="mt-2 block">hired the dumbest intern.</span>
          </h1>
          <p className="gold-text font-display mt-6 text-4xl sm:text-6xl">{token.symbol}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            They were building the future of artificial intelligence.
            <span className="mt-3 block">They needed one more employee.</span>
            <span className="mt-3 block text-ink">Somehow, they hired him.</span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BuyLink>Buy {token.symbol}</BuyLink>
            <a className="btn btn-ghost" href="#story">
              Read his story <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="mt-8 font-grotesk text-xs font-bold tracking-[0.18em] text-blue-bright uppercase sm:text-sm">
            AI · Robots · Rockets · Ethereum · Memes · Bad decisions
          </p>
          <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-muted">
            Common sense not found.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-[8%] rounded-full bg-black blur-2xl" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(54,167,255,0.45),transparent_62%)]"
            aria-hidden="true"
          />
          <motion.img
            src={assets.hero}
            alt="Winking Shiba intern in an SI cap and headset, giving a thumbs up and holding a laptop."
            width={assetSize.hero.width}
            height={assetSize.hero.height}
            fetchPriority="high"
            decoding="async"
            className="relative z-10 mx-auto w-[86%] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
            animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 1.1, 0, -1.1, 0] }}
            transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <FloatIcon className="top-[12%] left-[6%]" delay={0}>
            <Rocket className="h-5 w-5" aria-hidden="true" />
          </FloatIcon>
          <FloatIcon className="top-[20%] right-[4%]" delay={0.6}>
            <Diamond className="h-5 w-5" aria-hidden="true" />
          </FloatIcon>
          <FloatIcon className="bottom-[22%] left-[2%]" delay={1.1}>
            <Coffee className="h-5 w-5" aria-hidden="true" />
          </FloatIcon>
          <FloatIcon className="right-[8%] bottom-[14%]" delay={0.3}>
            <Bot className="h-5 w-5" aria-hidden="true" />
          </FloatIcon>
        </div>
      </div>
    </section>
  );
}

function FloatIcon({ children, className, delay }: { children: ReactNode; className: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-20 hidden rounded-2xl border border-blue/30 bg-panel/80 p-3 text-gold shadow-[0_0_24px_rgba(54,167,255,0.25)] sm:block ${className}`}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={reduce ? undefined : { duration: 5.5, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
