# Guia Tri-Camada de Conceitos

Este guia explica os conceitos em três camadas:

- **Explicação normal**: linguagem natural para entender a ideia.
- **Explicação técnica**: detalhes que costumam cair na certificação.
- **Exemplo simplificado**: analogia ou caso simples para fixar.

Use este arquivo como revisão rápida antes dos simulados.

## 1. Agentic loop

### Explicação normal

Um agentic loop é o ciclo em que Claude recebe um objetivo, decide se precisa
usar uma ferramenta, recebe o resultado e continua até conseguir responder.

O importante é que o sistema não tenta adivinhar se Claude terminou lendo o
texto da resposta. Ele usa sinais estruturados, como `tool_use` e `end_turn`.

### Explicação técnica

O fluxo correto é:

1. Enviar mensagens e lista de tools.
2. Receber resposta.
3. Se `stop_reason` for `tool_use`, executar as tools pedidas.
4. Anexar `tool_result` ao histórico.
5. Chamar o modelo novamente.
6. Se `stop_reason` for `end_turn`, finalizar.

Pontos de prova:

- tool result precisa ser devolvido ao modelo;
- não se encerra loop por frase natural;
- limite de iterações pode existir como proteção secundária, mas não deve ser o
  critério principal de sucesso;
- resultados de tools devem ser estruturados o bastante para próxima decisão.

### Exemplo simplificado

É como um atendente que liga para o estoque:

1. Cliente pergunta se há produto.
2. Atendente consulta estoque.
3. Estoque responde.
4. Atendente usa a resposta para decidir o que dizer.

Se o atendente não anotar a resposta do estoque, ele vai perguntar de novo ou
responder errado.

### Pegadinha comum

Alternativa que diz: "encerre quando o assistente disser que terminou".

Por que está errada: texto é ambíguo. O contrato correto é o `stop_reason`.

## 2. Modelo vs código

### Explicação normal

Claude pode tomar decisões, mas regras críticas precisam estar no sistema. O
modelo pode sugerir; o código deve bloquear o que não pode acontecer.

### Explicação técnica

Use prompt para orientação probabilística. Use código, hook, gate, schema ou
permissão para garantia determinística.

Exemplos de garantia determinística:

- refund acima de limite exige approval ID;
- tool destrutiva só roda após confirmação;
- comando perigoso é bloqueado por hook;
- output precisa passar em JSON Schema;
- baixa confiança vai para revisão humana.

### Exemplo simplificado

Prompt é como uma placa dizendo "não entre". Gate é uma porta trancada.

Se o risco é alto, você precisa da porta trancada, não só da placa.

### Pegadinha comum

"Basta adicionar uma instrução no system prompt".

Em produção, isso não basta para regra financeira, legal, segurança ou dado
sensível.

## 3. Subagentes

### Explicação normal

Subagentes são especialistas chamados para partes da tarefa. Eles ajudam quando
a tarefa é grande, paralelizável ou exige papéis diferentes.

### Explicação técnica

Subagentes:

- têm contexto isolado;
- precisam receber contexto explicitamente;
- devem ter tools limitadas ao papel;
- retornam achados estruturados;
- podem ser chamados em paralelo quando independentes.

O coordenador:

- decompõe a tarefa;
- decide quais subagentes chamar;
- passa contexto e critérios;
- agrega resultados;
- detecta lacunas;
- decide se reitera.

### Exemplo simplificado

Você monta uma equipe:

- uma pessoa pesquisa;
- outra lê documentos;
- outra escreve;
- outra revisa.

Cada pessoa precisa receber o briefing. Ninguém adivinha tudo que foi discutido
antes.

### Pegadinha comum

"O subagente herda automaticamente a conversa do coordenador".

Errado. Contexto relevante precisa ser passado.

## 4. MCP

### Explicação normal

MCP é um jeito padronizado de conectar Claude a ferramentas, dados e workflows.

### Explicação técnica

Um servidor MCP pode expor:

