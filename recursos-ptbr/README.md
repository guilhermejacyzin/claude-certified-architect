# Recursos PT-BR Por Aula

Esta pasta organiza uma força-tarefa de curadoria em português brasileiro para
estudar Claude Certified Architect - Foundations sem depender apenas da Academy.

O objetivo é mapear cada aula/tópico do learning path para:

1. documentação oficial em PT-BR;
2. vídeos em PT-BR, especialmente YouTube;
3. artigos em PT-BR;
4. materiais práticos que ensinam o mesmo conceito aplicado a Claude;
5. lacunas que ainda precisam de pesquisa adicional.

## Arquivos

- `fontes-curadas-ptbr.md`: lista mestre de fontes encontradas.
- `matriz-aulas-claude-ptbr.md`: mapeamento aula a aula.
- `queries-de-pesquisa.md`: buscas prontas para continuar expandindo a curadoria.

## Critério De Inclusão

Prioridade máxima:

- conteúdo em PT-BR;
- Claude, Claude Code, Claude API, MCP com Claude ou Anthropic;
- aula prática, tutorial, guia técnico ou artigo aplicável ao que cai na prova.

Não entram como fonte principal:

- conteúdo somente em inglês;
- conteúdo genérico de IA sem ligação com Claude;
- vídeos curtos sem explicação suficiente;
- conteúdo promocional sem ensino prático;
- material que prometa questões reais de prova.

Quando um material é útil, mas não cobre exatamente a aula, ele deve aparecer
como **complementar**, não como principal.

## Como Expandir

Para cada nova fonte:

1. Verifique se está em PT-BR.
2. Verifique se o tema é Claude/Anthropic ou aplicável diretamente a Claude.
3. Registre título, tipo, link, tópico coberto e nível.
4. Adicione o ID em `fontes-curadas-ptbr.md`.
5. Aponte esse ID na matriz aula-a-aula.
6. Se a fonte for fraca, registre como lacuna, não como recomendação.

## Status Atual

Esta é a primeira leva de curadoria. Ela cobre os blocos principais:

- Agent Skills;
- Claude API;
- tool use;
- structured outputs;
- MCP;
- Claude Code;
- hooks;
- workflows;
- contexto;
- RAG/citações/PDF;
- custos e cache.

Ainda há lacunas em vídeos PT-BR específicos para algumas aulas muito estreitas,
como `Temperature`, `Fine-grained tool calling`, `Model-based grading` e
`Prompt caching in action`.
