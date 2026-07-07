# Módulo 1 - Arquitetura Agentic e Orquestração

Peso no exame: **27%**. Este é o domínio mais importante.

## Objetivo

Você deve ser capaz de desenhar agentes que executam tarefas multi-etapa,
chamam tools, delegam para subagentes, aplicam regras determinísticas e sabem
quando escalar.

## 1. Agentic loop

### Conceito

Um agentic loop é a estrutura que permite ao modelo agir em ciclos:

1. A aplicação envia mensagens para Claude.
2. Claude responde com texto final ou com solicitação de tool.
3. Se houver tool, a aplicação executa.
4. A aplicação envia o resultado da tool de volta para Claude.
5. Claude usa esse novo contexto para decidir o próximo passo.
6. O ciclo termina quando Claude retorna uma resposta final.

### Pseudocódigo canônico

```text
messages = [user_request]

while true:
    response = call_claude(messages, tools)

    if response.stop_reason == "tool_use":
        for tool_call in response.tool_use_blocks:
            result = execute_tool(tool_call.name, tool_call.input)
            messages.append(assistant_tool_use_block(tool_call))
            messages.append(user_tool_result_block(tool_call.id, result))
        continue

    if response.stop_reason == "end_turn":
        return response.final_text

    handle_other_stop_reasons()
```

### O que cai na prova

Você precisa reconhecer que o loop deve ser guiado por `stop_reason`, não por
texto natural.

Errado:

```text
if "final answer" in assistant_text:
    stop
```

Certo:

```text
if stop_reason == "end_turn":
    stop
if stop_reason == "tool_use":
    execute tools and continue
```

### Por que isso importa

Texto natural é ambíguo. O modelo pode dizer "finalmente" no meio de uma análise
ou pedir uma tool depois de uma frase aparentemente conclusiva. `stop_reason` é
o contrato operacional.

## 2. Tool results no histórico

Depois de executar uma tool, o resultado precisa entrar na conversa. Se isso não
acontece, Claude não tem como usar o dado obtido.

Exemplo:

```text
User: verifique se o pedido 123 pode ser reembolsado.
Claude: tool_use lookup_order({order_id:"123"})
App: executa lookup_order
App: envia tool_result com status, valor, data e política aplicável
Claude: decide se precisa de refund, escalonamento ou resposta final
```

Anti-pattern:

- executar a tool, mas não anexar resultado;
- anexar só "success";
- resumir omitindo dados críticos;
- enviar resultado sem `tool_use_id` correspondente.

## 3. Modelo decide, código garante

Uma distinção essencial:

- O modelo pode decidir qual tool chamar.
- O código deve garantir política, segurança, limites e validação.

Exemplo de refund:

```text
Regra: refund acima de 500 exige aprovação humana.
```

Fraco:

```text
System prompt: nunca processe refund acima de 500.
```

Forte:

```text
process_refund(input):
    if input.amount > 500 and not input.approval_id:
        return policy_error(retryable=false, next_action="escalate")
```

Na prova, prefira sempre enforcement programático para regras críticas.

## 4. Multiagente: coordinator-subagent

### Arquitetura

```text
Usuário
  |
Coordenador
  |-- Subagente de busca
  |-- Subagente de análise documental
  |-- Subagente de síntese
  |-- Subagente de revisão/crítica
```

O coordenador:

- entende o objetivo global;
- decide se a tarefa exige subagentes;
- cria prompts completos para cada subagente;
- recebe outputs estruturados;
- identifica lacunas;
- reitera se necessário;
- produz resposta final com proveniência.

Subagentes:

- não herdam automaticamente todo o contexto;
- recebem contexto explícito;
- têm tools e permissões limitadas;
- retornam achados estruturados.

### Quando usar subagentes

Use subagentes quando:

- a tarefa tem subtarefas independentes;
- há pesquisa ampla;
- há documentos ou fontes diferentes;
- você quer reduzir atenção diluída;
- especialização ajuda;
- execução paralela reduz latência.

