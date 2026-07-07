# Módulo 2 - Tool Design e Integração MCP

Peso no exame: **18%**.

## Objetivo

Você deve projetar interfaces de tools e MCP servers que sejam fáceis para o
modelo escolher, seguras em produção e úteis para integração com sistemas reais.

## 1. MCP em uma frase

MCP é um protocolo para expor capacidades externas a clientes de IA.

Um servidor MCP pode expor:

- **Tools**: ações executáveis pelo modelo.
- **Resources**: contexto/dados que podem ser lidos.
- **Prompts**: templates/workflows reutilizáveis.

## 2. Tool vs resource vs prompt

| Tipo | Use quando | Exemplo |
|---|---|---|
| Tool | Há ação, cálculo, consulta parametrizada ou mudança de estado | `lookup_order(order_id)` |
| Resource | Há dado/contexto navegável ou leitura estável | catálogo de políticas |
| Prompt | Há workflow reutilizável | "revisar PR" |

Pergunta de prova típica:

> "Temos um catálogo de políticas que o agente deve consultar."

Melhor: resource, porque é contexto de leitura.

> "O agente precisa cancelar pedido."

Melhor: tool, porque executa ação.

## 3. Como desenhar uma boa tool

Uma tool boa tem:

- nome específico;
- descrição com quando usar e quando não usar;
- input schema restrito;
- output estruturado;
- erros estruturados;
- boundary clara de permissão;
- ausência de efeitos colaterais surpresa.

### Tool ruim

```json
{
  "name": "manage_order",
  "description": "Manage orders",
  "input": {
    "action": "string",
    "data": "object"
  }
}
```

Problemas:

- nome amplo;
- ação ambígua;
- schema aberto;
- difícil aplicar permissão;
- difícil para o modelo escolher corretamente.

### Tool melhor

```json
{
  "name": "lookup_order",
  "description": "Read-only lookup for a single order by ID. Use before any refund or cancellation decision.",
  "input_schema": {
    "type": "object",
    "required": ["order_id"],
    "properties": {
      "order_id": {
        "type": "string",
        "description": "Internal order identifier."
      }
    }
  }
}
```

Para ação destrutiva:

```json
{
  "name": "cancel_order_after_confirmation",
  "description": "Cancel an order only after identity verification and explicit user confirmation. Do not use for shipped orders.",
  "input_schema": {
    "type": "object",
    "required": ["order_id", "verified_customer_id", "confirmation_id"],
    "properties": {
      "order_id": { "type": "string" },
      "verified_customer_id": { "type": "string" },
      "confirmation_id": { "type": "string" },
      "reason": { "type": "string" }
    }
  }
}
```

## 4. Separar ou consolidar tools?

### Separe quando

- ações têm riscos diferentes;
- permissões são diferentes;
- o modelo confunde parâmetros;
- há pré-requisitos específicos;
- uma operação muda estado e outra é read-only.

### Consolide quando

- as operações são variações pequenas;
- o output é idêntico;
- separar criaria excesso de tools;
- o schema com enum fica claro.

Regra prática:

> Se duas ações teriam controles de segurança diferentes, separe.

## 5. Descrições que ajudam tool selection

Descrição fraca:

```text
Gets customer data.
```

Descrição forte:

```text
Read-only lookup for customer profile by verified customer ID. Use after identity
verification. Does not include payment secrets. Do not use for order history; use
list_customer_orders instead.
```

Inclua:

- read-only ou mutating;
- pré-requisitos;
- escopo;
- quando não usar;
- diferenças em relação a tools parecidas.

## 6. Erros estruturados

Erro livre prejudica recuperação.

Ruim:

```json
{ "error": "failed" }
```

Bom:

```json
{
  "isError": true,
  "error_type": "permission",
  "message": "Refund requires manager approval.",
  "retryable": false,
  "safe_details": {
    "required_approval": "manager"
  },
  "next_action": "escalate_to_human"
}
```

Categorias úteis:

- `transient`: timeout, rate limit temporário;
- `validation`: input inválido;
- `permission`: credencial/permissão insuficiente;
- `business_rule`: política de negócio bloqueou;
- `not_found`: recurso inexistente;
- `conflict`: estado mudou;
- `unsafe`: ação bloqueada por segurança.

## 7. Recuperação local antes de escalar

Nem todo erro precisa de humano.

| Erro | Ação |
|---|---|
| timeout | retry com backoff |
| input inválido | corrigir input se possível |
| not_found | pedir identificador alternativo |
| permission | escalonar ou solicitar permissão |
| business_rule | explicar política ou handoff |
| unsafe | bloquear e oferecer alternativa segura |

## 8. Distribuição de tools entre agentes

Não dê todas as tools para todos os agentes.

Exemplo:

| Agente | Tools |
|---|---|
| Coordenador | Task, search_memory, synthesize |
| Busca | web_search, fetch_url |
| Documento | read_resource, extract_quotes |
| Síntese | nenhuma tool externa, apenas contexto |
| Executor | tools de escrita com gates |

Benefícios:

- reduz confusão;
- reduz risco;
- melhora observabilidade;
- facilita auditoria.

## 9. Built-in tools

Para Claude Code/Agent SDK, memorize seleção:

- `Glob`: descobrir arquivos por padrão.
- `Grep`: buscar texto/símbolos rapidamente.
- `Read`: ler arquivo específico já identificado.
- `Write`: criar arquivo novo.
- `Edit`: alterar arquivo existente.
- `Bash`: executar comando; deve ser usado com cuidado.

Padrão correto em codebase grande:

```text
Glob -> Grep -> Read seletivo -> Edit -> testes
```

Anti-pattern:

```text
Read de todo o repositório sem triagem.
```

## 10. MCP config e escopo

Você pode ter MCPs:

- por usuário;
- por projeto;
- por ambiente;
- com variáveis de ambiente.

Questões podem testar:

- diferença entre escopo global e projeto;
- risco de expor secrets;
- uso de env vars;
- múltiplos servidores MCP acessíveis simultaneamente;
- descrição ruim causando baixa adoção de tools.

## 11. Segurança de tools

Checklist para tool mutating:

- exige confirmação?
- exige identidade verificada?
- exige approval ID?
- tem limite de valor?
- é idempotente?
- tem dry-run?
- retorna audit ID?
- bloqueia input perigoso?
- tem escopo mínimo?

## 12. Exemplo completo: MCP de suporte

Resources:

- `support://policies/refunds`
- `support://policies/escalation`
- `support://templates/handoff`

Tools read-only:

- `get_customer`
- `lookup_order`
- `list_customer_orders`
- `calculate_refund_eligibility`

Tools mutating:

- `request_refund_approval`
- `process_approved_refund`
- `create_support_ticket`

Prompts:

- `refund-resolution-workflow`
- `human-escalation-summary`

## Checklist do domínio

Você domina este domínio se consegue:

- diferenciar tool/resource/prompt;
- escrever tool description boa;
- desenhar schema restrito;
- separar read-only de mutating;
- criar erros estruturados;
- distribuir tools por agente;
- escolher built-in tool correta;
- explicar quando consolidar/separar tools;
- proteger actions com gates.
