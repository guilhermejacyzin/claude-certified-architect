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
## Aula pratica completa

Este lab treina uma habilidade essencial para aplicacoes corporativas com IA:
transformar texto livre em dados estruturados sem inventar informacao. O modelo
pode ajudar a extrair campos, mas a aplicacao precisa impor schema, validar
semantica, controlar retry e decidir quando uma pessoa deve revisar.

Saida estruturada nao e apenas "pedir JSON". Em uma pipeline confiavel, o JSON
precisa ter contrato, tipos, campos obrigatorios, representacao explicita de
ausencia, rastreabilidade e tratamento de baixa confianca. Isso reduz
alucinacao e melhora integracao com sistemas downstream.

### Modelo mental

Imagine que voce esta preenchendo uma ficha a partir de um contrato. Se o
contrato nao informa a data de encerramento, a resposta correta nao e chutar.
A resposta correta e registrar `null`, justificar que o campo nao foi
encontrado e, se o campo for critico, enviar para revisao humana.

### Passo a passo detalhado

1. Liste todos os campos que o sistema consumidor precisa.
2. Classifique cada campo como obrigatorio, opcional ou nullable.
3. Defina enums para categorias fechadas, como tipos de risco.
4. Inclua campo de detalhe livre quando houver enum `other`.
5. Inclua confianca por campo, nao apenas confianca global.
6. Inclua evidencias quando possivel: trecho, pagina, clausula ou secao.
7. Chame Claude com instrucao para nao inferir dados ausentes.
8. Valide o JSON contra schema.
9. Se o schema falhar, envie ao modelo apenas o erro de validacao e solicite
   correcao restrita.
10. Aplique validacao semantica em codigo: datas coerentes, partes nao vazias,
    moeda consistente, risco compativel com texto.
11. Defina limite de retries.
12. Encaminhe para humano quando confianca baixa, evidencia ausente ou regra
    semantica falhar.

### Exemplo simplificado

Se o texto diz "o contrato comeca em 10/01/2026", a data efetiva pode ser
extraida. Se o texto nao fala quando termina, o campo `termination_date` deve
ser `null`. Se o modelo disser "provavelmente 12 meses", isso e inferencia nao
suportada e deve ser rejeitada.

### Validacoes semanticas recomendadas

| Validacao | Motivo |
| --- | --- |
| `termination_date >= effective_date` | impede datas impossiveis |
| `party_names.length > 0` | contrato sem partes nao e util |
| `other_detail` obrigatorio quando risco for `other` | evita categoria vazia |
| confianca menor que 0.75 exige revisao | reduz automacao em campo incerto |
| evidencia obrigatoria para risco alto | melhora auditoria |

### Erros comuns que a prova costuma explorar

- Pedir "responda em JSON" sem schema.
- Tornar campo obrigatorio mesmo quando o documento pode nao informar.
- Nao representar ausencia de informacao.
- Fazer retry com o prompt inteiro em vez de enviar erro especifico.
- Aceitar JSON valido mas semanticamente errado.
- Automatizar decisao critica com confianca baixa.

### Checklist de dominio

- Consigo criar schema que nao induz alucinacao.
- Consigo separar validacao estrutural de validacao semantica.
- Consigo explicar retry corretivo.
- Consigo definir criterio de human review.
- Consigo preservar evidencia para auditoria.

### Entregavel do aluno

Entregue schema completo, prompt de extracao, lista de validacoes semanticas,
estrategia de retry, regra de revisao humana, exemplo de contrato ficticio e
saida JSON esperada.
