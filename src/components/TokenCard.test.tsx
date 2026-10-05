import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContractAddress } from './TokenCard.tsx';
import { TransparencyPanel } from './TransparencyPanel.tsx';

describe('contract address', () => {
  it('shows coming soon instead of a fake address', () => {
    render(<ContractAddress address="COMING_SOON" />);
    expect(screen.getByText(/contract address: coming soon/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument();
  });

  it('copies the full address and confirms it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    render(<ContractAddress address={address} />);
    expect(screen.getByText('0x1234…5678')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /copy contract address/i }));
    expect(writeText).toHaveBeenCalledWith(address);
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});

describe('transparency panel', () => {
  it('prints the configured placeholders', () => {
    render(<TransparencyPanel />);
    expect(screen.getByRole('heading', { name: /verify\. don't trust\./i })).toBeInTheDocument();
    expect(screen.getAllByText('Coming Soon').length).toBeGreaterThanOrEqual(5);
  });
});
