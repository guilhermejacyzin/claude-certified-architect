# Lab 03 - Claude Code Config

## Objetivo

Desenhar configuração de Claude Code para um projeto real sem misturar
responsabilidades.

## Arquivos a propor

```text
CLAUDE.md
.claude/rules/backend.md
.claude/rules/frontend.md
.claude/commands/review-pr.md
.claude/skills/api-contract/SKILL.md
```

## Exercício

1. Escreva o que fica no `CLAUDE.md` do projeto.
2. Crie uma rule aplicável apenas a `src/api/**`.
3. Crie um slash command para review de PR.
4. Crie uma skill para contratos de API.
5. Liste quando usaria plan mode.

## Critérios de sucesso

- Regra global é curta.
- Regras específicas carregam só quando relevantes.
- Slash command tem workflow claro.
- Skill tem descrição que dispara no momento certo.
- Plan mode é usado para mudanças complexas, não para edição trivial.
