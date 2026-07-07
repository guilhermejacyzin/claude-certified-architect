# 04 - Claude Code Em Ação

Este módulo aprofunda os tópicos visíveis no curso "Claude Code in Action" e no
bloco "Anthropic apps - Claude Code and computer use" / "Agents and workflows".

## 1. Anthropic Apps

### Explicação Normal

Claude pode aparecer em diferentes superfícies: web, desktop, IDE, terminal,
API e integrações. Para arquitetura, o importante é entender qual superfície
tem quais permissões e contexto.

### Como Pensar

- Chat é bom para exploração e explicação.
- Claude Code é bom para codebase e automação de desenvolvimento.
- API é boa para produto.
- MCP conecta a sistemas.
- Computer use é para interação com ambiente visual, quando permitido.

## 2. Claude Code Setup

### Passo a Passo

1. Instalar Claude Code.
2. Autenticar.
3. Abrir projeto.
4. Criar `CLAUDE.md`.
5. Definir comandos de teste.
6. Definir convenções.
7. Configurar MCPs necessários.
8. Criar rules por caminho.
9. Criar commands úteis.
10. Testar fluxo simples.

### Exemplo Simplificado

Preparar a mesa de trabalho antes de chamar o assistente.

## 3. Claude Code In Action

### Workflow Básico

1. Descrever tarefa.
2. Claude explora arquivos.
3. Claude propõe plano se necessário.
4. Claude edita.
5. Claude roda testes.
6. Claude corrige.
7. Claude resume.

### Quando Intervir

Intervenha quando:

- Claude sai do escopo;
- quer editar demais;
- ignora regra;
- não roda teste;
- faz suposição fraca;
- usa comando arriscado.

## 4. Enhancements With MCP Servers

### Explicação Normal

MCP amplia Claude Code com dados e ferramentas externas.

### Exemplos

- GitHub issues;
- Jira tickets;
- documentação interna;
- banco de dados local;
- monitoramento;
- sistema de arquivos controlado.

### Passo a Passo

1. Identificar tarefa repetitiva.
2. Escolher sistema externo.
3. Instalar/configurar MCP.
4. Definir escopo.
5. Testar tools.
6. Validar segurança.
7. Usar em workflow.
8. Medir ganho.
9. Ajustar descrições.
10. Documentar.

## 5. Agents And Workflows

### Explicação Normal

Workflow é sequência planejada. Agente é sistema que decide próximos passos.

### Diferença

| Conceito | Melhor Para |
|---|---|
| Workflow | processo previsível |
| Agent | tarefa aberta/adaptativa |
| Subagent | subtarefa especializada |
| Hook | regra determinística |

### Exemplo Simplificado

Receita de bolo é workflow. Investigar bug desconhecido é agente.

## 6. Parallelization Workflows

### Quando Usar

- tarefas independentes;
- documentos diferentes;
- reviews independentes;
- pesquisas por fonte;
- comparação de alternativas.

### Passo a Passo

1. Dividir tarefa.
2. Garantir independência.
3. Definir output comum.
4. Executar paralelo.
5. Agregar.
6. Remover duplicidade.
7. Resolver conflitos.
8. Sinalizar lacunas.
9. Revisar final.
10. Medir latência.

## 7. Chaining Workflows

### Quando Usar

- pipeline previsível;
- output de uma etapa vira input da próxima;
- revisão de documento;
- extração/validação/retry.

### Exemplo

```text
classificar documento -> extrair campos -> validar -> revisar -> salvar
```

## 8. Routing Workflows

### Explicação Normal

Routing escolhe caminho conforme tipo de tarefa.

### Exemplo

```text
Se ticket é billing -> agente financeiro
Se ticket é technical -> agente técnico
Se ticket é account -> agente de conta
Se não classificar -> humano
```

### Passo a Passo

1. Definir categorias.
2. Criar critérios.
3. Classificar entrada.
4. Medir confiança.
5. Encaminhar.
6. Tratar baixa confiança.
7. Registrar decisão.
8. Monitorar erro.
9. Ajustar categorias.
10. Revisar periodicamente.

