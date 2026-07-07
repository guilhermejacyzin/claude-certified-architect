# Trilha Intensiva PT-BR - 07/07/2026 a 24/07/2026

Prazo alvo: **24 de julho de 2026**. A partir de 07/07/2026, há 17 dias corridos
até a data limite sem contar o dia atual. Plano recomendado: 2 a 3 horas por
dia, com foco em prática e decisão arquitetural.

## Semana 1 - Fundamentos e mapa mental

### Dia 1 - Diagnóstico e blueprint

- Ler `docs/00-mapa-exame.md`.
- Fazer 15 questões simuladas sem consultar material.
- Marcar domínio fraco no `study-log.md`.
- Ler recursos oficiais de Agent SDK, Claude Code e MCP.

Entrega: diagnóstico inicial.

### Dia 2 - Agentic loop

- Estudar `stop_reason`, tool use, histórico e terminação.
- Fazer `labs/lab-01-agentic-loop.md`.
- Escrever um pseudo-loop com tratamento de erro.

Entrega: loop agentic explicado em 10 linhas.

### Dia 3 - Multiagente

- Estudar coordinator-subagent, contexto isolado e Task.
- Desenhar um sistema de pesquisa com 3 subagentes.
- Definir formato de handoff com fonte, claim e confidence.

Entrega: diagrama textual de orquestração.

### Dia 4 - MCP e design de tools

- Fazer `labs/lab-02-mcp-tools.md`.
- Comparar tools largas vs específicas.
- Criar 5 exemplos de erro estruturado.

Entrega: spec de MCP server fictício.

### Dia 5 - Claude Code

- Fazer `labs/lab-03-claude-code-config.md`.
- Criar exemplo de `CLAUDE.md`, rule, command e skill.
- Decidir plan mode vs direct execution em 10 casos.

Entrega: checklist Claude Code.

### Dia 6 - Structured output

- Fazer `labs/lab-04-structured-output.md`.
- Criar JSON Schema para extração.
- Desenhar retry loop com validação.

Entrega: schema + política de retry.

### Dia 7 - Contexto e confiabilidade

- Fazer `labs/lab-05-context-reliability.md`.
- Estudar escalation, provenance, uncertainty e human review.
- Montar resumo de padrões e anti-patterns.

Entrega: tabela "quando automatizar vs escalonar".

## Semana 2 - Exercícios integrados

### Dia 8 - Cenário suporte

- Resolver cenário de suporte com identidade, pedido, refund e escalonamento.
- Definir gates determinísticos antes de ação financeira.

### Dia 9 - Cenário pesquisa multiagente

- Desenhar subagentes de busca, análise, síntese e revisão.
- Incluir propagação de erros e lacunas de cobertura.

### Dia 10 - Cenário CI/CD

- Projetar review automatizado com Claude Code.
- Definir schema JSON de feedback.
- Criar critérios para evitar falsos positivos.

### Dia 11 - Extração estruturada

- Criar pipeline de documentos com schema, validação, retries e revisão humana.
- Definir quando usar batch.

### Dia 12 - Codebase grande

- Planejar exploração de monorepo: Glob/Grep/Read, scratchpad e resumos.
- Evitar carregar arquivos demais.

### Dia 13 - Simulado 1

- Fazer 40 a 60 questões comunitárias.
- Revisar explicação de cada erro.
- Mapear erro para domínio e task statement.

### Dia 14 - Correção direcionada

- Estudar apenas os 2 domínios mais fracos.
- Reescrever 10 flashcards.
- Refazer labs dos domínios fracos.

## Reta final

### Dia 15 - Simulado 2 cronometrado

- Fazer simulado completo ou maior conjunto disponível.
- Meta: acima de 80% em questões comunitárias.
- Registrar razões dos erros, não apenas respostas.

### Dia 16 - Revisão de anti-patterns

- Foco em pegadinhas:
  - prompt como substituto de enforcement determinístico;
  - subagente sem contexto explícito;
  - tool vaga demais;
  - schema sem nullable;
  - sumarização que perde proveniência;
  - review sem critérios explícitos.

### Dia 17 - Revisão leve

- Ler flashcards.
- Revisar mapa do exame.
- Dormir bem; não fazer maratona de material novo.

## Regra de ouro

Quando duas respostas parecem corretas, escolha a que coloca garantias
determinísticas no código/hook/schema/tool e deixa o modelo com julgamento,
síntese e adaptação.
