import { describe, expect, it } from 'vitest';
import { canUseTradeLinks, isLiveUrl, isPlaceholder, isRealAddress } from './links.ts';

describe('site link guards', () => {
  it('treats bracketed config values as unpublished', () => {
    expect(isPlaceholder('[CONTRACT_ADDRESS]')).toBe(true);
    expect(isPlaceholder('[X_URL]')).toBe(true);
    expect(isLiveUrl('[UNISWAP_URL]')).toBe(false);
  });

  it('accepts a published https link', () => {
    expect(isLiveUrl('https://x.com/sihere')).toBe(true);
  });

  it('keeps trade links off until the contract and url are both real', () => {
    const address = `0x${'ab'.repeat(20)}`;
    expect(isRealAddress(address)).toBe(true);
    expect(canUseTradeLinks('[CONTRACT_ADDRESS]', 'https://etherscan.io/token/0x1')).toBe(false);
    expect(canUseTradeLinks(address, '[ETHERSCAN_URL]')).toBe(false);
    expect(canUseTradeLinks(address, 'https://etherscan.io/token/0x1')).toBe(true);
  });
});
