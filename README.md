# VR E-commerce - Micro Front-ends

Este projeto é uma plataforma de e-commerce desenvolvida em **React** e **TypeScript** utilizando a arquitetura de **Micro Front-ends** com **Module Federation**.

## Arquitetura do Projeto

O projeto foi estruturado como um **Monorepo**, dividido em 4 aplicações independentes e uma camada compartilhada:

- **Shell (Host):** Gerencia o estado global (Context API), LocalStorage e orquestra a montagem dos remotos.
- **Header (Remote):** Componente de cabeçalho com carrinho reativo e modal de agrupamento de itens.
- **Cards (Remote):** Vitrine de produtos consumindo a API [DummyJSON](https://dummyjson.com/).
- **Footer (Remote):** Rodapé institucional.
- **Shared:** Camada centralizada para Tipos (TypeScript) e Assets (Imagens).

## Tecnologias Utilizadas

- **React 18** & **TypeScript**
- **Webpack 5** & **Module Federation**
- **TailwindCSS** (Estilização baseada em protótipo do Figma)
- **Vitest** & **React Testing Library** (Testes unitários e de lógica)
- **Context API** (Gerenciamento de estado)

## Como rodar o projeto

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/cadu4duarte/vr-ecommerce.git
    cd vr-ecommerce
    ```

2. **Instale todas as dependências (na raiz do projeto):**
    ```bash
    npm install
    ```

3. **Inicie todas as aplicações simultaneamente:**
    ```bash
    npm start
    ```
    A aplicação principal abrirá automaticamente em: [http://localhost:3000](http://localhost:3000)

## Testes

Para executar os testes unitários e de lógica de todos os micro-frontends:
```bash
npm test
```

## Funcionalidades Implementadas

Listagem de produtos: Consumo real da API externa DummyJSON.

Persistência de Dados: Carrinho salvo no LocalStorage para manter os itens após o refresh.

Agrupamento de Itens: Produtos repetidos são somados no modal, exibindo a quantidade (ex: 2x).

Feedback Visual: Notificação (Toast) animada no canto da tela ao adicionar produtos.

Design Responsivo: Interface fiel ao protótipo do Figma, adaptável para mobile e desktop.

Arquitetura Escalável: Uso de Monorepo com pasta shared para assets e tipagens globais.
