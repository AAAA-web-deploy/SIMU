import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App.tsx';
import { token } from './config/token.ts';

describe('App', () => {
  it('renders the page sections in order without off-site banners', () => {
    render(<App />);
    const headings = screen.getAllByRole('heading').map((heading) => heading.textContent);
    expect(headings.slice(0, 4)).toEqual([
      token.name,
      token.strings.contractHeading,
      token.strings.statsHeading,
      token.strings.howToBuyHeading,
    ]);
    expect(screen.getByText(token.tagline)).toBeInTheDocument();
    expect(screen.getByText(token.description)).toBeInTheDocument();
    expect(screen.getByText(String(token.evolution.length))).toBeInTheDocument();
    expect(screen.getByText('∞')).toBeInTheDocument();
    expect(screen.getByText('MAX')).toBeInTheDocument();
    expect(screen.getByText(token.strings.statsNote)).toBeInTheDocument();
    expect(screen.getByText(token.footerNote)).toBeInTheDocument();
    expect(screen.queryByText(token.chainName)).not.toBeInTheDocument();
    const xLinks = screen.getAllByRole('link', { name: token.strings.socialX });
    const telegramLinks = screen.getAllByRole('link', { name: token.strings.socialTelegram });
    expect(xLinks[0]).toHaveAttribute('href', 'https://x.com/hsichonk_eth');
    expect(telegramLinks[0]).toHaveAttribute('href', 'https://t.me/sivitalik');
    expect(document.body.innerHTML).not.toContain('sichonk-banner');
    expect(document.body.innerHTML).not.toContain('sichonk-social-preview');
  });
});
