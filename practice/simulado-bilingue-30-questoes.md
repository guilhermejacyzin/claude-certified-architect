# Simulado Bilíngue - 30 Questões por Complexidade

Questões autorais para estudo. Cada questão aparece primeiro em inglês e logo
abaixo em português. A ordem vai do básico ao avançado.

## Nível 1 - Fundamentos

### 1. Agentic loop termination

**Question (EN):**  
In an agentic loop, Claude returns `stop_reason: "tool_use"`. What should the
application do next?

**Questão (PT-BR):**  
Em um loop agentic, Claude retorna `stop_reason: "tool_use"`. O que a aplicação
deve fazer em seguida?

A. End the loop because Claude already answered.  
B. Execute the requested tool, append the tool result to the conversation, and call Claude again.  
C. Ignore the tool request and ask Claude for a final answer.  
D. Restart the conversation from scratch.

Resposta: B.

Explicação: `tool_use` indica que o modelo solicitou uma ferramenta. A aplicação
executa a tool, devolve o resultado e continua o loop.

### 2. Tool result visibility

**Question (EN):**  
Why must tool results be appended to the conversation history?

**Questão (PT-BR):**  
Por que os resultados de tools precisam ser anexados ao histórico da conversa?

A. So Claude can use the external result in its next reasoning step.  
B. To make the response longer.  
C. To bypass validation.  
D. To prevent all future tool calls.

Resposta: A.

Explicação: Claude só raciocina sobre dados que recebeu no contexto. Se o
resultado da tool não volta ao histórico, o modelo não observa o dado.

### 3. Tool vs resource

**Question (EN):**  
A static refund policy document should be exposed through MCP as what?

**Questão (PT-BR):**  
Um documento estático de política de reembolso deve ser exposto via MCP como o
quê?

A. A mutating tool.  
B. A resource.  
C. A hook.  
D. A batch job.

Resposta: B.

Explicação: Resources expõem contexto/dados para leitura. Tools executam ações.

### 4. Structured output

**Question (EN):**  
When output must be consumed by a downstream system, which approach is strongest?

**Questão (PT-BR):**  
Quando a saída será consumida por um sistema downstream, qual abordagem é mais
forte?

A. Ask for "valid JSON" in natural language only.  
B. Use structured output with a schema and validation.  
C. Ask for a paragraph summary.  
D. Increase the maximum response length.

Resposta: B.

Explicação: Schema e validação criam contrato verificável. Pedir JSON em texto é
mais frágil.

### 5. Plan mode

**Question (EN):**  
Which task is the best fit for plan mode?

**Questão (PT-BR):**  
Qual tarefa é mais adequada para plan mode?

A. Fixing a typo in a README.  
B. Renaming one variable in one file.  
C. Migrating authentication across multiple services.  
D. Formatting a single JSON file.

Resposta: C.

Explicação: Plan mode é adequado para mudanças complexas, multi-arquivo e com
risco arquitetural.

### 6. Subagent context

**Question (EN):**  
What is true about subagent context?

**Questão (PT-BR):**  
O que é verdadeiro sobre o contexto de subagentes?

A. Subagents automatically inherit all parent context.  
B. Subagents need relevant context passed explicitly.  
C. Subagents cannot receive structured data.  
D. Subagents should always have every available tool.

Resposta: B.

Explicação: Subagentes têm contexto isolado. O coordenador precisa passar
objetivo, achados, fontes e critérios.

## Nível 2 - Aplicação

### 7. Refund enforcement

**Question (EN):**  
A refund above a policy limit requires human approval. What is the most reliable
implementation?

**Questão (PT-BR):**  
Um reembolso acima do limite da política exige aprovação humana. Qual é a
implementação mais confiável?

A. Add a prompt instruction telling Claude to be careful.  
B. Add few-shot examples of denied refunds.  
C. Enforce the approval requirement in the refund tool or a hook.  
D. Review all refunds manually at the end of the month.

Resposta: C.

Explicação: Regra crítica precisa de enforcement determinístico. Prompt e
few-shot ajudam, mas não garantem bloqueio.

### 8. Tool naming

**Question (EN):**  
The model confuses `get_data` and `fetch_info`. What is the best first fix?

