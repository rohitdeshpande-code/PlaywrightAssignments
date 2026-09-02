const { test, expect } = require('@playwright/test');


async function removeAdOverlays(page) {
  await page.evaluate(() => {
    const selectors = [
      '#fixedban',
      '[id^="google_ads"]',
      '[id*="ad-slot"]',
      'iframe[src*="googlesyndication"]',
      'iframe[src*="doubleclick"]',
      '.ads',
      '[class*="adsbygoogle"]',
    ];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => el.remove());
    });
  });
}

async function performDrag(page, draggable, droppable) {
  await draggable.scrollIntoViewIfNeeded();

  const sourceBox = await draggable.boundingBox();
  const targetBox = await droppable.boundingBox();
  if (!sourceBox || !targetBox) {
    throw new Error('Could not resolve bounding boxes for drag/drop elements');
  }

  const sourceX = sourceBox.x + sourceBox.width / 2;
  const sourceY = sourceBox.y + sourceBox.height / 2;
  const targetX = targetBox.x + targetBox.width / 2;
  const targetY = targetBox.y + targetBox.height / 2;

  await page.mouse.move(sourceX, sourceY);
  await page.mouse.down();
  await page.mouse.move(sourceX + 5, sourceY + 5, { steps: 5 });
  await page.mouse.move(
    sourceX + (targetX - sourceX) / 2,
    sourceY + (targetY - sourceY) / 2,
    { steps: 15 }
  );
  await page.mouse.move(targetX, targetY, { steps: 15 });
  await page.waitForTimeout(250);
  await page.mouse.up();
}

test.describe('DemoQA - Droppable (Simple)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');

    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});

    await removeAdOverlays(page);
    await page.getByRole('tab', { name: 'Simple' }).click();
  });

  test('drags "Drag Me" onto "Drop Here" and verifies the drop', async ({ page }) => {
    const simplePanel = page.locator('#simpleDropContainer');
    const draggable = simplePanel.locator('#draggable');
    const droppable = simplePanel.locator('#droppable');

    await expect(draggable).toBeVisible();
    await expect(droppable).toBeVisible();
    await expect(droppable).toHaveText('Drop Here');
    await expect(droppable).not.toHaveClass(/ui-state-highlight/);

    const maxAttempts = 3;
    let dropped = false;
    for (let attempt = 1; attempt <= maxAttempts && !dropped; attempt++) {
      await removeAdOverlays(page);
      await performDrag(page, draggable, droppable);
      dropped = (await droppable.textContent())?.trim() === 'Dropped!';
      if (!dropped && attempt < maxAttempts) {
        await page.waitForTimeout(500);
      }
    }

    await expect(droppable).toHaveText('Dropped!');
    await expect(droppable).toHaveClass(/ui-state-highlight/);
    await expect(droppable).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });
});