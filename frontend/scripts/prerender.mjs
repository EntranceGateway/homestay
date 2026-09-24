import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');

const siteUrl = 'https://www.bardiaecofriendlyhomestay.com';
const siteName = 'Bardia Eco-Friendly Homestay';
const apiBase = (process.env.VITE_API_URL || 'https://api.bardiaecofriendlyhomestay.com/api').replace(/\/$/, '');
const buildLastmod = process.env.BUILD_LASTMOD || new Date().toISOString().slice(0, 10);
const googleSiteVerification = process.env.VITE_GOOGLE_SITE_VERIFICATION || '';
const gaMeasurementId = process.env.VITE_GA_MEASUREMENT_ID || '';
const fallbackPackages = [
  {
    name: 'Walking Safari',
    description:
      'Track wildlife on foot with local naturalists around Bardia National Park and learn how to read the forest safely.',
  },
  {
    name: 'Tiger Territory Safari',
    description:
      'A focused Bardia wildlife package for travelers hoping to explore tiger habitat, river edges, and grassland zones.',
  },
  {
    name: 'Eco Homestay Retreat',
    description:
      'Stay close to the forest with organic meals, quiet village life, and responsible travel experiences.',
  },
];
const packageFaqs = [
  {
    question: 'Do I need to book Bardia safari packages in advance?',
    answer:
      'Advance booking is recommended, especially in peak wildlife travel months, so guides, permits, rooms, and meals can be prepared properly.',
  },
  {
    question: 'Are the packages suitable for first-time visitors to Bardia?',
    answer:
      'Yes. Packages can be adjusted for first-time visitors, families, photographers, and travelers who want a slower homestay-focused experience.',
  },
  {
    question: 'Can packages include farm-to-table meals and local cultural experiences?',
    answer:
      'Yes. Homestay meals, seasonal organic food, village time, and local cultural experiences can be included based on availability and guest interest.',
  },
];

function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

const lodgingBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${siteUrl}/#lodging`,
  name: siteName,
  url: siteUrl,
  image: `${siteUrl}/logo.png`,
  description:
    'Eco-friendly homestay and wildlife travel experiences near Bardia National Park in Thakurdwara, Nepal.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Thakurdwara',
    addressRegion: 'Bardiya',
    addressCountry: 'NP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.4411,
    longitude: 81.2858,
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: {
    '@id': `${siteUrl}/#lodging`,
  },
};

