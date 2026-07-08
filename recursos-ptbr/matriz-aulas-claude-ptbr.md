# Matriz Aula A Aula - Recursos PT-BR

Use esta matriz para estudar cada aula com reforço externo em PT-BR. Os IDs dos
recursos vêm de `fontes-curadas-ptbr.md`.

Legenda:

- **Principal**: fonte diretamente ligada a Claude/Anthropic/Claude Code/MCP.
- **Complementar**: fonte em PT-BR que ensina o conceito, mas precisa ser
  reinterpretada para Claude.
- **Lacuna**: tópico ainda precisa de vídeo/artigo PT-BR mais específico.

## 1. Introduction To Agent Skills

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| O que são habilidades? | Skill como capacidade reutilizável carregada sob demanda | DOC-01, HELP-03, YT-02, YT-09, ART-05 |
| Criando sua primeira habilidade | Estrutura de uma Skill, descrição, exemplos e acionamento | HELP-03, YT-09, YT-16, ART-05 |
| Configuração e múltiplos arquivos | Separar instrução, referências, scripts e contexto | HELP-02, HELP-03, ART-03, ART-05 |
| Skills vs funcionalidades do Claude Code | Diferença entre skill, command, hook, MCP e memória | HELP-01, HELP-03, YT-02, YT-09, YT-12 |
| Compartilhando habilidades | Reuso em time, `.claude/`, plugin e empacotamento | HELP-02, HELP-03, ART-05 |
| Troubleshooting de habilidades | Skill não ativa, ativa demais ou consome contexto demais | HELP-03, DOC-19, ART-05 |

## 2. Building With The Claude API

### Introdução E Modelos

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Welcome to the course | O que é construir com Claude | DOC-01, DOC-02, YT-01, YT-02 |
| Overview of Claude models | Quando escolher modelo por custo, latência e capacidade | DOC-01, DOC-20, ART-07 |
| Anthropic overview | Ecossistema Claude, API, apps e Claude Code | DOC-01, YT-01, YT-02, YT-12 |

### Acesso À API

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Accessing the API | Fluxo de autenticação e primeira chamada | DOC-02, DOC-03 |
| Getting an API key | Chave, segredo, ambiente e segurança | DOC-02, DOC-03 |
| Making a request | Messages API, system/user, model, tokens | DOC-02, DOC-03 |
| Multi-turn conversations | Histórico, estado e continuidade | DOC-03, DOC-05 |
| Chat exercise | Montar conversa e avaliar resposta | DOC-02, DOC-03, YT-01 |
| System prompts | Instruções persistentes e escopo | DOC-03, YT-02 |
| System prompts exercise | Iterar prompt a partir de falha | DOC-03, DOC-12 |
| Temperature | Controle de variação | DOC-03; lacuna de vídeo PT-BR Claude-specific |
| Course satisfaction survey | Autoavaliação do bloco | `academy/02-building-with-claude-api.md` |

### Streaming E Saída Estruturada

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Response streaming | SSE, resposta parcial e UX | DOC-03 |
| Structured data | JSON Schema, validação, downstream | DOC-12 |
| Structured data exercise | Criar schema e validar saída | DOC-12, `examples/04-structured-output-10-exemplos.md` |
| Quiz on accessing Claude with the API | API, multi-turn, system e temperature | DOC-02, DOC-03, DOC-12 |

### Prompt Evaluation

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Prompt evaluation | Medir qualidade, não depender de impressão | DOC-12, `docs/14-modulo-prompt-structured-output.md` |
| A typical eval workflow | Dataset, baseline, mudança, decisão | `course/04-especialista.md`, `docs/14-modulo-prompt-structured-output.md` |
| Generating test datasets | Casos fáceis, borda e adversariais | `drills/01-drills-academy.md`; lacuna de vídeo PT-BR Claude-specific |
| Running the eval | Execução repetível e comparação | `docs/14-modulo-prompt-structured-output.md`; lacuna de vídeo PT-BR Claude-specific |
| Model based grading | Rubrica e juiz modelo | `course/04-especialista.md`; lacuna de vídeo PT-BR Claude-specific |
| Code based grading | Validação determinística | DOC-12, `examples/04-structured-output-10-exemplos.md` |
| Exercise on prompt evals | Criar eval para prompt real | `labs/lab-04-structured-output.md` |
| Quiz on prompt evaluation | Decidir métrica e critério | `practice/questoes-comentadas-avancadas.md` |

