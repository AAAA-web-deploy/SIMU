import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { liveHttpsUrl } from '../lib/launch.ts';

export function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M4 19V5h2v14H4Zm6 0V9h2v10h-2Zm6 0V3h2v16h-2Z" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="8" y="3" width="12" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="7" width="12" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.5 4.4 18.7 19c-.2 1-.8 1.2-1.6.8l-4.4-3.3-2.1 2c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L7.3 13.1 2.8 11.7c-1-.3-1-.9.2-1.4L20.1 3.5c.8-.3 1.6.2 1.4.9Z"
      />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 10.3 22.2 2h-1.8l-6.5 7.2L8.6 2H2.2l7.9 11.1L2.2 22h1.8l6.9-7.7L15.4 22h6.4l-7.1-11.7Zm-2.4 2.7-.8-1.1L4.6 3.3h2.7l5.1 7 .8 1.1 6.6 9.2h-2.7l-5.4-7.6Z"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M12 3.2 3 11h2.2v8.2h5.1v-5.1h3.4v5.1h5.1V11H21L12 3.2Z" />
    </svg>
  );
}

export function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M14 3.8V8h4.2" />
    </svg>
  );
}

export function EthIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="#8b7cff" d="M12 2.2 6.2 12.2 12 15.6l5.8-3.4L12 2.2Z" />
      <path fill="#c8b6ff" d="M12 16.6 6.2 13.2 12 21.8l5.8-8.6L12 16.6Z" />
    </svg>
  );
}

export function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#ff8a1e" d="M12 2s5 4.2 5 9a5 5 0 0 1-10 0c0-1.6.7-3 1.6-4.2C7.4 8.6 7 10.2 7 11a5 5 0 0 0 5 5c2.2 0 3.4-1.4 3.4-3.2C15.4 8.2 12 5.2 12 2Z" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" fill="#c084fc" />
      <path fill="none" stroke="#c084fc" strokeWidth="2" d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </svg>
  );
}

export function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M5 4.5h6.2A3.8 3.8 0 0 1 15 8.2V20H7.2A2.2 2.2 0 0 0 5 17.8V4.5Zm8.2 0H19v13.3a2.2 2.2 0 0 1-2.2 2.2H13.2V8.2A3.8 3.8 0 0 0 13.2 4.5Z" />
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="8" cy="9" r="2.4" fill="currentColor" />
      <circle cx="15.5" cy="9.2" r="2.1" fill="currentColor" />
      <path fill="currentColor" d="M3.6 18.2c.4-2.6 2.4-4 4.6-4s4.2 1.4 4.6 4H3.6Zm7.2.1c.2-1.6 1-2.9 2.2-3.6 1.8-.2 4.2.8 4.8 3.6h-7Z" />
    </svg>
  );
}

export function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M7 7h11M15 4l3 3-3 3M17 17H6M9 14l-3 3 3 3" />
    </svg>
  );
}

export function ExternalControl({
  href,
  className,
  children,
}: {
  href: string | null;
  className?: string;
  children: ReactNode;
}) {
  const url = liveHttpsUrl(href);
  if (!url) {
    return (
      <button type="button" className={className} disabled>
        {children}
        <span className="sr-only"> Link pending</span>
      </button>
    );
  }
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function FittedText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return undefined;

    const fit = () => {
      let size = 15;
      el.style.fontSize = `${size}px`;
      const limit = parent.clientWidth;
      if (limit <= 0) return;
      while (size > 9 && el.scrollWidth > limit) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span ref={ref} className="fitted-text">
      {text}
    </span>
  );
}

type CopyState = 'idle' | 'copied' | 'failed';

export function CopyButton({
  canCopy,
  state,
  onCopy,
  className,
  children,
}: {
  canCopy: boolean;
  state: CopyState;
  onCopy: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={onCopy}
      disabled={!canCopy}
      aria-label={state === 'copied' ? 'Copied' : undefined}
    >
      {state === 'copied' ? <CheckIcon /> : <CopyIcon />}
      {children}
    </button>
  );
}
