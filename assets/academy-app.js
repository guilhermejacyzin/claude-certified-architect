(function () {
  var data = window.ACADEMY_DATA;
  if (Array.isArray(window.ACADEMY_EXTRA_LESSONS)) {
    data.lessons = data.lessons.concat(window.ACADEMY_EXTRA_LESSONS);
  }
  var state = {
    module: 'all',
    level: 'all',
    query: '',
    activeLessonId: window.location.hash ? window.location.hash.replace('#', '') : 'start-how-to-study',
    completed: loadProgress()
  };
  var initialLesson = data.lessons.find(function (lesson) { return lesson.id === state.activeLessonId; });
  if (window.location.hash && initialLesson) {
    state.module = initialLesson.module;
  }

  var els = {
    moduleNav: document.getElementById('moduleNav'),
    lessonList: document.getElementById('lessonList'),
    lessonDetail: document.getElementById('lessonDetail'),
    statsGrid: document.getElementById('statsGrid'),
    searchInput: document.getElementById('searchInput'),
    levelFilter: document.getElementById('levelFilter'),
    lessonSelect: document.getElementById('lessonSelect'),
    progressPercent: document.getElementById('progressPercent'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    resourceBoard: document.getElementById('resourceBoard'),
    resetProgress: document.getElementById('resetProgress')
  };

  init();

  function init() {
    renderModules();
    renderStats();
    renderResourceBoard();
    bindEvents();
    render();
  }

  function bindEvents() {
    els.searchInput.addEventListener('input', function (event) {
      state.query = normalize(event.target.value);
      render();
    });

    els.levelFilter.addEventListener('change', function (event) {
      state.level = event.target.value;
      render();
    });

    els.lessonSelect.addEventListener('change', function (event) {
      if (!event.target.value) return;
      state.activeLessonId = event.target.value;
      window.history.replaceState(null, '', '#' + state.activeLessonId);
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    els.resetProgress.addEventListener('click', function () {
      if (!window.confirm('Limpar progresso salvo neste navegador?')) return;
      state.completed = {};
      saveProgress();
      render();
    });

    window.addEventListener('hashchange', function () {
      var id = window.location.hash.replace('#', '');
      var lesson = data.lessons.find(function (item) { return item.id === id; });
      if (lesson) {
        state.activeLessonId = id;
        state.module = lesson.module;
        render();
      }
    });
  }

  function renderModules() {
    var all = '<button class="module-button ' + (state.module === 'all' ? 'active' : '') + '" data-module="all" type="button"><span>Todos</span><small>Grade completa</small></button>';
    var moduleButtons = data.modules.map(function (module) {
      return '<button class="module-button ' + (state.module === module.id ? 'active' : '') + '" data-module="' + module.id + '" type="button" style="--accent:' + module.color + '">' +
        '<span>' + escapeHtml(module.short) + '</span>' +
        '<small>' + escapeHtml(module.title) + '</small>' +
        '</button>';
    }).join('');
    els.moduleNav.innerHTML = all + moduleButtons;
    els.moduleNav.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () {
        state.module = button.dataset.module;
        els.moduleNav.querySelectorAll('button').forEach(function (item) { item.classList.remove('active'); });
        button.classList.add('active');
        var first = getFilteredLessons()[0];
        if (first) state.activeLessonId = first.id;
        render();
      });
    });
  }

  function render() {
    var filtered = getFilteredLessons();
    if (!filtered.some(function (lesson) { return lesson.id === state.activeLessonId; }) && filtered[0]) {
      state.activeLessonId = filtered[0].id;
    }
    syncModuleButtons();
    renderLessonSelect(filtered);
    renderLessonList(filtered);
    renderLessonDetail(getActiveLesson(filtered));
    renderProgress();
    renderStats();
  }

  function getFilteredLessons() {
    return data.lessons.filter(function (lesson) {
      var moduleMatch = state.module === 'all' || lesson.module === state.module;
      var levelMatch = state.level === 'all' || lesson.level === state.level;
      var queryText = normalize([
        lesson.title,
        lesson.objective,
        lesson.normal,
        lesson.technical,
        lesson.simple,
        lesson.practice,
        lesson.exam,
        lesson.module,
        lesson.level,
        getLessonResourceText(lesson),
        (lesson.links || []).join(' ')
      ].join(' '));
      var queryMatch = !state.query || queryText.includes(state.query);
      return moduleMatch && levelMatch && queryMatch;
    });
  }

  function getActiveLesson(filtered) {
    return data.lessons.find(function (lesson) { return lesson.id === state.activeLessonId; }) || filtered[0] || data.lessons[0];
  }

  function renderLessonList(lessons) {
    if (!lessons.length) {
      els.lessonList.innerHTML = '<div class="empty-state">Nenhuma aula encontrada. Ajuste a busca ou filtro.</div>';
      return;
    }

    els.lessonList.innerHTML = lessons.map(function (lesson, index) {
      var module = getModule(lesson.module);
      var completed = Boolean(state.completed[lesson.id]);
      return '<button class="lesson-card ' + (lesson.id === state.activeLessonId ? 'active' : '') + '" data-lesson="' + lesson.id + '" type="button">' +
        '<span class="lesson-index" style="--accent:' + module.color + '">' + pad(index + 1) + '</span>' +
        '<span class="lesson-card-body">' +
          '<strong>' + escapeHtml(lesson.title) + '</strong>' +
          '<small>' + escapeHtml(module.title) + ' · ' + escapeHtml(lesson.level) + ' · ' + escapeHtml(lesson.duration) + '</small>' +
        '</span>' +
        '<span class="completion-dot ' + (completed ? 'done' : '') + '" aria-label="' + (completed ? 'Concluída' : 'Pendente') + '"></span>' +
      '</button>';
    }).join('');

    els.lessonList.querySelectorAll('.lesson-card').forEach(function (button) {
      button.addEventListener('click', function () {
        state.activeLessonId = button.dataset.lesson;
        window.history.replaceState(null, '', '#' + state.activeLessonId);
        render();
      });
    });
  }

  function renderLessonDetail(lesson) {
    var module = getModule(lesson.module);
    var completed = Boolean(state.completed[lesson.id]);
    var sequence = getLessonSequence(lesson.id);
    var videos = renderVideos(lesson);
    var resources = renderResources(lesson);
    var links = renderInternalLinks(lesson);
    var steps = lesson.steps.map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join('');

    els.lessonDetail.innerHTML =
      '<div class="lesson-hero" style="--accent:' + module.color + '">' +
        '<div>' +
          '<span class="eyebrow">' + escapeHtml(module.title) + ' / ' + escapeHtml(lesson.level) + ' / ' + escapeHtml(lesson.duration) + '</span>' +
          '<h2>' + escapeHtml(lesson.title) + '</h2>' +
          '<p>' + escapeHtml(lesson.objective) + '</p>' +
        '</div>' +
        '<button id="toggleComplete" class="complete-button ' + (completed ? 'done' : '') + '" type="button">' +
          (completed ? 'Aula concluída' : 'Marcar como concluída') +
        '</button>' +
      '</div>' +
      '<div class="lesson-overview">' +
        '<section>' +
          '<span class="section-kicker">Comece aqui</span>' +
          '<h3>Entendimento essencial</h3>' +
          '<p>' + escapeHtml(lesson.normal) + '</p>' +
        '</section>' +
        '<section>' +
          '<span class="section-kicker">Exemplo simplificado</span>' +
          '<h3>Memória rápida</h3>' +
          '<p>' + escapeHtml(lesson.simple) + '</p>' +
        '</section>' +
      '</div>' +
      '<div class="lesson-sections">' +
        '<details class="lesson-section" open>' +
          '<summary><span>01</span><strong>Passo a passo e prática</strong><small>O que fazer, como treinar e como isso cai em prova.</small></summary>' +
          '<div class="section-body section-grid">' +
            '<article><h3>Passo a passo</h3><ol>' + steps + '</ol></article>' +
            '<article><h3>Prática guiada</h3><p>' + escapeHtml(lesson.practice) + '</p><h3>Como cai em prova</h3><p>' + escapeHtml(lesson.exam) + '</p></article>' +
          '</div>' +
        '</details>' +
        '<details class="lesson-section">' +
          '<summary><span>02</span><strong>Explicação técnica</strong><small>Abra quando quiser precisão arquitetural e termos de prova.</small></summary>' +
          '<div class="section-body technical-body">' + renderTechnicalExplanation(lesson, module) + '</div>' +
        '</details>' +
        renderDeepDive(lesson, module) +
        renderExpandedLesson(lesson, module) +
        '<details class="lesson-section">' +
          '<summary><span>05</span><strong>Vídeos, fontes e material do repo</strong><small>Use como reforço depois de entender a aula.</small></summary>' +
          '<div class="section-body resource-pack">' +
            videos +
            '<div class="resource-columns">' + resources + links + '</div>' +
          '</div>' +
        '</details>' +
      '</div>' +
      '<nav class="lesson-nav-actions" aria-label="Navegação entre aulas">' +
        (sequence.prev ? '<button type="button" data-jump="' + sequence.prev.id + '">Aula anterior<span>' + escapeHtml(sequence.prev.title) + '</span></button>' : '<span></span>') +
        (sequence.next ? '<button type="button" data-jump="' + sequence.next.id + '">Próxima aula<span>' + escapeHtml(sequence.next.title) + '</span></button>' : '<span></span>') +
      '</nav>';

    document.getElementById('toggleComplete').addEventListener('click', function () {
      if (state.completed[lesson.id]) {
        delete state.completed[lesson.id];
      } else {
        state.completed[lesson.id] = true;
      }
      saveProgress();
      render();
    });

    els.lessonDetail.querySelectorAll('[data-jump]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.activeLessonId = button.dataset.jump;
        window.history.replaceState(null, '', '#' + state.activeLessonId);
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function renderVideos(lesson) {
    if (!lesson.videos || !lesson.videos.length) {
      return '<section class="video-section"><h3>Vídeos PT-BR</h3><p class="muted">Ainda não há vídeo PT-BR validado para esta aula. Use os links oficiais e a curadoria para preencher a lacuna.</p></section>';
    }
    var cards = lesson.videos.map(function (id) {
      var item = data.resources[id];
      if (!item) return '';
      if (item.embed) {
        return '<article class="video-card">' +
          '<iframe title="' + escapeHtml(item.title) + '" src="' + item.embed + '" loading="lazy" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>' +
          '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item.title) + '</a>' +
        '</article>';
      }
      return '<article class="video-card link-only"><a href="' + item.url + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item.title) + '</a></article>';
    }).join('');
    return '<section class="video-section"><h3>Vídeos PT-BR relacionados</h3><div class="video-grid">' + cards + '</div></section>';
  }

  function renderLessonSelect(lessons) {
    if (!lessons.length) {
      els.lessonSelect.innerHTML = '<option value="">Nenhuma aula encontrada</option>';
      els.lessonSelect.disabled = true;
      return;
    }

    els.lessonSelect.disabled = false;
    els.lessonSelect.innerHTML = lessons.map(function (lesson, index) {
      var label = pad(index + 1) + ' - ' + lesson.title;
      return '<option value="' + escapeHtml(lesson.id) + '"' + (lesson.id === state.activeLessonId ? ' selected' : '') + '>' + escapeHtml(label) + '</option>';
    }).join('');
  }

  function syncModuleButtons() {
    if (!els.moduleNav) return;
    els.moduleNav.querySelectorAll('button').forEach(function (button) {
      button.classList.toggle('active', button.dataset.module === state.module);
    });
  }

  function renderDeepDive(lesson, module) {
    var profile = getTeachingProfile(lesson, module);
    var detailedSteps = profile.detailedSteps.map(function (step) {
      return '<li>' + escapeHtml(step) + '</li>';
    }).join('');
    var mistakes = profile.mistakes.map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');
    var checklist = profile.checklist.map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');

    return '<details class="lesson-section deep-dive">' +
      '<summary><span>03</span><strong>Aprofundamento especialista</strong><small>Conceito profundo, erros comuns, checklist e cenário de fixação.</small></summary>' +
      '<div class="section-body">' +
      '<div class="deep-grid">' +
        '<article>' +
          '<h3>Conceito em profundidade</h3>' +
          '<p>' + escapeHtml(profile.concept) + '</p>' +
          '<p>' + escapeHtml(profile.whyItMatters) + '</p>' +
        '</article>' +
        '<article>' +
          '<h3>Como executar na prática</h3>' +
          '<ol>' + detailedSteps + '</ol>' +
        '</article>' +
        '<article>' +
          '<h3>Erros comuns</h3>' +
          '<ul>' + mistakes + '</ul>' +
        '</article>' +
        '<article>' +
          '<h3>Checklist de domínio</h3>' +
          '<ul>' + checklist + '</ul>' +
        '</article>' +
      '</div>' +
      '<div class="deep-scenario">' +
        '<h3>Cenário de fixação</h3>' +
        '<p>' + escapeHtml(profile.scenario) + '</p>' +
        '<h3>Resposta esperada</h3>' +
        '<p>' + escapeHtml(profile.expectedAnswer) + '</p>' +
      '</div>' +
      '</div>' +
    '</details>';
  }

  function renderTechnicalExplanation(lesson, module) {
    var lens = getTopicLens(lesson);
    var frame = getModuleFrame(lesson.module);
    var criteria = [
      'Mecanismo correto: a resposta precisa escolher ' + frame.artifact + ' quando o cenário pedir esse tipo de controle.',
      'Contrato explícito: entradas, saídas, permissões, erros e evidência devem ser nomeados antes de executar.',
      'Validação: o desenho deve prever caso feliz, caso ambíguo e falha segura.',
      'Tradeoff: explique custo, latência, contexto, autonomia, manutenção e risco residual.',
      'Observabilidade: deixe claro como logs, testes, citações, schemas ou rubricas provam que a solução funcionou.'
    ].map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('');
    return '<p>' + escapeHtml(lesson.technical) + '</p>' +
      '<p>' + escapeHtml(lens.deepExplanation) + '</p>' +
      '<p>Para estudar esta aula com densidade de especialista, trate "' + escapeHtml(lesson.title) + '" como uma decisão de arquitetura. Não basta memorizar a definição: você precisa dizer quando usar, quando evitar, qual contrato mínimo sustenta a decisão e qual evidência comprova que a implementação ficou correta.</p>' +
      '<h3>Critérios técnicos de domínio</h3>' +
      '<ul>' + criteria + '</ul>';
  }

  function renderExpandedLesson(lesson, module) {
    var profile = getExpandedLessonProfile(lesson, module);
    var thesis = profile.thesis.map(function (item) { return '<p>' + escapeHtml(item) + '</p>'; }).join('');
    var principles = profile.operatingPrinciples.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('');
    var examSignals = profile.examSignals.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('');
    var labs = profile.labProtocol.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('');
    var flow = profile.flow.map(function (item, index) {
      return '<li><strong>' + pad(index + 1) + '. ' + escapeHtml(item.label) + '</strong><span>' + escapeHtml(item.text) + '</span></li>';
    }).join('');
    var chart = profile.chart.map(function (item) {
      return '<div class="focus-bar"><span>' + escapeHtml(item.label) + '</span><div><i style="width:' + item.value + '%"></i></div><strong>' + item.value + '%</strong></div>';
    }).join('');
    var comparison = profile.comparison.map(function (item) {
      return '<article><strong>' + escapeHtml(item.title) + '</strong><p>' + escapeHtml(item.text) + '</p></article>';
    }).join('');
    var sources = profile.sources.map(function (item) {
      return '<li><span>' + escapeHtml(item.kind) + '</span><a href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item.title) + '</a><small>' + escapeHtml(item.use) + '</small></li>';
    }).join('');

    return '<details class="lesson-section expanded-lesson">' +
      '<summary><span>04</span><strong>Arquitetura, diagramas e estudo denso</strong><small>Mapa mental, fluxograma, gráfico de foco, bibliografia e protocolo de treino.</small></summary>' +
      '<div class="section-body expanded-body">' +
        '<section class="expanded-copy">' +
          '<h3>Explicação aprofundada da aula</h3>' +
          thesis +
        '</section>' +
        '<section class="concept-flow" aria-label="Fluxograma de decisão da aula">' +
          '<h3>Fluxograma operacional</h3>' +
          '<ol>' + flow + '</ol>' +
        '</section>' +
        '<section class="expanded-grid-2">' +
          '<article>' +
            '<h3>Princípios que precisam ficar automáticos</h3>' +
            '<ul>' + principles + '</ul>' +
          '</article>' +
          '<article>' +
            '<h3>Sinais de prova e pegadinhas</h3>' +
            '<ul>' + examSignals + '</ul>' +
          '</article>' +
        '</section>' +
        '<section class="focus-chart">' +
          '<h3>Gráfico de foco da aula</h3>' +
          '<p class="muted">Leitura visual do peso relativo desta aula. Use para decidir onde aprofundar a revisão.</p>' +
          chart +
        '</section>' +
        '<section class="expanded-grid-2">' +
          '<article>' +
            '<h3>Como comparar alternativas</h3>' +
            '<div class="comparison-grid">' + comparison + '</div>' +
          '</article>' +
          '<article>' +
            '<h3>Protocolo de treino deliberado</h3>' +
            '<ol>' + labs + '</ol>' +
          '</article>' +
        '</section>' +
        '<section class="source-board">' +
          '<h3>Fontes técnicas e acadêmicas para esta aula</h3>' +
          '<ul>' + sources + '</ul>' +
        '</section>' +
      '</div>' +
    '</details>';
  }

  function getExpandedLessonProfile(lesson, module) {
    var lens = getTopicLens(lesson);
    var moduleFrame = getModuleFrame(lesson.module);
    return {
      thesis: [
        'Esta aula precisa ser estudada como um problema de arquitetura, não como um verbete. Em "' + lesson.title + '", a pergunta principal é: qual decisão técnica reduz incerteza, limita risco e produz uma evidência verificável? A resposta boa não é apenas dizer o que o conceito significa; é mostrar onde ele entra no ciclo problema -> contexto -> escolha -> execução -> validação -> registro.',
        lens.deepExplanation,
        'Na prática, você deve sempre amarrar o conceito a três camadas. A primeira é a camada de intenção: o que o usuário ou sistema quer obter. A segunda é a camada de contrato: quais dados, schemas, permissões, tools, resources, prompts, arquivos ou hooks participam da solução. A terceira é a camada de garantia: como provar que funcionou, como detectar falha e como impedir que um resultado plausível vire decisão insegura.',
        'Para memorizar com profundidade, transforme a aula em um mini design review. Explique o mecanismo, desenhe o fluxo, liste dois modos de falha, defina um critério de aceite e compare com pelo menos uma alternativa errada. Esse padrão cobre grande parte das questões scenario-based: elas testam se você reconhece o mecanismo correto sob restrição de contexto, custo, segurança, confiabilidade ou manutenção.'
      ],
      flow: [
        { label: 'Entrada', text: 'Leia o objetivo da aula e identifique dado bruto, instrução e ação esperada.' },
        { label: 'Classificação', text: 'Decida se o problema é de ' + lens.shortName + ', integração, contexto, avaliação, custo ou segurança.' },
        { label: 'Contrato', text: 'Defina o artefato mínimo: ' + moduleFrame.artifact + '. Sem contrato, a resposta fica subjetiva.' },
        { label: 'Execução', text: 'Aplique o mecanismo com menor privilégio, menor contexto suficiente e saída validável.' },
        { label: 'Validação', text: 'Teste caso feliz, caso ambíguo e caso de falha. Falha previsível deve virar mensagem, fallback ou bloqueio.' },
        { label: 'Evidência', text: 'Registre resultado, custo, fonte, tradeoff e razão para rejeitar alternativas.' }
      ],
      operatingPrinciples: [
        lens.principle,
        'Não confunda capacidade do modelo com responsabilidade da aplicação. Modelo propõe ou seleciona; aplicação valida, executa, registra e controla permissões.',
        'Quando houver ferramenta, busca, arquivo, API ou automação, trate a fronteira como uma interface de segurança: entrada validada, saída tipada, erro esperado e escopo mínimo.',
        'Quando houver contexto longo, prefira seleção, resumo, cache ou recuperação controlada em vez de despejar tudo no prompt.',
        'Toda decisão deve deixar rastro: qual fonte sustentou a resposta, qual teste foi usado e qual risco residual permaneceu.'
      ],
      examSignals: [
        'Se o enunciado enfatiza previsibilidade, procure schema, validação, eval ou contrato explícito.',
        'Se o enunciado enfatiza integração externa, compare tool use, MCP server, resource, prompt template e API tradicional.',
        'Se o enunciado enfatiza conhecimento atualizado ou documentos, pense em RAG, citações, search results, chunking e provenance.',
        'Se o enunciado enfatiza automação de desenvolvimento, procure contexto de repo, hooks, commands, permissões, testes e diff pequeno.',
        'Se o enunciado enfatiza risco, descarte alternativas que dão autonomia ampla sem allowlist, aprovação, auditoria ou fallback.'
      ],
      labProtocol: [
        'Reescreva a aula em uma frase técnica e uma frase simples. Se não conseguir, o conceito ainda está superficial.',
        'Desenhe o fluxo em seis caixas: entrada, classificação, contrato, execução, validação e evidência.',
        'Crie um exemplo prático com dados fictícios e sem informação sensível.',
        'Force uma falha: schema inválido, tool indisponível, documento irrelevante, contexto conflitante ou permissão negada.',
        'Escreva uma questão de prova com quatro alternativas e explique por que três estão erradas.',
        'Registre no `study-log.md` o que você errou, qual fonte corrigiu o erro e qual regra você vai lembrar.'
      ],
      chart: getFocusChart(lesson, lens),
      comparison: [
        { title: 'Boa resposta', text: 'Delimita escopo, escolhe o mecanismo correto, define contrato, valida resultado e cita evidência.' },
        { title: 'Resposta fraca', text: 'Usa solução genérica como "melhorar o prompt" quando o caso exige tool, schema, MCP, RAG, cache, hook ou eval.' },
        { title: 'Resposta perigosa', text: 'Dá ao modelo permissão ampla para agir, ler, escrever, deletar, chamar API ou confiar em contexto externo sem validação.' },
        { title: 'Resposta de especialista', text: 'Reconhece tradeoffs: qualidade vs custo, contexto vs latência, autonomia vs controle, cobertura vs manutenção.' }
      ],
      sources: getSourcesForLesson(lesson, lens)
    };
  }

  function getTopicLens(lesson) {
    var text = (lesson.title + ' ' + lesson.objective + ' ' + lesson.technical).toLowerCase();
    var lenses = [
      {
        match: /rag|retrieval|chunk|embedding|bm25|index|search|cita|pdf|web/,
        key: 'rag',
        shortName: 'recuperação e grounding',
        principle: 'RAG não é "colocar documentos no prompt"; é um pipeline com seleção, chunking, busca, re-ranking, contexto, resposta e provenance.',
        deepExplanation: 'Para RAG e busca agentic, a densidade vem de entender o pipeline inteiro. Chunk pequeno demais perde semântica; chunk grande demais aumenta ruído. Embedding melhora semântica, BM25 preserva correspondência lexical, multi-index combina sinais, e citações ajudam a separar resposta fundamentada de resposta apenas plausível. A prova costuma cobrar quando recuperar informação externa, como reduzir alucinação e por que provenance não é opcional em tarefas de conhecimento.'
      },
      {
        match: /mcp|tool|tools|resource|resources|prompt|server|client|inspector|schema/,
        key: 'tools',
        shortName: 'tools, MCP e contratos',
        principle: 'Tool ou MCP deve ser tratado como interface de sistema: nome claro, descrição acionável, schema restrito, permissão mínima e resultado verificável.',
        deepExplanation: 'Em tool use e MCP, o ponto profundo é a separação de responsabilidades. O modelo escolhe ou solicita uma ação; o cliente ou servidor executa conforme contrato. Tools executam ações, resources expõem contexto controlado e prompts empacotam workflows reutilizáveis. A diferença importa porque trocar uma primitiva por outra muda risco, auditabilidade, UX e superfície de ataque.'
      },
      {
        match: /prompt|xml|system|temperature|examples|clear|specific/,
        key: 'prompt',
        shortName: 'engenharia de prompt',
        principle: 'Prompt engineering forte começa por critério de sucesso, não por frase bonita: objetivo, contexto, formato, exemplos, restrições e avaliação.',
        deepExplanation: 'Prompts bons reduzem ambiguidade operacional. Clareza e especificidade dizem ao modelo qual tarefa resolver; exemplos calibram formato e nível de detalhe; tags XML organizam fronteiras; system prompts mantêm comportamento persistente; temperatura altera variabilidade. A prova tende a punir prompts vagos quando o cenário exige saída controlada, avaliação ou decomposição.'
      },
      {
        match: /eval|grading|dataset|test|assessment|quiz|satisfaction/,
        key: 'evals',
        shortName: 'avaliação e medição',
        principle: 'Eval é o mecanismo que transforma gosto subjetivo em evidência comparável: dataset, rubrica, métrica, baseline e análise de erro.',
        deepExplanation: 'Avaliar IA exige separar exemplo de teste. Um prompt que parece bom em três casos pode falhar em bordas. Evals model-based ajudam a escalar julgamento sem substituir auditoria; evals code-based verificam contratos objetivos; datasets sintéticos aumentam cobertura, mas precisam representar riscos reais. A prova costuma cobrar quando melhorar prompt não basta e é preciso medir regressão.'
      },
      {
        match: /structured|json|schema|output|strict/,
        key: 'structured',
        shortName: 'saída estruturada',
        principle: 'Saída estruturada é contrato entre modelo e software; se outro sistema vai consumir a resposta, texto livre é risco.',
        deepExplanation: 'Structured output reduz custo de parsing, torna falhas detectáveis e permite integração com sistemas. JSON válido não basta: o schema precisa representar obrigatoriedade, tipos, enumerações, limites e erros. Em workflows agentic, isso impede que uma resposta eloquente mas inválida avance para uma ação downstream.'
      },
      {
        match: /cache|caching|cost|token|context window/,
        key: 'cost',
        shortName: 'custo, contexto e cache',
        principle: 'Contexto é orçamento. Prompt caching, compactação e seleção de contexto são decisões arquiteturais, não otimizações cosméticas.',
        deepExplanation: 'Janelas longas permitem tarefas ricas, mas aumentam custo, latência e risco de ruído. Prompt caching favorece prefixos estáveis; cache quebrado consome mais; compactação precisa preservar decisões e descartar ruído. A prova pode perguntar quando usar cache, quando resumir, quando recuperar e quando escolher modelo mais barato.'
      },
      {
        match: /code|hook|hooks|sdk|github|command|commands|context|setup|changes/,
        key: 'code',
        shortName: 'Claude Code e engenharia de software',
        principle: 'Claude Code deve trabalhar como engenheiro disciplinado: ler antes de editar, preservar trabalho existente, testar, revisar diff e automatizar guardrails com hooks ou commands.',
        deepExplanation: 'A profundidade em Claude Code está no ciclo de engenharia. Contexto de projeto orienta decisões; commands padronizam tarefas; hooks impõem validação; SDK permite compor agentes; MCP adiciona integrações. A prova tende a cobrar segurança operacional: permissões, escopo pequeno, testes, git limpo e revisão.'
      },
      {
        match: /security|seguran|risk|qa|guardrail|threat|permission|safe|leak/,
        key: 'security',
        shortName: 'segurança e governança',
        principle: 'Sistemas agentic devem ser desenhados como sistemas com privilégio: ameaça, permissão, observação, isolamento, aprovação e resposta a incidente.',
        deepExplanation: 'Prompt injection, vazamento de dados, tool misuse, excesso de autonomia e consumo ilimitado são riscos de arquitetura. Guardrail real não é só instrução no prompt; é controle de capacidade, allowlist, sandbox, validação de output, revisão humana e logging. A prova costuma favorecer alternativas que reduzem blast radius mesmo que pareçam menos automáticas.'
      }
    ];
    for (var i = 0; i < lenses.length; i++) {
      if (lenses[i].match.test(text)) return lenses[i];
    }
    return {
      key: 'agentic',
      shortName: 'arquitetura agentic',
      principle: 'Arquitetura agentic combina objetivo, planejamento, ferramentas, memória, feedback e controle de risco em um loop observável.',
      deepExplanation: 'O estudo profundo de agentes vem de enxergar o loop completo. O sistema recebe objetivo, seleciona contexto, escolhe a próxima ação, observa resultado, atualiza estado e decide se continua, para ou escala. Quanto mais autonomia, maior deve ser a disciplina de contrato, permissão, validação e auditoria.'
    };
  }

  function getModuleFrame(moduleId) {
    var frames = {
      start: { artifact: 'plano de estudo, diagnóstico, matriz de lacunas e registro de revisão' },
      skills: { artifact: 'Skill versionada com trigger, escopo, workflow, exemplos e referências sob demanda' },
      api: { artifact: 'request de API, system prompt, schema, tool definition, eval ou pipeline RAG' },
      mcp: { artifact: 'servidor MCP com tools, resources, prompts, schemas e inspector validado' },
      code: { artifact: 'patch pequeno, teste reproduzível, hook, command, permissão e diff revisável' },
      practice: { artifact: 'simulado comentado, rubrica, análise de erro e plano de revisão' },
      security: { artifact: 'threat model, matriz de risco, checklist QA, logs e critérios de aceite' }
    };
    return frames[moduleId] || frames.api;
  }

  function getFocusChart(lesson, lens) {
    var values = {
      start: { Contexto: 72, Contrato: 64, Ferramentas: 40, Validacao: 86, Risco: 58 },
      skills: { Contexto: 78, Contrato: 72, Ferramentas: 48, Validacao: 62, Risco: 55 },
      api: { Contexto: 70, Contrato: 82, Ferramentas: 70, Validacao: 78, Risco: 64 },
      mcp: { Contexto: 74, Contrato: 88, Ferramentas: 90, Validacao: 76, Risco: 80 },
      code: { Contexto: 84, Contrato: 68, Ferramentas: 82, Validacao: 86, Risco: 78 },
      practice: { Contexto: 60, Contrato: 68, Ferramentas: 46, Validacao: 94, Risco: 66 },
      security: { Contexto: 70, Contrato: 80, Ferramentas: 76, Validacao: 92, Risco: 96 }
    }[lesson.module] || { Contexto: 62, Contrato: 64, Ferramentas: 50, Validacao: 72, Risco: 58 };
    if (lens.key === 'rag') values = { Contexto: 92, Contrato: 76, Ferramentas: 74, Validacao: 88, Risco: 72 };
    if (lens.key === 'cost') values = { Contexto: 90, Contrato: 70, Ferramentas: 58, Validacao: 74, Risco: 82 };
    if (lens.key === 'prompt') values = { Contexto: 84, Contrato: 76, Ferramentas: 42, Validacao: 78, Risco: 58 };
    return [
      { label: 'Contexto', value: values.Contexto },
      { label: 'Contrato', value: values.Contrato },
      { label: 'Ferramentas', value: values.Ferramentas },
      { label: 'Validação', value: values.Validacao },
      { label: 'Risco', value: values.Risco }
    ];
  }

  function getSourcesForLesson(lesson, lens) {
    var sourceBank = {
      agentic: [
        { kind: 'paper', title: 'ReAct: Synergizing Reasoning and Acting in Language Models', url: 'https://arxiv.org/abs/2210.03629', use: 'Base para loops que alternam raciocínio, ação e observação.' },
        { kind: 'docs', title: 'Claude - Tool use overview', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', use: 'Mostra como Claude solicita tools e como a aplicação executa resultados.' },
        { kind: 'repo', title: 'Anthropic courses', url: 'https://github.com/anthropics/courses', use: 'Referência pública de cursos e exercícios oficiais da Anthropic.' },
        { kind: 'repo', title: 'Anthropic Claude cookbooks', url: 'https://github.com/anthropics/claude-cookbooks', use: 'Exemplos públicos para transformar conceitos em aplicações práticas.' },
        { kind: 'framework', title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', use: 'Estrutura profissional para conectar arquitetura, risco, medição e governança.' }
      ],
      tools: [
        { kind: 'spec', title: 'MCP Specification', url: 'https://modelcontextprotocol.io/specification/2025-06-18', use: 'Define resources, prompts, tools, clients e servers.' },
        { kind: 'spec', title: 'MCP Tools', url: 'https://modelcontextprotocol.io/specification/2025-06-18/server/tools', use: 'Detalha tools como funções expostas pelo servidor MCP.' },
        { kind: 'docs', title: 'Claude - How tool use works', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works', use: 'Ajuda a entender ciclo tool_use e tool_result.' },
        { kind: 'repo', title: 'Microsoft MCP for Beginners', url: 'https://github.com/microsoft/mcp-for-beginners/', use: 'Currículo prático multi-linguagem para MCP.' }
      ],
      rag: [
        { kind: 'paper', title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', url: 'https://arxiv.org/abs/2005.11401', use: 'Base acadêmica para combinar memória paramétrica e não paramétrica.' },
        { kind: 'docs', title: 'Claude - Search results', url: 'https://platform.claude.com/docs/en/build-with-claude/search-results', use: 'Conecta recuperação com resultados rastreáveis.' },
        { kind: 'docs', title: 'Claude - Citations', url: 'https://platform.claude.com/docs/en/build-with-claude/citations', use: 'Mostra como associar resposta a evidências.' }
      ],
      prompt: [
        { kind: 'docs', title: 'Claude - Prompt engineering overview', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', use: 'Define quando prompt engineering é a alavanca correta.' },
        { kind: 'docs', title: 'Claude - Prompting best practices', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices', use: 'Base para clareza, exemplos, XML e sistemas agentic.' },
        { kind: 'repo', title: 'Anthropic prompt engineering tutorial', url: 'https://github.com/anthropics/prompt-eng-interactive-tutorial', use: 'Curso público passo a passo para engenharia de prompts.' }
      ],
      evals: [
        { kind: 'docs', title: 'Claude - Prompt engineering overview', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', use: 'Reforça que nem toda falha se resolve com prompt; algumas exigem avaliação e arquitetura.' },
        { kind: 'paper', title: 'ReAct paper', url: 'https://arxiv.org/abs/2210.03629', use: 'Exemplo de avaliação em QA, fact verification e decisão interativa.' },
        { kind: 'repo', title: 'Anthropic courses', url: 'https://github.com/anthropics/courses', use: 'Fonte para exercícios e padrões de ensino oficiais.' }
      ],
      structured: [
        { kind: 'docs', title: 'Claude - Structured outputs', url: 'https://platform.claude.com/docs/en/build-with-claude/structured-outputs', use: 'Define JSON outputs e strict tool use como contrato de integração.' },
        { kind: 'docs', title: 'Claude - Define tools', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools', use: 'Mostra como schemas e descrições orientam chamadas de tools.' },
        { kind: 'security', title: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', use: 'Relaciona validação de output a risco downstream.' }
      ],
      cost: [
        { kind: 'docs', title: 'Claude - Prompt caching', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching', use: 'Explica cache de prefixos estáveis para custo e latência.' },
        { kind: 'docs', title: 'Claude - Context windows', url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows', use: 'Base para discutir seleção e compactação de contexto.' },
        { kind: 'docs', title: 'Claude - Pricing', url: 'https://platform.claude.com/docs/en/about-claude/pricing', use: 'Referência para estimar custo de execução dos exemplos.' }
      ],
      code: [
        { kind: 'docs', title: 'Claude Code - Hooks reference', url: 'https://code.claude.com/docs/en/hooks', use: 'Base para eventos, payloads, exit codes e automação segura.' },
        { kind: 'docs', title: 'Claude Agent SDK overview', url: 'https://code.claude.com/docs/en/agent-sdk/overview', use: 'Mostra tools, hooks, subagents, MCP, permissions e sessions.' },
        { kind: 'repo', title: 'Claude Code Hooks Mastery', url: 'https://github.com/disler/claude-code-hooks-mastery', use: 'Exemplo público de lifecycle de hooks e workflows.' }
      ],
      security: [
        { kind: 'framework', title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', use: 'Base para governar, mapear, medir e gerenciar risco de IA.' },
        { kind: 'framework', title: 'NIST AI 600-1 Generative AI Profile', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence', use: 'Perfil específico para riscos de IA generativa.' },
        { kind: 'security', title: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', use: 'Lista riscos como prompt injection, output handling e excessive agency.' }
      ]
    };
    var base = sourceBank[lens.key] || sourceBank.agentic;
    if (lesson.module === 'mcp') base = sourceBank.tools;
    if (lesson.module === 'code') base = sourceBank.code;
    if (lesson.module === 'security') base = sourceBank.security;
    return base.concat(sourceBank.agentic).filter(function (item, index, arr) {
      return arr.findIndex(function (other) { return other.url === item.url; }) === index;
    }).slice(0, 5);
  }

  function getTeachingProfile(lesson, module) {
    var moduleGuidance = {
      start: {
        scope: 'método de estudo, diagnóstico e rotina de revisão',
        decision: 'seguir uma sequência de aprendizagem com feedback em vez de ler arquivos aleatoriamente',
        risk: 'estudar muito conteúdo sem medir lacunas reais',
        artifact: 'plano de estudo, study-log, simulado diagnóstico e rotina de revisão'
      },
      skills: {
        scope: 'capacidades reutilizáveis carregadas sob demanda',
        decision: 'usar Skill quando o problema é conhecimento especializado ou procedimento repetível de contexto',
        risk: 'colocar instruções demais no prompt global e consumir contexto sem necessidade',
        artifact: 'SKILL.md com descrição de acionamento, workflow, exemplos e referências opcionais'
      },
      api: {
        scope: 'construção com Claude API, prompts, tools, RAG, evals e features',
        decision: 'separar raciocínio do modelo, contrato de API, validação de saída e observabilidade',
        risk: 'tratar resposta probabilística como dado confiável sem schema, fonte ou teste',
        artifact: 'request, system prompt, schema, tool definition, eval dataset ou pipeline RAG'
      },
      mcp: {
        scope: 'integração padronizada via tools, resources e prompts',
        decision: 'escolher a primitiva correta e aplicar menor privilégio no servidor MCP',
        risk: 'expor ação ampla demais ou metadata capaz de induzir tool misuse',
        artifact: 'server MCP com capabilities versionadas, schemas claros e inspector validado'
      },
      code: {
        scope: 'uso de Claude Code em projetos reais de software',
        decision: 'explorar antes de editar, manter escopo pequeno, validar e preservar mudanças existentes',
        risk: 'executar comandos ou alterações sem entender o repositório e sem teste',
        artifact: 'patch revisável, comandos de validação, hooks, commands, SDK ou integração GitHub'
      },
      practice: {
        scope: 'treino ativo, simulados, drills e capstone',
        decision: 'medir prontidão por cenário e justificar alternativas erradas',
        risk: 'confundir reconhecimento de termo com domínio real de arquitetura',
        artifact: 'resposta comentada, análise de erro, rubrica e plano de revisão'
      },
      security: {
        scope: 'segurança, QA, UX, engenharia e desenho pedagógico',
        decision: 'transformar risco e qualidade em gates verificáveis antes de publicar',
        risk: 'declarar pronto sem crawler, threat model, revisão visual e critério de aprendizagem',
        artifact: 'matriz de risco, checklist QA, teste de links, screenshot e critérios de aceite'
      }
    };
    var guide = moduleGuidance[lesson.module] || moduleGuidance.api;
    return {
      concept: 'Nesta lição, o tema "' + lesson.title + '" deve ser entendido dentro do domínio de ' + guide.scope + '. O ponto central não é decorar uma definição curta, mas saber reconhecer quando o conceito aparece em um cenário real, quais responsabilidades pertencem ao modelo, quais pertencem ao código ou ferramenta, quais controles são obrigatórios e qual evidência prova que a solução funcionou. A explicação normal dá a intuição; a explicação técnica define os termos com precisão; o exemplo simplificado serve para memória e comunicação.',
      whyItMatters: 'Isso importa porque a certificação tende a cobrar julgamento arquitetural. Quando uma questão descreve ' + lesson.objective.toLowerCase() + ', você precisa escolher a alternativa que reduz risco, preserva contexto, mantém rastreabilidade e resolve o problema com o mecanismo correto. O erro típico é responder com uma solução genérica. A decisão mais forte aqui é ' + guide.decision + '. O risco que você deve procurar no enunciado é ' + guide.risk + '.',
      detailedSteps: [
        'Identifique o objetivo da tarefa: ' + lesson.objective,
        'Separe dado, instrução e ação. Dado deve ser tratado como contexto; instrução deve ficar explícita; ação precisa de contrato, permissão e validação.',
        'Escolha o artefato correto para o caso: ' + guide.artifact + '. Se outro artefato parecer possível, explique por que ele é mais fraco neste cenário.',
        'Aplique o passo a passo base da aula: ' + lesson.steps.join(' -> ') + '. Depois transforme cada passo em uma evidência observável.',
        'Valide a solução com um caso normal, um caso ambíguo e um caso de falha. Se a solução não falha de forma segura, ela ainda não está pronta.',
        'Registre a decisão em linguagem de prova: problema, escolha, tradeoff, controle de risco e motivo para rejeitar alternativas.'
      ],
      mistakes: [
        'Responder com prompt genérico quando o cenário exige schema, tool, hook, MCP, teste ou aprovação humana.',
        'Ignorar origem e confiança do contexto, principalmente quando vem de página web, PDF, README externo, tool result ou metadata MCP.',
        'Confundir demonstração simples com solução de produção: exemplo que funciona uma vez não prova robustez.',
        'Não definir critério de aceite. Sem critério, não há como saber se a resposta está correta ou se apenas parece convincente.',
        'Não registrar custo, risco, fonte ou limite de permissão quando a tarefa envolve execução, busca externa ou automação.'
      ],
      checklist: [
        'Consigo explicar o conceito sem copiar a definição da aula.',
        'Consigo dizer quando usar e quando não usar este mecanismo.',
        'Consigo apontar pelo menos dois riscos do uso incorreto.',
        'Consigo criar um exemplo prático e um contraexemplo.',
        'Consigo responder uma questão scenario-based justificando por que as alternativas erradas são erradas.'
      ],
      scenario: 'Imagine que um time precisa aplicar "' + lesson.title + '" em um projeto real. O usuário pede rapidez, mas também há risco de custo, vazamento de informação, resposta incorreta ou alteração indevida de estado. Você deve propor uma solução que preserve o objetivo da aula, use o artefato correto e inclua validação antes de produção.',
      expectedAnswer: 'A resposta esperada começa delimitando o escopo, escolhe ' + guide.artifact + ', aplica menor privilégio quando há ferramentas ou dados externos, define teste ou rubrica, registra fonte/evidência e cria fallback seguro. Se houver baixa confiança ou ação sensível, a decisão deve escalar para revisão humana em vez de deixar o modelo agir sozinho.'
    };
  }

  function renderResources(lesson) {
    var items = (lesson.resources || []).map(function (id) {
      var item = data.resources[id];
      if (!item) return '';
      return '<li><span>' + escapeHtml(item.type) + '</span><a href="' + item.url + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item.title) + '</a></li>';
    }).join('');
    return '<section><h3>Fontes externas</h3>' + (items ? '<ul class="resource-list">' + items + '</ul>' : '<p class="muted">Sem fonte externa mapeada ainda.</p>') + '</section>';
  }

  function renderInternalLinks(lesson) {
    var links = (lesson.links || []).map(function (link) {
      return '<li><a href="' + repoLink(link) + '">' + escapeHtml(link) + '</a></li>';
    }).join('');
    return '<section><h3>Material do repo</h3>' + (links ? '<ul class="resource-list internal">' + links + '</ul>' : '<p class="muted">Sem material interno mapeado.</p>') + '</section>';
  }

  function renderStats() {
    var completedCount = getCompletedCount(data.lessons);
    var total = data.lessons.length;
    var moduleCards = data.modules.map(function (module) {
      var lessons = data.lessons.filter(function (lesson) { return lesson.module === module.id; });
      var done = lessons.filter(function (lesson) { return state.completed[lesson.id]; }).length;
      return '<article class="stat-card" style="--accent:' + module.color + '">' +
        '<span>' + escapeHtml(module.short) + '</span>' +
        '<strong>' + done + '/' + lessons.length + '</strong>' +
        '<small>' + escapeHtml(module.description) + '</small>' +
      '</article>';
    }).join('');
    els.statsGrid.innerHTML =
      '<article class="stat-card total"><span>Total</span><strong>' + completedCount + '/' + total + '</strong><small>Aulas concluídas neste navegador</small></article>' +
      moduleCards;
  }

  function renderProgress() {
    var completedCount = getCompletedCount(data.lessons);
    var total = data.lessons.length;
    var percent = total ? Math.round((completedCount / total) * 100) : 0;
    els.progressPercent.textContent = percent + '%';
    els.progressBar.style.width = percent + '%';
    els.progressText.textContent = completedCount + ' de ' + total + ' aulas concluídas.';
  }

  function renderResourceBoard() {
    var keys = Object.keys(data.resources).filter(function (id) {
      return data.resources[id].type === 'YouTube';
    }).slice(0, 12);
    els.resourceBoard.innerHTML = keys.map(function (id) {
      var item = data.resources[id];
      return '<article class="resource-card">' +
        '<span>' + escapeHtml(item.type) + '</span>' +
        '<strong>' + escapeHtml(item.title) + '</strong>' +
        '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer">Abrir recurso</a>' +
      '</article>';
    }).join('');
  }

  function getModule(id) {
    return data.modules.find(function (module) { return module.id === id; }) || data.modules[0];
  }

  function getLessonSequence(id) {
    var lessons = data.lessons;
    var index = lessons.findIndex(function (lesson) { return lesson.id === id; });
    return {
      prev: index > 0 ? lessons[index - 1] : null,
      next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null
    };
  }

  function getLessonResourceText(lesson) {
    return [...(lesson.resources || []), ...(lesson.videos || [])].map(function (id) {
      var item = data.resources[id];
      return item ? [item.type, item.title, item.url].join(' ') : id;
    }).join(' ');
  }

  function getCompletedCount(lessons) {
    return lessons.filter(function (lesson) { return state.completed[lesson.id]; }).length;
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem('ccaf-academy-progress') || '{}');
    } catch (error) {
      return {};
    }
  }

  function saveProgress() {
    localStorage.setItem('ccaf-academy-progress', JSON.stringify(state.completed));
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function repoLink(link) {
    if (/^https?:\/\//.test(link)) return link;
    return 'docsify.html#/' + String(link || '').replace(/^\/+/, '');
  }

  function pad(number) {
    return String(number).padStart(2, '0');
  }
})();
