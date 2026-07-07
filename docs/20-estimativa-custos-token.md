# 20 - Estimativa De Custos De Tokens

Atualizado em: **07/07/2026**.

Este guia estima quanto pode custar executar os exemplos práticos deste
repositório usando Claude via API. A estimativa serve para planejamento de
estudo, não para fechamento financeiro. O custo real muda conforme modelo,
prompt, arquivos anexados, quantidade de tentativas, uso de cache, batch,
server-side tools, web search, ambiente de nuvem, impostos, IOF, spread de cartão
e câmbio.

## Fontes E Premissas

Fontes consultadas:

- Pricing oficial Anthropic: <https://platform.claude.com/docs/en/about-claude/pricing>
- Modelos oficiais Anthropic: <https://platform.claude.com/docs/en/about-claude/models/overview>
- Câmbio USD/BRL em 07/07/2026, 17:00 UTC, via Xe: <https://www.xe.com/en-us/currencyconverter/convert/?Amount=1&From=USD&To=BRL>

Premissas usadas:

| Item | Valor usado |
|---|---:|
| Modelo base de estudo | Claude Sonnet 5 |
| Preço input atual | US$ 2,00 por 1M tokens |
| Preço output atual | US$ 10,00 por 1M tokens |
| Janela deste preço | preço introdutório até 31/08/2026 |
| Câmbio médio consultado | US$ 1 = R$ 5,14978 |
| Câmbio com gordura de planejamento | US$ 1 = R$ 5,67 |
| Repetição de estudo | 3 execuções por exemplo |
| Margem extra por tentativa | 25% |
| Fator total de estudo | 3,75x uma execução limpa |

Fórmula:

```text
custo_usd_1_execucao =
  (input_tokens / 1.000.000 * preco_input) +
  (output_tokens / 1.000.000 * preco_output)

custo_usd_estudo = custo_usd_1_execucao * 3,75
custo_brl_estudo = custo_usd_estudo * 5,67
```

## Régua De Complexidade

Use esta régua para recalcular se um exemplo mudar de tamanho.

| Classe | Uso típico | Input estimado | Output estimado | 1 execução | Orçamento estudo | Orçamento estudo |
|---|---|---:|---:|---:|---:|---:|
| A | prompt curto, explicação, ajuste simples | 4k | 1,5k | US$ 0,023 | US$ 0,09 | R$ 0,49 |
| B | exercício médio, schema pequeno, prompt/rule simples | 8k | 3k | US$ 0,046 | US$ 0,17 | R$ 0,98 |
| C | tool loop, structured output, skill, hook, análise média | 15k | 5k | US$ 0,080 | US$ 0,30 | R$ 1,70 |
| D | codebase, RAG, PR review, multiagente, documento longo | 35k | 8k | US$ 0,150 | US$ 0,56 | R$ 3,19 |
| E | aula inteira ou simulado completo com correção detalhada | 80k | 12k | US$ 0,280 | US$ 1,05 | R$ 5,95 |

Interpretação prática:

- **1 execução** é uma tentativa bem controlada, sem grandes retries.
- **Orçamento estudo** assume que você roda, erra, ajusta e roda de novo.
- Se você anexar PDFs, aulas longas, repositórios inteiros ou logs grandes, suba
  uma classe.
- Se usar prompt caching corretamente, exemplos com contexto repetido podem cair
  bastante no input depois da primeira execução.
- Se usar Batch API para lotes assíncronos, pode haver desconto relevante.
- Server-side tools podem ter cobrança adicional própria além de tokens.

## Estimativa Por Exemplo Prático

### 01 - Agentic Architecture & Orchestration

