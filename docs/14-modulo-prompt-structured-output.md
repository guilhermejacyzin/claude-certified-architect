# Módulo 4 - Prompt Engineering e Structured Output

Peso no exame: **20%**.

## Objetivo

Você deve saber criar prompts e contratos de saída que produzam resultados
consistentes, validáveis e seguros para sistemas downstream.

## 1. Prompt bom começa com critério

Prompt fraco:

```text
Revise este código.
```

Prompt forte:

```text
Revise apenas bugs que possam causar falha funcional, segurança, perda de dados
ou regressão. Não reporte estilo. Para cada finding, cite arquivo, linha,
evidência, severidade e correção mínima.
```

Critérios reduzem falso positivo.

## 2. Few-shot prompting

Use few-shot quando:

- há formato difícil;
- há ambiguidades recorrentes;
- o modelo confunde severidade;
- você quer demonstrar estilo de classificação;
- há casos-limite.

Não use few-shot como substituto de:

- schema;
- validação;
- hook;
- regra de negócio determinística.

## 3. Structured output

Se outro sistema vai consumir a resposta, prefira contrato explícito.

Fraco:

```text
Responda em JSON.
```

Forte:

- tool use com JSON Schema;
- validação;
- retry com erro específico;
- fallback para ausência.

## 4. Schema design

### Required vs optional

Use `required` para campos que sempre devem existir.

Use optional/nullable quando a fonte pode não conter informação.

Exemplo:

```json
{
  "type": "object",
  "required": ["contract_id", "parties", "effective_date"],
  "properties": {
    "contract_id": { "type": "string" },
    "parties": {
      "type": "array",
      "items": { "type": "string" }
    },
    "effective_date": {
      "type": ["string", "null"],
      "description": "ISO date if explicitly present; null if absent."
    },
    "effective_date_absence_reason": {
      "type": ["string", "null"]
    }
  }
}
```

### Enums

Enums ajudam consistência:

```json
{
  "risk_level": {
    "type": "string",
    "enum": ["low", "medium", "high", "unknown"]
  }
}
```

Quando categorias podem não cobrir tudo:

```json
{
  "risk_type": {
    "enum": ["payment", "termination", "liability", "other"]
  },
  "other_detail": {
    "type": ["string", "null"]
  }
}
```

## 5. Validação e retry

Pipeline:

```text
1. Claude extrai JSON via schema.
2. Validador checa sintaxe/schema.
3. Validador semântico checa regras de negócio.
4. Se falhar por formato, retry com erro específico.
5. Se informação ausente, não retry infinito; marque null/unknown.
6. Se baixa confiança, revisão humana.
```

Retry ruim:

```text
Sua resposta está errada. Tente de novo.
```

Retry bom:

```text
O campo termination_date falhou validação: esperado ISO 8601 YYYY-MM-DD ou null.
Você retornou "next quarter". Reextraia mantendo null se a data não estiver
explicitamente presente.
```

## 6. Confidence

Confidence deve ser útil, não decorativa.

Bom:

```json
{
  "field": "payment_terms",
  "value": "Net 30",
  "confidence": 0.92,
  "evidence": "Payment shall be due within thirty (30) days..."
}
```

Use confidence para:

- roteamento humano;
- análise de qualidade;
- identificar tipos de documento problemáticos;
- priorizar revisão.

## 7. Batch processing

Use batch quando:

- muitos itens independentes;
- latência de até horas é aceitável;
- custo é relevante;
- você consegue correlacionar por `custom_id`;
- falhas parciais podem ser reprocessadas.

Não use batch quando:

- precisa de interação imediata;
- cada item depende do output anterior;
- há tool calling multi-turn obrigatório;
- workflow precisa de intervenção humana por item em tempo real.

## 8. Multi-pass e multi-instance

### Multi-pass

Mesmo modelo, passos diferentes:

1. extrair;
2. validar;
3. revisar lacunas;
4. gerar final.

### Multi-instance

Instâncias independentes:

- uma gera;
- outra critica;
- outra valida consistência.

Útil para:

- code review;
- pesquisa;
- documentos complexos;
- reduzir viés de primeira resposta.

## 9. Extração estruturada de documentos

Passo a passo:

1. Classifique tipo do documento.
2. Escolha schema por tipo.
3. Extraia campos com evidência.
4. Valide schema.
5. Valide semântica.
6. Refaça apenas campos problemáticos.
7. Calcule confidence.
8. Route low confidence para humano.
9. Armazene output com versão do schema.

## 10. Prompt para reduzir falso positivo

Modelo:

```text
Reporte apenas problemas que satisfaçam todos os critérios:
- há caminho plausível de falha;
- há evidência no trecho;
- o impacto é funcional, segurança ou dados;
- a recomendação é específica.

Não reporte:
- estilo;
- preferências sem impacto;
- hipótese sem evidência;
- problema que testes existentes já cobrem claramente.
```

## Checklist do domínio

Você domina este domínio se consegue:

- escrever critérios explícitos;
- usar few-shot no lugar certo;
- desenhar JSON Schema;
- escolher nullable corretamente;
- criar validation-retry loop;
- definir confidence;
- decidir batch vs online;
- projetar multi-pass review;
- evitar alucinação por schema ruim.
