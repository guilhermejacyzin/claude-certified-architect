# Questões Comentadas Avançadas

Questões autorais. O foco é treinar raciocínio, não decorar.

Cada questão inclui:

- resposta;
- raciocínio normal;
- raciocínio técnico;
- exemplo simplificado;
- por que os distratores falham.

## 1. Loop que repete tool

Um agente chama `lookup_order`, a aplicação executa a tool, mas Claude chama
`lookup_order` novamente com o mesmo ID. O log mostra que a resposta da tool foi
salva no banco, mas não enviada ao modelo. Qual é o problema?

A. Claude deveria memorizar automaticamente resultados externos.  
B. O resultado da tool precisa ser anexado ao histórico como `tool_result`.  
C. A tool deveria ser mutating.  
D. O prompt deveria pedir "não repita tools".

Resposta: B.

Raciocínio normal: se você consultou um sistema, precisa mostrar o resultado ao
assistente antes de pedir a próxima decisão.

Raciocínio técnico: no loop agentic, `tool_use` deve ser seguido por execução
externa e devolução do `tool_result` associado. Sem isso, o modelo não observa o
estado novo.

Exemplo simplificado: o atendente ligou para o estoque, mas não anotou a
resposta. Naturalmente ele vai perguntar de novo.

Distratores:

- A: modelo não vê sistemas externos por telepatia.
- C: consultar pedido deve continuar read-only.
- D: prompt pode ajudar, mas não corrige ausência de contexto.

## 2. Reembolso acima do limite

Um agente de suporte deve processar reembolsos. A política exige aprovação humana
acima de R$ 1.000. Qual design é mais robusto?

A. System prompt proibindo reembolsos altos.  
B. Few-shot com exemplos de reembolso negado.  
C. Tool `process_refund` bloqueia valor alto sem `approval_id`.  
D. Auditoria mensal dos casos processados.

Resposta: C.

Raciocínio normal: uma regra financeira importante precisa de trava, não só de
orientação.

Raciocínio técnico: enforcement determinístico deve ficar em código/hook/gate. O
modelo pode escolher o caminho, mas a tool precisa validar pré-requisito.

Exemplo simplificado: para retirar valor alto do caixa, o sistema exige senha do
gerente.

Distratores:

- A: prompt não garante compliance.
- B: exemplos reduzem erro, mas não bloqueiam.
- D: auditoria depois não impede dano.

## 3. Subagente sem contexto

Um coordenador pede a um subagente: "gere o relatório final". O relatório não
inclui fontes, embora os subagentes anteriores tenham coletado URLs e trechos.
Melhor correção?

A. Dar ao subagente acesso a todas as tools.  
B. Passar achados anteriores, fontes e critérios explicitamente no prompt.  
C. Remover o subagente de síntese.  
D. Aumentar max tokens.

Resposta: B.

Raciocínio normal: quem entra no meio do trabalho precisa receber briefing.

Raciocínio técnico: subagentes têm contexto isolado. O coordenador deve passar
dados estruturados, como claim, fonte, data e evidência.

Exemplo simplificado: não adianta chamar alguém para escrever ata sem entregar
as anotações da reunião.

Distratores:

- A: tools não substituem contexto.
- C: síntese pode ser útil se bem alimentada.
- D: mais espaço não cria informação ausente.

## 4. MCP resource ou tool

Um agente precisa consultar uma política de reembolso versionada. A política é
texto estático e raramente muda. Qual modelagem é mais adequada?

A. MCP resource.  
B. Tool mutating.  
C. Slash command.  
D. Hook.

Resposta: A.

Raciocínio normal: se é algo para ler, exponha como biblioteca, não como botão de
ação.

Raciocínio técnico: MCP resources fornecem contexto/dados. Tools executam ações.
Prompts modelam workflows; hooks interceptam eventos.

Exemplo simplificado: política é um manual na estante, não uma máquina.

