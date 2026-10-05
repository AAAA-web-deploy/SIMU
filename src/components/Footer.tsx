import { token } from '../config/token.ts';
import { isPlaceholderLink } from '../lib/token.ts';

const links = [
  { label: 'X', href: token.twitterUrl },
  { label: 'Telegram', href: token.telegramUrl },
  { label: 'Uniswap', href: token.uniswapUrl },
  { label: 'Dexscreener', href: token.dexscreenerUrl },
  { label: 'Etherscan', href: token.etherscanUrl },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-2xl">Super Intelligence Intern</p>
        <p className="gold-text font-display mt-2 text-3xl">{token.symbol}</p>
        <p className="mt-4 max-w-sm text-muted">
          Built on Ethereum.
          <span className="mt-1 block">Powered by memes.</span>
          <span className="mt-1 block">Supervised by nobody.</span>
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
          {links.map((link) => (
            <li key={link.label}>
              {isPlaceholderLink(link.href) ? (
                <span className="text-sm text-muted" title="Coming soon">
                  {link.label}
                  <span className="ml-2 text-xs tracking-wide text-gold-bright uppercase">Coming soon</span>
                </span>
              ) : (
                <a className="text-sm text-ink underline-offset-4 hover:underline" href={link.href} target="_blank" rel="noreferrer noopener">
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
          $SIINTERN is a fictional meme-token project created for entertainment and community participation. It is not
          affiliated with, sponsored by, or endorsed by Tesla, SpaceX, xAI, Ethereum Foundation, Elon Musk, Vitalik
          Buterin, or any other referenced company or individual. Cryptocurrency involves substantial risk. Always
          verify contract information independently.
        </p>
      </div>
    </footer>
  );
}
