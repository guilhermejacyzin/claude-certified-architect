# Simulado Academy - MCP E Claude Code - 40 Questões

Questões autorais, bilíngues e progressivas. Cada questão aparece primeiro em
inglês e abaixo em português. O foco é o conteúdo dos blocos "Introduction to
Model Context Protocol" e "Claude Code in Action".

## Nível 1 - Fundamentos

### 1. MCP primitive selection

**Question (EN):**
A team wants Claude to read a static refund policy before answering customers.
Which MCP primitive is the best fit?

**Questão (PT-BR):**
Um time quer que Claude leia uma política estática de reembolso antes de
responder clientes. Qual primitiva MCP é mais adequada?

A. Tool
B. Resource
C. Hook
D. Temperature

Resposta: B.

Explicação: políticas e documentos estáveis são contexto de leitura. Em MCP, isso
é melhor representado como resource.

### 2. Mutating action

**Question (EN):**
Claude must cancel an order in an external system. What MCP primitive should
represent that operation?

**Questão (PT-BR):**
Claude precisa cancelar um pedido em um sistema externo. Qual primitiva MCP deve
representar essa operação?

A. Resource
B. Prompt
C. Tool
D. Citation

Resposta: C.

Explicação: cancelar pedido é ação parametrizada e possivelmente mutating. Deve
ser tool com validação, permissão, confirmação e auditoria.

### 3. Reusable workflow

**Question (EN):**
The support team repeatedly uses the same escalation summary format. Which MCP
primitive fits best?

**Questão (PT-BR):**
O time de suporte usa repetidamente o mesmo formato de resumo de escalonamento.
Qual primitiva MCP se encaixa melhor?

A. Prompt
B. Resource
C. Embedding
D. Bash command

Resposta: A.

Explicação: MCP prompts são bons para templates e workflows reutilizáveis.

### 4. Client responsibility

**Question (EN):**
What is a core responsibility of an MCP client?

**Questão (PT-BR):**
Qual é uma responsabilidade central de um cliente MCP?

A. Permanently store all company secrets.
B. Discover server capabilities and call them when needed.
C. Replace all authorization in external systems.
D. Guess tool schemas from natural language only.

Resposta: B.

Explicação: o cliente descobre capabilities, chama servidor e devolve resultados
ao fluxo do modelo.

### 5. Server responsibility

**Question (EN):**
What should an MCP server do?

**Questão (PT-BR):**
O que um servidor MCP deve fazer?

A. Expose tools, resources, and prompts with explicit contracts.
B. Ignore input validation.
C. Force the model to use every tool.
D. Store conversation history forever by default.

Resposta: A.

Explicação: o servidor expõe capabilities e implementa a lógica/contrato delas.

### 6. Claude Code purpose

**Question (EN):**
What best describes Claude Code?

**Questão (PT-BR):**
O que melhor descreve Claude Code?

A. A generic chatbot with no access to project files.
B. A development agent surface that can inspect, edit, run commands, and iterate.
C. A replacement for all tests.
D. A database query language.

Resposta: B.

Explicação: Claude Code trabalha dentro do projeto com ferramentas de
desenvolvimento e validação.

### 7. Project memory

**Question (EN):**
Where should stable project-wide instructions such as test commands and
architecture overview live?

**Questão (PT-BR):**
Onde devem ficar instruções estáveis do projeto, como comandos de teste e visão
geral de arquitetura?

A. Only in the user's memory.
B. In `CLAUDE.md`.
C. In a random temporary prompt.
D. In a production database table.

Resposta: B.

Explicação: `CLAUDE.md` funciona como memória/instrução estável de projeto.

### 8. Path-specific convention

**Question (EN):**
A monorepo has different conventions for frontend and backend. What should you
use?

**Questão (PT-BR):**
Um monorepo tem convenções diferentes para frontend e backend. O que você deve
usar?

A. Path-specific rules.
B. One vague global instruction.
C. Higher temperature.
D. No project context.

Resposta: A.

Explicação: rules por caminho aplicam instruções apenas onde são relevantes.

## Nível 2 - Aplicação

### 9. Bad tool design

