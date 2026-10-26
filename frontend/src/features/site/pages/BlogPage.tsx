import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { SITE_URL } from '@/constants';
import { breadcrumbJsonLd } from '@/lib/seo';
import { usePageSeo } from '@/hooks/usePageSeo';
import { useApi } from '@/hooks/useApi';
import { useParallax } from '@/hooks/useParallax';
import { getApiBaseUrl } from '@/lib/apiBase';
import type { BlogCategory, BlogPostsResponse } from '@/types/blog';

const API_BASE = getApiBaseUrl();
const PER_PAGE = 6;

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
];

export function BlogPage() {
  const [headingRef, headingVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.05 });
  const imageRef = useParallax<HTMLDivElement>(0.3);
  const textRef = useParallax<HTMLDivElement>(0.15, 800);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const { data: categoryData } = useApi<BlogCategory[]>({ url: `${API_BASE}/blog-categories/list`});
  const postParams = new URLSearchParams({ page: String(page), per_page: String(PER_PAGE) });
  if (activeCategory) postParams.set('category_id', String(activeCategory));
  const { data, loading } = useApi<BlogPostsResponse>({ url: `${API_BASE}/blog-posts/list?${postParams}`});

  const categories = categoryData ?? [];
  const posts = data?.posts ?? [];
  const pagination = data?.pagination ?? { page, per_page: PER_PAGE, total: 0, pages: 0 };

  const handleCategoryClick = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    setPage(1);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const seo = usePageSeo('blog', {
    title: 'Blog | Bardia Eco-Friendly Homestay',
    description:
      'Read our latest articles about wildlife, travel tips, and eco-friendly tourism in Bardiya National Park, Nepal.',
    image: '/blogs/herosection.webp',
  });

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/blog"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        jsonLd={[
          breadcrumbJsonLd(breadcrumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Bardia Eco-Friendly Homestay Blog',
            description:
              'Articles about wildlife, travel tips, and eco-friendly tourism in Bardiya.',
            url: `${SITE_URL}/blog`,
            publisher: {
              '@type': 'Organization',
              name: 'Bardia Eco-Friendly Homestay',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
              },
            },
          },
        ]}
      />

      {/* ───── Hero Section ───── */}
      <header className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-deep-forest">
        <div className="absolute inset-x-0 top-0 z-20">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div
          ref={imageRef}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <img
            src="/blogs/herosection.webp"
            alt="Bardiya National Park landscape"
            title="Bardiya National Park landscape"
            className="w-full h-full object-cover scale-110"
            width={1200}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-deep-forest/60" />
        </div>

        <div
          ref={textRef}
          className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto will-change-transform"
        >
          <p className="font-script text-golden-hour text-3xl sm:text-4xl md:text-6xl mb-4 animate-fade-in-up drop-shadow-lg">
            Stories & Insights
          </p>
          <h1 className="text-white font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight drop-shadow-2xl">
            Our Blog
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Wildlife encounters, travel tips, and tales from the heart of Bardiya
          </p>
        </div>
      </header>

      {/* ───── Blog Content ───── */}
      <section className="bg-soft-earth py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Category Filter Tabs */}
          <div
            ref={headingRef}
            className={`scroll-fade-in ${headingVisible ? 'visible' : ''}`}
          >
            <nav className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 md:mb-16" aria-label="Blog categories">
              <button
                onClick={() => handleCategoryClick(null)}
                aria-pressed={activeCategory === null}
                className={`category-tab ${activeCategory === null ? 'category-tab-active' : ''}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  aria-pressed={activeCategory === cat.id}
                  className={`category-tab ${activeCategory === cat.id ? 'category-tab-active' : ''}`}
                >
                  {cat.name}
                  <span className="ml-1.5 text-xs opacity-60">({cat.post_count})</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="blog-card animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-card" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-3" />
                    <div className="h-6 bg-gray-300 rounded w-full mb-2" />
                    <div className="h-6 bg-gray-300 rounded w-2/3 mb-4" />
                    <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Post Cards Grid */}
          {!loading && posts.length > 0 && (
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className={`blog-card card-lift hover-shine scroll-fade-in stagger-${Math.min(index + 1, 5)} ${gridVisible ? 'visible' : ''}`}
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-t-card">
                      {post.featured_image_url ? (
                        <img
                          src={post.featured_image_url}
                          alt={post.featured_image_alt || post.title}
                          className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-living-canopy/20 to-golden-hour/20 flex items-center justify-center">
                          <span className="text-5xl">📝</span>
                        </div>
                      )}
                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 bg-living-canopy/90 text-white text-xs font-accent uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {post.category_name}
                      </span>
                      {post.is_featured && (
                        <span className="absolute top-3 right-3 bg-golden-hour text-white text-xs font-accent uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="font-accent uppercase tracking-wider">
                          {post.author_name || 'Bardiya Eco Team'}
                        </span>
                        <time dateTime={post.published_at || ''}>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : ''}
                        </time>
                      </div>
                    </div>
                  </Link>

                  {/* Read More */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-accent uppercase tracking-wider text-golden-hour hover:text-bird-paradise transition-colors duration-300"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">📭</span>
              <h3 className="font-display text-xl text-gray-700 mb-2">
                No posts found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category or check back later.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && pagination.pages > 1 && (
            <nav className="flex items-center justify-center gap-3 mt-12 md:mt-16" aria-label="Blog pagination">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="pagination-btn"
              >
                ← Prev
              </button>
              <span className="text-sm text-gray-600 font-accent uppercase tracking-wider px-4">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="pagination-btn"
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* ───── CTA Section ───── */}
      <section
        className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden parallax-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/blogs/contect.jpg')`,
        }}
      >
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h2 className="text-white font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4">
            Ready for the
          </h2>
          <h3 className="font-script text-golden-hour text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8">
            Adventure?
          </h3>
          <div className="divider-organic mb-10" />
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Let us plan your Bardia experience. From walking safaris to cultural
            immersions, every journey is crafted just for you.
          </p>
          <Link to="/contact" className="btn-brush btn-brush-gold">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
