# 05 - Matriz De Cobertura Do Learning Path

Esta matriz transforma os tópicos visíveis do learning path em um mapa de
estudo. Use como checklist: se você não consegue explicar a linha em voz alta,
implementar um exemplo simples e responder uma questão de cenário, ainda não
dominou o tópico.

## Como Usar Esta Matriz

Para cada linha:

1. Leia o material indicado.
2. Faça o exercício sugerido.
3. Escreva um resumo de 5 linhas no `study-log.md`.
4. Crie uma pergunta em inglês e traduza para PT-BR.
5. Explique o exemplo simplificado para alguém.

Critério de domínio:

- **Básico**: reconhece o conceito.
- **Praticante**: aplica em exemplo simples.
- **Arquiteto**: escolhe entre alternativas com tradeoffs.
- **Especialista**: desenha controles de produção e explica riscos.

## 1. Introduction To Agent Skills

| Tópico | Onde estudar | O que precisa dominar | Exercício de estresse |
|---|---|---|---|
| O que são habilidades? | `academy/01-introducao-agent-skills.md` | Skill como capacidade reutilizável, carregada sob demanda, com descrição que ativa uso correto | Escreva 5 descrições de skills e critique se seriam acionadas corretamente |
| Criando sua primeira habilidade | `academy/01-introducao-agent-skills.md` | Estrutura mínima, `SKILL.md`, descrição, escopo, exemplos | Crie uma skill conceitual para revisar prompts de extração |
| Configuração e múltiplos arquivos | `academy/01-introducao-agent-skills.md` | Separar instrução, referências, scripts e assets sem carregar tudo sempre | Desenhe uma skill com 3 referências e diga quando cada uma entra |
| Skills vs outras funcionalidades | `academy/01-introducao-agent-skills.md`, `docs/13-modulo-claude-code-workflows.md` | Diferença entre skill, command, rule, hook, MCP e `CLAUDE.md` | Classifique 20 cenários usando o artefato correto |
| Compartilhando habilidades | `academy/01-introducao-agent-skills.md` | Reuso entre projetos, documentação, versionamento, limites | Escreva um README de distribuição para uma skill |
| Troubleshooting | `academy/01-introducao-agent-skills.md` | Diagnosticar descrição ruim, contexto excessivo, recurso ausente, acionamento incorreto | Pegue uma skill ruim e melhore frontmatter, escopo e exemplos |

## 2. Building With The Claude API

