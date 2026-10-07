import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App.tsx';
import { token } from './config/token.ts';

const address = `0x${'ab'.repeat(20)}`;

describe('App', () => {
  it('opens one content window at a time and restores the homepage', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getAllByRole('img', { name: /same superintelligence/i })).toHaveLength(2);
    expect(screen.getByRole('button', { name: /read the full story/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /simu details/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /musashi club/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /chart/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/awaiting confirmation/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /simu details/i }));
    const details = screen.getByRole('dialog', { name: /token details/i });
    expect(details).toHaveAttribute('data-panel', 'details');
    expect(within(details).getByRole('heading', { name: /how to buy/i })).toBeInTheDocument();
    expect(within(details).getAllByText('0%')).toHaveLength(2);
    const tokenTop = details.querySelector('.token-top');
    expect(tokenTop).not.toBeNull();
    expect(within(tokenTop as HTMLElement).queryByText(/pending verification/i)).not.toBeInTheDocument();
    expect(within(tokenTop as HTMLElement).queryByText(/\(pending\)/i)).not.toBeInTheDocument();
    expect(within(tokenTop as HTMLElement).queryByText(/^pending$/i)).not.toBeInTheDocument();
    expect(within(tokenTop as HTMLElement).queryByText(/on-chain proof/i)).not.toBeInTheDocument();
    expect(within(tokenTop as HTMLElement).queryByText(/^ethereum$/i)).not.toBeInTheDocument();

    await user.click(within(details).getByRole('button', { name: /visit musashi club/i }));
    const club = screen.getByRole('dialog', { name: /musashi club/i });
    expect(screen.queryByRole('dialog', { name: /token details/i })).not.toBeInTheDocument();
    expect(club).toHaveAttribute('data-panel', 'club');

    await user.click(within(club).getByRole('button', { name: /read the full story/i }));
    const story = screen.getByRole('dialog', { name: /full story/i });
    expect(screen.queryByRole('dialog', { name: /musashi club/i })).not.toBeInTheDocument();
    expect(within(story).getByRole('img', { name: /si musashi story/i })).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('overlay-open');
    expect(document.body.style.position).toBe('fixed');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('overlay-open');
    expect(document.body.style.position).toBe('');
  });

  it('copies the complete contract address and opens external links in a new tab', async () => {
    const user = userEvent.setup();
    const copyText = vi.fn(async () => true);
    const chart = 'https://example.com/chart';
    const telegram = 'https://example.com/telegram';
    const x = 'https://example.com/x';
    render(
      <App
        copyText={copyText}
        config={{
          ...token,
          contractAddress: address,
          chartUrl: chart,
          telegramUrl: telegram,
          xUrl: x,
          buyUrl: 'https://example.com/swap',
          markets: token.markets.map((market, index) =>
            index === 2 ? { ...market, url: 'https://example.com/etherscan' } : market,
          ),
          lpBurn: { ...token.lpBurn, status: 'verified', url: 'https://example.com/burn' },
        }}
      />,
    );

    expect(screen.getByText(address)).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: /copy ca/i })[0]!);
    expect(copyText).toHaveBeenCalledWith(address);

    const chartLink = screen.getAllByRole('link', { name: /chart/i })[0]!;
    expect(chartLink).toHaveAttribute('href', chart);
    expect(chartLink).toHaveAttribute('target', '_blank');
    expect(chartLink).toHaveAttribute('rel', 'noopener noreferrer');

    await user.click(screen.getByRole('button', { name: /simu details/i }));
    const details = screen.getByRole('dialog', { name: /token details/i });
    expect(within(details).getByText(address)).toBeInTheDocument();
    expect(within(details).getByRole('heading', { name: /total supply/i })).toBeInTheDocument();
    expect(within(details).getByRole('heading', { name: /contract verified/i })).toBeInTheDocument();
    expect(within(details).queryByRole('link', { name: /view transaction/i })).not.toBeInTheDocument();
    expect(within(details).queryByText(/provided by project/i)).not.toBeInTheDocument();
    expect(within(details).getByRole('link', { name: /etherscan/i })).toHaveAttribute('target', '_blank');
    expect(within(details).getByText(/swap on dex/i)).toBeInTheDocument();
    expect(within(details).queryByRole('link', { name: /swap on dex/i })).not.toBeInTheDocument();

    await user.click(within(details).getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
