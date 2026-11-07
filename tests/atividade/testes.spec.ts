import { test, expect } from "@playwright/test";
import {Credenciais} from 'C:/playwright/pages/cadastro.page'
let  credenciais:Credenciais;

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.qapractice.com/register");
      credenciais = new Credenciais(page)
});

test.describe("Verificando a pagina de cadastro", () => {

    test("Registro com dados validos", async ({ page }) => {
    credenciais.registrar('emailteste1@gmail.com', 'Senha@123', 'Senha@123')
        await expect(page.getByText('Registration successful')).toBeVisible();
    });

    test("Email inválido e formulário vazio", async ({ page }) => {
         credenciais.registrar('emailteste1@gmail.com', 'Senha@123', 'Senha@123')

    });

    test('Registro com senhas diferentes nos campos de senha', async ({ page }) => {

        credenciais.registrar('emailteste1@gmail.com', 'Senha@123', 'Senha@1234')


        await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test("Voltar para o login", async ({ page }) => {
        await page.getByRole('button', { name: 'Back To Login Page' }).click();

        await expect(page).toHaveURL("https://www.qapractice.com/practice-login-form");
    });

});