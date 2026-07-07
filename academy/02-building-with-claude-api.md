# 02 - Building With The Claude API

Este módulo aprofunda os tópicos visíveis no curso "Building with the Claude
API", em PT-BR e com foco prático.

## 1. Overview De Claude Models

### Explicação Normal

Claude é uma família de modelos. A escolha do modelo depende de complexidade,
custo, latência, contexto, capacidade de raciocínio e tipo de tarefa.

### Como Pensar

- Tarefa simples e barata: modelo mais rápido.
- Código complexo e agentes longos: modelo mais forte.
- Documentos grandes: modelo com contexto adequado.
- Produção: avalie custo, latência, qualidade e risco.

### Exemplo Simplificado

Você não usa caminhão para entregar uma carta, nem bicicleta para transportar
mudança.

## 2. Acessando A API

### Explicação Normal

A API é a forma de integrar Claude em aplicações. Sua aplicação envia mensagens,
configura modelo e parâmetros, e recebe resposta.

### Passo a Passo

1. Criar conta/plataforma.
2. Obter credencial.
3. Instalar SDK ou usar HTTP.
4. Escolher modelo.
5. Enviar `messages`.
6. Definir `max_tokens`.
7. Opcionalmente definir system prompt.
8. Tratar resposta.
9. Tratar erros.
10. Logar de forma segura.

### Exemplo Técnico Conceitual

```text
client.messages.create(
  model = "...",
  max_tokens = 1000,
  system = "Você é um assistente objetivo.",
  messages = [
    { role: "user", content: "Explique MCP em 5 linhas." }
  ]
)
```

## 3. API Key

### Explicação Normal

API key é a credencial que permite sua aplicação chamar Claude.

### Boas Práticas

1. Nunca commitar.
2. Usar variável de ambiente.
3. Separar dev/staging/prod.
4. Rotacionar quando necessário.
5. Limitar acesso.
6. Monitorar uso.
7. Não expor em frontend.
8. Não colocar em prompt.
9. Não registrar em logs.
10. Revogar se vazar.

### Exemplo Simplificado

API key é a chave da porta. Não cole a chave no mural.

## 4. Making A Request

### Passo a Passo

1. Defina tarefa.
2. Escolha modelo.
3. Escreva system prompt se necessário.
4. Escreva mensagem do usuário.
5. Defina limite de output.
6. Envie request.
7. Leia content blocks.
8. Verifique `stop_reason`.
9. Trate erro.
10. Retorne resposta ao usuário.

### Erros Comuns

- não limitar tokens;
- não tratar erro;
- não registrar versão do modelo;
- misturar segredo no prompt;
- não diferenciar resposta final de tool use.

## 5. Multi-Turn Conversations

### Explicação Normal

Conversas multi-turn preservam histórico relevante para Claude continuar o
raciocínio.

### Passo a Passo

1. Guardar mensagens importantes.
2. Adicionar nova mensagem do usuário.
3. Enviar histórico.
4. Receber resposta.
5. Adicionar resposta ao histórico.
6. Resumir quando ficar longo.
7. Remover ruído.
8. Preservar decisões.
9. Preservar tool results relevantes.
10. Evitar contexto obsoleto.

### Exemplo Simplificado

É uma conversa com memória do que acabou de ser dito, mas você ainda precisa
organizar as anotações.

## 6. System Prompts

### Explicação Normal

System prompt define papel, limites e critérios gerais.

### Bom System Prompt

```text
Você é um assistente de extração de contratos.
Extraia apenas informações presentes no documento.
Use null quando a informação estiver ausente.
Retorne no schema solicitado.
```

### Mau System Prompt

```text
Seja perfeito e nunca erre.
```

### Checklist

- papel claro;
- tarefa clara;
- limites claros;
- formato esperado;
- comportamento em incerteza;
- sem segredo;
- sem regra crítica que deveria ser gate.

## 7. Temperature

### Explicação Normal

Temperature controla variabilidade. Mais baixo tende a ser mais consistente;
mais alto tende a ser mais criativo.

### Uso Prático

| Tarefa | Temperature |
|---|---:|
| extração estruturada | baixa |
| classificação | baixa |
| brainstorm | média/alta |
| escrita criativa | média/alta |
| código crítico | baixa/média |

