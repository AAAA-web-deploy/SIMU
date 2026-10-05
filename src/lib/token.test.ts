import { describe, expect, it } from 'vitest';
import { isComingSoonAddress, isPlaceholderLink, shortenAddress } from './token.ts';

describe('token placeholders', () => {
  it('treats hash links as unpublished', () => {
    expect(isPlaceholderLink('#')).toBe(true);
    expect(isPlaceholderLink('')).toBe(true);
    expect(isPlaceholderLink('https://app.uniswap.org')).toBe(false);
  });

  it('does not treat a real address as coming soon', () => {
    expect(isComingSoonAddress('COMING_SOON')).toBe(true);
    expect(isComingSoonAddress(' coming_soon ')).toBe(true);
    expect(isComingSoonAddress('0xabc')).toBe(false);
  });

  it('shortens long addresses and leaves short values intact', () => {
    expect(shortenAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe('0x1234…5678');
    expect(shortenAddress('short')).toBe('short');
  });
});
