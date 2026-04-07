import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedIdeas1775591250000 implements MigrationInterface {
  name = 'SeedIdeas1775591250000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const ideas = [
      {
        authorRegister: 12345,
        improvementSuggestion:
          'Automatizar processo de aprovação de documentos',
        currentProcess:
          'Atualmente, todos os documentos são revisados manualmente por um gestor, levando 2-3 dias úteis para aprovação.',
        howToImplement:
          'Implementar um sistema de workflow com regras de negócio pré-configuradas que automatize a aprovação de documentos de baixo risco.',
        expectedBenefits:
          'Redução de 80% no tempo de aprovação, liberação de 40 horas/mês de mão de obra, melhor experiência para usuários.',
        createdAt: '2025-12-15T10:30:00Z',
        updatedAt: '2026-01-20T14:45:00Z',
      },
      {
        authorRegister: 54321,
        improvementSuggestion: 'Criar dashboard unificado de métricas',
        currentProcess:
          'Gerentes precisam consultiar múltiplos sistemas e planilhas para obter visão completa das métricas do departamento.',
        howToImplement:
          'Desenvolver um dashboard centralizado que integre dados de todos os sistemas via API, com gráficos em tempo real.',
        expectedBenefits:
          'Melhor tomada de decisão, economia de 5 horas/semana em coleta de dados, visibilidade estratégica aumentada.',
        createdAt: '2025-11-08T09:15:00Z',
        updatedAt: '2026-02-03T16:20:00Z',
      },
      {
        authorRegister: 23456,
        improvementSuggestion:
          'Implementar sistema de chatbot para suporte ao cliente',
        currentProcess:
          'Equipe de suporte atende manualmente 500+ emails/dia com respostas genéricas para dúvidas similares.',
        howToImplement:
          'Integrar chatbot com IA que use base de conhecimento existente para responder 70% das questões rotineiras.',
        expectedBenefits:
          'Redução de 60% na carga de trabalho, tempo de resposta <5 minutos, satisfação de cliente aumentada.',
        createdAt: '2025-10-22T13:45:00Z',
        updatedAt: '2026-02-10T11:30:00Z',
      },
      {
        authorRegister: 67890,
        improvementSuggestion: 'Otimizar consultas de banco de dados críticas',
        currentProcess:
          'Alguns relatórios levam 15+ minutos para carregar devido a queries ineficientes e falta de índices.',
        howToImplement:
          'Análise profunda de performance com ferramentas de profiling, criação de índices estratégicos e refatoração de queries.',
        expectedBenefits:
          'Redução de 90% no tempo de execução, melhor experiência de usuário, redução de carga no servidor de BD.',
        createdAt: '2025-09-05T08:00:00Z',
        updatedAt: '2026-01-28T15:10:00Z',
      },
      {
        authorRegister: 11111,
        improvementSuggestion: 'Criar programa de mentoria interna',
        currentProcess:
          'Novos funcionários levam 3-4 meses para produtividade plena, sem suporte estruturado de aprendizado.',
        howToImplement:
          'Estabelecer programa formal com pareamento, plano de desenvolvimento individual e workshops mensais.',
        expectedBenefits:
          'Redução de 50% no tempo ramp-up, maior retenção, cultura de aprendizado fortalecida.',
        createdAt: '2025-08-18T11:20:00Z',
        updatedAt: '2026-03-01T09:50:00Z',
      },
      {
        authorRegister: 22222,
        improvementSuggestion: 'Implementar sistema de backup automatizado',
        currentProcess:
          'Backups são feitos manualmente uma vez ao mês, com risco potencial de perda de dados.',
        howToImplement:
          'Configurar pipeline de backup incremental diário com retenção de 30 dias em storage cloud redundante.',
        expectedBenefits:
          'Minimização de risco de perda de dados, recuperação em <1 hora nos piores cenários.',
        createdAt: '2025-07-30T14:20:00Z',
        updatedAt: '2026-02-15T10:15:00Z',
      },
      {
        authorRegister: 33333,
        improvementSuggestion:
          'Modernizar arquitetura legada para microserviços',
        currentProcess:
          'Sistema monolítico dificulta escalabilidade e torna deploys arriscados e lentos.',
        howToImplement:
          'Migração gradual para microserviços com API Gateway, começando por serviços menos críticos.',
        expectedBenefits:
          'Maior escalabilidade, melhor resiliência, deploys independentes, time mais ágil.',
        createdAt: '2025-06-12T09:30:00Z',
        updatedAt: '2026-01-08T13:45:00Z',
      },
      {
        authorRegister: 44444,
        improvementSuggestion:
          'Implementar sistema de logging e monitoramento centralizado',
        currentProcess:
          'Logs espalhados em múltiplos servidores, diagnóstico de problemas leva horas.',
        howToImplement:
          'Implementar ELK Stack (Elasticsearch, Logstash, Kibana) com alertas automáticos.',
        expectedBenefits:
          'Diagnóstico mais rápido, detecção proativa de problemas, melhor observabilidade.',
        createdAt: '2025-05-25T11:00:00Z',
        updatedAt: '2026-02-28T08:30:00Z',
      },
      {
        authorRegister: 55555,
        improvementSuggestion:
          'Criar repositório centralizado de componentes UI',
        currentProcess:
          'Cada time reimplementa componentes similares, sem padronização visual ou funcional.',
        howToImplement:
          'Desenvolver Design System com biblioteca de componentes reutilizáveis em Storybook.',
        expectedBenefits:
          'Consistência visual, redução de 40% em tempo de desenvolvimento, melhor UX.',
        createdAt: '2025-04-18T15:45:00Z',
        updatedAt: '2026-01-12T12:20:00Z',
      },
      {
        authorRegister: 66666,
        improvementSuggestion: 'Automatizar testes de carga e performance',
        currentProcess:
          'Testes de performance são manuais e realizados apenas antes de releases.',
        howToImplement:
          'Integrar JMeter/Gatling no pipeline CI/CD com testes nightly em staging.',
        expectedBenefits:
          'Detecção precoce de gargalos, confiança em deploys, redução de incidentes em produção.',
        createdAt: '2025-03-10T10:15:00Z',
        updatedAt: '2026-02-22T14:00:00Z',
      },
      {
        authorRegister: 77777,
        improvementSuggestion: 'Implementar autenticação multi-fator (MFA)',
        currentProcess:
          'Sistema usa apenas senha, com risco de comprometimento de contas administrativas.',
        howToImplement:
          'Integrar autenticação 2FA/MFA com TOTP ou SMS para contas sensíveis.',
        expectedBenefits:
          'Segurança aumentada, conformidade com regulamentações, redução de fraudes.',
        createdAt: '2025-02-28T08:40:00Z',
        updatedAt: '2026-03-05T09:15:00Z',
      },
      {
        authorRegister: 88888,
        improvementSuggestion: 'Criar plataforma de self-service para usuários',
        currentProcess:
          'Suporte recebe muitas solicitações triviais que usuários poderiam resolver sozinhos.',
        howToImplement:
          'Desenvolver portal com FAQ, documentação interativa e ferramentas self-service.',
        expectedBenefits:
          'Redução de 35% em tickets, satisfação de usuário aumentada, liberação de 30h/semana do suporte.',
        createdAt: '2025-01-15T13:25:00Z',
        updatedAt: '2026-02-18T11:40:00Z',
      },
      {
        authorRegister: 99999,
        improvementSuggestion:
          'Implementar versionamento de API com deprecação',
        currentProcess:
          'Mudanças na API quebram clientes antigos, causando frustração e retrabalho.',
        howToImplement:
          'Adotar versionamento semântico, manter múltiplas versões com período de deprecação definido.',
        expectedBenefits:
          'Melhor compatibilidade, evolução sem quebras, melhor experiência para clientes.',
        createdAt: '2024-12-20T16:50:00Z',
        updatedAt: '2026-01-30T10:25:00Z',
      },
      {
        authorRegister: 10101,
        improvementSuggestion:
          'Automatizar relatórios regulatórios e auditorias de compliance',
        currentProcess:
          'Relatórios são compilados manualmente todo mês, propenso a erros e demanda 40h/mês.',
        howToImplement:
          'Desenvolver sistema que extrai dados automaticamente e gera relatórios em PDF/Excel.',
        expectedBenefits:
          'Economia de 40h/mês, zero erros, auditoria mais fácil, conformidade garantida.',
        createdAt: '2024-11-05T12:10:00Z',
        updatedAt: '2026-02-05T15:30:00Z',
      },
      {
        authorRegister: 20202,
        improvementSuggestion: 'Implementar cache distribuído com Redis',
        currentProcess:
          'Sem cache, aplicação faz queries repetidas ao BD, causando lentidão e desperdício.',
        howToImplement:
          'Integrar Redis com estratégia de cache inteligente e invalidação automática.',
        expectedBenefits:
          'Melhoria de 70% em latência, redução de carga no BD, economia em infraestrutura.',
        createdAt: '2024-10-18T09:35:00Z',
        updatedAt: '2026-01-25T14:15:00Z',
      },
    ];

    for (const idea of ideas) {
      await queryRunner.query(
        `INSERT INTO "ideas" ("authorRegister", "improvementSuggestion", "currentProcess", "howToImplement", "expectedBenefits", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          idea.authorRegister,
          idea.improvementSuggestion,
          idea.currentProcess,
          idea.howToImplement,
          idea.expectedBenefits,
          idea.createdAt,
          idea.updatedAt,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "ideas" WHERE "authorRegister" IN (12345, 54321, 23456, 67890, 11111, 22222, 33333, 44444, 55555, 66666, 77777, 88888, 99999, 10101, 20202)`,
    );
  }
}
