const contentEl = document.getElementById('libraryContent');
const sidebarEl = document.getElementById('librarySidebar');
const searchEl = document.getElementById('librarySearch');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitRoute(hashValue) {
  const raw = decodeURIComponent((hashValue || '#/README.md').replace(/^#\/?/, ''));
  const hashIndex = raw.indexOf('#');
  const route = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw;
  const anchor = hashIndex >= 0 ? raw.slice(hashIndex + 1) : '';
  return { route, anchor };
}

function normalizePath(value) {
  const cleaned = String(value || '')
    .replace(/^docsify\.html#\/?/, '')
    .replace(/^\.?\//, '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');

  if (!cleaned || cleaned === '#') {
    return 'README.md';
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(cleaned) || cleaned.startsWith('//') || cleaned.includes('..')) {
    return 'README.md';
  }

  if (cleaned.endsWith('/')) {
    return `${cleaned}README.md`;
  }

  return cleaned;
}

function currentRoute() {
  const parsed = splitRoute(window.location.hash);
  return {
    route: normalizePath(parsed.route || 'README.md'),
    anchor: parsed.anchor
  };
}

function isExternalLink(href) {
  return /^(https?:|mailto:|tel:)/i.test(href || '');
}

function toLibraryHref(href) {
  const raw = String(href || '').trim();
  if (!raw) {
    return '#/README.md';
  }

  if (isExternalLink(raw)) {
    return raw;
  }

  if (raw.startsWith('#') && !raw.startsWith('#/')) {
    const route = currentRoute().route;
    return `#/${route}${raw}`;
  }

  if (raw.startsWith('#/')) {
    return raw;
  }

  if (raw.includes('.md') || raw.startsWith('.claude/') || raw.startsWith('docsify.html#/')) {
    return `#/${normalizePath(raw)}`;
  }

  return raw;
}

function renderInline(rawText) {
  let text = String(rawText || '');
  const codeTokens = [];
  const linkTokens = [];

  text = text.replace(/`([^`]+)`/g, (_, code) => {
    const marker = `@@CODE_${codeTokens.length}@@`;
    codeTokens.push(`<code>${escapeHtml(code)}</code>`);
    return marker;
  });

  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const marker = `@@LINK_${linkTokens.length}@@`;
    const normalized = toLibraryHref(href);
    const external = isExternalLink(normalized);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    linkTokens.push(`<a href="${escapeHtml(normalized)}"${attrs}>${renderInline(label)}</a>`);
    return marker;
  });

  text = escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

  linkTokens.forEach((html, index) => {
    text = text.replace(`@@LINK_${index}@@`, html);
  });
  codeTokens.forEach((html, index) => {
    text = text.replace(`@@CODE_${index}@@`, html);
  });

  return text;
}

function isBlockStart(line) {
  return (
    /^#{1,6}\s+/.test(line) ||
    /^```/.test(line) ||
    /^\s*[-*]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    /^>\s?/.test(line) ||
    /^\s*\|.+\|\s*$/.test(line) ||
    /^---+$/.test(line.trim())
  );
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line))
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim())
    );

  if (!rows.length) {
    return '';
  }

  const head = rows.shift();
  const header = `<thead><tr>${head.map((cell) => `<th>${renderInline(cell)}</th>`).join('')}</tr></thead>`;
  const body = rows.length
    ? `<tbody>${rows
        .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`)
        .join('')}</tbody>`
    : '';
  return `<table>${header}${body}</table>`;
}

function renderMarkdown(markdown) {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (/^```/.test(line)) {
      const language = line.replace(/^```/, '').trim();
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      html.push(`<pre><code class="language-${escapeHtml(language)}">${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].replace(/\s+#+$/, '').trim();
      const id = slugify(title);
      html.push(`<h${level} id="${escapeHtml(id)}">${renderInline(title)}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      html.push('<hr />');
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      html.push(`<blockquote>${renderMarkdown(quote.join('\n'))}</blockquote>`);
      continue;
    }

    if (/^\s*\|.+\|\s*$/.test(line) && index + 1 < lines.length && /\|\s*:?-{3,}:?\s*\|/.test(lines[index + 1])) {
      const table = [];
      while (index < lines.length && /^\s*\|.+\|\s*$/.test(lines[index])) {
        table.push(lines[index]);
        index += 1;
      }
      html.push(renderTable(table));
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      html.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
        index += 1;
      }
      html.push(`<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ol>`);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  }

  return html.join('\n');
}

function renderSidebar(markdown) {
  const links = [];
  const rows = String(markdown || '').split('\n');

  rows.forEach((line) => {
    const match = line.match(/^(\s*)[*-]\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (!match) {
      return;
    }

    const depth = Math.min(4, Math.floor(match[1].length / 2));
    const label = match[2];
    const href = toLibraryHref(match[3]);
    links.push({ depth, label, href });
  });

  sidebarEl.innerHTML = links
    .map((link) => {
      const route = normalizePath(link.href.replace(/^#\//, ''));
      return `<a class="side-link depth-${link.depth}" data-route="${escapeHtml(route)}" data-text="${escapeHtml(
        link.label.toLowerCase()
      )}" href="${escapeHtml(link.href)}">${renderInline(link.label)}</a>`;
    })
    .join('');
}

async function fetchText(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.text();
}

function renderError(route, error) {
  contentEl.innerHTML = `
    <section class="library-error">
      <h1>Conteudo nao encontrado</h1>
      <p>A rota <code>${escapeHtml(route)}</code> nao carregou. Isso indica link quebrado, arquivo nao publicado ou caminho incorreto.</p>
      <p>Erro tecnico: <code>${escapeHtml(error.message || error)}</code></p>
      <p><a href="#/README.md">Voltar para a visao geral</a></p>
    </section>
  `;
}

async function loadPage() {
  const { route, anchor } = currentRoute();
  try {
    const markdown = await fetchText(route);
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].replace(/\s+#+$/, '').trim() : route;
    document.title = `${title} | Biblioteca Claude Architect PT-BR`;
    contentEl.innerHTML = `<span class="route-label">${escapeHtml(route)}</span>${renderMarkdown(markdown)}`;

    sidebarEl.querySelectorAll('.side-link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('data-route') === route);
    });

    if (anchor) {
      window.requestAnimationFrame(() => {
        document.getElementById(anchor)?.scrollIntoView({ block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  } catch (error) {
    renderError(route, error);
  }
}

async function init() {
  try {
    renderSidebar(await fetchText('_sidebar.md'));
  } catch (error) {
    sidebarEl.innerHTML = `<p class="library-error">Indice nao carregado: ${escapeHtml(error.message || error)}</p>`;
  }

  searchEl?.addEventListener('input', () => {
    const term = searchEl.value.trim().toLowerCase();
    sidebarEl.querySelectorAll('.side-link').forEach((link) => {
      const matches = !term || link.getAttribute('data-text').includes(term);
      link.hidden = !matches;
    });
  });

  window.addEventListener('hashchange', loadPage);
  await loadPage();
}

init();
