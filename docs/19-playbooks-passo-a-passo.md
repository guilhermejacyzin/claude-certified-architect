# Playbooks Passo a Passo

Este arquivo transforma os domínios em procedimentos práticos. A ideia é treinar
como você raciocinaria em cenários do exame e em projetos reais.

Cada playbook tem:

- objetivo;
- explicação normal;
- exemplo simplificado;
- passo a passo técnico;
- decisão de prova;
- anti-patterns.

## Playbook 1 - Construir um agente com tools

### Objetivo

Projetar um agente que resolve tarefas chamando ferramentas externas.

### Explicação normal

O agente não deve apenas responder com texto. Ele deve consultar sistemas quando
precisa de informação e só depois responder.

### Exemplo simplificado

Para responder se um pedido pode ser reembolsado, primeiro consulte o pedido.
Não chute.

### Passo a passo técnico

1. Defina objetivo do agente.
2. Liste sistemas externos necessários.
3. Separe tools read-only e mutating.
4. Escreva schema de cada tool.
5. Implemente agentic loop.
6. Trate `tool_use`.
7. Execute tool fora do modelo.
8. Devolva `tool_result` ao histórico.
9. Continue até `end_turn`.
10. Adicione limite de segurança para loop infinito.
11. Adicione logs/auditoria.
12. Teste falhas de tool.

### Decisão de prova

Se a questão pergunta como o agente sabe continuar, a resposta é `stop_reason`,
não parsing de texto.

### Anti-patterns

- tool genérica demais;
- loop encerrando por frase;
- tool result omitido;
- tool mutating sem gate;
- erro sem estrutura.

## Playbook 2 - Criar tool MCP segura

### Objetivo

Desenhar tools MCP que Claude escolha corretamente e que sejam seguras.

### Explicação normal

Cada botão disponível para a IA deve ter rótulo claro, manual de uso e limite.

### Exemplo simplificado

Um botão "mexer no pedido" é perigoso. Melhor ter "consultar pedido" e
"solicitar cancelamento aprovado".

### Passo a passo técnico

1. Nomeie a tool por intenção clara.
2. Escreva descrição com escopo.
3. Adicione "quando não usar".
4. Defina input schema mínimo.
5. Defina output schema.
6. Classifique read-only vs mutating.
7. Adicione pré-requisitos.
8. Defina erros estruturados.
9. Defina retryable.
10. Defina audit ID para ações.
11. Teste prompts ambíguos.
12. Ajuste descrição até o modelo escolher certo.

### Decisão de prova

Se duas tools são confundidas, melhore nome/descrição/schema. Não resolva só com
prompt genérico.

### Anti-patterns

- `run_action`;
- payload `object` livre;
- descrição "does stuff";
- erro "failed";
- ação destrutiva exposta a qualquer agente.

## Playbook 3 - Orquestrar multiagente

### Objetivo

Projetar sistema com coordenador e subagentes.

### Explicação normal

Divida a tarefa entre especialistas, mas garanta que todos recebam briefing e
entreguem no mesmo formato.

### Exemplo simplificado

Em um relatório, uma pessoa pesquisa, outra analisa, outra escreve e outra
revisa. O coordenador junta tudo.

### Passo a passo técnico

1. Defina pergunta principal.
2. Identifique subtarefas independentes.
3. Defina subagentes e tools permitidas.
4. Crie formato de output comum.
5. Passe contexto explicitamente.
6. Peça fontes e confidence.
7. Execute subagentes em paralelo quando possível.
8. Agregue resultados.
9. Detecte conflitos.
10. Detecte lacunas.
11. Re-delegue se necessário.
12. Gere síntese com proveniência.

### Decisão de prova

Subagente não herda contexto. Sempre passe achados e metadados no prompt.

### Anti-patterns

- subagentes com tools demais;
- coordenador sempre chama pipeline completo;
- dividir tópico amplo de forma estreita;
- síntese sem fontes;
- erro de subagente ocultado.

## Playbook 4 - Configurar Claude Code para projeto

### Objetivo

Organizar instruções, workflows e guardrails no Claude Code.

### Explicação normal

O projeto precisa de um manual claro para o assistente: padrões, comandos, o que
fazer e o que evitar.

### Exemplo simplificado

É como onboarding de um novo dev: você entrega arquitetura, comandos de teste e
regras por área.

### Passo a passo técnico

1. Criar `CLAUDE.md` curto.
2. Colocar comandos de build/test.
3. Registrar arquitetura e padrões estáveis.
4. Criar rules por path.
5. Criar slash commands para workflows repetidos.
6. Criar skills para capacidades específicas.
7. Adicionar hooks para regras críticas.
8. Definir quando usar plan mode.
9. Integrar CI com output estruturado.
10. Validar com uma tarefa real.