| Exemplo | Classe | Por que essa classe | Estudo USD | Estudo BRL |
|---|---:|---|---:|---:|
| 1. Agente de suporte com consulta de pedido | C | tool loop, policy check e resposta final | US$ 0,30 | R$ 1,70 |
| 2. Refund com limite e aprovação | C | tool mutating, gate, erro estruturado e handoff | US$ 0,30 | R$ 1,70 |
| 3. Coordenador com subagentes de pesquisa | D | múltiplos subagentes, fontes e síntese | US$ 0,56 | R$ 3,19 |
| 4. Subagente de síntese recebendo contexto completo | C | contexto estruturado e síntese com fontes | US$ 0,30 | R$ 1,70 |
| 5. Paralelização segura de subagentes | D | múltiplos documentos e agregação | US$ 0,56 | R$ 3,19 |
| 6. Decomposição dinâmica em bug legado | D | exploração de repo e plano adaptativo | US$ 0,56 | R$ 3,19 |
| 7. Prompt chaining para revisão previsível | D | PR review, etapas e JSON final | US$ 0,56 | R$ 3,19 |
| 8. Hook de normalização pós-tool | C | várias tools e normalização determinística | US$ 0,30 | R$ 1,70 |
| 9. Handoff humano estruturado | B | resumo estruturado sem codebase grande | US$ 0,17 | R$ 0,98 |
| 10. Retomada de sessão com arquivos alterados | D | revalidação de repo e estado antigo | US$ 0,56 | R$ 3,19 |

Subtotal de estudo estimado: **US$ 4,18 / R$ 23,72**.

### 02 - MCP E Tool Design

| Exemplo | Classe | Por que essa classe | Estudo USD | Estudo BRL |
|---|---:|---|---:|---:|
| 1. Transformar requisito em MCP tools | B | modelagem de tools sem integração grande | US$ 0,17 | R$ 0,98 |
| 2. Tool read-only | B | schema e erros simples | US$ 0,17 | R$ 0,98 |
| 3. Tool mutating com aprovação | C | pré-requisitos, validação e auditoria | US$ 0,30 | R$ 1,70 |
| 4. MCP resource para política | B | resource, versão e leitura | US$ 0,17 | R$ 0,98 |
| 5. MCP prompt para handoff | B | template reutilizável | US$ 0,17 | R$ 0,98 |
| 6. Erro transient | A | erro estruturado curto | US$ 0,09 | R$ 0,49 |
| 7. Erro business rule | A | erro estruturado curto | US$ 0,09 | R$ 0,49 |
| 8. Distribuição de tools por subagente | C | least privilege e multiagente | US$ 0,30 | R$ 1,70 |
| 9. Tool com paginação | B | schema, cursor e controle de contexto | US$ 0,17 | R$ 0,98 |
| 10. Testar escolha de tool | C | dataset de prompts e avaliação | US$ 0,30 | R$ 1,70 |

Subtotal de estudo estimado: **US$ 1,93 / R$ 10,98**.

### 03 - Claude Code Configuration & Workflows

| Exemplo | Classe | Por que essa classe | Estudo USD | Estudo BRL |
|---|---:|---|---:|---:|
| 1. Criar CLAUDE.md de projeto | B | memória de projeto e revisão | US$ 0,17 | R$ 0,98 |
| 2. Rule para backend | B | rule por caminho e exemplos | US$ 0,17 | R$ 0,98 |
| 3. Rule para frontend | B | rule por caminho e exemplos | US$ 0,17 | R$ 0,98 |
| 4. Slash command de review PR | C | workflow, critérios e JSON | US$ 0,30 | R$ 1,70 |
| 5. Skill de contrato de API | C | skill, referências e checklist | US$ 0,30 | R$ 1,70 |
| 6. Hook bloqueando comando destrutivo | C | hook, teste e falsos positivos | US$ 0,30 | R$ 1,70 |
| 7. Plan mode para refatoração | D | mudança multi-arquivo e validação | US$ 0,56 | R$ 3,19 |
| 8. Direct execution para correção simples | A | alteração pequena | US$ 0,09 | R$ 0,49 |
| 9. CI com JSON | D | diff, critérios, schema e pipeline | US$ 0,56 | R$ 3,19 |
| 10. Iterative refinement | C | retries e feedback de teste | US$ 0,30 | R$ 1,70 |

