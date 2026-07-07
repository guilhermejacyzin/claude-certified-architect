# Questões Simuladas Autorais

Estas questões são originais e servem para treino de julgamento. Não são
questões reais do exame.

## 1. Agentic loop

Um agente chama uma tool e recebe `stop_reason = "tool_use"`. Qual é a próxima
ação correta?

A. Encerrar se o texto do assistente parecer completo.  
B. Executar a tool solicitada, anexar o resultado ao histórico e chamar o modelo
novamente.  
C. Ignorar a tool e pedir resposta final.  
D. Reiniciar a conversa com um resumo.

Resposta: B.

Explicação: `tool_use` indica que o loop deve executar a tool e devolver o
resultado ao modelo para nova deliberação.

## 2. Compliance

Um refund acima de R$ 2.000 exige aprovação humana. Qual design é mais robusto?

A. Instruir o modelo no prompt a nunca aprovar.  
B. Adicionar few-shot com exemplos de refund alto.  
C. Bloquear programaticamente `process_refund` sem approval ID.  
D. Pedir ao usuário para revisar manualmente os logs depois.

Resposta: C.

Explicação: regra crítica precisa de gate determinístico.

## 3. Subagentes

Um coordenador envia um subagente para sintetizar resultados de busca, mas o
subagente não menciona fontes. Causa provável?

A. Subagentes não são bons para síntese.  
B. O coordenador não passou resultados e metadados explicitamente no prompt.  
C. O modelo não suporta citações.  
D. O MCP deveria ser removido.

Resposta: B.

Explicação: subagentes têm contexto isolado; contexto e metadados precisam ser
passados explicitamente.

## 4. MCP resources

Qual item é melhor como MCP resource, não tool?

A. Criar reembolso.  
B. Atualizar status do pedido.  
C. Expor catálogo de políticas de suporte para leitura.  
D. Enviar e-mail ao cliente.

Resposta: C.

Explicação: resource fornece contexto; tool executa ação.

## 5. Tool design

Duas tools têm nomes `get_data` e `fetch_info`, ambas com descrições vagas. O
modelo escolhe errado com frequência. Melhor correção?

A. Aumentar temperatura.  
B. Melhorar nomes, descrições, schemas e limites de uso.  
C. Esconder uma tool aleatoriamente.  
D. Pedir ao usuário para escolher sempre.

Resposta: B.

## 6. Claude Code

Quando usar plan mode?

A. Sempre que mudar uma linha.  
B. Em mudanças complexas, arquiteturais ou com múltiplos arquivos e tradeoffs.  
C. Nunca em refatoração.  
D. Apenas quando não há testes.

Resposta: B.

## 7. Rules path-specific

Qual problema rules por path resolvem?

A. Substituem testes automatizados.  
B. Carregam convenções relevantes apenas para arquivos correspondentes.  
C. Permitem ignorar `CLAUDE.md`.  
D. Eliminam necessidade de review humano.

Resposta: B.

## 8. Structured output

Um campo pode estar ausente no documento. Melhor schema?

A. Campo obrigatório string vazia.  
B. Campo obrigatório com `null` permitido e razão da ausência.  
C. Campo livre sem tipo.  
D. Remover o campo da extração.

Resposta: B.

## 9. Retry loop

Validação Pydantic falhou por formato de data. Melhor retry?

A. Reenviar o documento e dizer "tente melhor".  
B. Reenviar com o erro específico e o schema esperado.  
C. Aceitar o output.  
D. Trocar para prompt sem schema.

Resposta: B.

## 10. Batch API

Quando batch é apropriado?

A. Quando precisa de resposta interativa imediata.  
B. Quando há alto volume, tolerância a latência e correlação por `custom_id`.  
C. Quando há tool calling multi-turn obrigatório.  
D. Quando cada item depende do anterior.

Resposta: B.

## 11. Context window

Em codebase grande, melhor primeira etapa?

A. Ler todos os arquivos.  
B. Usar Glob/Grep para mapear candidatos e só então ler arquivos relevantes.  
C. Pedir ao modelo para adivinhar.  
D. Compactar antes de ter fatos.

Resposta: B.

## 12. Proveniência

Duas fontes confiáveis discordam sobre uma métrica. Melhor síntese?

A. Escolher a fonte mais recente e omitir a outra.  
B. Reportar ambos os valores com fonte, data e incerteza.  
C. Calcular média sem explicar.  
D. Remover a métrica.

Resposta: B.

## 13. CI/CD review

Review automatizado gera muitos falsos positivos. Melhor melhoria?

A. Pedir críticas mais duras.  
B. Definir critérios explícitos, severidade, evidência e schema de saída.  
C. Bloquear todos os PRs.  
D. Remover testes.

Resposta: B.

## 14. Escalonamento

Usuário pede exceção não coberta por política. Melhor resposta do agente?

A. Inventar política provável.  
B. Escalonar com resumo, lacuna de política e recomendação.  
C. Negar sempre.  
D. Continuar tentando tools.

Resposta: B.

## 15. Hooks

Quando hooks são preferíveis a prompt?

A. Quando a regra precisa ser garantida deterministicamente.  
B. Quando o texto precisa ficar mais amigável.  
C. Quando a tarefa é criativa.  
D. Quando não há risco.

Resposta: A.
