import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PageSeo, SITE_URL } from '@/components/seo/PageSeo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { fetchBlogPost } from '@/services/blogService';
import type { BlogPostFull } from '@/types/blog';

interface PrerenderData {
  blogPostsBySlug?: Record<string, BlogPostFull>;
}

declare global {
  interface Window {
    __PRERENDER_DATA__?: PrerenderData;
  }

  // Used by the Node prerender build before React renders each route.
  var __PRERENDER_DATA__: PrerenderData | undefined;
}

function getPrerenderedPost(slug: string | undefined) {
  if (!slug) {
    return null;
  }

  const data =
    typeof window === 'undefined' ? globalThis.__PRERENDER_DATA__ : window.__PRERENDER_DATA__;

  return data?.blogPostsBySlug?.[slug] || null;
}

function normalizeDate(value: string | null | undefined) {
  if (!value || value.startsWith('0000-00-00')) {
    return undefined;
  }

  const date = new Date(value.replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

function getSeoTitle(post: BlogPostFull) {
  if (post.meta_title && post.meta_title.length <= 70) {
    return post.meta_title;
  }

  return post.title;
}

const DEFAULT_BLOG_HERO_IMAGE = '/hero-tiger.webp';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const prerenderedPost = getPrerenderedPost(slug);
  const [post, setPost] = useState<BlogPostFull | null>(prerenderedPost);
  const [loading, setLoading] = useState(!prerenderedPost);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const content = useScrollAnimation();
  const related = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!slug) return;
    const seededPost = getPrerenderedPost(slug);
    if (seededPost) {
      setPost(seededPost);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    fetchBlogPost(slug)
      .then(setPost)
      .catch((err) => setError(err.message || 'Post not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const heroTransform = scrollY * 0.25;
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const publishedAt = normalizeDate(post?.published_at);
  const modifiedAt = normalizeDate(post?.updated_at) || publishedAt;

  // Breadcrumbs
  const pageBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    ...(post ? [{ label: post.title, href: `/blog/${post.slug}` }] : []),
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen">
        <div className="h-[50vh] bg-gray-300 dark:bg-gray-700 animate-pulse" />
        <div className="container mx-auto px-4 max-w-3xl py-12">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-8 animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error / not found state
  if (error || !post) {
    return (
      <>
        <PageSeo
          title="Blog Post Not Found"
          description="The requested Bardia Eco-Friendly Homestay blog post could not be found."
          path={slug ? `/blog/${slug}` : '/blog'}
          noindex
        />
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <span className="text-7xl mb-6 block">🔍</span>
            <h1 className="font-display text-3xl text-gray-800 dark:text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Link to="/blog" className="btn-brush btn-brush-gold">
              Back to Blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  const heroImage = post.featured_image_url || DEFAULT_BLOG_HERO_IMAGE;
  const heroImageAlt = post.featured_image_alt || post.title;

  return (
    <>
      <PageSeo
        title={getSeoTitle(post)}
        description={post.meta_description || post.excerpt}
        path={`/blog/${post.slug}`}
        image={heroImage}
        canonicalUrl={post.canonical_url || undefined}
        noindex={post.robots?.startsWith('noindex')}
        type="article"
        jsonLd={[
          breadcrumbJsonLd(pageBreadcrumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.meta_description || post.excerpt,
            image: heroImage,
            author: {
              '@type': 'Person',
              name: post.author_name || 'Bardiya Eco Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Bardia Eco-Friendly Homestay',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
              },
            },
            ...(publishedAt ? { datePublished: publishedAt } : {}),
            ...(modifiedAt ? { dateModified: modifiedAt } : {}),
            mainEntityOfPage: post.canonical_url || `${SITE_URL}/blog/${post.slug}`,
            articleSection: post.category_name,
          },
        ]}
      />

      {/* ───── Hero / Featured Image ───── */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark">
        <div
          className="absolute inset-0 z-0 will-change-transform"
          style={{ transform: `translate3d(0, ${heroTransform}px, 0)` }}
        >
          {post.featured_image_url ? (
            <img
              src={heroImage}
              alt={heroImageAlt}
              className="w-full h-full object-cover object-[30%_center] scale-110 md:object-center"
            />
          ) : (
            <picture className="block w-full h-full">
              <source srcSet={DEFAULT_BLOG_HERO_IMAGE} type="image/webp" />
              <img
                src="/tiger.jpg"
                alt={heroImageAlt}
                className="w-full h-full object-cover object-[30%_center] scale-110 md:object-center"
                width={1920}
                height={1200}
              />
            </picture>
          )}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background-dark/70" />
        </div>

        <div
          className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl text-center mt-16 will-change-transform"
          style={{ opacity: heroOpacity }}
        >
          <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-golden-hour text-sm font-accent uppercase tracking-wider transition-colors drop-shadow-lg"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Back to Blog</span>
            </Link>

            <span className="inline-flex max-w-full items-center justify-center rounded-full bg-living-canopy/90 px-3 py-1.5 text-center font-accent text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
              {post.category_name}
            </span>
          </div>

          <h1 className="text-white font-display text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 drop-shadow-2xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-white/75 text-sm drop-shadow-lg">
            <span className="font-accent uppercase tracking-wider">
              By {post.author_name || 'Bardiya Eco Team'}
            </span>
            <span className="w-1 h-1 bg-white/40 rounded-full" />
            <time dateTime={publishedAt || ''}>
              {publishedAt
                ? new Date(publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''}
            </time>
          </div>
        </div>
      </header>

      {/* ───── Article Content ───── */}
      <section className="bg-background-light dark:bg-surface-dark">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-12 md:py-20">
          <div
            ref={content.ref}
            className={`scroll-fade-in ${content.isVisible ? 'visible' : ''}`}
          >
            <article
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* ───── Related Posts ───── */}
      {post.related_posts && post.related_posts.length > 0 && (
        <section className="bg-moonlight dark:bg-background-dark py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div
              ref={related.ref}
              className={`scroll-fade-in ${related.isVisible ? 'visible' : ''}`}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">
                Related Posts
              </h2>
              <div className="divider-organic mb-12" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {post.related_posts.map((relatedPost, index) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className={`blog-card card-lift hover-shine scroll-fade-in stagger-${index + 1} ${related.isVisible ? 'visible' : ''}`}
                  >
                    {relatedPost.featured_image_url ? (
                      <img
                        src={relatedPost.featured_image_url}
                        alt={relatedPost.title}
                        className="w-full h-44 object-cover rounded-t-card"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-44 bg-gradient-to-br from-living-canopy/20 to-golden-hour/20 flex items-center justify-center rounded-t-card">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                    <div className="p-5">
                      <span className="text-[10px] font-accent uppercase tracking-wider text-living-canopy dark:text-dew-drop mb-2 block">
                        {relatedPost.category_name}
                      </span>
                      <h3 className="font-display text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
