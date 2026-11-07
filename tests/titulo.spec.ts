import {test, expect} from "@playwright/test";

test('página carrega com título correto', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveTitle(/Swag Labs/);
});

test('formulário de login está visível', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
});