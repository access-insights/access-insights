import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = ['/', '/platform.html', '/programs.html', '/lab-insights.html', '/contact.html'];

test.describe('Automated accessibility scans', () => {
  for (const path of pages) {
    test(`${path} has no axe violations`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, results.violations.map((v) => v.id).join(', ')).toEqual([]);
    });
  }
});
