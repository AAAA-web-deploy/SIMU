import { describe, expect, it } from 'vitest';
import { resolveAssetUrl } from './assetUrl.ts';

describe('resolveAssetUrl', () => {
  it('strips a leading slash and joins the Vite base once', () => {
    expect(resolveAssetUrl('/assets/token/hsichonk-evolution-01-cat.png', '/')).toBe(
      '/assets/token/hsichonk-evolution-01-cat.png',
    );
    expect(resolveAssetUrl('/assets/token/hsichonk-evolution-01-cat.png', '/hsichonk/')).toBe(
      '/hsichonk/assets/token/hsichonk-evolution-01-cat.png',
    );
  });

  it('does not prepend the base twice', () => {
    expect(resolveAssetUrl('/hsichonk/assets/token/hsichonk-favicon.png', '/hsichonk')).toBe(
      '/hsichonk/assets/token/hsichonk-favicon.png',
    );
  });
});