**Questão (PT-BR):**  
O modelo confunde `get_data` e `fetch_info`. Qual é o melhor primeiro ajuste?

A. Improve tool names, descriptions, schemas, and usage boundaries.  
B. Remove all descriptions.  
C. Ask users to always choose the tool manually.  
D. Increase temperature.

Resposta: A.

Explicação: Tool selection melhora quando nome, descrição, schema e limites são
claros.

### 9. Nullable fields

**Question (EN):**  
A contract may not include an end date. How should the schema represent that?

**Questão (PT-BR):**  
Um contrato pode não incluir data de término. Como o schema deve representar
isso?

A. Require a non-empty string.  
B. Allow `null` and optionally include an absence reason.  
C. Force Claude to infer the date.  
D. Remove the field from all outputs.

Resposta: B.

Explicação: Nullable evita que o modelo invente dados ausentes.

### 10. Error handling

**Question (EN):**  
A tool times out while calling an external service. Which error response is most
useful?

**Questão (PT-BR):**  
Uma tool dá timeout ao chamar um serviço externo. Qual resposta de erro é mais
útil?

A. `{ "error": "failed" }`  
B. A structured transient error with `retryable: true` and next action guidance.  
C. A successful empty response.  
D. A business-rule error with no retry.

Resposta: B.

Explicação: Timeout é erro transitório; o agente precisa saber se pode tentar
novamente.

### 11. Claude Code rules

**Question (EN):**  
A monorepo has React frontend files and Python backend files. Claude applies
React conventions to Python files. What should you use?

**Questão (PT-BR):**  
Um monorepo tem frontend React e backend Python. Claude aplica convenções React
em arquivos Python. O que você deve usar?

A. Path-specific rules.  
B. A larger global README.  
C. No project instructions.  
D. A batch processing job.

Resposta: A.

Explicação: Rules por caminho carregam convenções somente onde são relevantes.

### 12. Handoff

**Question (EN):**  
When escalating to a human who cannot see the full conversation, what should the
agent provide?

**Questão (PT-BR):**  
Ao escalonar para um humano que não vê toda a conversa, o que o agente deve
fornecer?

A. Only "please help".  
B. A structured summary with facts, evidence, attempted steps, issue, and recommendation.  
C. Nothing; the human should ask again.  
D. Only the user's last message.

Resposta: B.

Explicação: Handoff bom reduz retrabalho e preserva contexto operacional.

## Nível 3 - Arquitetura

### 13. Coordinator-subagent design

**Question (EN):**  
A research system needs web search, document analysis, synthesis, and final
review. Which architecture is most appropriate?

**Questão (PT-BR):**  
Um sistema de pesquisa precisa de busca web, análise documental, síntese e
revisão final. Qual arquitetura é mais adequada?

A. One agent with every tool and no structure.  
B. A coordinator that delegates to specialized subagents and aggregates results.  
C. A fixed prompt with no tools.  
D. A single batch request without provenance.

Resposta: B.

Explicação: Coordinator-subagent permite especialização, controle de contexto,
paralelismo e síntese com fontes.

### 14. Parallel subagents

**Question (EN):**  
When is it safe and useful to run subagents in parallel?

**Questão (PT-BR):**  
Quando é seguro e útil executar subagentes em paralelo?

A. When subtasks are independent and have clear scopes.  
B. When each subtask depends on the previous result.  
C. When no output format is defined.  
D. When all subagents need unrestricted write access.

Resposta: A.

Explicação: Paralelismo funciona quando as tarefas não dependem umas das outras
e cada subagente recebe escopo claro.

### 15. Tool distribution

**Question (EN):**  
Why should different subagents have different tool permissions?

**Questão (PT-BR):**  
Por que subagentes diferentes devem ter permissões de tools diferentes?

A. To follow least privilege and reduce risk.  
B. To make every subagent identical.  
C. To prevent all tool use.  
D. To remove the need for a coordinator.

Resposta: A.

Explicação: Menos permissões reduzem risco, confusão e superfície de erro.

### 16. Hook vs prompt

**Question (EN):**  
A company policy must block destructive commands. What is the strongest control?

