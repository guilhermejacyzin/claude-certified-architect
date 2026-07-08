# 24 - Grade Navegável De 94 Aulas

Este documento registra a estrutura atual da academia navegável publicada na
home do repositório.

## Objetivo

A home não deve ser tratada como uma capa. Ela é a sala de aula principal do
curso. O aluno deve conseguir entrar, escolher um módulo, abrir uma aula, ler a
explicação em camadas, acessar fonte externa em PT-BR, praticar e marcar
progresso.

## Distribuição Atual

| Módulo | Aulas | Foco |
|---|---:|---|
| Início | 1 | método de estudo e uso da academia |
| Agent Skills | 6 | criação, arquivos, compartilhamento e troubleshooting |
| Claude API | 48 | API, prompts, evals, tools, RAG, features e custos |
| Model Context Protocol | 14 | clients, servers, tools, resources, prompts e inspector |
| Claude Code | 20 | setup, contexto, edição, hooks, GitHub, MCP e SDK |
| Prática e Prova | 5 | simulados, drills, capstone e revisão |

Total: **94 aulas navegáveis**.

## Como Cada Aula Deve Ser Escrita

Cada aula da interface precisa ter:

1. objetivo;
2. explicação normal;
3. explicação técnica;
4. exemplo simplificado;
5. passo a passo;
6. prática guiada;
7. critério de prova;
8. links internos;
9. fontes externas;
10. vídeos PT-BR quando existirem.

Esse padrão evita que o repositório vire apenas uma lista de links. A aula deve
ensinar o conceito antes de mandar o aluno para outro material.

## Fonte Técnica Da Grade

A grade é carregada por três arquivos:

- `assets/academy-data.js`: módulos, fontes e aulas-base.
- `assets/academy-extra-lessons.js`: microaulas adicionais por tópico da Academy.
- `assets/academy-app.js`: renderização, busca, filtros, progresso e navegação.

O conteúdo longo continua nas pastas `academy/`, `course/`, `docs/`, `examples/`,
`labs/` e `practice/`. A home deve apontar para esses materiais, não substituí-los.

## Regra De Evolução

Ao ampliar a academia:

1. adicionar novas aulas em vez de apagar aulas existentes;
2. manter IDs estáveis para não quebrar progresso salvo no navegador;
3. adicionar fonte PT-BR quando houver;
4. registrar lacuna quando não houver vídeo PT-BR específico;
5. atualizar README, sidebar e guia de navegação quando a estrutura mudar;
6. validar sintaxe JavaScript e referências de recursos;
7. publicar via GitHub Pages somente depois de checar links e conteúdo sensível.

## Critério De Prontidão Para O Aluno

O aluno está pronto para avançar quando consegue:

1. explicar o conceito sem copiar a aula;
2. resolver um exemplo prático;
3. dizer qual primitiva usar: prompt, schema, tool, resource, Skill, command,
   hook, MCP ou humano;
4. justificar por que alternativas erradas são erradas;
5. estimar risco, custo e necessidade de validação.

## Próximas Expansões

As próximas melhorias naturais são:

1. criar simulados por módulo dentro da interface;
2. adicionar exportação/importação de progresso;
3. incorporar mais vídeos PT-BR por aula;
4. criar páginas longas individuais por microaula;
5. gerar `academy-data.js` automaticamente a partir de Markdown estruturado;
6. adicionar rubricas interativas de prontidão por domínio.
