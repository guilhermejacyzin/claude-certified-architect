# Drills De Estudo

Drills são exercícios curtos e repetitivos para transformar leitura em reflexo.
Use esta pasta depois de estudar `academy/` e antes dos simulados.

## Rotina Recomendada

1. Escolha um bloco de 20 minutos.
2. Responda sem consultar.
3. Corrija com o gabarito.
4. Marque erro no `study-log.md`.
5. Refaça os erros no dia seguinte.

## Ordem

1. `01-drills-academy.md`: classificação, decisão arquitetural e controle de
   risco por tópico do learning path.

Critério: você deve conseguir justificar a resposta, não apenas acertar a letra.
## Como Usar Os Drills Como Escola

Drill nao e simulado completo. Simulado mede desempenho em uma prova longa.
Drill treina uma decisao pequena ate ela ficar automatica. Em Claude, MCP e
arquitetura agentic, muitos erros surgem porque a pessoa sabe a definicao, mas
nao reconhece o cenario. O drill resolve exatamente isso: ele repete padroes de
decisao.

### Passo a passo

1. Leia o enunciado uma vez.
2. Identifique o dominio: API, MCP, Claude Code, RAG, avaliacao, seguranca ou
   workflow.
3. Responda em ate 90 segundos.
4. Escreva a justificativa em uma frase.
5. Confira o gabarito.
6. Se errou, classifique o erro:
   - conceito nao entendido;
   - pegadinha de linguagem;
   - falta de atencao;
   - desconhecimento de arquitetura;
   - confundiu tool, resource e prompt;
   - confundiu prompt engineering com guardrail de codigo.
7. Registre no `study-log.md`.
8. Refaca o mesmo item no dia seguinte.

### Exemplo simplificado

Se a pergunta descreve "documento externo contendo instrucao para ignorar regras",
o reflexo esperado e pensar em prompt injection indireta. A resposta forte nao e
"melhorar o prompt"; e separar dado de instrucao, aplicar least privilege,
validar tool calls e exigir aprovacao quando houver acao sensivel.

### Rubrica de dominio

| Nivel | Sinal observado |
| --- | --- |
| Inicial | acerta algumas questoes por memoria, mas nao explica o motivo |
| Intermediario | explica o conceito, mas demora para aplicar em cenario novo |
| Avancado | reconhece anti-pattern rapidamente e justifica com arquitetura |
| Especialista | compara alternativas, aponta trade-off e sugere controle pratico |

### Como transformar erro em estudo

Para cada erro, escreva:

```md
## Erro

Questao: ...
Minha resposta: ...
Resposta correta: ...
Tipo de erro: ...
Conceito que faltou: ...
Como eu reconheceria isso na proxima vez: ...
Fonte para revisar: ...
```

### Criterio de passagem

Antes de ir para os simulados avancados, tente atingir:

- 80% de acerto sem consulta;
- justificativa correta em pelo menos 70% dos acertos;
- nenhum erro repetido tres vezes;
- capacidade de explicar os erros em voz alta;
- capacidade de mapear cada erro para uma aula da academia.
