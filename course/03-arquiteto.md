# 03 - Nível Arquiteto

Objetivo: desenhar sistemas completos com múltiplos componentes.

## Aula 11 - Agente de suporte completo

### Arquitetura

Componentes:

- agente principal;
- tools read-only;
- tools mutating;
- hooks/gates;
- handoff humano;
- logs;
- políticas como resources.

### Passo a passo

1. Receber caso.
2. Classificar intenção.
3. Verificar identidade.
4. Consultar dados.
5. Avaliar política.
6. Executar ação de baixo risco.
7. Bloquear ação de alto risco sem aprovação.
8. Escalonar exceção.
9. Responder usuário.
10. Registrar decisão.

### Atividade

Desenhe arquitetura para:

- devolução;
- cobrança duplicada;
- pedido sem identificação;
- cliente pedindo humano.

## Aula 12 - Sistema de pesquisa multiagente

### Arquitetura

Componentes:

- coordenador;
- subagente de busca;
- subagente documental;
- subagente de síntese;
- subagente crítico;
- formato de achados.

### Passo a passo

1. Definir pergunta.
2. Dividir subtópicos.
3. Enviar contexto explícito.
4. Executar subagentes.
5. Coletar claims.
6. Preservar fontes.
7. Detectar conflitos.
8. Re-delegar lacunas.
9. Sintetizar.
10. Revisar.

### Atividade

Crie prompt de coordenador para pesquisar "adoção de MCP em empresas".

## Aula 13 - CI/CD com Claude Code

### Arquitetura

Componentes:

- pipeline;
- diff;
- prompt de critérios;
- JSON output;
- validador;
- publicador de comentário;
- threshold de bloqueio.

### Passo a passo

1. Receber diff.
2. Limitar escopo.
3. Aplicar critérios.
4. Gerar findings.
5. Validar JSON.
6. Filtrar severidade.
7. Comentar PR.
8. Bloquear se necessário.
9. Registrar métricas.
10. Ajustar por falso positivo.

### Atividade

Crie schema de finding para PR review.

## Aula 14 - Extração documental em produção

### Arquitetura

Componentes:

- classificador;
- schema por tipo;
- extractor;
- validador;
- retry;
- human review;
- storage;
- métricas.

### Passo a passo

1. Classificar documento.
2. Selecionar schema.
3. Extrair.
4. Validar forma.
5. Validar semântica.
6. Retry campo problemático.
7. Calcular confidence.
8. Revisar baixa confiança.
9. Salvar output.
10. Monitorar erro.

### Atividade

Desenhe pipeline para contratos de fornecedores.

## Aula 15 - Gestão de contexto em sistemas longos

### Arquitetura

Elementos:

- scratchpad;
- summaries;
- manifests;
- provenance;
- chunking;
- session resumption.

### Passo a passo

1. Criar estrutura de estado.
2. Registrar fatos.
3. Registrar fontes.
4. Registrar decisões.
5. Registrar lacunas.
6. Compactar periodicamente.
7. Preservar IDs.
8. Revalidar retomada.
9. Sinalizar incerteza.
10. Escalonar quando necessário.

### Atividade

Crie scratchpad para investigar bug em monorepo.

## Avaliação do nível

Você deve conseguir desenhar, em quadro branco:

- agente de suporte;
- sistema multiagente;
- CI review;
- extração documental;
- estratégia de contexto.
