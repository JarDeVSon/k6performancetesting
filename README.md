# Introdução aos testes de performance com k6

# User API

## 🔖 Requisitos funcionais

### Cadastro

- [X] Deve retornar os id ao cadastrar um novo usuário
- [X] Deve retornar 201 ao cadastrar um novo usuário
- [X] Deve retornar 400 ao tentar cadastrar sem email e senha
- [X] Deve retornar 400 se o email for duplicado

| campos   | descrição                             | tipo     | obrigatório |
| :-----   | :------------------------------------ | :------- | :---------- |
| email    | usuário identificador único           | email    | sim         |
| password | senha do usuário                      | texto    | sim         |

## 🔖 Requisitos não funcionais

### Cadastro

- [ ] O cadastro com sucesso deve ocorrer em até 2 segundos
- [ ] Cadastros sem sucesso devem ocorrer em até 2 segundos
- [ ] Deve poder cadastrar até 100 usuários simultâneos
- [ ] A margem de erro no cadastro deve ser de pelo menos 1%

## 🚀 Tecnologias

- [Node.js] - plataforma de desenvolvimento
- [Express] - framework onde a API foi construída
- [MongoDB] - Banco de dados (Não relacional)
- [k6] - ferramenta para teste de carga, performance, stress etc...

## 👨🏻‍💻 Como executar o projeto

- [Node.js](https://nodejs.org/) v16 ou superior para executar.
- [K6](https://k6.io/docs/get-started/installation/) instalar de acordo com seu sistema operacional.

Para liberar o gerenciador de pacotes Yarn:
```sh
corepack enable
```

Execute os comandos abaixo para instalar das dependências do projeto:

```sh
cd api
yarn install
yarn dev
```

## Running the tests

In this project, you can run tests via CLI using `k6` and the flag `k6 run` with the suite of the specific test:

```sh
k6 run smoke-test.js
k6 run load-test.js
k6 run soak-test.js
k6 run spike-test.js
k6 run stress-test.js
k6 run breakpoint-test.js
```
___

Made with ❤️ by [Jardeson Santos](https://github.com/JarDeVSon). [Meu Linkedin](https://www.linkedin.com/in/jardeson-santosqa).
___
