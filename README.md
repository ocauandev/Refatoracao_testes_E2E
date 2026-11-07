# Testes E2E com Playwright - QA Practice

Projeto de testes automatizados end-to-end para a página de cadastro do site
[QA Practice](https://www.qapractice.com/register), utilizando Playwright com
TypeScript.

## Objetivo

Validar os principais comportamentos do formulário de cadastro:

- Cadastro com dados válidos;
- Validação dos requisitos da senha;
- Bloqueio de senhas fracas;
- Validação de senhas diferentes;
- Comportamento para dados inválidos;
- Navegação de volta para a página de login;
- Atributos básicos dos campos do formulário.

## Estrutura do projeto

```text
.
├── helpers/              # Constantes e funções auxiliares
├── pages/                # Page Objects reutilizáveis
│   └── cadastro.page.ts
├── tests/
│   └── atividade/
│       ├── senha.spec.ts
│       └── testes.spec.ts
├── playwright.config.ts  # Configuração do Playwright
├── package.json
└── yarn.lock
```

## Principais mudanças

O código anterior preenchia cada campo diretamente dentro dos testes, repetindo
a mesma sequência de ações:

1. Preencher o e-mail;
2. Preencher a senha;
3. Preencher a confirmação da senha;
4. Clicar no botão de registro.

Na versão atual, essa responsabilidade foi centralizada no Page Object
[`pages/cadastro.page.ts`](pages/cadastro.page.ts). A classe `Credenciais`
disponibiliza o método:

```ts
registrar(email, password, confirm_password)
```

Com isso, os testes ficaram mais curtos, legíveis e fáceis de manter. Alterações
nos seletores ou no fluxo de cadastro podem ser feitas em um único local.

Também foram mantidos e organizados os cenários de validação da senha, incluindo
comprimento mínimo, letra maiúscula, letra minúscula, número e caractere
especial. Os cenários de cadastro válido, senha divergente e retorno para o
login continuam cobertos em um arquivo separado.

## Como executar

Instale as dependências:

```bash
yarn install
```

Execute todos os testes:

```bash
npx playwright test
```

Execute apenas os testes da atividade:

```bash
npx playwright test tests/atividade
```

Abra o relatório HTML:

```bash
npx playwright show-report
```

Os testes utilizam o projeto Chromium configurado em
[`playwright.config.ts`](playwright.config.ts) e acessam a aplicação real do QA
Practice.

## Repositório do código anterior

O código anterior utilizado como referência está disponível em:

<https://github.com/ocauandev/Atividade-de-Teste-QaPratique>
