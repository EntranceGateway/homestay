import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useApi } from '@/hooks/useApi';
import { getApiBaseUrl } from '@/lib/apiBase';
import type { BlogPostsResponse } from '@/types/blog';

const API_BASE = getApiBaseUrl();

export function BlogSection() {
  const [headingRef, headingVisible] = useScrollAnimation();
  const [cardsRef, cardsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation();

  // Featured posts first; latest posts only requested if there are none
  const { data: featured, loading } = useApi<BlogPostsResponse>({
    url: `${API_BASE}/blog-posts/list?page=1&per_page=3&is_featured=1`,
  });
  const needLatest = !loading && !featured?.posts?.length;
  const { data: latest } = useApi<BlogPostsResponse>({
    url: needLatest ? `${API_BASE}/blog-posts/list?page=1&per_page=3`: null,
  });
  const posts = (featured?.posts?.length ? featured.posts : latest?.posts) ?? [];

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-moonlight relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden-hour/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headingRef}
          className={`text-center mb-16 scroll-fade-in ${headingVisible ? 'visible' : ''}`}
        >
          <p className="font-script text-golden-hour text-2xl sm:text-3xl mb-2">
            Stories & Insights
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Latest from our Blog
          </h2>
          <div className="divider-organic" />
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`blog-card card-lift hover-shine scroll-fade-in stagger-${index + 1} ${cardsVisible ? 'visible' : ''}`}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-card">
                {post.featured_image_url ? (
                  <img
                    src={post.featured_image_url}
                    alt={post.featured_image_alt || post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-living-canopy/20 to-golden-hour/20 flex items-center justify-center">
                    <span className="text-5xl">📝</span>
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-living-canopy/90 text-white text-xs font-accent uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {post.category_name}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h3>
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
          ))}
        </div>

        <div
          ref={ctaRef}
          className={`text-center mt-16 scroll-fade-in stagger-2 ${ctaVisible ? 'visible' : ''}`}
        >
          <Link to="/blog" className="btn-brush btn-brush-primary">
            Read all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
