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
## Aula pratica completa

Este lab treina configuracao de Claude Code como ambiente de engenharia, nao
como bloco unico de instrucoes. Em projetos reais, o erro comum e colocar tudo
em um unico arquivo global: arquitetura, estilo, comandos, contexto de negocio,
seguranca, exemplos e excecoes. Isso aumenta ruido, reduz aderencia e faz o
modelo carregar instrucao irrelevante para tarefas pequenas.

A configuracao madura separa responsabilidades. O `CLAUDE.md` deve explicar o
contrato global do projeto. Rules devem ser especificas e carregadas quando
fazem sentido. Slash commands devem encapsular workflows repetitivos. Skills
devem ensinar capacidades especializadas e reutilizaveis.

### Modelo mental

Pense em uma empresa com manuais. Existe o manual geral de conduta, mas tambem
existem manuais especificos para financeiro, engenharia, suporte e seguranca.
Ninguem precisa ler o manual financeiro para corrigir CSS. Claude Code deve
seguir a mesma logica: contexto certo, na hora certa.

### Passo a passo detalhado

1. Leia a estrutura do projeto antes de criar instrucoes.
2. Escreva um `CLAUDE.md` curto com objetivo do repo, comandos de teste,
   padroes principais e restricoes de seguranca.
3. Crie rules por area quando houver diferenca real de comportamento.
4. Em `backend.md`, descreva contratos de API, padrao de erro, validacao e
   testes.
5. Em `frontend.md`, descreva design system, acessibilidade, responsividade e
   convencoes de componentes.
6. Em slash commands, escreva workflows que um humano repetiria varias vezes:
   revisar PR, gerar release notes, auditar seguranca, preparar migration.
7. Em skills, coloque conhecimento que precisa de gatilho semantico: contrato
   OpenAPI, dominio fiscal, padrao de mensageria, arquitetura agentic.
8. Defina quando usar plan mode: mudanca ampla, risco alto, arquitetura,
   migracao, seguranca, dados ou refatoracao cross-module.
9. Teste a configuracao com tarefas pequenas e grandes.
10. Remova instrucao duplicada ou que conflita com outra.

### Exemplo simplificado

Se voce pede "corrija o botao quebrado", Claude Code nao deveria carregar dez
paginas sobre banco de dados. Se voce pede "revise uma PR de backend", ele deve
carregar regras de API, testes, seguranca e contrato de erro. A qualidade vem
de carregar o contexto certo, nao o contexto maximo.

### Exemplo de `CLAUDE.md`

```md
# Instrucoes do projeto

Este repo e uma aplicacao web de estudo. Preserve conteudo existente e prefira
adicionar material quando expandir aulas.

## Comandos

- Validar links: `node tools/check-site-links.js`
- Validar JS: `node --check assets/academy-app.js`

## Regras

- Nao incluir dados internos, tokens ou nomes de clientes.
- Toda rota publicada precisa retornar 200.
- Conteudo didatico deve ter conceito, passo a passo, exemplo simplificado e
  criterio de avaliacao.
```

### Erros comuns que a prova costuma explorar

- `CLAUDE.md` longo demais e cheio de detalhes especificos.
- Skill sem descricao clara de disparo.
- Slash command que apenas repete "analise bem".
- Rule que conflita com outra rule.
- Plan mode usado para qualquer edicao trivial.
- Falta de comando de verificacao no contexto do projeto.

### Checklist de dominio

- Consigo explicar onde fica cada tipo de instrucao.
- Consigo diferenciar rule, command e skill.
- Consigo criar um workflow de review reproduzivel.
- Consigo reduzir ruido no contexto.
- Consigo testar se a configuracao ajuda ou atrapalha.

### Entregavel do aluno

Entregue `CLAUDE.md`, duas rules especificas, um slash command de review, uma
skill de contrato de API, uma tabela explicando por que cada arquivo existe e
tres exemplos de tarefas com as instrucoes que deveriam ser carregadas.
