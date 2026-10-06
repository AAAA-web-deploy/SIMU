import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const pagesBase = process.env.VITE_BASE ?? '/';

export default defineConfig({
  base: pagesBase,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