## 9. Agents And Tools

### Princípio

Agente decide; tool executa; sistema valida.

### Passo a Passo

1. Definir intenção.
2. Escolher tool.
3. Validar input.
4. Executar.
5. Retornar resultado.
6. Atualizar contexto.
7. Decidir próxima ação.
8. Tratar erro.
9. Escalonar se necessário.
10. Finalizar.

## 10. Environment Inspection

### Explicação Normal

Antes de agir, Claude Code deve entender ambiente: arquivos, comandos, testes,
dependências e estado Git.

### Checklist

1. Qual branch?
2. Há mudanças não commitadas?
3. Qual stack?
4. Quais testes existem?
5. Qual comando de build?
6. Quais arquivos são relevantes?
7. Há configuração local?
8. Há secrets que não devem ser tocados?
9. Há CI?
10. Qual escopo pedido?

## 11. Workflows Vs Agents

### Workflow

Bom quando:

- passos são conhecidos;
- pouca ambiguidade;
- alta repetição;
- precisa previsibilidade.

### Agent

Bom quando:

- tarefa é aberta;
- precisa investigar;
- decisão muda conforme achados;
- contexto é incerto.

### Critério De Prova

Se a alternativa usa workflow fixo para tarefa aberta, desconfie. Se usa agente
adaptativo para processo simples e regulado, também desconfie.

## 12. Quiz Mental

1. Quando usar parallelization?
2. Quando usar chaining?
3. Quando usar routing?
4. O que Claude Code deve inspecionar antes de editar?
5. Por que MCP melhora Claude Code?

Gabarito:

1. Tarefas independentes.
2. Pipeline previsível com dependência sequencial.
3. Entrada precisa ser classificada para caminho correto.
4. Git, arquivos, stack, testes, comandos e escopo.
5. Porque conecta a ferramentas/dados externos sem copiar tudo no prompt.

## 13. Trilha Aula A Aula Do Curso Claude Code In Action

Esta seção cobre os tópicos visíveis do curso "Claude Code in Action" em formato
de apostila. A ideia é transformar cada item do currículo em competência
observável: o que você precisa entender, fazer, explicar e defender em uma
questão scenario-based.

## 14. What Is Claude Code?

### 14.1 Introduction

Claude Code é uma superfície de trabalho para desenvolvimento com agente. Ele
não é apenas chat com autocomplete; ele consegue inspecionar projeto, ler
arquivos, propor mudanças, editar, executar comandos e iterar com base em testes.

Explicação normal: Claude Code é um assistente que trabalha dentro do projeto,
não apenas responde sobre o projeto.

Explicação técnica: Claude Code combina contexto de repositório, ferramentas de
arquivo, shell controlado, instruções persistentes, comandos, skills, hooks e
integrações MCP. O valor vem da coordenação entre exploração, planejamento,
edição e verificação.

O que a certificação pode cobrar:

1. Quando usar Claude Code em vez de API.
2. Como preparar contexto de projeto.
3. Quando usar plan mode.
4. Como reduzir risco de edição.
5. Como conectar MCP servers.
6. Como usar hooks para controle determinístico.
7. Como preservar estado Git.
8. Como evitar falso positivo em review.
9. Como estruturar comandos repetíveis.
10. Como distribuir contexto para tarefas específicas.

### 14.2 What Is A Coding Assistant?

Um coding assistant ajuda em tarefas de software: leitura, explicação, refatoração,
teste, documentação, revisão e automação. O ponto crítico é que "ajudar" não
significa "ter permissão irrestrita".

Bom coding assistant:

- entende a tarefa antes de editar;
- usa busca antes de leitura extensiva;
- preserva mudanças existentes;
- explica decisões relevantes;
- roda validações;
- mantém escopo;
- evita mexer em arquivos não relacionados;
- pede aprovação quando o risco sobe;
- cita arquivos e comandos usados;
- deixa o projeto em estado verificável.