const routes = [
  {
    path: '/',
    title: siteName,
    description:
      'Stay near Bardia National Park at an eco-friendly homestay offering wildlife safaris, local food, and responsible travel experiences.',
    image: '/tiger.jpg',
    changefreq: 'weekly',
    priority: 1,
    schemas: [lodgingBusinessJsonLd, websiteJsonLd],
  },
  {
    path: '/activities',
    title: `Activities and Wildlife Experiences | ${siteName}`,
    description:
      'Explore Bardia wildlife activities, jungle safaris, river expeditions, birdwatching, and local nature experiences guided by veteran naturalists.',
    image: '/safari.webp',
    changefreq: 'weekly',
    priority: 0.8,
    schemas: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Activities', path: '/activities' },
      ]),
    ],
  },
  {
    path: '/gallery',
    title: `Gallery | ${siteName}`,
    description:
      'Explore rooms, wildlife, local culture, and nature photographs from Bardia Eco-Friendly Homestay near Bardia National Park.',
    image: '/gallery/tiger.jpg',
    changefreq: 'weekly',
    priority: 0.8,
    schemas: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Bardia Eco-Friendly Homestay Gallery',
        url: `${siteUrl}/gallery`,
      },
    ],
  },
  {
    path: '/farm-to-table',
    title: `Farm to Table Organic Meals | ${siteName}`,
    description:
      'Discover organic farm-to-table meals grown near Bardia Eco-Friendly Homestay, from fresh vegetables to seasonal forest thali.',
    image: '/farmtotable/hero.jpg',
    changefreq: 'monthly',
    priority: 0.7,
    schemas: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Farm to Table', path: '/farm-to-table' },
      ]),
    ],
  },
  {
    path: '/packages',
    title: `Bardia Safari and Homestay Packages | ${siteName}`,
    description:
      'Choose Bardia wildlife safari, homestay, and forest escape packages designed for responsible travel near Bardia National Park.',
    image: '/safari.webp',
    changefreq: 'weekly',
    priority: 0.9,
    schemas: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Packages', path: '/packages' },
      ]),
      faqJsonLd(packageFaqs),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${siteName} packages`,
        itemListElement: fallbackPackages.map((pkg, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteUrl}/packages`,
          name: pkg.name,
          description: pkg.description,
        })),
      },
    ],
  },
  {
    path: '/blog',
    title: `Bardiya National Park Guide | ${siteName}`,
    description:
      "Learn about Bardia National Park wildlife, walking safaris, Tharu culture, rivers, and tiger habitat in Nepal's wild west.",
    image: '/blogs/herosection.webp',
    type: 'article',
    changefreq: 'monthly',
    priority: 0.7,
    schemas: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Bardiya National Park', path: '/blog' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Welcome to Bardiya National Park',
        description:
          'A travel guide to Bardia National Park wildlife, walking safaris, rivers, and Tharu culture.',
        image: `${siteUrl}/blogs/herosection.webp`,
        mainEntityOfPage: `${siteUrl}/blog`,
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.png`,
          },
        },
      },
    ],
  },
  {
    path: '/contact',
    title: `Contact | ${siteName}`,
    description:
      'Contact Bardia Eco-Friendly Homestay to plan your stay, ask about safari packages, or request travel information.',
    image: '/logo.png',
    changefreq: 'monthly',
    priority: 0.6,
    schemas: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  },
  {
    path: '/404',
    output: '404.html',
    title: `Page Not Found | ${siteName}`,
    description: 'The page you are looking for could not be found at Bardia Eco-Friendly Homestay.',
    image: '/logo.png',
    noindex: true,
  },
];

function normalizeDate(value) {
  if (!value || value.startsWith('0000-00-00')) {
    return undefined;
  }

  const date = new Date(String(value).replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString().slice(0, 10);
}

function absoluteImageUrl(value, fallback = '/logo.png') {
  const image = value || fallback;
  return image.startsWith('http') ? image : `${siteUrl}${image}`;
}

function sanitizeMetaText(value) {
  if (!value) return '';
  return String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function seoTitleForPost(post) {
  const metaTitle = sanitizeMetaText(post.meta_title);
  if (metaTitle && metaTitle.length >= 10 && metaTitle.length <= 70) {
    return metaTitle;
  }

  const rawTitle = sanitizeMetaText(post.title) || 'Bardia Wildlife & Homestay Blog';
  if (rawTitle.length <= 70) {
    return rawTitle;
  }
  return `${rawTitle.slice(0, 67)}...`;
}

function seoDescriptionForPost(post) {
  const metaDesc = sanitizeMetaText(post.meta_description);
  if (metaDesc && metaDesc.length >= 50 && metaDesc.length <= 180) {
    return metaDesc;
  }

  const source = metaDesc || sanitizeMetaText(post.excerpt) || sanitizeMetaText(post.content) || '';
  if (!source) {
    return 'Read stories, travel guides, and wildlife experiences from Bardia Eco-Friendly Homestay near Bardia National Park.';
  }

  if (source.length >= 50 && source.length <= 175) {
    return source;
  }

  if (source.length > 175) {
    const trimmed = source.slice(0, 160).replace(/\s+\S*$/, '');
    const candidate = `${trimmed}...`;
    if (candidate.length >= 50 && candidate.length <= 180) {
      return candidate;
    }
    return source.slice(0, 160);
  }

  const expanded = `${source} Learn more with Bardia Eco-Friendly Homestay.`;
  if (expanded.length <= 180) {
    return expanded;
  }
  return expanded.slice(0, 160);
}

function articleJsonLd(post) {
  const canonicalPath = `/blog/${post.slug}`;
  const canonicalUrl = post.canonical_url || `${siteUrl}${canonicalPath}`;
  const publishedAt = normalizeDate(post.published_at || post.created_at);
  const modifiedAt = normalizeDate(post.updated_at || post.published_at || post.created_at);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitleForPost(post),
    description: seoDescriptionForPost(post),
    image: absoluteImageUrl(post.featured_image_url || post.meta_image, '/blogs/herosection.webp'),
    author: {
      '@type': 'Person',
      name: post.author_name || 'Bardiya Eco Team',
    },
    publisher: {
      '@id': `${siteUrl}/#lodging`,
    },
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(modifiedAt ? { dateModified: modifiedAt } : {}),
    mainEntityOfPage: canonicalUrl,
    articleSection: post.category_name,
  };
}

