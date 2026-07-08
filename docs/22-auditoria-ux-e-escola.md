# 22 - Auditoria De UX E Reformulação Como Escola

Este documento registra a revisão crítica da primeira versão do site e as
decisões tomadas para transformar o repositório em uma experiência de academia.

## Diagnóstico Da Versão Anterior

A primeira versão usava Docsify. Isso resolvia leitura de Markdown, mas não
resolvia experiência de escola nem dava controle suficiente sobre UX, QA e
rotas profundas. A versão atual preserva a URL `docsify.html`, mas usa um
leitor local de Markdown sem CDN.

Problemas encontrados:

1. **Era documentação, não curso guiado.** O usuário via arquivos, mas não tinha
   sensação de trilha, módulo, aula, progresso e próxima etapa.
2. **Não havia aula por aula na interface.** O conteúdo existia em Markdown, mas
   a experiência não separava objetivo, explicação, prática e recursos.
3. **Não havia explicação em camadas.** O site não destacava explicação normal,
   explicação técnica e exemplo simplificado.
4. **Não havia embeds de vídeo.** A curadoria PT-BR existia, mas não estava
   incorporada visualmente ao estudo.
5. **A navegação lateral era longa e documental.** Boa para referência, fraca
   para estudo guiado.
6. **Não havia progresso local.** O aluno não conseguia marcar aula concluída.
7. **Não havia sequência anterior/próxima aula.** Isso quebra o padrão de escola.
8. **A capa era mais landing page do que sala de aula.** Faltava entrar direto
   na experiência.
9. **A paleta verde não combinava com o pedido visual.** O pedido posterior foi
   direção azul/roxo, clean e estilo Apple.
10. **Dependência de leitor externo limitava controle de UX.** Para virar
    escola, era melhor controlar layout, dados e renderização.

## Decisão Tomada

Substituir a home por um app estático próprio:

- `index.html`: estrutura da academia.
- `assets/academy-data.js`: módulos, aulas, fontes, vídeos e links.
- `assets/academy-extra-lessons.js`: microaulas adicionais para cobrir a grade
  visível da Academy com mais granularidade.
- `assets/academy-app.js`: busca, filtros, progresso, renderização e navegação.
- `assets/academy.css`: design clean, responsivo e orientado a estudo.
- `docsify.html`: biblioteca textual preservada para leitura longa dos Markdown,
  agora implementada como leitor local.

Markdown continua existindo como biblioteca profunda. A home agora é a escola; os
arquivos `.md` são apostilas, labs, simulados e referências. A biblioteca deixou
de ser a entrada principal e passou a funcionar como leitor de apoio.

## O Que Melhorou

1. Módulos aparecem como trilha real.
2. Cada aula tem objetivo, explicação normal, técnica, exemplo simplificado,
   passo a passo, prática e critério de prova.
3. Vídeos PT-BR aparecem incorporados quando há `embed`.
4. Links oficiais e artigos aparecem na própria aula.
5. Progresso fica salvo em `localStorage`.
6. Há filtro por nível e busca por conceito.
7. Há navegação anterior/próxima.
8. A paleta foi trocada para azul/roxo.
9. O site funciona sem build.
10. O GitHub Pages publica a escola junto com a biblioteca.
11. A grade navegável atual chega a 101 aulas, reduzindo agrupamentos excessivos
    e incluindo segurança, QA, UX e desenho pedagógico.

## Crítica Das Próprias Escolhas

### 1. App estático sem framework

Escolha: HTML, CSS e JS puro.

Vantagem:

- sem build;
- fácil de manter no GitHub Pages;
- qualquer pessoa consegue abrir e alterar;
- menor risco de dependência quebrar.

Crítica:

- se o curso crescer para centenas de aulas, um framework ou gerador estático
  pode melhorar componentes, roteamento e validação.

Mitigação:

- manter `academy-data.js` estruturado;
- futuramente gerar dados a partir de Markdown/YAML.

### 2. Conteúdo dentro de JavaScript

Escolha: aulas no `academy-data.js`.

Vantagem:

- interface renderiza rápido;
- fácil ligar cada aula a vídeos e links;
- permite busca e progresso local.

Crítica:

- texto muito grande em JS pode ficar difícil de revisar em PR;
- Markdown é melhor para edição longa.

Mitigação:

- manter a versão longa nas pastas `academy/`, `course/`, `docs/` e `examples/`;
- usar o JS como camada de navegação e resumo denso;
- no futuro, gerar JS automaticamente a partir de arquivos Markdown.

### 3. Embeds do YouTube

Escolha: usar iframes para vídeos principais.

Vantagem:

- experiência de escola real;
- aluno assiste sem sair da aula;
- fallback ainda tem link para abrir no YouTube.

Crítica:

- YouTube pode bloquear embed em alguns vídeos;
- carrega recursos externos;
- não dá para garantir disponibilidade futura.

Mitigação:

- sempre mostrar link externo abaixo do iframe;
- manter IDs em `recursos-ptbr/fontes-curadas-ptbr.md`;
- substituir vídeos quebrados em rodadas futuras.

### 4. Progresso em localStorage

Escolha: progresso local no navegador.

Vantagem:

- simples;
- sem backend;
- respeita privacidade;
- funciona em GitHub Pages.

Crítica:

- não sincroniza entre máquinas;
- limpar navegador apaga progresso.

Mitigação:

- o `study-log.md` continua sendo registro persistente no repo;
- futuro: exportar/importar progresso em JSON.

### 5. Paleta azul/roxo estilo Apple

Escolha: base branca/cinza clara com azul/roxo como acento.

Vantagem:

- mais limpo;
- menos cara de documentação técnica;
- combina com escola digital moderna.

Crítica:

- excesso de azul/roxo pode ficar monótono.

Mitigação:

- usar neutros como base;
- manter apenas acentos por módulo;
- não depender de gradientes fortes.

## Próximas Melhorias Obrigatórias

1. Aumentar `academy-data.js` até cobrir todos os microtópicos visíveis da Academy.
2. Criar páginas longas por aula, não apenas por módulo.
3. Adicionar mais vídeos PT-BR por aula.
4. Validar manualmente se cada vídeo está realmente em PT-BR.
5. Marcar fontes como principal, complementar ou lacuna.
6. Criar trilha por persona: iniciante, dev, arquiteto, liderança.
7. Criar página de certificados internos e checklist de prontidão.
8. Criar simulados por módulo, não só simulados globais.
9. Adicionar export/import de progresso.
10. Criar geração automática da escola a partir de arquivos de conteúdo.

## Critério De Aceite

O site só deve ser considerado no padrão desejado quando:

1. Uma pessoa iniciante entende onde começar.
2. Cada módulo tem aulas claramente separadas.
3. Cada aula explica o conceito em camadas.
4. Cada aula aponta prática.
5. Cada aula aponta recursos PT-BR quando existirem.
6. Vídeos aparecem incorporados ou linkados.
7. A navegação anterior/próxima funciona.
8. A busca encontra termos centrais.
9. O design é limpo e responsivo.
10. O conteúdo profundo continua no repo, sem remoção.