Distratores:

- B: não há mudança de estado.
- C: slash command é workflow, não catálogo de dados.
- D: hook é controle de evento.

## 5. Tool ampla demais

O MCP expõe `customer_action(action, payload)` para consultar, atualizar,
cancelar e reembolsar. O modelo frequentemente escolhe ação errada. Melhor
correção?

A. Manter uma tool, mas aumentar descrição.  
B. Separar tools por intenção e risco.  
C. Remover schemas.  
D. Pedir ao usuário para sempre escolher action.

Resposta: B.

Raciocínio normal: botões diferentes precisam de nomes diferentes,
principalmente quando alguns são perigosos.

Raciocínio técnico: separar read-only de mutating permite permissões, gates,
descrições e schemas mais claros.

Exemplo simplificado: "mexer na conta" é vago; "consultar saldo" e "transferir"
são botões diferentes.

Distratores:

- A: descrição ajuda, mas a boundary continua ruim.
- C: piora validação.
- D: transfere problema para o usuário.

## 6. Erro de permissão

Uma tool retorna `permission denied`. Qual retorno ajuda melhor o agente?

A. `"failed"`  
B. `"try again"`  
C. erro estruturado com tipo `permission`, `retryable:false` e próxima ação de
   escalonamento.  
D. sucesso vazio.

Resposta: C.

Raciocínio normal: o assistente precisa saber que tentar de novo não resolve sem
permissão.

Raciocínio técnico: erro estruturado permite recovery correto: retry para
transient, escalonamento para permission/business rule.

Exemplo simplificado: se a porta está trancada por falta de crachá, bater de novo
não abre.

Distratores:

- A: não orienta.
- B: retry errado.
- D: esconde falha.

## 7. Plan mode

Usuário pede: "migre o módulo de autenticação para novo provedor". Qual melhor
primeira abordagem?

A. Editar direto todos os arquivos encontrados.  
B. Entrar em plan mode, mapear impacto, propor plano e pedir aprovação.  
C. Alterar README primeiro.  
D. Rodar formatter.

Resposta: B.

Raciocínio normal: autenticação é área crítica; antes de mexer, planeje.

Raciocínio técnico: plan mode é adequado para mudanças multiarquivo, arriscadas e
arquiteturais.

Exemplo simplificado: trocar fechadura do prédio exige plano, não improviso.

Distratores:

- A: alto risco.
- C: não resolve.
- D: irrelevante.

## 8. Rules por path

Claude aplica padrões React em arquivos Python dentro do mesmo monorepo. Melhor
ajuste?

A. Colocar todas as regras no topo do README.  
B. Criar rules por caminho para frontend e backend.  
C. Remover instruções React.  
D. Usar subagente sempre.

Resposta: B.

Raciocínio normal: cada área do projeto precisa de regra própria.

Raciocínio técnico: path-specific rules carregam convenções só quando o arquivo
correspondente está em escopo.

Exemplo simplificado: oficina mecânica e cozinha têm regras diferentes; não use
o manual errado.

Distratores:

- A: aumenta ruído global.
- C: perde convenção válida.
- D: subagente não resolve escopo de regra.

## 9. CI barulhento

Claude Code em CI comenta muitos pontos de estilo e bloqueia PRs saudáveis. Qual
melhor ajuste?

A. Critérios explícitos, severidade mínima, evidência e output estruturado.  
B. Temperatura maior.  
C. Mais liberdade para comentar.  
D. Bloquear todos os PRs com qualquer finding.

Resposta: A.

Raciocínio normal: revisão automática precisa focar no que importa e justificar.

Raciocínio técnico: false positives caem com escopo, critérios, severidade,
evidência, confidence e schema.

Exemplo simplificado: um fiscal bom aponta risco real, não gosto pessoal.

Distratores:

- B: aumenta variabilidade.
- C: aumenta ruído.
- D: piora produtividade.

