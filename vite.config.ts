/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  root: 'projects/mont-validators',
  plugins: [angular()],
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/mont-validators',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 70,
        lines: 70,
      },
      exclude: [
        'src/**/*.spec.ts',
        'src/test-setup.ts',
        'src/test-utils.ts',
        'src/**/index.ts',
        'src/public-api.ts',
      ],
    },
  },
});
