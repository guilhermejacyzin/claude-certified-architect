# 23 - Base Acadêmica Para Agentic AI

Esta página resume pesquisas acadêmicas relevantes em português brasileiro e
conecta cada ideia aos tópicos da certificação. As fontes podem estar em inglês,
mas o estudo aqui é reescrito em PT-BR e aplicado ao contexto Claude.

## 1. ReAct - Raciocinar E Agir Intercaladamente

Fonte: <https://arxiv.org/abs/2210.03629>

Ideia central:

Um agente não deve apenas pensar nem apenas executar. Ele alterna entre
raciocínio e ação: pensa no próximo passo, chama ferramenta, observa resultado,
atualiza plano e continua.

Como isso aparece em Claude:

- `tool_use`;
- `tool_result`;
- loops agentic;
- subagentes;
- investigação de codebase;
- RAG com busca externa;
- handoff quando a ação não resolve.

Explicação normal:

O agente trabalha como uma pessoa investigando: primeiro cria hipótese, depois
consulta uma fonte, depois ajusta a hipótese.

Explicação técnica:

ReAct reduz alucinação porque força interação com ambiente externo. A ação traz
evidência; o raciocínio decide como usar a evidência. Em Claude, isso aparece no
loop de tools e no design de workflows com observação intermediária.

Exemplo simplificado:

Antes de responder se um pedido pode ser reembolsado, o agente consulta o pedido
e só então decide.

Onde estudar no repo:

- `examples/01-agentic-orchestration-10-exemplos.md`
- `academy/02-building-with-claude-api.md`
- `academy/03-model-context-protocol.md`

## 2. Toolformer - Modelos Usando Ferramentas

Fonte: <https://arxiv.org/abs/2302.04761>

Ideia central:

Modelos podem aprender quando chamar ferramentas externas, quais argumentos
passar e como incorporar resultados na próxima etapa.

Como isso aparece em Claude:

- design de tools;
- tool schemas;
- descrições de tools;
- escolha de tool;
- fine-grained tool availability;
- erros estruturados;
- least privilege.

Explicação normal:

O modelo fica melhor quando sabe que pode usar calculadora, busca, banco de
dados ou API em vez de tentar inventar resposta.

Explicação técnica:

O desempenho de tool use depende do contrato da tool. Nome, descrição, schema e
resultado influenciam diretamente a decisão do modelo. Tools vagas aumentam
erro; tools específicas aumentam previsibilidade.

Exemplo simplificado:

Se o aluno pode consultar a tabela oficial, ele não precisa chutar o valor.

Onde estudar no repo:

- `docs/12-modulo-mcp-tool-design.md`
- `examples/02-mcp-tools-10-exemplos.md`
- `practice/simulado-academy-mcp-claude-code-40-questoes.md`

## 3. Retrieval-Augmented Generation - RAG

Fonte: <https://arxiv.org/abs/2005.11401>

Ideia central:

O modelo recupera documentos relevantes antes de gerar resposta. Isso permite
responder com base em fontes externas, não apenas nos pesos do modelo.

Como isso aparece em Claude:

- RAG;
- Agentic Search;
- search results;
- citações;
- PDF support;
- context window;
- multi-index pipelines.

Explicação normal:

RAG é pedir para o modelo consultar uma biblioteca antes de responder.

Explicação técnica:

RAG combina chunking, indexação, busca, re-ranking, contexto, geração e
proveniência. Ele não substitui autorização, validação nem revisão humana.

Exemplo simplificado:

Se alguém pergunta a regra da empresa, abra o manual antes de responder.

Onde estudar no repo:

- `docs/15-modulo-context-reliability.md`
- `academy/02-building-with-claude-api.md`
- `recursos-ptbr/matriz-aulas-claude-ptbr.md`

## 4. Self-Refine - Refinamento Iterativo

Fonte: <https://arxiv.org/abs/2303.17651>

Ideia central:

Modelos podem gerar uma primeira resposta, avaliar a própria resposta e refinar
o resultado em ciclos.

Como isso aparece em Claude:

- iterative refinement;
- plan mode;
- revisão de PR;
- evals;
- retry de structured output;
- correção a partir de teste;
- melhoria de prompt.

Explicação normal:

Nem sempre a primeira resposta é a melhor. O sistema deve revisar, corrigir e
tentar novamente.

Explicação técnica:

Refinamento iterativo funciona melhor quando há critério objetivo: teste,
schema, rubrica, diff, lint, output esperado ou feedback humano. Sem critério, o
modelo pode apenas reescrever sem melhorar.

Exemplo simplificado:

Escreva, revise, corrija, teste e repita.

Onde estudar no repo:

- `examples/03-claude-code-10-exemplos.md`
- `docs/13-modulo-claude-code-workflows.md`
- `labs/lab-04-structured-output.md`

## 5. Síntese Para A Certificação

| Pesquisa | Padrão cobrado | Aplicação em Claude |
|---|---|---|
| ReAct | raciocinar + agir + observar | loop com tools e subagentes |
| Toolformer | usar ferramentas externas | tool schemas e tool selection |
| RAG | recuperar antes de gerar | citações, PDF, search results |
| Self-Refine | iterar com feedback | tests, evals, retries e plan mode |

## Como Usar Esta Base

1. Leia a ideia central.
2. Conecte com uma aula da Academy.
3. Execute um exemplo prático.
4. Responda uma questão simulada.
5. Registre onde a arquitetura pode falhar.

O objetivo não é decorar paper. É transformar pesquisa em decisão arquitetural.
