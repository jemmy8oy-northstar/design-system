import { test, expect } from '@playwright/test';

// Every theme/mode pairing renders the full component set. Each case captures a
// full-page screenshot for visual review and asserts the system actually
// mounted (guards against a blank page / token or import regression).
const THEMES = ['casual', 'professional'] as const;
const MODES = ['light', 'dark'] as const;

for (const theme of THEMES) {
  for (const mode of MODES) {
    test(`showcase renders — ${theme} / ${mode}`, async ({ page }) => {
      await page.goto(`/?theme=${theme}&mode=${mode}`);

      // The root reflects the selected theme/mode.
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.locator('html')).toHaveAttribute('data-mode', mode);

      // The system mounted and key primitives are present.
      await expect(page.getByTestId('showcase')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
      await expect(page.getByText('Daily streak')).toBeVisible();

      await page.screenshot({
        path: `e2e/screenshots/showcase-${theme}-${mode}.png`,
        fullPage: true,
      });
    });
  }
}

test('disabled button is not clickable', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Disabled' })).toBeDisabled();
});

test('invalid input exposes aria-invalid', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('input[aria-invalid="true"]')).toHaveValue('not-an-email');
});
