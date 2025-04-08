// @ts-check
const { test, expect } = require('@playwright/test');

test('Random principle loads on homepage', async ({ page }) => {
  // Go to homepage
  await page.goto('http://localhost:1313/');
  
  // Wait for the principle to load
  await page.waitForSelector('#todays-principle .principle-content', { timeout: 5000 });
  
  // Check that a principle is displayed
  const principle = await page.textContent('#todays-principle .principle-content');
  expect(principle).not.toBeNull();
  expect(principle.length).toBeGreaterThan(10);
  
  // Check that the category badge is present
  const badge = await page.isVisible('#todays-principle .badge');
  expect(badge).toBeTruthy();
});

test('Refresh button loads a new principle', async ({ page }) => {
  // Go to homepage
  await page.goto('http://localhost:1313/');
  
  // Wait for the principle to load
  await page.waitForSelector('#todays-principle .principle-content', { timeout: 5000 });
  
  // Get the initial principle text
  const initialPrinciple = await page.textContent('#todays-principle .principle-content');
  
  // Clear localStorage to ensure we get a new principle when refreshing
  await page.evaluate(() => {
    localStorage.removeItem('todaysPrinciple');
    localStorage.removeItem('todaysPrincipleDate');
  });
  
  // Click the refresh button
  await page.click('#refresh-principle');
  
  // Wait for the animation to finish and new content to load
  await page.waitForTimeout(1000);
  
  // Get the new principle text
  const newPrinciple = await page.textContent('#todays-principle .principle-content');
  
  // We can't guarantee the principle will be different (it could randomly select the same one)
  // but we can verify that the structure is still intact
  expect(newPrinciple).not.toBeNull();
  expect(newPrinciple.length).toBeGreaterThan(10);
});
