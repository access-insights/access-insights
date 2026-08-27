import { expect, test, type Page } from '@playwright/test';

async function gotoIndex(page: Page): Promise<void> {
  // Keep smoke tests focused on DOM/accessibility semantics and avoid waiting on the external font.
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
}

test.describe('Accessibility smoke checks', () => {
  test('document title is concise and does not duplicate the hero heading', async ({ page }) => {
    await gotoIndex(page);

    const heroText = (await page.locator('#top h1').innerText()).trim();
    await expect(page).toHaveTitle('Access Insights');
    expect(heroText).toBe("Accessibility isn’t a feature. It’s the future.");
    expect((await page.title()).toLocaleLowerCase()).not.toContain(heroText.toLocaleLowerCase());
  });

  test('hero content is visually above the full-screen background', async ({ page }) => {
    await gotoIndex(page);

    const heading = page.locator('#top h1');
    await expect(heading).toBeVisible();
    const headingIsTopmost = await heading.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const topmost = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return topmost === element || element.contains(topmost);
    });
    expect(headingIsTopmost, 'The hero heading is covered by another full-screen layer').toBe(true);
  });

  test('heading hierarchy is valid and sequential', async ({ page }) => {
    await gotoIndex(page);

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) =>
      els.map((el) => Number(el.tagName.slice(1)))
    );

    const h1Count = headings.filter((level) => level === 1).length;
    expect(h1Count).toBeGreaterThan(0);

    for (let i = 1; i < headings.length; i += 1) {
      expect(headings[i] - headings[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  test('header navigation links point to real section anchors', async ({ page }) => {
    await gotoIndex(page);

    const navHrefs = await page.locator('#navlinks a[href^="#"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')).filter(Boolean)
    );

    for (const href of navHrefs) {
      const id = href.slice(1);
      const target = page.locator(`[id="${id}"]`);
      await expect(target, `Missing anchor target for ${href}`).toHaveCount(1);
    }
  });

  test('keyboard users can skip to main content', async ({ page }) => {
    await gotoIndex(page);

    const skipLink = page.locator('.skip');
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('mobile menu supports keyboard open, loop, and escape close', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoIndex(page);

    const hamburger = page.locator('#hamb');
    const menu = page.locator('#navlinks');

    for (let i = 0; i < 25; i += 1) {
      await page.keyboard.press('Tab');
      if (await hamburger.evaluate((el) => el === document.activeElement)) break;
    }
    await expect(hamburger).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toHaveClass(/open/);
    await expect(page.locator('#navlinks a').first()).toBeFocused();

    const lastLink = page.locator('#navlinks a').last();
    await page.keyboard.press('Shift+Tab');
    await expect(hamburger).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(lastLink).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(hamburger).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#navlinks a').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).not.toHaveClass(/open/);
    await expect(hamburger).toBeFocused();
  });

  test('mobile menu stays open after pointer activation on a scrolled page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoIndex(page);

    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    const hamburger = page.locator('#hamb');
    const menu = page.locator('#navlinks');
    await hamburger.click();

    // Catch the former focus/scroll race, which closed the menu just after it opened.
    await page.waitForTimeout(150);
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    await expect(hamburger).toBeFocused();
    await expect(menu).toBeVisible();

    await page.locator('#navlinks a[href="#team"]').click();
    await expect(page).toHaveURL(/#team$/);
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).not.toBeVisible();
  });

  test('all local image references resolve successfully', async ({ page }) => {
    await gotoIndex(page);

    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i += 1) {
      const image = images.nth(i);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    }
  });
});
