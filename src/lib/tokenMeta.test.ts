import { describe, expect, it } from 'vitest';
import { token } from '../config/token.ts';
import { escapeHtml, publicAssetUrl, renderTokenHead } from './tokenMeta.ts';

describe('token metadata', () => {
  it('escapes text and omits absolute social URLs while siteUrl is null', () => {
    const html = renderTokenHead(
      { ...token, pageTitle: 'Chonk <script>alert(1)</script>', siteUrl: null },
      '/hsichonk/',
    );
    expect(html).toContain('<title>Chonk &lt;script&gt;alert(1)&lt;/script&gt;</title>');
    expect(html).not.toContain('<script>alert');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('og:image');
    expect(html).not.toContain('og:url');
    expect(html).toContain(`href="/hsichonk${token.favicon}"`);
    expect(html).toContain(`content="${token.theme.background}"`);
    expect(html).toContain('/hsichonk/assets/token/sichonk-evolution-01-cat.png');
    expect(html).toContain('Set siteUrl');
  });

  it('emits absolute social URLs from siteUrl without repeating the Vite base', () => {
    const html = renderTokenHead({ ...token, siteUrl: 'https://example.com/hsichonk' }, '/');
    expect(html).toContain('rel="canonical" href="https://example.com/hsichonk"');
    expect(html).toContain(
      `property="og:image" content="https://example.com/hsichonk${token.socialPreview}"`,
    );
    expect(html).toContain('twitter:image');
    expect(publicAssetUrl('https://example.com/hsichonk/', token.socialPreview)).toBe(
      `https://example.com/hsichonk${token.socialPreview}`,
    );
  });

  it('escapes ampersands', () => {
    expect(escapeHtml('A & B')).toBe('A &amp; B');
  });
});
