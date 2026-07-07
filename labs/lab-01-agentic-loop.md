# Lab 01 - Agentic Loop

## Objetivo

Implementar mentalmente ou em pseudocódigo um loop agentic com tool use,
tratamento de erro e terminação correta.

## Cenário

Um agente de suporte pode chamar:

- `get_customer(customer_id)`
- `lookup_order(order_id)`
- `process_refund(order_id, amount)`
- `escalate_to_human(summary)`

## Exercício

1. Desenhe o loop:
   - enviar mensagens para Claude;
   - checar `stop_reason`;
   - executar tools quando houver `tool_use`;
   - adicionar resultados ao histórico;
   - parar em `end_turn`.
2. Adicione gate determinístico:
   - `process_refund` só pode executar depois de cliente verificado;
   - refund acima de limite exige escalonamento.
3. Defina erro estruturado:
   - `error_type`;
   - `message`;
   - `retryable`;
   - `next_action`.

## Critérios de sucesso

- O loop não depende de texto natural para encerrar.
- Resultado da tool entra no contexto antes da próxima decisão.
- Regras críticas ficam fora do prompt.
- Handoff humano contém dados mínimos úteis.

## Perguntas de revisão

1. Por que `stop_reason` é mais confiável que procurar "final answer" no texto?
2. Onde você bloquearia refund acima do limite?
3. O que o humano precisa receber se o agente escalar?