Coding assistant ruim:

- edita primeiro e entende depois;
- lê tudo sem critério;
- ignora testes;
- muda arquitetura sem necessidade;
- mistura refactor com feature;
- apaga alterações do usuário;
- esconde falhas;
- inventa comandos;
- trata prompt como controle de segurança suficiente.

Exemplo simplificado: um bom assistente de código é como alguém que pega uma
tarefa no quadro, olha o projeto, faz a menor mudança correta e confere se
funcionou.

### 14.3 Claude Code In Action

Workflow detalhado:

1. Ler pedido do usuário.
2. Identificar se é pergunta, revisão, implementação ou investigação.
3. Checar estado Git.
4. Localizar arquivos relevantes com busca.
5. Ler somente o necessário.
6. Criar plano se a mudança for complexa.
7. Editar com escopo mínimo.
8. Executar teste, lint ou build relevante.
9. Corrigir falhas próprias.
10. Resumir mudança, validação e risco residual.

Critério de prova: a resposta certa costuma combinar autonomia com verificação.
Não basta "Claude faz a mudança"; precisa "Claude entende, muda e valida".

## 15. Getting Hands On

### 15.1 Claude Code Setup

Setup não é apenas instalar. É preparar o ambiente para que o agente receba
instruções estáveis, ferramentas corretas e limites claros.

Checklist de setup:

1. Instalar CLI/app conforme ambiente.
2. Autenticar.
3. Abrir a raiz correta do projeto.
4. Confirmar branch atual.
5. Rodar `git status`.
6. Identificar stack.
7. Identificar comandos de teste.
8. Criar ou revisar `CLAUDE.md`.
9. Criar rules por área quando necessário.
10. Criar slash commands para workflows repetidos.
11. Configurar MCPs de projeto, se houver.
12. Configurar hooks para bloqueios e automações.
13. Definir como lidar com secrets.
14. Rodar uma tarefa pequena de validação.
15. Documentar o fluxo para o time.

### 15.2 Project Setup

Um projeto pronto para Claude Code deve responder rapidamente:

- o que este sistema faz?
- como rodar testes?
- onde ficam frontend, backend, infra e docs?
- quais padrões não podem ser quebrados?
- quais comandos são seguros?
- quais arquivos não devem ser alterados sem autorização?
- como validar uma mudança?

Modelo de `CLAUDE.md`:

```markdown
# Project Instructions

## Purpose
Descreva o objetivo do sistema em 3-5 linhas.

## Architecture
Liste módulos principais e responsabilidades.

## Commands
- Test: `...`
- Lint: `...`
- Build: `...`

## Conventions
Liste padrões reais do projeto.

## Safety
- Não editar migrations sem teste.
- Não commitar secrets.
- Não alterar arquivos gerados manualmente.

## Validation
Explique qual validação rodar por tipo de mudança.
```

### 15.3 Adding Context

Adicionar contexto é uma das competências mais importantes. Contexto demais
atrapalha; contexto de menos força suposições. O ideal é fornecer contexto
relevante, comprimido e verificável.

Fontes de contexto:

1. `CLAUDE.md`.
2. README.
3. Arquivos relevantes.
4. Logs curtos.
5. Stack traces.
6. Issues.
7. Regras por caminho.
8. MCP resources.
9. Histórico da conversa.
10. Resumo de decisões.

Passo a passo para adicionar contexto manualmente:

1. Explique objetivo.
2. Diga o escopo.
3. Cite arquivos relevantes, se souber.
4. Informe comando de teste.
5. Informe restrições.
6. Diga o que não fazer.
7. Peça validação esperada.

Prompt ruim:

```text
Arrume isso.
```

Prompt forte:

```text
Corrija a validação de data em `src/contracts/validate.ts`.
Não altere o schema público. Rode os testes de contratos. Se encontrar impacto
em chamadas existentes, pare e explique antes de editar outras áreas.
```

### 15.4 Making Changes

Mudança boa em Claude Code é estreita, verificável e fácil de revisar.

Processo:

