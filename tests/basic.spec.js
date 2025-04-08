const { test, expect } = require('@playwright/test');

test('homepage loads and displays categories', async ({ page }) => {
  await page.goto('http://localhost:1313/');
  
  // Check that categories are displayed
  // await page.waitForTimeout(2000); // waits for 2 seconds
  await expect(page.locator('text=Simplicity')).toBeVisible({ timeout: 1000 });
  await expect(page.locator('text=Patience')).toBeVisible({ timeout: 1000 });
  await expect(page.locator('text=Compassion')).toBeVisible({ timeout: 1000 });
});

test('principle page loads with animations', async ({ page }) => {
  await page.goto('http://localhost:1313/principles/simplicity/true-north/');
  
  // Check principle content
  await expect(page.locator('h1:has-text("True North")')).toBeVisible({ timeout: 1000 });
  
  // Check animations are applied (by checking for animate__animated class)
  await expect(page.locator('.animate__animated')).toBeVisible({ timeout: 1000 });
});