**Question (EN):**
A tool named `manage_everything` reads accounts, deletes users, issues refunds,
and updates addresses. What is the best fix?

**Questão (PT-BR):**
Uma tool chamada `manage_everything` lê contas, deleta usuários, emite
reembolsos e atualiza endereços. Qual é o melhor ajuste?

A. Keep it and add "be careful" to the prompt.
B. Split operations by intent, risk, permissions, and schema.
C. Remove all schemas.
D. Increase max tokens.

Resposta: B.

Explicação: tools amplas confundem o modelo e dificultam controles. Separar por
risco e intenção melhora escolha, permissão e auditoria.

### 10. Tool description

**Question (EN):**
Which tool description is strongest?

**Questão (PT-BR):**
Qual descrição de tool é mais forte?

A. "Gets data."
B. "Order stuff."
C. "Read-only lookup for a single order by verified order ID. Use before refund or cancellation decisions. Do not use for customer profile."
D. "Useful function."

Resposta: C.

Explicação: a descrição informa escopo, read-only, pré-requisito, quando usar e
quando não usar.

### 11. Inspector usage

**Question (EN):**
Before connecting an MCP server to a real client, what should you verify with an
inspector?

**Questão (PT-BR):**
Antes de conectar um servidor MCP a um cliente real, o que você deve verificar
com um inspector?

A. Only whether the server has a logo.
B. Tool/resource/prompt listing, schemas, valid calls, invalid calls, errors, and safe outputs.
C. Whether the model likes the server name.
D. Whether all tools can bypass permissions.

Resposta: B.

Explicação: inspector valida contrato e comportamento antes do uso real.

### 12. Structured error

**Question (EN):**
A tool times out calling an external CRM. Which response is best?

**Questão (PT-BR):**
Uma tool dá timeout ao chamar um CRM externo. Qual resposta é melhor?

A. `{ "error": "failed" }`
B. `{ "isError": true, "error_type": "transient", "retryable": true, "next_action": "retry_with_backoff" }`
C. `{ "success": true, "data": null }`
D. A final customer answer pretending the data was found.

Resposta: B.

Explicação: timeout é erro transitório. O agente precisa saber que pode tentar
novamente com backoff.

### 13. Context before editing

**Question (EN):**
Claude Code is asked to fix a bug in an unfamiliar repository. What is the best
first workflow?

**Questão (PT-BR):**
Claude Code recebe a tarefa de corrigir um bug em um repositório desconhecido.
Qual é o melhor primeiro workflow?

A. Edit the most likely file immediately.
B. Inspect Git status, search relevant symbols, read selectively, then change narrowly.
C. Read every file in the repository.
D. Delete generated files to simplify context.

Resposta: B.

Explicação: exploração seletiva reduz risco e preserva contexto.

### 14. Dirty worktree

**Question (EN):**
Claude Code sees uncommitted changes it did not make. What should it do?

**Questão (PT-BR):**
Claude Code vê mudanças não commitadas que não fez. O que deve fazer?

A. Revert them automatically.
B. Ignore them if unrelated and work with them if they affect the task.
C. Delete the repository.
D. Commit them without review.

Resposta: B.

Explicação: mudanças existentes podem ser do usuário. Não devem ser revertidas
sem pedido explícito.

### 15. Custom command

**Question (EN):**
The team repeatedly asks Claude Code to review pull requests using the same
criteria. What should they create?

**Questão (PT-BR):**
O time pede repetidamente que Claude Code revise pull requests usando os mesmos
critérios. O que deve criar?

A. A custom slash command.
B. A random one-off prompt.
C. A higher temperature setting.
D. A broad mutating tool.

Resposta: A.

Explicação: slash commands padronizam workflows repetíveis.

### 16. Skill activation

**Question (EN):**
When is a Claude Code skill a strong fit?

**Questão (PT-BR):**
Quando uma skill do Claude Code é uma boa escolha?

A. When specialized instructions and references should be loaded only when relevant.
B. When a destructive command must be blocked.
C. When a static policy should be exposed through MCP.
D. When no reusable knowledge exists.

Resposta: A.

Explicação: skills são capacidades especializadas carregadas sob demanda.

