# Mapa do Exame

Fonte principal: exam guide oficial local baixado pelo usuário. Este arquivo é
uma tradução/paráfrase de estudo, não uma reprodução do documento.

## Formato

- Questões de múltipla escolha.
- Uma resposta correta por questão.
- Sem penalidade extra por chute; questão sem resposta conta como erro.
- Resultado em escala de 100 a 1.000.
- Nota mínima informada no guia: 720.
- As questões são baseadas em cenários de produção.

## Cenários esperados

O guia descreve seis famílias de cenário. No exame, um subconjunto delas pode
ser usado:

1. Agente de resolução para suporte ao cliente.
2. Geração/refatoração/debug com Claude Code.
3. Sistema multiagente de pesquisa.
4. Produtividade de engenharia com Agent SDK, ferramentas built-in e MCP.
5. Claude Code em CI/CD para review e testes.
6. Extração estruturada de dados a partir de documentos.

## Domínio 1 - Arquitetura Agentic e Orquestração (27%)

Você precisa saber desenhar loops agentic, coordenadores, subagentes, hooks,
handoffs e decomposição de tarefas.

Tópicos:

- Loop baseado em `stop_reason`, especialmente `tool_use` e `end_turn`.
- Inserção de resultados de tool no histórico antes da próxima iteração.
- Diferença entre decisão do modelo e árvore de decisão fixa.
- Padrão coordinator-subagent com contexto isolado.
- Subagentes invocados por `Task` e contexto passado explicitamente.
- Paralelização de subagentes quando há independência.
- Gates determinísticos para regras críticas.
- Hooks para interceptar tool calls e normalizar resultados.
- Decomposição fixa, dinâmica, sequencial e adaptativa.
- Sessões, retomada e fork para explorar alternativas.

## Domínio 2 - Design de Ferramentas e Integração MCP (18%)

Você precisa saber projetar interfaces de tools que guiem o modelo para escolhas
boas e integrem sistemas externos com segurança.

Tópicos:

- Descrições de tools claras, específicas e sem sobreposição ambígua.
- Schemas de entrada objetivos.
- Erros estruturados com categoria, mensagem, retryable e orientação.
- Distribuição de tools entre agente principal e subagentes.
- Quando consolidar vs separar tools.
- MCP tools para ações, resources para contexto e prompts para workflows.
- Configuração de MCP em Claude Code e escopo usuário/projeto.
- Uso efetivo de Read, Write, Edit, Bash, Grep e Glob.

## Domínio 3 - Claude Code: Configuração e Workflows (20%)

Você precisa saber configurar Claude Code para times, projetos, comandos,
skills, rules, plan mode e CI/CD.

Tópicos:

- Hierarquia de `CLAUDE.md`: usuário, projeto e diretório.
- Organização modular e imports.
- Rules path-specific com glob/frontmatter.
- Slash commands e skills com metadata.
- Quando usar plan mode vs execução direta.
- Iteração progressiva com exemplos, testes e feedback.
- Uso de Claude Code em CI/CD com saída estruturada.
- Minimização de falsos positivos em reviews automatizados.

## Domínio 4 - Engenharia de Prompt e Saída Estruturada (20%)

Você precisa saber obter saídas confiáveis, validáveis e úteis para downstream
systems.

Tópicos:

- Critérios explícitos para reduzir falso positivo/falso negativo.
- Few-shot prompting para casos ambíguos.
- JSON Schema e tool use para estrutura.
- Campos obrigatórios, opcionais, nullable, enum e fallback `other`.
- Loops de validação, retry e feedback.
- Extração de dados com confiança por campo.
- Batch processing e correlação por `custom_id`.
- Arquiteturas multi-pass e multi-instance.

## Domínio 5 - Gestão de Contexto e Confiabilidade (15%)

Você precisa saber preservar informação crítica, lidar com incerteza, escalonar
e manter proveniência.

Tópicos:

- Gestão de context window e perda no meio.
- Sumarização progressiva e extração de fatos.
- Scratchpads/manifests para estado.
- Estratégias de escalonamento humano.
- Propagação de erro em sistemas multiagente.
- Exploração de codebase grande sem inundar contexto.
- Confidence calibration e revisão humana.
- Proveniência claim-source, datas e conflitos entre fontes.

## Fora de Escopo

O guia indica que não é foco: fine-tuning, billing/autenticação da conta,
infraestrutura detalhada de cloud, visão, computer use, detalhes de streaming,
implementação profunda de embeddings/vector DB e detalhes internos do modelo.
