# Cenários Integrados

Use estes cenários para treinar como a prova combina domínios.

## Cenário 1 - Suporte com refund

### Situação

Um agente deve resolver pedidos de suporte envolvendo:

- devolução;
- cobrança duplicada;
- contestação;
- pedido de exceção.

### Explicação simples

Pense em um atendente virtual. Ele pode consultar dados e preparar uma solução,
mas não pode devolver dinheiro fora da política só porque "parece certo". A
arquitetura precisa colocar travas para ações sensíveis.

Tools:

- `get_customer`
- `lookup_order`
- `calculate_refund_eligibility`
- `request_refund_approval`
- `process_approved_refund`
- `escalate_to_human`

### Arquitetura esperada

1. Verificar identidade.
2. Consultar cliente.
3. Consultar pedido.
4. Calcular elegibilidade.
5. Se elegível e abaixo de limite, processar com confirmação.
6. Se acima de limite, pedir aprovação.
7. Se política não cobre, escalonar.
8. Registrar decisão e evidência.

### Resposta forte na prova

- usa gates determinísticos;
- não confia só em prompt;
- handoff tem contexto completo;
- erro de permissão vira escalonamento;
- erro transitório pode ter retry.

## Cenário 2 - Pesquisa multiagente

### Situação

Sistema pesquisa tema complexo e produz relatório com citações.

### Explicação simples

É como montar uma equipe de pesquisa. Uma pessoa busca fontes, outra lê
documentos, outra escreve e outra revisa. O coordenador garante que ninguém
trabalhe sem contexto e que toda conclusão tenha fonte.

Subagentes:

- web search;
- document analysis;
- synthesis;
- critic/reviewer.

### Arquitetura esperada

1. Coordenador classifica escopo.
2. Divide pesquisa em subtópicos.
3. Passa critérios e formato de output.
4. Subagentes retornam claims com fontes.
5. Coordenador detecta lacunas.
6. Reitera quando cobertura é insuficiente.
7. Síntese preserva fontes e conflitos.
8. Reviewer critica cobertura e evidência.

### Erros comuns

- subagentes sem contexto;
- síntese sem fonte;
- conflito ocultado;
- pipeline fixo que pesquisa tudo sempre;
- ausência de error propagation.

## Cenário 3 - Claude Code em PR review

### Situação

Time quer revisar PRs automaticamente.

### Explicação simples

A IA atua como um revisor auxiliar de código. Ela não deve bloquear o time por
gosto pessoal. Ela deve apontar problemas reais, com evidência e sugestão clara.

### Arquitetura esperada

1. CI chama Claude Code em modo não interativo.
2. Prompt limita escopo ao diff.
3. Critérios focam bugs reais.
4. Output JSON estruturado.
5. Findings têm severidade, evidência e linha.
6. Threshold decide bloquear ou comentar.
7. Baixa confiança não bloqueia.
8. Logs não expõem secrets.

### Resposta forte

- reduz falso positivo;
- exige evidência;
- não comenta estilo;
- separa severidade;
- integra com testes.

## Cenário 4 - Extração de documentos

### Situação

Sistema extrai dados de documentos heterogêneos e envia para downstream.

### Explicação simples

A IA lê documentos e preenche um formulário. Se uma informação não aparece no
documento, ela deve dizer que não encontrou, não inventar.

### Arquitetura esperada

1. Classificar documento.
2. Escolher schema.
3. Extrair com tool use.
4. Validar schema.
5. Validar semântica.
6. Retry com erro específico.
7. Campos ausentes viram null/unknown.
8. Confidence por campo.
9. Low confidence para humano.
10. Batch para alto volume independente.

### Resposta forte

- não força campo ausente;
- não usa texto livre;
- não reprocessa tudo por falha parcial;
- preserva evidência.

## Cenário 5 - Produtividade em codebase grande

### Situação

Agente ajuda devs em sistema legado.

### Explicação simples

Antes de mudar um sistema grande, a IA precisa investigar como um analista:
mapear, procurar pistas, ler partes relevantes, anotar fatos e só então mexer.

### Arquitetura esperada

1. Entender objetivo.
2. Descobrir estrutura com Glob.
3. Buscar símbolos com Grep.
4. Ler arquivos relevantes.
5. Criar scratchpad.
6. Planejar mudança.
7. Editar minimamente.
8. Rodar testes.
9. Atualizar resumo.

### Resposta forte

- evita ler tudo;
- separa hipótese de fato;
- usa plan mode para mudança complexa;
- não confia em sessão antiga sem revalidar.

## Cenário 6 - MCP para sistema interno

### Situação

Você precisa integrar Claude a backend via MCP.

### Explicação simples

MCP é como uma central de botões seguros para a IA. Alguns botões só consultam,
outros executam ações. Botões perigosos precisam de trava, confirmação e registro.

### Arquitetura esperada

Resources:

- políticas;
- catálogos;
- documentação de endpoints.

Tools read-only:

- buscar cliente;
- buscar pedido;
- listar status.

Tools mutating:

- criar ticket;
- solicitar aprovação;
- executar ação aprovada.

Prompts:

- workflow de suporte;
- resumo de handoff;
- revisão de policy gap.

Guardrails:

- schemas restritos;
- erros estruturados;
- gates;
- logs;
- secrets fora do prompt.

## Como treinar com estes cenários

Para cada cenário:

1. Desenhe arquitetura em 5 minutos.
2. Liste tools/resources/prompts.
3. Identifique ações de risco.
4. Defina gates.
5. Defina output estruturado.
6. Defina quando escalar.
7. Escreva 3 anti-patterns.
8. Crie 2 questões de múltipla escolha.

## Rubrica de autoavaliação

| Critério | 0 | 1 | 2 |
|---|---:|---:|---:|
| Identifica risco | não | parcial | completo |
| Define boundary de tool | não | parcial | claro |
| Usa enforcement adequado | prompt only | misto | determinístico |
| Preserva contexto | não | resumo fraco | fatos/fonte/lacunas |
| Estrutura output | texto livre | parcial | schema/validação |
| Escalonamento | ausente | genérico | critérios claros |

Meta: pelo menos 10/12 em cada cenário.
