# D+Ideias

MVP do programa D+Ideias, proposto para informatizar o processo de cadastro e acompanhamento de ideias de melhoria registradas por colaboradores.

O projeto foi estruturado como um monorepo com frontend e backend separados, seguindo o escopo descrito na avaliação técnica.

## Objetivo do MVP

Substituir o controle manual em planilha por um sistema web capaz de registrar, listar, consultar, atualizar e remover ideias, mantendo as regras principais do processo atual.

O MVP não contempla autenticação ou autorização. O foco é sistematizar o fluxo hoje executado manualmente pelo setor responsável.

## Funcionalidades previstas

- Listagem de ideias cadastradas
- Visualização dos detalhes de uma ideia
- Cadastro de nova ideia
- Atualização dos campos editáveis de uma ideia
- Remoção de ideia cadastrada incorretamente

## Dados da ideia

Cada ideia deverá possuir, no mínimo, os seguintes campos:

- Identificador único e sequencial
- RE do autor
- O que pode ser melhorado
- Como é feito hoje
- Como pode ser melhorado
- Qual é o benefício
- Data de registro da ideia

## Arquitetura proposta

O projeto segue a arquitetura mínima pedida no enunciado:

- Backend em Node.js com NestJS
- Frontend SPA em Angular
- Banco de dados relacional

## Estrutura do repositório

```text
.
├── d-ideias-backend/
│   └── API REST em NestJS
└── d-ideias-frontend/
    └── SPA em Angular
```

### Backend

- Stack base: NestJS + TypeScript
- Objetivo: expor endpoints REST para o domínio de ideias
- Estado atual: projeto base criado, sem regras de negócio implementadas

### Frontend

- Stack base: Angular 21 + TypeScript
- Objetivo: consumir a API e disponibilizar as telas do MVP
- Estado atual: projeto base criado, sem páginas de negócio implementadas

## Estado atual

O repositório ainda está em fase inicial. Até o momento existem apenas os esqueletos das aplicações frontend e backend.

Itens ainda previstos para implementação:

- Modelagem do banco relacional
- Script SQL de criação do banco
- CRUD de ideias no backend
- Integração do frontend com a API
- Telas de listagem, detalhe, cadastro, edição e exclusão
- Orquestração dos serviços com Docker Compose

## Execução do projeto

### Forma planejada

A intenção é executar o ambiente completo com Docker Compose, incluindo:

- frontend
- backend
- banco de dados relacional

No momento, o arquivo de orquestração ainda não foi criado. Quando essa etapa for concluída, este README deverá ser atualizado com o comando oficial de subida do ambiente.

Exemplo esperado futuramente:

```bash
docker compose up --build
```

### Execução local temporária

Enquanto o ambiente com Docker Compose não estiver configurado, os projetos podem ser executados separadamente.

#### Backend

```bash
cd d-ideias-backend
npm install
npm run start:dev
```

Aplicação disponível por padrão em `http://localhost:3000`.

#### Frontend

```bash
cd d-ideias-frontend
npm install
npm start
```

Aplicação disponível por padrão em `http://localhost:4200`.

## Entregáveis esperados

Com a conclusão do projeto, os seguintes itens devem estar disponíveis:

- SQL de criação do banco de dados
- Código-fonte do backend
- Código-fonte do frontend
- Instruções de execução do ambiente

## Observações

- O escopo atual cobre apenas o primeiro MVP
- O cadastro direto da ideia pelo próprio colaborador foi citado como evolução futura e não faz parte desta entrega
- A documentação deverá evoluir junto com a implementação das features e da infraestrutura
