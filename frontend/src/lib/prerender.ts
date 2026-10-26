import type { AboutContent } from '@/types/about';
import type { BlogPostFull } from '@/types/blog';

// Data the Node prerender build (scripts/prerender.mjs) embeds per route, so the
// static HTML already contains CMS content and hydration renders the same markup.
interface PrerenderData {
  blogPostsBySlug?: Record<string, BlogPostFull>;
  about?: AboutContent;
}

declare global {
  interface Window {
    __PRERENDER_DATA__?: PrerenderData;
  }

  // Set by the prerender build before React renders each route.
  var __PRERENDER_DATA__: PrerenderData | undefined;
}

export function getPrerenderData(): PrerenderData {
  return (typeof window === 'undefined' ? globalThis.__PRERENDER_DATA__ : window.__PRERENDER_DATA__) ?? {};
}
