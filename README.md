# Claude Certified Architect - Foundations PT-BR

Repositório de estudos em português para a certificação **Claude Certified
Architect - Foundations**.

Este repo é uma trilha prática: resumo por domínio, plano de estudos, labs,
checklists e simulados autorais. Ele não substitui os cursos oficiais nem o
exam guide oficial.

## Regras de uso

- Não publique informações internas, nomes de clientes, tokens, credenciais,
  exemplos reais de projetos corporativos ou trechos de materiais confidenciais.
- Não commite o PDF oficial do exam guide, dumps de questões reais ou conteúdo
  copiado de cursos.
- Use repositórios comunitários como treino, não como fonte de verdade.
- Priorize documentação oficial da Anthropic, MCP e prática hands-on.

## Estrutura

- `docs/00-mapa-exame.md`: domínios, pesos e objetivos em PT-BR.
- `docs/01-trilha-17-dias.md`: plano intensivo até 24/07/2026.
- `docs/02-recursos-externos.md`: curadoria crítica de links e repositórios.
- `docs/03-guia-por-dominio.md`: guia de estudo por domínio.
- `docs/04-sintese-comunitaria-ptbr.md`: síntese própria em PT-BR dos padrões
  recorrentes em materiais públicos.
- `docs/05-roteiro-publicacao-e-contribuicao.md`: regras para manter o repo
  público, útil e seguro.
- `docs/10-curso-completo-visao-geral.md`: início da apostila completa.
- `docs/11-modulo-agentic-architecture.md`: módulo profundo de arquitetura
  agentic.
- `docs/12-modulo-mcp-tool-design.md`: módulo profundo de MCP e tools.
- `docs/13-modulo-claude-code-workflows.md`: módulo profundo de Claude Code.
- `docs/14-modulo-prompt-structured-output.md`: módulo profundo de structured
  output.
- `docs/15-modulo-context-reliability.md`: módulo profundo de contexto e
  confiabilidade.
- `docs/16-cenarios-integrados.md`: cenários integrados para treino final.
- `docs/17-exemplos-simplificados.md`: exemplos simplificados para explicar os
  conceitos com clareza.
- `labs/`: exercícios práticos alinhados aos domínios.
- `practice/`: questões simuladas autorais.
- `flashcards/`: cartões TSV para revisão espaçada.
- `.claude/`: configuração opcional para estudar com Claude Code.

## Como estudar

1. Leia `docs/00-mapa-exame.md`.
2. Siga `docs/01-trilha-17-dias.md`.
3. Faça os labs antes de simulados.
4. Use `practice/questoes-simuladas.md` para treinar julgamento arquitetural.
5. Revise erros por domínio, não por número total de acertos.

## Material Comunitário

Este repo inclui links, sínteses e adaptações próprias de materiais públicos.
Quando há licença compatível, a atribuição fica em `THIRD_PARTY_NOTICES.md`.
Quando um repo público não declara licença, usamos apenas link e resumo em
linguagem própria.

Não há dumps de prova, cópia do PDF oficial, nem conteúdo integral de cursos.

## Peso dos domínios

| Domínio | Peso |
|---|---:|
| Arquitetura Agentic e Orquestração | 27% |
| Design de Ferramentas e Integração MCP | 18% |
| Configuração e Workflows do Claude Code | 20% |
| Engenharia de Prompt e Saída Estruturada | 20% |
| Gestão de Contexto e Confiabilidade | 15% |

## Estratégia

O exame tende a cobrar decisões de arquitetura em cenários realistas. A pergunta
central não é "o que Claude consegue fazer?", mas:

- onde fica a responsabilidade: modelo, código, tool, hook, humano ou workflow?
- qual decisão reduz erro, ambiguidade e risco operacional?
- quando usar autonomia e quando exigir validação determinística?
- como preservar contexto, proveniência e auditabilidade?

## Critério De Qualidade

O material deve ser detalhado o suficiente para que uma pessoa consiga estudar
sem assistir aos vídeos, usando os vídeos apenas como reforço opcional. Cada
módulo profundo inclui teoria, passo a passo, exemplos, anti-patterns,
checklists e exercícios.

## Status

Repo inicial criado para estudo privado. Próximo passo recomendado: rodar um
diagnóstico com as questões simuladas e marcar domínio fraco em
`study-log.md`.
