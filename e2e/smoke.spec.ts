import { expect, test } from '@playwright/test';

test('the home page renders and reports the API target', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Tandem' })).toBeVisible();
  await expect(page.getByTestId('api-base-url')).toContainText('/api/v1');
});

// "/" is statically prerendered (`next build` reports `○ (Static)`), so the Nairobi value
// is computed once at build time and frozen into the HTML, not recomputed per request. This
// test cannot claim per-request SSR — it proves the shared package is actually bundled and
// its code runs inside a Server Component during the build, not that it runs on every render.
test('the shared package is bundled and executed during the server render', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('nairobi-time')).toHaveText(/^\d{2}:\d{2}$/);
});