## Nível 3 - Arquitetura

### 17. Hook versus prompt

**Question (EN):**
A company must block destructive shell commands before they run. What is the
strongest control?

**Questão (PT-BR):**
Uma empresa precisa bloquear comandos shell destrutivos antes que rodem. Qual é
o controle mais forte?

A. A prompt asking Claude not to do it.
B. A PreToolUse hook or permission gate that denies the command.
C. A note in a meeting.
D. A longer final answer.

Resposta: B.

Explicação: bloqueio determinístico deve ficar em hook/gate/código.

### 18. Hook gotcha

**Question (EN):**
A hook blocks every command containing the substring `rm`, including harmless
commands like `npm`. What is the issue?

**Questão (PT-BR):**
Um hook bloqueia todo comando contendo a substring `rm`, inclusive comandos
inofensivos como `npm`. Qual é o problema?

A. The hook uses brittle string matching and causes false positives.
B. The hook is too well calibrated.
C. Claude should never run tests.
D. The project has too much documentation.

Resposta: A.

Explicação: hooks precisam normalizar e analisar intenção/estrutura com cuidado,
senão bloqueiam casos legítimos.

### 19. GitHub PR review

**Question (EN):**
A Claude Code PR reviewer produces many style comments and blocks useful PRs.
What design change best reduces noise?

**Questão (PT-BR):**
Um revisor de PR com Claude Code gera muitos comentários de estilo e bloqueia
PRs úteis. Qual mudança de design reduz melhor o ruído?

A. Review the entire repository and comment on every preference.
B. Restrict to diff, require evidence, severity, confidence, and bug criteria.
C. Disable all validation.
D. Always block if any comment exists.

Resposta: B.

Explicação: critérios claros e evidência reduzem falso positivo.

### 20. SDK choice

**Question (EN):**
When is the Claude Code SDK more appropriate than a manual conversation?

**Questão (PT-BR):**
Quando o Claude Code SDK é mais apropriado do que uma conversa manual?

A. For a one-off explanation.
B. For a repeatable automated development workflow with programmatic control and audit needs.
C. For avoiding all tests.
D. For storing secrets in prompts.

Resposta: B.

Explicação: SDK serve para automatizar workflows repetíveis com controle e
integração programática.

### 21. Resource scope

**Question (EN):**
An MCP server exposes a single resource called `company://all-data`. What is the
main architectural problem?

**Questão (PT-BR):**
Um servidor MCP expõe um único resource chamado `company://all-data`. Qual é o
principal problema arquitetural?

A. It is too narrow.
B. It has excessive scope and likely violates least privilege.
C. It is a perfect resource design.
D. It should be a prompt only.

Resposta: B.

Explicação: resource amplo demais dificulta autorização, relevância e segurança.

### 22. Tool availability

**Question (EN):**
An agent has 80 similar tools and often chooses incorrectly. What helps most?

**Questão (PT-BR):**
Um agente tem 80 tools parecidas e frequentemente escolhe errado. O que mais
ajuda?

A. Progressive tool availability, clearer names, descriptions, and schemas.
B. Remove all descriptions.
C. Make every tool name shorter and identical.
D. Increase randomness.

Resposta: A.

Explicação: reduzir ambiguidade e expor tools conforme a etapa melhora seleção.

### 23. Prompt caching

**Question (EN):**
Which part of a prompt is a good candidate for prompt caching?

**Questão (PT-BR):**
Qual parte de um prompt é boa candidata para prompt caching?

A. Stable, repeated context used across many requests.
B. A one-time user question.
C. A temporary secret.
D. Randomized examples that change every call.

Resposta: A.

Explicação: caching ajuda com contexto estável e repetido, reduzindo custo e
latência.

### 24. RAG authorization

**Question (EN):**
Why does RAG not replace authorization?

**Questão (PT-BR):**
Por que RAG não substitui autorização?

A. Because retrieving a document does not prove the user is allowed to see it.
B. Because RAG always returns perfect answers.
C. Because embeddings are equivalent to access control.
D. Because citations remove all risk.

Resposta: A.