Subtotal de estudo estimado: **US$ 2,92 / R$ 16,61**.

### 04 - Structured Output

| Exemplo | Classe | Por que essa classe | Estudo USD | Estudo BRL |
|---|---:|---|---:|---:|
| 1. Extração de contrato com schema | C | schema, evidência e validação | US$ 0,30 | R$ 1,70 |
| 2. Campo ausente | B | nullability e ausência de dado | US$ 0,17 | R$ 0,98 |
| 3. Enum com fallback | B | classificação controlada | US$ 0,17 | R$ 0,98 |
| 4. Review de código com critérios | C | critérios, severidade e output | US$ 0,30 | R$ 1,70 |
| 5. Few-shot para ambiguidade | C | exemplos positivos/negativos | US$ 0,30 | R$ 1,70 |
| 6. Retry com erro específico | C | validação, erro e segunda tentativa | US$ 0,30 | R$ 1,70 |
| 7. Confidence por campo | C | score, evidência e calibração inicial | US$ 0,30 | R$ 1,70 |
| 8. Batch de documentos | D | lote e múltiplas entradas | US$ 0,56 | R$ 3,19 |
| 9. Multi-pass extraction | D | passes sucessivos e validação | US$ 0,56 | R$ 3,19 |
| 10. Multi-instance review | D | múltiplas instâncias e agregação | US$ 0,56 | R$ 3,19 |

Subtotal de estudo estimado: **US$ 3,52 / R$ 20,03**.

### 05 - Context Reliability

| Exemplo | Classe | Por que essa classe | Estudo USD | Estudo BRL |
|---|---:|---|---:|---:|
| 1. Scratchpad de investigação | B | contexto médio e resumo | US$ 0,17 | R$ 0,98 |
| 2. Exploração de monorepo | D | busca, leitura seletiva e repo | US$ 0,56 | R$ 3,19 |
| 3. Progressive summarization | C | compressão progressiva | US$ 0,30 | R$ 1,70 |
| 4. Proveniência por claim | C | claims, fontes e evidências | US$ 0,30 | R$ 1,70 |
| 5. Conflito entre fontes | C | comparação e incerteza | US$ 0,30 | R$ 1,70 |
| 6. Escalonamento por baixa confiança | B | handoff e lacunas | US$ 0,17 | R$ 0,98 |
| 7. Error propagation em multiagente | C | falhas entre agentes | US$ 0,30 | R$ 1,70 |
| 8. Retomada segura | D | revalidação de contexto antigo | US$ 0,56 | R$ 3,19 |
| 9. Context window com documento longo | D | documento grande e compressão | US$ 0,56 | R$ 3,19 |
| 10. Calibração de confidence | D | dataset, métricas e ajuste | US$ 0,56 | R$ 3,19 |

Subtotal de estudo estimado: **US$ 3,78 / R$ 21,52**.

## Total Para Rodar Todos Os 50 Exemplos

| Escopo | Estudo USD | Estudo BRL |
|---|---:|---:|
| 10 exemplos de Agentic Architecture | US$ 4,18 | R$ 23,72 |
| 10 exemplos de MCP e Tool Design | US$ 1,93 | R$ 10,98 |
| 10 exemplos de Claude Code | US$ 2,92 | R$ 16,61 |
| 10 exemplos de Structured Output | US$ 3,52 | R$ 20,03 |
| 10 exemplos de Context Reliability | US$ 3,78 | R$ 21,52 |
| **Total dos 50 exemplos** | **US$ 16,33** | **R$ 92,86** |

Leitura correta: esse total já considera rodar cada exemplo cerca de 3 vezes,
com margem de 25%. Uma execução única e limpa dos 50 exemplos ficaria perto de
**US$ 4,36 / R$ 24,76** usando as mesmas premissas.

