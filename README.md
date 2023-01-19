<h1 align="center">
    Watch Store
</h1>

<p align="center">
  <a href="#ℹ-descrição">Descrição</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-pré-requisitos">Pré-requisitos</a> •
  <a href="#-como-usar">Como usar</a>
</p>

## ℹ Descrição

Projeto desenvolvido ao longo do Módulo 3 do curso Testando Aplicações JavaScript do Vedovelli. 🚀

Watch Store é um e-commerce completo de relógios, em que a aplicação foi testada de ponta-a-ponta com TDD, contendo testes unitários de componentes, condicionais e hooks, e testes de integração simulando um _stub_ de dados e analisando como a página se comporta em diferentes cenários. Algumas de suas funcionalidades:

- Pesquisar por um produto na página
- Adicionar um produto ao carrinho
- Aumentar ou diminuir a quantidade destes produtos no carrinho
- Remover um produto do carrinho
- Remover todos os produtos do carrinho 
  
Diferentes partes do projeto foram testadas isoladamente, como os hooks e componentes mais simples, e em conjuntos, como a homepage. Alguns exemplos:
- stores
  - cart
    - deve ser possível / não deve ser possível...
- hooks
  - useFetchProducts
    - deve retornar uma lista de produtos
    - deve retornar um erro caso...
- components
  - ...
- pages
  - home
    - deve renderizar...

## ⚒ Tecnologias

#### Interface e renderização
  - [**React**](https://pt-br.reactjs.org)
  - [**Typescript**](https://www.typescriptlang.org)
  - [**Next.js**](https://nextjs.org/)
  - [**TailwindCSS**](https://tailwindcss.com/)
  - [**Axios**](https://axios-http.com/)
#### Testes unitários
  - [**Jest**](https://jestjs.io/pt-BR/)
  - [**Testing Library**](https://testing-library.com/)
    - [**Testing Library / react**](https://testing-library.com/docs/react-testing-library/intro/)
    - [**Testing Library / react-hooks**](https://react-hooks-testing-library.com/)
    - [**Testing Library / user-event**](https://testing-library.com/docs/user-event/intro)
#### Testes integrados
  - [**Miragejs**](https://miragejs.com/)
  - [**Fakerjs**](https://fakerjs.dev/)
#### Gerenciamento de estados
  - [**Zustand**](https://github.com/pmndrs/zustand)
  - [**Immer**](https://immerjs.github.io/immer/)

## ⚙ Pré-requisitos

- <a href="https://git-scm.com/" target="_blank">Git</a>
- <a href="https://yarnpkg.com/" target="_blank">Yarn</a>
- Editor de código.

## 📖 Como usar

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/EduardoReisUX/watch-store.git && cd watch-store
```

**Siga os passos seguintes**

```bash
# Instale as dependências
$ yarn

# Rode os testes unitários
$ yarn test:unit

# Rode os testes de integração
$ yarn test:integration

# Veja a cobertura de testes
$ yarn test:coverage

# Rode a aplicação
$ yarn dev
```

---

<p align="center">Feito com 💜 por <a href="https://github.com/EduardoReisUX">Eduardo dos Reis</a></p>
