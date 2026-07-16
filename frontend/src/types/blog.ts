export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
  post_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  author_name: string | null;
  meta_title: string;
  meta_description: string;
  is_featured: boolean;
  status: string;
  published_at: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_slug: string;
}

export interface BlogPostFull extends BlogPost {
  content: string;
  meta_image: string | null;
  canonical_url: string | null;
  robots: string;
  related_posts: RelatedPost[];
}

export interface RelatedPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  category_name: string;
}

export interface BlogPagination {
  page: number;
  per_page: number;
  total: number;
  pages: number;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: BlogPagination;
}
