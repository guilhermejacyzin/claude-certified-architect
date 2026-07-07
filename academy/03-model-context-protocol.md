# 03 - Introduction To Model Context Protocol

## Visão Geral

MCP conecta aplicações de IA a ferramentas, dados e workflows externos. Ele
padroniza como servidores expõem capabilities para clientes como Claude Code.

Exemplo simplificado: MCP é uma central de conectores. Cada conector diz quais
dados pode mostrar e quais ações pode executar.

## 1. Introducing MCP

### Explicação Normal

MCP evita integrações improvisadas. Em vez de colar dados manualmente no chat,
você conecta Claude a sistemas por uma interface padronizada.

### Explicação Técnica

MCP define:

- clientes;
- servidores;
- tools;
- resources;
- prompts;
- schemas;
- mensagens de protocolo;
- descoberta de capabilities.

### Quando Usar

Use MCP quando Claude precisa:

- consultar banco;
- abrir issue;
- ler documentação;
- buscar dados internos;
- executar workflow;
- acessar sistemas repetidamente.

## 2. MCP Clients

### Explicação Normal

Cliente MCP é o lado que consome capacidades do servidor. Claude Code pode atuar
como cliente.

### Passo a Passo Conceitual

1. Cliente inicia conexão.
2. Servidor anuncia capabilities.
3. Cliente lista tools/resources/prompts.
4. Modelo decide usar uma capability.
5. Cliente envia request ao servidor.
6. Servidor retorna resultado.
7. Cliente entrega resultado ao modelo.

### Exemplo Simplificado

Cliente é quem usa a tomada; servidor é quem fornece energia/capacidade.

## 3. Project Setup

### Passo a Passo

1. Escolher linguagem.
2. Instalar SDK MCP.
3. Criar servidor.
4. Definir nome e versão.
5. Registrar tools.
6. Registrar resources.
7. Registrar prompts.
8. Rodar localmente.
9. Testar com inspector.
10. Configurar no cliente.

### Estrutura Recomendada

```text
mcp-server/
  package.json
  src/
    server.ts
    tools/
    resources/
    prompts/
  README.md
```

## 4. Defining Tools With MCP

### Tool Boa

Uma tool boa tem:

- nome claro;
- descrição clara;
- input schema;
- output previsível;
- erro estruturado;
- escopo limitado.

### Passo a Passo

1. Defina intenção.
2. Defina risco.
3. Defina input.
4. Defina output.
5. Defina erro.
6. Defina permissões.
7. Implemente validação.
8. Teste caso feliz.
9. Teste erro.
10. Ajuste descrição.

### Exemplo Simplificado

Um botão "consultar pedido" é melhor que "fazer coisas com pedido".

## 5. Server Inspector

### Explicação Normal

Inspector ajuda a testar MCP server antes de usar em produção.

### O Que Verificar

1. Servidor inicia.
2. Tools aparecem.
3. Schemas aparecem.
4. Resources aparecem.
5. Prompts aparecem.
6. Tool roda com input válido.
7. Tool falha bem com input inválido.
8. Erros são seguros.
9. Descrições são claras.
10. Não há secrets no output.

## 6. Implementing A Client

### Explicação Normal

Implementar client é criar o lado que chama MCP server.

### Passo a Passo

1. Conectar ao servidor.
2. Inicializar protocolo.
3. Listar capabilities.
4. Selecionar tool/resource/prompt.
5. Enviar request.
6. Receber response.
7. Tratar erro.
8. Converter resultado para contexto do modelo.
9. Logar com segurança.
10. Fechar conexão.

### Critério de Prova

Cliente e servidor têm responsabilidades diferentes. O servidor expõe; o cliente
orquestra uso.

## 7. Defining Resources

### Explicação Normal

Resources são dados consultáveis.

### Bons Casos

- documentação;
- políticas;
- catálogos;
- arquivos;
- schemas;
- contexto de projeto.

### Passo a Passo

1. Defina URI.
2. Defina tipo.
3. Defina conteúdo.
4. Defina metadata.
5. Defina atualização.
6. Defina escopo.
7. Evite secrets.
8. Teste leitura.
9. Teste resource inexistente.
10. Documente uso.

## 8. Accessing Resources

### Fluxo

1. Cliente lista resources.
2. Modelo ou usuário escolhe.
3. Cliente solicita resource.
4. Servidor retorna conteúdo.
5. Cliente adiciona ao contexto.
6. Modelo usa para responder.

