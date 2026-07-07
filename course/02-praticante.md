# 02 - Nível Praticante

Objetivo: aplicar os conceitos em soluções pequenas e controladas.

## Aula 6 - Projetar uma tool boa

### Explicação normal

Uma tool boa é clara. Claude deve entender quando usar, quais dados passar e o
que esperar de volta.

### Explicação técnica

Checklist:

- nome específico;
- descrição com escopo;
- input schema;
- output previsível;
- erro estruturado;
- read-only ou mutating;
- pré-requisitos.

### Exemplo simplificado

Botão com rótulo claro reduz erro.

### Atividade

Desenhe `lookup_invoice(invoice_id)`.

Inclua:

- descrição;
- input;
- output;
- erros.

## Aula 7 - Erros estruturados

### Explicação normal

Quando algo falha, Claude precisa saber o que fazer em seguida.

### Explicação técnica

Tipos:

- transient;
- validation;
- permission;
- business_rule;
- not_found;
- unsafe.

### Exemplo simplificado

"Deu erro" não ajuda. "Permissão negada, escale" ajuda.

### Atividade

Crie erro estruturado para:

1. timeout;
2. cliente inexistente;
3. refund bloqueado;
4. permissão insuficiente.

## Aula 8 - Claude Code em projeto real

### Explicação normal

Claude Code precisa de instruções de projeto e regras por área.

### Explicação técnica

Configure:

- `CLAUDE.md`;
- `.claude/rules/`;
- `.claude/commands/`;
- `.claude/skills/`;
- hooks se necessário.

### Exemplo simplificado

Onboarding de um novo dev assistente.

### Atividade

Crie outline de `CLAUDE.md` para um projeto de API.

## Aula 9 - Plan mode na prática

### Explicação normal

Plan mode é para pensar antes de mexer.

### Explicação técnica

Use plan mode quando:

- múltiplos arquivos;
- auth;
- persistência;
- arquitetura;
- risco alto;
- escopo incerto.

### Atividade

Classifique 10 tarefas como plan ou direct:

1. typo;
2. migration;
3. alterar login;
4. atualizar README;
5. refatorar módulo;
6. trocar biblioteca;
7. criar teste simples;
8. alterar schema de banco;
9. corrigir lint;
10. mexer em autorização.

## Aula 10 - Structured extraction simples

### Explicação normal

Claude preenche campos a partir de documento.

### Explicação técnica

Pipeline:

1. schema;
2. extração;
3. validação;
4. retry;
5. human review se baixa confiança.

### Atividade

Crie pipeline para extrair dados de recibo.

Campos:

- fornecedor;
- data;
- valor;
- moeda;
- categoria;
- confidence.

## Avaliação do nível

Você deve conseguir construir:

- uma tool;
- um erro estruturado;
- um mini `CLAUDE.md`;
- uma decisão plan/direct;
- um schema simples.