### Prompt Engineering Techniques

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Prompt engineering | Clareza, especificidade, critérios | DOC-03, YT-02 |
| Being clear and direct | Comando explícito e escopo | DOC-03, YT-02 |
| Being specific | Restrições, formato e evidência | DOC-03, DOC-12 |
| Structure with XML tags | Delimitar contexto, tarefa e formato | DOC-03; lacuna de vídeo PT-BR Claude-specific |
| Providing examples | Few-shot positivo/negativo | DOC-03, `docs/14-modulo-prompt-structured-output.md` |
| Exercise on prompting | Reescrever prompts vagos | `drills/01-drills-academy.md` |
| Quiz on prompt engineering techniques | Julgar prompt bom vs ruim | `practice/simulado-bilingue-30-questoes.md` |

### Tool Use With Claude

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Introducing tool use | Claude decide quando chamar tools | DOC-04, DOC-05 |
| Project overview | Arquitetura de app com tools | DOC-04, DOC-05, DOC-06 |
| Tool functions | Função externa como contrato | DOC-04, DOC-06 |
| Tool schemas | Schema, descrição e validação | DOC-06, DOC-12 |
| Handling message blocks | Blocos `tool_use` e `tool_result` | DOC-05 |
| Sending tool results | Devolver resultado ao histórico | DOC-05 |
| Multi-turn conversations with tools | Loop agentic com ferramentas | DOC-05, `examples/01-agentic-orchestration-10-exemplos.md` |
| Implementing multiple turns | Repetição até `end_turn` | DOC-05 |
| Using multiple tools | Seleção e sequência | DOC-07, DOC-08 |
| Fine grained tool calling | Streaming granular de argumentos | DOC-11; lacuna de vídeo PT-BR Claude-specific |
| The text edit tool | Edição de código com Claude Code | HELP-04, YT-03, YT-05 |
| The web search tool | Web fetch e risco de exfiltração | DOC-16 |
| Quiz on tool use with Claude | Tool vs prompt vs resource | DOC-04, DOC-05, DOC-06 |

### RAG And Agentic Search

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Introducing Retrieval Augmented Generation | Recuperação antes da geração | DOC-17, DOC-18, YT-20, YT-21 |
| Text chunking strategies | Dividir documentos sem perder contexto | DOC-15, DOC-17; lacuna de vídeo PT-BR Claude-specific |
| Text embeddings | Busca semântica e limitações | DOC-17; complementar: YT-20, YT-21 |
| The full RAG flow | Buscar, citar, responder e validar | DOC-17, DOC-18, YT-20 |
| Implementing the RAG flow | Pipeline prático | DOC-17, DOC-18, YT-20, YT-21 |
| BM25 lexical search | Busca lexical para IDs/termos exatos | DOC-07 |
| A Multi-Index RAG pipeline | Combinar fontes e índices | DOC-17, DOC-18; lacuna de vídeo PT-BR Claude-specific |

### Features Of Claude

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Extended thinking | Raciocínio para tarefas complexas | DOC-03, ART-01 |
| Image support | Entrada multimodal | DOC-01, ART-07 |
| PDF support | PDF como texto + imagem, custo e cache | DOC-15 |
| Citations | Proveniência e auditoria | DOC-18 |
| Prompt caching | Reduzir custo/latência de contexto repetido | DOC-13, DOC-14 |
| Rules of prompt caching | Prefixo idêntico, invalidação e cache_control | DOC-13, DOC-14 |
| Prompt caching in action | Aplicar cache em docs/tools | DOC-09, DOC-13, DOC-14 |
| Code execution and Files API | Arquivos e execução controlada | DOC-03, DOC-15 |
| Quiz on features of Claude | Escolher feature correta para cenário | DOC-13, DOC-15, DOC-18, DOC-19 |