### Exemplo Simplificado

Temperature baixa é receita rígida. Temperature alta é improviso criativo.

## 8. Response Streaming

### Explicação Normal

Streaming envia a resposta aos poucos. Útil para melhorar experiência quando a
resposta é longa.

### Quando Usar

- chat interativo;
- respostas longas;
- UI que mostra progresso;
- tool use com feedback incremental.

### Cuidados

- lidar com eventos parciais;
- montar resposta final corretamente;
- tratar cancelamento;
- tratar erros no meio do stream;
- não assumir que parcial é resposta final.

## 9. Structured Data

### Explicação Normal

Structured data transforma resposta em formato previsível.

### Passo a Passo

1. Definir schema.
2. Definir campos required.
3. Definir nullable.
4. Definir enums.
5. Pedir evidência.
6. Validar.
7. Retry erros corrigíveis.
8. Escalonar baixa confiança.
9. Salvar versão.
10. Monitorar qualidade.

### Exemplo Simplificado

Em vez de redação, Claude preenche formulário.

## 10. Prompt Evaluation

### Explicação Normal

Avaliação de prompts mede se o prompt funciona de forma consistente.

### Workflow Típico

1. Definir tarefa.
2. Criar dataset de teste.
3. Definir critérios.
4. Rodar prompt.
5. Comparar output com esperado.
6. Classificar erro.
7. Ajustar prompt.
8. Rodar novamente.
9. Registrar melhoria.
10. Monitorar regressões.

### Model-Based vs Code-Based Grading

Use model-based grading quando julgamento é semântico.

Use code-based grading quando há regra objetiva.

Exemplo:

- JSON válido: code-based.
- Resposta útil e completa: model-based.

## 11. Prompt Engineering Techniques

### Técnicas Principais

1. Ser claro e direto.
2. Ser específico.
3. Usar tags XML quando ajudam estrutura.
4. Dar exemplos.
5. Definir critérios.
6. Explicar formato.
7. Dizer o que não fazer.
8. Separar contexto de instrução.
9. Pedir evidência.
10. Testar com casos difíceis.

### Exemplo

```text
<task>
Classifique o ticket.
</task>

<categories>
billing, technical, account, other
</categories>

<rules>
Use "other" apenas se nenhuma categoria se aplicar.
</rules>
```

## 12. Tool Use With Claude

### Explicação Normal

Tool use permite que Claude peça para a aplicação executar funções.

### Fluxo

1. Definir tool.
2. Definir schema.
3. Enviar tools na request.
4. Claude retorna `tool_use`.
5. Aplicação executa tool.
6. Aplicação envia `tool_result`.
7. Claude continua.
8. Repetir se necessário.
9. Encerrar em `end_turn`.
10. Tratar erros estruturados.

### Tópicos Do Curso

- Tool functions.
- Tool schemas.
- Handling message blocks.
- Sending tool results.
- Multi-turn conversations with tools.
- Multiple tools.
- Fine-grained tool calling.
- Text edit tool.
- Web search tool.

## 13. RAG E Agentic Search

### Explicação Normal

RAG busca informação externa antes de responder. Agentic search deixa o agente
decidir o que buscar e quando buscar mais.

### Componentes

1. Documentos.
2. Chunking.
3. Embeddings.
4. Índice vetorial.
5. Busca lexical BM25.
6. Multi-index pipeline.
7. Recuperação.
8. Síntese.
9. Citações.
10. Avaliação.

### Exemplo Simplificado

Antes de responder, Claude consulta uma biblioteca.

## 14. Features De Claude

### Tópicos Importantes

- Extended thinking.
- Image support.
- PDF support.
- Citations.
- Prompt caching.
- Regras de prompt caching.
- Code execution.
- Files API.

### Como Estudar

Para cada feature, responda:

1. O que resolve?
2. Quando usar?
3. Quando evitar?
4. Qual custo/risco?
5. Como validar?

## Checklist Final

Você domina este curso quando consegue:

- fazer uma request básica;
- explicar system prompt;
- controlar multi-turn;
- usar streaming;
- criar schema;
- criar eval;
- usar tool use;
- explicar RAG;
- explicar prompt caching;
- escolher modelo conforme cenário.
