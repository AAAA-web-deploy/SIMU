import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContractAddress, TokenCard } from './TokenCard.tsx';

describe('contract address', () => {
  it('shows coming soon instead of a fake address', () => {
    render(<ContractAddress address="COMING_SOON" />);
    expect(screen.getByText('Coming Soon..')).toBeInTheDocument();
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

describe('tokenomics', () => {
  it('shows the published token facts', () => {
    render(<TokenCard />);
    expect(screen.getByRole('heading', { name: 'Tokenomics' })).toBeInTheDocument();
    expect(screen.getByText('Coming Soon..')).toBeInTheDocument();
    expect(screen.getByText('Burnt')).toBeInTheDocument();
    expect(screen.getByText('Renounced')).toBeInTheDocument();
    expect(screen.getAllByText('0%')).toHaveLength(2);
    expect(screen.queryByRole('heading', { name: /verify\. don't trust\./i })).not.toBeInTheDocument();
  });
});