### Decisão de prova

Se a instrução é específica de um diretório, use rule path-specific, não regra
global gigante.

### Anti-patterns

- `CLAUDE.md` enorme;
- secrets no repo;
- comando genérico sem output esperado;
- plan mode ignorado em mudança crítica;
- CI com comentários vagos.

## Playbook 5 - Criar pipeline de extração estruturada

### Objetivo

Extrair dados de documentos com alta confiabilidade.

### Explicação normal

A IA lê um documento e preenche um formulário. Se o documento não contém algo,
ela marca ausente.

### Exemplo simplificado

Se uma nota fiscal não mostra data de vencimento, não invente. Marque "não
informada".

### Passo a passo técnico

1. Classifique tipo do documento.
2. Escolha schema.
3. Defina campos required.
4. Defina nullable.
5. Defina enums.
6. Peça evidência por campo.
7. Valide JSON Schema.
8. Valide regras semânticas.
9. Retry com erro específico.
10. Roteie baixa confiança para humano.
11. Registre versão do schema.
12. Meça taxa de erro por campo.

### Decisão de prova

Se output alimenta sistema downstream, use schema/tool use, não texto livre.

### Anti-patterns

- campo obrigatório quando pode estar ausente;
- retry genérico;
- sem confidence;
- sem evidence;
- batch para fluxo dependente de várias interações.

## Playbook 6 - Review automatizado em CI/CD

### Objetivo

Gerar feedback útil em Pull Requests sem gerar ruído.

### Explicação normal

A IA deve agir como revisor objetivo, não como pessoa opinando estilo.

### Exemplo simplificado

Um comentário bom diz: "isso quebra login nesta linha". Um comentário ruim diz:
"eu escreveria diferente".

### Passo a passo técnico

1. Limitar análise ao diff.
2. Definir critérios de bug real.
3. Excluir estilo sem impacto.
4. Exigir evidência.
5. Exigir severidade.
6. Exigir arquivo/linha.
7. Exigir recomendação mínima.
8. Output JSON.
9. Definir threshold de bloqueio.
10. Testar contra PRs históricos.
11. Medir falso positivo.
12. Ajustar prompt e critérios.

### Decisão de prova

Para reduzir falso positivo, use critérios explícitos, evidência e schema.

### Anti-patterns

- bloquear por baixa confidence;
- comentar opinião;
- sem linha/evidência;
- rodar em repo inteiro sem escopo;
- misturar severidade.

## Playbook 7 - Explorar codebase grande

### Objetivo

Investigar sistema grande sem estourar contexto ou perder fatos.

### Explicação normal

Antes de mexer, investigue. Não leia tudo, procure pistas.

### Exemplo simplificado

Um detetive não lê todos os documentos da cidade. Ele começa por pistas
relevantes.

### Passo a passo técnico

1. Definir pergunta.
2. Usar `Glob` para mapear.
3. Usar `Grep` para símbolos.
4. Ler arquivos candidatos.
5. Criar scratchpad.
6. Separar fatos/hipóteses.
7. Identificar lacunas.
8. Planejar mudança.
9. Editar pequeno.
10. Rodar testes.
11. Atualizar resumo.
12. Revalidar se arquivos mudarem.

### Decisão de prova

Em codebase grande, `Glob/Grep` antes de `Read` amplo.

### Anti-patterns

- ler tudo;
- editar cedo;
- esquecer arquivos lidos;
- compactar removendo decisão;
- retomar sessão antiga sem revalidar.

## Playbook 8 - Decidir quando escalar para humano

### Objetivo

Definir critérios de human-in-the-loop.

### Explicação normal

Nem tudo deve ser automatizado. Algumas decisões precisam de pessoa.

### Exemplo simplificado

Atendente pode resolver troca simples. Caso jurídico vai para especialista.

### Passo a passo técnico

1. Classificar risco.
2. Verificar política.
3. Checar confidence.
4. Verificar preferência do usuário.
5. Checar reversibilidade.
6. Checar permissão.
7. Tentar recuperação local segura.
8. Se necessário, criar handoff.
9. Incluir evidência.
10. Incluir recomendação.
11. Incluir lacunas.
12. Registrar decisão.

### Decisão de prova

Escalone policy gap, baixa confiança ou ação irreversível. Não escale timeout
simples antes de retry seguro.

### Anti-patterns

- escalar tudo;
- automatizar tudo;
- handoff sem resumo;
- esconder incerteza;
- retry infinito.
