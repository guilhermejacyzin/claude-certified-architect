# 26 - Plano De QA, Engenharia, UX E Ensino

Este documento define o padrão mínimo para declarar que o repositório está
pronto. O objetivo é evitar quatro falhas:

1. site com link quebrado;
2. conteúdo curto demais para estudar;
3. risco de segurança ignorado;
4. UX confusa para quem chegou agora.

## Papéis Que Devem Ser Assumidos

### Engenharia de software

Responsável por:

- arquitetura simples;
- arquivos previsíveis;
- links estáveis;
- validação automatizada;
- publicação reproduzível;
- diffs revisáveis;
- ausência de regressão.

### Cibersegurança

Responsável por:

- threat model;
- vazamento de informação;
- prompt injection;
- MCP tool poisoning;
- menor privilégio;
- logs e secrets;
- controles antes de automação.

### QA

Responsável por:

- crawler de links;
- smoke test HTTP;
- teste visual desktop/mobile;
- validação de fluxo principal;
- teste de conteúdo mínimo;
- evidência antes do commit.

### UX/UI

Responsável por:

- navegação clara;
- estado ativo;
- busca útil;
- responsividade;
- legibilidade;
- hierarquia visual;
- ausência de overflow;
- previsibilidade de clique.

### Ensino

Responsável por:

- aula completa;
- explicação normal;
- explicação técnica;
- exemplo simplificado;
- passo a passo;
- prática;
- erro comum;
- simulado;
- critério de domínio.

## Gates Automatizados

### 1. Sintaxe JavaScript

```powershell
node --check assets/academy-data.js
node --check assets/academy-extra-lessons.js
node --check assets/academy-app.js
node --check tools/check-site-links.js
```

### 2. Links Internos E Publicação

```powershell
node tools/check-site-links.js
```

Esse comando deve falhar se:

- o link aponta para arquivo inexistente;
- o arquivo existe localmente, mas não seria publicado no GitHub Pages;
- um link `docsify.html#/...` aponta para rota inexistente na biblioteca local;
- uma pasta como `.claude/` é usada mas não entra no artefato.

### 3. HTTP Local

Com servidor local:

```powershell
python -m http.server 8080
```

Testar:

```text
/
/docsify.html
/README.md
/course/00-como-usar-o-curso.md
/academy/02-building-with-claude-api.md
/docs/25-matriz-seguranca-agentic-ai.md
/tools/check-site-links.js
```

Todos devem retornar HTTP 200.

### 4. Scan Sensível

Buscar padrões proibidos:

```text
token
Bearer
password
api_key
client secret
nomes internos reais
credenciais
dados corporativos confidenciais
```

O scan não substitui revisão humana. Ele só reduz erro grosseiro.

### 5. Validação Visual

Capturar ou abrir:

- desktop largo;
- mobile estreito;
- home;
- lista de aulas;
- aula completa;
- biblioteca Markdown local;
- página profunda.

Critérios:

1. não há texto cortado;
2. botões cabem;
3. cards não sobrepõem;
4. busca é visível;
5. progresso aparece;
6. links principais estão claros;
7. mobile não tem rolagem horizontal incoerente.

## Gates Pedagógicos

Uma aula não está pronta se tiver apenas uma frase.

Cada aula precisa responder:

1. O que é?
2. Por que importa?
3. Quando usar?
4. Quando não usar?
5. Como fazer passo a passo?
6. Qual erro comum?
7. Qual exemplo simplificado?
8. Qual exercício?
9. Como cai na prova?
10. Como saber que aprendi?

Na interface, isso aparece em:

- explicação normal;
- explicação técnica;
- exemplo simplificado;
- passo a passo;
- prática guiada;
- como cai em prova;
- aula completa;
- cenário de fixação;
- resposta esperada.

## Fluxo De QA Antes De Commit

1. Ler o diff.
2. Rodar sintaxe JS.
3. Rodar `node tools/check-site-links.js`.
4. Subir servidor local.
5. Abrir home.
6. Abrir `docsify.html`.
7. Clicar em pelo menos cinco materiais internos da academia.
8. Abrir uma aula de cada módulo.
9. Testar busca por `MCP`, `RAG`, `hook`, `schema` e `security`.
10. Capturar desktop e mobile.
11. Rodar scan sensível.
12. Fazer commit.
13. Fazer push.
14. Conferir GitHub Pages depois do deploy.

## Fluxo De Correção De 404

Quando alguém reportar 404:

1. Identificar o link exato clicado.
2. Ver se o arquivo existe no repo.
3. Ver se o workflow copia a pasta para `site-dist`.
4. Ver se o link usa hash da biblioteca corretamente.
5. Ver se o link é relativo a uma pasta errada.
6. Rodar o validador.
7. Adicionar teste para impedir repetição.
8. Corrigir README/sidebar se necessário.

## Fluxo De Correção De Conteúdo Raso

Quando uma aula estiver curta:

1. Identificar a aula.
2. Conferir se existe material longo em `academy/`, `course/`, `docs/` ou
   `examples/`.
3. Adicionar explicação em camadas.
4. Adicionar passo a passo.
5. Adicionar anti-patterns.
6. Adicionar exercício.
7. Adicionar fonte PT-BR ou registrar lacuna.
8. Adicionar simulado ou questão relacionada.
9. Validar se a aula permite responder questão scenario-based.

## Critério De Aceite Final

O repo só pode ser tratado como escola quando:

1. não há links internos quebrados;
2. não há arquivo linkado fora do Pages;
3. home e biblioteca funcionam;
4. mobile e desktop são legíveis;
5. cada aula tem conteúdo além de definição curta;
6. segurança aparece como parte da formação;
7. QA tem evidência automatizada;
8. fontes externas são complementares, não substitutas;
9. o aluno sabe o que estudar depois;
10. o commit explica a mudança.

## Próximas Melhorias

1. Criar teste Playwright versionado.
2. Criar relatório HTML de links.
3. Criar exportação/importação de progresso.
4. Criar páginas Markdown longas por microaula.
5. Criar simulado por módulo dentro da interface.
6. Criar checklist de prontidão com score.
7. Adicionar auditoria externa periódica de links.
8. Adicionar data de última verificação de cada vídeo.
