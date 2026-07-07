# Lab 05 - Contexto e Confiabilidade

## Objetivo

Projetar gestão de contexto para uma investigação longa em codebase grande.

## Cenário

Você precisa descobrir por que testes de integração falham em um monorepo.

## Exercício

1. Use `Glob` para mapear arquivos candidatos.
2. Use `Grep` para buscar símbolos relevantes.
3. Leia poucos arquivos por vez.
4. Crie scratchpad com:
   - fatos confirmados;
   - hipóteses;
   - arquivos lidos;
   - lacunas;
   - próximos passos.
5. Defina quando chamar subagente.
6. Defina como compactar contexto.

## Critérios de sucesso

- Não carregar monorepo inteiro.
- Fatos têm fonte.
- Hipóteses são separadas de evidências.
- Subagentes retornam resumo, não dump.
- Compaction preserva estado operacional.