## Estimativa Para Labs

| Lab | Classe | Estudo USD | Estudo BRL |
|---|---:|---:|---:|
| Lab 01 - Agentic loop | C | US$ 0,30 | R$ 1,70 |
| Lab 02 - MCP tools | C | US$ 0,30 | R$ 1,70 |
| Lab 03 - Claude Code config | C | US$ 0,30 | R$ 1,70 |
| Lab 04 - Structured output | C | US$ 0,30 | R$ 1,70 |
| Lab 05 - Contexto e confiabilidade | D | US$ 0,56 | R$ 3,19 |
| **Total labs** |  | **US$ 1,76** | **R$ 9,99** |

## Estimativa Para Aulas, Drills E Simulados

| Atividade | Classe | Estudo USD | Estudo BRL |
|---|---:|---:|---:|
| Explicar uma aula curta e gerar 5 questões | B | US$ 0,17 | R$ 0,98 |
| Explicar uma aula longa com exemplos e checklist | C | US$ 0,30 | R$ 1,70 |
| Executar um bloco de drills com correção | C | US$ 0,30 | R$ 1,70 |
| Corrigir 10 questões comentadas | C | US$ 0,30 | R$ 1,70 |
| Corrigir simulado de 30 questões | E | US$ 1,05 | R$ 5,95 |
| Corrigir simulado de 40 questões | E | US$ 1,05 | R$ 5,95 |
| Gerar novo simulado de 30 questões com gabarito | E | US$ 1,05 | R$ 5,95 |
| Revisar uma seção Academy inteira | E | US$ 1,05 | R$ 5,95 |

## Como Reduzir Custo Sem Perder Qualidade

1. Use Claude Haiku para rascunhos, classificação simples e correção preliminar.
2. Use Sonnet para execução principal de labs e exemplos.
3. Use Opus/Fable apenas quando o exercício exigir raciocínio muito complexo.
4. Não envie o repositório inteiro; envie arquivos relevantes.
5. Transforme aulas longas em resumos estáveis e reutilize.
6. Use prompt caching quando repetir o mesmo material base.
7. Use Batch API para gerar/corrigir muitos itens sem urgência.
8. Faça simulados em blocos de 10 questões quando quiser feedback mais barato.
9. Registre erros no `study-log.md` para não repetir prompts grandes.
10. Evite anexar PDFs ou dumps completos quando um trecho selecionado resolve.

## Multiplicadores Rápidos Por Modelo

Usando a mesma quantidade de tokens da tabela:

| Modelo | Como estimar a partir da coluna Sonnet 5 atual |
|---|---:|
| Claude Haiku 4.5 | aproximadamente 0,5x |
| Claude Sonnet 5 após 01/09/2026 ou Sonnet 4.6 | aproximadamente 1,5x |
| Claude Opus 4.8 | aproximadamente 2,5x |
| Claude Fable 5 | aproximadamente 5x |

Exemplo: um exercício Classe D custa **US$ 0,56 / R$ 3,19** no orçamento de
estudo com Sonnet 5 atual. Em Opus 4.8, planeje algo perto de **US$ 1,41 /
R$ 7,97**.

## Observação Sobre Aulas E Materiais De Terceiros

Quando o exemplo usa aulas oficiais, documentação, repositórios comunitários ou
resumos montados neste curso, o custo depende de como você fornece esse contexto:

- enviar apenas o trecho necessário mantém o exemplo na classe prevista;
- enviar uma aula inteira geralmente sobe para Classe D ou E;
- enviar muitos arquivos externos sem resumo pode passar de Classe E;
- usar resumos próprios do repo reduz custo e melhora consistência;
- materiais repetidos são bons candidatos a prompt caching.

Regra prática: para estudo, rode primeiro com o contexto mínimo. Se a resposta
ficar rasa, adicione contexto em camadas.
