import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContractPanel } from './ContractPanel.tsx';
import type { ContractView } from '../lib/view.ts';

const ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const published: ContractView = {
  address: ADDRESS,
  etherscanUrl: `https://etherscan.io/token/${ADDRESS}`,
  message: '',
  copyEnabled: true,
  availability: 'Published',
};

describe('contract copy', () => {
  it('copies the configured address exactly', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
    render(<ContractPanel contract={published} network="Ethereum mainnet" />);

    await user.click(screen.getByRole('button', { name: 'Copy address' }));

    expect(writeText).toHaveBeenCalledWith(ADDRESS);
    expect(await screen.findByText('Copied')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Etherscan/i })).toHaveAttribute('href', published.etherscanUrl);
  });

  it('hides the copy control before a contract is published', () => {
    render(
      <ContractPanel
        contract={{
          address: null,
          etherscanUrl: null,
          message: 'Contract not published yet',
          copyEnabled: false,
          availability: 'Not published',
        }}
        network="Ethereum mainnet"
      />,
    );
    expect(screen.getByText('Contract not published yet')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/0x/i)).not.toBeInTheDocument();
  });
});
