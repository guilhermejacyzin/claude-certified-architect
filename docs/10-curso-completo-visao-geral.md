# Curso Completo - Visão Geral

Objetivo deste curso textual: permitir preparação forte para a certificação
Claude Certified Architect - Foundations sem depender dos vídeos oficiais.

Os vídeos continuam úteis, mas este repo deve ser suficiente para:

- entender o blueprint do exame;
- praticar os cenários mais prováveis;
- memorizar os padrões de decisão;
- explicar tradeoffs de arquitetura;
- reconhecer anti-patterns em alternativas de múltipla escolha.

## Como usar esta apostila

Siga a ordem:

1. `docs/00-mapa-exame.md`
2. `docs/10-curso-completo-visao-geral.md`
3. `docs/11-modulo-agentic-architecture.md`
4. `docs/12-modulo-mcp-tool-design.md`
5. `docs/13-modulo-claude-code-workflows.md`
6. `docs/14-modulo-prompt-structured-output.md`
7. `docs/15-modulo-context-reliability.md`
8. `docs/16-cenarios-integrados.md`
9. `labs/`
10. `practice/`
11. `flashcards/`

## O que a prova mede de verdade

A prova não é uma prova de sintaxe. Ela mede se você consegue tomar decisões
arquiteturais em sistemas reais com Claude.

Exemplos de julgamento esperado:

- Se uma operação financeira precisa de política rígida, você não confia só no
  prompt; cria hook, gate ou validação programática.
- Se o output alimenta um sistema downstream, você não pede "responda em JSON";
  usa tool use/JSON Schema, validação e retry.
- Se um subagente precisa sintetizar achados, você não presume que ele herdou o
  contexto; passa achados, metadados e critérios explicitamente.
- Se um agente explora codebase grande, você não joga tudo no contexto; usa
  discovery, busca seletiva, scratchpad e resumo progressivo.
- Se fontes entram em conflito, você não escolhe uma sem explicar; preserva
  proveniência e incerteza.

## O mapa mental único

Quase toda questão pode ser resolvida com esta árvore:

```text
1. A ação muda estado ou tem risco?
   Sim -> gate/hook/permissão/humano.
   Não -> tool/resource/prompt pode ser suficiente.

2. O output precisa ser consumido por outro sistema?
   Sim -> schema, validação, retry.
   Não -> resposta textual com critérios pode bastar.

3. A tarefa é aberta, longa ou multi-etapa?
   Sim -> decomposição, plan mode, subagentes, scratchpad.
   Não -> execução direta.

4. Há fontes, documentos ou achados múltiplos?
   Sim -> proveniência por claim e síntese com incerteza.

5. Há baixa confiança, lacuna de política ou preferência explícita do usuário?
   Sim -> escalonar ou pedir esclarecimento.
```

## Cinco responsabilidades em sistemas agentic

Um erro comum é imaginar que "o agente" faz tudo. Em arquitetura real, você
distribui responsabilidade.

| Responsável | Papel |
|---|---|
| Modelo | raciocinar, escolher próxima ação, sintetizar, adaptar |
| Tool/MCP | executar ação externa ou consultar dado |
| Código/hook | garantir regra, validar, bloquear, normalizar |
| Memória/contexto | preservar estado, fatos, decisões e fontes |
| Humano | aprovar risco, resolver ambiguidade, assumir exceção |

Na prova, a alternativa correta costuma ser aquela que distribui essas
responsabilidades com clareza.

## Vocabulário essencial

### Agentic loop

Loop em que o modelo decide se precisa chamar tool, recebe o resultado e decide
o próximo passo até terminar.

Sinais importantes:

- `tool_use`: o modelo pediu uma tool.
- `tool_result`: sua aplicação devolve o resultado da tool.
- `end_turn`: o modelo terminou a resposta.

### Coordinator-subagent

Padrão hub-and-spoke:

- coordenador entende objetivo global;
- subagentes executam subtarefas especializadas;
- coordenador agrega, detecta lacunas e decide próxima delegação.

### MCP

Model Context Protocol. Um servidor MCP expõe:

- **tools**: funções que o modelo pode invocar;
- **resources**: dados/contexto para leitura;
- **prompts**: workflows ou mensagens parametrizadas.

### Hook

Código que intercepta eventos, como chamada de tool, resultado de tool,
permissão ou etapa de workflow. Serve para enforcement, validação, auditoria e
normalização.

### Structured output

Saída com contrato explícito, normalmente JSON Schema/tool use, para reduzir
ambiguidade e permitir validação.

### Context management

Técnicas para preservar o que importa quando a conversa, documentos ou codebase
são maiores que a capacidade útil de atenção do modelo.

## Como reconhecer distratores

Distratores comuns parecem razoáveis, mas falham por um detalhe:

- **"Melhorar o prompt"** quando a regra precisa de enforcement.
- **"Aumentar contexto"** quando o problema é falta de estrutura.
- **"Usar subagente"** sem passar contexto explicitamente.
- **"Usar batch"** quando a tarefa precisa de tool calling multi-turn.
- **"Pedir JSON"** sem schema/validação.
- **"Automatizar tudo"** quando há baixa confiança ou risco.
- **"Escalonar tudo"** quando a automação segura resolveria.

## Método de estudo sem vídeo

Para cada domínio:

1. Leia o módulo.
2. Escreva o fluxo principal de memória.
3. Faça o lab.
4. Responda questões simuladas.
5. Explique em voz alta por que cada distrator está errado.
6. Registre lacunas no `study-log.md`.
7. Faça flashcards só do que errou.

## Critério de prontidão

Você está pronto quando consegue projetar, em menos de 10 minutos, uma solução
para cada cenário:

- suporte com refund e escalonamento;
- pesquisa multiagente com fontes;
- Claude Code para PR review;
- extração estruturada de documentos;
- exploração de codebase grande;
- MCP server com tools/resources/prompts;
- workflow com hooks e regras determinísticas.

## Fontes técnicas principais

- Claude Code overview: https://docs.anthropic.com/en/docs/claude-code/overview
- Claude Agent SDK: https://docs.anthropic.com/en/docs/claude-code/sdk
- Claude Code hooks: https://docs.anthropic.com/en/docs/claude-code/hooks-guide
- Claude Code subagents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Claude Code skills: https://docs.anthropic.com/en/docs/claude-code/skills
- Tool use: https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview
- MCP specification: https://modelcontextprotocol.io/specification
