import { Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { navIds, navLinks } from '../data/navigation.ts';
import { siteConfig } from '../data/siteConfig.ts';
import { asset } from '../lib/assets.ts';
import { useActiveSection } from '../lib/useActiveSection.ts';
import { useMediaQuery } from '../lib/useMediaQuery.ts';
import { ActionLink, BuyLink } from './ActionLink.tsx';
import { TelegramIcon, XSocialIcon } from './BrandIcons.tsx';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1179px)');
  const active = useActiveSection(navIds);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1179px)');
    function onChange() {
      if (!media.matches) setOpen(false);
    }
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = panel?.querySelectorAll<HTMLElement>('a, button:not(:disabled)') ?? [];
    focusable[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="brand" href="#home" onClick={closeMenu}>
        <img
          src={asset('sihere-logo-icon-only-transparent.png')}
          alt=""
          width={384}
          height={384}
        />
        <span>{siteConfig.name}</span>
      </a>

      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        className={open ? 'nav-panel is-open' : 'nav-panel'}
        inert={isMobile && !open ? true : undefined}
      >
        <nav aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'location' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <div className="nav-social">
            <ActionLink href={siteConfig.xUrl} className="icon-btn" aria-label="SI is Here on X">
              <XSocialIcon />
            </ActionLink>
            <ActionLink href={siteConfig.telegramUrl} className="icon-btn" aria-label="SI is Here on Telegram">
              <TelegramIcon />
            </ActionLink>
          </div>
          <BuyLink className="btn btn-primary nav-buy">BUY {siteConfig.ticker}</BuyLink>
        </div>
      </div>
    </header>
  );
}
