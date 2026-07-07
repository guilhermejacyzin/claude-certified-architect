# 01 - Agentic Architecture & Orchestration: 10 Exemplos Passo a Passo

Todos os exemplos são autorais e em PT-BR. Eles seguem os padrões cobrados na
documentação: loop com `tool_use`, subagentes com contexto explícito, hooks,
handoff, decomposição e controle de estado.

## Exemplo 1 - Agente de suporte com consulta de pedido

### Situação

O usuário pergunta: "Meu pedido 123 pode ser reembolsado?"

### Passo a passo

1. Receber o pedido do usuário.
2. Identificar que falta dado externo: status do pedido.
3. Claude retorna `tool_use` para `lookup_order`.
4. A aplicação executa `lookup_order({ "order_id": "123" })`.
5. A aplicação recebe status, valor, data e política aplicável.
6. A aplicação devolve `tool_result` ao histórico.
7. Claude avalia elegibilidade.
8. Se elegível, pergunta confirmação ou chama tool de cálculo.
9. Se não elegível, explica a política.
10. Se política for ambígua, escalona.

### Decisão correta

O agente não deve responder por memória ou chute. Deve consultar a tool e usar o
resultado no próximo turno.

### Exemplo simplificado

Antes de dizer se a loja devolve o dinheiro, o atendente olha o pedido no
sistema.

## Exemplo 2 - Refund com limite e aprovação

### Situação

Refunds acima de R$ 1.000 exigem aprovação humana.

### Passo a passo

1. Claude identifica intenção de reembolso.
2. Chama `lookup_order`.
3. Chama `calculate_refund_eligibility`.
4. A tool retorna valor recomendado: R$ 1.450.
5. Claude tenta chamar `process_refund`.
6. Hook ou validação da tool intercepta.
7. Sistema verifica ausência de `approval_id`.
8. Tool retorna erro `business_rule`, `retryable:false`.
9. Claude chama ou recomenda `request_refund_approval`.
10. Handoff humano recebe resumo estruturado.

### Decisão correta

Regra financeira crítica fica em gate/hook/tool, não apenas no prompt.

### Exemplo simplificado

Caixa pequeno pode devolver R$ 50. Para R$ 1.450, precisa do gerente.

## Exemplo 3 - Coordenador com subagentes de pesquisa

### Situação

Usuário pede relatório sobre adoção de MCP em empresas.

### Passo a passo

1. Coordenador entende pergunta e critérios.
2. Divide em subtópicos: documentação oficial, casos públicos, riscos.
3. Cria subagente A para documentação oficial.
4. Cria subagente B para exemplos públicos.
5. Cria subagente C para riscos/limitações.
6. Passa para cada um objetivo, escopo e formato.
7. Cada subagente retorna claims com fontes.
8. Coordenador agrega resultados.
9. Coordenador detecta conflito ou lacuna.
10. Coordenador chama síntese final com proveniência.

### Decisão correta

Subagentes devem receber contexto e formato de saída explicitamente.

### Exemplo simplificado

Uma pessoa pesquisa manual, outra pesquisa mercado e outra revisa riscos.

## Exemplo 4 - Subagente de síntese recebendo contexto completo

### Situação

Subagente precisa escrever conclusão de pesquisa.

### Passo a passo

1. Coordenador reúne achados.
2. Converte achados para estrutura: claim, fonte, data, evidência.
3. Define critérios: clareza, fontes, incerteza.
4. Envia tudo no prompt do subagente.
5. Subagente sintetiza sem buscar coisas novas.
6. Subagente mantém fonte por afirmação.
7. Subagente marca conflitos.
8. Subagente lista lacunas.
9. Coordenador revisa cobertura.
10. Coordenador publica resposta final.

### Decisão correta

Não presuma que o subagente sabe o que agentes anteriores descobriram.

### Exemplo simplificado

Para escrever ata, entregue as notas da reunião para quem vai redigir.

## Exemplo 5 - Paralelização segura de subagentes

### Situação

Analisar três documentos independentes.

### Passo a passo

