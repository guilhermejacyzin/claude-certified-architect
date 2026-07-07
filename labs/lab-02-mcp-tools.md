# Lab 02 - MCP Tool Design

## Objetivo

Projetar tools MCP claras, seguras e fáceis para o modelo escolher.

## Cenário

Você vai criar um MCP para um sistema de pedidos.

## Tools candidatas

Ruim:

- `order_tool(action, payload)`

Melhor:

- `lookup_order(order_id)`
- `list_customer_orders(customer_id, status?)`
- `calculate_refund(order_id, reason)`
- `request_refund_approval(order_id, amount, reason)`
- `process_approved_refund(approval_id)`

## Exercício

1. Escreva nome, descrição e schema de cada tool.
2. Defina quais são read-only e quais modificam estado.
3. Para cada tool, crie 3 erros:
   - transient;
   - permission;
   - business_rule.
4. Explique o que deve ser MCP resource em vez de tool.

## Critérios de sucesso

- A descrição deixa claro quando usar e quando não usar.
- Tools destrutivas têm pré-requisitos.
- Erros ajudam recuperação local antes de escalonamento.
- Não há tool genérica demais.