## 10. Campo ausente em contrato

O contrato não informa data de término. O schema exige string em
`termination_date`. O modelo inventa uma data. Melhor correção?

A. Permitir `null` e registrar razão da ausência.  
B. Pedir ao modelo para ser mais honesto.  
C. Remover validação.  
D. Tornar o campo enum.

Resposta: A.

Raciocínio normal: quando a informação não existe, o formulário precisa aceitar
"não consta".

Raciocínio técnico: nullable reduz hallucination em extraction tasks.

Exemplo simplificado: se o documento não diz a data, escreva "não informado".

Distratores:

- B: orientação ajuda, mas schema ainda força erro.
- C: remove garantia.
- D: enum não resolve ausência.

## 11. Retry de extração

Validação falha porque o campo `effective_date` veio como "next Friday". Melhor
retry?

A. "Tente de novo."  
B. Informar erro específico e pedir ISO date ou null se ausente.  
C. Aceitar valor.  
D. Remover campo do schema.

Resposta: B.

Raciocínio normal: para corrigir, diga exatamente o que falhou.

Raciocínio técnico: validation-retry loop deve incluir erro, schema esperado e
regra de ausência.

Exemplo simplificado: se alguém preencheu formulário errado, mostre qual campo e
qual formato esperado.

Distratores:

- A: feedback insuficiente.
- C: quebra downstream.
- D: perde dado relevante.

## 12. Batch

Você tem 30.000 documentos independentes para classificar até amanhã. Não há
interação multi-turn por documento. Melhor escolha?

A. Message Batches com `custom_id`.  
B. Uma conversa única com todos os documentos.  
C. Subagente em série para cada documento.  
D. Plan mode.

Resposta: A.

Raciocínio normal: grande volume independente pode ir em lote.

Raciocínio técnico: batch é adequado para alto volume, latência tolerável e
correlação por ID.

Exemplo simplificado: enviar pilha de documentos para processamento noturno.

Distratores:

- B: contexto inviável.
- C: lento e caro.
- D: modo de planejamento não é processamento em lote.

## 13. Pesquisa com conflito

Duas fontes confiáveis discordam sobre um número. Melhor resposta do agente?

A. Escolher a fonte mais recente.  
B. Mostrar ambos os números com fonte, data e possível razão do conflito.  
C. Fazer média.  
D. Omitir a métrica.

Resposta: B.

Raciocínio normal: se há conflito, seja transparente.

Raciocínio técnico: multi-source synthesis deve preservar uncertainty e
provenance.

Exemplo simplificado: dois recibos diferentes precisam ser mostrados, não
misturados.

Distratores:

- A: pode estar certo, mas precisa justificar contexto.
- C: média pode ser sem sentido.
- D: perde informação.

## 14. Codebase grande

Agente precisa entender por que teste falha em monorepo. Melhor primeira etapa?

A. Ler todos os arquivos.  
B. Mapear estrutura com Glob/Grep e ler seletivamente.  
C. Editar teste para passar.  
D. Pedir ao usuário explicar toda arquitetura.

Resposta: B.

Raciocínio normal: investigue por pistas antes de abrir tudo.

Raciocínio técnico: discovery tools reduzem context overload e atenção diluída.

Exemplo simplificado: procurar no índice antes de ler uma enciclopédia inteira.

Distratores:

- A: estoura contexto e atenção.
- C: mascara problema.
- D: pode ajudar, mas não substitui investigação.

## 15. Handoff humano

Agente não pode aprovar exceção de política. Qual handoff é melhor?

A. "Precisa de ajuda humana."  
B. Resumo com cliente, problema, evidência, passos tentados, lacuna de política e
   recomendação.  
C. Toda conversa sem estrutura.  
D. Apenas o ID do cliente.

Resposta: B.

Raciocínio normal: humano precisa receber o caso pronto para decidir.

Raciocínio técnico: structured handoff preserva contexto e reduz retrabalho.

