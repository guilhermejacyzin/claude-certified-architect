# 05 - Context Management & Reliability: 10 Exemplos Passo a Passo

## Exemplo 1 - Scratchpad de investigação

### Passo a passo

1. Criar arquivo de scratchpad.
2. Registrar objetivo.
3. Registrar fatos confirmados.
4. Registrar hipóteses.
5. Registrar fontes/arquivos.
6. Registrar lacunas.
7. Atualizar após cada descoberta.
8. Separar fato de hipótese.
9. Compactar sem perder decisões.
10. Usar no handoff.

### Decisão correta

Scratchpad preserva estado operacional.

### Exemplo simplificado

Caderno de investigação.

## Exemplo 2 - Exploração de monorepo

### Passo a passo

1. Perguntar objetivo.
2. Usar `Glob`.
3. Usar `Grep`.
4. Ler arquivos candidatos.
5. Mapear dependências.
6. Registrar achados.
7. Formular hipótese.
8. Validar hipótese.
9. Editar mínimo.
10. Rodar testes.

### Decisão correta

Busca seletiva antes de leitura ampla.

### Exemplo simplificado

Use índice antes de ler livro inteiro.

## Exemplo 3 - Progressive summarization

### Passo a passo

1. Identificar informação crítica.
2. Resumir fatos.
3. Resumir decisões.
4. Resumir fontes.
5. Resumir lacunas.
6. Remover conversa irrelevante.
7. Preservar IDs importantes.
8. Preservar próximos passos.
9. Atualizar a cada etapa.
10. Usar na retomada.

### Decisão correta

Resumo bom preserva operação, não só narrativa.

### Exemplo simplificado

Ata curta com decisões e pendências.

## Exemplo 4 - Proveniência por claim

### Passo a passo

1. Identificar claim.
2. Associar fonte.
3. Associar data.
4. Associar trecho.
5. Atribuir confidence.
6. Marcar conflito.
7. Marcar lacuna.
8. Usar na síntese.
9. Não perder fonte no resumo.
10. Revisar claims sem fonte.

### Decisão correta

Relatório confiável precisa de fonte por afirmação.

### Exemplo simplificado

Toda conclusão com recibo.

## Exemplo 5 - Conflito entre fontes

### Passo a passo

1. Detectar valores divergentes.
2. Registrar fonte A.
3. Registrar fonte B.
4. Comparar datas.
5. Comparar escopo.
6. Explicar possível causa.
7. Não escolher sem justificativa.
8. Apresentar ambos.
9. Indicar incerteza.
10. Recomendar validação se crítico.

### Decisão correta

Preservar conflito é melhor que esconder.

### Exemplo simplificado

Dois recibos diferentes precisam aparecer no relatório.

## Exemplo 6 - Escalonamento por baixa confiança

### Passo a passo

1. Medir confidence.
2. Comparar com threshold.
3. Verificar criticidade do campo.
4. Se crítico e baixo, bloquear automação.
5. Criar handoff.
6. Incluir evidência.
7. Incluir campo incerto.
8. Incluir recomendação.
9. Enviar para humano.
10. Registrar decisão final.

### Decisão correta

Baixa confiança em campo crítico exige revisão.

### Exemplo simplificado

Se não tem certeza sobre valor financeiro, peça conferência.

## Exemplo 7 - Error propagation em multiagente

### Passo a passo

1. Subagente falha em busca.
2. Retorna tipo de erro.
3. Retorna query tentada.
4. Retorna resultados parciais.
5. Retorna lacunas.
6. Coordenador avalia.
7. Decide retry, outro subagente ou parcial.
8. Síntese marca lacuna.
9. Usuário recebe transparência.
10. Log registra falha.

### Decisão correta

Erro parcial não deve sumir.

### Exemplo simplificado

Pesquisador diz: "não achei fonte X, mas encontrei Y".

## Exemplo 8 - Retomada segura

### Passo a passo

1. Ler resumo anterior.
2. Verificar arquivos mudados.
3. Revalidar hipóteses.
4. Atualizar scratchpad.
5. Marcar decisões obsoletas.
6. Confirmar objetivo atual.
7. Ajustar plano.
8. Continuar execução.
9. Rodar validação.
10. Gerar novo resumo.

### Decisão correta

Estado antigo pode estar stale.

### Exemplo simplificado

Atualize o mapa antes de continuar viagem.

## Exemplo 9 - Context window com documento longo

### Passo a passo

1. Dividir documento em partes.
2. Extrair fatos por parte.
3. Preservar localização.
4. Resumir cada parte.
5. Agregar fatos.
6. Detectar conflitos.
7. Evitar colar tudo.
8. Passar só contexto relevante.
9. Guardar referência para voltar.
10. Gerar resposta com fontes.

### Decisão correta

Chunking e extração estruturada superam contexto bruto gigante.

### Exemplo simplificado

Ler capítulo por capítulo e fazer fichamento.

## Exemplo 10 - Calibração de confidence

### Passo a passo

1. Coletar amostra rotulada.
2. Rodar extração.
3. Registrar confidence.
4. Comparar com acerto.
5. Agrupar por campo.
6. Agrupar por tipo de documento.
7. Ajustar threshold.
8. Definir revisão humana.
9. Monitorar drift.
10. Atualizar prompts/schema.

### Decisão correta

Confidence precisa ser testada contra realidade.

### Exemplo simplificado

Verificar se quem diz "tenho certeza" realmente acerta.
