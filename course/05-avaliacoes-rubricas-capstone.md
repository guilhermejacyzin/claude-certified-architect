# 05 - Avaliações, Rubricas e Projeto Final

## Diagnóstico inicial

Faça:

1. 10 questões do simulado bilíngue.
2. 5 questões comentadas avançadas.
3. 1 lab de tool design.
4. 1 explicação em voz alta de agentic loop.

Registre erros em `../study-log.md`.

## Avaliação por nível

### Fundamentos

Você passa se:

- acerta 80% de questões nível 1;
- explica tool/resource/prompt;
- explica `tool_use`;
- explica por que prompt não é garantia.

### Praticante

Você passa se:

- desenha 3 tools boas;
- cria erro estruturado;
- cria schema simples;
- decide plan/direct corretamente.

### Arquiteto

Você passa se:

- desenha agente de suporte;
- desenha sistema multiagente;
- desenha pipeline de CI;
- desenha extração documental;
- explica contexto/proveniência.

### Especialista

Você passa se:

- critica arquitetura falha;
- propõe correção;
- justifica tradeoff;
- inclui observabilidade;
- inclui human-in-the-loop;
- inclui validação e métricas.

## Rubrica de resposta scenario-based

| Critério | 0 | 1 | 2 |
|---|---:|---:|---:|
| Identifica risco | não | parcial | completo |
| Escolhe boundary correta | não | parcial | modelo/tool/hook/schema/humano corretos |
| Preserva contexto | não | resumo fraco | fatos, decisões e lacunas |
| Trata erro | não | genérico | estruturado e recuperável |
| Usa schema quando precisa | não | incompleto | validável |
| Proveniência | ausente | fonte genérica | claim-source claro |
| Escalonamento | ausente | genérico | critérios e handoff |

Meta especialista: 12 pontos ou mais de 14.

## Projeto final - Plataforma Agentic de Suporte e Documentos

### Objetivo

Desenhar uma solução completa com:

- agente de suporte;
- MCP tools/resources/prompts;
- Claude Code workflow;
- extração estruturada;
- pesquisa multiagente;
- human review;
- observabilidade.

### Parte 1 - Requisitos

Crie requisitos para:

1. consultar cliente;
2. consultar pedido;
3. calcular elegibilidade;
4. solicitar aprovação;
5. processar ação aprovada;
6. criar ticket;
7. extrair dados de contrato;
8. gerar resumo com fontes;
9. revisar PR em CI;
10. escalar para humano.

### Parte 2 - MCP

Defina:

- 5 tools read-only;
- 3 tools mutating;
- 3 resources;
- 2 prompts.

Para cada tool:

- nome;
- descrição;
- input;
- output;
- erros;
- risco;
- gate.

### Parte 3 - Agentic loop

Desenhe o loop:

1. input usuário;
2. decisão do modelo;
3. tool use;
4. tool result;
5. continuação;
6. finalização;
7. erro;
8. escalonamento.

### Parte 4 - Multiagente

Crie:

- coordenador;
- subagente de busca;
- subagente documental;
- subagente de síntese;
- subagente crítico.

Defina contexto passado para cada um.

### Parte 5 - Structured output

Crie schema para:

- extração de contrato;
- finding de PR;
- handoff humano;
- relatório de pesquisa.

### Parte 6 - Confiabilidade

Defina:

- retry;
- confidence;
- human review;
- logs;
- métricas;
- tratamento de conflitos;
- política de contexto.

### Parte 7 - Defesa oral

Explique em 10 minutos:

1. por que a arquitetura é segura;
2. onde o modelo decide;
3. onde o código garante;
4. onde humano entra;
5. como o sistema mede qualidade.

## Gabarito esperado do capstone

Uma solução forte:

- separa read-only de mutating;
- usa gates para risco;
- usa resources para políticas;
- usa prompts para workflows;
- passa contexto explicitamente para subagentes;
- preserva proveniência;
- usa schema e validação;
- calibra confidence;
- escala com handoff estruturado;
- registra auditoria sem vazar dados.

Uma solução fraca:

- dá todas as tools para todos;
- depende só de prompt;
- não tem schema;
- não tem retry;
- não preserva fontes;
- não tem human review;
- não mede qualidade;
- não limita ações destrutivas.
