import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDirectory = 'out';
const basePath = process.env.GITHUB_PAGES === 'true' ? '/mu-login-manager-site' : '';
const faviconMarkup = [
  `<link rel="icon" href="${basePath}/favicon.svg" type="image/svg+xml">`,
  `<link rel="shortcut icon" href="${basePath}/favicon.svg" type="image/svg+xml">`,
].join('');

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(entryPath)));
    } else if (entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }

  return files;
}

const htmlFiles = await collectHtmlFiles(outputDirectory);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (html.includes('rel="icon"')) continue;

  await writeFile(file, html.replace('</head>', `${faviconMarkup}</head>`), 'utf8');
}

console.log(`Favicon incluído em ${htmlFiles.length} página(s) estática(s).`);
