import {test} from '@playwright/test';
import {Credenciais} from '../pages/hooks.page'

test.beforeAll(async() => {
  console.log('*********** INICIANDO OS TESTES DO CAMPO USUÁRIO*********\n');
});

test.afterAll(async() => {
  console.log('*********** FINALIZANDO OS TESTES DO CAMPO USUÁRIO*********\n');
});

test.beforeEach(async({}, testInfo) => {
  if(testInfo.title === 'Criar usuário com dados válidos') {
    console.log('CRIANDO USUÁRIO COM DADOS VÁLIDOS\n');
  } else{
    console.log('CADASTROS INVÁLIDOS NÃO SÃO SALVOS')
  };
});

test.afterEach(async({}, testInfo) => {
  if(testInfo.title === 'Criar usuário com dados válidos' ) {
    console.log('EXCLUINDO CADASTRO!')
  }
});

test.describe('Fluxo de cadastro de usuário', () => {
  test.describe.configure({mode: 'serial'});

test ('Criar usuário com dados válidos', async() => {
  const usuarioValido = new Credenciais('Rosa Maria', 'rosamaria@example.com', 'Senhateste123')
  console.log(`Nome: ${usuarioValido.name}, E-mail: ${usuarioValido.email}, Senha: ${usuarioValido.password}\n`);
});

test ('Cadastro com campo name vázio', async() => {
  const nameVazio =new Credenciais('', 'rosamaria@example.com', 'Senhateste123')
  console.log(`Nome: ${nameVazio.name}, E-mail: ${nameVazio.email}, Senha: ${nameVazio.password}\n`);
});

test ('Cadastro com campo email vázio', async() => {
  const emailVazio = new Credenciais('Rosa Maria', '', 'Senhateste123')
  console.log(`Nome: ${emailVazio.name}, E-mail: ${emailVazio.email}, Senha: ${emailVazio.password}\n`);
});

test ('Cadastro com campo password vázio', async() => {
  const passwordVazio =new Credenciais('Rosa Maria', 'rosamaria@example.com', '')
  console.log(`Nome: ${passwordVazio.name}, E-mail: ${passwordVazio.email}, Senha: ${passwordVazio.password}\n`);
});

});