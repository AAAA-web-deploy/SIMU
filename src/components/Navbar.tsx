import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { assets } from '../config/assets.ts';
import { token } from '../config/token.ts';
import { BuyLink, IconTelegram, IconX, SocialLink } from './Brand.tsx';

const links = [
  { href: '#story', id: 'story', label: 'Story' },
  { href: '#missions', id: 'missions', label: 'Missions' },
  { href: '#token', id: 'token', label: 'Tokenomics' },
  { href: '#performance', id: 'performance', label: 'Performance' },
  { href: '#future', id: 'future', label: 'Future' },
  { href: '#community', id: 'community', label: 'Community' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? 'nav-glass' : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6" aria-label="Primary">
        <a href="#home" className="flex min-w-0 items-center gap-2">
          <img src={assets.logo} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="gold-text font-display text-lg tracking-wide md:text-xl">{token.symbol}</span>
        </a>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`font-grotesk text-xs font-bold tracking-[0.16em] uppercase transition-colors ${
                active === link.id ? 'text-gold-bright' : 'text-ink/80 hover:text-blue-bright'
              }`}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <SocialLink
            href={token.telegramUrl}
            label="Telegram"
            quiet
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink sm:inline-flex"
          >
            <IconTelegram />
          </SocialLink>
          <SocialLink
            href={token.twitterUrl}
            label="X"
            quiet
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink sm:inline-flex"
          >
            <IconX />
          </SocialLink>
          <BuyLink className="px-3 text-[0.68rem] sm:px-4 sm:text-[0.78rem]">Buy {token.symbol}</BuyLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-blue/20 px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="font-display text-3xl"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-3">
              <SocialLink href={token.telegramUrl} label="Telegram" className="btn btn-ghost flex-1">
                <IconTelegram /> Telegram
              </SocialLink>
              <SocialLink href={token.twitterUrl} label="X" className="btn btn-ghost flex-1">
                <IconX /> X
              </SocialLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