| Tópico | Onde estudar | O que precisa dominar | Exercício de estresse |
|---|---|---|---|
| Welcome / Introduction | `academy/02-building-with-claude-api.md` | Diferença entre usar Claude via produto, API e Claude Code | Explique quando cada superfície é a melhor |
| Overview of Claude models | `academy/02-building-with-claude-api.md` | Seleção de modelo por latência, custo, raciocínio, multimodalidade e contexto | Monte matriz de decisão para 5 casos |
| Accessing the API | `academy/02-building-with-claude-api.md` | Fluxo de request, autenticação, headers, mensagens | Descreva uma request do zero sem copiar código |
| Getting an API key | `academy/02-building-with-claude-api.md` | Segredo em env var, rotação, escopo, não commitar | Faça checklist de segurança de chave |
| Making a request | `academy/02-building-with-claude-api.md` | Mensagens, model, max tokens, system, user, response | Reescreva uma request mal formada |
| Multi-turn conversations | `academy/02-building-with-claude-api.md` | Histórico, estado, continuidade, custo de contexto | Desenhe uma conversa com 4 turnos e tool result |
| Chat exercise | `academy/02-building-with-claude-api.md` | Iteração básica com critérios de resposta | Gere 5 respostas e avalie qualidade |
| System prompts | `academy/02-building-with-claude-api.md` | Instruções persistentes, papel, estilo, limites | Escreva 3 system prompts e critique ambiguidade |
| System prompts exercise | `academy/02-building-with-claude-api.md` | Ajustar prompt por falha observada | Corrija um prompt que gera JSON inválido |
| Temperature | `academy/02-building-with-claude-api.md` | Tradeoff entre variação e consistência | Escolha temperature para suporte, brainstorming e extração |
| Response streaming | `academy/02-building-with-claude-api.md` | Streaming para UX, eventos parciais, finalização | Desenhe UI que mostra resposta parcial sem quebrar tool loop |
| Structured data | `academy/02-building-with-claude-api.md`, `docs/14-modulo-prompt-structured-output.md` | JSON Schema, validação, retries, nullability | Crie schema para contrato com campos opcionais |
| Prompt evaluation | `academy/02-building-with-claude-api.md` | Evals como medição sistemática, não opinião | Defina dataset, métrica e critério de aprovação |
| Typical eval workflow | `academy/02-building-with-claude-api.md` | Dataset -> baseline -> mudança -> avaliação -> decisão | Desenhe eval para classificador de tickets |
| Generating test datasets | `academy/02-building-with-claude-api.md` | Cobertura de casos normais, borda e adversariais | Crie 15 casos de teste para extração de invoice |
| Running the eval | `academy/02-building-with-claude-api.md` | Execução repetível e comparação | Explique como evitar avaliar só exemplos fáceis |
| Model based grading | `academy/02-building-with-claude-api.md` | Juiz modelo, rubrica, viés, calibração | Crie rubrica de 5 pontos para resumo técnico |
| Code based grading | `academy/02-building-with-claude-api.md` | Validação determinística quando possível | Escreva critérios verificáveis por código |
| Prompt engineering | `academy/02-building-with-claude-api.md` | Clareza, especificidade, estrutura, exemplos | Reescreva 10 prompts vagos |
| XML tags | `academy/02-building-with-claude-api.md` | Delimitar contexto, instruções, exemplos e output | Modele prompt com `<context>`, `<task>`, `<format>` |
| Providing examples | `academy/02-building-with-claude-api.md` | Few-shot para comportamento desejado e indesejado | Crie 3 exemplos positivos e 2 negativos |
| Tool use | `academy/02-building-with-claude-api.md`, `docs/12-modulo-mcp-tool-design.md` | Tool schema, tool_use, tool_result, multi-turn | Simule manualmente um loop com duas tools |
| Tool functions | `academy/02-building-with-claude-api.md` | Função como contrato executável | Transforme requisito de negócio em tool |
| Tool schemas | `academy/02-building-with-claude-api.md` | Schema restrito e descrições | Reduza um schema aberto para schema seguro |
| Handling message blocks | `academy/02-building-with-claude-api.md` | Texto, tool_use e tool_result no histórico | Explique ordem correta dos blocos |
| Sending tool results | `academy/02-building-with-claude-api.md` | Devolver resultado para o modelo continuar | Escreva tool result de sucesso e de erro |
| Multiple tools | `academy/02-building-with-claude-api.md` | Seleção, sequência, dependência e conflito | Desenhe agente de suporte com 5 tools |
| Fine grained tool calling | `academy/02-building-with-claude-api.md` | Controle fino de uso de tools e permissões | Defina quais tools aparecem em cada etapa |
| Text edit tool | `academy/02-building-with-claude-api.md`, `examples/03-claude-code-10-exemplos.md` | Edição precisa, diffs e validação | Corrija trecho de código com mudança mínima |
| Web search tool | `academy/02-building-with-claude-api.md` | Pesquisa com fontes, data e incerteza | Faça resposta que preserve evidências |
| RAG | `academy/02-building-with-claude-api.md`, `docs/15-modulo-context-reliability.md` | Retrieval, chunking, embeddings, re-ranking, resposta citada | Desenhe pipeline RAG completo |
| Chunking | `academy/02-building-with-claude-api.md` | Tamanho, overlap, estrutura semântica | Compare chunk por parágrafo vs seção |
| Embeddings | `academy/02-building-with-claude-api.md` | Similaridade semântica e limitações | Explique por que embedding não substitui autorização |
| BM25 | `academy/02-building-with-claude-api.md` | Busca lexical complementar | Diga quando BM25 vence embedding |
| Multi-index RAG | `academy/02-building-with-claude-api.md` | Combinar índices por tipo de dado | Desenhe RAG para docs, tickets e código |
| Extended thinking | `academy/02-building-with-claude-api.md` | Usar raciocínio estendido para tarefas complexas | Escolha quando ativar e quando evitar |
| Image/PDF support | `academy/02-building-with-claude-api.md` | Multimodalidade, extração e limites | Desenhe fluxo para revisar PDF técnico |
| Citations | `academy/02-building-with-claude-api.md` | Proveniência e auditabilidade | Exija fonte por afirmação crítica |
| Prompt caching | `academy/02-building-with-claude-api.md` | Reuso de contexto estável, custo e latência | Identifique parte cacheável de prompt grande |
| Files API / code execution | `academy/02-building-with-claude-api.md` | Arquivos como insumo e execução controlada | Defina limites para análise de planilha |

## 3. Introduction To Model Context Protocol

| Tópico | Onde estudar | O que precisa dominar | Exercício de estresse |
|---|---|---|---|
| Welcome | `academy/03-model-context-protocol.md` | Problema de integração padronizada | Explique MCP em 60 segundos |
| Introducing MCP | `academy/03-model-context-protocol.md` | Client, server, tools, resources, prompts | Desenhe arquitetura em blocos |
| MCP clients | `academy/03-model-context-protocol.md` | Responsabilidades do consumidor de capabilities | Liste o que o client faz e não faz |
| Project setup | `academy/03-model-context-protocol.md` | Estrutura de servidor testável | Monte skeleton de servidor |
| Defining tools with MCP | `academy/03-model-context-protocol.md`, `docs/12-modulo-mcp-tool-design.md` | Nome, descrição, schema, erro, permissão | Reescreva 5 tools ruins |
| Server inspector | `academy/03-model-context-protocol.md` | Diagnóstico manual de servidor | Crie checklist de inspeção |
| Implementing a client | `academy/03-model-context-protocol.md` | Inicializar, listar, chamar, anexar resultado | Simule chamada completa |
| Defining resources | `academy/03-model-context-protocol.md` | URI, conteúdo, metadata, escopo | Modele 5 resources seguros |
| Accessing resources | `academy/03-model-context-protocol.md` | Leitura, fonte e contexto | Explique como evitar dado obsoleto |
| Defining prompts | `academy/03-model-context-protocol.md` | Workflow/template reutilizável | Crie prompt MCP de handoff |
| Prompts in the client | `academy/03-model-context-protocol.md` | Cliente solicita template e preenche args | Desenhe fluxo end-to-end |
| Final assessment | `academy/03-model-context-protocol.md`, `practice/simulado-academy-mcp-claude-code-40-questoes.md` | Classificar e justificar decisões | Responder 20 cenários sem consulta |
| MCP review | `academy/03-model-context-protocol.md` | Revisão de arquitetura e riscos | Auditar um servidor fictício |

