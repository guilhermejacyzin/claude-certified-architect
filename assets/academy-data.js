window.ACADEMY_DATA = {
  modules: [
    {
      id: 'start',
      title: 'Início',
      short: 'Como estudar',
      color: '#5e5ce6',
      description: 'Orientação, mapa do exame, rotina e diagnóstico inicial.'
    },
    {
      id: 'skills',
      title: 'Agent Skills',
      short: 'Skills',
      color: '#8b5cf6',
      description: 'Criação, distribuição, troubleshooting e diferença entre Skills, commands, hooks e MCP.'
    },
    {
      id: 'api',
      title: 'Claude API',
      short: 'API',
      color: '#0a84ff',
      description: 'API, prompts, structured output, evals, tool use, RAG e features.'
    },
    {
      id: 'mcp',
      title: 'Model Context Protocol',
      short: 'MCP',
      color: '#7c3aed',
      description: 'Clients, servers, tools, resources, prompts, inspector e integração.'
    },
    {
      id: 'code',
      title: 'Claude Code',
      short: 'Code',
      color: '#2563eb',
      description: 'Setup, contexto, commands, hooks, SDK, GitHub e workflows.'
    },
    {
      id: 'practice',
      title: 'Prática e Prova',
      short: 'Prova',
      color: '#9333ea',
      description: 'Labs, drills, simulados, custos, capstone e rotina de revisão.'
    },
    {
      id: 'security',
      title: 'Segurança, QA e Ensino',
      short: 'Segurança',
      color: '#5b21b6',
      description: 'Threat model, guardrails, QA, UX, engenharia e critérios pedagógicos.'
    }
  ],
  resources: {
    'DOC-01': {
      type: 'Docs oficiais',
      title: 'Introdução ao Claude',
      url: 'https://platform.claude.com/docs/pt-BR/intro'
    },
    'DOC-02': {
      type: 'Docs oficiais',
      title: 'Comece a usar o Claude',
      url: 'https://platform.claude.com/docs/pt-BR/get-started'
    },
    'DOC-03': {
      type: 'Docs oficiais',
      title: 'Introdução ao uso da API para Claude',
      url: 'https://platform.claude.com/docs/pt-BR/claude_api_primer'
    },
    'DOC-04': {
      type: 'Docs oficiais',
      title: 'Uso de ferramentas com Claude',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/overview'
    },
    'DOC-05': {
      type: 'Docs oficiais',
      title: 'Como o uso de ferramentas funciona',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/how-tool-use-works'
    },
    'DOC-06': {
      type: 'Docs oficiais',
      title: 'Definir ferramentas',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/define-tools'
    },
    'DOC-07': {
      type: 'Docs oficiais',
      title: 'Ferramenta de busca de ferramentas',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/tool-search-tool'
    },
    'DOC-08': {
      type: 'Docs oficiais',
      title: 'Gerenciar o contexto de ferramentas',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/manage-tool-context'
    },
    'DOC-09': {
      type: 'Docs oficiais',
      title: 'Uso de ferramentas com cache de prompt',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/tool-use-with-prompt-caching'
    },
    'DOC-10': {
      type: 'Docs oficiais',
      title: 'Chamada programática de ferramentas',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/programmatic-tool-calling'
    },
    'DOC-11': {
      type: 'Docs oficiais',
      title: 'Streaming granular de ferramentas',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/fine-grained-tool-streaming'
    },
    'DOC-12': {
      type: 'Docs oficiais',
      title: 'Saídas estruturadas',
      url: 'https://platform.claude.com/docs/pt-BR/build-with-claude/structured-outputs'
    },
    'DOC-13': {
      type: 'Docs oficiais',
      title: 'Cache de prompt',
      url: 'https://platform.claude.com/docs/pt-BR/build-with-claude/prompt-caching'
    },
    'DOC-14': {
      type: 'Docs oficiais',
      title: 'Diagnóstico de cache',
      url: 'https://platform.claude.com/docs/pt-BR/build-with-claude/cache-diagnostics'
    },
    'DOC-15': {
      type: 'Docs oficiais',
      title: 'Suporte a PDF',
      url: 'https://platform.claude.com/docs/pt-BR/build-with-claude/pdf-support'
    },
    'DOC-16': {
      type: 'Docs oficiais',
      title: 'Ferramenta de busca na web',
      url: 'https://platform.claude.com/docs/pt-BR/agents-and-tools/tool-use/web-fetch-tool'
    },
    'DOC-17': {
      type: 'Docs oficiais',
      title: 'Resultados de pesquisa',
      url: 'https://platform.claude.com/docs/pt-BR/build-with-claude/search-results'
    },
    'DOC-18': {
      type: 'Docs oficiais',
      title: 'Citações',
      url: 'https://platform.claude.com/docs/pt-BR/build-with-claude/citations'
    },
    'DOC-19': {
      type: 'Docs oficiais',
      title: 'Janelas de contexto',
      url: 'https://platform.claude.com/docs/pt-BR/build-with-claude/context-windows'
    },
    'DOC-20': {
      type: 'Docs oficiais',
      title: 'Preços',
      url: 'https://platform.claude.com/docs/pt-BR/about-claude/pricing'
    },
    'HELP-01': {
      type: 'Help Center',
      title: 'Dicas avançadas do Claude Code',
      url: 'https://support.claude.com/pt/articles/14554000-dicas-de-usuario-avancado-do-claude-code'
    },
    'HELP-02': {
      type: 'Help Center',
      title: 'Perguntas frequentes do Claude Code',
      url: 'https://support.claude.com/pt/articles/14554922-perguntas-frequentes-do-claude-code'
    },
    'HELP-03': {
      type: 'Help Center',
      title: 'Cola de referência do Claude Code',
      url: 'https://support.claude.com/pt/articles/14553413-cola-de-referencia-do-claude-code'
    },
    'HELP-04': {
      type: 'Help Center',
      title: 'Casos de uso comuns para desenvolvedores',
      url: 'https://support.claude.com/pt/articles/14553517-claude-code-casos-de-uso-comuns-para-desenvolvedores'
    },
    'HELP-05': {
      type: 'Help Center',
      title: 'Kit de comunicações Claude Code',
      url: 'https://support.claude.com/pt/articles/14555877-kit-de-comunicacoes-claude-code'
    },
    'YT-01': {
      type: 'YouTube',
      title: 'Curso Básico de Claude - Aula 1',
      url: 'https://www.youtube.com/watch?v=h7BzuuFIHIY',
      embed: 'https://www.youtube.com/embed/h7BzuuFIHIY'
    },
    'YT-02': {
      type: 'YouTube',
      title: 'Claude para Iniciantes: Guia Completo',
      url: 'https://www.youtube.com/watch?v=rXTcRKXmpYk',
      embed: 'https://www.youtube.com/embed/rXTcRKXmpYk'
    },
    'YT-03': {
      type: 'YouTube',
      title: 'Claude Code - Tutorial Completo para Iniciantes',
      url: 'https://www.youtube.com/watch?v=yDO21vewdes',
      embed: 'https://www.youtube.com/embed/yDO21vewdes'
    },
    'YT-04': {
      type: 'YouTube',
      title: 'CLAUDE CODE: Aula Completa',
      url: 'https://www.youtube.com/watch?v=RBwX9U2AEr8',
      embed: 'https://www.youtube.com/embed/RBwX9U2AEr8'
    },
    'YT-05': {
      type: 'YouTube',
      title: 'Claude Code: Guia completo para desenvolvedores',
      url: 'https://www.youtube.com/watch?v=NH_NtrN2BEs',
      embed: 'https://www.youtube.com/embed/NH_NtrN2BEs'
    },
    'YT-06': {
      type: 'YouTube',
      title: 'Claude Code Tutorial Completo em Português',
      url: 'https://www.youtube.com/watch?v=Vo5ePeM3C3U',
      embed: 'https://www.youtube.com/embed/Vo5ePeM3C3U'
    },
    'YT-07': {
      type: 'YouTube',
      title: 'Claude Code: Curso Completo do Zero ao Avançado',
      url: 'https://www.youtube.com/watch?v=MzMM5iV3GcU',
      embed: 'https://www.youtube.com/embed/MzMM5iV3GcU'
    },
    'YT-08': {
      type: 'YouTube',
      title: 'Claude Code: aula completa para empreendedores',
      url: 'https://www.youtube.com/watch?v=hF76lGyvKRE',
      embed: 'https://www.youtube.com/embed/hF76lGyvKRE'
    },
    'YT-09': {
      type: 'YouTube',
      title: 'Crie Agentes e Skills no Claude Code',
      url: 'https://www.youtube.com/watch?v=Yjq60UwYmp0',
      embed: 'https://www.youtube.com/embed/Yjq60UwYmp0'
    },
    'YT-10': {
      type: 'YouTube',
      title: 'Usei Claude Code para montar um agente do zero',
      url: 'https://www.youtube.com/watch?v=I43RMajIrOg',
      embed: 'https://www.youtube.com/embed/I43RMajIrOg'
    },
    'YT-11': {
      type: 'YouTube',
      title: 'Como conectar o Claude Code a qualquer ferramenta',
      url: 'https://www.youtube.com/watch?v=PvLTRo-HSxg',
      embed: 'https://www.youtube.com/embed/PvLTRo-HSxg'
    },
    'YT-12': {
      type: 'YouTube',
      title: 'Claude Chat vs Cowork vs Claude Code',
      url: 'https://www.youtube.com/watch?v=wV32akPKcXI',
      embed: 'https://www.youtube.com/embed/wV32akPKcXI'
    },
    'YT-13': {
      type: 'YouTube',
      title: 'MCP explicado para Iniciantes',
      url: 'https://www.youtube.com/watch?v=-xZgeMsZ4uA',
      embed: 'https://www.youtube.com/embed/-xZgeMsZ4uA'
    },
    'YT-14': {
      type: 'YouTube',
      title: 'Por que todos estão falando sobre MCP?',
      url: 'https://www.youtube.com/watch?v=S4JijEq8Q_M',
      embed: 'https://www.youtube.com/embed/S4JijEq8Q_M'
    },
    'YT-15': {
      type: 'YouTube',
      title: 'MCP: seu agente de IA ainda mais inteligente',
      url: 'https://www.youtube.com/watch?v=f29hGJPhK_4',
      embed: 'https://www.youtube.com/embed/f29hGJPhK_4'
    },
    'YT-16': {
      type: 'YouTube',
      title: 'Claude + .NET: como criar e executar Skills',
      url: 'https://www.youtube.com/watch?v=8P611LIom4A',
      embed: 'https://www.youtube.com/embed/8P611LIom4A'
    },
    'YT-17': {
      type: 'YouTube',
      title: 'Como entender um projeto que você não criou com Claude Code',
      url: 'https://www.youtube.com/watch?v=r1ovDO7sQ1o',
      embed: 'https://www.youtube.com/embed/r1ovDO7sQ1o'
    },
    'YT-18': {
      type: 'YouTube',
      title: 'Como revisar as mudanças do Claude Code do jeito certo',
      url: 'https://www.youtube.com/watch?v=D1cpprZkxss',
      embed: 'https://www.youtube.com/embed/D1cpprZkxss'
    },
    'YT-19': {
      type: 'YouTube',
      title: 'Instalação do Claude Code para Windows',
      url: 'https://www.youtube.com/watch?v=wZtDd90So5o',
      embed: 'https://www.youtube.com/embed/wZtDd90So5o'
    },
    'YT-20': {
      type: 'YouTube',
      title: 'Wiki com LLM e RAG',
      url: 'https://www.youtube.com/watch?v=HbCzvn68Y-g',
      embed: 'https://www.youtube.com/embed/HbCzvn68Y-g'
    },
    'YT-21': {
      type: 'YouTube',
      title: 'Implemente RAG na AWS em 10 Minutos',
      url: 'https://www.youtube.com/watch?v=bm6o57h6ZQw',
      embed: 'https://www.youtube.com/embed/bm6o57h6ZQw'
    },
    'ART-01': {
      type: 'Artigo',
      title: 'Claude Code explicado para pessoas normais',
      url: 'https://dfolloni.substack.com/p/claude-code-explicado-para-pessoas'
    },
    'ART-02': {
      type: 'Artigo',
      title: 'Claude Code: O Guia Completo',
      url: 'https://marsolia.substack.com/p/claude-code-o-guia-completo'
    },
    'ART-03': {
      type: 'Artigo',
      title: 'Tutorial Claude Code para Iniciantes',
      url: 'https://www.nxcode.io/pt/resources/news/claude-code-tutorial-beginners-guide-2026'
    },
    'ART-04': {
      type: 'Artigo',
      title: 'MCP server para reduzir uso de tokens no Claude Code',
      url: 'https://medium.com/@vmsfigueredo/i-built-an-mcp-server-to-reduce-claude-code-token-usage-using-claude-code-250ef7654e47'
    },
    'ART-05': {
      type: 'Artigo',
      title: 'Como criar sua própria Skill no Claude',
      url: 'https://elisaterumi.substack.com/p/como-criar-sua-propria-skill-no-claude'
    },
    'ART-06': {
      type: 'Artigo',
      title: 'Configuração de Claude com AEM MCP',
      url: 'https://experienceleague.adobe.com/pt-br/docs/experience-manager-cloud-service/content/ai-in-aem/mcp-support/chat-applications/setup-claude'
    },
    'ART-07': {
      type: 'Artigo',
      title: 'Anthropic Claude 3 no Amazon Bedrock',
      url: 'https://aws.amazon.com/startups/learn/anthropic-claude-3-next-gen-models-on-amazon-bedrock?lang=pt-BR'
    },
    'ART-08': {
      type: 'Artigo',
      title: 'OpenCode vs Claude Code',
      url: 'https://www.datacamp.com/pt/blog/opencode-vs-claude-code'
    },
    'ART-09': {
      type: 'Artigo',
      title: 'Workflows dinâmicos do Claude Code',
      url: 'https://tecjustica.substack.com/p/workflows-dinamicos-do-claude-code'
    }
  },
  lessons: [
    {
      id: 'start-how-to-study',
      module: 'start',
      level: 'fundamentos',
      duration: '30 min',
      title: 'Como usar a academia',
      objective: 'Entender a ordem de estudo, como navegar e como registrar evolução.',
      normal: 'Comece pelo mapa, faça um simulado curto e use o resultado para decidir onde aprofundar. O site organiza o estudo como escola: cada aula tem objetivo, explicação, prática e recursos externos.',
      technical: 'O fluxo recomendado é diagnóstico -> estudo guiado -> exemplo prático -> drill -> simulado -> revisão de erro. Isso cria ciclo de feedback e evita leitura passiva.',
      simple: 'É como entrar em uma escola: primeiro você vê a grade, depois faz uma avaliação inicial e então segue aula por aula.',
      steps: ['Leia o mapa do exame.', 'Faça 10 questões simuladas.', 'Abra a primeira aula fraca.', 'Execute um exemplo.', 'Registre o erro no study-log.'],
      practice: 'Abra `practice/simulado-bilingue-30-questoes.md` e responda 10 questões sem consultar.',
      exam: 'A prova cobra julgamento. O treino precisa simular decisão, não decorar frase.',
      links: ['docs/00-mapa-exame.md', 'course/00-como-usar-o-curso.md', 'study-log.md'],
      resources: ['DOC-01'],
      videos: ['YT-01']
    },
    {
      id: 'skills-what',
      module: 'skills',
      level: 'fundamentos',
      duration: '35 min',
      title: 'O que são Agent Skills',
      objective: 'Entender Skills como capacidades reutilizáveis que entram no contexto quando úteis.',
      normal: 'Uma Skill é um pacote de conhecimento e instrução para um tipo de tarefa. Ela evita colocar tudo no prompt principal e permite que o assistente carregue orientação especializada no momento certo.',
      technical: 'A qualidade de uma Skill depende do frontmatter, da descrição de acionamento, do escopo, dos arquivos auxiliares e da capacidade de não consumir contexto desnecessário.',
      simple: 'É uma apostila especializada que o assistente abre só quando a tarefa pede aquele assunto.',
      steps: ['Escolha um domínio.', 'Defina quando a Skill deve ser usada.', 'Escreva `SKILL.md` curto.', 'Inclua checklist e exemplos.', 'Teste se ela ativa no momento certo.'],
      practice: 'Desenhe uma Skill para revisar contratos de API e escreva quando ela deve ou não ser usada.',
      exam: 'Se a questão fala em conhecimento especializado sob demanda, Skill costuma ser melhor que jogar tudo em `CLAUDE.md`.',
      links: ['academy/01-introducao-agent-skills.md', 'recursos-ptbr/matriz-aulas-claude-ptbr.md'],
      resources: ['HELP-03', 'ART-05'],
      videos: ['YT-02', 'YT-09']
    },
    {
      id: 'skills-first',
      module: 'skills',
      level: 'praticante',
      duration: '45 min',
      title: 'Criando sua primeira Skill',
      objective: 'Criar uma Skill mínima com objetivo, workflow, exemplos e critério de qualidade.',
      normal: 'A primeira Skill deve resolver um problema pequeno e repetível. Se ficar ampla demais, ela ativa na hora errada e piora o contexto.',
      technical: 'Uma Skill boa tem descrição operacional, instruções curtas, referências separadas e exemplos de entrada/saída. Ela deve orientar decisão, não tentar substituir validação determinística.',
      simple: 'Comece com uma ferramenta pequena. Não tente criar uma enciclopédia.',
      steps: ['Crie pasta da Skill.', 'Escreva descrição clara.', 'Liste workflow.', 'Inclua exemplo positivo.', 'Teste com pedido realista.'],
      practice: 'Crie uma Skill conceitual para “review de structured output” e compare com a checklist do repo.',
      exam: 'A prova tende a punir solução ampla demais quando existe mecanismo específico.',
      links: ['academy/01-introducao-agent-skills.md', '.claude/skills/ccaf-study/SKILL.md'],
      resources: ['HELP-03', 'ART-05'],
      videos: ['YT-09']
    },
    {
      id: 'skills-files',
      module: 'skills',
      level: 'praticante',
      duration: '40 min',
      title: 'Skills com múltiplos arquivos',
      objective: 'Separar instrução principal, referências, scripts e exemplos sem inundar contexto.',
      normal: 'Quando uma Skill cresce, você deve separar o que é orientação central do que é consulta opcional. O assistente não precisa carregar tudo sempre.',
      technical: 'Use `SKILL.md` como roteador e coloque referências longas em arquivos auxiliares. Isso reduz tokens e melhora seleção contextual.',
      simple: 'O índice fica na capa; os capítulos ficam em arquivos separados.',
      steps: ['Identifique conteúdo essencial.', 'Separe referências longas.', 'Crie exemplos pequenos.', 'Documente quando abrir cada arquivo.', 'Teste consumo de contexto.'],
      practice: 'Reestruture uma Skill imaginária de segurança em três arquivos: workflow, checklist e exemplos.',
      exam: 'Contexto demais degrada resposta. Modularização é parte da arquitetura.',
      links: ['academy/01-introducao-agent-skills.md', 'docs/15-modulo-context-reliability.md'],
      resources: ['DOC-19', 'HELP-03'],
      videos: ['YT-09']
    },
    {
      id: 'skills-vs',
      module: 'skills',
      level: 'arquiteto',
      duration: '45 min',
      title: 'Skills vs Commands vs Hooks vs MCP',
      objective: 'Escolher o artefato correto para cada tipo de problema.',
      normal: 'Skill ensina uma capacidade. Command executa um workflow. Hook impõe regra. MCP conecta dados e ações externas. Misturar esses papéis gera soluções frágeis.',
      technical: 'A decisão deve seguir responsabilidade: conhecimento sob demanda em Skill, processo invocável em command, garantia determinística em hook, integração externa em MCP.',
      simple: 'Manual, roteiro, trava e tomada são coisas diferentes.',
      steps: ['Classifique o problema.', 'Pergunte se é conhecimento, workflow, bloqueio ou integração.', 'Escolha o artefato.', 'Defina limites.', 'Teste com caso ambíguo.'],
      practice: 'Classifique 20 cenários do arquivo de drills usando esses quatro artefatos.',
      exam: 'Questões scenario-based frequentemente escondem um requisito de segurança que pede hook, não prompt.',
      links: ['drills/01-drills-academy.md', 'docs/13-modulo-claude-code-workflows.md'],
      resources: ['HELP-01', 'HELP-03'],
      videos: ['YT-02', 'YT-09']
    },
    {
      id: 'api-models',
      module: 'api',
      level: 'fundamentos',
      duration: '40 min',
      title: 'Overview de modelos Claude',
      objective: 'Escolher modelo por capacidade, custo, latência, contexto e risco.',
      normal: 'Nem toda tarefa precisa do modelo mais caro. Use modelos fortes para raciocínio complexo e modelos leves para classificação, triagem ou rascunhos.',
      technical: 'A seleção considera input/output tokens, contexto, suporte multimodal, orçamento, SLA, necessidade de extended thinking e tolerância a erro.',
      simple: 'Não use caminhão para levar uma carta. Escolha o veículo certo para a carga.',
      steps: ['Defina tarefa.', 'Estime risco.', 'Estime tokens.', 'Escolha modelo.', 'Meça qualidade.'],
      practice: 'Crie uma matriz com três tarefas: classificar ticket, revisar PR e resumir PDF.',
      exam: 'A resposta certa raramente é “sempre usar o maior modelo”; é escolher por tradeoff.',
      links: ['docs/20-estimativa-custos-token.md', 'docs/00-mapa-exame.md'],
      resources: ['DOC-01'],
      videos: ['YT-01', 'YT-02']
    },
    {
      id: 'api-first-request',
      module: 'api',
      level: 'fundamentos',
      duration: '45 min',
      title: 'Primeira request na Claude API',
      objective: 'Entender model, messages, system, max_tokens e resposta.',
      normal: 'Uma request é uma conversa estruturada enviada à API. Você informa o modelo, mensagens e limites; Claude retorna conteúdo e metadados.',
      technical: 'A aplicação deve controlar histórico, tokens, system prompt, erros, retries, logs e validação de saída. A API não substitui arquitetura do produto.',
      simple: 'Você envia uma carta com instruções e recebe uma resposta, mas precisa guardar o histórico da conversa.',
      steps: ['Defina system prompt.', 'Envie user message.', 'Limite max_tokens.', 'Leia resposta.', 'Trate erro.'],
      practice: 'Escreva pseudo-request para pedir resumo técnico em JSON.',
      exam: 'Multi-turn exige reenviar histórico relevante ou estado resumido.',
      links: ['academy/02-building-with-claude-api.md', 'docs/14-modulo-prompt-structured-output.md'],
      resources: ['DOC-03'],
      videos: ['YT-01']
    },
    {
      id: 'api-system-prompts',
      module: 'api',
      level: 'praticante',
      duration: '45 min',
      title: 'System prompts',
      objective: 'Usar system prompt para papel, limites, formato e critérios persistentes.',
      normal: 'System prompt define o comportamento de base da interação. Ele ajuda consistência, mas não deve ser tratado como trava de segurança.',
      technical: 'Políticas críticas precisam de validação por código, hooks, schemas ou tools. Prompt reduz ambiguidade, mas não garante execução determinística.',
      simple: 'É a orientação inicial do professor, não a fechadura da porta.',
      steps: ['Defina papel.', 'Defina critérios.', 'Defina formato.', 'Declare limites.', 'Teste contra caso adversarial.'],
      practice: 'Reescreva um prompt vago em um prompt com objetivo, contexto e formato.',
      exam: 'Se o requisito é bloquear algo perigoso, prompt sozinho não basta.',
      links: ['docs/14-modulo-prompt-structured-output.md', 'drills/01-drills-academy.md'],
      resources: ['DOC-03'],
      videos: ['YT-02']
    },
    {
      id: 'api-structured-output',
      module: 'api',
      level: 'praticante',
      duration: '60 min',
      title: 'Structured data e JSON Schema',
      objective: 'Projetar saída consumível por sistemas downstream.',
      normal: 'Quando outro sistema vai consumir a resposta, texto livre é frágil. Use schema para reduzir ambiguidade e validar o formato.',
      technical: 'Schemas devem definir required, nullable, enum, fallback, arrays, objetos e campos de evidência. A aplicação deve validar e fazer retry para erros recuperáveis.',
      simple: 'Em vez de pedir uma redação, você entrega um formulário com campos obrigatórios.',
      steps: ['Liste campos.', 'Defina tipos.', 'Defina nulos.', 'Inclua evidência.', 'Valide e corrija.'],
      practice: 'Crie schema para extrair partes de um contrato com `null` quando ausente.',
      exam: 'Pedir “JSON válido” em linguagem natural é mais fraco que schema + validação.',
      links: ['examples/04-structured-output-10-exemplos.md', 'labs/lab-04-structured-output.md'],
      resources: ['DOC-12'],
      videos: ['YT-02']
    },
    {
      id: 'api-temperature',
      module: 'api',
      level: 'fundamentos',
      duration: '30 min',
      title: 'Temperature e previsibilidade',
      objective: 'Entender quando aumentar ou reduzir variação nas respostas.',
      normal: 'Temperature controla o quanto a resposta pode variar. Para extração, classificação e outputs de produção, geralmente queremos consistência. Para ideação, podemos aceitar mais variação.',
      technical: 'Temperature interage com task design, schema, validação e retries. Em sistemas downstream, previsibilidade vale mais que criatividade; em brainstorming, diversidade pode ser útil.',
      simple: 'É como regular o quanto o aluno pode improvisar na resposta.',
      steps: ['Defina tipo de tarefa.', 'Avalie risco.', 'Escolha baixa para extração.', 'Teste variação.', 'Documente padrão.'],
      practice: 'Compare uma resposta de classificação com temperature baixa e uma de brainstorming com variação maior.',
      exam: 'Se o cenário exige output estável, aumentar temperature normalmente é escolha errada.',
      links: ['academy/02-building-with-claude-api.md', 'docs/14-modulo-prompt-structured-output.md'],
      resources: ['DOC-03'],
      videos: ['YT-02']
    },
    {
      id: 'api-streaming',
      module: 'api',
      level: 'praticante',
      duration: '45 min',
      title: 'Response streaming',
      objective: 'Usar streaming para melhorar UX sem quebrar loops de tools.',
      normal: 'Streaming permite mostrar a resposta enquanto ela é gerada. Isso ajuda usuários em respostas longas, mas exige cuidado com estados parciais.',
      technical: 'A aplicação deve processar eventos, diferenciar conteúdo parcial de blocos de tool, tratar finalização e evitar salvar resposta incompleta como resultado definitivo.',
      simple: 'É assistir a resposta sendo digitada, mas só considerar final quando ela termina.',
      steps: ['Abra stream.', 'Renderize deltas.', 'Detecte tool blocks.', 'Finalize estado.', 'Trate erro parcial.'],
      practice: 'Desenhe uma UI que mostra streaming e bloqueia botão de enviar até finalizar.',
      exam: 'Streaming melhora experiência, mas não substitui validação de saída.',
      links: ['academy/02-building-with-claude-api.md'],
      resources: ['DOC-03'],
      videos: []
    },
    {
      id: 'api-xml-tags-examples',
      module: 'api',
      level: 'praticante',
      duration: '50 min',
      title: 'XML tags e exemplos no prompt',
      objective: 'Estruturar contexto, tarefa, critérios e exemplos para reduzir ambiguidade.',
      normal: 'Tags ajudam a separar partes do prompt: contexto, tarefa, formato e exemplos. Isso deixa a instrução mais legível para humanos e modelos.',
      technical: 'Delimitação reduz mistura entre dados e instruções. Few-shot examples calibram saída, mas devem cobrir casos positivos, negativos e ambíguos.',
      simple: 'É colocar etiquetas nas caixas para ninguém confundir material com instrução.',
      steps: ['Separe contexto.', 'Separe tarefa.', 'Defina formato.', 'Inclua exemplo bom.', 'Inclua contraexemplo.'],
      practice: 'Reescreva um prompt de extração usando `<context>`, `<task>`, `<schema>` e `<examples>`.',
      exam: 'Prompt claro reduz erro, mas regra crítica ainda precisa de código/schema/hook.',
      links: ['docs/14-modulo-prompt-structured-output.md', 'drills/01-drills-academy.md'],
      resources: ['DOC-03', 'DOC-12'],
      videos: ['YT-02']
    },
    {
      id: 'api-eval-dataset',
      module: 'api',
      level: 'arquiteto',
      duration: '55 min',
      title: 'Datasets de avaliação',
      objective: 'Criar conjuntos de teste que representem casos reais, borda e adversariais.',
      normal: 'Um eval fraco só testa exemplos fáceis. Um eval útil testa o que realmente quebra em produção.',
      technical: 'Datasets devem cobrir distribuição real, casos raros, entradas ambíguas, campos ausentes, conflitos, erro de permissão e expected outputs verificáveis.',
      simple: 'Não treine só com prova fácil; coloque também pegadinhas parecidas com a vida real.',
      steps: ['Liste cenários comuns.', 'Liste bordas.', 'Liste falhas.', 'Defina esperado.', 'Versione dataset.'],
      practice: 'Crie 20 casos para extração de contrato com campos ausentes e conflitantes.',
      exam: 'Avaliar só exemplos felizes dá falsa confiança.',
      links: ['course/04-especialista.md', 'docs/14-modulo-prompt-structured-output.md'],
      resources: ['DOC-12'],
      videos: []
    },
    {
      id: 'api-model-based-grading',
      module: 'api',
      level: 'especialista',
      duration: '55 min',
      title: 'Model-based grading',
      objective: 'Usar modelo como juiz com rubrica, calibração e revisão humana.',
      normal: 'Um modelo pode avaliar respostas, mas precisa de critérios claros. Sem rubrica, ele vira opinião.',
      technical: 'Grader model deve receber critérios, exemplos calibrados, escala, evidência e casos de controle. Métricas precisam ser auditadas contra amostra humana.',
      simple: 'É pedir para outro professor corrigir, mas entregando gabarito e critérios.',
      steps: ['Escreva rubrica.', 'Inclua exemplos.', 'Rode amostra.', 'Compare com humano.', 'Ajuste limiar.'],
      practice: 'Crie rubrica para avaliar resumo técnico com precisão, completude e fontes.',
      exam: 'Model grader sem calibração não é garantia de qualidade.',
      links: ['docs/14-modulo-prompt-structured-output.md', 'course/04-especialista.md'],
      resources: ['DOC-12'],
      videos: []
    },
    {
      id: 'api-code-based-grading',
      module: 'api',
      level: 'arquiteto',
      duration: '50 min',
      title: 'Code-based grading',
      objective: 'Validar automaticamente aquilo que pode ser medido de forma determinística.',
      normal: 'Quando dá para checar por código, prefira código. Schema válido, campo obrigatório e enum correto não dependem de opinião.',
      technical: 'Combine JSON Schema, testes unitários, validação de tipos, constraints de negócio, diff de saída e retry automático em erro recuperável.',
      simple: 'Se o formulário exige CPF, o sistema pode conferir se o campo existe antes de alguém ler.',
      steps: ['Defina regra objetiva.', 'Escreva validador.', 'Rode resposta.', 'Classifique erro.', 'Faça retry se possível.'],
      practice: 'Crie validador para saída com `category`, `confidence` e `evidence_text`.',
      exam: 'Use model judge para subjetivo; use código para objetivo.',
      links: ['examples/04-structured-output-10-exemplos.md', 'labs/lab-04-structured-output.md'],
      resources: ['DOC-12'],
      videos: []
    },
    {
      id: 'api-evals',
      module: 'api',
      level: 'arquiteto',
      duration: '60 min',
      title: 'Prompt evaluation',
      objective: 'Medir qualidade de prompts com dataset, métrica e critério de decisão.',
      normal: 'Não basta achar que um prompt melhorou. Você precisa comparar respostas contra casos de teste e medir erro.',
      technical: 'Evals combinam dataset representativo, baseline, métrica determinística ou rubrica model-based, regressão e decisão de release.',
      simple: 'É uma prova para o prompt antes de colocá-lo em produção.',
      steps: ['Crie dataset.', 'Rode baseline.', 'Altere prompt.', 'Rode novamente.', 'Compare métricas.'],
      practice: 'Monte 15 casos para classificar tickets e defina F1 por categoria.',
      exam: 'Model-based grading precisa de rubrica e calibração; não é verdade absoluta.',
      links: ['docs/14-modulo-prompt-structured-output.md', 'course/04-especialista.md'],
      resources: ['DOC-12'],
      videos: []
    },
    {
      id: 'api-tool-use',
      module: 'api',
      level: 'praticante',
      duration: '70 min',
      title: 'Tool use com Claude',
      objective: 'Implementar loop `tool_use` -> execução -> `tool_result` -> nova chamada.',
      normal: 'Claude pode pedir uma ferramenta quando precisa de dado externo ou ação. A aplicação executa e devolve o resultado para Claude continuar.',
      technical: 'O contrato exige schema claro, tool result correlacionado, erro estruturado, controle de permissões e loop até `end_turn`.',
      simple: 'O assistente pede para consultar o sistema; você traz o resultado e ele responde com base nele.',
      steps: ['Defina tool.', 'Receba `tool_use`.', 'Execute.', 'Anexe `tool_result`.', 'Chame Claude novamente.'],
      practice: 'Simule `lookup_order` seguido de resposta de elegibilidade de refund.',
      exam: 'Não devolver tool result ao histórico quebra o raciocínio do próximo turno.',
      links: ['examples/01-agentic-orchestration-10-exemplos.md', 'docs/12-modulo-mcp-tool-design.md'],
      resources: ['DOC-05', 'DOC-06'],
      videos: ['YT-11']
    },
    {
      id: 'api-tool-schemas',
      module: 'api',
      level: 'praticante',
      duration: '55 min',
      title: 'Tool schemas',
      objective: 'Projetar schemas que guiam o modelo e protegem a aplicação.',
      normal: 'Schema define que dados a tool aceita. Quanto mais claro o contrato, menor a chance de argumento errado.',
      technical: 'Use tipos específicos, required, enum, descrições por campo, limites, validação server-side e erros estruturados. Evite `object` aberto quando há contrato conhecido.',
      simple: 'É um formulário com campos certos, em vez de uma caixa vazia para escrever qualquer coisa.',
      steps: ['Liste parâmetros.', 'Defina tipo.', 'Defina obrigatório.', 'Adicione descrição.', 'Teste input ruim.'],
      practice: 'Transforme `payload: object` em schema para `lookup_order`.',
      exam: 'Schema aberto demais costuma ser anti-pattern.',
      links: ['docs/12-modulo-mcp-tool-design.md', 'examples/02-mcp-tools-10-exemplos.md'],
      resources: ['DOC-06', 'DOC-12'],
      videos: ['YT-11']
    },
    {
      id: 'api-tool-errors',
      module: 'api',
      level: 'praticante',
      duration: '50 min',
      title: 'Erros estruturados de tools',
      objective: 'Retornar falhas que o agente consegue interpretar e recuperar.',
      normal: 'Erro “failed” não ajuda. O agente precisa saber se pode tentar de novo, pedir outro dado ou escalar.',
      technical: 'Categorias úteis: transient, validation, permission, business_rule, not_found, conflict e unsafe. Inclua `retryable` e `next_action`.',
      simple: 'Não diga só “deu ruim”; diga se deve tentar de novo ou chamar alguém.',
      steps: ['Classifique erro.', 'Defina retryable.', 'Inclua mensagem segura.', 'Defina próxima ação.', 'Teste recuperação.'],
      practice: 'Reescreva seis erros livres em JSON estruturado.',
      exam: 'Timeout pode ter retry; regra de negócio bloqueada normalmente não.',
      links: ['course/02-praticante.md', 'drills/01-drills-academy.md'],
      resources: ['DOC-05'],
      videos: ['YT-11']
    },
    {
      id: 'api-multiple-tools',
      module: 'api',
      level: 'arquiteto',
      duration: '65 min',
      title: 'Multi-turn com múltiplas tools',
      objective: 'Controlar sequência, dependência e permissões em workflows com várias tools.',
      normal: 'Algumas tarefas precisam de várias consultas e ações. O agente deve chamar uma tool, observar resultado e só então decidir a próxima.',
      technical: 'O orquestrador precisa preservar tool_use/tool_result, impor least privilege, evitar tool sprawl e controlar ações mutating com gates.',
      simple: 'Primeiro olha o pedido, depois calcula reembolso, depois pede aprovação se precisar.',
      steps: ['Liste etapas.', 'Defina tools por etapa.', 'Controle resultado.', 'Aplique gates.', 'Finalize com resumo.'],
      practice: 'Modele agente de suporte com lookup, policy, eligibility e approval.',
      exam: 'Expor todas as tools o tempo todo aumenta confusão e risco.',
      links: ['examples/01-agentic-orchestration-10-exemplos.md', 'examples/02-mcp-tools-10-exemplos.md'],
      resources: ['DOC-05', 'DOC-07', 'DOC-08'],
      videos: ['YT-11']
    },
    {
      id: 'api-rag',
      module: 'api',
      level: 'arquiteto',
      duration: '75 min',
      title: 'RAG e Agentic Search',
      objective: 'Entender recuperação, chunking, busca lexical/semântica, citações e resposta grounded.',
      normal: 'RAG busca documentos relevantes antes de responder. Isso reduz chute, mas não substitui autorização nem validação.',
      technical: 'Um pipeline robusto combina chunking, embeddings, BM25, re-ranking, filtros de permissão, citations, score de confiança e fallback/handoff.',
      simple: 'Antes de responder, Claude consulta a biblioteca e mostra de onde tirou a informação.',
      steps: ['Quebre documentos.', 'Indexe.', 'Busque.', 'Re-ranqueie.', 'Responda com citações.'],
      practice: 'Desenhe um RAG para políticas, tickets e documentação técnica usando índices separados.',
      exam: 'RAG não é controle de acesso. Recuperar dado não significa poder mostrá-lo.',
      links: ['docs/15-modulo-context-reliability.md', 'academy/02-building-with-claude-api.md'],
      resources: ['DOC-17', 'DOC-18'],
      videos: ['YT-20']
    },
    {
      id: 'api-chunking',
      module: 'api',
      level: 'arquiteto',
      duration: '55 min',
      title: 'Chunking de documentos',
      objective: 'Dividir documentos para busca sem perder significado.',
      normal: 'Chunk pequeno demais perde contexto; chunk grande demais traz ruído. A divisão precisa respeitar seções e sentido.',
      technical: 'Combine tamanho, overlap, headings, metadata, tipos de documento e estratégia de recuperação. Em PDFs, preserve página e seção para citação.',
      simple: 'Cortar um livro no meio de uma frase atrapalha quem vai estudar.',
      steps: ['Identifique estrutura.', 'Defina tamanho.', 'Inclua overlap.', 'Guarde metadata.', 'Teste recuperação.'],
      practice: 'Compare chunk por parágrafo, por seção e por tamanho fixo.',
      exam: 'Chunking ruim causa respostas fora de contexto mesmo com bom modelo.',
      links: ['docs/15-modulo-context-reliability.md'],
      resources: ['DOC-15', 'DOC-17'],
      videos: ['YT-20']
    },
    {
      id: 'api-bm25-embeddings',
      module: 'api',
      level: 'arquiteto',
      duration: '60 min',
      title: 'BM25, embeddings e multi-index',
      objective: 'Escolher busca lexical, semântica ou híbrida conforme o dado.',
      normal: 'BM25 é bom para termos exatos. Embeddings são bons para significado. Sistemas reais costumam combinar os dois.',
      technical: 'IDs, nomes, códigos e erros exatos favorecem lexical. Perguntas conceituais favorecem vetores. Multi-index separa docs, tickets, código e políticas.',
      simple: 'Às vezes você procura pelo nome exato; às vezes procura por ideia parecida.',
      steps: ['Classifique fonte.', 'Escolha índice.', 'Defina filtros.', 'Combine resultados.', 'Cite fontes.'],
      practice: 'Desenhe busca híbrida para documentação, tickets e código.',
      exam: 'Embedding não substitui autorização nem garante resposta correta.',
      links: ['academy/02-building-with-claude-api.md', 'docs/15-modulo-context-reliability.md'],
      resources: ['DOC-17', 'DOC-18'],
      videos: ['YT-20']
    },
    {
      id: 'api-pdf-citations-cache',
      module: 'api',
      level: 'arquiteto',
      duration: '70 min',
      title: 'PDF, citações e prompt caching',
      objective: 'Usar documentos longos com custo controlado e proveniência.',
      normal: 'PDFs e contexto longo são úteis, mas caros. Citações ajudam auditoria; cache reduz custo quando o mesmo contexto se repete.',
      technical: 'O desenho correto combina PDF processing, prompt caching, cache diagnostics, claims com fonte, compactação e token counting.',
      simple: 'Você coloca o livro na mesa, marca as páginas usadas e reaproveita o livro quando continuar estudando.',
      steps: ['Anexe PDF necessário.', 'Peça citações.', 'Cacheie contexto estável.', 'Meça tokens.', 'Valide claims.'],
      practice: 'Pegue uma política longa e peça resumo com fonte por afirmação.',
      exam: 'Sem proveniência, relatórios multi-fonte perdem auditabilidade.',
      links: ['docs/20-estimativa-custos-token.md', 'docs/15-modulo-context-reliability.md'],
      resources: ['DOC-13', 'DOC-15', 'DOC-18', 'DOC-19'],
      videos: ['YT-02']
    },
    {
      id: 'mcp-intro',
      module: 'mcp',
      level: 'fundamentos',
      duration: '50 min',
      title: 'Introdução ao MCP',
      objective: 'Entender MCP como protocolo para conectar Claude a ferramentas, recursos e prompts.',
      normal: 'MCP padroniza a forma de expor capacidades externas. Em vez de cada app inventar uma integração, servidores MCP anunciam capabilities para clientes.',
      technical: 'A arquitetura separa client, server, tools, resources, prompts, discovery, schemas e transporte. O servidor implementa; o cliente consome.',
      simple: 'É uma tomada padrão para conectar Claude a sistemas externos.',
      steps: ['Identifique client.', 'Identifique server.', 'Liste capabilities.', 'Separe tool/resource/prompt.', 'Teste contrato.'],
      practice: 'Classifique 10 capacidades como tool, resource ou prompt.',
      exam: 'MCP não substitui autorização nem validação de negócio.',
      links: ['academy/03-model-context-protocol.md', 'examples/02-mcp-tools-10-exemplos.md'],
      resources: ['HELP-03'],
      videos: ['YT-13', 'YT-14']
    },
    {
      id: 'mcp-tools',
      module: 'mcp',
      level: 'praticante',
      duration: '65 min',
      title: 'Definindo tools com MCP',
      objective: 'Criar tools específicas, seguras e fáceis para o modelo escolher.',
      normal: 'Uma tool boa tem nome específico, descrição clara, schema fechado, erro estruturado e limite de permissão.',
      technical: 'Separe read-only de mutating, use least privilege, aplique gates, retorne audit ID, normalize erros e teste seleção do modelo.',
      simple: 'Botões diferentes para ações diferentes, com rótulo claro e trava quando necessário.',
      steps: ['Nomeie intenção.', 'Defina risco.', 'Crie schema.', 'Defina erro.', 'Teste seleção.'],
      practice: 'Reescreva uma tool `manage_customer` em cinco tools específicas.',
      exam: 'Se duas ações têm risco diferente, normalmente devem ser tools diferentes.',
      links: ['docs/12-modulo-mcp-tool-design.md', 'labs/lab-02-mcp-tools.md'],
      resources: ['DOC-06'],
      videos: ['YT-11', 'YT-13']
    },
    {
      id: 'mcp-project-setup',
      module: 'mcp',
      level: 'praticante',
      duration: '55 min',
      title: 'Setup de projeto MCP',
      objective: 'Estruturar servidor MCP testável, documentado e seguro.',
      normal: 'Projeto MCP precisa ser fácil de rodar, testar e auditar. Separe server, tools, resources, prompts e validação.',
      technical: 'Use estrutura modular, `.env.example`, testes de tools, redaction de logs, schemas versionados e README de instalação.',
      simple: 'Antes de criar botões, organize a bancada e etiquete cada peça.',
      steps: ['Criar projeto.', 'Registrar server.', 'Adicionar tool read-only.', 'Adicionar resource.', 'Testar inspector.'],
      practice: 'Desenhe árvore de diretórios para MCP server de suporte.',
      exam: 'Servidor que expõe tudo sem escopo quebra least privilege.',
      links: ['academy/03-model-context-protocol.md', 'labs/lab-02-mcp-tools.md'],
      resources: ['HELP-03'],
      videos: ['YT-11', 'YT-13']
    },
    {
      id: 'mcp-resources-prompts',
      module: 'mcp',
      level: 'praticante',
      duration: '55 min',
      title: 'Resources e prompts MCP',
      objective: 'Diferenciar contexto legível de workflow reutilizável.',
      normal: 'Resource é dado ou documento. Prompt é modelo de trabalho. Tool executa ação. Cada primitiva tem função própria.',
      technical: 'Resources precisam de URI, escopo, metadata e controle de acesso. Prompts precisam de argumentos, formato e critérios de saída.',
      simple: 'Manual, formulário e botão não são a mesma coisa.',
      steps: ['Liste dados.', 'Defina URIs.', 'Modele prompts.', 'Evite secrets.', 'Teste cliente.'],
      practice: 'Crie resource de política e prompt de handoff para suporte.',
      exam: 'Política estática tende a ser resource; resumo de handoff tende a ser prompt.',
      links: ['academy/03-model-context-protocol.md', 'drills/01-drills-academy.md'],
      resources: ['DOC-17', 'HELP-03'],
      videos: ['YT-13', 'YT-14']
    },
    {
      id: 'mcp-client-inspector',
      module: 'mcp',
      level: 'arquiteto',
      duration: '60 min',
      title: 'Client, server inspector e revisão MCP',
      objective: 'Testar servidor MCP antes de integrar ao fluxo real.',
      normal: 'O inspector ajuda a ver se tools, resources e prompts aparecem corretamente e se falham de modo seguro.',
      technical: 'Valide inicialização, capability discovery, schema, input inválido, erro transitório, permissão, logs e ausência de secrets.',
      simple: 'Antes de abrir a loja, teste se todos os botões funcionam e se os perigosos têm trava.',
      steps: ['Suba servidor.', 'Liste capabilities.', 'Chame tool válida.', 'Chame input inválido.', 'Revise logs.'],
      practice: 'Monte checklist de 20 itens para revisar um MCP server.',
      exam: 'Inspector não substitui testes automatizados, mas pega erros de contrato cedo.',
      links: ['academy/03-model-context-protocol.md', 'recursos-ptbr/matriz-aulas-claude-ptbr.md'],
      resources: ['HELP-03'],
      videos: ['YT-11']
    },
    {
      id: 'mcp-final-assessment',
      module: 'mcp',
      level: 'especialista',
      duration: '60 min',
      title: 'Assessment final de MCP',
      objective: 'Revisar MCP como arquitetura completa de integração.',
      normal: 'Dominar MCP é saber escolher tool, resource ou prompt e explicar riscos de cada um.',
      technical: 'A avaliação deve cobrir discovery, schemas, errors, recursos, prompts, clients, inspector, logs, secrets, permissões e mutating actions.',
      simple: 'Você precisa saber quando abrir manual, quando apertar botão e quando usar formulário.',
      steps: ['Classifique capacidades.', 'Desenhe contrato.', 'Teste erro.', 'Revise segurança.', 'Explique tradeoff.'],
      practice: 'Faça o simulado Academy de MCP e Claude Code.',
      exam: 'A prova cobra decisão, não decoração de nomes.',
      links: ['practice/simulado-academy-mcp-claude-code-40-questoes.md', 'academy/05-matriz-cobertura-learning-path.md'],
      resources: ['DOC-05', 'DOC-06', 'HELP-03'],
      videos: ['YT-13', 'YT-14']
    },
    {
      id: 'code-intro',
      module: 'code',
      level: 'fundamentos',
      duration: '45 min',
      title: 'O que é Claude Code',
      objective: 'Entender Claude Code como agente de desenvolvimento dentro do projeto.',
      normal: 'Claude Code lê arquivos, entende contexto, edita, roda comandos e itera. Ele não é só chat nem substitui testes.',
      technical: 'A segurança vem de escopo, estado Git, permissões, hooks, validação, comandos e preservação de mudanças existentes.',
      simple: 'É um par de programação que olha o projeto e trabalha com você.',
      steps: ['Abra projeto.', 'Cheque Git.', 'Busque arquivos.', 'Leia contexto.', 'Edite e valide.'],
      practice: 'Peça para explicar uma pasta sem alterar nada e avalie o resumo.',
      exam: 'Em repo desconhecido, explorar seletivamente vem antes de editar.',
      links: ['academy/04-claude-code-em-acao.md', 'examples/03-claude-code-10-exemplos.md'],
      resources: ['HELP-04', 'ART-03'],
      videos: ['YT-03', 'YT-04', 'YT-05']
    },
    {
      id: 'code-setup-context',
      module: 'code',
      level: 'praticante',
      duration: '60 min',
      title: 'Setup, CLAUDE.md e controle de contexto',
      objective: 'Preparar projeto para Claude Code com memória, comandos e limites.',
      normal: '`CLAUDE.md` guarda instruções estáveis. Contexto deve ser suficiente, não infinito. O assistente precisa saber comandos, arquitetura e restrições.',
      technical: 'Combine memória de projeto, rules por caminho, busca seletiva, resumos, MCP resources e revalidação de sessão antiga.',
      simple: 'Antes de chamar alguém para ajudar, entregue o manual da casa e diga onde estão as ferramentas.',
      steps: ['Criar CLAUDE.md.', 'Listar comandos.', 'Definir regras por pasta.', 'Buscar seletivamente.', 'Revalidar antes de editar.'],
      practice: 'Escreva um `CLAUDE.md` mínimo para este repo.',
      exam: 'Contexto velho pode estar obsoleto; revalide arquivos relevantes.',
      links: ['docs/13-modulo-claude-code-workflows.md', 'academy/04-claude-code-em-acao.md'],
      resources: ['HELP-01', 'HELP-03', 'DOC-19'],
      videos: ['YT-03', 'YT-17']
    },
    {
      id: 'code-making-changes',
      module: 'code',
      level: 'praticante',
      duration: '55 min',
      title: 'Making changes com segurança',
      objective: 'Fazer alterações pequenas, verificáveis e fáceis de revisar.',
      normal: 'Claude Code deve entender antes de editar, manter escopo e validar depois. Mudança boa não mistura feature, refactor e formatação desnecessária.',
      technical: 'O fluxo é status Git, busca, leitura seletiva, plano se necessário, edit mínimo, teste relevante, diff review e resumo de lacunas.',
      simple: 'Mexa só no parafuso certo e confira se a máquina voltou a funcionar.',
      steps: ['Checar Git.', 'Localizar arquivo.', 'Editar mínimo.', 'Rodar teste.', 'Resumir diff.'],
      practice: 'Simule correção de validação sem tocar arquivos não relacionados.',
      exam: 'Editar primeiro e entender depois é anti-pattern.',
      links: ['examples/03-claude-code-10-exemplos.md', 'academy/04-claude-code-em-acao.md'],
      resources: ['HELP-04', 'HELP-01'],
      videos: ['YT-03', 'YT-18']
    },
    {
      id: 'code-commands-skills',
      module: 'code',
      level: 'praticante',
      duration: '55 min',
      title: 'Commands, Skills e workflows repetíveis',
      objective: 'Transformar tarefas repetidas em comandos e capacidades reutilizáveis.',
      normal: 'Command é um workflow invocável. Skill é conhecimento especializado sob demanda. Os dois reduzem variação e ajudam times.',
      technical: 'Commands definem entrada, passos, tools permitidas, formato e critério de saída. Skills carregam referências e instruções quando relevantes.',
      simple: 'Command é receita; Skill é manual especializado.',
      steps: ['Escolha workflow.', 'Defina entrada.', 'Defina passos.', 'Defina output.', 'Teste em caso real.'],
      practice: 'Crie `/review-pr` com critérios de bug, severidade e evidência.',
      exam: 'Workflow repetido pede command; conhecimento especializado pede Skill.',
      links: ['examples/03-claude-code-10-exemplos.md', 'drills/01-drills-academy.md'],
      resources: ['HELP-03'],
      videos: ['YT-09']
    },
    {
      id: 'code-hooks',
      module: 'code',
      level: 'arquiteto',
      duration: '65 min',
      title: 'Hooks e garantias determinísticas',
      objective: 'Usar hooks para bloquear, validar, formatar, auditar e reduzir risco.',
      normal: 'Hook é uma regra automática em um ponto do fluxo. Ele serve para aquilo que precisa ser garantido, não apenas sugerido.',
      technical: 'Hooks precisam normalizar input, evitar string matching frágil, registrar sem secrets, distinguir warn/deny e ter teste.',
      simple: 'É a trava da porta. O assistente pode pedir para passar, mas a trava decide.',
      steps: ['Escolha evento.', 'Defina regra.', 'Teste allow.', 'Teste deny.', 'Documente falso positivo.'],
      practice: 'Desenhe hook que bloqueia comando destrutivo fora do workspace.',
      exam: 'Se precisa bloquear antes de executar, hook/gate é mais forte que prompt.',
      links: ['academy/04-claude-code-em-acao.md', 'docs/13-modulo-claude-code-workflows.md'],
      resources: ['HELP-03', 'HELP-01'],
      videos: ['YT-05', 'YT-18']
    },
    {
      id: 'code-hook-gotchas',
      module: 'code',
      level: 'especialista',
      duration: '55 min',
      title: 'Gotchas de hooks',
      objective: 'Evitar hooks frágeis que quebram fluxo legítimo ou vazam dados.',
      normal: 'Hook mal escrito atrapalha. Ele pode bloquear comando seguro, vazar segredo em log ou criar falso senso de segurança.',
      technical: 'Evite substring matching ingênuo, normalize paths, separe warn/deny, teste bypass, redija logs e documente exceções.',
      simple: 'Uma trava ruim prende quem tem chave e deixa passar quem não deveria.',
      steps: ['Liste falso positivo.', 'Normalize input.', 'Teste bypass.', 'Redija logs.', 'Documente exceção.'],
      practice: 'Critique hook que bloqueia qualquer comando contendo `rm`.',
      exam: 'Hook forte precisa ser específico, testável e observável.',
      links: ['academy/04-claude-code-em-acao.md', 'drills/01-drills-academy.md'],
      resources: ['HELP-03'],
      videos: ['YT-18']
    },
    {
      id: 'code-github-sdk',
      module: 'code',
      level: 'arquiteto',
      duration: '70 min',
      title: 'GitHub, CI e Claude Code SDK',
      objective: 'Projetar review automatizado útil, com baixo falso positivo e saída estruturada.',
      normal: 'Claude pode ajudar em PRs, issues e CI, mas precisa de critérios claros. Review barulhento vira ruído e perde confiança.',
      technical: 'Use diff, schema JSON, severidade, evidência, confidence, limiar de bloqueio e dataset histórico para calibrar falso positivo.',
      simple: 'O revisor automático deve apontar bug real com prova, não opinião solta.',
      steps: ['Limite ao diff.', 'Defina critérios.', 'Peça JSON.', 'Valide schema.', 'Meça falso positivo.'],
      practice: 'Escreva schema de finding para revisão de PR.',
      exam: 'Bloquear PR por comentário subjetivo é anti-pattern.',
      links: ['docs/13-modulo-claude-code-workflows.md', 'practice/simulado-academy-mcp-claude-code-40-questoes.md'],
      resources: ['HELP-04', 'HELP-01'],
      videos: ['YT-05', 'YT-18']
    },
    {
      id: 'practice-examples',
      module: 'practice',
      level: 'praticante',
      duration: '90 min',
      title: '50 exemplos passo a passo',
      objective: 'Executar exemplos por capacidade: agentes, MCP, Claude Code, structured output e confiabilidade.',
      normal: 'Exemplos transformam teoria em decisão. Leia situação, siga passo a passo, responda o critério de prova e reescreva com suas palavras.',
      technical: 'Cada exemplo treina um padrão arquitetural: loops, schemas, gates, subagentes, context management, retries e handoffs.',
      simple: 'É a oficina prática depois da aula.',
      steps: ['Escolha módulo.', 'Leia exemplo.', 'Explique decisão.', 'Faça variação.', 'Registre erro.'],
      practice: 'Execute um exemplo de cada pasta `examples/`.',
      exam: 'A prova cobra cenário; exemplos treinam cenário.',
      links: ['examples/01-agentic-orchestration-10-exemplos.md', 'examples/02-mcp-tools-10-exemplos.md', 'examples/04-structured-output-10-exemplos.md'],
      resources: [],
      videos: []
    },
    {
      id: 'practice-simulado',
      module: 'practice',
      level: 'especialista',
      duration: '120 min',
      title: 'Simulados, drills e capstone',
      objective: 'Medir prontidão com questões bilíngues, drills repetitivos e projeto final.',
      normal: 'A leitura só vira domínio quando você erra, corrige e refaz. Use simulados para descobrir lacunas e capstone para integrar tudo.',
      technical: 'O ciclo final é: simulado -> análise de erro -> revisão do módulo -> drill -> novo simulado -> capstone com rubrica.',
      simple: 'É a prova simulada da escola e o trabalho final.',
      steps: ['Faça simulado.', 'Corrija com gabarito.', 'Classifique erro.', 'Reestude tópico.', 'Faça capstone.'],
      practice: 'Faça 30 questões e registre erros por domínio.',
      exam: 'Você está pronto quando justifica por que as alternativas erradas são erradas.',
      links: ['practice/simulado-bilingue-30-questoes.md', 'practice/simulado-academy-mcp-claude-code-40-questoes.md', 'course/05-avaliacoes-rubricas-capstone.md'],
      resources: [],
      videos: []
    }
  ]
};