1. Entender comportamento esperado.
2. Encontrar implementação atual.
3. Encontrar testes relacionados.
4. Fazer alteração mínima.
5. Adicionar/ajustar teste se o risco justificar.
6. Rodar validação.
7. Corrigir.
8. Mostrar resultado.

Anti-patterns:

- "já que estou aqui" refactor;
- alterar formatação do arquivo inteiro;
- adicionar dependência sem necessidade;
- remover teste que falha;
- não explicar teste que não pôde rodar;
- resolver sintoma sem entender causa.

### 15.5 Course Satisfaction Survey

Use como parada de controle. Antes de prosseguir, responda:

1. Consigo configurar `CLAUDE.md` de um projeto real?
2. Sei quando usar rules por caminho?
3. Sei quando criar slash command?
4. Sei quando criar skill?
5. Sei quando usar hook?
6. Sei quando usar MCP?
7. Sei conduzir uma mudança com estado Git sujo?
8. Sei evitar apagar alterações de outra pessoa?
9. Sei validar com teste relevante?
10. Sei resumir risco residual?

### 15.6 Controlling Context

Controle de contexto é decidir o que entra, o que fica fora e o que deve ser
resumido. Em codebases grandes, esse é o fator que separa respostas úteis de
respostas genéricas.

Estratégia:

1. Descobrir arquivos com busca.
2. Ler arquivos de entrada do fluxo.
3. Ler tipos/interfaces compartilhadas.
4. Ler testes existentes.
5. Manter scratchpad mental ou arquivo de notas quando apropriado.
6. Resumir achados intermediários.
7. Evitar carregar logs gigantes.
8. Revalidar arquivos se a sessão ficou antiga.
9. Passar contexto explícito para subagentes.
10. Remover detalhes irrelevantes da resposta final.

Exemplo simplificado: controlar contexto é separar os documentos que realmente
estão em cima da mesa, em vez de jogar o arquivo inteiro da empresa no chão.

### 15.7 Custom Commands

Custom commands transformam rotinas em workflows repetíveis.

Use command quando:

- o time repete a tarefa;
- a tarefa tem passos claros;
- o output precisa de formato padrão;
- a qualidade depende de checklist;
- você quer reduzir variação entre pessoas.

Exemplos:

```text
/review-pr
/write-regression-test
/summarize-incident
/explain-module
/prepare-release-notes
/migration-risk-review
```

Anatomia de um command forte:

1. Objetivo.
2. Entrada esperada.
3. Passos.
4. Ferramentas permitidas.
5. Critérios de saída.
6. Formato final.
7. Condições para parar e pedir ajuda.

### 15.8 MCP Servers With Claude Code

MCP servers ampliam Claude Code com capacidades além do repositório local. A
pergunta arquitetural é: "qual contexto ou ação externa melhora este workflow?"

Casos úteis:

- consultar issues;
- buscar documentação;
- ler tickets;
- abrir pull requests;
- consultar métricas;
- procurar runbooks;
- acessar schemas internos;
- recuperar decisões arquiteturais.

Riscos:

- expor dados demais;
- dar tool mutating sem gate;
- misturar ambientes dev/prod;
- colocar secrets no config;
- logs com dados sensíveis;
- tool genérica demais.

Checklist antes de habilitar:

1. Qual problema resolve?
2. É read-only ou mutating?
3. Quais dados expõe?
4. Qual ambiente acessa?
5. Quem tem permissão?
6. Como auditar?
7. Como testar?
8. Como desabilitar?
9. Como limitar escopo?
10. Como documentar para o time?

### 15.9 GitHub Integration

Integração com GitHub pode apoiar review, issues, PRs, release notes e leitura
de contexto de desenvolvimento. O risco é transformar a automação em ruído.

Design forte para PR review:

1. Escopo no diff.
2. Critérios explícitos.
3. Severidade.
4. Evidência.
5. Arquivo/linha.
6. Sugestão acionável.
7. Confidence.
8. Não comentar preferência subjetiva.
9. Não bloquear baixa severidade.
10. Permitir revisão humana.

