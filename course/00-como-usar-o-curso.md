# 00 - Como Usar o Curso

## Objetivo desta aula

Transformar o repositório em uma formação organizada. Antes de estudar conteúdo,
você precisa entender como praticar.

## Pré-requisitos

Você não precisa ser especialista em Claude. Ajuda ter noções de:

- APIs;
- JSON;
- Git;
- revisão de código;
- sistemas corporativos;
- workflows de atendimento ou documentos.

## O que estudar primeiro

1. Leia este arquivo.
2. Leia `../docs/00-mapa-exame.md`.
3. Leia `../docs/10-curso-completo-visao-geral.md`.
4. Faça 10 questões de `../practice/simulado-bilingue-30-questoes.md`.
5. Marque suas lacunas em `../study-log.md`.

## Como medir domínio

Use escala de 0 a 3:

| Nota | Significado |
|---:|---|
| 0 | Não consigo explicar |
| 1 | Reconheço quando leio |
| 2 | Explico e acerto questões simples |
| 3 | Projeto solução e justifico tradeoffs |

Você deve chegar em 3 nos cinco domínios.

## Como responder questão scenario-based

Passo a passo:

1. Leia o cenário.
2. Identifique ação de risco.
3. Identifique dado ausente.
4. Identifique quem deve garantir a regra: modelo, tool, hook, schema ou humano.
5. Elimine alternativas que usam prompt para garantia crítica.
6. Elimine alternativas que ignoram contexto/proveniência.
7. Escolha a resposta mais robusta em produção.

## Exemplo rápido

### Questão

Um agente pode aprovar reembolso alto. O que fazer?

### Raciocínio

- Risco: financeiro.
- Garantia: não pode ficar só no prompt.
- Controle: tool ou hook precisa bloquear sem aprovação.
- Humano: entra quando limite é excedido.

### Resposta esperada

Gate determinístico com approval ID.

## Rotina diária de estudo

### 60 minutos

1. 20 min leitura.
2. 20 min exemplos/lab.
3. 20 min questões.

### 120 minutos

1. 30 min leitura.
2. 30 min lab.
3. 30 min simulado.
4. 30 min revisão de erros.

### 180 minutos

1. 40 min módulo.
2. 40 min lab.
3. 40 min questões.
4. 30 min flashcards.
5. 30 min escrever exemplo próprio.

## Como revisar erros

Para cada erro, registre:

- domínio;
- conceito;
- por que a alternativa errada parecia boa;
- qual palavra no enunciado indicava a resposta certa;
- qual regra você deve lembrar.

## Checklist para avançar

Antes de ir para o próximo nível, responda:

- consigo explicar o conceito em linguagem normal?
- consigo explicar tecnicamente?
- consigo dar exemplo simplificado?
- consigo identificar anti-pattern?
- consigo aplicar em um cenário?
