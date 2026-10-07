import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';
import { validateTokenConfig } from './src/config/validateToken.ts';
import { renderTokenHead } from './src/lib/tokenMeta.ts';

const root = dirname(fileURLToPath(import.meta.url));
const pagesBase = process.env.VITE_BASE ?? '/';

function tokenMetaPlugin(base: string): Plugin {
  return {
    name: 'hsichonk-token-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes('<!--token-meta-->')) {
          throw new Error('index.html is missing the <!--token-meta--> marker');
        }
        const raw: unknown = JSON.parse(readFileSync(join(root, 'src/config/token.json'), 'utf8'));
        const token = validateTokenConfig(raw);
        const paths = [
          ...new Set([
            token.logo,
            token.favicon,
            token.socialPreview,
            token.assets.home,
            token.assets.story,
            token.assets.tokenBackground,
            token.assets.club,
            token.assets.portrait,
            token.assets.banner,
            ...token.evolution.map((stage) => stage.image),
          ]),
        ];
        for (const assetPath of paths) {
          const relative = assetPath.replace(/^\/+/, '');
          if (!existsSync(join(root, 'public', relative))) {
            throw new Error(`Missing token asset: ${assetPath}`);
          }
        }
        return html.replace('<!--token-meta-->', renderTokenHead(token, base));
      },
    },
  };
}

export default defineConfig({
  base: pagesBase,
  plugins: [react(), tokenMetaPlugin(pagesBase)],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