## 4. Claude Code In Action

| Tópico | Onde estudar | O que precisa dominar | Exercício de estresse |
|---|---|---|---|
| Introduction | `academy/04-claude-code-em-acao.md` | Claude Code como agente de desenvolvimento | Explique diferença para chat comum |
| What is a coding assistant? | `academy/04-claude-code-em-acao.md` | Assistente útil com limites | Liste 10 comportamentos bons e ruins |
| Claude Code in action | `academy/04-claude-code-em-acao.md` | Explorar, planejar, editar, validar | Simule uma correção com etapas |
| Claude Code setup | `academy/04-claude-code-em-acao.md`, `docs/13-modulo-claude-code-workflows.md` | Setup, auth, projeto, instruções | Criar checklist de onboarding |
| Project setup | `academy/04-claude-code-em-acao.md` | README, comandos, arquitetura, validação | Escrever `CLAUDE.md` mínimo |
| Adding context | `academy/04-claude-code-em-acao.md` | Contexto suficiente e relevante | Reescrever prompt vago com contexto |
| Making changes | `academy/04-claude-code-em-acao.md` | Mudança mínima e validação | Planejar alteração de bug |
| Controlling context | `academy/04-claude-code-em-acao.md` | Busca seletiva, resumo, revalidação | Dizer quais arquivos ler primeiro |
| Custom commands | `academy/04-claude-code-em-acao.md` | Workflows invocáveis e repetíveis | Criar `/review-pr` |
| MCP servers with Claude Code | `academy/04-claude-code-em-acao.md` | Conectar dados e ações externas | Desenhar MCP read-only para docs |
| GitHub integration | `academy/04-claude-code-em-acao.md` | PR review, issues, release notes | Escrever critérios de review |
| Introducing hooks | `academy/04-claude-code-em-acao.md` | Hooks como controle determinístico | Dizer quando hook supera prompt |
| Defining hooks | `academy/04-claude-code-em-acao.md` | Evento, input, regra, allow/deny | Definir hook de comando perigoso |
| Implementing a hook | `academy/04-claude-code-em-acao.md` | Normalização, teste, mensagem | Criar plano de teste do hook |
| Gotchas around hooks | `academy/04-claude-code-em-acao.md` | Falso positivo, parsing frágil, logs | Criticar hook ruim |
| Useful hooks | `academy/04-claude-code-em-acao.md` | Bloqueios, formatter, teste, auditoria | Listar 10 hooks úteis |
| Another useful hook | `academy/04-claude-code-em-acao.md` | Risk review antes de finalizar | Criar output JSON de risco |
| Claude Code SDK | `academy/04-claude-code-em-acao.md` | Automação programática de workflows | Decidir SDK vs uso manual |
| Quiz / Summary | `academy/04-claude-code-em-acao.md`, `practice/simulado-academy-mcp-claude-code-40-questoes.md` | Responder cenários integrados | Fazer simulado e registrar erros |

## 5. Cobertura Cruzada Por Domínio Da Certificação

| Domínio | Conteúdos Academy que mais treinam | Evidência de domínio |
|---|---|---|
| Agentic Architecture & Orchestration | Agents and workflows, parallelization, chaining, routing, workflows vs agents | Você escolhe arquitetura adequada para tarefa aberta, pipeline fixo ou roteamento |
| Tool Design & MCP Integration | MCP, tool use, tool schemas, resources, prompts, server inspector | Você desenha tools claras, resources seguros e prompts reutilizáveis |
| Claude Code Configuration & Workflows | Claude Code setup, context, commands, hooks, GitHub, SDK | Você configura projeto e controla risco de automação |
| Prompt Engineering & Structured Output | System prompts, XML tags, examples, structured data, evals | Você cria prompts testáveis com schema e métrica |
| Context Management & Reliability | RAG, citations, prompt caching, context control, evals | Você preserva fonte, reduz alucinação e mede qualidade |

## 6. Protocolo De Revisão Semanal

Toda semana:

1. Escolha 10 linhas desta matriz.
2. Explique cada uma em voz alta.
3. Crie uma questão em inglês e tradução PT-BR para cada linha.
4. Responda sem olhar.
5. Compare com material do repo.
6. Registre erro no `study-log.md`.
7. Refaça as questões erradas 48 horas depois.

Exemplo simplificado: esta matriz é o mapa de musculação. O curso explica o
movimento; os simulados mostram se você aguenta aplicar sob pressão.
