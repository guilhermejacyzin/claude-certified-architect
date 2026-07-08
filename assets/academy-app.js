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
      if (id && data.lessons.some(function (lesson) { return lesson.id === id; })) {
        state.activeLessonId = id;
        render();
      }
    });
  }

  function renderModules() {
    var all = '<button class="module-button active" data-module="all" type="button"><span>Todos</span><small>Grade completa</small></button>';
    var moduleButtons = data.modules.map(function (module) {
      return '<button class="module-button" data-module="' + module.id + '" type="button" style="--accent:' + module.color + '">' +
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
      '<div class="lesson-tabs">' +
        '<section>' +
          '<h3>Explicação normal</h3>' +
          '<p>' + escapeHtml(lesson.normal) + '</p>' +
        '</section>' +
        '<section>' +
          '<h3>Explicação técnica</h3>' +
          '<p>' + escapeHtml(lesson.technical) + '</p>' +
        '</section>' +
        '<section>' +
          '<h3>Exemplo simplificado</h3>' +
          '<p>' + escapeHtml(lesson.simple) + '</p>' +
        '</section>' +
      '</div>' +
      '<div class="lesson-work">' +
        '<section>' +
          '<h3>Passo a passo</h3>' +
          '<ol>' + steps + '</ol>' +
        '</section>' +
        '<section>' +
          '<h3>Prática guiada</h3>' +
          '<p>' + escapeHtml(lesson.practice) + '</p>' +
          '<h3>Como cai em prova</h3>' +
          '<p>' + escapeHtml(lesson.exam) + '</p>' +
        '</section>' +
      '</div>' +
      videos +
      '<div class="resource-columns">' + resources + links + '</div>' +
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