Explicação: autorização precisa ser aplicada antes/durante recuperação e acesso
a dados.

### 25. Multi-index RAG

**Question (EN):**
When is a multi-index RAG pipeline useful?

**Questão (PT-BR):**
Quando um pipeline RAG multi-index é útil?

A. When different source types need different retrieval strategies.
B. When there is only one small document.
C. When citations are forbidden.
D. When all documents are identical.

Resposta: A.

Explicação: docs, tickets, código e políticas podem exigir índices e busca
diferentes.

### 26. Model-based grading

**Question (EN):**
What is a risk of model-based grading?

**Questão (PT-BR):**
Qual é um risco de avaliação baseada em modelo?

A. It may be inconsistent or biased unless calibrated with a clear rubric and examples.
B. It is always deterministic.
C. It eliminates the need for datasets.
D. It cannot evaluate summaries.

Resposta: A.

Explicação: juiz modelo precisa de rubrica, exemplos e calibração.

### 27. Code-based grading

**Question (EN):**
When is code-based grading strongest?

**Questão (PT-BR):**
Quando avaliação baseada em código é mais forte?

A. When objective checks can validate format or exact fields.
B. When judging writing style only.
C. When the expected answer is purely subjective.
D. When no schema exists.

Resposta: A.

Explicação: validações determinísticas funcionam bem para schema, tipos, campos
e regras objetivas.

### 28. Context control

**Question (EN):**
Claude Code resumes an old session after files changed. What should it do before
continuing?

**Questão (PT-BR):**
Claude Code retoma uma sessão antiga depois que arquivos mudaram. O que deve
fazer antes de continuar?

A. Trust old context completely.
B. Revalidate relevant files and update the working understanding.
C. Delete old files.
D. Ignore the repository.

Resposta: B.

Explicação: contexto antigo pode estar obsoleto. Revalidação evita erro.

## Nível 4 - Produção

### 29. Human approval

**Question (EN):**
A refund above a threshold requires manager approval. Where should enforcement
live?

**Questão (PT-BR):**
Um reembolso acima de um limite exige aprovação de gerente. Onde deve ficar o
enforcement?

A. Only in the prompt.
B. In the refund tool, policy gate, or hook, with audit.
C. In the final answer only.
D. Nowhere; trust the model.

Resposta: B.

Explicação: política crítica precisa ser aplicada por controle determinístico.

### 30. Tool result loop

**Question (EN):**
Claude returns a `tool_use` block. The application executes the tool. What must
happen next?

**Questão (PT-BR):**
Claude retorna um bloco `tool_use`. A aplicação executa a tool. O que precisa
acontecer depois?

A. Drop the result.
B. Append the tool result to the conversation and call Claude again.
C. Start over from scratch.
D. Pretend the model already knows the result.

Resposta: B.

Explicação: o modelo precisa observar o resultado da tool no histórico para
continuar.

### 31. Least privilege

**Question (EN):**
Why should different subagents receive different tool permissions?

**Questão (PT-BR):**
Por que subagentes diferentes devem receber permissões diferentes de tools?

A. To reduce risk and confusion by following least privilege.
B. To make debugging impossible.
C. To force every subagent to do everything.
D. To avoid using tools at all.

Resposta: A.

Explicação: permissões mínimas reduzem superfície de erro e abuso.

### 32. Workflow versus agent

**Question (EN):**
Which task is a better fit for a fixed workflow than an autonomous agent?

**Questão (PT-BR):**
Qual tarefa é mais adequada para workflow fixo do que para agente autônomo?

A. Investigating an unknown production incident with unclear causes.
B. Running a predictable extract-validate-save document pipeline.
C. Researching an ambiguous market landscape.
D. Exploring an unfamiliar codebase for the first time.

Resposta: B.

Explicação: pipeline previsível e repetível combina com workflow fixo.

### 33. Routing workflow

**Question (EN):**
When does routing help?

**Questão (PT-BR):**
Quando routing ajuda?

A. When inputs should be classified and sent to specialized paths.
B. When every task is identical.
C. When no category exists.
D. When all tools must always be enabled.

Resposta: A.

Explicação: routing escolhe caminho conforme categoria e critérios.

