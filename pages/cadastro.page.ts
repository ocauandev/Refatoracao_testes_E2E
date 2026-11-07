import {Page} from '@playwright/test'
export class Credenciais {
  readonly page: Page;
  
  constructor(page: Page) {
      this.page = page;
    };

    async registrar(email: string, password: string, confirm_password: string) {
         await this.page.fill('#register-email', email );
         await this.page.fill('#register-password', password);
         await this.page.fill('#register-confirm-password', confirm_password);
         await this.page.getByRole('button', {name: 'Register'}).click(); 
    }
};