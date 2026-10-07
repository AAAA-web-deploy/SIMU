import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { memeStatValue, validateTokenConfig } from './validateToken.ts';
import { token } from './token.ts';

const simuFiles = [
  'home.png',
  'home-banner.png',
  'home-logo.png',
  'home-compare.png',
  'story.png',
  'token-background.png',
  'club.png',
  'portrait.png',
  'banner.png',
  'favicon.png',
];

const files = [
  'sichonk-evolution-01-cat.png',
  'sichonk-evolution-02-chonk.png',
  'sichonk-evolution-03-tech-chonk.png',
  'sichonk-evolution-04-ai-chonk.png',
  'sichonk-evolution-05-si-chonk.png',
  'sichonk-logo-transparent.png',
  'sichonk-favicon.png',
  'sichonk-social-preview.png',
  'sichonk-banner-3x1.png',
  'sichonk-banner-1100x520.png',
];

describe('token config', () => {
  it('publishes SI Musashi with pending launch links and a derived stage-count stat', () => {
    expect(token.name).toBe('SI Musashi');
    expect(token.ticker).toBe('SIMU');
    expect(token.contractAddress).toBeNull();
    expect(token.buyUrl).toBeNull();
    expect(token.chartUrl).toBe('https://dexscreener.com/ethereum/');
    expect(token.dextoolsUrl).toBe('https://www.dextools.io/app/ether/pair-explorer/');
    expect(token.etherscanUrl).toBe('https://etherscan.io/token/');
    expect(token.xUrl).toBe('https://x.com/');
    expect(token.telegramUrl).toBe('https://t.me/');
    expect(token.markets.map((market) => market.url)).toEqual([
      token.chartUrl,
      token.dextoolsUrl,
      token.etherscanUrl,
    ]);
    expect(token.siteUrl).toBe('https://aaaa-web-deploy.github.io/SIMU');
    expect(token.buyTax.value).toBe('0%');
    expect(token.sellTax.value).toBe('0%');
    expect(token.lpBurn.status).toBe('pending');
    expect(token.ownership.status).toBe('pending');
    expect(token.lpBurn.url).toBeNull();
    expect(token.ownership.url).toBeNull();
    expect(token.evolution).toHaveLength(6);
    expect(token.memeStats[0]?.deriveFrom).toBe('evolution.length');
    expect(memeStatValue(token.memeStats[0]!, token.evolution.length)).toBe('6');
    expect(token.chainName).toBe('Ethereum');
    expect(token.nativeSymbol).toBe('ETH');
  });

  it('has the supplied image files on disk', () => {
    for (const file of files) {
      expect(existsSync(`public/assets/token/${file}`), file).toBe(true);
    }
    for (const file of simuFiles) {
      expect(existsSync(`public/assets/simu/${file}`), file).toBe(true);
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
      memeStats: [{ label: 'Evolution Stages', deriveFrom: 'evolution.length', value: '1' }],
    });
    expect(single.evolution).toHaveLength(1);
    expect(memeStatValue(single.memeStats[0]!, 1)).toBe('1');
  });
});
