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
## Aula pratica completa

Este lab existe para consolidar um dos conceitos mais importantes da prova:
um agente nao e apenas uma chamada de modelo. Um agente e um ciclo controlado
de decisao, acao, observacao e nova decisao. O modelo decide qual ferramenta
usar, mas a aplicacao continua responsavel por executar a ferramenta, validar
permissoes, registrar evidencias, tratar erros e determinar se o fluxo pode
continuar.

Em sistemas reais, o erro mais perigoso e deixar que o texto gerado pelo modelo
seja o unico mecanismo de controle. Por exemplo: se o sistema procura a frase
"final answer" para encerrar, qualquer variacao de linguagem pode quebrar a
aplicacao. O correto e usar sinais estruturados, como `stop_reason`, blocos de
`tool_use`, blocos de `tool_result` e estados internos da aplicacao.

### Modelo mental

Pense no agente como uma pessoa trabalhando com um checklist obrigatorio. Ela
pode sugerir consultar um pedido, calcular um valor ou pedir aprovacao, mas nao
pode simplesmente transferir dinheiro porque "pareceu correto". O sistema ao
redor do modelo e o que impede a execucao perigosa, confirma identidade, aplica
limites, registra auditoria e decide quando envolver uma pessoa.

### Passo a passo detalhado

1. Receba a solicitacao do usuario e normalize os dados minimos: `customer_id`,
   `order_id`, motivo, valor solicitado e canal de origem.
2. Crie a primeira mensagem para Claude com o objetivo, as tools disponiveis e
   as regras de alto nivel.
3. Envie a requisicao ao modelo.
4. Leia `stop_reason`.
5. Se `stop_reason` indicar `tool_use`, percorra todos os blocos de ferramenta
   solicitados.
6. Antes de executar cada tool, aplique validacoes deterministicas fora do
   prompt. Exemplo: `process_refund` exige cliente verificado e aprovacao previa
   para valores acima do limite.
7. Execute a tool em codigo confiavel.
8. Converta o resultado em `tool_result`, incluindo sucesso, dados minimos,
   erro estruturado quando houver falha e identificador de auditoria.
9. Adicione o `tool_result` ao historico de mensagens.
10. Chame o modelo novamente para que ele raciocine com a observacao nova.
11. Continue ate `stop_reason` indicar encerramento natural, limite de passos,
    escalonamento humano ou erro irrecuperavel.
12. Ao final, gere resposta clara para o usuario e grave o rastro do fluxo.

### Exemplo simplificado

Imagine que alguem pede: "quero reembolso do pedido 123". O agente nao deve
reembolsar imediatamente. Primeiro ele consulta o cliente, depois consulta o
pedido, depois verifica se o pedido e elegivel, depois calcula o valor, depois
checa se o valor passa do limite e so entao decide se pode executar, pedir
aprovacao ou encaminhar a um humano.

### Pseudocodigo esperado

```text
messages = [system, user_request]
state = {
  customer_verified: false,
  refund_approved: false,
  step_count: 0
}

while state.step_count < MAX_STEPS:
  response = call_claude(messages, tools)
  state.step_count += 1

  if response.stop_reason == "tool_use":
    for tool_call in response.tool_uses:
      policy_result = validate_policy(tool_call, state)
      if not policy_result.allowed:
        tool_result = build_denied_result(tool_call, policy_result.reason)
      else:
        tool_result = execute_tool(tool_call)
        update_state_from_result(state, tool_call, tool_result)

      messages.append(tool_result)
    continue

  if response.stop_reason == "end_turn":
    return response.text

return escalate_to_human(build_summary(messages, state))
```

### Erros comuns que a prova costuma explorar

- Tratar uma tool destrutiva como se fosse apenas mais uma resposta textual.
- Colocar regras criticas apenas no system prompt, sem validacao em codigo.
- Nao reenviar `tool_result` ao modelo antes da proxima decisao.
- Nao ter limite de passos, criando loop infinito.
- Retornar erro em linguagem solta, sem campos como `retryable` e
  `next_action`.

### Checklist de dominio

- Consigo explicar a diferenca entre `tool_use` e `tool_result`.
- Consigo desenhar o loop sem depender de frases em texto natural.
- Consigo dizer quais decisoes pertencem ao modelo e quais pertencem ao codigo.
- Consigo impor limites de passos, custo e tempo.
- Consigo criar erro estruturado que permita retry ou escalonamento.

### Entregavel do aluno

Entregue um documento curto com desenho do loop, tabela de tools, politica para
refund, estrutura de erro, exemplo de historico com uma chamada de tool, decisao
final do agente e pontos de auditoria.

### Rubrica de avaliacao

| Criterio | Peso | O que precisa aparecer |
| --- | ---: | --- |
| Controle do loop | 25% | Uso correto de `stop_reason`, limite de passos e encerramento |
| Seguranca | 25% | Gate deterministico antes de tool destrutiva |
| Observabilidade | 15% | Logs, auditoria e resumo de handoff |
| Recuperacao de erro | 20% | Erros estruturados e retries seguros |
| Clareza pedagogica | 15% | Explicacao compreensivel e exemplo simplificado |