### Exemplo Simplificado

Abrir um manual antes de responder.

## 9. Defining Prompts

### Explicação Normal

Prompts MCP são workflows prontos.

### Bons Casos

- handoff humano;
- review de PR;
- resumo de incidente;
- análise de contrato;
- diagnóstico de suporte.

### Passo a Passo

1. Defina nome.
2. Defina descrição.
3. Defina argumentos.
4. Defina template.
5. Defina output esperado.
6. Teste com dados reais fictícios.
7. Ajuste clareza.
8. Documente limitações.
9. Versione mudanças.
10. Remova contexto sensível.

## 10. Prompts In The Client

### Explicação Normal

O cliente pode solicitar um prompt template do servidor e preencher parâmetros.

### Exemplo Simplificado

É como baixar um modelo de formulário e preencher os campos.

## 11. MCP Review

### Checklist De Revisão

1. Tools têm nomes claros?
2. Descrições diferenciam tools parecidas?
3. Schemas são restritos?
4. Erros são estruturados?
5. Resources não expõem segredo?
6. Prompts são workflows úteis?
7. Tools mutating têm gates?
8. Logs são seguros?
9. Inspector passa?
10. Cliente trata falhas?

## 12. Quiz Mental

Responda:

1. Política de suporte é tool ou resource?
2. Cancelar pedido é tool ou prompt?
3. Template de handoff é prompt ou resource?
4. Quem executa código externo?
5. Onde fica validação de input?

Gabarito:

1. resource;
2. tool;
3. prompt;
4. servidor/tool;
5. servidor/tool e, se necessário, client também.

## 13. Trilha Aula A Aula Do Curso MCP

Esta seção transforma os tópicos visíveis do curso "Introduction to Model
Context Protocol" em uma trilha textual profunda. A intenção é que você consiga
estudar cada aula sem depender de vídeo, praticando com perguntas de prova,
exemplos e critérios de implementação.

### 13.1 Welcome To The Course

O início do curso deve deixar claro o problema que MCP resolve: integrar modelos
com sistemas externos sem criar uma integração artesanal para cada combinação de
cliente, ferramenta e provedor.

Explicação normal: MCP é uma tomada padronizada. Em vez de cada aplicativo criar
um cabo diferente para conectar o modelo a dados e ações, todos combinam um
formato comum de descoberta e chamada.

Explicação técnica: MCP separa o cliente que hospeda a experiência de IA do
servidor que expõe capacidades. O cliente descobre capabilities, apresenta essas
capabilities ao modelo ou ao runtime, executa chamadas quando apropriado e
injeta os resultados no contexto. O servidor declara tools, resources e prompts
com contratos explícitos.

O que memorizar para a prova:

1. MCP não é apenas "tool calling".
2. MCP não substitui controle de permissão.
3. MCP não faz o modelo ficar correto por si só.
4. MCP padroniza exposição e consumo de capacidades.
5. Tools executam ações ou consultas parametrizadas.
6. Resources fornecem contexto legível.
7. Prompts fornecem workflows/templates reutilizáveis.
8. O cliente orquestra a conexão.
9. O servidor implementa a capability.
10. O contrato precisa ser claro para o modelo escolher bem.

Exemplo simplificado: se Claude fosse uma pessoa trabalhando com você, MCP seria
uma mesa organizada com gavetas identificadas: uma gaveta tem manuais, outra tem
botões de ação e outra tem modelos de trabalho.

### 13.2 Introducing MCP

MCP deve ser entendido como arquitetura de integração. O erro comum é enxergar
MCP como "uma forma diferente de chamar API". Uma API tradicional foi criada
para software. Um servidor MCP também é software, mas seu contrato precisa ser
legível para um modelo: nomes, descrições, schemas e limites operacionais
influenciam diretamente a qualidade da decisão.

Passo a passo mental:

1. Identifique que tarefa Claude precisa realizar.
2. Separe o que é leitura de contexto do que é ação.
3. Defina quais dados podem ser expostos como resources.
4. Defina quais operações precisam virar tools.
5. Defina quais workflows repetidos viram prompts.
6. Escreva descrições para o modelo, não apenas para humanos.
7. Restrinja schemas para reduzir ambiguidade.
8. Planeje erros estruturados.
9. Teste com inspector antes de integrar ao cliente.
10. Revise logs para garantir que não há vazamento de segredo.

