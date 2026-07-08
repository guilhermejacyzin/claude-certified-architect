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
          (profile.manualTitle ? '<p class="manual-density-note">' + escapeHtml(profile.manualTitle) + '</p>' : '') +
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
    var criticalPack = getCriticalLessonPack(lesson);
    if (criticalPack) return criticalPack;
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

  function getCriticalLessonPack(lesson) {
    var key = getCriticalLessonKey(lesson);
    var packs = {
      rag: {
        manualTitle: 'Aprofundamento manual critico: RAG, busca, chunking, embeddings, multi-index e grounding com fontes.',
        thesis: [
          'RAG deve ser estudado como uma cadeia de evidencias, nao como um truque para colocar documentos no prompt. O modelo nao passa a saber magicamente o conteudo de uma base; a aplicacao seleciona evidencias, monta um contexto pequeno o suficiente para ser util e grande o suficiente para preservar significado, e entao pede ao Claude uma resposta fundamentada. A pergunta de arquitetura e: qual dado precisa ser recuperado, com qual criterio, com qual permissao, com qual ranking e com qual prova de origem?',
          'O pipeline completo tem duas metades. Na ingestao, documentos sao limpos, divididos em chunks, enriquecidos com metadados, embutidos em vetores e, muitas vezes, indexados tambem por busca lexical. Na consulta, a pergunta e reescrita ou expandida, a busca combina embeddings com BM25 quando necessario, um re-ranker reduz ruido, o montador de contexto ordena evidencias e o prompt exige resposta com limites, citacoes e declaracao de incerteza. Se qualquer etapa for rasa, o modelo pode receber contexto irrelevante e responder com confianca falsa.',
          'Os erros mais importantes sao de sistema, nao de frase. Chunk pequeno demais quebra a explicacao; chunk grande demais dilui a evidencia; indice sem ACL vaza documento; embedding fora do dominio perde sinonimos tecnicos; pergunta ambigua recupera qualquer coisa; citacao sem verificacao vira teatro de confiabilidade. Em prova, RAG quase sempre aparece quando conhecimento atualizado, documentos internos, auditabilidade ou reducao de alucinacao importam, mas a alternativa correta tambem precisa citar validacao, permissao e fallback.',
          'Exemplo simplificado: imagine uma biblioteca enorme. RAG nao e pedir para alguem decorar todos os livros antes de responder. E pedir para um bibliotecario encontrar as paginas certas, marcar de onde tirou cada trecho, entregar so o necessario para responder e avisar quando a pagina nao prova a conclusao. Se a pagina errada chega ao leitor, a resposta final tambem fica errada mesmo que o leitor seja excelente.'
        ],
        flow: [
          { label: 'Ingestao confiavel', text: 'Normalizar documentos, remover duplicatas, preservar origem, classificar confidencialidade e registrar versao do conteudo.' },
          { label: 'Chunking com semantica', text: 'Dividir por estrutura real, como titulos, secoes, tabelas e blocos logicos, evitando cortar definicoes no meio.' },
          { label: 'Indexacao hibrida', text: 'Combinar embeddings para significado e BM25 para termos exatos, codigos, siglas, nomes de APIs e vocabulario de prova.' },
          { label: 'Recuperacao e ranking', text: 'Buscar candidatos, filtrar por permissao, reordenar por relevancia e descartar evidencias redundantes ou fracas.' },
          { label: 'Resposta grounded', text: 'Montar contexto com fontes, pedir resposta limitada as evidencias e separar conclusao, incerteza e proximos passos.' },
          { label: 'Avaliacao continua', text: 'Medir recall, precision, faithfulness, cobertura de citacoes, custo, latencia e casos em que o sistema deveria dizer que nao sabe.' }
        ],
        operatingPrinciples: [
          'RAG aumenta acesso a conhecimento, mas nao substitui controle de permissao, validacao de fonte ou avaliacao de resposta.',
          'A unidade de recuperacao deve ser desenhada para a pergunta real: FAQ, contrato, codigo, tabela, log e paper exigem chunking diferente.',
          'Busca vetorial e lexical resolvem problemas diferentes; sistemas maduros combinam sinais em vez de apostar em um unico indice.',
          'Citations e search results ajudam auditoria, mas so sao uteis quando a resposta realmente depende dos trechos citados.',
          'Prompt injection em documento recuperado deve ser tratado como entrada hostil: conteudo buscado informa a resposta, mas nao deve redefinir regras do sistema.'
        ],
        examSignals: [
          'Se a questao fala em documentos internos, conhecimento atualizado ou respostas verificaveis, pense em RAG com provenance.',
          'Se aparecem siglas, codigos, nomes de produto ou identificadores exatos, BM25 ou busca hibrida costuma superar vetor puro.',
          'Se o usuario nao deveria ver certos documentos, a permissao deve ser aplicada antes da recuperacao e antes da resposta.',
          'Se a resposta precisa citar fonte, procure alternativa que preserva metadados, nao apenas a que aumenta contexto.',
          'Se o problema e qualidade de recuperacao, melhorar o system prompt sozinho geralmente e insuficiente.'
        ],
        labProtocol: [
          'Monte um corpus ficticio com dez documentos: politicas, FAQ, contrato, nota tecnica e changelog, todos com fonte e data.',
          'Crie tres estrategias de chunking e compare qual recupera melhor perguntas que dependem de definicao, excecao e tabela.',
          'Execute busca lexical, vetorial e hibrida para a mesma pergunta; registre quando cada uma falha.',
          'Force um documento com instrucao maliciosa dentro do texto e confirme que ele nao altera o comportamento do sistema.',
          'Exija resposta com citacoes e marque manualmente quais frases realmente foram sustentadas por fonte.',
          'Transforme os erros em um mini eval: pergunta, resposta esperada, documentos corretos, documentos distratores e criterio de aceitacao.'
        ],
        chart: [
          { label: 'Contexto', value: 96 },
          { label: 'Contrato', value: 82 },
          { label: 'Ferramentas', value: 78 },
          { label: 'Validacao', value: 94 },
          { label: 'Risco', value: 86 }
        ],
        comparison: [
          { title: 'Prompt longo', text: 'Serve para pouco material estatico; piora custo, ruido e manutencao quando documentos mudam.' },
          { title: 'RAG simples', text: 'Recupera trechos por similaridade, mas pode falhar em termos exatos, permissoes e citacoes fracas.' },
          { title: 'RAG hibrido', text: 'Combina vetor, lexical, metadados e re-ranking para equilibrar significado, precisao e auditabilidade.' },
          { title: 'Agentic search', text: 'Permite decompor perguntas, iterar buscas e comparar fontes, mas aumenta custo, latencia e necessidade de guardrails.' }
        ],
        sources: [
          { kind: 'paper', title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', url: 'https://arxiv.org/abs/2005.11401', use: 'Base academica para combinar geracao com recuperacao externa.' },
          { kind: 'docs', title: 'Claude - Search results', url: 'https://platform.claude.com/docs/en/build-with-claude/search-results', use: 'Referencia de como tratar resultados rastreaveis em respostas.' },
          { kind: 'docs', title: 'Claude - Citations', url: 'https://platform.claude.com/docs/en/build-with-claude/citations', use: 'Referencia para associar afirmacoes a evidencias.' },
          { kind: 'repo', title: 'Anthropic Claude cookbooks', url: 'https://github.com/anthropics/claude-cookbooks', use: 'Exemplos publicos para transformar RAG em aplicacao pratica.' },
          { kind: 'security', title: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', use: 'Base para riscos como prompt injection, vazamento e excessive agency.' }
        ]
      },
      mcp: {
        manualTitle: 'Aprofundamento manual critico: MCP tools, resources, prompts, clients, servers e inspector.',
        thesis: [
          'MCP e uma arquitetura de integracao padronizada. A ideia central e separar o cliente que conversa com o modelo, o servidor que expoe capacidades externas e as primitivas que descrevem o que pode ser usado. Tools representam acoes chamaveis, resources representam contexto ou dados consultaveis, e prompts representam workflows ou templates reutilizaveis. O ganho arquitetural nao e so conveniencia: e criar contratos explicitos entre IA, aplicacao e servicos externos.',
          'A decisao mais importante e escolher a primitiva correta. Se o modelo precisa executar uma consulta, calcular algo, chamar uma API ou alterar estado, pense em tool. Se precisa ler um documento, schema, configuracao, pagina ou contexto controlado, pense em resource. Se precisa repetir um roteiro de trabalho com parametros e instrucoes, pense em prompt. Misturar tudo em uma unica tool gigante aumenta ambiguidade, dificulta permissao e cria superficie de ataque maior.',
          'O MCP tambem introduz um modelo operacional: discovery de capacidades, schemas descritivos, chamada controlada, resposta estruturada, erros previsiveis, inspector para depuracao e governanca de quais servidores podem ser conectados. Em prova, a alternativa correta costuma preservar separacao cliente-servidor e evitar que o modelo tenha acesso amplo a filesystem, contas ou APIs sem allowlist, escopo e revisao.',
          'Exemplo simplificado: MCP e como montar uma bancada de trabalho para o Claude. As tools sao os equipamentos que fazem algo, como medir ou cortar; resources sao os manuais e pecas disponiveis para consulta; prompts sao receitas de procedimento. Um bom arquiteto nao entrega a chave de todo o predio: entrega a bancada certa, com ferramentas nomeadas e regras de uso.'
        ],
        flow: [
          { label: 'Descobrir necessidade', text: 'Definir se o caso exige acao, leitura de contexto ou roteiro reutilizavel.' },
          { label: 'Escolher primitiva', text: 'Mapear para tool, resource ou prompt, mantendo cada contrato pequeno e especifico.' },
          { label: 'Definir schema', text: 'Criar nome, descricao, parametros obrigatorios, tipos e mensagens de erro que ajudem o modelo a escolher corretamente.' },
          { label: 'Controlar permissao', text: 'Aplicar allowlist, escopo minimo, dados ficticios nos exemplos e bloqueio de operacoes sensiveis.' },
          { label: 'Testar no inspector', text: 'Validar discovery, payload, resposta, erro, logs e experiencia de uso antes de conectar em fluxo real.' },
          { label: 'Operar com observabilidade', text: 'Registrar chamadas, latencia, falhas, versao do servidor, risco residual e criterios de rollback.' }
        ],
        operatingPrinciples: [
          'Tools fazem operacoes; resources expõem contexto; prompts empacotam workflows. Essa distincao costuma decidir questoes de prova.',
          'Um servidor MCP deve expor capacidades estreitas, explicitas e testaveis, nao um atalho irrestrito para sistema operacional ou conta corporativa.',
          'Descricao de tool e parte do contrato: deve explicar quando usar, quando nao usar, parametros e formato de retorno.',
          'Inspector e parte do ciclo de engenharia, porque revela erros de schema, mensagens confusas e comportamento inesperado antes da integracao.',
          'Seguranca em MCP exige tratar nomes, descricoes e resultados como superficie de prompt injection e tool poisoning.'
        ],
        examSignals: [
          'Se a pergunta contrasta tool, resource e prompt, escolha pela responsabilidade da primitiva, nao pelo nome mais familiar.',
          'Se o caso pede compartilhar contexto sem executar acao, resource geralmente e melhor que tool.',
          'Se o caso pede workflow repetivel com parametros, prompt MCP pode ser mais adequado que system prompt global.',
          'Se o servidor acessa dados sensiveis, a resposta correta inclui escopo, permissao, logging e validacao.',
          'Se o problema e depurar integracao MCP, procure inspector, schemas e teste de cliente-servidor.'
        ],
        labProtocol: [
          'Desenhe um servidor MCP ficticio para uma base de estudos: uma tool de busca, um resource de syllabus e um prompt de revisao.',
          'Escreva os schemas de entrada com campos obrigatorios, exemplos validos e erros esperados.',
          'Simule uma chamada correta, uma chamada com parametro faltante e uma chamada que tenta acessar dado fora do escopo.',
          'Valide se a descricao da tool permitiria ao modelo escolher a capacidade certa sem adivinhar.',
          'Liste quais logs seriam guardados para auditoria sem gravar segredo, token ou dado interno sensivel.',
          'Compare o desenho com uma API REST direta e explique quando MCP adiciona valor real.'
        ],
        chart: [
          { label: 'Contexto', value: 86 },
          { label: 'Contrato', value: 96 },
          { label: 'Ferramentas', value: 96 },
          { label: 'Validacao', value: 88 },
          { label: 'Risco', value: 92 }
        ],
        comparison: [
          { title: 'Tool MCP', text: 'Melhor quando o modelo precisa solicitar uma acao ou consulta parametrizada com resultado controlado.' },
          { title: 'Resource MCP', text: 'Melhor quando o modelo precisa receber contexto governado, versionado ou selecionavel.' },
          { title: 'Prompt MCP', text: 'Melhor quando o time quer distribuir um roteiro padronizado com parametros e instrucoes reutilizaveis.' },
          { title: 'API direta', text: 'Melhor quando nao ha necessidade de discovery por modelo ou integracao padronizada com clientes MCP.' }
        ],
        sources: [
          { kind: 'spec', title: 'MCP Specification', url: 'https://modelcontextprotocol.io/specification/2025-06-18', use: 'Contrato oficial das primitivas e do modelo cliente-servidor.' },
          { kind: 'spec', title: 'MCP Tools', url: 'https://modelcontextprotocol.io/specification/2025-06-18/server/tools', use: 'Detalhe de tools, schemas e chamadas pelo protocolo.' },
          { kind: 'docs', title: 'MCP introduction', url: 'https://modelcontextprotocol.io/docs/getting-started/intro', use: 'Visao geral atual do protocolo e seus componentes.' },
          { kind: 'news', title: 'Anthropic - Model Context Protocol', url: 'https://www.anthropic.com/news/model-context-protocol', use: 'Contexto profissional de por que o padrao foi criado.' },
          { kind: 'repo', title: 'Microsoft MCP for Beginners', url: 'https://github.com/microsoft/mcp-for-beginners/', use: 'Trilha pratica publica para fixar servidor, cliente e ferramentas.' }
        ]
      },
      toolUse: {
        manualTitle: 'Aprofundamento manual critico: tool use, schemas, tool_result, erros, loops multi-turn e multiplas tools.',
        thesis: [
          'Tool use com Claude e o ponto em que linguagem encontra software. O modelo nao executa a tool diretamente; ele solicita uma chamada com nome e argumentos, a aplicacao decide executar, devolve um tool_result e o modelo continua com base na observacao. Essa separacao e essencial: o modelo raciocina e escolhe, mas o sistema valida, autoriza, executa, registra e trata erro.',
          'Um design bom de tool reduz ambiguidade. Nome deve ser especifico, descricao deve dizer quando usar e quando nao usar, input_schema deve restringir tipos, obrigatoriedade e formato, e a resposta deve ser pequena, estruturada e util para o proximo passo. Tools genericas como execute_anything parecem poderosas, mas quebram previsibilidade e aumentam risco. Em prova, o melhor design costuma ser estreito, testavel e com erro explicito.',
          'Loops multi-turn exigem estado claro. Depois de uma tool, o modelo pode precisar chamar outra, pedir informacao ao usuario, fazer retry com parametro corrigido ou encerrar. A aplicacao precisa evitar loops infinitos, impor limites de custo, diferenciar erro recuperavel de erro terminal e impedir que resultado de tool vire instrucao de sistema. Fine-grained tool streaming e multiplas tools aumentam UX e desempenho, mas tambem exigem mais observabilidade.',
          'Exemplo simplificado: uma tool e como um formulario que o Claude preenche para pedir uma acao. Se o formulario pergunta exatamente o que precisa, com campos obrigatorios e regras claras, o sistema consegue trabalhar. Se o formulario aceita qualquer frase solta, alguem precisa adivinhar o que foi pedido, e adivinhacao em software vira erro.'
        ],
        flow: [
          { label: 'Descrever capacidade', text: 'Escrever nome e descricao que deixem claro objetivo, limites e momento correto de uso.' },
          { label: 'Definir schema', text: 'Restringir argumentos com tipos, obrigatorios, enums, formatos e descricoes orientadas a decisao.' },
          { label: 'Receber tool_use', text: 'Validar nome, argumentos, permissao, custo e estado antes de executar qualquer chamada real.' },
          { label: 'Executar fora do modelo', text: 'Chamar API, banco ou funcao em ambiente controlado, com timeout, logs e tratamento de excecoes.' },
          { label: 'Enviar tool_result', text: 'Devolver resultado pequeno, estruturado, sem segredo e com erro recuperavel quando possivel.' },
          { label: 'Concluir ou iterar', text: 'Permitir proxima tool somente se houver criterio, limite de turnos e observabilidade suficiente.' }
        ],
        operatingPrinciples: [
          'A tool deve expressar uma intencao de negocio ou tecnica, nao uma permissao ampla para executar comandos arbitrarios.',
          'Schema fraco empurra validacao para o modelo; schema forte deixa erro detectavel pelo sistema.',
          'Tool_result e dado externo, nao autoridade hierarquica. Ele nao deve sobrescrever system prompt ou politicas.',
          'Erros de tool devem ser desenhados como parte normal do fluxo: parametro invalido, timeout, permissao negada e recurso indisponivel.',
          'Multiplas tools exigem limite de custo, limite de turnos, politica de paralelismo e criterio de parada.'
        ],
        examSignals: [
          'Se a resposta precisa consultar API ou executar acao, tool use e mais apropriado que pedir para o modelo inventar resultado.',
          'Se a questao fala em parametros malformados, schema e validacao sao a resposta central.',
          'Se aparece mudanca de estado, procure aprovacao, idempotencia, logging e permissao antes da execucao.',
          'Se ha varias tools, a resposta correta limita ordem, dependencias, retry e parada.',
          'Se uma tool retorna conteudo hostil, o sistema deve tratar como dado e nao como nova instrucao.'
        ],
        labProtocol: [
          'Crie tres tools ficticias: consultar_pedido, calcular_reembolso e abrir_chamado, cada uma com schema estreito.',
          'Escreva exemplos de tool_use correto e incorreto para cada uma.',
          'Defina tool_result de sucesso, erro recuperavel e erro terminal sem expor dados sensiveis.',
          'Simule um fluxo multi-turn em que Claude consulta pedido antes de decidir se pode abrir chamado.',
          'Adicione limite de duas chamadas por resposta e explique quando escalar para humano.',
          'Crie um eval com casos de escolha correta de tool, parametro ausente, permissao negada e tool desnecessaria.'
        ],
        chart: [
          { label: 'Contexto', value: 78 },
          { label: 'Contrato', value: 96 },
          { label: 'Ferramentas', value: 98 },
          { label: 'Validacao', value: 92 },
          { label: 'Risco', value: 88 }
        ],
        comparison: [
          { title: 'Resposta sem tool', text: 'Boa para explicacao geral, ruim quando o resultado depende de estado externo ou dado atualizado.' },
          { title: 'Tool estreita', text: 'Melhor para producao, porque limita parametros, permissao, erro e observabilidade.' },
          { title: 'Tool ampla', text: 'Parece flexivel, mas torna comportamento imprevisivel e aumenta impacto de prompt injection.' },
          { title: 'MCP server', text: 'Melhor quando varias capacidades precisam ser expostas de forma padronizada para clientes diferentes.' }
        ],
        sources: [
          { kind: 'docs', title: 'Claude - Tool use overview', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', use: 'Base oficial do ciclo de uso de ferramentas.' },
          { kind: 'docs', title: 'Claude - How tool use works', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works', use: 'Detalha tool_use, tool_result e conversa multi-turn.' },
          { kind: 'docs', title: 'Claude - Define tools', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools', use: 'Referencia para nome, descricao e input_schema.' },
          { kind: 'paper', title: 'ReAct: Synergizing Reasoning and Acting in Language Models', url: 'https://arxiv.org/abs/2210.03629', use: 'Base conceitual para alternar acao e observacao.' },
          { kind: 'security', title: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', use: 'Riscos de agencia excessiva, output handling e tool misuse.' }
        ]
      },
      structured: {
        manualTitle: 'Aprofundamento manual critico: structured outputs, JSON Schema, strict tool use e validacao downstream.',
        thesis: [
          'Structured output transforma resposta de IA em contrato de software. Quando outro sistema vai consumir a saida, texto livre e uma interface instavel: pode mudar ordem, omitir campo, trocar tipo ou misturar explicacao com dado. JSON Schema, output estruturado e strict tool use reduzem essa variabilidade e tornam falhas detectaveis antes que avancem para banco, API, relatorio ou automacao.',
          'A arquitetura correta separa formato de verdade. Um JSON valido ainda pode conter conteudo errado; por isso structured output resolve parseabilidade e conformidade de campos, mas precisa ser combinado com validacao semantica, regras de negocio, evals e tratamento de incerteza. A decisao de prova costuma ser: se a saida sera processada por maquina, schema e obrigatorio; se a saida tambem precisa estar correta, avalie evidencias e regras.',
          'Schemas bons sao especificos sem virar armadilha. Campos obrigatorios devem refletir necessidades reais; enums reduzem variacao; arrays precisam de limites conceituais; descriptions ensinam significado; additionalProperties false reduz lixo inesperado; e o codigo deve validar novamente restricoes que o provedor ou SDK nao garante nativamente. Mudancas de schema tambem afetam cache, latencia inicial e compatibilidade downstream.',
          'Exemplo simplificado: pedir JSON ao modelo sem schema e como pedir para alguem preencher uma planilha dizendo "coloque bonitinho". Structured output e entregar a planilha com colunas, tipos e campos obrigatorios. Ainda e preciso conferir se o conteudo faz sentido, mas pelo menos o arquivo abre e pode ser lido por outro sistema.'
        ],
        flow: [
          { label: 'Identificar consumidor', text: 'Definir quem vai ler a saida: pessoa, API, banco, automacao, dashboard ou avaliador.' },
          { label: 'Modelar schema', text: 'Criar objeto minimo com required, tipos, enums, arrays, descriptions e campos de incerteza quando necessario.' },
          { label: 'Configurar request', text: 'Usar JSON outputs ou strict tool use conforme o contrato seja resposta final, parametros de tool ou ambos.' },
          { label: 'Validar no codigo', text: 'Conferir parse, schema original, regras de negocio, limites e consistencia entre campos.' },
          { label: 'Tratar falha', text: 'Definir retry, fallback, mensagem ao usuario, log e bloqueio quando o dado nao for confiavel.' },
          { label: 'Versionar contrato', text: 'Registrar versao de schema, compatibilidade e exemplos para evitar quebrar consumidores.' }
        ],
        operatingPrinciples: [
          'Structured output controla formato, nao garante verdade factual sozinho.',
          'Strict tool use valida parametros de tool; JSON outputs valida formato da resposta final.',
          'Schema deve ser pequeno, claro e versionado; schema grande demais aumenta manutencao e chance de incompatibilidade.',
          'Validacao downstream continua obrigatoria, principalmente para dinheiro, seguranca, identidade, compliance e operacoes irreversiveis.',
          'Mudanca de schema pode afetar cache, latencia inicial e consumidores; trate como mudanca de API.'
        ],
        examSignals: [
          'Se a questao fala em parse error, campo ausente ou tipo inconsistente, structured output e a pista principal.',
          'Se o problema e parametro de tool invalido, strict tool use e mais direto que prompt melhor.',
          'Se o JSON e valido mas o conteudo e falso, a resposta deve adicionar fonte, regra, eval ou validacao semantica.',
          'Se outro sistema consome a saida, texto livre e alternativa fraca.',
          'Se o caso exige evolucao, procure versao de schema e compatibilidade.'
        ],
        labProtocol: [
          'Modele um schema para extrair tarefas de uma ata ficticia: titulo, responsavel, prazo, prioridade, dependencia e confianca.',
          'Crie cinco entradas ambiguas e veja quais campos precisam aceitar null, enum ou justificativa.',
          'Implemente validacao conceitual: prazo nao pode estar no passado sem flag, prioridade precisa estar no enum e responsavel nao pode ser vazio.',
          'Compare resposta em texto livre, JSON pedido no prompt e structured output com schema.',
          'Simule mudanca de schema adicionando campo departamento e descreva impacto em consumidores.',
          'Crie questoes de prova sobre diferenca entre JSON valido, schema valido e conteudo verdadeiro.'
        ],
        chart: [
          { label: 'Contexto', value: 72 },
          { label: 'Contrato', value: 98 },
          { label: 'Ferramentas', value: 72 },
          { label: 'Validacao', value: 96 },
          { label: 'Risco', value: 82 }
        ],
        comparison: [
          { title: 'Texto livre', text: 'Melhor para explicacao humana; ruim para automacao e auditoria de campos.' },
          { title: 'JSON no prompt', text: 'Ajuda, mas ainda pode quebrar formato ou campo quando nao ha mecanismo de validacao.' },
          { title: 'Structured output', text: 'Melhor para resposta final parseavel e coerente com schema.' },
          { title: 'Strict tool use', text: 'Melhor para garantir parametros validos quando Claude chama funcoes.' }
        ],
        sources: [
          { kind: 'docs', title: 'Claude - Structured outputs', url: 'https://platform.claude.com/docs/en/build-with-claude/structured-outputs', use: 'Referencia oficial para JSON outputs, strict tool use e consideracoes.' },
          { kind: 'docs', title: 'Claude - Define tools', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools', use: 'Base para input_schema e descricao de ferramentas.' },
          { kind: 'docs', title: 'Claude - Tool use overview', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', use: 'Contexto de como schemas entram em fluxos agentic.' },
          { kind: 'repo', title: 'Anthropic Claude cookbooks', url: 'https://github.com/anthropics/claude-cookbooks', use: 'Exemplos publicos para extracao, classificacao e validacao.' },
          { kind: 'security', title: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', use: 'Conecta output handling inseguro a risco de aplicacao.' }
        ]
      },
      evals: {
        manualTitle: 'Aprofundamento manual critico: evals, datasets, rubricas, model-based grading e regressao.',
        thesis: [
          'Evals sao o mecanismo que transforma impressao em engenharia. Sem avaliacao, o time discute se uma resposta parece boa; com avaliacao, compara versoes, mede regressao, separa erro de recuperacao de erro de raciocinio e decide se uma mudanca esta pronta. Para a certificacao, voce precisa reconhecer que prompt, RAG, tool use e structured output so estao maduros quando existe criterio de aceite.',
          'Um eval util comeca por dataset. O dataset deve representar tarefas reais, casos faceis, casos de borda, ambiguidades, ataques, dados ausentes e exemplos em que o sistema deve recusar ou pedir esclarecimento. Depois vem a rubrica: o que conta como certo, parcialmente certo, errado e perigoso. Por fim, vem o avaliador: codigo para criterios objetivos, modelo para julgamento semantico e revisao humana para calibracao.',
          'Model-based grading escala avaliacao qualitativa, mas nao deve ser tratado como oraculo. Ele precisa de rubric clara, exemplos calibrados, avaliacao cega quando possivel e auditoria de amostras. Code-based grading e mais forte quando ha contrato objetivo, como JSON valido, campo obrigatorio, citacao presente, ferramenta correta ou erro especifico. Sistemas maduros combinam os dois.',
          'Exemplo simplificado: estudar por eval e como corrigir prova com gabarito. Sem gabarito, cada professor decide no humor do dia. Com gabarito e rubrica, todo mundo sabe o que vale ponto, o que e erro grave e o que precisa ser revisado antes de passar.'
        ],
        flow: [
          { label: 'Definir risco', text: 'Listar onde o sistema pode errar: factualidade, formato, tool errada, vazamento, custo, latencia ou recusa indevida.' },
          { label: 'Montar dataset', text: 'Criar exemplos representativos com entrada, contexto, resposta esperada, fontes corretas e distratores.' },
          { label: 'Escrever rubrica', text: 'Definir criterios objetivos e semanticos, pesos, erros fatais e exemplos de respostas nota maxima.' },
          { label: 'Escolher avaliador', text: 'Usar codigo para contratos objetivos, modelo para julgamento textual e humano para calibracao.' },
          { label: 'Rodar baseline', text: 'Medir versao atual antes de alterar prompt, schema, tool, RAG ou modelo.' },
          { label: 'Analisar erro', text: 'Classificar falhas, corrigir causa raiz, repetir teste e guardar resultado como regressao futura.' }
        ],
        operatingPrinciples: [
          'Nao existe melhoria confiavel sem baseline; sempre meca antes e depois.',
          'Dataset pequeno demais engana; dataset grande sem casos criticos tambem engana.',
          'Rubrica deve separar qualidade, seguranca, formato, fonte, completude e criterio de recusa.',
          'Model-based grading precisa de auditoria humana e exemplos de calibracao.',
          'Evals devem rodar em CI ou rotina repetivel quando o sistema vira produto.'
        ],
        examSignals: [
          'Se a questao pergunta como saber se melhorou, a resposta correta envolve eval e baseline.',
          'Se a falha e formato objetivo, code-based grading tende a ser mais confiavel.',
          'Se a falha e qualidade textual, model-based grading com rubrica pode ser adequado.',
          'Se o dataset foi gerado sinteticamente, procure revisao e cobertura de casos reais.',
          'Se a mudanca troca modelo, prompt ou RAG, procure regressao antes de publicar.'
        ],
        labProtocol: [
          'Crie 20 casos de teste para uma aula: 8 normais, 5 borda, 4 erro esperado e 3 ataques ou confusoes.',
          'Escreva rubrica de 0 a 4 com criterios de factualidade, formato, fonte, seguranca e utilidade.',
          'Separe quais criterios podem ser avaliados por codigo e quais exigem julgador textual.',
          'Rode duas versoes ficticias de prompt e classifique diferencas por tipo de erro.',
          'Crie um relatorio de regressao com taxa de acerto, erros fatais e recomendacao de release.',
          'Transforme os erros em flashcards e novas questoes de simulado.'
        ],
        chart: [
          { label: 'Contexto', value: 74 },
          { label: 'Contrato', value: 88 },
          { label: 'Ferramentas', value: 66 },
          { label: 'Validacao', value: 99 },
          { label: 'Risco', value: 90 }
        ],
        comparison: [
          { title: 'Teste manual solto', text: 'Rapido para exploracao, mas nao compara versoes nem pega regressao.' },
          { title: 'Code-based eval', text: 'Forte para formato, schema, citacao, tool escolhida e regras objetivas.' },
          { title: 'Model-based eval', text: 'Forte para qualidade semantica, completude e aderencia a rubrica textual.' },
          { title: 'Human review', text: 'Essencial para calibrar rubrica, validar riscos e arbitrar casos de alto impacto.' }
        ],
        sources: [
          { kind: 'docs', title: 'Claude - Prompt engineering overview', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', use: 'Contexto de iteracao e criterios de melhoria de prompts.' },
          { kind: 'repo', title: 'Anthropic courses', url: 'https://github.com/anthropics/courses', use: 'Material publico oficial com padroes de exercicio e avaliacao.' },
          { kind: 'framework', title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', use: 'Base profissional para mapear, medir e gerenciar risco.' },
          { kind: 'paper', title: 'ReAct: Synergizing Reasoning and Acting in Language Models', url: 'https://arxiv.org/abs/2210.03629', use: 'Exemplo academico de avaliacao de agentes em tarefas interativas.' },
          { kind: 'repo', title: 'Anthropic Claude cookbooks', url: 'https://github.com/anthropics/claude-cookbooks', use: 'Exemplos publicos para experimentos e comparacao de abordagens.' }
        ]
      },
      promptCaching: {
        manualTitle: 'Aprofundamento manual critico: prompt caching, janelas de contexto, custo, latencia e estabilidade de prefixo.',
        thesis: [
          'Prompt caching e uma decisao de arquitetura de contexto. Ele faz sentido quando uma parte grande do prompt se repete entre chamadas: instrucoes de sistema, documentos longos, schemas, ferramentas ou material de referencia. O objetivo e reduzir custo e latencia de leituras repetidas sem sacrificar rastreabilidade. A pergunta correta nao e apenas quanto custa, mas qual parte do contexto e estavel o suficiente para virar prefixo reutilizavel.',
          'O erro comum e misturar contexto estavel com informacao dinamica. Se cada request muda o inicio do prompt, o cache perde eficiencia. Um desenho maduro ordena conteudo em camadas: regras estaveis primeiro, recursos longos e versionados depois, conversa e tarefa especifica por ultimo. Tambem registra diagnostics, token count, cache hit/miss e impacto de mudancas em schema ou tool set.',
          'Cache nao resolve contexto ruim. Se voce cacheia documento irrelevante, economiza em cima de uma decisao ruim. Se cacheia dado sensivel sem controle de retencao e acesso, cria risco operacional. Se depende de cache para caber no orcamento, precisa de fallback para quando o prefixo mudar. Em prova, prompt caching aparece junto com custo, latencia, contexto longo, PDF, tools e repeticao de estudos ou workflows.',
          'Exemplo simplificado: cache e como deixar uma apostila grande ja aberta na mesa. Voce nao precisa abrir o livro inteiro toda vez que faz uma pergunta, mas so vale a pena se as paginas forem as mesmas. Se a cada pergunta voce troca a apostila toda, nao existe economia real.'
        ],
        flow: [
          { label: 'Separar camadas', text: 'Dividir prompt em prefixo estavel, material versionado, tarefa atual e historico dinamico.' },
          { label: 'Medir tokens', text: 'Contar entrada, saida, tamanho do prefixo e frequencia de repeticao antes de otimizar.' },
          { label: 'Estabilizar prefixo', text: 'Evitar inserir data, usuario, pergunta ou contexto mutavel antes do bloco que deve ser cacheado.' },
          { label: 'Aplicar cache', text: 'Usar cache em documentos, schemas ou tools repetidas, respeitando requisitos do provedor e do modelo.' },
          { label: 'Diagnosticar', text: 'Acompanhar hit rate, cache misses, latencia, custo e invalidacoes por mudanca de estrutura.' },
          { label: 'Decidir fallback', text: 'Quando cache falhar, escolher entre resumir, recuperar via RAG, reduzir contexto ou aceitar custo maior.' }
        ],
        operatingPrinciples: [
          'Cache favorece prefixo estavel; qualquer mudanca antes do bloco cacheado pode reduzir aproveitamento.',
          'Contexto longo deve ser justificado por valor de recuperacao, nao por disponibilidade de janela grande.',
          'Token counting e diagnostics fazem parte do design, porque custo percebido sem medicao vira chute.',
          'Mudancas de tools, schemas e output_config podem alterar comportamento de cache e devem ser versionadas.',
          'Cache deve ser combinado com seguranca de dados, retencao adequada e minimizacao de informacao sensivel.'
        ],
        examSignals: [
          'Se a questao fala em repetir documentos longos, prompt caching provavelmente e relevante.',
          'Se cada request muda o prefixo, a alternativa que promete cache alto sem reorganizar contexto e fraca.',
          'Se o problema e recuperar so trechos relevantes, RAG pode ser melhor que cachear tudo.',
          'Se ha custo imprevisivel, procure token counting, diagnostics e estimativa por tentativa.',
          'Se mudanca de schema quebra desempenho, investigue invalidacao e versao de contrato.'
        ],
        labProtocol: [
          'Pegue um prompt ficticio de 20 mil tokens e marque quais partes sao estaveis, semi-estaveis e dinamicas.',
          'Reordene o prompt para que o prefixo reutilizavel venha antes da pergunta do usuario.',
          'Estime custo com e sem cache para cinco repeticoes usando a planilha de custos do repo.',
          'Simule uma mudanca de schema e registre qual parte deveria invalidar cache.',
          'Compare cache com RAG: quando repetir documento inteiro e quando recuperar so trechos.',
          'Escreva criterios de seguranca para nao cachear dados que nao deveriam ser reutilizados.'
        ],
        chart: [
          { label: 'Contexto', value: 98 },
          { label: 'Contrato', value: 80 },
          { label: 'Ferramentas', value: 62 },
          { label: 'Validacao', value: 82 },
          { label: 'Risco', value: 84 }
        ],
        comparison: [
          { title: 'Contexto bruto', text: 'Simples, mas caro e ruidoso quando repetido muitas vezes.' },
          { title: 'Prompt caching', text: 'Melhor para prefixos grandes e estaveis reutilizados em varias chamadas.' },
          { title: 'RAG', text: 'Melhor quando apenas pequenos trechos de um corpus grande sao relevantes por pergunta.' },
          { title: 'Resumo/compactacao', text: 'Melhor quando historico cresceu demais e precisa preservar decisoes, nao texto integral.' }
        ],
        sources: [
          { kind: 'docs', title: 'Claude - Prompt caching', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching', use: 'Referencia oficial para cache de prompt e prefixos repetidos.' },
          { kind: 'docs', title: 'Claude - Cache diagnostics', url: 'https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics', use: 'Base para medir cache hit, miss e depuracao.' },
          { kind: 'docs', title: 'Claude - Context windows', url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows', use: 'Contexto para decidir janela, selecao e compactacao.' },
          { kind: 'docs', title: 'Claude - Pricing', url: 'https://platform.claude.com/docs/en/about-claude/pricing', use: 'Referencia para estimar custo de tokens.' },
          { kind: 'docs', title: 'Claude - Tool use with prompt caching', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching', use: 'Uso de cache em workflows com ferramentas.' }
        ]
      },
      hooks: {
        manualTitle: 'Aprofundamento manual critico: Claude Code hooks, gates deterministicas, gotchas e automacao segura.',
        thesis: [
          'Hooks em Claude Code devem ser entendidos como controles deterministas ao redor de um agente probabilistico. O prompt pode orientar, mas hook pode bloquear, validar, registrar, formatar, executar teste ou exigir revisao em pontos especificos do ciclo. Por isso, quando a questao fala em impedir comando perigoso, validar antes de editar, rodar teste depois de modificar ou auditar comportamento, hook costuma ser mais forte que instrucao textual.',
          'O desenho de hook precisa ser preciso. Bloquear qualquer comando que contenha uma palavra solta gera falso positivo; permitir shell amplo gera risco. Um hook maduro avalia evento, ferramenta, caminho, argumentos, workspace, intencao, padrao permitido e mensagem de erro acionavel. Ele deve preferir allowlist para operacoes sensiveis, usar paths resolvidos, preservar logs sem segredo e falhar fechado apenas quando o risco justificar.',
          'Gotchas aparecem quando o hook vira burocracia fragil. Regras amplas quebram fluxo legitimo; logs podem vazar segredo; hook lento degrada UX; regex ingenua erra comandos compostos; validacao pos-edicao pode chegar tarde para acao destrutiva; e hooks que alteram arquivos automaticamente podem gerar diffs confusos. A prova tende a favorecer controles pequenos, testados e proporcionais ao risco.',
          'Exemplo simplificado: hook e como uma catraca antes da porta de uma sala importante. A placa dizendo "nao entre sem autorizacao" ajuda, mas a catraca realmente impede entrada quando a regra e critica. Ao mesmo tempo, se a catraca bloquear todo mundo sem motivo, o trabalho para.'
        ],
        flow: [
          { label: 'Escolher evento', text: 'Identificar se o controle precisa ocorrer antes da tool, depois da tool, no fim da resposta ou no inicio da sessao.' },
          { label: 'Definir politica', text: 'Escrever regra objetiva: caminho permitido, comando permitido, arquivo sensivel, teste obrigatorio ou formato de saida.' },
          { label: 'Implementar minimo', text: 'Criar hook pequeno, legivel, com argumentos validados e sem dependencias desnecessarias.' },
          { label: 'Testar falso positivo', text: 'Rodar casos legitimos, casos proibidos, paths com espaco, casing diferente e comando parcialmente parecido.' },
          { label: 'Auditar saida', text: 'Garantir mensagem clara para o agente e log sem segredo, token, conteudo confidencial ou dado de cliente.' },
          { label: 'Versionar e revisar', text: 'Manter hook no repo, explicar finalidade e revisar sempre que workflow ou risco mudar.' }
        ],
        operatingPrinciples: [
          'Use hook quando a regra precisa ser executada de forma deterministica, nao apenas lembrada pelo modelo.',
          'PreToolUse e melhor para bloquear antes de executar; PostToolUse e melhor para validar resultado ou disparar teste.',
          'Allowlist costuma ser mais segura que blacklist para comandos, caminhos e operacoes sensiveis.',
          'Hooks devem ter mensagens acionaveis para que o agente saiba corrigir o plano sem adivinhar.',
          'Logs de hook sao artefatos de seguranca e tambem podem vazar informacao; sanitize sempre.'
        ],
        examSignals: [
          'Se precisa impedir acao antes que aconteca, procure hook/gate antes da tool.',
          'Se precisa apenas padronizar processo repetitivo, command pode ser suficiente.',
          'Se a regra depende de conhecimento especializado sob demanda, Skill pode ser melhor.',
          'Se o hook bloqueia demais, a alternativa correta deve mencionar falsos positivos e teste.',
          'Se ha risco de excluir, vazar ou alterar estado, prompt sozinho e resposta fraca.'
        ],
        labProtocol: [
          'Escreva uma politica: bloquear delete recursivo fora do workspace e exigir confirmacao para arquivos sensiveis.',
          'Implemente pseudocodigo do hook validando path resolvido, ferramenta, argumento e diretorio permitido.',
          'Crie dez casos de teste: comando permitido, proibido, path relativo, path com espaco, tentativa de escape e dry-run.',
          'Escreva mensagens de bloqueio que ensinem a alternativa segura.',
          'Revise logs para garantir que nao gravam segredo, conteudo interno ou token.',
          'Compare hook com prompt, command e CI para explicar qual controle age em qual momento.'
        ],
        chart: [
          { label: 'Contexto', value: 78 },
          { label: 'Contrato', value: 88 },
          { label: 'Ferramentas', value: 86 },
          { label: 'Validacao', value: 98 },
          { label: 'Risco', value: 98 }
        ],
        comparison: [
          { title: 'Prompt', text: 'Orienta comportamento, mas nao garante bloqueio quando a regra e critica.' },
          { title: 'Command', text: 'Padroniza tarefa invocavel, mas nao intercepta automaticamente todos os riscos.' },
          { title: 'Hook', text: 'Aplica regra deterministica em pontos do ciclo, ideal para bloqueio, teste e auditoria.' },
          { title: 'CI', text: 'Valida antes de merge ou deploy, mas pode ser tarde para acao local destrutiva.' }
        ],
        sources: [
          { kind: 'docs', title: 'Claude Code - Hooks reference', url: 'https://code.claude.com/docs/en/hooks', use: 'Referencia oficial para eventos, payloads e comportamento de hooks.' },
          { kind: 'docs', title: 'Claude Agent SDK hooks', url: 'https://code.claude.com/docs/en/agent-sdk/hooks', use: 'Complementa hooks no contexto de agentes programaticos.' },
          { kind: 'docs', title: 'Claude Agent SDK overview', url: 'https://code.claude.com/docs/en/agent-sdk/overview', use: 'Mostra hooks junto de sessions, tools, MCP e permissions.' },
          { kind: 'repo', title: 'Claude Code Hooks Mastery', url: 'https://github.com/disler/claude-code-hooks-mastery', use: 'Exemplos publicos de lifecycle, eventos e padroes de hook.' },
          { kind: 'security', title: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', use: 'Base para reduzir agencia excessiva e tool misuse.' }
        ]
      },
      sdk: {
        manualTitle: 'Aprofundamento manual critico: Claude Code SDK, Agent SDK, GitHub, CI, sessions, subagents e workflows programaticos.',
        thesis: [
          'Claude Code SDK e Agent SDK devem ser estudados como forma de transformar uso interativo em plataforma programatica. Em vez de depender apenas de uma sessao manual, o time pode criar fluxos que recebem tarefa, montam contexto, chamam agente, controlam permissoes, conectam tools ou MCP, registram eventos, integram GitHub e rodam validacoes. O desafio e manter a disciplina de engenharia mesmo quando o agente esta embutido em automacoes.',
          'A arquitetura correta separa orquestracao, contexto, permissao, execucao e avaliacao. Uma aplicacao SDK precisa decidir quais arquivos entram, quais tools podem ser chamadas, quais hooks controlam risco, como sessoes sao retomadas, como subagents recebem escopo e como resultados viram PR, comentario, artefato ou tarefa. Sem esses limites, SDK vira automacao opaca com alto impacto.',
          'GitHub e CI entram como camada de governanca. Um agente pode sugerir patch, criar resumo, revisar diff ou responder issue, mas a aprovacao, testes, branch protection, segredo e deploy precisam continuar sob controle. A prova tende a favorecer respostas que preservam fluxo de engenharia: branch pequeno, diff revisavel, testes, logs, rollback e manutencao de contexto.',
          'Exemplo simplificado: usar SDK e como contratar um assistente para trabalhar dentro do processo da empresa, nao como soltar alguem sem cracha no escritorio. Ele pode abrir tarefas, preparar documentos e sugerir mudancas, mas precisa de lista do que pode acessar, quando pedir aprovacao e como provar que fez certo.'
        ],
        flow: [
          { label: 'Definir caso de uso', text: 'Escolher fluxo programatico claro: review de PR, triagem de issue, geracao de teste, migracao ou documentacao.' },
          { label: 'Montar contexto', text: 'Selecionar arquivos, historico, instructions, resources e limites de token necessarios para a tarefa.' },
          { label: 'Configurar permissoes', text: 'Definir tools, MCP servers, comandos, paths, secrets proibidos e aprovacoes humanas.' },
          { label: 'Executar agente', text: 'Rodar SDK com session, streaming, hooks, subagents ou checkpoints conforme necessidade.' },
          { label: 'Validar artefato', text: 'Executar testes, lint, link check, security scan, diff review e rubrica de qualidade.' },
          { label: 'Publicar com governanca', text: 'Criar PR ou comentario com resumo, evidencias, limites conhecidos e caminho de rollback.' }
        ],
        operatingPrinciples: [
          'SDK nao elimina processo de engenharia; ele deve codificar o processo para ficar repetivel e auditavel.',
          'Sessions ajudam continuidade, mas contexto antigo precisa ser revalidado contra arquivos atuais.',
          'Subagents devem receber escopo estreito, objetivo claro e criterio de saida, nao autonomia ilimitada.',
          'GitHub integration deve respeitar branch protection, secrets, revisao humana e CI.',
          'Hooks, permissions e logs sao partes do produto, nao detalhes opcionais.'
        ],
        examSignals: [
          'Se a questao fala em automatizar fluxo recorrente de desenvolvimento, SDK ou GitHub integration podem ser resposta.',
          'Se o risco e contexto obsoleto, procure revalidacao de arquivos e estado antes de editar.',
          'Se ha multiplos papeis especializados, subagents podem ajudar, mas com escopo e handoff claros.',
          'Se a mudanca vai para repo, procure testes, PR pequeno, diff revisavel e CI.',
          'Se aparece segredo ou conta corporativa, permissao e isolamento vem antes de automacao.'
        ],
        labProtocol: [
          'Desenhe um fluxo SDK para revisar PR: entrada, arquivos lidos, criterios, hooks, testes e saida esperada.',
          'Defina permissoes minimas para comandos, leitura de arquivos e conexao MCP.',
          'Crie rubrica de PR com bug, seguranca, teste, UX e documentacao.',
          'Simule retomada de session antiga e liste quais arquivos precisam ser reabertos antes de continuar.',
          'Adicione etapa de CI que bloqueia links quebrados, segredo acidental e erro de sintaxe.',
          'Explique como o agente reporta incerteza e quando deve pedir revisao humana.'
        ],
        chart: [
          { label: 'Contexto', value: 92 },
          { label: 'Contrato', value: 84 },
          { label: 'Ferramentas', value: 94 },
          { label: 'Validacao', value: 94 },
          { label: 'Risco', value: 90 }
        ],
        comparison: [
          { title: 'Uso interativo', text: 'Bom para exploracao e tarefas pontuais, mas menos repetivel e auditavel.' },
          { title: 'Command', text: 'Padroniza tarefa local, mas ainda depende de invocacao e contexto manual.' },
          { title: 'SDK', text: 'Permite produto agentic programatico com sessions, tools, hooks e integracoes.' },
          { title: 'CI/GitHub app', text: 'Melhor para governar mudancas, revisar artefatos e controlar publicacao.' }
        ],
        sources: [
          { kind: 'docs', title: 'Claude Agent SDK overview', url: 'https://code.claude.com/docs/en/agent-sdk/overview', use: 'Referencia oficial para criar agentes programaticos.' },
          { kind: 'docs', title: 'Claude Agent SDK hooks', url: 'https://code.claude.com/docs/en/agent-sdk/hooks', use: 'Base para controles em fluxos SDK.' },
          { kind: 'docs', title: 'Claude Code - Hooks reference', url: 'https://code.claude.com/docs/en/hooks', use: 'Referencia para automacoes e validacoes no ciclo do Claude Code.' },
          { kind: 'spec', title: 'MCP Specification', url: 'https://modelcontextprotocol.io/specification/2025-06-18', use: 'Padrao para conectar agentes a ferramentas e contexto externo.' },
          { kind: 'repo', title: 'Anthropic Claude cookbooks', url: 'https://github.com/anthropics/claude-cookbooks', use: 'Exemplos publicos para transformar conceitos em workflows.' }
        ]
      }
    };
    return packs[key] || null;
  }

  function getCriticalLessonKey(lesson) {
    var text = ((lesson.id || '') + ' ' + (lesson.title || '') + ' ' + (lesson.objective || '') + ' ' + (lesson.technical || '')).toLowerCase();
    if (/rag|retrieval|chunk|embedding|bm25|multi-index|agentic search/.test(text)) return 'rag';
    if (/mcp|resource|resources|server inspector|client inspector|prompts mcp|definindo tools/.test(text)) return 'mcp';
    if (/structured|json schema|structured data|strict tool/.test(text)) return 'structured';
    if (/prompt caching|cache de prompt|cache diagnostics|pdf, cita|pdf citations|context window|token/.test(text)) return 'promptCaching';
    if (/hook|hooks/.test(text)) return 'hooks';
    if (/code-github-sdk|code-sdk|claude code sdk|agent sdk|\bgithub\b|\bci\b/.test(text)) return 'sdk';
    if (/eval|evaluation|grading|dataset|assessment|rubrica/.test(text)) return 'evals';
    if (/tool use|tool schemas|erros estruturados de tools|multiple tools|múltiplas tools|multi-turn com múltiplas|tool_result|fine grained|web search tool|text edit tool/.test(text)) return 'toolUse';
    return null;
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
