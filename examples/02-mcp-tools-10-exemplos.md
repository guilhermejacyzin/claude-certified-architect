# 02 - MCP e Tool Design: 10 Exemplos Passo a Passo

## Exemplo 1 - Transformar requisito em MCP tools

### Situação

O agente precisa trabalhar com pedidos.

### Passo a passo

1. Liste ações possíveis: consultar, listar, cancelar, reembolsar.
2. Separe leitura de escrita.
3. Crie `lookup_order` para consulta.
4. Crie `list_customer_orders` para listagem.
5. Crie `request_cancellation` para iniciar cancelamento.
6. Crie `process_approved_refund` para reembolso aprovado.
7. Defina schema de cada tool.
8. Defina permissões.
9. Defina erros.
10. Teste prompts ambíguos.

### Decisão correta

Não criar uma tool única `order_action`.

### Exemplo simplificado

Consultar pedido e cancelar pedido são botões diferentes.

## Exemplo 2 - Tool read-only

### Situação

Consultar perfil do cliente.

### Passo a passo

1. Nomeie `get_customer_profile`.
2. Descreva como read-only.
3. Exija `customer_id`.
4. Bloqueie retorno de dados sensíveis desnecessários.
5. Retorne status e atributos úteis.
6. Inclua `not_found`.
7. Inclua `permission`.
8. Inclua `safe_details`.
9. Teste customer inexistente.
10. Teste permissão insuficiente.

### Decisão correta

Tool de leitura não deve ter efeito colateral.

### Exemplo simplificado

Olhar cadastro não altera cadastro.

## Exemplo 3 - Tool mutating com aprovação

### Situação

Processar reembolso aprovado.

### Passo a passo

1. Nomeie `process_approved_refund`.
2. Exija `order_id`.
3. Exija `approved_amount`.
4. Exija `approval_id`.
5. Valide se approval existe.
6. Valide se amount bate com aprovação.
7. Execute reembolso.
8. Retorne `refund_id`.
9. Retorne audit trail.
10. Retorne erro se aprovação inválida.

### Decisão correta

Tool mutating exige pré-requisitos verificáveis.

### Exemplo simplificado

Só paga depois que o gerente assinou.

## Exemplo 4 - MCP resource para política

### Situação

Política de suporte deve ser consultada pelo agente.

### Passo a passo

1. Crie resource `support://policies/refunds`.
2. Inclua versão.
3. Inclua data de atualização.
4. Estruture seções.
5. Permita leitura sem ação.
6. Não coloque como tool mutating.
7. Faça o agente citar seção usada.
8. Atualize resource quando política mudar.
9. Teste pergunta de política.
10. Teste política ausente.

### Decisão correta

Política estática é resource, não tool.

### Exemplo simplificado

É um manual na prateleira.

## Exemplo 5 - MCP prompt para handoff

### Situação

Handoff humano deve seguir padrão.

### Passo a passo

1. Crie prompt `human_handoff_summary`.
2. Defina variáveis: cliente, problema, evidência.
3. Defina formato de saída.
4. Inclua lacunas.
5. Inclua recomendação.
6. Inclua urgência.
7. Não inclua dados sensíveis desnecessários.
8. Teste com caso simples.
9. Teste com caso ambíguo.
10. Ajuste template.

### Decisão correta

Prompt MCP serve bem para workflow repetível.

### Exemplo simplificado

Um formulário padrão para passar caso ao próximo atendente.

## Exemplo 6 - Erro transient

### Situação

API externa dá timeout.

### Passo a passo

1. Tool detecta timeout.
2. Retorna `error_type: transient`.
3. Define `retryable: true`.
4. Inclui tentativa realizada.
5. Sugere backoff.
6. Não expõe stack trace sensível.
7. Agente tenta novamente uma vez.
8. Se persistir, informa indisponibilidade.
9. Pode escalonar se SLA exigir.
10. Registra falha.

### Decisão correta

Timeout pode ter retry; regra de negócio não.

### Exemplo simplificado

Linha ocupada: tente de novo depois de alguns segundos.

## Exemplo 7 - Erro business rule

### Situação

Pedido já foi enviado e não pode cancelar.

### Passo a passo

1. Tool valida status.
2. Status é `shipped`.
3. Tool bloqueia cancelamento.
4. Retorna `business_rule`.
5. Define `retryable:false`.
6. Inclui regra aplicável.
7. Sugere alternativa: devolução.
8. Agente explica ao usuário.
9. Agente oferece próximo caminho.
10. Registra tentativa.

### Decisão correta

Não retry regra de negócio.

### Exemplo simplificado

Depois que o pacote saiu, não dá para cancelar; dá para devolver.

## Exemplo 8 - Distribuição de tools por subagente

### Situação

Sistema multiagente de pesquisa.

### Passo a passo

1. Coordenador recebe `Task`.
2. Subagente de busca recebe web tools.
3. Subagente documental recebe read tools.
4. Subagente de síntese não recebe escrita.
5. Subagente crítico recebe apenas leitura do relatório.
6. Tools mutating ficam fora.
7. Cada output é estruturado.
8. Coordenador agrega.
9. Logs mostram qual subagente usou qual tool.
10. Revisão final preserva fontes.

### Decisão correta

Least privilege por agente.

### Exemplo simplificado

Cada pessoa recebe só as chaves de que precisa.

## Exemplo 9 - Tool com paginação

### Situação

Listar tickets de cliente com muitos resultados.

### Passo a passo

1. Tool recebe `customer_id`.
2. Recebe `page_size`.
3. Recebe `cursor`.
4. Retorna lista limitada.
5. Retorna `next_cursor`.
6. Retorna total se disponível.
7. Agente decide se precisa próxima página.
8. Evita carregar tudo.
9. Resume resultados.
10. Pede refinamento se muitos tickets.

### Decisão correta

Paginação evita contexto gigante.

### Exemplo simplificado

Leia uma página do relatório por vez.

## Exemplo 10 - Testar escolha de tool

### Situação

Duas tools parecidas confundem o modelo.

### Passo a passo

1. Crie 20 prompts de teste.
2. Inclua casos ambíguos.
3. Registre tool escolhida.
4. Identifique confusões.
5. Ajuste nome.
6. Ajuste descrição.
7. Ajuste schema.
8. Adicione "quando não usar".
9. Reexecute testes.
10. Compare taxa de acerto.

### Decisão correta

Tool design deve ser testado, não presumido.

### Exemplo simplificado

Se pessoas apertam o botão errado, melhore o rótulo do botão.
