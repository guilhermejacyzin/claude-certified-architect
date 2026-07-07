# Claude Certified Architect - Foundations PT-BR

Curso aberto em português para estudar a certificação **Claude Certified
Architect - Foundations**, com foco em arquitetura de soluções com Claude,
Agent SDK, Claude Code, Model Context Protocol (MCP), structured output,
confiabilidade e workflows de produção.

O objetivo é que este repositório funcione como uma formação textual completa:
do básico até o nível especialista. A proposta é permitir estudo profundo mesmo
sem depender dos vídeos, usando cursos oficiais, documentação e materiais
comunitários apenas como reforço e validação.

## Site Navegável

Este repositório também foi preparado como um site de estudo via GitHub Pages:

```text
https://guilhermejacyzin.github.io/claude-certified-architect/
```

O site oferece menu lateral, busca, capa de entrada, trilha visual, navegação por
módulos e leitura direta dos arquivos Markdown. Se o GitHub Pages ainda não
estiver ativo, habilite **Settings > Pages > GitHub Actions** no repositório.

Para abrir localmente:

```powershell
python -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

O guia completo de navegação está em `docs/21-guia-navegacao-site.md`.

## O Que Este Curso Ensina

Ao final da trilha, você deve conseguir:

- explicar como funciona um agentic loop;
- projetar agentes que usam tools com segurança;
- desenhar integrações MCP com tools, resources e prompts;
- configurar Claude Code para projetos, times e CI/CD;
- criar prompts com critérios explícitos;
- usar JSON Schema e structured output;
- validar e corrigir extrações com retry loops;
- decidir quando usar subagentes;
- preservar contexto, fontes, decisões e lacunas;
- criar handoffs humanos claros;
- reduzir falsos positivos em reviews automatizados;
- responder questões scenario-based com raciocínio arquitetural.

## Para Quem Serve

Este material foi escrito para:

- arquitetos de solução;
- desenvolvedores;
- tech leads;
- consultores de IA;
- pessoas trabalhando com automação e agentes;
- equipes que querem nivelar conhecimento antes da certificação;
- quem precisa entender Claude em cenários reais de produção.

O texto usa três camadas de explicação:

- explicação normal, para entender a ideia;
- explicação técnica, para dominar o que cai na prova;
- exemplo simplificado, para fixar e comunicar o conceito com clareza.

## Caminho Principal

Comece pela pasta `course/`. Ela organiza o conteúdo como curso formal.

| Etapa | Arquivo | Resultado esperado |
|---|---|---|
| Orientação | `course/00-como-usar-o-curso.md` | Entender método, rotina e critérios |
| Fundamentos | `course/01-fundamentos.md` | Dominar vocabulário e conceitos-base |
| Praticante | `course/02-praticante.md` | Aplicar tools, schemas e Claude Code |
| Arquiteto | `course/03-arquiteto.md` | Desenhar sistemas agentic completos |
| Especialista | `course/04-especialista.md` | Tomar decisões de produção e escala |
| Avaliação | `course/05-avaliacoes-rubricas-capstone.md` | Medir prontidão e executar capstone |

## Estrutura Do Repositório

### Trilha Academy Expandida

- `academy/README.md`: mapa dos primeiros conteúdos visíveis no learning path.
- `academy/01-introducao-agent-skills.md`: Agent Skills em profundidade.
- `academy/02-building-with-claude-api.md`: Claude API, prompts, evals, tools,
  RAG e features.
- `academy/03-model-context-protocol.md`: MCP tools, resources, prompts,
  clients e inspector.
- `academy/04-claude-code-em-acao.md`: Claude Code, MCP servers, workflows e
  agents.
- `academy/05-matriz-cobertura-learning-path.md`: matriz tópico a tópico dos
  conteúdos visíveis no learning path, com onde estudar e como praticar.

### Curso

- `course/README.md`: visão geral da formação.
- `course/00-como-usar-o-curso.md`: método de estudo, rotina e diagnóstico.
- `course/01-fundamentos.md`: conceitos iniciais de agentes, MCP, prompts e contexto.
- `course/02-praticante.md`: aplicação prática com tools, Claude Code e schemas.
- `course/03-arquiteto.md`: desenho de sistemas completos.
- `course/04-especialista.md`: tradeoffs avançados e decisões de produção.
- `course/05-avaliacoes-rubricas-capstone.md`: rubricas e projeto final.

### Apostila Profunda

- `docs/00-mapa-exame.md`: domínios, pesos e objetivos.
- `docs/01-trilha-17-dias.md`: plano intensivo até 24/07/2026.
- `docs/02-recursos-externos.md`: curadoria de links e repositórios.
- `docs/03-guia-por-dominio.md`: guia de revisão por domínio.
- `docs/04-sintese-comunitaria-ptbr.md`: síntese própria dos padrões comunitários.
- `docs/10-curso-completo-visao-geral.md`: visão geral da apostila completa.
- `docs/11-modulo-agentic-architecture.md`: arquitetura agentic e orquestração.
- `docs/12-modulo-mcp-tool-design.md`: MCP e design de tools.
- `docs/13-modulo-claude-code-workflows.md`: Claude Code, rules, skills e CI/CD.
- `docs/14-modulo-prompt-structured-output.md`: prompt engineering e schemas.
- `docs/15-modulo-context-reliability.md`: contexto, proveniência e confiabilidade.
- `docs/16-cenarios-integrados.md`: cenários integrados de treino.
- `docs/17-exemplos-simplificados.md`: exemplos simplificados dos principais conceitos.
- `docs/18-guia-tri-camada-conceitos.md`: explicação normal, técnica e simplificada.
- `docs/19-playbooks-passo-a-passo.md`: procedimentos práticos para cenários.
- `docs/20-estimativa-custos-token.md`: estimativa de consumo de tokens em USD e
  BRL para executar exemplos, labs, aulas, drills e simulados com margem de
  estudo.
- `docs/21-guia-navegacao-site.md`: instruções para usar o repositório como site
  navegável, com busca, menu lateral, Pages e servidor local.

### Exemplos Passo a Passo

A pasta `examples/` traz pelo menos 10 exemplos detalhados por capacidade
principal:

- `examples/01-agentic-orchestration-10-exemplos.md`
- `examples/02-mcp-tools-10-exemplos.md`
- `examples/03-claude-code-10-exemplos.md`
- `examples/04-structured-output-10-exemplos.md`
- `examples/05-context-reliability-10-exemplos.md`

Esses exemplos seguem sempre a mesma lógica: situação, passo a passo, decisão
correta e exemplo simplificado.

Para planejar orçamento de prática, consulte
`docs/20-estimativa-custos-token.md`. Ele estima custo em dólares e reais para
cada um dos 50 exemplos, usando preço atual de tokens, câmbio USD/BRL e margem
para repetir execuções durante o estudo.

### Labs

A pasta `labs/` contém exercícios práticos:

- agentic loop;
- MCP tool design;
- configuração Claude Code;
- structured output;
- gestão de contexto e confiabilidade.

Use os labs depois de estudar cada módulo. O objetivo é transformar leitura em
prática.

### Drills

A pasta `drills/` contém treino repetitivo para fixação rápida:

- `drills/README.md`: como usar os drills.
- `drills/01-drills-academy.md`: classificação de artefatos, tool/resource/prompt,
  erros estruturados, evals, RAG, Claude Code e cenários integrados.

Use os drills quando terminar uma seção da Academy. Eles foram feitos para
estressar reconhecimento de padrões: escolher entre prompt, tool, resource,
hook, skill, command, structured output e eval sem depender de memorização rasa.

### Simulados

A pasta `practice/` contém questões autorais:

- `practice/questoes-simuladas.md`: questões introdutórias.
- `practice/simulado-02-arquitetura.md`: arquitetura e tradeoffs.
- `practice/questoes-comentadas-avancadas.md`: questões com raciocínio completo.
- `practice/simulado-bilingue-30-questoes.md`: 30 questões em inglês com tradução
  PT-BR, organizadas por complexidade.
- `practice/simulado-academy-mcp-claude-code-40-questoes.md`: 40 questões
  bilíngues focadas em MCP, Claude Code, hooks, SDK, GitHub, context control,
  RAG, evals e workflows.

Os simulados foram feitos para treinar julgamento. A certificação tende a cobrar
cenários realistas, não memorização de frases.

### Flashcards

- `flashcards/ccaf.tsv`: cartões para revisão espaçada.

Sugestão: importe em Anki, RemNote, Quizlet ou outro sistema de repetição
espaçada.

### Claude Code

- `.claude/CLAUDE.md`: instruções para usar Claude Code estudando este repo.
- `.claude/skills/ccaf-study/SKILL.md`: skill de estudo para gerar questões,
  revisar domínios e explicar tradeoffs.

## Domínios Da Certificação

| Domínio | Peso |
|---|---:|
| Agentic Architecture & Orchestration | 27% |
| Tool Design & MCP Integration | 18% |
| Claude Code Configuration & Workflows | 20% |
| Prompt Engineering & Structured Output | 20% |
| Context Management & Reliability | 15% |

## Como Estudar

### Roteiro Rápido

1. Leia `course/00-como-usar-o-curso.md`.
2. Leia `docs/00-mapa-exame.md`.
3. Faça 10 questões do simulado bilíngue.
4. Estude o nível em que teve mais dificuldade.
5. Faça o lab correspondente.
6. Registre erros em `study-log.md`.

### Roteiro Completo

1. Complete `course/01-fundamentos.md`.
2. Faça exemplos de `examples/01-agentic-orchestration-10-exemplos.md`.
3. Complete `course/02-praticante.md`.
4. Faça os labs de MCP, Claude Code e structured output.
5. Complete `course/03-arquiteto.md`.
6. Resolva cenários integrados.
7. Complete `course/04-especialista.md`.
8. Faça `practice/simulado-bilingue-30-questoes.md`.
9. Faça `practice/simulado-academy-mcp-claude-code-40-questoes.md`.
10. Faça `practice/questoes-comentadas-avancadas.md`.
11. Execute o capstone em `course/05-avaliacoes-rubricas-capstone.md`.

## Estratégia De Prova

O exame tende a perguntar: "qual decisão é mais correta em produção?"

Ao responder, pense:

- o risco exige regra determinística?
- a resposta precisa de schema?
- a action muda estado?
- a tool está bem delimitada?
- o subagente recebeu contexto?
- a fonte foi preservada?
- há baixa confiança?
- precisa escalar para humano?
- o contexto pode estar obsoleto?

Uma boa resposta normalmente distribui responsabilidades assim:

| Responsável | O que deve fazer |
|---|---|
| Modelo | raciocinar, escolher próxima ação, sintetizar |
| Tool/MCP | consultar ou executar ação externa |
| Código/hook | bloquear, validar, normalizar e auditar |
| Schema | garantir formato e reduzir ambiguidade |
| Humano | aprovar risco, exceção ou baixa confiança |

## Critério De Qualidade

Este curso deve ser detalhado o suficiente para uma pessoa estudar sem depender
dos vídeos. Cada módulo busca incluir:

- teoria;
- passo a passo;
- exemplos práticos;
- exemplo simplificado;
- anti-patterns;
- critérios de prova;
- atividade;
- avaliação.

## Materiais Externos

O repositório inclui curadoria e sínteses próprias baseadas em documentação
oficial e materiais públicos da comunidade. As referências e atribuições ficam em:

- `docs/02-recursos-externos.md`
- `THIRD_PARTY_NOTICES.md`

## Próximo Passo Recomendado

Comece por:

```text
course/00-como-usar-o-curso.md
```

Depois faça o diagnóstico:

```text
practice/simulado-bilingue-30-questoes.md
```

Use o resultado para decidir qual módulo estudar primeiro.
