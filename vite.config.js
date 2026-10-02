import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
      }
    }
  }
});
