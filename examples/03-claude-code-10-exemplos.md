# 03 - Claude Code Configuration & Workflows: 10 Exemplos Passo a Passo

## Exemplo 1 - Criar CLAUDE.md de projeto

### Passo a passo

1. Descreva objetivo do projeto.
2. Liste stack principal.
3. Liste comandos de teste.
4. Liste comando de lint.
5. Descreva arquitetura em 5 a 10 linhas.
6. Liste convenções importantes.
7. Liste proibições seguras.
8. Inclua como validar mudanças.
9. Evite logs e secrets.
10. Revise se está curto e estável.

### Decisão correta

`CLAUDE.md` é memória estável, não depósito de tudo.

### Exemplo simplificado

Manual de onboarding do assistente no projeto.

## Exemplo 2 - Rule para backend

### Passo a passo

1. Identifique pasta `src/api/**`.
2. Crie rule para esse caminho.
3. Defina padrão de erro.
4. Defina padrão de validação.
5. Defina testes obrigatórios.
6. Defina política de migrations.
7. Inclua exemplos mínimos.
8. Não misture frontend.
9. Teste abrindo arquivo backend.
10. Ajuste escopo se carregar em excesso.

### Decisão correta

Convenção específica de pasta vai em rule path-specific.

### Exemplo simplificado

Manual do setor backend.

## Exemplo 3 - Rule para frontend

### Passo a passo

1. Identifique `src/components/**`.
2. Defina design system.
3. Defina acessibilidade.
4. Defina padrão de estado.
5. Defina teste de componente.
6. Bloqueie CSS global sem motivo.
7. Inclua exemplo de componente.
8. Não inclua regra de API.
9. Teste arquivo React.
10. Ajuste se regra for ampla demais.

### Decisão correta

Não aplicar regra React em Python.

### Exemplo simplificado

Cada departamento tem seu manual.

## Exemplo 4 - Slash command de review PR

### Passo a passo

1. Nomeie `/review-pr`.
2. Defina entrada: diff ou branch.
3. Defina foco: bugs reais.
4. Exclua estilo sem impacto.
5. Exija evidência.
6. Exija severidade.
7. Exija arquivo/linha.
8. Defina JSON final.
9. Defina resumo humano.
10. Teste com PR antigo.

### Decisão correta

Workflow repetitivo vira slash command.

### Exemplo simplificado

Checklist padrão de revisão.

## Exemplo 5 - Skill de contrato de API

### Passo a passo

1. Crie `.claude/skills/api-contract/SKILL.md`.
2. Escreva descrição precisa.
3. Explique quando usar.
4. Inclua checklist de compatibilidade.
5. Inclua exemplos de breaking change.
6. Inclua comandos de validação.
7. Inclua referência OpenAPI se houver.
8. Restrinja tools se necessário.
9. Teste em mudança de DTO.
10. Ajuste descrição se skill não disparar.

### Decisão correta

Skill encapsula capacidade especializada.

### Exemplo simplificado

Manual especializado que só abre quando o assunto aparece.

## Exemplo 6 - Hook bloqueando comando destrutivo

### Passo a passo

1. Defina evento `PreToolUse`.
2. Detecte comando destrutivo.
3. Bloqueie padrões perigosos.
4. Retorne razão.
5. Sugira alternativa segura.
6. Logue evento.
7. Teste comando seguro.
8. Teste comando perigoso.
9. Evite falso positivo exagerado.
10. Documente regra.

### Decisão correta

Comando destrutivo pede hook/gate, não só prompt.

### Exemplo simplificado

Trava automática antes de apertar botão perigoso.

## Exemplo 7 - Plan mode para refatoração

### Passo a passo

1. Usuário pede refatoração multi-arquivo.
2. Claude entra em plan mode.
3. Mapeia arquivos.
4. Explica alternativas.
5. Lista riscos.
6. Propõe sequência.
7. Pede aprovação.
8. Só então edita.
9. Roda testes.
10. Resume mudanças.

### Decisão correta

Mudança arquitetural pede plano antes de edição.

### Exemplo simplificado

Faça planta antes da reforma.

## Exemplo 8 - Direct execution para correção simples

### Passo a passo

1. Usuário pede corrigir typo.
2. Claude localiza arquivo.
3. Faz edição pequena.
4. Confere diff.
5. Não cria plano longo.
6. Não abre arquivos desnecessários.
7. Informa alteração.
8. Teste só se fizer sentido.
9. Evita escopo extra.
10. Finaliza.

### Decisão correta

Tarefa simples não precisa plan mode pesado.

### Exemplo simplificado

Trocar lâmpada não exige projeto de engenharia.

## Exemplo 9 - CI com JSON

### Passo a passo

1. CI chama Claude Code em modo não interativo.
2. Envia diff.
3. Envia critérios.
4. Pede JSON schema.
5. Claude retorna findings.
6. Pipeline valida JSON.
7. Filtra severidade.
8. Comenta PR.
9. Bloqueia só severidade alta.
10. Armazena métricas.

### Decisão correta

CI precisa output estruturado e critérios.

### Exemplo simplificado

Robô de revisão preenche formulário, não escreve opinião solta.

## Exemplo 10 - Iterative refinement

### Passo a passo

1. Criar primeira solução.
2. Rodar teste.
3. Capturar erro.
4. Explicar causa.
5. Ajustar uma coisa.
6. Rodar teste novamente.
7. Repetir até passar.
8. Rodar teste relacionado.
9. Revisar diff.
10. Registrar aprendizado.

### Decisão correta

Melhoria progressiva com feedback supera tentativa única.

### Exemplo simplificado

Escrever, revisar, corrigir, testar.