async function fetchPublishedBlogPosts() {
  try {
    const listResponse = await fetch(`${apiBase}/blog-posts/list?per_page=100`);
    if (!listResponse.ok) {
      throw new Error(`Blog list returned ${listResponse.status}`);
    }

    const listJson = await listResponse.json();
    const posts = listJson?.data?.posts || [];
    const publishedPosts = posts.filter((post) => post.slug && post.status === 'published' && post.is_active !== false);

    return Promise.all(
      publishedPosts.map(async (post) => {
        try {
          const detailResponse = await fetch(`${apiBase}/blog-posts/get?slug=${encodeURIComponent(post.slug)}`);
          if (!detailResponse.ok) {
            throw new Error(`Blog detail returned ${detailResponse.status}`);
          }

          const detailJson = await detailResponse.json();
          return detailJson?.data || post;
        } catch {
          return post;
        }
      })
    );
  } catch (error) {
    console.warn(`Skipping blog post prerendering: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

const blogPosts = await fetchPublishedBlogPosts();
for (const post of blogPosts) {
  routes.push({
    path: `/blog/${post.slug}`,
    title: seoTitleForPost(post),
    description: seoDescriptionForPost(post),
    image: post.meta_image || post.featured_image_url || '/blogs/herosection.webp',
    canonicalUrl: post.canonical_url ? post.canonical_url.replace('https://bardiaecofriendlyhomestay.com', siteUrl) : undefined,
    type: 'article',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: normalizeDate(post.updated_at || post.published_at || post.created_at),
    noindex: post.robots?.startsWith('noindex'),
    prerenderData: {
      blogPostsBySlug: {
        [post.slug]: post,
      },
    },
    schemas: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
      articleJsonLd(post),
    ],
  });
}

async function fetchCmsPageSeo() {
  try {
    const res = await fetch(`${apiBase}/pages/list`);
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.warn(`Skipping CMS page SEO fetch: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

const cmsPages = await fetchCmsPageSeo();
for (const route of routes) {
  const slug = route.path === '/' ? 'home' : route.path.replace(/^\//, '').replace(/\/+$/, '');
  const cmsPage = cmsPages.find((p) => p.slug === slug && p.status === 'published');
  if (cmsPage) {
    if (cmsPage.meta_title) {
      route.title = cmsPage.meta_title;
    }
    if (cmsPage.meta_description) {
      route.description = cmsPage.meta_description;
    }
    if (cmsPage.canonical_url) {
      let canon = cmsPage.canonical_url.replace('https://bardiaecofriendlyhomestay.com', siteUrl);
      if (route.path !== '/' && canon.endsWith('/')) {
        canon = canon.replace(/\/+$/, '');
      } else if (route.path === '/' && !canon.endsWith('/')) {
        canon = `${canon}/`;
      }
      route.canonicalUrl = canon;
    }
    if (cmsPage.robots?.startsWith('noindex')) {
      route.noindex = true;
    }
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function routeHead(route) {
  const canonical = route.canonicalUrl || `${siteUrl}${route.path}`;
  const image = route.image.startsWith('http') ? route.image : `${siteUrl}${route.image}`;
  const type = route.type || 'website';
  const schemas = route.schemas || [];

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${route.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    '<meta property="og:locale" content="en_US" />',
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    googleSiteVerification
      ? `<meta name="google-site-verification" content="${escapeHtml(googleSiteVerification)}" />`
      : '',
    gaMeasurementId
      ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}"></script>`
      : '',
    gaMeasurementId
      ? `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${escapeHtml(gaMeasurementId)}',{send_page_view:false});</script>`
      : '',
    ...schemas.map((schema) => {
      const json = JSON.stringify(schema).replaceAll('</', '<\\/');
      return `<script type="application/ld+json" data-page-seo="jsonld">${json}</script>`;
    }),
  ].filter(Boolean).join('\n    ');
}

function replaceHead(template, route) {
  return template
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/<meta name="description"[^>]*>\s*/s, '')
    .replace(/<meta name="robots"[^>]*>\s*/s, '')
    .replace(/<link rel="canonical"[^>]*>\s*/s, '')
    .replace(/<meta property="og:[^>]*>\s*/g, '')
    .replace(/<meta name="twitter:[^>]*>\s*/g, '')
    .replace(/<script type="application\/ld\+json">.*?<\/script>\s*/gs, '')
    .replace('</head>', `    ${routeHead(route)}\n  </head>`);
}

function outputPath(routePath) {
  const route = routes.find((item) => item.path === routePath);
  if (route?.output) {
    return path.join(distDir, route.output);
  }

  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }

  return path.join(distDir, routePath.slice(1), 'index.html');
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function sitemapXml() {
  const urls = routes
    .filter((route) => !route.noindex)
    .map((route) => {
      const loc = `${siteUrl}${route.path}`;
      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${route.lastmod || buildLastmod}</lastmod>`,
        `    <changefreq>${route.changefreq || 'monthly'}</changefreq>`,
        `    <priority>${Number(route.priority ?? 0.5).toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

const template = await readFile(templatePath, 'utf8');
const { render } = await import(pathToFileURL(serverEntryPath).href);

function prerenderDataScript(route) {
  if (!route.prerenderData) {
    return '';
  }

  const json = JSON.stringify(route.prerenderData).replaceAll('</', '<\\/');
  return `<script>window.__PRERENDER_DATA__=${json};</script>`;
}

for (const route of routes) {
  globalThis.__PRERENDER_DATA__ = route.prerenderData || {};
  const appHtml = render(route.path);
  const html = replaceHead(template, route).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>${prerenderDataScript(route)}`
  );
  const filePath = outputPath(route.path);

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

delete globalThis.__PRERENDER_DATA__;

await writeFile(
  path.join(distDir, 'prerendered-routes.json'),
  JSON.stringify(routes.filter((route) => !route.noindex).map((route) => route.path), null, 2)
);

await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml());

// Sync robots.txt from live CMS API if available
try {
  const robotsUrl = apiBase.endsWith('/api') ? apiBase.slice(0, -4) + '/robots.txt' : `${apiBase}/robots.txt`;
  const robotsRes = await fetch(robotsUrl);
  if (robotsRes.ok) {
    const robotsTxt = await robotsRes.text();
    if (robotsTxt.trim() && robotsTxt.includes('Sitemap:')) {
      await writeFile(path.join(distDir, 'robots.txt'), robotsTxt);
    }
  }
} catch {
  // If CMS API is unreachable during build, fallback to copied public/robots.txt
}

await rm(path.join(distDir, 'server'), { recursive: true, force: true });