Anti-patterns:

- criar uma tool genérica `do_anything`;
- expor secrets como resource;
- usar prompt para bloquear ação crítica;
- colocar regra de negócio apenas na descrição;
- misturar leitura e escrita na mesma tool sem necessidade;
- não diferenciar erro transitório de erro de permissão.

### 13.3 MCP Clients

Um MCP client é a superfície que conversa com servidores MCP. Ele pode estar em
um ambiente de desenvolvimento, em uma aplicação interna, em um desktop app ou
em um runtime de agente.

Responsabilidades do client:

1. Iniciar a comunicação.
2. Negociar capacidades.
3. Listar tools, resources e prompts.
4. Expor as capacidades ao fluxo do modelo.
5. Enviar chamadas ao servidor.
6. Receber respostas.
7. Incluir resultados no contexto.
8. Tratar falhas de transporte.
9. Respeitar permissões locais.
10. Registrar auditoria mínima.

Responsabilidades que não devem ficar só no client:

- validação de regra de negócio crítica;
- bloqueio de ação destrutiva;
- autorização real do sistema externo;
- mascaramento final de dados sensíveis;
- idempotência de operações mutating.

Critério de prova: se a questão perguntar onde garantir uma regra crítica, a
resposta tende a ser no código/tool/servidor/hook, não apenas no prompt do client.

### 13.4 Project Setup

Um setup de projeto MCP precisa ser simples de rodar, testar e auditar. O
avaliador normalmente quer saber se você separa responsabilidades e evita
misturar exemplos, configuração e implementação real.

Estrutura de estudo recomendada:

```text
mcp-study-server/
  README.md
  package.json
  .env.example
  src/
    server.ts
    capabilities/
      tools/
      resources/
      prompts/
    domain/
      orders.ts
      policies.ts
    safety/
      validate-input.ts
      redact.ts
  tests/
    tools.test.ts
    resources.test.ts
```

Passo a passo detalhado:

1. Crie o projeto mínimo.
2. Adicione SDK ou biblioteca MCP escolhida.
3. Defina nome e versão do servidor.
4. Crie uma primeira tool read-only.
5. Crie um resource estático.
6. Crie um prompt simples.
7. Rode localmente.
8. Teste com inspector.
9. Adicione teste automatizado.
10. Documente como configurar.
11. Adicione `.env.example`, nunca `.env` real.
12. Simule erro de input.
13. Simule erro de sistema externo.
14. Revise output para remover dados sensíveis.
15. Só então conecte ao cliente real.

### 13.5 Defining Tools With MCP

Tools são a parte de maior risco porque podem consultar sistemas vivos, executar
ações e alterar estado. A certificação tende a cobrar design de tool em cenários
em que a descrição parece fácil, mas há risco escondido.

Checklist de uma tool madura:

1. Nome específico.
2. Descrição com objetivo.
3. Descrição com quando usar.
4. Descrição com quando não usar.
5. Input schema fechado.
6. Campos obrigatórios mínimos.
7. Tipos corretos.
8. Enums para categorias finitas.
9. Output previsível.
10. Erros estruturados.
11. Identificação de read-only ou mutating.
12. Idempotência quando possível.
13. Audit ID em ações importantes.
14. Redação/mascaramento de dados sensíveis.
15. Teste de seleção correta pelo modelo.

Exemplo simplificado: uma ferramenta boa é como um formulário bem desenhado. Se
o formulário pergunta exatamente o que precisa e explica quando usar, a chance
de erro cai muito.

Pergunta de prova provável:

**Question (EN):** A tool called `manage_customer` can read profile data, update
addresses, delete accounts, and issue refunds. What is the best architectural
fix?

**Questão (PT-BR):** Uma tool chamada `manage_customer` pode ler perfil,
atualizar endereço, deletar contas e emitir reembolsos. Qual é o melhor ajuste
arquitetural?

Resposta esperada: dividir por intenção, risco e permissão. Leituras devem ficar
separadas de ações mutating; ações críticas exigem gates, validação e auditoria.

### 13.6 The Server Inspector

O inspector é ambiente de teste manual e diagnóstico. Ele não substitui testes
automatizados, mas ajuda a descobrir problemas de contrato antes de conectar o
servidor ao fluxo real.