1. Coordenador verifica que documentos são independentes.
2. Cria três subagentes de análise.
3. Cada subagente recebe um documento específico.
4. Cada um recebe o mesmo schema de saída.
5. Todos rodam em paralelo.
6. Cada um retorna resumo, riscos e citações.
7. Coordenador agrega.
8. Coordenador identifica padrões comuns.
9. Coordenador verifica inconsistências.
10. Coordenador gera relatório final.

### Decisão correta

Paralelize quando subtarefas não dependem umas das outras.

### Exemplo simplificado

Três pessoas lendo três contratos ao mesmo tempo.

## Exemplo 6 - Decomposição dinâmica em bug legado

### Situação

Usuário pede: "adicione testes abrangentes ao legado".

### Passo a passo

1. Agente não começa escrevendo testes.
2. Mapeia estrutura do repo.
3. Identifica módulos críticos.
4. Busca arquivos sem cobertura.
5. Lê dependências principais.
6. Define hipóteses de risco.
7. Prioriza áreas com maior impacto.
8. Cria plano de testes.
9. Implementa primeiro teste pequeno.
10. Reavalia plano conforme descobertas.

### Decisão correta

Tarefa aberta pede decomposição adaptativa, não pipeline fixo cego.

### Exemplo simplificado

Antes de consertar uma máquina antiga, descubra quais partes importam mais.

## Exemplo 7 - Prompt chaining para revisão previsível

### Situação

Revisar PR grande.

### Passo a passo

1. Passo 1: analisar arquivos individualmente.
2. Passo 2: registrar findings locais.
3. Passo 3: analisar integração entre arquivos.
4. Passo 4: verificar testes.
5. Passo 5: classificar severidade.
6. Passo 6: remover falso positivo.
7. Passo 7: gerar JSON final.
8. Passo 8: gerar comentário humano.
9. Passo 9: decidir bloqueio pelo threshold.
10. Passo 10: registrar lacunas.

### Decisão correta

Prompt chaining serve bem para revisão previsível em etapas.

### Exemplo simplificado

Primeiro revise cada peça, depois veja se o conjunto encaixa.

## Exemplo 8 - Hook de normalização pós-tool

### Situação

Tools retornam datas em formatos diferentes.

### Passo a passo

1. Agente chama três tools.
2. Tool A retorna timestamp Unix.
3. Tool B retorna ISO.
4. Tool C retorna texto livre.
5. `PostToolUse` intercepta resultados.
6. Hook converte datas para ISO.
7. Hook preserva valor original em metadata.
8. Claude recebe dados normalizados.
9. Claude compara datas corretamente.
10. Resposta final evita confusão.

### Decisão correta

Normalização determinística deve acontecer antes do modelo raciocinar.

### Exemplo simplificado

Todos os relatórios chegam com datas no mesmo formato.

## Exemplo 9 - Handoff humano estruturado

### Situação

Cliente pede exceção não coberta por política.

### Passo a passo

1. Agente consulta política.
2. Não encontra regra aplicável.
3. Agente evita inventar exceção.
4. Compila dados do cliente.
5. Compila histórico do pedido.
6. Lista passos tentados.
7. Explica lacuna da política.
8. Sugere ação recomendada.
9. Envia para humano.
10. Informa ao usuário que o caso foi encaminhado.

### Decisão correta

Escalonamento precisa levar contexto suficiente para decisão.

### Exemplo simplificado

Passar o caso para o gerente com resumo pronto, não só "cliente quer ajuda".

## Exemplo 10 - Retomada de sessão com arquivos alterados

### Situação

Agente retoma sessão antiga, mas outro dev alterou arquivos.

### Passo a passo

1. Agente carrega resumo antigo.
2. Verifica status do repositório.
3. Identifica arquivos modificados desde a análise.
4. Reabre arquivos relevantes.
5. Atualiza scratchpad.
6. Marca fatos antigos como potencialmente obsoletos.
7. Revalida hipóteses.
8. Ajusta plano.
9. Só então edita.
10. Roda testes.

### Decisão correta

Retomar sessão não significa confiar cegamente em tool results antigos.

### Exemplo simplificado

Se o mapa é antigo, confira se a estrada ainda existe.
