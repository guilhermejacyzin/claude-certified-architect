# 01 - Drills Academy

Use estes exercícios para reforçar os conteúdos de Agent Skills, Claude API, MCP
e Claude Code. Eles são deliberadamente repetitivos: o objetivo é reconhecer
padrões de prova rapidamente.

## Drill A - Escolha O Artefato Correto

Escolha entre: `CLAUDE.md`, rule por caminho, skill, slash command, hook, MCP
tool, MCP resource, MCP prompt, structured output, eval.

1. O projeto precisa lembrar comandos de teste e arquitetura geral.
2. A pasta `frontend/` tem padrões diferentes da pasta `backend/`.
3. O time repete toda semana o workflow de gerar release notes.
4. O assistente precisa consultar uma política de reembolso.
5. O assistente precisa cancelar um pedido.
6. O assistente precisa seguir sempre o mesmo formato de handoff.
7. Uma ação destrutiva precisa ser bloqueada antes de executar.
8. A saída será consumida por outro sistema.
9. O time precisa medir se um prompt melhorou.
10. Uma capacidade especializada deve ser carregada só quando relevante.
11. O assistente precisa ler documentação interna via conector.
12. Um PR review precisa reportar achados em JSON.
13. O assistente aplica padrão React em arquivo Python.
14. A empresa quer impedir commit de `.env`.
15. Um resumo executivo precisa seguir formato padrão.

Gabarito:

1. `CLAUDE.md`.
2. Rule por caminho.
3. Slash command.
4. MCP resource.
5. MCP tool.
6. MCP prompt.
7. Hook.
8. Structured output.
9. Eval.
10. Skill.
11. MCP resource ou tool read-only, conforme consulta.
12. Structured output.
13. Rule por caminho.
14. Hook.
15. MCP prompt ou slash command, dependendo se é distribuído via MCP ou projeto.

## Drill B - Tool, Resource Ou Prompt

Classifique e justifique:

| Item | Resposta |
|---|---|
| `support://policies/refunds` | resource |
| `lookup_order(order_id)` | tool |
| `incident_handoff_template` | prompt |
| `docs://architecture/current` | resource |
| `create_jira_ticket(summary, description)` | tool |
| `pull_request_review_workflow` | prompt |
| `calculate_refund_eligibility(order_id)` | tool |
| `product://catalog/pricing` | resource |
| `send_customer_email(ticket_id, body)` | tool |
| `weekly_status_summary_template` | prompt |

Regra de bolso:

- Se lê contexto: resource.
- Se executa operação parametrizada: tool.
- Se padroniza um workflow de linguagem: prompt.

## Drill C - Reescreva A Tool Ruim

Tool ruim:

```json
{
  "name": "customer_action",
  "description": "Does customer actions",
  "input_schema": {
    "type": "object",
    "properties": {
      "action": { "type": "string" },
      "payload": { "type": "object" }
    }
  }
}
```

Reescrita esperada:

1. `get_customer_profile(customer_id)` - read-only.
2. `list_customer_orders(customer_id)` - read-only.
3. `update_customer_address(customer_id, new_address, verification_id)` - mutating.
4. `request_account_deletion(customer_id, confirmation_id, reason)` - mutating crítica.
5. `create_support_ticket(customer_id, category, summary)` - mutating leve.

Para cada tool, responda:

1. Quais campos são obrigatórios?
2. Quais erros podem ocorrer?
3. Qual ação exige confirmação?
4. Qual ação precisa de audit ID?
5. Qual tool nunca deveria retornar segredo?

## Drill D - Erro Estruturado

Transforme cada erro livre em erro estruturado:

1. "failed"
2. "not found"
3. "forbidden"
4. "timeout"
5. "invalid"
6. "policy blocked"

Modelo:

```json
{
  "isError": true,
  "error_type": "validation|permission|transient|not_found|business_rule",
  "message": "Mensagem segura e acionável.",
  "retryable": false,
  "next_action": "ask_user|retry_with_backoff|escalate_to_human|stop"
}
```

Gabarito esperado:

- Timeout: `transient`, `retryable: true`.
- Forbidden: `permission`, `retryable: false`.
- Invalid: `validation`, retry apenas se input puder ser corrigido.
- Policy blocked: `business_rule`, geralmente handoff ou explicação.
- Not found: `not_found`, pedir identificador alternativo.

## Drill E - Prompt Engineering

Reescreva estes prompts para ficarem claros:

1. "Analise isso."
2. "Faça um resumo bom."
3. "Extraia os dados."
4. "Veja se tem erro."
5. "Responda como especialista."

Versões fortes:

1. "Analise o texto abaixo e identifique riscos técnicos, premissas frágeis e
   decisões pendentes. Retorne em tabela com severidade, evidência e recomendação."