## 3. Introduction To Model Context Protocol

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Welcome to the course | MCP como integração padronizada | YT-13, YT-14, YT-15, ART-06 |
| Introducing MCP | Tools, resources e prompts via protocolo | YT-13, YT-14, YT-15, ART-06 |
| MCP clients | Cliente consome capabilities | YT-11, ART-06, HELP-02 |
| Project setup | Setup de servidor/cliente MCP | YT-11, ART-04, ART-06 |
| Defining tools with MCP | Tools com schema e escopo | DOC-04, DOC-06, YT-11, ART-04 |
| The server inspector | Testar servidor MCP | ART-04; lacuna de vídeo PT-BR específico |
| Course satisfaction survey | Autoavaliação | `academy/03-model-context-protocol.md` |
| Implementing a client | Cliente MCP e fluxo request/response | YT-11, ART-06 |
| Defining resources | Contexto/dados legíveis | YT-13, YT-14, DOC-17 |
| Accessing resources | Ler resource e preservar fonte | YT-11, ART-06 |
| Defining prompts | Workflows/templates reutilizáveis | HELP-03, YT-09 |
| Prompts in the client | Cliente puxa template e executa workflow | HELP-03, YT-09 |
| Final assessment on MCP | Classificar tool/resource/prompt | YT-13, YT-14, YT-15 |
| MCP review | Revisar design, risco e contexto | DOC-08, ART-04, YT-11 |

## 4. Claude Code In Action

### What Is Claude Code?

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Introduction | Claude Code como agente de desenvolvimento | HELP-04, YT-03, YT-04, YT-05 |
| What is a coding assistant? | Assistente que lê repo, edita e valida | HELP-04, YT-03, YT-05, ART-03 |
| Claude Code in action | Explorar, planejar, editar, testar | HELP-01, HELP-04, YT-03, YT-04, YT-05 |

### Getting Hands On

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Claude Code setup | Instalação, auth e primeiro projeto | ART-03, YT-06, YT-19 |
| Project setup | `CLAUDE.md`, comandos e regras | HELP-02, HELP-03, ART-03 |
| Adding context | Contexto suficiente e relevante | HELP-01, DOC-19, ART-01, YT-17 |
| Making changes | Edição com escopo e validação | HELP-04, YT-03, YT-18 |
| Course satisfaction survey | Autoavaliação | `academy/04-claude-code-em-acao.md` |
| Controlling context | Busca seletiva, compactação, custo | DOC-19, HELP-01, ART-04 |
| Custom commands | Slash commands e workflows repetíveis | HELP-03, YT-09 |
| MCP servers with Claude Code | Conectar ferramentas externas | HELP-02, YT-10, YT-11, ART-04 |
| GitHub integration | PR review, issues, diffs | HELP-04, YT-05, YT-18 |

### Hooks And SDK

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Introducing hooks | Eventos determinísticos no ciclo do Claude Code | HELP-03, HELP-05, YT-05 |
| Defining hooks | Quando bloquear, validar ou notificar | HELP-03, HELP-05 |
| Implementing a hook | Script, evento e mensagem de retorno | HELP-03, HELP-05 |
| Gotchas around hooks | Falso positivo, logs e comandos inseguros | HELP-03, HELP-05, YT-18 |
| Useful hooks | Formatter, teste, notificação, bloqueio | HELP-03, HELP-05 |
| Another useful hook | Risk review e auditoria antes de finalizar | HELP-01, HELP-05 |
| The Claude Code SDK | Automação programática de workflows | HELP-01, HELP-04; lacuna de vídeo PT-BR específico |

### Wrapping Up

| Aula | O que precisa aprender | Recursos PT-BR |
|---|---|---|
| Quiz on Claude Code | Setup, contexto, hooks, commands, MCP | YT-03, YT-04, YT-05, HELP-03 |
| Summary and next steps | Próximo ciclo de estudo e prática | ART-02, ART-03, YT-07 |

## 5. Lacunas Prioritárias Para Próxima Rodada

Pesquisar mais fontes PT-BR Claude-specific para:

1. Temperature com Claude API.
2. XML tags especificamente em Claude.
3. Prompt evals com Claude.
4. Model-based grading com Claude.
5. Code-based grading com Claude.
6. Fine-grained tool calling.
7. Server inspector MCP em português.
8. Multi-index RAG com Claude.
9. Prompt caching in action em português.
10. Claude Code SDK em português.
