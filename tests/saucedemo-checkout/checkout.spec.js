import { test, expect } from '@playwright/test';

const username = 'standard_user';
const password = 'secret_sauce';

async function login(page) {
  await page.goto('https://www.saucedemo.com');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
}

async function addBackpackAndOpenCart(page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
}

test.describe('SauceDemo checkout workflow', () => {
  test('completes checkout with happy path data', async ({ page }) => {
    await login(page);
    await addBackpackAndOpenCart(page);

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="lastName"]').fill('User');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('.summary_total_label')).toContainText('Total: $32.39');

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('shows required-field validation errors when checkout form is empty', async ({ page }) => {
    await login(page);
    await addBackpackAndOpenCart(page);

    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('allows cancel from checkout and return to products', async ({ page }) => {
    await login(page);
    await addBackpackAndOpenCart(page);

    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/cart\.html/);

    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
