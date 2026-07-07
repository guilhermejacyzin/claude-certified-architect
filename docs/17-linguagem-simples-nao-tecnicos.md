# Linguagem Simples Para Pessoas Não Técnicas

Este arquivo traduz os conceitos principais para uma linguagem de negócio. Use
quando precisar explicar a certificação para gestores, pessoas de produto,
consultores, PMs, áreas comerciais ou colegas que ainda não programam.

## Ideia central

Um agente de IA não é só um chatbot. Ele é mais parecido com um assistente que:

1. entende um pedido;
2. decide se precisa consultar algum sistema;
3. executa uma ação por meio de uma ferramenta controlada;
4. usa o resultado para continuar;
5. sabe quando parar ou pedir ajuda humana.

O trabalho do arquiteto é decidir **quais poderes esse assistente terá**, **quais
limites ele precisa respeitar** e **como provar que ele tomou uma boa decisão**.

## Analogia: assistente júnior com crachá

Imagine uma pessoa júnior em uma empresa.

Ela pode:

- ler documentos;
- consultar sistemas;
- preparar relatórios;
- sugerir respostas;
- encaminhar casos.

Mas ela não deve:

- aprovar reembolso alto sozinha;
- apagar registros;
- mudar senha de clientes;
- publicar algo sem revisão;
- tomar decisão legal/financeira crítica sem aprovação.

Um agente com Claude funciona de forma parecida. O modelo raciocina, mas a
empresa define crachá, portas, regras e supervisão.

## Termos principais em linguagem simples

| Termo | Explicação simples |
|---|---|
| Agentic loop | Ciclo de trabalho: pensar, usar ferramenta, ler resultado, continuar ou finalizar. |
| Tool | Botão/ferramenta que a IA pode usar, como "consultar pedido". |
| MCP | Padrão para conectar a IA a sistemas e dados de forma organizada. |
| Resource | Biblioteca/arquivo/dado que a IA pode consultar. |
| Prompt | Instrução dada para a IA. |
| Hook | Cancela ou ajusta uma ação automaticamente antes/depois dela acontecer. |
| Subagente | Um especialista temporário chamado para uma parte da tarefa. |
| Coordinator | O agente principal que organiza os especialistas. |
| Structured output | Resposta em formato previsível, como formulário preenchido. |
| JSON Schema | Modelo do formulário que define campos obrigatórios e tipos. |
| Context window | Espaço de memória temporária da conversa. |
| Proveniência | De onde veio cada informação usada na resposta. |
| Escalonamento | Passar para uma pessoa quando há risco, dúvida ou exceção. |

## Exemplo 1 - Reembolso de cliente

### Versão técnica

O agente chama `get_customer`, depois `lookup_order`, calcula elegibilidade e
usa um gate determinístico antes de `process_refund`.

### Versão simples

Antes de devolver dinheiro, o assistente precisa:

1. confirmar quem é o cliente;
2. verificar o pedido;
3. checar a política de reembolso;
4. ver se o valor está dentro do limite;
5. se estiver acima do limite, pedir aprovação humana.

O ponto importante: **não basta pedir para a IA "ter cuidado"**. O sistema deve
bloquear automaticamente reembolsos fora da regra.

## Exemplo 2 - Pesquisa com vários subagentes

### Versão técnica

Um coordenador delega busca, análise documental e síntese para subagentes,
passando contexto explícito e exigindo claim-source mapping.

### Versão simples

É como montar uma equipe pequena:

- uma pessoa pesquisa na internet;
- outra lê documentos;
- outra escreve o resumo;
- outra revisa se faltou algo.

O coordenador garante que todo mundo sabe o objetivo e que o relatório final
diz **de onde veio cada informação**.

## Exemplo 3 - Claude Code revisando Pull Request

### Versão técnica

Claude Code roda no CI, analisa o diff, emite findings em JSON com severidade,
evidência, arquivo, linha e recomendação.

### Versão simples

Antes de aceitar uma mudança no código, a IA faz uma revisão automática.

Ela não deve comentar gosto pessoal, como "eu escreveria diferente". Ela deve
focar em:

- bug real;
- falha de segurança;
- risco de quebrar algo;
- teste faltando;
- impacto claro.

Cada comentário precisa apontar:

- onde está o problema;
- por que é problema;
- qual correção mínima.

## Exemplo 4 - Extração de dados de contratos

### Versão técnica

O sistema usa tool use com JSON Schema, validação, retry e confidence por campo.

### Versão simples

Imagine que a IA está preenchendo um formulário a partir de um contrato.

O formulário define:

- nome das partes;
- data de início;
- data de término;
- condições de pagamento;
- riscos.

Se o contrato não tiver data de término, a IA não deve inventar. Ela deve marcar
"não encontrado" ou `null`.

Se a IA não tiver certeza sobre um campo importante, manda para revisão humana.

## Exemplo 5 - Codebase grande

### Versão técnica

Usar `Glob` e `Grep` para descoberta, `Read` seletivo, scratchpad e resumo
progressivo.

### Versão simples

Se a IA precisa entender um sistema enorme, ela não deve tentar ler tudo de uma
vez. É melhor:

1. olhar o mapa de pastas;
2. procurar palavras-chave;
3. abrir poucos arquivos relevantes;
4. anotar o que já confirmou;
5. separar fatos de hipóteses;
6. só então propor mudança.

É como investigar um problema: primeiro você localiza pistas, depois aprofunda.

## Como explicar "prompt não é garantia"

Frase simples:

> Prompt é uma orientação. Regra crítica precisa de trava.

Exemplo:

- Orientação: "não aprove reembolso alto".
- Trava: o botão de reembolso alto só funciona com approval ID.

Em produção, regras importantes devem ficar no sistema, não apenas na boa
vontade do modelo.

## Como explicar "structured output"

Frase simples:

> Em vez de pedir um texto livre, pedimos para a IA preencher um formulário com
> campos definidos.

Isso ajuda porque:

- o sistema consegue validar;
- dá para detectar campo ausente;
- outros sistemas conseguem consumir;
- reduz resposta ambígua.

## Como explicar "proveniência"

Frase simples:

> Toda afirmação importante precisa de recibo.

Exemplo:

Ruim:

```text
A política permite reembolso.
```

Bom:

```text
A política permite reembolso em até 30 dias, conforme documento X, seção Y,
atualizado em 2026-07-01.
```

## Como explicar "subagente não herda contexto"

Frase simples:

> Se você chama uma pessoa nova para ajudar, precisa contar o caso para ela.

Não adianta chamar um especialista e esperar que ele saiba tudo que foi discutido
antes. O coordenador precisa passar:

- objetivo;
- fatos já descobertos;
- fontes;
- critérios;
- formato esperado.

## Como explicar "context window"

Frase simples:

> A IA tem uma mesa de trabalho limitada. Se você jogar papel demais, ela perde
> coisas importantes.

Por isso usamos:

- resumos;
- listas de fatos;
- scratchpads;
- arquivos de apoio;
- leitura seletiva.

## Como explicar "quando escalar"

Escalar significa chamar uma pessoa.

Escalone quando:

- há dinheiro alto;
- há risco legal;
- há dado sensível;
- a regra não está clara;
- o cliente pediu humano;
- a IA está pouco confiante;
- a ação é difícil de desfazer.

## Resumo executivo para apresentar

```text
A certificação cobra arquitetura de soluções com Claude em produção. O foco não
é decorar comandos, mas saber desenhar agentes seguros, úteis e auditáveis.

Precisamos entender:
- como agentes chamam ferramentas;
- como limitar ações perigosas;
- como integrar sistemas via MCP;
- como configurar Claude Code para times;
- como gerar saídas estruturadas;
- como preservar contexto e fontes;
- quando automatizar e quando escalar para humano.
```

## Perguntas para treinar com não técnicos

1. Qual ação você deixaria a IA fazer sozinha?
2. Qual ação exigiria aprovação humana?
3. Que informação precisa de fonte?
4. Que erro seria aceitável?
5. Que erro seria crítico?
6. O que deve ficar em texto livre e o que deve virar formulário?
7. Quando o agente deve parar e pedir ajuda?
