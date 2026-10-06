import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { memeStatValue, validateTokenConfig } from './validateToken.ts';
import { token } from './token.ts';

const files = [
  'hsichonk-evolution-01-cat.png',
  'hsichonk-evolution-02-chonk.png',
  'hsichonk-evolution-03-tech-chonk.png',
  'hsichonk-evolution-04-ai-chonk.png',
  'hsichonk-evolution-05-agi-chonk.png',
  'hsichonk-evolution-06-si-chonk.png',
  'hsichonk-evolution-07-hefty-si-chonk.png',
  'hsichonk-logo-transparent.png',
  'hsichonk-favicon.png',
  'hsichonk-social-preview.png',
  'hsichonk-banner-3x1.png',
  'hsichonk-banner-1100x520.png',
];

describe('token config', () => {
  it('keeps launch links unset and derives the stage-count stat', () => {
    expect(token.contractAddress).toBeNull();
    expect(token.buyUrl).toBeNull();
    expect(token.chartUrl).toBeNull();
    expect(token.xUrl).toBeNull();
    expect(token.telegramUrl).toBeNull();
    expect(token.siteUrl).toBe('https://hsichonk.site');
    expect(token.evolution).toHaveLength(7);
    expect(memeStatValue(token.memeStats[0]!, token.evolution.length)).toBe('7');
    expect(token.chainName).toBe('Ethereum');
    expect(token.nativeSymbol).toBe('ETH');
  });

  it('has the supplied image files on disk', () => {
    for (const file of files) {
      expect(existsSync(`public/assets/token/${file}`), file).toBe(true);
    }
    for (const stage of token.evolution) {
      expect(existsSync(`public${stage.image}`)).toBe(true);
    }
  });

  it('rejects a stage-count stat that disagrees with the stage list', () => {
    expect(() =>
      validateTokenConfig({
        ...token,
        evolution: [token.evolution[0]],
      }),
    ).toThrow(/evolution\.length is 1/);
  });

  it('accepts a one-stage configuration when the stat matches', () => {
    const single = validateTokenConfig({
      ...token,
      evolution: [token.evolution[0]],
      memeStats: [{ label: 'Evolution Stages', source: 'stageCount', value: '1' }],
    });
    expect(single.evolution).toHaveLength(1);
    expect(memeStatValue(single.memeStats[0]!, 1)).toBe('1');
  });
});
