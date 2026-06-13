import { expect, test, type Page } from '@playwright/test';

const pages = [
  '/',
  '/platform.html',
  '/programs.html',
  '/participant-program.html',
  '/partner-network.html',
  '/research-services.html',
  '/lab-insights.html',
  '/projects.html',
  '/proto-lab.html',
  '/insights.html',
  '/about.html',
  '/contact.html',
];

async function gotoPage(page: Page, path = '/'): Promise<void> {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
}

test.describe('Accessibility smoke checks', () => {
  for (const path of pages) {
    test(`${path} has one h1 and sequential headings`, async ({ page }) => {
      await gotoPage(page, path);

      const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) =>
        els.map((el) => Number(el.tagName.slice(1)))
      );

      expect(headings.filter((level) => level === 1)).toHaveLength(1);

      for (let i = 1; i < headings.length; i += 1) {
        expect(headings[i] - headings[i - 1]).toBeLessThanOrEqual(1);
      }
    });
  }

  test('header navigation points to existing pages and marks current page', async ({ page }) => {
    await gotoPage(page, '/platform.html');

    const navHrefs = await page.locator('#site-nav a').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')).filter(Boolean)
    );

    expect(navHrefs).toEqual([
      'platform.html',
      'programs.html',
      'research-services.html',
      'lab-insights.html',
      'about.html',
      'contact.html',
    ]);

    await expect(page.locator('#site-nav a[aria-current="page"]')).toHaveText('Platform');
  });

  test('keyboard users can skip to main content', async ({ page }) => {
    await gotoPage(page);

    const skipLink = page.locator('.skip-link');
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('mobile menu supports keyboard open, loop, and escape close', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoPage(page);

    const menuButton = page.locator('#menu-toggle');
    const menu = page.locator('#site-nav');

    for (let i = 0; i < 25; i += 1) {
      await page.keyboard.press('Tab');
      if (await menuButton.evaluate((el) => el === document.activeElement)) break;
    }
    await expect(menuButton).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toHaveAttribute('aria-hidden', 'false');
    await expect(page.locator('#site-nav a').first()).toBeFocused();

    const linkCount = await page.locator('#site-nav a').count();
    for (let i = 0; i < linkCount; i += 1) {
      await page.keyboard.press('Tab');
    }
    await expect(page.locator('#site-nav a').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toHaveAttribute('aria-hidden', 'true');
    await expect(menuButton).toBeFocused();
  });

  test('invalid contact form submission focuses first invalid input and shows messages', async ({ page }) => {
    await gotoPage(page, '/contact.html');

    await page.locator('button.btn-submit').click();

    const firstName = page.locator('#fname');
    await expect(firstName).toBeFocused();
    await expect(firstName).toHaveAttribute('aria-invalid', '');
    await expect(page.locator('#fname-err')).toBeVisible();
    await expect(page.locator('#form-status')).toContainText('Please fix the highlighted fields');
  });
});