Não use quando:

- a tarefa é simples;
- há alta dependência sequencial;
- o overhead de coordenação é maior que o benefício;
- o subagente não receberia contexto suficiente.

## 5. Contexto explícito para subagentes

Erro comum:

```text
Task: sintetize os achados.
```

Melhor:

```text
Task: sintetize os achados abaixo.

Objetivo: responder se X é viável.
Critérios: precisão, fontes, riscos, lacunas.

Achados:
- claim: ...
  source_url: ...
  date: ...
  evidence_excerpt: ...

Output esperado:
- conclusão;
- evidências por claim;
- conflitos;
- lacunas;
- próximos passos.
```

## 6. Paralelização

Quando subtarefas são independentes, o coordenador pode disparar múltiplos
subagentes no mesmo turno.

Bom uso:

- pesquisar fontes acadêmicas;
- analisar documentos diferentes;
- avaliar alternativas arquiteturais independentes.

Mau uso:

- subagente B depende do output de A;
- há risco de duplicação sem divisão clara;
- todos usam as mesmas fontes e produzem redundância.

## 7. Decomposição de tarefas

### Prompt chaining

Bom para workflows previsíveis:

1. extrair dados;
2. validar schema;
3. identificar riscos;
4. gerar resumo final.

### Decomposição dinâmica

Boa para investigação aberta:

1. mapear sistema;
2. identificar hipóteses;
3. criar subtarefas;
4. investigar;
5. replanejar com base em achados.

### Multi-pass review

Bom para code review grande:

1. pass por arquivo;
2. pass de integração;
3. pass de testes;
4. síntese com severidade.

## 8. Hooks

Hooks interceptam eventos.

Use para:

- bloquear ação destrutiva;
- normalizar formatos;
- adicionar contexto;
- validar tool input;
- aprovar/negar permissões;
- redirecionar para escalonamento.

Exemplos:

```text
PreToolUse:
  bloquear process_refund se amount > limite

PostToolUse:
  normalizar timestamps e status codes

PermissionRequest:
  permitir npm test, negar rm -rf
```

## 9. Handoff humano

Handoff ruim:

```text
Cliente precisa de ajuda.
```

Handoff bom:

```text
customer_id: C123
issue: cobrança duplicada
evidence:
  - invoice A cobrada em 2026-07-01
  - invoice B duplicada em 2026-07-02
tools_used:
  - get_customer
  - lookup_invoice
root_cause: possível retry de pagamento
recommended_action: aprovar estorno de R$ X
policy_gap: refund acima de limite exige aprovação
```

## 10. Sessões, retomada e fork

Retomar sessão é útil, mas pode carregar estado obsoleto.

Use retomada quando:

- o contexto ainda é válido;
- arquivos não mudaram;
- você quer continuidade conversacional.

Prefira novo resumo estruturado quando:

- código mudou;
- tool results antigos podem estar obsoletos;
- o contexto ficou poluído;
- você quer reduzir risco de decisão baseada em estado velho.

Fork é útil para explorar alternativas:

- abordagem A: refatoração incremental;
- abordagem B: rewrite parcial;
- abordagem C: wrapper compatível.

## Checklist do domínio

Você domina este domínio se consegue explicar:

- loop com `tool_use` e `end_turn`;
- por que tool result entra no histórico;
- diferença entre prompt e enforcement;
- padrão coordinator-subagent;
- contexto isolado de subagente;
- paralelização segura;
- hooks para política;
- handoff humano estruturado;
- retomada vs novo resumo;
- fork para alternativas.

## Exercício final

Desenhe um agente de suporte com:

- verificação de cliente;
- lookup de pedido;
- cálculo de refund;
- gate determinístico;
- escalonamento;
- resumo final;
- logs/auditoria;
- tratamento de erro transitório.

Depois responda: quais partes são responsabilidade do modelo e quais são
responsabilidade do código?