### 34. Parallelization

**Question (EN):**
When is parallelization safe?

**Questão (PT-BR):**
Quando paralelização é segura?

A. When subtasks are independent and outputs can be aggregated.
B. When each step depends on the previous result.
C. When every worker writes the same file.
D. When there is no output contract.

Resposta: A.

Explicação: tarefas independentes com contrato comum são boas para paralelismo.

### 35. Citations

**Question (EN):**
Why are citations important in a RAG answer?

**Questão (PT-BR):**
Por que citações são importantes em uma resposta RAG?

A. They provide provenance and help audit claims.
B. They make every answer automatically true.
C. They replace retrieval.
D. They hide uncertainty.

Resposta: A.

Explicação: citações conectam afirmações a fontes e facilitam revisão.

### 36. Fine-grained tool calling

**Question (EN):**
What is the purpose of fine-grained tool availability?

**Questão (PT-BR):**
Qual é o objetivo de disponibilidade granular de tools?

A. Expose only the tools relevant to the current step to reduce ambiguity and risk.
B. Expose every tool all the time.
C. Remove schemas.
D. Increase tool names until they are unreadable.

Resposta: A.

Explicação: menos tools no momento certo melhora escolha e segurança.

## Nível 5 - Cenários Integrados

### 37. End-to-end support agent

**Question (EN):**
You are designing a support agent that reads policies, checks orders, calculates
refund eligibility, requests approval for high-value refunds, and writes the
customer response. Which architecture is strongest?

**Questão (PT-BR):**
Você está desenhando um agente de suporte que lê políticas, consulta pedidos,
calcula elegibilidade de reembolso, solicita aprovação para reembolsos altos e
escreve a resposta ao cliente. Qual arquitetura é mais forte?

A. One broad prompt and no tools.
B. Policy resources, read-only lookup tools, a gated approval/refund tool, a reusable response prompt, structured errors, and human escalation for policy gaps.
C. A single unrestricted `do_support` tool.
D. Manual processing only, even for low-risk lookups.

Resposta: B.

Explicação: combina contexto, tools específicas, gates, prompts e escalonamento.

### 38. Claude Code team rollout

**Question (EN):**
A team wants to roll out Claude Code across a monorepo with frontend, backend,
infra, and security-sensitive modules. What rollout plan is strongest?

**Questão (PT-BR):**
Um time quer adotar Claude Code em um monorepo com frontend, backend, infra e
módulos sensíveis de segurança. Qual plano é mais forte?

A. One vague instruction telling Claude to be smart.
B. Project `CLAUDE.md`, path-specific rules, custom commands, skills for specialist reviews, hooks for risky actions, MCP read-only resources, and validation commands.
C. Disable tests to move faster.
D. Give every workflow unrestricted write access.

Resposta: B.

Explicação: rollout maduro combina memória, regras, workflows, capacidades,
controles e validação.

### 39. CI review automation

**Question (EN):**
An organization wants Claude-based CI review, but developers fear noisy comments.
Which design best addresses this?

**Questão (PT-BR):**
Uma organização quer revisão CI com Claude, mas devs temem comentários
ruidosos. Qual design resolve melhor isso?

A. Require findings to include severity, evidence, file/line, confidence, and a plausible failure path; evaluate false positives on historical PRs.
B. Comment on every possible improvement.
C. Block any PR with one suggestion.
D. Avoid a dataset.

Resposta: A.

Explicação: automação de review precisa calibrar precisão e reduzir ruído.

### 40. Production principle

**Question (EN):**
What principle best summarizes reliable Claude architecture with MCP and Claude
Code?

**Questão (PT-BR):**
Qual princípio melhor resume uma arquitetura confiável com Claude, MCP e Claude
Code?

A. Put all guarantees in the model prompt.
B. Put judgment in the model, contracts in schemas, actions in tools, guarantees in code/hooks, context in resources, and escalation in human workflows.
C. Avoid all tools.
D. Hide uncertainty from users.

Resposta: B.

Explicação: arquitetura forte distribui responsabilidades. O modelo raciocina,
mas garantias precisam de contratos, código, validação e revisão quando necessário.
