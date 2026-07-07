# Lab 04 - Structured Output

## Objetivo

Criar uma pipeline de extração com schema, validação, retry e revisão humana.

## Cenário

Extrair dados de contratos:

- `contract_id`
- `party_names`
- `effective_date`
- `termination_date`
- `payment_terms`
- `risk_flags`
- `confidence_by_field`

## Exercício

1. Defina JSON Schema.
2. Marque campos que podem ser `null`.
3. Inclua `risk_flags` como enum + fallback `other_detail`.
4. Defina validação semântica.
5. Defina retry quando schema falhar.
6. Defina regra de human review por confidence.

## Critérios de sucesso

- O schema não força alucinação.
- O retry recebe o erro específico.
- Ausência de informação é representada explicitamente.
- Baixa confiança vai para revisão humana.