Roteiro de inspeção:

1. O servidor sobe sem erro?
2. Nome e versão aparecem corretamente?
3. Todas as tools esperadas aparecem?
4. Alguma tool indevida aparece?
5. Descrições são claras?
6. Schemas têm tipos corretos?
7. Campos obrigatórios fazem sentido?
8. Resources podem ser listados?
9. Resources podem ser lidos?
10. Prompts podem ser listados?
11. Prompts aceitam argumentos?
12. Tool read-only funciona com input válido?
13. Tool mutating tem confirmação/gate?
14. Input inválido retorna erro claro?
15. Timeout retorna erro retryable?
16. Permissão negada retorna erro não retryable?
17. Output contém apenas dados necessários?
18. Logs não mostram token/segredo?
19. Mensagens ajudam o modelo a se recuperar?
20. O comportamento é estável em chamadas repetidas?

### 13.7 Course Satisfaction Survey

Em cursos online, a pesquisa de satisfação não cai como conteúdo técnico. Mesmo
assim, use esse ponto como uma pausa de metacognição: antes de avançar, avalie
se você realmente consegue explicar MCP sem decorar.

Autoavaliação:

1. Eu consigo explicar MCP para alguém não técnico?
2. Eu consigo diferenciar tool, resource e prompt?
3. Eu consigo desenhar uma tool segura?
4. Eu consigo apontar o que o client faz?
5. Eu consigo apontar o que o server faz?
6. Eu consigo testar com inspector?
7. Eu consigo prever erros de permissão, validação e timeout?
8. Eu consigo desenhar uma integração sem vazar segredo?
9. Eu consigo justificar quando usar MCP em vez de colar dados no prompt?
10. Eu consigo responder cenário com tradeoff?

### 13.8 Implementing A Client

Implementar client exige disciplina de estado. O client precisa saber quais
capabilities existem, quando chamar, como serializar argumentos, como anexar
resultados e como interromper fluxos ruins.

Fluxo técnico:

```text
connect -> initialize -> list capabilities -> choose capability
  -> call/read/get prompt -> receive result -> append context
  -> continue model loop -> close
```

Erros comuns:

- chamar tool e esquecer de devolver o resultado ao modelo;
- tratar todos os erros como texto livre;
- não fechar sessão;
- ignorar versionamento do servidor;
- disponibilizar tools demais para uma tarefa simples;
- não registrar qual tool foi chamada;
- não preservar relação entre `tool_use` e `tool_result`.

Critério de arquitetura: o client deve facilitar o uso correto, mas não deve ser
a única barreira contra abuso. Se uma ação é perigosa, o servidor/tool precisa
recusar input inseguro mesmo que o client erre.

### 13.9 Defining Resources

Resources são melhores quando você quer disponibilizar informação consultável.
Eles podem representar arquivos, documentação, políticas, catálogos, schemas,
listas de endpoints ou qualquer contexto legível.

Resource bom:

```text
support://policies/refunds
```

Resource ruim:

```text
support://all-company-data
```

Critérios:

1. URI estável.
2. Escopo limitado.
3. Conteúdo relevante.
4. Sem segredo.
5. Atualização previsível.
6. Metadados úteis.
7. Tamanho controlado.
8. Linguagem clara.
9. Separação por domínio.
10. Teste de leitura.

Exemplo simplificado: resource é uma página de manual que Claude pode abrir
quando precisa de contexto.

### 13.10 Accessing Resources

O ato de acessar resource deve preservar contexto e origem. Se o agente usa uma
política, a resposta final deve indicar que foi baseada naquela política quando
isso importa para auditoria.

Passo a passo:

1. Listar resources disponíveis.
2. Escolher resource relevante.
3. Ler conteúdo.
4. Resumir internamente se o conteúdo for grande.
5. Preservar URI/fonte.
6. Usar a informação na decisão.
7. Citar ou mencionar a fonte quando necessário.
8. Detectar resource obsoleto.
9. Solicitar atualização se houver conflito.
10. Não inventar informação ausente.

### 13.11 Defining Prompts

Prompts MCP são modelos reutilizáveis de trabalho. Eles não são "frases mágicas";
são artefatos de processo. Um prompt bom define objetivo, entradas, passos,
formato de saída e critérios de qualidade.

Bom prompt MCP:

```text
incident-handoff-summary
Inputs: incident_id, audience, known_facts, open_questions
Output: resumo executivo, linha do tempo, impacto, ações tomadas, próximos passos
```

Quando usar prompt em vez de tool:

- quando o objetivo é orientar uma resposta;
- quando não há execução externa;
- quando o valor está no formato e no processo;
- quando o time repete o mesmo raciocínio.

Quando não usar prompt:

- para validar permissão crítica;
- para executar ação externa;
- para ler dado atualizado;
- para substituir schema de tool.

### 13.12 Prompts In The Client

O client pode solicitar um prompt ao servidor, preencher argumentos e usar o
template na conversa. Isso permite padronizar workflows entre pessoas e projetos.

Exemplo de fluxo:

1. Usuário pede resumo de incidente.
2. Client lista prompts.
3. Client seleciona `incident-handoff-summary`.
4. Client envia argumentos.
5. Server retorna mensagens/template.
6. Client injeta no modelo.
7. Modelo produz resumo no padrão esperado.

Risco: se o prompt pedir dados que não foram fornecidos, o modelo pode tentar
inferir. Por isso, inclua instruções para marcar lacunas explicitamente.

### 13.13 Final Assessment On MCP

Use este bloco como simulado prático. Para cada cenário, escreva a solução antes
de olhar o gabarito mental.

1. Um time precisa que Claude consulte documentação de produto: resource.
2. Claude precisa abrir ticket no Jira: tool mutating com schema e audit.
3. Claude precisa seguir um formato de handoff: prompt.
4. Claude precisa cancelar pedido: tool mutating com confirmação.
5. Claude precisa ler catálogo de APIs: resource.
6. Claude precisa calcular elegibilidade de reembolso: tool read-only.
7. Claude precisa redigir resposta ao cliente: prompt ou resposta normal, com
   resource de política como contexto.
8. Claude precisa deletar conta: tool crítica com gate forte e provável humano.
9. Claude precisa resumir incidente repetidamente: prompt.
10. Claude precisa consultar base vetorial: tool ou resource dinâmico, conforme
    implementação.

### 13.14 MCP Review

Revisão final para certificação:

| Se o cenário fala de... | Pense primeiro em... |
|---|---|
| dado estável, política, documento | resource |
| ação, consulta parametrizada, mudança de estado | tool |
| fluxo repetível de resposta | prompt |
| regra crítica | código/tool/hook/gate |
| erro recuperável | erro estruturado com retry |
| action perigosa | confirmação, aprovação, auditoria |
| modelo escolhendo errado | nomes, descrições e schemas |
| muitos conectores | escopo e least privilege |
| dado sensível | minimização, mascaramento e permissão |
| integração antes da produção | inspector + testes |

## 14. Drills De Fixação MCP

Faça estes exercícios até responder sem consultar a teoria.

### Drill 1 - Classificação Rápida

Classifique como tool, resource ou prompt:

1. `support://policies/refund`.
2. `lookup_order(order_id)`.
3. `create_refund_request(amount, order_id)`.
4. `weekly-executive-summary-template`.
5. `docs://api/authentication`.
6. `calculate_invoice_total(invoice_id)`.
7. `delete_user_account(user_id, approval_id)`.
8. `incident-postmortem-template`.
9. `product://catalog/current`.
10. `send_customer_email(ticket_id, body)`.

Gabarito: resource, tool, tool, prompt, resource, tool, tool, prompt, resource,
tool.

### Drill 2 - Reescrita De Tool Ruim

Tool ruim:

```json
{
  "name": "handle_ticket",
  "description": "Handles ticket",
  "input_schema": {
    "type": "object",
    "properties": {
      "stuff": { "type": "object" }
    }
  }
}
```

Reescreva em pelo menos três tools:

1. `get_ticket_details`.
2. `add_internal_ticket_note`.
3. `escalate_ticket_to_team`.

Para cada uma, defina read-only/mutating, required fields, erro provável e
limite de uso.

### Drill 3 - Erros Estruturados

Para cada erro, diga se é retryable:

1. Timeout no CRM.
2. Usuário sem permissão para reembolso.
3. ID de pedido em formato inválido.
4. Pedido não encontrado.
5. Rate limit temporário.
6. Valor acima da política.

Gabarito: sim, não, não até corrigir input, não sem novo dado, sim com backoff,
não sem aprovação/handoff.
