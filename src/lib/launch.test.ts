import { describe, expect, it } from 'vitest';
import { canBuy, canOpenChart, isEthereumAddress, isHttpsUrl } from './launch.ts';

const address = `0x${'ab'.repeat(20)}`;

describe('launch guards', () => {
  it('accepts only a 0x address with 40 hex characters', () => {
    expect(isEthereumAddress(address)).toBe(true);
    expect(isEthereumAddress(`0x${'ab'.repeat(19)}`)).toBe(false);
    expect(isEthereumAddress('0x123')).toBe(false);
    expect(isEthereumAddress(null)).toBe(false);
  });

  it('keeps buy disabled until the address and https link are both present', () => {
    expect(canBuy(null, null)).toBe(false);
    expect(canBuy(address, null)).toBe(false);
    expect(canBuy(address, 'http://example.com/buy')).toBe(false);
    expect(canBuy('0x123', 'https://example.com/buy')).toBe(false);
    expect(canBuy(address, 'https://example.com/buy')).toBe(true);
  });

  it('opens a chart only for an https URL', () => {
    expect(canOpenChart(null)).toBe(false);
    expect(isHttpsUrl('javascript:alert(1)')).toBe(false);
    expect(canOpenChart('https://example.com/chart')).toBe(true);
  });
});
