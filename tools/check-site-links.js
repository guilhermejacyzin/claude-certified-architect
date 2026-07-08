const fs = require('fs');
const path = require('path');

const root = process.cwd();
const textExtensions = new Set(['.md', '.html', '.js', '.yml', '.yaml', '.css']);
const publishedRoots = [
  '.claude',
  'assets',
  'academy',
  'course',
  'docs',
  'drills',
  'examples',
  'flashcards',
  'labs',
  'practice',
  'recursos-ptbr',
  'tools'
];
const publishedRootFiles = new Set([
  'index.html',
  'docsify.html',
  '_sidebar.md',
  '_navbar.md',
  '_coverpage.md',
  '.nojekyll',
  'README.md',
  'LICENSE',
  'SECURITY.md',
  'THIRD_PARTY_NOTICES.md',
  'study-log.md'
]);

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function walk(dir) {
  let output = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      output = output.concat(walk(full));
    } else if (textExtensions.has(path.extname(entry.name))) {
      output.push(full);
    }
  }
  return output;
}

function isPublished(relPath) {
  const rel = toPosix(relPath).replace(/^\/+/, '');
  if (publishedRootFiles.has(rel)) return true;
  return publishedRoots.some((prefix) => rel === prefix || rel.startsWith(prefix + '/'));
}

function cleanLink(rawLink) {
  if (!rawLink) return null;
  let link = rawLink.trim();
  if (
    !link ||
    link.includes('${') ||
    link.startsWith('#') ||
    link.startsWith('data:') ||
    /^https?:\/\//i.test(link) ||
    /^mailto:|^tel:|^javascript:/i.test(link)
  ) {
    return null;
  }

  if (link.startsWith('docsify.html#/')) link = link.slice('docsify.html#/'.length);
  if (link.startsWith('/')) link = link.slice(1);
  link = link.split('#')[0].split('?')[0];
  if (!link) return null;
  return decodeURIComponent(link);
}

function resolveCandidates(fromRel, rawLink, cleaned) {
  const candidates = [];
  const baseDir = path.dirname(fromRel);
  if (rawLink.startsWith('/') || rawLink.startsWith('docsify.html#/')) {
    candidates.push(cleaned);
  } else {
    candidates.push(toPosix(path.join(baseDir, cleaned)), cleaned);
  }
  return [...new Set(candidates.map((item) => toPosix(item).replace(/^\.\//, '')))];
}

const linkRegex =
  /\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)|(?:href|src)=["']([^"']+)["']|['"]((?:\.\/|\.\.\/|\/)?(?:\.claude|academy|assets|course|docs|drills|examples|flashcards|labs|practice|recursos-ptbr)\/[^'"\s)]+|(?:README|SECURITY|LICENSE|THIRD_PARTY_NOTICES|study-log|_sidebar|_navbar|_coverpage|docsify|index)\.(?:md|html|css|js|yml))['"]/g;

const files = walk(root);
const broken = [];
const notPublished = [];
const checked = [];

for (const file of files) {
  const fromRel = toPosix(path.relative(root, file));
  if (fromRel === 'tools/check-site-links.js') continue;
  const text = fs.readFileSync(file, 'utf8');
  let match;

  while ((match = linkRegex.exec(text))) {
    const raw = match[1] || match[2] || match[3];
    const cleaned = cleanLink(raw);
    if (!cleaned) continue;

    const candidates = resolveCandidates(fromRel, raw, cleaned);
    const existing = candidates.find((candidate) => fs.existsSync(path.join(root, candidate)));
    checked.push({ from: fromRel, raw, resolved: existing || candidates[0] });

    if (!existing) {
      broken.push({ from: fromRel, raw, tried: candidates });
      continue;
    }

    if (!isPublished(existing)) {
      notPublished.push({ from: fromRel, raw, resolved: existing });
    }
  }
}

const result = {
  scannedFiles: files.length,
  checkedLinks: checked.length,
  brokenCount: broken.length,
  notPublishedCount: notPublished.length,
  broken,
  notPublished
};

console.log(JSON.stringify(result, null, 2));

if (broken.length || notPublished.length) {
  process.exit(1);
}