**Questão (PT-BR):**  
Uma política da empresa precisa bloquear comandos destrutivos. Qual é o controle
mais forte?

A. A prompt asking Claude not to run them.  
B. A PreToolUse hook or permission gate that denies the command.  
C. A longer explanation in the README.  
D. A postmortem after damage happens.

Resposta: B.

Explicação: Hooks/gates oferecem bloqueio determinístico antes da ação.

### 17. MCP prompt

**Question (EN):**  
A team repeatedly needs the same escalation summary format. What MCP feature
fits best?

**Questão (PT-BR):**  
Um time precisa repetidamente do mesmo formato de resumo de escalonamento. Qual
recurso do MCP se encaixa melhor?

A. Prompt.  
B. Mutating tool.  
C. Resource only.  
D. Context window expansion.

Resposta: A.

Explicação: MCP prompts são bons para workflows/templates reutilizáveis.

### 18. Large tool sets

**Question (EN):**  
An agent has too many similar tools and often chooses the wrong one. What design
principle helps?

**Questão (PT-BR):**  
Um agente tem muitas tools parecidas e frequentemente escolhe a errada. Qual
princípio de design ajuda?

A. Progressive availability and clearer tool boundaries.  
B. Remove all schemas.  
C. Give every tool the same description.  
D. Force every task through Bash.

Resposta: A.

Explicação: Disponibilizar tools conforme necessidade e melhorar boundaries
reduz ambiguidade.

## Nível 4 - Produção e Confiabilidade

### 19. Context window

**Question (EN):**  
The agent must analyze a very large codebase. What is the best initial strategy?

**Questão (PT-BR):**  
O agente precisa analisar uma codebase muito grande. Qual é a melhor estratégia
inicial?

A. Read every file immediately.  
B. Use discovery tools like Glob/Grep, then read selectively and maintain a scratchpad.  
C. Ask Claude to guess the architecture.  
D. Ignore context limits.

Resposta: B.

Explicação: Descoberta seletiva e scratchpad preservam contexto útil.

### 20. Provenance

**Question (EN):**  
A multi-source report makes several claims. What should each important claim
include?

**Questão (PT-BR):**  
Um relatório com múltiplas fontes faz várias afirmações. O que cada afirmação
importante deve incluir?

A. Source, date, evidence, and uncertainty when relevant.  
B. Only a confident tone.  
C. No citations to keep it short.  
D. A random source at the end.

Resposta: A.

Explicação: Proveniência permite auditoria e evita síntese sem base.

### 21. Conflicting sources

**Question (EN):**  
Two credible sources disagree. What should the synthesis do?

**Questão (PT-BR):**  
Duas fontes confiáveis discordam. O que a síntese deve fazer?

A. Pick one without explanation.  
B. Preserve both values with sources and explain possible reasons for conflict.  
C. Average the values automatically.  
D. Hide the conflict.

Resposta: B.

Explicação: Conflitos devem ser transparentes, com fonte e contexto.

### 22. Confidence calibration

**Question (EN):**  
Why is field-level confidence not enough by itself?

**Questão (PT-BR):**  
Por que confidence por campo não é suficiente sozinha?

A. It must be calibrated against labeled data to know whether it predicts accuracy.  
B. It always guarantees correctness.  
C. It replaces validation.  
D. It makes human review unnecessary.

Resposta: A.

Explicação: Confidence sem calibração pode dar falsa segurança.

### 23. Batch processing

**Question (EN):**  
When is the Message Batches pattern appropriate?

**Questão (PT-BR):**  
Quando o padrão Message Batches é apropriado?

A. High-volume independent work with latency tolerance.  
B. Real-time multi-turn tool workflows.  
C. Tasks where every item depends on the previous answer.  
D. Interactive customer support decisions.

Resposta: A.

Explicação: Batch serve para volume independente e tolerância a latência.

### 24. Stale session state

**Question (EN):**  
Claude resumes an old coding session, but files changed after the prior
analysis. What should happen?

**Questão (PT-BR):**  
Claude retoma uma sessão antiga de código, mas arquivos mudaram após a análise
anterior. O que deve acontecer?

A. Continue from old tool results without checking.  
B. Revalidate relevant files and update the working summary.  
C. Delete all project files.  
D. Ignore the prior context entirely.

