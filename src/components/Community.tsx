import { motion, useReducedMotion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import { assetSize, assets } from '../config/assets.ts';
import { token } from '../config/token.ts';
import { isPlaceholderLink } from '../lib/token.ts';
import { IconTelegram, IconX, SocialLink } from './Brand.tsx';
import { Reveal } from './Reveal.tsx';

const paws = [
  'left-[6%] top-[12%]',
  'right-[8%] top-[18%]',
  'left-[12%] bottom-[16%]',
  'right-[14%] bottom-[20%]',
  'left-[42%] top-[6%]',
];

export function Community() {
  const reduce = useReducedMotion();
  const chartLive = !isPlaceholderLink(token.dexscreenerUrl);

  return (
    <section id="community" className="relative scroll-mt-24 overflow-hidden px-5 py-20 md:px-8 md:py-28">
      {paws.map((place, index) => (
        <motion.span
          key={place}
          aria-hidden="true"
          className={`absolute text-gold/50 ${place}`}
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={reduce ? undefined : { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
        >
          <PawPrint className="h-8 w-8" />
        </motion.span>
      ))}
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker">The department</p>
          <h2 className="display max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
            One intern was a mistake.
            <span className="mt-3 block text-gold-bright">A million interns is a movement.</span>
          </h2>
          <div className="mt-6 max-w-xl space-y-2 text-lg text-muted">
            <p>Some came for AI.</p>
            <p>Some came for Ethereum.</p>
            <p>Some came for rockets.</p>
            <p>Some just wanted memes.</p>
            <p className="text-ink">Now everyone works in the same department.</p>
          </div>
        </Reveal>
        <Reveal className="mt-8">
          <img
            src={assets.army}
            alt="The intern waving from a crowded Super Intelligence office full of helper robots."
            width={assetSize.army.width}
            height={assetSize.army.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-3xl object-cover object-center"
          />
        </Reveal>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <SocialLink href={token.telegramUrl} label="Telegram" className="btn btn-gold w-full sm:w-auto">
            <IconTelegram /> Join Telegram
          </SocialLink>
          <SocialLink href={token.twitterUrl} label="X" className="btn btn-ghost w-full sm:w-auto">
            <IconX /> Follow on X
          </SocialLink>
          {chartLive ? (
            <a className="btn btn-ghost w-full sm:w-auto" href={token.dexscreenerUrl} target="_blank" rel="noreferrer noopener">
              View {token.symbol}
            </a>
          ) : (
            <a className="btn btn-ghost w-full sm:w-auto" href="#token">
              View {token.symbol}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
