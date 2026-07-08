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
          '<div class="section-body"><p>' + escapeHtml(lesson.technical) + '</p></div>' +
        '</details>' +
        renderDeepDive(lesson, module) +
        '<details class="lesson-section">' +
          '<summary><span>04</span><strong>Vídeos, fontes e material do repo</strong><small>Use como reforço depois de entender a aula.</small></summary>' +
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
