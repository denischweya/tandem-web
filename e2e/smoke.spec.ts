import { expect, test } from '@playwright/test';

test('the home page renders and reports the API target', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Tandem' })).toBeVisible();
  await expect(page.getByTestId('api-base-url')).toContainText('/api/v1');
});

test('the shared timezone helper runs server-side', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('nairobi-time')).toHaveText(/^\d{2}:\d{2}$/);
});
