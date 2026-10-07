import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { token } from '../config/token.ts';
import type { TokenConfig } from '../types/token.ts';
import { TokenActions } from './TokenActions.tsx';

const address = `0x${'ab'.repeat(20)}`;

function withLaunch(overrides: Partial<TokenConfig> = {}): TokenConfig {
  return { ...token, ...overrides };
}

describe('TokenActions', () => {
  it('shows a pending contract and opens the configured buy and chart links', () => {
    render(<TokenActions token={token} />);
    expect(screen.getByText(token.strings.contractPending)).toBeInTheDocument();
    expect(screen.queryByText(/^0x/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: token.strings.copy })).toBeDisabled();
    expect(screen.getByRole('link', { name: token.strings.buy })).toHaveAttribute('href', token.buyUrl);
    expect(screen.getByRole('link', { name: token.strings.chart })).toHaveAttribute('href', token.chartUrl);
    expect(screen.queryByText(token.strings.comingSoon)).not.toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain('href="#"');
  });

  it('hides an invalid address and still opens a valid buy link', () => {
    render(
      <TokenActions
        token={withLaunch({ contractAddress: '0x123', buyUrl: 'https://example.com/buy' })}
      />,
    );
    expect(screen.getByText(token.strings.contractPending)).toBeInTheDocument();
    expect(screen.queryByText('0x123')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: token.strings.buy })).toHaveAttribute(
      'href',
      'https://example.com/buy',
    );
  });

  it('copies the full address and restores the label', async () => {
    const user = userEvent.setup();
    const copyText = vi.fn(async () => true);
    render(
      <TokenActions
        token={withLaunch({
          contractAddress: address,
          buyUrl: 'https://example.com/buy',
          chartUrl: 'https://example.com/chart',
        })}
        copyText={copyText}
        copiedDurationMs={40}
      />,
    );

    expect(screen.getByText(address)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: token.strings.copy }));
    expect(copyText).toHaveBeenCalledWith(address);
    const copied = screen.getByRole('button', { name: token.strings.copied });
    expect(copied.querySelector('path')?.getAttribute('d')).toContain('M5 13');
    expect(document.querySelector('.copy-status')).toBeNull();
    expect(screen.getAllByText(address)).toHaveLength(1);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: token.strings.copy })).toBeInTheDocument();
    });

    const buy = screen.getByRole('link', { name: token.strings.buy });
    const chart = screen.getByRole('link', { name: token.strings.chart });
    expect(buy).toHaveAttribute('href', 'https://example.com/buy');
    expect(chart).toHaveAttribute('href', 'https://example.com/chart');
    expect(buy).toHaveAttribute('rel', 'noopener noreferrer');
    expect(buy).toHaveAttribute('target', '_blank');
  });

  it('keeps the address selectable when copying is rejected', async () => {
    const user = userEvent.setup();
    render(
      <TokenActions
        token={withLaunch({ contractAddress: address })}
        copyText={async () => false}
      />,
    );
    await user.click(screen.getByRole('button', { name: token.strings.copy }));
    expect(screen.getByText(token.strings.copyFailed)).toBeInTheDocument();
    expect(screen.getByText(address)).toBeInTheDocument();
  });
});
