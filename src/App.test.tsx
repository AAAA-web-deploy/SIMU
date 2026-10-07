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
    for (const item of token.statusLines) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getAllByText(item.value).length).toBeGreaterThan(0);
    }
    expect(screen.queryByText(token.strings.statsNote)).not.toBeInTheDocument();
    expect(screen.queryByText(token.footerNote)).not.toBeInTheDocument();
    expect(screen.queryByText('Intelligence and chonk values are fictional.')).not.toBeInTheDocument();
    expect(screen.queryByText(token.chainName)).not.toBeInTheDocument();
    const xLinks = screen.getAllByRole('link', { name: token.strings.socialX });
    const telegramLinks = screen.getAllByRole('link', { name: token.strings.socialTelegram });
    expect(xLinks[0]).toHaveAttribute('href', token.xUrl);
    expect(telegramLinks[0]).toHaveAttribute('href', token.telegramUrl);
    expect(xLinks[1]?.querySelector('svg')).toBeTruthy();
    expect(telegramLinks[1]?.querySelector('svg')).toBeTruthy();
    expect(document.body.innerHTML).not.toContain('sichonk-banner');
    expect(document.body.innerHTML).not.toContain('sichonk-social-preview');
  });
});
