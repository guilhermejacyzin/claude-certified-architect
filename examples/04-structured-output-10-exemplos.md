# 04 - Prompt Engineering & Structured Output: 10 Exemplos Passo a Passo

## Exemplo 1 - Extração de contrato com schema

### Passo a passo

1. Defina campos necessários.
2. Separe required e nullable.
3. Defina tipos.
4. Inclua evidência por campo.
5. Peça tool use estruturado.
6. Valide JSON.
7. Valide semântica.
8. Retry campos inválidos.
9. Route baixa confiança.
10. Salve resultado com versão do schema.

### Decisão correta

Extração para downstream pede schema e validação.

### Exemplo simplificado

Preencher formulário a partir do contrato.

## Exemplo 2 - Campo ausente

### Passo a passo

1. Identifique campo potencialmente ausente.
2. Permita `null`.
3. Adicione `absence_reason`.
4. Instrua não inferir sem evidência.
5. Exija citação.
6. Valide se valor tem evidência.
7. Se não houver, manter null.
8. Não fazer retry infinito.
9. Registrar confidence baixa.
10. Revisar se campo for crítico.

### Decisão correta

Nullable evita invenção.

### Exemplo simplificado

Se não consta no documento, escreva "não consta".

## Exemplo 3 - Enum com fallback

### Passo a passo

1. Liste categorias conhecidas.
2. Crie enum.
3. Inclua `other`.
4. Inclua `other_detail`.
5. Instrua quando usar `other`.
6. Valide enum.
7. Analise frequência de `other`.
8. Atualize schema se necessário.
9. Preserve compatibilidade.
10. Documente versão.

### Decisão correta

Enum melhora consistência sem bloquear casos novos.

### Exemplo simplificado

Lista com opção "outro: explique".

## Exemplo 4 - Review de código com critérios

### Passo a passo

1. Defina escopo do diff.
2. Defina problema reportável.
3. Exclua estilo.
4. Peça evidência.
5. Peça severidade.
6. Peça recomendação.
7. Peça confidence.
8. Exija JSON.
9. Valide output.
10. Filtre falso positivo.

### Decisão correta

Critérios explícitos reduzem ruído.

### Exemplo simplificado

Comente só problema real, não gosto pessoal.

## Exemplo 5 - Few-shot para ambiguidade

### Passo a passo

1. Identifique erro recorrente.
2. Crie exemplo positivo.
3. Crie exemplo negativo.
4. Explique diferença.
5. Mantenha exemplos curtos.
6. Cubra caso ambíguo.
7. Rode teste.
8. Meça melhoria.
9. Remova exemplo irrelevante.
10. Atualize quando padrão mudar.

### Decisão correta

Few-shot ensina julgamento e formato.

### Exemplo simplificado

Mostrar "isso conta" e "isso não conta".

## Exemplo 6 - Retry com erro específico

### Passo a passo

1. Validador detecta falha.
2. Captura campo.
3. Captura valor inválido.
4. Captura regra violada.
5. Reenvia documento ou trecho relevante.
6. Pede correção só do campo.
7. Mantém null se ausente.
8. Valida novamente.
9. Limita retries.
10. Escalona se persistir.

### Decisão correta

Retry genérico é fraco; retry específico é forte.

### Exemplo simplificado

"A data precisa estar como AAAA-MM-DD" é melhor que "tente de novo".

## Exemplo 7 - Confidence por campo

### Passo a passo

1. Exija valor.
2. Exija evidência.
3. Exija confidence.
4. Defina escala.
5. Defina threshold.
6. Revise baixa confiança.
7. Meça acerto real.
8. Calibre por campo.
9. Ajuste threshold.
10. Registre métricas.

### Decisão correta

Confidence útil precisa orientar revisão.

### Exemplo simplificado

Se não tem certeza, peça conferência.

## Exemplo 8 - Batch de documentos

### Passo a passo

1. Confirme que documentos são independentes.
2. Defina schema.
3. Atribua `custom_id`.
4. Envie batch.
5. Aguarde processamento.
6. Colete resultados.
7. Correlacione por ID.
8. Separe falhas.
9. Reenvie falhas corrigidas.
10. Calcule SLA/custo.

### Decisão correta

Batch é para volume independente com latência tolerável.

### Exemplo simplificado

Fila noturna de documentos.

## Exemplo 9 - Multi-pass extraction

### Passo a passo

1. Passo 1: classificar documento.
2. Passo 2: extrair campos.
3. Passo 3: validar.
4. Passo 4: revisar baixa confiança.
5. Passo 5: gerar output final.
6. Preservar evidência.
7. Preservar schema version.
8. Limitar reprocessamento.
9. Logar erros.
10. Medir qualidade.

### Decisão correta

Passes separados ajudam tarefa complexa.

### Exemplo simplificado

Primeiro identificar o tipo de formulário, depois preencher.

## Exemplo 10 - Multi-instance review

### Passo a passo

1. Instância A gera análise.
2. Instância B critica.
3. Instância C valida critérios.
4. Agregador compara.
5. Remove duplicatas.
6. Mantém evidência.
7. Marca discordância.
8. Define conclusão.
9. Pede humano se conflito crítico.
10. Registra decisão.

### Decisão correta

Instâncias independentes podem reduzir viés em tarefas críticas.

### Exemplo simplificado

Um escreve, outro revisa, outro confere checklist.
