import { useMemo } from 'react';
import { useApi } from '@/hooks/useApi';

const API_BASE = 'https://api.bardiaecofriendlyhomestay.com/api';

interface CmsPage {
  id: number;
  title: string;
  slug: string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_image?: string | null;
  canonical_url?: string | null;
  robots?: string | null;
  status: string;
}

interface PageSeoFallback {
  title: string;
  description: string;
  image: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export function usePageSeo(slug: string, fallback: PageSeoFallback) {
  const { data: pages = [] } = useApi<CmsPage[]>({
    url: `${API_BASE}/pages/list`,
    staleTime: 600000,
  });

  return useMemo(() => {
    const page = pages?.find((item) => item.slug === slug && item.status === 'published');

    if (!page) {
      return fallback;
    }

    return {
      title: page.meta_title || page.title || fallback.title,
      description: page.meta_description || fallback.description,
      image: page.meta_image || fallback.image,
      canonicalUrl: page.canonical_url || fallback.canonicalUrl,
      noindex: page.robots?.startsWith('noindex') || fallback.noindex || false,
    };
  }, [fallback, pages, slug]);
}
