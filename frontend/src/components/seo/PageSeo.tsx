import { useEffect } from 'react';

const SITE_URL = 'https://www.bardiaecofriendlyhomestay.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const SITE_NAME = 'Bardia Eco-Friendly Homestay';

type JsonLd = Record<string, unknown>;

interface PageSeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  canonicalUrl?: string;
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
}

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = create();
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

export function PageSeo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  canonicalUrl,
  noindex = false,
  jsonLd,
}: PageSeoProps) {
  useEffect(() => {
    const resolvedCanonicalUrl = canonicalUrl || `${SITE_URL}${path}`;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'description';
      return meta;
    }, description);

    upsertMeta('meta[name="robots"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      return meta;
    }, noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large');

    upsertLink('canonical', resolvedCanonicalUrl);

    const metaTags: Array<[string, string, string]> = [
      ['property', 'og:site_name', SITE_NAME],
      ['property', 'og:locale', 'en_US'],
      ['property', 'og:type', type],
      ['property', 'og:title', fullTitle],
      ['property', 'og:description', description],
      ['property', 'og:url', resolvedCanonicalUrl],
      ['property', 'og:image', fullImage],
      ['property', 'og:image:alt', title],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', fullTitle],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', fullImage],
    ];

    metaTags.forEach(([attr, name, content]) => {
      upsertMeta(`meta[${attr}="${name}"]`, () => {
        const meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        return meta;
      }, content);
    });

    document.querySelectorAll('script[data-page-seo="jsonld"]').forEach((node) => node.remove());

    const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.pageSeo = 'jsonld';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [canonicalUrl, description, image, jsonLd, noindex, path, title, type]);

  return null;
}

export { SITE_NAME, SITE_URL };
