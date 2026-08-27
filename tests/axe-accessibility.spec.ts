import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Automated accessibility scan', () => {
  test('production homepage has no axe violations', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, results.violations.map((v) => v.id).join(', ')).toEqual([]);
  });
});