Resposta: B.

Explicação: Estado antigo pode estar obsoleto. Revalidação evita decisões
baseadas em contexto velho.

## Nível 5 - Cenários Integrados

### 25. Customer support agent

**Question (EN):**  
A support agent handles billing disputes, account questions, and refunds. Which
design best balances autonomy and safety?

**Questão (PT-BR):**  
Um agente de suporte trata disputas de cobrança, dúvidas de conta e reembolsos.
Qual design equilibra melhor autonomia e segurança?

A. Let Claude decide all actions from the prompt.  
B. Use read-only tools freely, enforce gates for risky actions, and escalate policy gaps.  
C. Escalate every request before using tools.  
D. Use one generic backend tool for everything.

Resposta: B.

Explicação: Boa arquitetura permite autonomia em baixo risco e controle
determinístico em ações sensíveis.

### 26. CI review pipeline

**Question (EN):**  
A CI pipeline uses Claude Code for pull request review. It must minimize false
positives. Which design is strongest?

**Questão (PT-BR):**  
Um pipeline de CI usa Claude Code para revisar Pull Requests. Ele precisa
minimizar falsos positivos. Qual design é mais forte?

A. Review the entire repository and comment on all style preferences.  
B. Review the diff with explicit criteria, structured output, severity, evidence, and confidence.  
C. Block every PR that receives any comment.  
D. Avoid schemas so Claude can be flexible.

Resposta: B.

Explicação: Escopo, critérios, evidência e schema reduzem ruído e tornam a
automação auditável.

### 27. Structured extraction system

**Question (EN):**  
A document extraction system must feed a downstream workflow. Which architecture
is best?

**Questão (PT-BR):**  
Um sistema de extração documental precisa alimentar um workflow downstream. Qual
arquitetura é melhor?

A. Free-form summary with no validation.  
B. Tool use with JSON Schema, validation, retry on fixable errors, confidence, and human review for low-confidence fields.  
C. One prompt asking Claude to "be accurate".  
D. Manual processing only, even for simple fields.

Resposta: B.

Explicação: Sistemas downstream precisam contrato, validação e tratamento de
incerteza.

### 28. Research report

**Question (EN):**  
A multi-agent research system must produce a cited report. What is the most
important requirement for subagent outputs?

**Questão (PT-BR):**  
Um sistema multiagente de pesquisa precisa produzir um relatório com citações.
Qual é o requisito mais importante para as saídas dos subagentes?

A. Every output must include claim, source, evidence, and date when available.  
B. Every output should be a long paragraph with no metadata.  
C. Only the final agent needs sources.  
D. Sources should be removed to save context.

Resposta: A.

Explicação: Proveniência precisa ser preservada desde os achados iniciais.

### 29. Developer productivity agent

**Question (EN):**  
A developer productivity agent explores unfamiliar codebases and makes changes.
What workflow is safest?

**Questão (PT-BR):**  
Um agente de produtividade para devs explora codebases desconhecidas e faz
mudanças. Qual workflow é mais seguro?

A. Edit first, understand later.  
B. Discover structure, search symbols, read selectively, plan risky changes, edit narrowly, and run tests.  
C. Read all files into context.  
D. Use Bash for every action.

Resposta: B.

Explicação: Exploração seletiva, plano e validação reduzem risco em codebase
desconhecida.

### 30. End-to-end agent platform

**Question (EN):**  
You are designing a production Claude-based platform with MCP integrations,
Claude Code workflows, structured extraction, and human review. Which principle
best summarizes the architecture?

**Questão (PT-BR):**  
Você está desenhando uma plataforma de produção baseada em Claude com integrações
MCP, workflows de Claude Code, extração estruturada e revisão humana. Qual
princípio melhor resume a arquitetura?

A. Let the model handle all guarantees because it understands the task.  
B. Put judgment in the model, guarantees in code/tools/hooks/schemas, and escalation in human workflows.  
C. Avoid tools and use only long prompts.  
D. Avoid uncertainty by hiding low-confidence cases.

Resposta: B.

Explicação: Essa é a mentalidade central: o modelo raciocina; o sistema garante
política, formato, segurança, auditoria e escalonamento.
