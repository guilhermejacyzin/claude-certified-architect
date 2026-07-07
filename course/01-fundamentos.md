# 01 - Nível Fundamentos

Objetivo: sair do zero até entender a linguagem da certificação.

## Aula 1 - O que é uma solução agentic

### Explicação normal

Uma solução agentic é uma solução em que Claude não apenas responde texto. Ele
pode decidir usar ferramentas, consultar sistemas, delegar tarefas e continuar
trabalhando em ciclos.

### Explicação técnica

O componente central é o agentic loop:

1. enviar mensagens;
2. receber `tool_use` ou resposta final;
3. executar tools;
4. devolver `tool_result`;
5. repetir até `end_turn`.

### Exemplo simplificado

Um atendente consulta o sistema antes de responder.

### Atividade

Desenhe um fluxo para responder: "Meu pedido chegou atrasado?"

Inclua:

- tool de consulta;
- resultado;
- resposta final;
- caso de erro.

### Critério de conclusão

Você deve explicar por que o loop não pode terminar procurando uma frase no
texto do assistente.

## Aula 2 - Tools, resources e prompts

### Explicação normal

MCP organiza como Claude acessa capacidades externas:

- tools são botões de ação;
- resources são materiais para leitura;
- prompts são modelos de workflow.

### Explicação técnica

Use:

- tool para ação ou consulta parametrizada;
- resource para dado/contexto;
- prompt para fluxo reutilizável.

### Exemplo simplificado

Manual é resource. Botão "consultar pedido" é tool. Formulário de passagem de
caso é prompt.

### Atividade

Classifique:

1. política de reembolso;
2. cancelar pedido;
3. template de handoff;
4. lista de produtos;
5. criar ticket.

### Resposta esperada

1. resource;
2. tool;
3. prompt;
4. resource ou tool read-only, conforme consulta;
5. tool.

## Aula 3 - Prompt não é trava

### Explicação normal

Prompt orienta. Trava bloqueia.

Se a ação é crítica, a regra precisa estar no sistema.

### Explicação técnica

Use prompt para comportamento desejado. Use hook, gate, schema, validação ou
permissão para enforcement.

### Exemplo simplificado

"Não entre" é placa. Porta trancada é controle.

### Atividade

Para cada caso, diga se prompt basta ou precisa gate:

1. tom amigável;
2. refund acima de limite;
3. formato de resumo;
4. deletar registro;
5. usar português.

### Resposta esperada

1. prompt;
2. gate;
3. prompt/schema;
4. gate;
5. prompt.

## Aula 4 - Saída estruturada

### Explicação normal

Structured output é quando Claude preenche um formato previsível.

### Explicação técnica

Use JSON Schema/tool use quando a saída precisa ser validada ou usada por outro
sistema.

### Exemplo simplificado

Formulário é melhor que redação quando outro sistema vai ler.

### Atividade

Crie um schema mental para extrair:

- nome;
- data;
- valor;
- risco;
- confidence.

Marque quais campos podem ser ausentes.

## Aula 5 - Contexto e memória de trabalho

### Explicação normal

Claude não deve receber tudo sem organização. Ele precisa do contexto certo.

### Explicação técnica

Use:

- scratchpad;
- resumo progressivo;
- chunking;
- proveniência;
- revalidação.

### Exemplo simplificado

Mesa organizada ajuda a trabalhar.

### Atividade

Pegue um problema qualquer e crie:

- fatos;
- hipóteses;
- fontes;
- lacunas;
- próximos passos.

## Avaliação do nível

Responda sem consultar:

1. O que é `tool_use`?
2. Tool e resource são iguais?
3. Quando prompt não basta?
4. Por que nullable evita alucinação?
5. O que é proveniência?

Se errar mais de uma, revise antes de avançar.