Exemplo de critério:

```text
Reporte apenas bugs com caminho de falha plausível, regressões de contrato,
problemas de segurança, perda de dados ou ausência de teste em mudança crítica.
Não reporte estilo, preferência ou refactor opcional.
```

## 16. Hooks And The SDK

### 16.1 Introducing Hooks

Hooks são pontos de extensão determinísticos. Eles executam antes/depois de
eventos e ajudam a impor regras que não devem depender só do modelo.

Use hooks para:

- bloquear comandos perigosos;
- validar arquivos alterados;
- rodar formatter;
- exigir teste;
- registrar auditoria;
- redigir outputs;
- impedir vazamento acidental;
- reforçar política de branch;
- controlar uso de tools;
- preparar contexto.

Critério de prova: quando a questão disser "precisa garantir", "bloquear",
"auditar", "impedir" ou "sempre", considere hook/código/gate antes de prompt.

### 16.2 Defining Hooks

Ao definir hook, responda:

1. Qual evento dispara?
2. Qual entrada o hook recebe?
3. Qual regra aplica?
4. O hook pode bloquear?
5. Qual mensagem retorna?
6. Como evitar falso bloqueio?
7. Como registrar auditoria?
8. Como testar?
9. Como versionar?
10. Como desabilitar em emergência?

Exemplo conceitual:

```text
Evento: antes de executar shell
Regra: bloquear comandos de remoção recursiva fora do workspace
Resultado: deny com explicação curta e alternativa segura
```

### 16.3 Implementing A Hook

Passo a passo:

1. Escolha o evento.
2. Comece com regra simples.
3. Escreva allowlist/denylist com cuidado.
4. Normalize paths.
5. Evite parsing frágil quando possível.
6. Retorne erro claro.
7. Registre evento sem secrets.
8. Teste caso permitido.
9. Teste caso bloqueado.
10. Teste bypass óbvio.
11. Faça revisão com o time.
12. Documente exceções.

Exemplo simplificado: hook é a trava da porta. O modelo pode pedir para passar,
mas a trava decide se abre.

### 16.4 Gotchas Around Hooks

Armadilhas:

- hook bloqueia comandos legítimos demais;
- hook depende de string match ingênuo;
- hook não normaliza caminho;
- hook vaza comando com segredo no log;
- hook causa loop infinito;
- hook roda dev-only em CI;
- hook não diferencia warning e deny;
- hook fica invisível para o time;
- hook não tem teste;
- hook tenta substituir autorização do sistema externo.

Como corrigir:

1. Prefira regras pequenas.
2. Use allowlist para operações críticas.
3. Normalize inputs.
4. Tenha mensagem de bloqueio útil.
5. Logue metadados, não payload sensível.
6. Revise falsos positivos.
7. Documente exceções.

### 16.5 Useful Hooks

Hooks úteis para estudo:

1. Bloquear `git reset --hard`.
2. Bloquear remoção recursiva fora do projeto.
3. Rodar formatter após edição.
4. Rodar teste de arquivo alterado.
5. Impedir commit com `.env`.
6. Alertar quando `package-lock` muda.
7. Exigir plano para arquivos de auth.
8. Redigir tokens em logs.
9. Validar JSON/YAML alterado.
10. Gerar resumo de mudanças.

### 16.6 Another Useful Hook

Hook de "risk review" antes de finalizar:

Entrada:

- arquivos alterados;
- comandos executados;
- testes rodados;
- testes não rodados;
- áreas críticas tocadas.

Saída:

```json
{
  "can_finish": true,
  "risk_level": "medium",
  "required_disclosure": [
    "Unit tests were not available for the changed module."
  ],
  "recommended_next_step": "Run integration tests before merge."
}
```

Valor: força o assistente a declarar lacunas antes de encerrar.

### 16.7 The Claude Code SDK

SDK permite incorporar fluxos semelhantes ao Claude Code em automações,
ferramentas internas e pipelines. Para a certificação, pense no SDK como forma
de transformar capacidades agentic em produto ou processo controlado.

