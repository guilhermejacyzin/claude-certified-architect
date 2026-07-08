# Segurança e Confidencialidade

Este repo deve ser tratado como material de estudo privado.

Não inclua:

- dados da empresa;
- nomes de clientes;
- prints de sistemas internos;
- credenciais, tokens, chaves ou logs;
- questões reais do exame;
- PDF oficial ou cópias de cursos.

Se precisar estudar com um caso real, transforme-o em cenário fictício:

- remova nomes;
- troque valores;
- substitua endpoints por exemplos;
- descreva o padrão arquitetural, não o incidente real.

Regra prática: se o conteúdo não poderia ser publicado em um blog técnico
genérico, não deve entrar neste repo.
## Politica operacional de seguranca

Este material foi desenhado para estudo publico ou compartilhavel, mas o tema
envolve agentes, MCP, tools, automacao e integracao com sistemas. Portanto, a
seguranca deve ser tratada como requisito de produto, nao como anexo.

Antes de adicionar qualquer conteudo, aplique quatro perguntas:

1. O exemplo revela dado real de empresa, cliente, contrato, ambiente, endpoint
   interno, token, log ou captura de tela?
2. O exemplo ensina uma acao destrutiva sem aprovacao, auditoria ou rollback?
3. O exemplo incentiva o agente a ignorar politica, permissao, tenant ou
   consentimento?
4. O exemplo poderia ser usado para extrair segredo, contornar autenticacao ou
   operar conta de terceiros?

Se qualquer resposta for "sim", o conteudo deve ser reescrito como cenario
ficticio, reduzido, anonimizado ou removido.

## Matriz resumida de riscos

| Risco | Como aparece | Prevencao obrigatoria |
| --- | --- | --- |
| Vazamento de informacao | exemplos com cliente, token, contrato ou log real | anonimizar, usar dados ficticios e revisar antes de publicar |
| Prompt injection | conteudo externo tenta instruir o agente a ignorar regras | separar instrucao confiavel de dados nao confiaveis |
| Tool poisoning | descricao de tool ou MCP induz uso errado | revisar manifests, limitar permissao e testar tools |
| Excesso de agencia | agente executa acao destrutiva sem gate | exigir aprovacao, policy em codigo e auditoria |
| RAG inseguro | documento recuperado injeta instrucao | tratar documento como dado, nao como comando |
| Dependencia externa quebrada | CDN, link, video ou asset some | preferir assets locais e validar links antes do push |
| Conteudo raso | aluno nao aprende criterio de decisao | exigir conceito, passo a passo, exemplo e rubrica |

## Gates antes de publicar

1. Rodar `node tools/check-site-links.js`.
2. Validar sintaxe de JavaScript alterado com `node --check`.
3. Procurar termos sensiveis, tokens e nomes internos antes do commit.
4. Abrir a home, a biblioteca Markdown, um lab, um simulado e uma aula profunda.
5. Confirmar que exemplos destrutivos usam dados ficticios, aprovacao e
   auditoria.
6. Registrar no commit apenas conteudo que possa ser defendido em revisao.

O mapeamento completo fica em
[`docs/25-matriz-seguranca-agentic-ai.md`](docs/25-matriz-seguranca-agentic-ai.md).
