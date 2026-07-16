import type { BlogCategory, BlogPostFull, BlogPostsResponse } from '@/types/blog';
import { getApiBaseUrl } from '@/lib/apiBase';

const API_BASE = getApiBaseUrl();

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  const res = await fetch(`${API_BASE}/blog-categories/list`);
  const json = await res.json();
  return json.data || [];
}

interface FetchBlogPostsParams {
  page?: number;
  perPage?: number;
  categoryId?: number | null;
  isFeatured?: boolean;
}

export async function fetchBlogPosts({
  page = 1,
  perPage = 6,
  categoryId,
  isFeatured,
}: FetchBlogPostsParams = {}): Promise<BlogPostsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  if (categoryId) params.set('category_id', String(categoryId));
  if (isFeatured !== undefined) params.set('is_featured', isFeatured ? '1' : '0');

  const res = await fetch(`${API_BASE}/blog-posts/list?${params}`);
  const json = await res.json();
  return json.data || { posts: [], pagination: { page: 1, per_page: perPage, total: 0, pages: 0 } };
}

export async function fetchBlogPost(slug: string): Promise<BlogPostFull> {
  const res = await fetch(`${API_BASE}/blog-posts/get?slug=${encodeURIComponent(slug)}`);
  const json = await res.json();
  if (json.status !== 'success') {
    throw new Error(json.message || 'Blog post not found.');
  }
  return json.data;
}
