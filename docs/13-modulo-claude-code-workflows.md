# Módulo 3 - Claude Code: Configuração e Workflows

Peso no exame: **20%**.

## Objetivo

Você deve saber configurar Claude Code para um time/projeto real: memória de
projeto, rules por caminho, slash commands, skills, hooks, plan mode e CI/CD.

## 1. CLAUDE.md

`CLAUDE.md` é memória/instrução de projeto. Ele deve conter informações estáveis
que Claude precisa no início de uma sessão.

Bom conteúdo:

- arquitetura do projeto;
- comandos de build/test/lint;
- padrões de código;
- limites de segurança;
- convenções de PR;
- links internos seguros;
- decisões arquiteturais estáveis.

Conteúdo ruim:

- logs enormes;
- secrets;
- instruções temporárias;
- documentação completa de terceiros;
- regras específicas de subpasta que deveriam ficar em rules.

## 2. Hierarquia

Pense em camadas:

```text
User memory/config
  -> project CLAUDE.md
    -> directory CLAUDE.md/rules
      -> skill específica
        -> comando/workflow atual
```

Quanto mais específica a regra, mais perto ela deve ficar do contexto onde se
aplica.

## 3. Rules por caminho

Use path-specific rules quando convenções dependem da área.

Exemplo:

```text
.claude/rules/backend.md
.claude/rules/frontend.md
.claude/rules/infra.md
```

Uma rule de backend pode dizer:

```text
Aplica-se a src/api/**
- Validar contratos OpenAPI.
- Não alterar migrations sem teste.
- Preferir services existentes.
```

Uma rule de frontend pode dizer:

```text
Aplica-se a src/components/**
- Usar design system.
- Não criar CSS global.
- Manter acessibilidade.
```

## 4. Slash commands

Slash commands são workflows explícitos.

Exemplos:

- `/review-pr`
- `/write-tests`
- `/explain-module`
- `/prepare-release-notes`

Um bom command:

- define entrada;
- define passos;
- define formato de saída;
- define critérios de sucesso;
- evita escopo aberto demais.

## 5. Skills

Skills são capacidades carregadas sob demanda.

Use skill quando:

- há conhecimento especializado;
- há arquivos de referência;
- há scripts/assets;
- a instrução é longa demais para sempre carregar;
- você quer reuso entre projetos.

Exemplo de skill para API contract:

```text
name: api-contract-review
description: Use ao revisar mudanças em OpenAPI, DTOs, validação e compatibilidade.
```

A descrição é crítica: ela determina quando a skill será usada.

## 6. Hooks em Claude Code

Hooks servem para automação e controle.

Casos:

- bloquear comando destrutivo;
- rodar formatter depois de edit;
- exigir testes antes de finalizar;
- injetar contexto adicional;
- controlar permission requests;
- validar plano antes de sair do plan mode.

Na prova, hooks são a resposta certa quando:

- há regra determinística;
- há risco operacional;
- há necessidade de auditoria;
- há transformação pós-tool.

## 7. Plan mode vs direct execution

### Use plan mode quando

- mudança envolve múltiplos arquivos;
- há decisão arquitetural;
- risco de quebrar contrato;
- precisa de aprovação;
- escopo ainda é ambíguo;
- você quer comparar alternativas.

### Use direct execution quando

- mudança é pequena;
- arquivo único;
- sem decisão arquitetural;
- baixo risco;
- usuário pediu alteração direta.

Tabela:

| Situação | Modo |
|---|---|
| Corrigir typo | Direct |
| Refatorar módulo | Plan |
| Adicionar teste simples | Direct |
| Migrar framework | Plan |
| Atualizar README | Direct |
| Alterar auth flow | Plan |

## 8. Iterative refinement

Padrão:

1. gerar primeira versão;
2. rodar testes/validação;
3. comparar output com critérios;
4. ajustar;
5. repetir até passar.

Em prompts:

- forneça exemplos positivos e negativos;
- defina critérios objetivos;
- peça análise de erro;
- melhore uma dimensão por vez.

Em código:

- teste primeiro quando possível;
- fazer mudança pequena;
- executar validação;
- corrigir regressões.

## 9. Claude Code em CI/CD

Objetivo: feedback automatizado útil, não ruído.

Bom design:

- rodar em PR;
- limitar escopo ao diff;
- usar critérios explícitos;
- output JSON;
- severidade;
- evidência;
- sugestão acionável;
- threshold para bloquear.

Schema exemplo:

```json
{
  "findings": [
    {
      "severity": "high",
      "file": "src/auth.ts",
      "line": 42,
      "issue": "Token validation skipped on refresh flow.",
      "evidence": "Function refreshSession returns before validateToken.",
      "recommendation": "Call validateToken before issuing session.",
      "confidence": 0.87
    }
  ]
}
```

Anti-pattern:

- comentar estilo subjetivo;
- bloquear por baixa severidade;
- não citar arquivo/linha;
- misturar opinião com bug;
- não diferenciar confidence.

## 10. Redução de falso positivo

Técnicas:

- critérios explícitos de bug;
- exemplos few-shot de falso positivo;
- severidade mínima;
- exigir evidência;
- pedir "não reporte se não houver caminho de falha";
- amostragem e calibração com PRs históricos.

## 11. Workflows de time

Exemplo de setup:

```text
CLAUDE.md
.claude/rules/
  backend.md
  frontend.md
  tests.md
.claude/commands/
  review-pr.md
  write-test-plan.md
  summarize-incident.md
.claude/skills/
  api-contract/
  security-review/
  migration-planner/
```

## Checklist do domínio

Você domina este domínio se consegue:

- decidir onde colocar uma instrução;
- desenhar `CLAUDE.md` enxuto;
- usar rules por path;
- criar slash command útil;
- explicar skill e frontmatter;
- escolher plan/direct;
- projetar review em CI;
- reduzir falso positivo;
- usar hooks para garantias.
