import { assetSize, assets } from '../config/assets.ts';
import { token } from '../config/token.ts';
import { BuyLink, IconTelegram, IconX, SocialLink } from './Brand.tsx';

export function FinalCta() {
  return (
    <section className="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="display text-5xl sm:text-7xl lg:text-8xl">
          The future is
          <span className="mt-3 block">super intelligent.</span>
        </h2>
        <p className="display mt-16 text-5xl text-gold-bright sm:mt-24 sm:text-7xl lg:text-8xl">The intern is not.</p>
        <p className="gold-text font-display mt-12 text-5xl sm:text-7xl">{token.symbol}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
          <BuyLink>Buy {token.symbol}</BuyLink>
          <SocialLink href={token.telegramUrl} label="Telegram" className="btn btn-ghost">
            <IconTelegram /> Join Telegram
          </SocialLink>
          <SocialLink href={token.twitterUrl} label="X" className="btn btn-ghost">
            <IconX /> Follow X
          </SocialLink>
        </div>
        <img
          src={assets.logo}
          alt=""
          width={assetSize.logo.width}
          height={assetSize.logo.height}
          loading="lazy"
          decoding="async"
          className="mx-auto mt-14 w-40 object-contain sm:w-52"
        />
      </div>
    </section>
  );
}
