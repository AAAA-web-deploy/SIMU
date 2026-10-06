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
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('∞')).toBeInTheDocument();
    expect(screen.getByText('MAX')).toBeInTheDocument();
    expect(screen.getByText(token.strings.statsNote)).toBeInTheDocument();
    expect(screen.getByText(token.footerNote)).toBeInTheDocument();
    expect(screen.getByText(token.chainName)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: token.strings.socialX })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: token.strings.socialTelegram })).not.toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain('hsichonk-banner');
    expect(document.body.innerHTML).not.toContain('hsichonk-social-preview');
  });
});