Exemplo simplificado: passar plantão com diagnóstico, não só "tem paciente".

Distratores:

- A: genérico.
- C: caro para ler.
- D: insuficiente.

## 16. Hook PostToolUse

MCPs diferentes retornam datas em Unix timestamp, ISO string e texto livre.
Claude se confunde. O que ajuda?

A. PostToolUse hook para normalizar formato antes de o modelo processar.  
B. Pedir para Claude adivinhar.  
C. Remover datas.  
D. Usar menos contexto.

Resposta: A.

Raciocínio normal: padronize a informação antes de entregar ao assistente.

Raciocínio técnico: hooks pós-tool são úteis para normalização determinística de
outputs heterogêneos.

Exemplo simplificado: todos os departamentos precisam mandar data no mesmo
formato.

Distratores:

- B: aumenta erro.
- C: perde dado.
- D: não resolve formato.

## 17. Skills

Quando uma skill é mais apropriada que colocar instrução no `CLAUDE.md`?

A. Quando a capacidade é especializada e só deve carregar sob demanda.  
B. Quando é segredo.  
C. Quando vale para toda tarefa trivial.  
D. Quando substitui testes.

Resposta: A.

Raciocínio normal: instruções especializadas não precisam ficar sempre no manual
principal.

Raciocínio técnico: skills encapsulam instruções, referências e scripts para
capacidade específica.

Exemplo simplificado: você não carrega manual de encanamento para toda reunião;
só quando vai mexer no encanamento.

Distratores:

- B: skill não é cofre.
- C: aumenta contexto desnecessário.
- D: não substitui validação.

## 18. Tool distribution

Em sistema multiagente, todos os subagentes têm acesso a todas as tools,
incluindo escrita. Qual risco principal?

A. Menor latência.  
B. Maior risco, confusão de tool selection e pior auditoria.  
C. Melhora de segurança.  
D. O coordenador fica desnecessário.

Resposta: B.

Raciocínio normal: nem todo membro da equipe precisa de todas as chaves.

Raciocínio técnico: least privilege por agente reduz superfície de risco e
melhora controle.

Exemplo simplificado: estagiário de pesquisa não precisa da chave do cofre.

Distratores:

- A: pode até reduzir algum overhead, mas aumenta risco.
- C: oposto.
- D: coordenador continua necessário.

## 19. Confidence sem calibração

Um pipeline aceita automaticamente todos os campos com confidence acima de 0.9,
mas nunca comparou confidence com acerto real. Problema?

A. Confidence não calibrada pode dar falsa segurança.  
B. Confidence sempre é confiável.  
C. Validação humana nunca é necessária.  
D. JSON Schema resolve acurácia semântica.

Resposta: A.

Raciocínio normal: dizer "tenho certeza" não prova que a pessoa acerta.

Raciocínio técnico: confidence precisa ser calibrada em dataset rotulado e
segmentada por campo/tipo de documento.

Exemplo simplificado: alguém confiante e errado continua errado.

Distratores:

- B: falso.
- C: alto risco.
- D: schema valida forma, não verdade.

## 20. Retomada de sessão

Claude retoma sessão antiga de refatoração. Desde então, outro dev alterou
arquivos analisados. Melhor prática?

A. Confiar no resumo antigo.  
B. Informar mudanças e revalidar arquivos relevantes.  
C. Continuar editando onde parou.  
D. Apagar histórico.

Resposta: B.

Raciocínio normal: se o cenário mudou, confira de novo antes de agir.

Raciocínio técnico: resumed sessions podem conter tool results stale. Revalidar
evita decisões baseadas em estado antigo.

Exemplo simplificado: se o mapa é de ontem e a estrada mudou, atualize o mapa.

Distratores:

- A: risco de stale state.
- C: pode quebrar mudança recente.
- D: desnecessário; resumo estruturado ainda ajuda.
