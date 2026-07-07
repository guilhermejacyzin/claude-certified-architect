# Guia Por Domínio

## 1. Arquitetura Agentic e Orquestração

### O que dominar

- Loop agentic: request, `tool_use`, execução, tool result, nova iteração,
  `end_turn`.
- Subagentes: contexto isolado, prompt explícito, allowed tools e retorno
  resumido.
- Coordinator: decompõe, delega, agrega, avalia lacunas e reitera.
- Hooks: enforcement e normalização fora do prompt.
- Handoff humano: resumo estruturado, causa raiz e recomendação.

### Pegadinhas

- Encerrar loop procurando texto natural do assistente.
- Supor que subagente herda todo o contexto.
- Usar prompt para regra que exige garantia determinística.
- Dividir tarefas de forma estreita demais e perder cobertura.

### Frase-chave

Modelo decide entre opções bem desenhadas; código garante política, estado e
auditoria.

## 2. Tool Design e MCP

### O que dominar

- Nome, descrição e schema moldam comportamento.
- Tools fazem ações; resources expõem contexto; prompts oferecem workflows.
- Erros devem ser estruturados: categoria, mensagem, retryable e próximos
  passos.
- Tool distribution reduz confusão e superfície de risco.
- Built-in tools devem ser escolhidas pelo custo/contexto: `Grep` antes de
  `Read` amplo; `Glob` para descoberta; `Bash` com cuidado.

### Pegadinhas

- Tool genérica demais: `do_everything`.
- Erro em texto livre sem classificação.
- Expor tools destrutivas ao agente errado.
- Confundir MCP resource com tool.

## 3. Claude Code

### O que dominar

- `CLAUDE.md` hierárquico.
- Rules por caminho.
- Slash commands para workflows explícitos.
- Skills para capacidades reutilizáveis.
- Hooks para garantias determinísticas.
- Plan mode para mudanças complexas/arquiteturais.
- CI/CD com output JSON e critérios objetivos.

### Pegadinhas

- Usar plan mode para tudo.
- Deixar regra global gigante e irrelevante.
- Fazer review em CI sem schema e severidade.
- Não separar instrução de projeto, regra por path e skill especializada.

## 4. Prompt e Saída Estruturada

### O que dominar

- Critérios explícitos.
- Few-shot para ambiguidade e formato.
- JSON Schema/tool use para downstream.
- Nullable quando informação pode não existir.
- Validação semântica e retry com erro específico.
- Batch quando latência é tolerável e volume é alto.
- Multi-pass para review amplo.

### Pegadinhas

- Exigir campo obrigatório que talvez não exista e induzir alucinação.
- Pedir JSON "no prompt" quando schema/tool use daria garantia maior.
- Reprocessar batch inteiro por falha parcial.
- Fazer self-review quando uma segunda instância independente é melhor.

## 5. Contexto e Confiabilidade

### O que dominar

- Contexto não é memória infinita.
- Sumarizar progressivamente com fatos, decisões e fontes.
- Preservar proveniência por claim.
- Escalonar quando política, confiança ou preferência do usuário exigir.
- Propagar erro de subagente com tipo, tentativa, parcial e lacuna.
- Calibrar confidence com dados rotulados quando possível.

### Pegadinhas

- Colar documento enorme sem estrutura.
- Perder a fonte ao sintetizar.
- Resolver conflito entre fontes escolhendo uma sem justificar.
- Esconder incerteza.

## Matriz de decisão rápida

| Situação | Melhor resposta |
|---|---|
| Regra crítica de negócio | hook/gate/código |
| Escolha ambígua entre tools | descrições melhores + schema mais específico |
| Pesquisa ampla | coordinator + subagentes paralelos + proveniência |
| Documento longo | extração de fatos + chunks + resumo progressivo |
| Extração para sistema downstream | JSON Schema + validação + retry |
| Baixa confiança | human review ou escalonamento |
| CI code review | critérios explícitos + output estruturado + limiar de severidade |
