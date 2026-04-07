<p align="center">
    <img src="d-ideias-frontend/public/logo.png" alt="D+Ideias logo" width="220" />
</p>

# D+Ideias

Aplicação web para cadastro e acompanhamento de ideias de melhoria.

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-FE0803?logo=typeorm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)

## Stack

- Frontend: Angular 21, TypeScript, Tailwind CSS, Font Awesome, Vitest
- Backend: NestJS 11, TypeScript, TypeORM, Zod
- Banco de dados: PostgreSQL
- Infraestrutura local: Docker Compose

## Arquitetura do monorepo

O projeto está organizado em monorepo com:

- backend em NestJS + TypeScript
- frontend em Angular 21 + TypeScript
- banco PostgreSQL via Docker Compose

## Funcionalidades implementadas

- CRUD completo de ideias
- listagem paginada
- ordenação por:
    - mais recentes
    - ID
    - data de criação
    - data de atualização
    - votos positivos
    - dislikes
- votação por ideia (upvote e downvote)
- alertas globais no frontend (sucesso e erro)
- modal de confirmação para exclusão

## Modelo de dados da ideia

Cada ideia possui:

- id
- authorRegister (RE)
- improvementSuggestion
- currentProcess
- howToImplement
- expectedBenefits
- upvotes
- downvotes
- createdAt
- updatedAt

## Estrutura do repositório

```text
.
├── d-ideias-backend/
├── d-ideias-frontend/
├── docker-compose.yaml
└── Makefile
```

## Como executar

### 1. Configurar dependências e arquivos locais

```bash
make configure
```

### 2. Subir ambiente completo (db + api + frontend)

```bash
make run
```

Endpoints padrão:

- Frontend: http://localhost:4200
- API: http://localhost:3000

## Comandos úteis

```bash
make format
make test-backend
make test-frontend
make migration-generate NAME=NomeDaMigration
```

## Migrations

Migrations principais já existentes:

- criação da tabela de ideias
- seed inicial com dados
- inclusão de colunas `upvotes` e `downvotes` com restrição de não-negativo

## API (resumo)

- `GET    /swagger` (documentação interativa)
- `GET    /ideas?page=1&pageSize=9&sortBy=recent`
- `GET    /ideas/:id`
- `POST   /ideas`
- `PATCH  /ideas/:id`
- `DELETE /ideas/:id`
- `PATCH  /ideas/:id/upvote`
- `PATCH  /ideas/:id/downvote`

## Testes

- backend: unitários + e2e
- frontend: unitários

Executar:

```bash
make test-backend
make test-frontend
```
