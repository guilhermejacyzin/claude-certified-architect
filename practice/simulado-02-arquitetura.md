# Simulado 02 - Arquitetura e Tradeoffs

Questões autorais em PT-BR. Não são questões reais do exame.

## 1. Tool result no histórico

Um agente consulta `lookup_order` e recebe dados do pedido. O modelo, no próximo
turno, ignora esses dados e pede a mesma tool de novo. Qual falha de design é
mais provável?

A. A tool deveria chamar outra tool automaticamente.  
B. O resultado da tool não foi anexado corretamente ao histórico da conversa.  
C. O usuário deveria confirmar manualmente o pedido antes.  
D. O modelo precisa de temperatura mais alta.

Resposta: B.

Domínio: Agentic Architecture & Orchestration.

## 2. Subagente de síntese

Um subagente de síntese recebe apenas "faça o relatório final" e perde fontes.
Qual correção é melhor?

A. Dar acesso irrestrito à internet para o subagente.  
B. Passar achados estruturados com claim, fonte, data e evidência no prompt.  
C. Remover o coordenador.  
D. Reduzir o número de subagentes.

Resposta: B.

Domínio: Agentic Architecture & Orchestration.

## 3. Tool destrutiva

Uma tool `delete_customer_record` aparece disponível para agente de suporte
nível 1. Qual decisão é mais alinhada a produção?

A. Manter a tool e escrever no prompt para usar com cuidado.  
B. Remover do agente nível 1 ou colocar gate/hook com aprovação explícita.  
C. Renomear para `archive_customer`.  
D. Aumentar logging depois da deleção.

Resposta: B.

Domínio: Tool Design & MCP Integration.

## 4. MCP resource

Um agente precisa consultar uma tabela de políticas de reembolso que muda pouco.
Qual desenho é mais apropriado?

A. Tool `process_policy`.  
B. MCP resource de leitura com versão/data.  
C. Bash command para abrir arquivo local.  
D. Prompt dizendo "lembre as políticas".

Resposta: B.

Domínio: Tool Design & MCP Integration.

## 5. CI com falsos positivos

Claude Code em CI bloqueia PRs por problemas estilísticos irrelevantes. Melhor
ajuste?

A. Pedir ao modelo para ser mais amigável.  
B. Definir critérios de bloqueio, severidade mínima e schema de findings.  
C. Remover todos os comentários.  
D. Rodar duas vezes e usar a saída maior.

Resposta: B.

Domínio: Claude Code Configuration & Workflows.

## 6. Path-specific rules

Um monorepo tem backend Python e frontend React. O agente aplica convenções React
em arquivos Python. Melhor correção?

A. Colocar tudo no README.  
B. Criar rules com glob/path scope por área.  
C. Remover as convenções React.  
D. Usar só plan mode.

Resposta: B.

Domínio: Claude Code Configuration & Workflows.

## 7. Campo ausente

Documentos de contrato nem sempre têm data de término. Como modelar?

A. Campo obrigatório string.  
B. Campo nullable e, se útil, `absence_reason`.  
C. Pedir ao modelo para inferir.  
D. Remover o campo.

Resposta: B.

Domínio: Prompt Engineering & Structured Output.

## 8. Validação semântica

O schema JSON passa, mas `end_date` vem antes de `start_date`. O que falta?

A. Validação semântica pós-schema.  
B. Mais tokens.  
C. Um prompt mais curto.  
D. Trocar JSON por Markdown.

Resposta: A.

Domínio: Prompt Engineering & Structured Output.

## 9. Batch e tool calling

Você precisa processar 50.000 documentos independentes sem resposta imediata.
Qual abordagem tende a ser adequada?

A. Message Batches com `custom_id` e tratamento de falhas parciais.  
B. Uma conversa multi-turn para todos os documentos.  
C. Subagente por documento com contexto compartilhado.  
D. Forçar tool use em cada item no batch.

Resposta: A.

Domínio: Prompt Engineering & Structured Output.

## 10. Lost in the middle

