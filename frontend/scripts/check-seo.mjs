import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const siteUrl = 'https://www.bardiaecofriendlyhomestay.com';
const googleSiteVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION || '';
const gaMeasurementId = process.env.VITE_GA_MEASUREMENT_ID || '';

const failures = [];

function fail(message) {
  failures.push(message);
}

async function readDistFile(relativePath) {
  return readFile(path.join(distDir, relativePath), 'utf8');
}

function routeFile(route) {
  if (route === '/') return 'index.html';
  return `${route.slice(1)}/index.html`;
}

function matchContent(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || '';
}

function hasTag(html, pattern) {
  return pattern.test(html);
}

function checkLength(label, value, min, max) {
  if (value.length < min || value.length > max) {
    fail(`${label} length ${value.length} is outside ${min}-${max} chars.`);
  }
}

function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

async function assertExists(relativePath) {
  try {
    await stat(path.join(distDir, relativePath));
  } catch {
    fail(`Missing required file: ${relativePath}`);
  }
}

await assertExists('robots.txt');
await assertExists('sitemap.xml');
await assertExists('404.html');

const routes = JSON.parse(await readDistFile('prerendered-routes.json'));
const sitemap = await readDistFile('sitemap.xml');
const robots = await readDistFile('robots.txt');
const sitemapLocs = parseSitemapLocs(sitemap);
const expectedLocs = routes.map((route) => `${siteUrl}${route}`);

if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  fail('robots.txt does not reference the production sitemap URL.');
}

for (const loc of expectedLocs) {
  if (!sitemapLocs.includes(loc)) {
    fail(`sitemap.xml is missing ${loc}`);
  }
}

for (const loc of sitemapLocs) {
  if (!expectedLocs.includes(loc)) {
    fail(`sitemap.xml contains non-prerendered or non-indexable URL: ${loc}`);
  }
}

const lastmods = [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map((match) => match[1]);
if (lastmods.length !== expectedLocs.length) {
  fail('sitemap.xml must include one lastmod per indexable URL.');
}
for (const lastmod of lastmods) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
    fail(`Invalid sitemap lastmod format: ${lastmod}`);
  }
}

for (const route of routes) {
  const relativePath = routeFile(route);
  const html = await readDistFile(relativePath);
  const canonical = `${siteUrl}${route}`;
  const title = matchContent(html, /<title>(.*?)<\/title>/s);
  const description = matchContent(html, /<meta name="description" content="(.*?)"\s*\/?>/s);

  if (!title) fail(`${relativePath} is missing <title>.`);
  else checkLength(`${relativePath} title`, title, 10, 70);

  if (!description) fail(`${relativePath} is missing meta description.`);
  else checkLength(`${relativePath} meta description`, description, 50, 180);

  if (!/<meta name="robots" content="index,follow(?:,max-image-preview:large)?"\s*\/?>/.test(html)) {
    fail(`${relativePath} must be index,follow.`);
  }

  if (!html.includes(`<link rel="canonical" href="${canonical}" />`)) {
    fail(`${relativePath} canonical does not match ${canonical}.`);
  }

  if (/%VITE_[A-Z0-9_]+%/.test(html)) {
    fail(`${relativePath} contains an unresolved Vite environment placeholder.`);
  }

  if (googleSiteVerification && !html.includes(`<meta name="google-site-verification" content="${googleSiteVerification}" />`)) {
    fail(`${relativePath} is missing configured Google Search Console verification meta tag.`);
  }

  if (gaMeasurementId && !html.includes(`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`)) {
    fail(`${relativePath} is missing configured Google Analytics script.`);
  }

  const requiredPatterns = [
    [/<meta property="og:type" content="[^"]+"\s*\/?>/, 'og:type'],
    [/<meta property="og:title" content="[^"]+"\s*\/?>/, 'og:title'],
    [/<meta property="og:description" content="[^"]+"\s*\/?>/, 'og:description'],
    [new RegExp(`<meta property="og:url" content="${canonical.replaceAll('/', '\\/')}"\\s*\\/?>`), 'og:url'],
    [/<meta property="og:image" content="https:\/\/[^"]+"\s*\/?>/, 'og:image'],
    [/<meta name="twitter:card" content="summary_large_image"\s*\/?>/, 'twitter:card'],
    [/<meta name="twitter:title" content="[^"]+"\s*\/?>/, 'twitter:title'],
    [/<meta name="twitter:description" content="[^"]+"\s*\/?>/, 'twitter:description'],
    [/<meta name="twitter:image" content="https:\/\/[^"]+"\s*\/?>/, 'twitter:image'],
  ];

  for (const [pattern, label] of requiredPatterns) {
    if (!hasTag(html, pattern)) {
      fail(`${relativePath} is missing ${label}.`);
    }
  }
}

const notFoundHtml = await readDistFile('404.html');
if (!notFoundHtml.includes('<meta name="robots" content="noindex,follow" />')) {
  fail('404.html must be noindex,follow.');
}
if (notFoundHtml.includes(`<loc>${siteUrl}/404</loc>`)) {
  fail('404 URL must not appear in sitemap.xml.');
}

if (failures.length > 0) {
  console.error(`SEO check failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`SEO check passed for ${routes.length} indexable prerendered route(s).`);
