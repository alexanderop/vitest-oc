import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      name: 'unit',
      include: ['**/*.spec.ts', '**/*.spec.tsx'],
      exclude: ['**/*.browser.spec.ts', '**/*.browser.spec.tsx'],
      environment: 'jsdom',
    },
  },
  {
    extends: './vitest.config.ts',
    test: {
      name: 'browser',
      include: ['**/*.browser.spec.ts', '**/*.browser.spec.tsx'],
      browser: {
        enabled: true,
        provider: 'playwright',
        headless: true,
        instances: [{ browser: 'chromium' }],
      },
    },
  },
])