Em um prompt gigante, requisitos críticos no meio são ignorados. Melhor mitigação?

A. Colocar informações críticas no começo/fim e usar resumo estruturado.  
B. Aumentar temperatura.  
C. Remover schema.  
D. Pedir para "prestar atenção".

Resposta: A.

Domínio: Context Management & Reliability.

## 11. Conflito entre fontes

Dois relatórios confiáveis discordam sobre uma métrica. Melhor saída?

A. Escolher o relatório mais favorável.  
B. Preservar ambos os valores com fonte, data e nota de incerteza.  
C. Fazer média.  
D. Ignorar a métrica.

Resposta: B.

Domínio: Context Management & Reliability.

## 12. Human review

Um pipeline de extração tem baixa confiança em campos financeiros. Melhor design?

A. Aceitar tudo se JSON for válido.  
B. Roteamento para revisão humana por campo e amostragem estratificada.  
C. Remover confidence.  
D. Dobrar o número de few-shots e nunca revisar.

Resposta: B.

Domínio: Context Management & Reliability.

## 13. Tool choice

O modelo deve obrigatoriamente preencher um schema de extração. Qual configuração
ajuda mais?

A. `tool_choice` forçando a tool de extração quando apropriado.  
B. Resposta em prosa com "formato JSON".  
C. Bash para validar depois, sem schema.  
D. Temperatura alta.

Resposta: A.

Domínio: Prompt Engineering & Structured Output.

## 14. Decomposição de review

Um review de PR grande perde bugs de integração entre arquivos. Melhor desenho?

A. Um único pass lendo tudo.  
B. Passes por arquivo seguidos de pass cross-file/integration.  
C. Só grep por TODO.  
D. Pedir resumo ao autor.

Resposta: B.

Domínio: Agentic Architecture & Orchestration.

## 15. Erro transitório

Uma tool externa retorna timeout. Qual erro estruturado é melhor?

A. `{"error": "failed"}`  
B. `{"error_type":"transient","retryable":true,"message":"timeout","next_action":"retry with backoff"}`  
C. Texto livre com stack trace completo.  
D. Retornar sucesso vazio.

Resposta: B.

Domínio: Tool Design & MCP Integration.

## 16. Escalonamento sem transcript

Um humano não tem acesso ao transcript da conversa. O que o agente deve enviar?

A. "Cliente está bravo".  
B. Handoff com identidade relevante, problema, passos tentados, causa provável,
   evidências e recomendação.  
C. Toda a conversa sem estrutura.  
D. Nada, o humano pergunta de novo.

Resposta: B.

Domínio: Context Management & Reliability.

## 17. Skills

Quando usar uma skill em Claude Code?

A. Para capacidade reutilizável que deve carregar instruções e recursos sob
   demanda.  
B. Para substituir todos os arquivos do projeto.  
C. Para guardar credenciais.  
D. Para rodar qualquer comando sem revisão.

Resposta: A.

Domínio: Claude Code Configuration & Workflows.

## 18. Slash command

Qual bom uso de slash command?

A. Workflow repetível de review de PR com passos e saída esperada.  
B. Texto motivacional genérico.  
C. Copiar o manual inteiro.  
D. Esconder políticas críticas do repo.

Resposta: A.

Domínio: Claude Code Configuration & Workflows.

## 19. Few-shot

Few-shot é mais útil quando:

A. O formato ou julgamento tem ambiguidade recorrente.  
B. A regra precisa ser bloqueada deterministicamente.  
C. Você quer esconder o schema.  
D. A resposta deve ser aleatória.

Resposta: A.

Domínio: Prompt Engineering & Structured Output.

## 20. Retomada de sessão

Você retoma uma sessão antiga, mas arquivos analisados mudaram. Melhor atitude?

A. Confiar no tool result antigo.  
B. Informar mudanças e revalidar arquivos relevantes.  
C. Ignorar alterações.  
D. Fazer fork sem explicar.

Resposta: B.

Domínio: Agentic Architecture & Orchestration.
