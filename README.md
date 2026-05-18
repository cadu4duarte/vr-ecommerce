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

- [x] **Navegação e Detalhes (PDP):** Página de detalhes individual para cada produto utilizando rotas dinâmicas (`/product/:id`).
- [x] **Listagem de produtos:** Consumo em tempo real da API externa DummyJSON com tratamento de estados.
- [x] **Persistência de Dados:** Carrinho de compras gerenciado via Context API e persistido no LocalStorage.
- [x] **Agrupamento Inteligente:** Itens repetidos são concatenados no modal, exibindo a quantidade (Ex: 2x) e o cálculo de subtotal.
- [x] **Feedback de UX:** Notificações tipo Toast animadas no canto da tela para confirmação de adição ao carrinho.
- [x] **Design baseado no prototipo informado:** Interface fiel ao protótipo do Figma, com foco em responsividade
- [x] **Arquitetura e Organização:** Estrutura de Monorepo com camada `shared` para centralização de Assets e Types (TypeScript).

## Decisões Técnicas
- Módulo Compartilhado (Shared Layer): Implementei uma pasta shared na raiz para centralizar tipos e assets. Isso garante um "contrato de interface" único, evitando bugs de dessincronização entre as aplicações independentes.
- Navegação Dinâmica (Singleton Router): O react-router-dom foi configurado como Singleton via Module Federation. Isso permite que o Shell controle as rotas globais enquanto os remotos navegam internamente sem recarregar o navegador.
- Agrupamento de Itens: No desenvolvimento do carrinho, optei por uma lógica de normalização de dados para agrupar itens idênticos, melhorando a escaneabilidade do modal e a UX.

### 🏗 Arquitetura
```mermaid
graph TD
    Shell[Shell Host - Porta 3000] --> Header[Header Remote - Porta 3001]
    Shell --> Cards[Cards/PDP Remote - Porta 3002]
    Shell --> Footer[Footer Remote - Porta 3003]
    Header -.-> Shared[Shared Layer - Assets/Types]
    Cards -.-> Shared
