import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()] as any,
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.NODE_ENV': '"test"',
  },
});
