# 01 - Introdução a Agent Skills

## Visão Geral

Skills são pacotes reutilizáveis de instruções, arquivos de apoio e, quando
necessário, scripts ou referências. Elas permitem que Claude Code carregue
conhecimento especializado no momento certo, sem deixar toda instrução sempre no
contexto.

Em linguagem simples: uma Skill é um manual especializado que Claude abre apenas
quando a tarefa pede.

## 1. O Que São Skills?

### Explicação Normal

Uma Skill ensina Claude a realizar uma categoria de tarefa. Em vez de colocar
todo conhecimento no `CLAUDE.md`, você cria uma Skill com instruções próprias.

### Explicação Técnica

Uma Skill normalmente contém:

- `SKILL.md`;
- frontmatter com `name` e `description`;
- instruções de uso;
- arquivos de referência;
- exemplos;
- scripts opcionais;
- assets opcionais.

Claude usa a descrição para decidir se deve carregar a Skill.

### Exemplo Simplificado

Você tem um manual geral da empresa, mas também tem manuais específicos:

- manual de contratos;
- manual de segurança;
- manual de design;
- manual de APIs.

Cada um só é aberto quando necessário.

### Erros Comuns

- descrição vaga;
- Skill grande demais;
- colocar segredo na Skill;
- duplicar conteúdo que deveria ficar em `CLAUDE.md`;
- criar Skill para tarefa trivial.

## 2. Criando Sua Primeira Skill

### Passo a Passo

1. Escolha uma capacidade específica.
2. Crie uma pasta em `.claude/skills/nome-da-skill/`.
3. Crie `SKILL.md`.
4. Adicione frontmatter.
5. Escreva quando usar.
6. Escreva workflow.
7. Adicione critérios de qualidade.
8. Adicione exemplos pequenos.
9. Teste com uma tarefa real.
10. Ajuste a descrição se Claude não carregar a Skill corretamente.

### Template

```md
---
name: api-contract-review
description: Use ao revisar mudanças em contratos de API, OpenAPI, DTOs e compatibilidade entre serviços.
---

# API Contract Review

## Objetivo

Garantir que mudanças em APIs sejam compatíveis, documentadas e testadas.

## Workflow

1. Identificar endpoints alterados.
2. Verificar breaking changes.
3. Conferir schema.
4. Conferir testes.
5. Gerar findings com severidade.
```

### Critério de Prova

A descrição deve ser específica. Descrição ruim faz Claude usar a Skill no
momento errado ou não usar quando deveria.

## 3. Skills Com Múltiplos Arquivos

### Explicação Normal

Quando uma Skill precisa de muito material, deixe `SKILL.md` curto e mova
detalhes para arquivos de referência.

### Estrutura Recomendada

```text
.claude/skills/api-contract-review/
  SKILL.md
  references/
    compatibility-checklist.md
    openapi-rules.md
  examples/
    breaking-change.md
    safe-change.md
  scripts/
    validate-openapi.js
```

### Passo a Passo

1. Mantenha `SKILL.md` focado.
2. Coloque listas longas em `references/`.
3. Coloque exemplos em `examples/`.
4. Coloque automações em `scripts/`.
5. Instrua Claude quando ler cada referência.
6. Evite carregar tudo sempre.
7. Teste se a Skill encontra os arquivos.
8. Remova material duplicado.
9. Mantenha nomes claros.
10. Documente limitações.

### Exemplo Simplificado

O índice fica no começo do livro. Os capítulos detalhados ficam separados.

## 4. Skills vs Outras Funcionalidades Do Claude Code

| Recurso | Use Para |
|---|---|
| `CLAUDE.md` | contexto estável do projeto |
| Rules | convenções por caminho/pasta |
| Slash commands | workflow acionado explicitamente |
| Skills | capacidade especializada sob demanda |
| Hooks | controle determinístico antes/depois de eventos |
| MCP | conexão com sistemas externos |

### Exemplo

Se a regra vale para todo projeto, use `CLAUDE.md`.

Se vale só para `src/api/**`, use rule.

Se é um fluxo como "revisar PR", use slash command.

Se é uma especialidade como "contratos OpenAPI", use Skill.

Se precisa bloquear comando perigoso, use hook.

Se precisa consultar Jira/GitHub/banco, use MCP.

## 5. Compartilhando Skills

### Passo a Passo

1. Remova dados internos.
2. Remova caminhos locais.
3. Documente pré-requisitos.
4. Inclua exemplos genéricos.
5. Use licença compatível.
6. Adicione versão.
7. Explique limitações.
8. Teste em repo limpo.
9. Documente instalação.
10. Colete feedback.

### Critério de Qualidade

Uma Skill compartilhável deve funcionar sem depender de contexto privado.

## 6. Troubleshooting De Skills

### Problema: Skill Não É Usada

Possíveis causas:

- descrição vaga;
- tarefa não menciona gatilho;
- Skill está no caminho errado;
- frontmatter inválido;
- nome pouco claro.

Correções:

1. melhorar `description`;
2. incluir termos de uso reais;
3. validar frontmatter;
4. testar com prompt direto;
5. reduzir ambiguidade com outras Skills.

### Problema: Skill É Usada Demais

Causas:

- descrição genérica;
- escopo amplo;
- sobreposição com `CLAUDE.md`.

Correções:

1. adicionar "use quando";
2. adicionar "não use quando";
3. mover conteúdo geral para `CLAUDE.md`;
4. dividir Skill.

### Problema: Skill Consome Contexto Demais

Correções:

1. mover detalhes para `references/`;
2. carregar apenas arquivo necessário;
3. resumir exemplos;
4. remover conteúdo duplicado.

## Checklist Final

Uma boa Skill:

- tem objetivo claro;
- tem descrição precisa;
- carrega sob demanda;
- usa arquivos de apoio quando necessário;
- não contém segredos;
- não substitui hooks quando precisa de garantia;
- pode ser testada com prompts reais.
