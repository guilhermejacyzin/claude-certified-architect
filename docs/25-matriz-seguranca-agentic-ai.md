# 25 - Matriz De Segurança Para Agentic AI, Claude, MCP E Claude Code

Este documento é o mapa de riscos do curso. Ele existe porque uma escola sobre
agentes não pode ensinar apenas capacidade; precisa ensinar controle. Quanto mais
um agente lê, navega, chama ferramentas, manipula arquivos ou executa comandos,
maior é a obrigação de desenhar fronteiras de confiança.

## Fontes Profissionais E Acadêmicas Usadas

Esta matriz consolida, com redação própria:

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/).
- [OWASP GenAI Security Project - LLM Top 10](https://genai.owasp.org/llm-top-10/).
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework).
- [NIST AI RMF Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf).
- [Anthropic - Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks).
- [Anthropic - Mitigating prompt injections in browser use](https://www.anthropic.com/research/prompt-injection-defenses).
- [Anthropic - Computer use tool](https://docs.anthropic.com/en/docs/build-with-claude/computer-use).
- [Anthropic - Piloting Claude in Chrome](https://www.anthropic.com/news/claude-for-chrome).
- [Anthropic - Claude Code auto mode](https://www.anthropic.com/engineering/claude-code-auto-mode).
- [Microsoft - Defending against indirect prompt injection](https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks).
- [Microsoft - Securing AI agents when tools move from reading to acting](https://www.microsoft.com/en-us/security/blog/2026/06/30/securing-ai-agents-ai-tools-move-from-reading-acting/).

## Princípio Central

O erro mais perigoso é tratar texto como comando confiável.

Em sistemas agentic, texto pode vir de:

- usuário;
- system prompt;
- arquivo local;
- README de repositório externo;
- página web;
- PDF;
- OCR;
- email;
- resposta de tool;
- resource MCP;
- descrição de tool MCP;
- resultado de busca;
- log;
- issue ou PR no GitHub.

Nem todo texto tem o mesmo nível de confiança. A arquitetura deve deixar claro o
que é instrução, o que é dado e o que é ação.

## Aprendizados De Erros Atuais Em Agentes

As publicacoes recentes sobre browser use, computer use, MCP e agentes que
executam tools apontam para um padrao repetido: o problema nao e apenas o modelo
"obedecer errado"; o problema e a aplicacao entregar ao agente uma mistura de
conteudo, permissao e ferramenta sem fronteiras claras.

### Erro 1: tratar pagina, email, PDF ou tool result como instrucao

Em browser use, a pagina visitada pode conter texto malicioso, texto oculto,
conteudo em imagem ou UI enganosa. O agente precisa ler a pagina para ajudar,
mas nao pode permitir que a pagina redefina o objetivo, peca segredo ou acione
tools mutating. A prevencao correta e rotular esse conteudo como dado nao
confiavel, manter o objetivo do usuario separado e exigir confirmacao para
acoes sensiveis.

### Erro 2: permitir tool mutating sem intencao verificavel

Enviar email, publicar arquivo, comprar, apagar, transferir, alterar permissao
ou chamar API de escrita nunca deve depender so do texto gerado. A aplicacao
precisa conferir intencao do usuario, destino, payload, escopo, tenant, custo e
rollback antes de executar.

### Erro 3: deixar dados sensiveis atravessarem fronteiras sem filtro

Prompts, tool results, logs, RAG chunks e mensagens de erro podem carregar
segredos. Um agente seguro minimiza dados, remove tokens de logs, evita enviar
conteudo interno para tools externas e bloqueia exfiltracao por URL, imagem,
webhook, email ou campo livre.

### Erro 4: confiar em metadata de tool sem revisao

Em MCP, a descricao de uma tool e parte do comportamento do agente. Se um
servidor ou pacote muda descricao, schema ou prompt, ele pode induzir o modelo a
usar a ferramenta em momento errado. Por isso, metadata deve passar por review,
pin de versao, diff e teste de abuso.

### Erro 5: pensar que classificador substitui arquitetura

Classificadores, red teaming e treinamento ajudam, mas nao eliminam risco. A
arquitetura ainda precisa de least privilege, separacao read-only/mutating,
allowlist, validacao de output, confirmacao humana e auditoria.

## Matriz De Riscos

| Risco | Como aparece | Impacto | Controle obrigatório |
|---|---|---|---|
| Prompt injection direta | usuário tenta alterar regras do sistema | resposta fora de política | system prompt claro, validação e recusa |
| Prompt injection indireta | PDF, página, README ou tool result contém instruções escondidas | vazamento ou ação indevida | tratar conteúdo externo como dado não confiável |
| Exfiltração por link/imagem | resposta gera URL com dados embutidos | perda de informação | bloquear domínios não aprovados e sanitizar saída |
| Exfiltração por tool call | agente envia dados para tool externa | vazamento silencioso | allowlist, least privilege e aprovação humana |
| MCP tool poisoning | descrição ou schema da tool muda com instrução maliciosa | tool misuse e supply chain | revisão de metadata, pin de versão e diff obrigatório |
| Excessive agency | agente pode deletar, enviar, publicar ou comprar sem gate | dano operacional | separar read-only/mutating e exigir confirmação |
| Insecure output handling | saída do modelo entra em shell, SQL, HTML ou pipeline sem sanitização | RCE, XSS, corrupção de dados | schema, escaping, validação e execução isolada |
| Sensitive disclosure | resposta revela segredo, cliente, token ou documento | risco legal e reputacional | redaction, scan, classificação e política de dados |
| Overreliance | usuário aceita resposta sem checar | decisão errada | fontes, confidence, revisão humana e simulado |
| Model/tool DoS | prompts ou arquivos gigantes geram custo e latência | custo e indisponibilidade | token budget, timeout, chunking e limites |
| RAG sem ACL | busca recupera documento que usuário não deveria ver | vazamento interno | filtro de permissão antes do retrieval e da resposta |
| Logs inseguros | prompts, tokens ou outputs sensíveis ficam em log | vazamento posterior | logs mínimos e redigidos |
| GitHub Pages 404 | workflow não publica arquivo linkado | quebra de estudo | validação de artefato publicado |
| Conteúdo raso | aula não explica suficiente | falha de aprendizagem | padrão de aula completa e QA pedagógico |

## Controles De Arquitetura

### 1. Separar instrução de dado

Instruções confiáveis ficam em system prompt, configuração de aplicação ou regra
de código. Conteúdo externo deve entrar como dado, preferencialmente em estruturas
delimitadas como tool result ou JSON.

Aplicação prática:

```text
Não coloque texto de página web dentro do system prompt.
Não concatene PDF como se fosse instrução.
Não deixe README externo redefinir comportamento do agente.
```

### 2. Menor privilégio

Um agente não deve ter acesso amplo só porque isso é conveniente. Cada tool deve
ter escopo mínimo.

Aplicação prática:

```text
get_invoice(id) é melhor que manage_finance(payload).
search_docs(query) é melhor que read_all_company_documents().
create_draft_email() é mais seguro que send_email().
```

### 3. Separar read-only de mutating

Tools de leitura e tools que mudam estado não devem estar misturadas.

Read-only:

- consultar pedido;
- buscar documentação;
- listar arquivos;
- ler resource.

Mutating:

- enviar mensagem;
- apagar arquivo;
- publicar release;
- fazer pagamento;
- abrir ticket;
- alterar configuração.

Mutating exige gate, audit log e, quando houver risco relevante, confirmação
humana.

### 4. Validar output antes de usar

Saída do modelo não deve entrar diretamente em:

- shell;
- SQL;
- HTML;
- comando Git;
- API mutating;
- workflow de CI;
- arquivo de configuração.

Use schema, escaping, allowlist e revisão por código.

### 5. Revisar MCP metadata como código

Descrição de tool, schema e prompt MCP são parte do contrato de segurança. Uma
mudança de descrição pode mudar o comportamento do agente.

Checklist:

1. A tool mudou de nome?
2. A descrição passou a pedir dados extras?
3. O schema adicionou campo que pode carregar segredo?
4. O servidor é terceiro?
5. A tool envia dados para endpoint externo?
6. Há log de payload?
7. Há aprovação para ação mutating?

### 6. Tratar browser e web como ambiente hostil

Agentes que navegam na web processam conteúdo de origem desconhecida. Instruções
escondidas podem aparecer em HTML, CSS, texto invisível, comentários, páginas,
documentos, imagens ou resultados de busca.

Regra de projeto:

```text
Conteúdo da internet nunca pode alterar política, permissão ou objetivo original.
```

### 7. QA de publicação

Para este repositório, segurança também inclui integridade da escola. Link 404 é
falha de qualidade porque impede aprendizagem.

Comando obrigatório:

```powershell
node tools/check-site-links.js
```

Esse script valida:

- links internos em Markdown, HTML e JS;
- existência dos arquivos;
- se o arquivo estará no artefato publicado pelo GitHub Pages;
- links `docsify.html#/...`;
- referências para `.claude/`.

## Critério De Bloqueio

Uma mudança deve ser bloqueada se:

1. introduz link interno quebrado;
2. linka arquivo que não é publicado no Pages;
3. adiciona segredo, token, cliente real ou dado interno;
4. adiciona tool mutating sem gate;
5. mistura dado externo com instrução confiável;
6. adiciona conteúdo de estudo com explicação curta demais;
7. quebra mobile;
8. remove conteúdo sem substituição;
9. reduz rastreabilidade de fonte;
10. altera workflow de publicação sem teste.

## Como Isso Cai Na Certificação

A certificação tende a perguntar qual decisão é mais correta em produção.

Resposta fraca:

```text
Melhorar o prompt para o agente não vazar dados.
```

Resposta forte:

```text
Tratar conteúdo externo como não confiável, isolar em tool_result, aplicar menor
privilégio nas tools, bloquear exfiltração por domínio, validar saída, registrar
auditoria e exigir aprovação humana para ações sensíveis.
```

## Checklist De Revisão Segurança

Antes de publicar:

1. Rode o validador de links.
2. Rode scan de termos sensíveis.
3. Confirme que `.claude/` e `tools/` estão no Pages se forem linkados.
4. Abra home, biblioteca e páginas profundas.
5. Teste mobile e desktop.
6. Verifique se toda fonte externa abre em nova aba.
7. Confirme que vídeos são conteúdo complementar, não única fonte.
8. Verifique se cada aula tem explicação, prática e critério de prova.
9. Confirme que não há instrução incentivando bypass de política corporativa.
10. Registre decisão no commit.