2. "Resuma para liderança executiva em até 8 bullets, separando impacto,
   decisão necessária e próximos passos."
3. "Extraia os campos definidos no schema. Use `null` quando o campo não existir
   e inclua `evidence_text` para cada campo preenchido."
4. "Revise o diff procurando apenas bugs com caminho de falha plausível,
   regressão de contrato ou risco de segurança. Ignore estilo."
5. "Explique a arquitetura em três camadas: visão normal, visão técnica e exemplo
   simplificado."

## Drill F - Evals

Para cada caso, escolha métrica:

1. Classificador de tickets.
2. Extração de invoice.
3. Resumo executivo.
4. PR review.
5. Resposta de suporte.
6. RAG com citação.

Gabarito:

1. Accuracy/F1 por categoria.
2. Exact match por campo + validação de schema.
3. Rubrica model-based calibrada + avaliação humana amostral.
4. Precisão de findings, falso positivo, severidade correta.
5. Resolução, aderência à política, segurança, satisfação.
6. Groundedness, citação correta, recall de trechos relevantes.

## Drill G - RAG E Busca

Responda:

1. Quando BM25 pode vencer embedding?
2. Quando embedding vence BM25?
3. Por que chunking ruim prejudica resposta?
4. Por que citação importa?
5. Por que RAG não substitui autorização?
6. Quando usar multi-index?

Gabarito:

1. Termos exatos, IDs, nomes próprios, códigos.
2. Semântica, paráfrases, conceitos.
3. Perde contexto ou mistura assuntos.
4. Permite auditoria e reduz afirmação sem base.
5. Recuperar dado não significa ter permissão para vê-lo.
6. Quando tipos de fonte exigem estratégias diferentes.

## Drill H - Claude Code

Escolha a resposta:

1. Antes de editar em repo desconhecido: buscar estrutura, ler seletivamente,
   checar Git.
2. Mudança de auth multi-serviço: plan mode.
3. Corrigir typo: execução direta.
4. Bloquear `git reset --hard`: hook.
5. Workflow repetido de review: slash command.
6. Convenção só para backend: rule por caminho.
7. Conhecimento especializado longo: skill.
8. Consultar issue externa: MCP.
9. Review em CI: SDK/automação com structured output.
10. Reduzir falso positivo: critérios, evidência, severidade e confidence.

## Drill I - Cenários Integrados

### Cenário 1

Um agente de suporte consulta pedidos, calcula elegibilidade de reembolso e pode
abrir ticket para aprovação. Desenhe tools, resources e prompts.

Resposta esperada:

- Resource: política de reembolso.
- Tool read-only: `lookup_order`.
- Tool read-only: `calculate_refund_eligibility`.
- Tool mutating: `request_refund_approval`.
- Prompt: `refund_handoff_summary`.
- Gate: valor acima do limite exige aprovação.

### Cenário 2

Um agente de desenvolvimento revisa PRs e está gerando muitos comentários de
estilo. Corrija o design.

Resposta esperada:

- Limitar ao diff.
- Definir critérios de bug.
- Exigir evidência e caminho de falha.
- Usar severidade.
- Não bloquear baixa severidade.
- Avaliar falso positivo com dataset histórico.

### Cenário 3

Um servidor MCP expõe `all_company_data` como resource. Qual o problema?

Resposta esperada:

- Escopo amplo demais.
- Risco de vazamento.
- Baixa relevância.
- Dificuldade de autorização.
- Deve separar resources por domínio e permissão.

## Drill J - 20 Perguntas Relâmpago

1. Tool mutating precisa de quê? Gate, validação, auditoria.
2. Resource representa quê? Contexto/dado legível.
3. Prompt MCP representa quê? Workflow/template reutilizável.
4. Hook serve para quê? Controle determinístico.
5. Skill serve para quê? Capacidade especializada sob demanda.
6. Command serve para quê? Workflow invocável.
7. `CLAUDE.md` deve guardar quê? Memória estável de projeto.
8. Structured output reduz o quê? Ambiguidade de formato.
9. Eval mede o quê? Qualidade contra critério.
10. BM25 busca por quê? Termo lexical.
11. Embedding busca por quê? Semântica.
12. Prompt caching ajuda em quê? Custo/latência de contexto estável.
13. Citation ajuda em quê? Proveniência.
14. Temperature alta aumenta quê? Variação.
15. Plan mode é bom para quê? Mudança complexa.
16. Direct execution é bom para quê? Mudança simples.
17. Subagente precisa receber quê? Contexto explícito e objetivo.
18. Tool genérica demais causa quê? Confusão e risco.
19. Erro estruturado precisa indicar quê? Tipo, retryable e next action.
20. Baixa confiança deve gerar quê? Retry, revisão ou handoff.
