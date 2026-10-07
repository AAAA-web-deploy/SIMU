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

  it('opens buy for an https link without waiting for the contract address', () => {
    expect(canBuy(null)).toBe(false);
    expect(canBuy('http://example.com/buy')).toBe(false);
    expect(canBuy('https://example.com/buy')).toBe(true);
  });

  it('opens a chart only for an https URL', () => {
    expect(canOpenChart(null)).toBe(false);
    expect(isHttpsUrl('javascript:alert(1)')).toBe(false);
    expect(canOpenChart('https://example.com/chart')).toBe(true);
  });
});