Use SDK quando:

- precisa automatizar workflow de desenvolvimento;
- quer integrar com CI;
- quer criar ferramenta interna;
- precisa controlar prompts, tools e contexto programaticamente;
- precisa registrar auditoria;
- precisa padronizar experiência do time.

Não use SDK quando:

- uma conversa manual resolve;
- não há processo repetível;
- não há validação;
- a automação criaria risco maior que benefício.

## 17. Wrapping Up

### 17.1 Quiz On Claude Code

Responda sem consultar:

1. Qual é a diferença entre `CLAUDE.md`, command e skill?
2. Quando usar plan mode?
3. Quando usar hook em vez de prompt?
4. Como controlar contexto em codebase grande?
5. Como integrar MCP sem expor dados demais?
6. Como reduzir falso positivo em PR review?
7. O que fazer antes de editar em worktree suja?
8. O que um resumo final deve conter?
9. Quando usar SDK?
10. Como decidir entre workflow fixo e agente?

Gabarito resumido:

1. Memória estável, workflow invocável e capacidade sob demanda.
2. Mudança complexa, risco alto ou ambiguidade.
3. Regra determinística, bloqueio, auditoria ou garantia.
4. Busca seletiva, leitura relevante, resumo e revalidação.
5. Escopo mínimo, read-only quando possível, gates e logs seguros.
6. Critérios claros, evidência, severidade e confidence.
7. Checar status e preservar mudanças do usuário.
8. O que mudou, validação, lacunas e próximos passos.
9. Automação programática repetível.
10. Workflow para processo previsível; agente para tarefa aberta.

### 17.2 Summary And Next Steps

Você domina Claude Code para a certificação quando consegue desenhar um ambiente
em que o agente trabalha com autonomia útil, mas dentro de limites observáveis:
memória de projeto, contexto controlado, ferramentas certas, hooks para garantias,
MCP para integrações, testes para validação e resumo final claro.

Próximos passos práticos:

1. Criar `CLAUDE.md` para este repositório de estudo.
2. Criar um command `/simulado-ccaf`.
3. Criar um command `/review-conteudo`.
4. Criar uma skill de estudo por domínio.
5. Criar hook conceitual para bloquear segredo.
6. Simular um PR review com critérios de baixo falso positivo.
7. Desenhar MCP read-only de recursos de estudo.
8. Desenhar MCP mutating com gate.
9. Fazer o simulado de Claude Code.
10. Revisar erros no `study-log.md`.

## 18. Drills De Fixação Claude Code

### Drill 1 - Escolha Do Artefato

Escolha `CLAUDE.md`, rule, command, skill, hook, MCP ou SDK:

1. Padrões estáveis do projeto inteiro.
2. Convenção só para `src/frontend/**`.
3. Workflow repetido de gerar release notes.
4. Conhecimento especializado carregado sob demanda.
5. Bloquear comando perigoso.
6. Consultar issues do GitHub.
7. Automatizar review em CI.

Gabarito: `CLAUDE.md`, rule, command, skill, hook, MCP, SDK/CI workflow.

### Drill 2 - Risco De Mudança

Classifique como direct ou plan:

1. Corrigir typo.
2. Migrar autenticação.
3. Adicionar teste unitário isolado.
4. Trocar ORM.
5. Ajustar README.
6. Refatorar módulo de pagamento.

Gabarito: direct, plan, direct, plan, direct, plan.

### Drill 3 - Review De PR Sem Ruído

Escreva um critério de review que:

1. só reporte bugs reais;
2. exija arquivo/linha;
3. inclua severidade;
4. inclua evidência;
5. ignore preferência de estilo;
6. indique confidence.

Depois compare com este padrão:

```text
Reporte apenas achados com caminho de falha plausível. Para cada achado, inclua
arquivo, linha, severidade, evidência, impacto, recomendação e confidence.
Não reporte estilo, gosto pessoal ou refactors opcionais.
```
