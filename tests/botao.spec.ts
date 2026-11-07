import {test, expect} from '@playwright/test'

test('Botão de Login visível para o usuário', async ({ page }) => {
    await page.goto('/');

    const button = page.getByRole('button', {name: 'Login'}); //AÇÃO

    await expect(button).toBeVisible(); //VERIFICAÇÃO
});