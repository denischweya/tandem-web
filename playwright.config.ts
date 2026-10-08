import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // A committed `test.only` would otherwise run just that one test and exit 0 in CI,
  // silently skipping the rest of the suite.
  forbidOnly: !!process.env.CI,
  // Port 3100, not 3000, and deliberately no `reuseExistingServer`. With reuse enabled and a
  // `next dev` already on :3000, this suite goes green in ~1.4s without `npm run build` ever
  // running — and nothing in the output hints at it. The smoke test exists to guard the
  // PRODUCTION build, so it must always build. A dedicated port lets a dev server coexist
  // instead of forcing you to kill it.
  use: { baseURL: 'http://localhost:3100' },
  webServer: {
    command: 'npm run build && PORT=3100 npm run start',
    url: 'http://localhost:3100',
    timeout: 120_000,
  },
});
