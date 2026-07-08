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
## Aula pratica completa

Este lab treina o desenho de ferramentas MCP com foco em clareza, seguranca e
boa experiencia para o modelo. Uma tool ruim aumenta ambiguidade: o modelo nao
sabe quando usar, a aplicacao nao sabe validar bem e o auditor nao entende o
que aconteceu. Uma tool boa tem nome especifico, descricao objetiva, schema
restritivo e contrato de erro previsivel.

MCP nao deve virar um "controle remoto universal" sem limites. O servidor MCP
expande as capacidades do cliente, mas tambem aumenta a superficie de ataque.
Por isso, cada tool precisa carregar uma intencao bem definida: leitura,
calculo, solicitacao de aprovacao ou execucao de uma acao ja aprovada.

### Modelo mental

Imagine que voce entrega a alguem uma gaveta com varias chaves. Se todas as
chaves se chamam "fazer coisa", a pessoa pode abrir a porta errada. Se cada
chave tem nome, etiqueta, instrucao e limite de uso, a chance de erro cai
muito. Tools MCP funcionam assim: nomes e schemas sao etiquetas operacionais.

### Passo a passo detalhado

1. Liste as tarefas reais que o agente precisa executar.
2. Separe tarefas de leitura, calculo, preparacao, aprovacao e escrita.
3. Para cada tarefa, escreva um nome no formato verbo + objeto.
4. Evite tools genericas como `execute`, `run`, `manage`, `action` ou
   `order_tool`.
5. Escreva a descricao em duas partes: quando usar e quando nao usar.
6. Defina schema com tipos, campos obrigatorios, enums e limites.
7. Defina se a tool e read-only, state-changing ou destructive.
8. Para tools que mudam estado, exija prerequisitos verificaveis.
9. Padronize erros: `transient`, `permission`, `validation`,
   `business_rule`, `not_found`.
10. Defina o que sera resource: dados consultaveis e estaveis, como politica
    de reembolso ou catalogo de status.
11. Defina o que sera prompt: templates reutilizaveis, como "resumir pedido
    para aprovador".
12. Teste com cinco pedidos ambiguos e veja se o modelo escolhe a tool certa.

### Exemplo simplificado

Uma pessoa pergunta: "veja meu pedido". O agente deve usar uma tool de consulta,
nao uma tool de reembolso. Uma pessoa pergunta: "quanto eu receberia se
cancelasse?". O agente deve calcular, nao executar. Uma pessoa pergunta:
"aprovado pelo gerente, pode processar". O agente ainda precisa validar o ID
da aprovacao antes de chamar a tool que muda estado.

### Exemplo de contrato de tool

```json
{
  "name": "calculate_refund",
  "description": "Use para calcular o valor estimado de reembolso. Nao executa pagamento, nao altera pedido e nao substitui aprovacao.",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id": { "type": "string" },
      "reason": {
        "type": "string",
        "enum": ["duplicate_charge", "late_delivery", "customer_cancelled", "damaged_item", "other"]
      },
      "other_detail": { "type": ["string", "null"] }
    },
    "required": ["order_id", "reason", "other_detail"]
  }
}
```

### Taxonomia recomendada de erros

| Tipo | Quando usar | Resposta esperada do agente |
| --- | --- | --- |
| `transient` | Timeout, rede, indisponibilidade temporaria | tentar novamente com limite |
| `permission` | Usuario ou agente sem permissao | explicar bloqueio e escalar se necessario |
| `validation` | Campo ausente ou formato errado | pedir dado faltante |
| `business_rule` | Regra de negocio impede acao | explicar regra de forma clara |
| `not_found` | Pedido, cliente ou aprovacao inexistente | confirmar dados com usuario |

### Erros comuns que a prova costuma explorar

- Tool generica demais que recebe `action` e `payload`.
- Descricao que so diz "use para pedidos", sem criterio de uso.
- Schema frouxo que aceita qualquer string.
- Tool destrutiva sem aprovacao previa.
- Resource modelado como tool, obrigando chamada desnecessaria.
- Prompt reutilizavel escondido em texto solto no codigo.

### Checklist de dominio

- Consigo justificar por que cada tool existe.
- Consigo apontar quais tools mudam estado.
- Consigo explicar a diferenca entre tool, resource e prompt.
- Consigo criar schemas restritivos sem impedir casos validos.
- Consigo tratar erro de forma recuperavel.
- Consigo auditar quem pediu, o que foi executado e com qual resultado.

### Entregavel do aluno

Entregue catalogo de tools, schema de cada tool, classificacao
read-only/state-changing/destructive, tabela de erros, lista de resources, lista
de prompts e exemplos de chamadas corretas e negadas.