- `tools`: funções que executam ações ou consultas parametrizadas;
- `resources`: dados/contexto para leitura;
- `prompts`: templates de workflow;
- metadados e schemas para descoberta e uso correto.

A prova tende a cobrar design:

- quando uma capability deve ser tool;
- quando deve ser resource;
- como escrever descrição;
- como lidar com erro;
- como limitar tool por agente;
- como configurar escopo usuário/projeto.

### Exemplo simplificado

MCP é como uma caixa de ferramentas padronizada. Cada ferramenta tem nome,
manual de uso e limite.

### Pegadinha comum

Criar uma tool genérica `do_everything`.

O modelo fica confuso, a segurança piora e a auditoria fica fraca.

## 5. Tool design

### Explicação normal

Uma tool boa deixa claro o que faz, quando deve ser usada, quais dados precisa e
o que retorna.

### Explicação técnica

Uma boa tool tem:

- nome específico;
- descrição com escopo e contraexemplos;
- input schema restrito;
- output previsível;
- erro estruturado;
- separação entre leitura e escrita;
- pré-requisitos para ações sensíveis.

### Exemplo simplificado

Compare:

- ruim: "resolver problema";
- bom: "consultar status do pedido pelo número".

Quanto mais claro o botão, menor a chance de a IA apertar o botão errado.

### Pegadinha comum

Tools com nomes parecidos e descrições vagas.

Solução: diferenciar nomes, casos de uso, input e limites.

## 6. Erro estruturado

### Explicação normal

Quando uma ferramenta falha, o agente precisa saber se deve tentar de novo, pedir
outra informação, escalar ou parar.

### Explicação técnica

Um erro útil inclui:

- tipo: transient, validation, permission, business_rule, not_found, unsafe;
- mensagem segura;
- `retryable`;
- detalhes mínimos;
- próxima ação recomendada.

### Exemplo simplificado

Erro ruim:

```text
Deu erro.
```

Erro bom:

```text
O sistema ficou indisponível por tempo limite. Pode tentar novamente.
```

Ou:

```text
Reembolso bloqueado pela política. Encaminhe para aprovação.
```

### Pegadinha comum

Tratar todo erro igual.

Timeout e regra de negócio exigem respostas diferentes.

## 7. Claude Code

### Explicação normal

Claude Code é Claude trabalhando dentro do fluxo de desenvolvimento: lendo
arquivos, propondo mudanças, rodando comandos, criando testes e revisando PRs.

### Explicação técnica

Conceitos relevantes:

- `CLAUDE.md` para memória/instruções de projeto;
- rules por caminho para convenções específicas;
- slash commands para workflows repetíveis;
- skills para capacidades especializadas;
- hooks para controle determinístico;
- plan mode para mudanças complexas;
- CI/CD com saída estruturada.

### Exemplo simplificado

É como ter um dev assistente no repositório, mas com manual de projeto, regras
por pasta e limites de permissão.

### Pegadinha comum

Colocar tudo no `CLAUDE.md`.

Melhor: `CLAUDE.md` curto, rules específicas e skills sob demanda.

## 8. Plan mode

### Explicação normal

Plan mode é quando Claude analisa e propõe antes de editar. Serve para evitar
mudanças precipitadas.

### Explicação técnica

Use para:

- arquitetura;
- múltiplos arquivos;
- mudança arriscada;
- ambiguidade de escopo;
- refatoração;
- migração;
- alteração de auth/persistência/contrato.

Use execução direta para:

- typo;
- README simples;
- teste pequeno;
- alteração local clara.

### Exemplo simplificado

Antes de reformar uma casa, você faz planta. Para trocar uma lâmpada, não precisa
de planta.

### Pegadinha comum

Usar plan mode para tudo ou nunca usar.

O exame cobra adequação ao risco.

## 9. Structured output

### Explicação normal

Structured output é pedir uma resposta em formato previsível, como um formulário,
em vez de texto livre.

### Explicação técnica

Use tool use/JSON Schema quando:

- output vai para sistema downstream;
- campos precisam ser validados;
- há enum, nullable ou tipos específicos;
- é necessário retry automático;
- é necessário confidence por campo.

### Exemplo simplificado

Texto livre é uma redação. Structured output é um formulário com campos.

Se outro sistema vai ler, formulário é melhor.

### Pegadinha comum

Pedir "responda em JSON" sem schema.

Isso melhora formato, mas não garante contrato.

## 10. Nullable

### Explicação normal

Quando uma informação pode não existir no documento, o campo deve permitir
"não encontrado" em vez de forçar a IA a inventar.

### Explicação técnica

Campos nullable evitam hallucination em extração.

Exemplo:

```json
{
  "termination_date": ["string", "null"],
  "absence_reason": ["string", "null"]
}
```

### Exemplo simplificado

Se um contrato não fala data de fim, o correto é escrever "não consta", não
chutar uma data.

### Pegadinha comum

Marcar todo campo como obrigatório string.

Isso força resposta mesmo quando a fonte não contém o dado.

## 11. Context management

### Explicação normal

Gerenciar contexto é organizar o que Claude precisa lembrar durante tarefas
longas.

### Explicação técnica

Técnicas:

- progressive summarization;
- scratchpad;
- manifest;
- claim-source mapping;
- chunking;
- leitura seletiva;
- revalidação ao retomar sessão;
- compactação com fatos, decisões e lacunas.

### Exemplo simplificado

É como limpar uma mesa de trabalho: deixe visível o que importa agora e arquive
o resto com etiquetas.

### Pegadinha comum

Colar tudo no contexto.

Mais texto pode piorar atenção e ocultar informação crítica.

## 12. Proveniência

### Explicação normal

Proveniência é mostrar de onde veio cada afirmação importante.

### Explicação técnica

Uma claim confiável deve ter:

- fonte;
- data;
- trecho/evidência;
- confidence;
- status de conflito ou lacuna.

### Exemplo simplificado

Toda conclusão importante precisa de recibo.

### Pegadinha comum

Sintetizar várias fontes e perder a origem.

Em pesquisa e documentos, isso é falha grave.

## 13. Escalonamento

### Explicação normal

Escalonar é passar para uma pessoa quando o agente não deve decidir sozinho.

### Explicação técnica

Escalone quando:

- há baixa confiança;
- política não cobre;
- usuário pede humano;
- ação é irreversível;
- risco financeiro/legal/segurança;
- permissão insuficiente;
- conflito não resolvido.

Handoff deve ser estruturado.

### Exemplo simplificado

Se o atendente júnior não tem autoridade, ele prepara o caso e chama o gerente.

### Pegadinha comum

Escalonar sem contexto.

O humano precisa de resumo, evidência e recomendação.

## 14. Message Batches

### Explicação normal

Batch é processar muitos itens de uma vez quando não precisa de resposta
imediata.

### Explicação técnica

Bom para:

- alto volume;
- itens independentes;
- latência tolerável;
- correlação por `custom_id`;
- reprocessamento parcial.

Ruim para:

- interação em tempo real;
- dependência entre itens;
- tool calling multi-turn obrigatório.

### Exemplo simplificado

É como enviar uma pilha de documentos para processamento noturno.

### Pegadinha comum

Usar batch para fluxo que precisa conversar, chamar ferramenta e decidir a cada
passo.

## 15. Confidence calibration

### Explicação normal

Não basta a IA dizer "tenho 90% de certeza". Você precisa verificar se essa
certeza bate com a realidade.

### Explicação técnica

Calibração:

1. criar dataset rotulado;
2. comparar confidence vs acerto real;
3. segmentar por campo/tipo de documento;
4. definir thresholds;
5. revisar amostras.

### Exemplo simplificado

Se alguém sempre diz "tenho certeza" e erra metade das vezes, a confiança dele
não está calibrada.

### Pegadinha comum

Usar confidence sem validação empírica para automatizar decisões críticas.
