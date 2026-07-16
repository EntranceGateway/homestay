import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo, SITE_URL } from '@/components/seo/PageSeo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { fetchBlogPost } from '@/services/blogService';
import type { BlogPostFull } from '@/types/blog';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    setError(null);
    fetchBlogPost(slug)
      .then(setPost)
      .catch((err) => setError(err.message || 'Post not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const heroTransform = scrollY * 0.25;
  const heroOpacity = Math.max(0, 1 - scrollY / 600);

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
    );
  }

  return (
    <>
      <PageSeo
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.featured_image_url || undefined}
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
            image: post.featured_image_url,
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
            datePublished: post.published_at,
            dateModified: post.updated_at,
            mainEntityOfPage: post.canonical_url || `${SITE_URL}/blog/${post.slug}`,
            articleSection: post.category_name,
          },
        ]}
      />

      {/* ───── Hero / Featured Image ───── */}
      <header className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden bg-background-dark">
        <div className="absolute inset-x-0 top-0 z-20">
          <Breadcrumbs items={pageBreadcrumbs} />
        </div>

        {post.featured_image_url ? (
          <div
            className="absolute inset-0 z-0 will-change-transform"
            style={{ transform: `translate3d(0, ${heroTransform}px, 0)` }}
          >
            <img
              src={post.featured_image_url}
              alt={post.featured_image_alt || post.title}
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-deep-forest to-bark-soil" />
        )}

        <div
          className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl pb-12 md:pb-16 will-change-transform"
          style={{ opacity: heroOpacity }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-golden-hour text-sm font-accent uppercase tracking-wider transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>

          <span className="inline-block bg-living-canopy/90 text-white text-[10px] font-accent uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm mb-4">
            {post.category_name}
          </span>

          <h1 className="text-white font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-2xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm">
            <span className="font-accent uppercase tracking-wider">
              By {post.author_name || 'Bardiya Eco Team'}
            </span>
            <span className="w-1 h-1 bg-white/40 rounded-full" />
            <time dateTime={post.published_at || ''}>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString('en-US', {
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
