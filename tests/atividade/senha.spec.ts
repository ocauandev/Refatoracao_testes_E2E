import { test, expect } from '@playwright/test';

import {Credenciais} from 'C:/playwright/pages/cadastro.page'
let  credenciais:Credenciais;

test.describe('Validação do Campo de Senha - QA Practice Register', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.qapractice.com/register");
      credenciais = new Credenciais(page)
});

  test('Deve verificar atributos básicos do campo de senha', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="register-password"]');
    
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveAttribute('placeholder', 'Create a password');
  });

  test('Deve validar o comprimento mínimo de 8 caracteres', async ({ page }) => {
   
    const lengthRequirement = page.locator('text=At least 8 characters');
    // Estado inicial: o requisito exibe erro (text-danger)
    await expect(lengthRequirement).toHaveClass(/text-danger/);

    credenciais.registrar('emailteste1@gmail.com', 'Ab1!xyz', 'Ab1!xyz')
    await expect(lengthRequirement).toHaveClass(/text-danger/);

    // Completa 8 caracteres (Válido)
    credenciais.registrar('emailteste1@gmail.com', 'Ab1!wxyz', 'Ab1!wxyz')
    await expect(lengthRequirement).not.toHaveClass(/text-danger/);
  });


  test('Deve validar a exigência de letra maiúscula', async ({ page }) => {
  
    const upperRequirement = page.locator('text=At least one uppercase letter (A-Z)');

    // Senha sem letra maiúscula
    credenciais.registrar('emailteste1@gmail.com', 'abcdefg1!', 'abcdefg1!')
    await expect(upperRequirement).toHaveClass(/text-danger/);

    // Senha com letra maiúscula
    credenciais.registrar('emailteste1@gmail.com', 'Abcdefg1!', 'Abcdefg1!')
    await expect(upperRequirement).not.toHaveClass(/text-danger/);
  });

  test('Deve validar a exigência de letra minúscula', async ({ page }) => {
    const lowerRequirement = page.locator('text=At least one lowercase letter (a-z)');

    // Senha sem letra minúscula
    credenciais.registrar('emailteste1@gmail.com', 'ABCDEFG1!', 'ABCDEFG1!')
    await expect(lowerRequirement).toHaveClass(/text-danger/);

    // Senha com letra minúscula
    credenciais.registrar('emailteste1@gmail.com', 'ABCDEFG1!a', 'ABCDEFG1!a')
    await expect(lowerRequirement).not.toHaveClass(/text-danger/);
  });

  test('Deve validar a exigência de número', async ({ page }) => {
    const numberRequirement = page.locator('text=At least one number (0-9)');

    // Senha sem número
    credenciais.registrar('emailteste1@gmail.com', 'Abcdefgh!', 'Abcdefgh!')
    await expect(numberRequirement).toHaveClass(/text-danger/);

    // Senha com número
     credenciais.registrar('emailteste1@gmail.com', 'Abcdefgh1!', 'Abcdefgh1!')
   
    await expect(numberRequirement).not.toHaveClass(/text-danger/);
  });

  test('Deve validar a exigência de caractere especial', async ({ page }) => {
   
    const specialRequirement = page.locator('text=At least one special character');

    // Senha sem caractere especial
     credenciais.registrar('emailteste1@gmail.com', 'Abcdefg1', 'Abcdefg1')
    
    await expect(specialRequirement).toHaveClass(/text-danger/);

    // Senha com caractere especial
     credenciais.registrar('emailteste1@gmail.com', 'Abcdefg1!', 'Abcdefg1!')
    await expect(specialRequirement).not.toHaveClass(/text-danger/);
  });

  test('Deve impedir sucesso no registro ao utilizar senha fraca', async ({ page }) => {
    credenciais.registrar('emailteste1@gmail.com', 'fraca', 'fraca')
    // Como os requisitos de senha não foram atendidos, o fluxo de registro deve barrar o envio
    await expect(page).toHaveURL('https://www.qapractice.com/register');
  });

});