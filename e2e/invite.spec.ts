import { expect, test, type Page } from '@playwright/test';

// Matches the token in `src/lib/invite/fixture.ts`. There is no invite API
// yet, so this is the one token the mocked lookup resolves.
const VALID_TOKEN = '7Jm9kP3';

/** Tabs forward until the element with this `data-testid` has focus. */
async function tabUntilFocused(page: Page, testId: string, maxPresses = 20): Promise<void> {
  for (let i = 0; i < maxPresses; i += 1) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(
      (id) => document.activeElement?.getAttribute('data-testid') === id,
      testId,
    );
    if (focused) return;
  }
  throw new Error(`Could not reach [data-testid="${testId}"] by pressing Tab ${maxPresses} times`);
}

test.describe('guest invite', () => {
  test('renders the invite with the plan, the date/time and who else is coming', async ({
    page,
  }) => {
    await page.goto(`/invite/${VALID_TOKEN}`);

    await expect(page.getByRole('heading', { level: 1, name: 'Dinner' })).toBeVisible();
    await expect(page.getByText('Denis invited you to a plan')).toBeVisible();
    // The plan starts at 16:00 UTC / 19:00 Africa/Nairobi on 2026-10-10, a Saturday —
    // this is the text toZonedParts-based formatting must produce for that instant.
    await expect(page.getByTestId('plan-when')).toHaveText('Saturday 10 October, 7 PM');
    await expect(page.getByTestId('plan-where')).toHaveText(
      'Westlands, Nairobi · with Sarah, James and Denis',
    );
    await expect(page.getByRole('heading', { level: 2, name: 'Are you in?' })).toBeVisible();
  });

  test('the RSVP choices are reachable and operable by keyboard', async ({ page }) => {
    await page.goto(`/invite/${VALID_TOKEN}`);

    await tabUntilFocused(page, 'rsvp-in');
    await expect(page.getByTestId('rsvp-in')).toBeFocused();
    await expect(page.getByTestId('rsvp-in')).toHaveAttribute('aria-pressed', 'false');

    // Enter activates the focused button, same as a native control.
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('rsvp-in')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('rsvp-confirmation')).toContainText("You're in");

    // Moving on and activating a different choice with Space flips the selection.
    await tabUntilFocused(page, 'rsvp-maybe', 5);
    await page.keyboard.press('Space');
    await expect(page.getByTestId('rsvp-maybe')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('rsvp-in')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByTestId('rsvp-confirmation')).toContainText('might make it');
  });

  test('declining is also a real, clickable response', async ({ page }) => {
    await page.goto(`/invite/${VALID_TOKEN}`);

    await page.getByTestId('rsvp-out').click();
    await expect(page.getByTestId('rsvp-out')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('rsvp-confirmation')).toContainText("can't make it");
  });

  test('an unrecognised or expired token shows a graceful message, not a crash', async ({
    page,
  }) => {
    const response = await page.goto('/invite/not-a-real-token');

    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole('heading', { name: "This invite link isn't available" }),
    ).toBeVisible();
  });
});
