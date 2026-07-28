import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useApi } from '@/hooks/useApi';
import { getApiBaseUrl } from '@/lib/apiBase';
import { Link } from 'react-router-dom';

/* ── Types ── */

interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
}

interface GalleryImage {
  id: number;
  categoryId?: number;
  category_id?: number;
  categorySlug?: string;
  category_slug?: string;
  categoryName?: string;
  category_name?: string;
  imageUrl?: string;
  image_url?: string;
  altText?: string;
  alt_text?: string;
  displayOrder?: number;
  isActive?: boolean;
  width?: number | null;
  height?: number | null;
  caption?: string | null;
  title?: string | null;
}

const API_BASE = getApiBaseUrl();
const INITIAL_COUNT = 8;
const HEIGHTS = ['380px', '480px', '320px', '420px', '540px', '360px', '460px', '300px'];

export function GalleryMasonrySection() {
  const section = useScrollAnimation();
  const [activeSlug, setActiveSlug] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const { data: categories = [], loading: loadingCats } = useApi<GalleryCategory[]>({
    url: `${API_BASE}/gallery-categories/list`
  });

  const { data: images = [], loading: loadingImgs } = useApi<GalleryImage[]>({
    url: `${API_BASE}/gallery-images/list`
  });

  const apiCategories = Array.isArray(categories) ? categories : [];
  const apiImages = Array.isArray(images) ? images : [];
  const loading = loadingCats || loadingImgs;

  useEffect(() => {
    if (apiCategories.length > 0 && !activeSlug) {
      setActiveSlug(apiCategories[0].slug);
    }
  }, [apiCategories, activeSlug]);

  const currentSlug = activeSlug || apiCategories[0]?.slug || '';
  const selectedCat = apiCategories.find((c) => c.slug === currentSlug) || apiCategories[0];

  // Flexible category matching for images (camelCase or snake_case API properties)
  const filtered = currentSlug
    ? apiImages.filter((img) => {
        const slugMatch =
          img.categorySlug === currentSlug || img.category_slug === currentSlug;
        const idMatch =
          selectedCat &&
          (img.categoryId === selectedCat.id || img.category_id === selectedCat.id);
        const nameMatch =
          selectedCat &&
          ((img.categoryName && img.categoryName.toLowerCase() === selectedCat.name.toLowerCase()) ||
            (img.category_name && img.category_name.toLowerCase() === selectedCat.name.toLowerCase()));
        return slugMatch || idMatch || nameMatch;
      })
    : apiImages;

  const visibleImages = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleTabChange = (slug: string) => {
    setActiveSlug(slug);
    setVisibleCount(INITIAL_COUNT);
  };

  const handleSeeMore = () => {
    setVisibleCount(filtered.length);
  };

  return (
    <section className="px-5 pb-24 sm:px-10 max-w-[1400px] mx-auto">
      {/* Divider */}
      <div className="divider-organic mb-12" />

      {/* Tabs */}
      {!loading && apiCategories.length > 0 && (
        <div className="flex justify-center gap-6 sm:gap-8 mb-14 overflow-x-auto snap-x snap-mandatory scroll-hide px-4">
          {apiCategories.map((cat) => {
            const count = apiImages.filter(
              (img) =>
                img.categorySlug === cat.slug ||
                img.category_slug === cat.slug ||
                img.categoryId === cat.id ||
                img.category_id === cat.id
            ).length;

            return (
              <button
                aria-label={`Show ${cat.name} gallery`}
                key={cat.id}
                onClick={() => handleTabChange(cat.slug)}
                type="button"
                className={`font-accent text-xs sm:text-sm tracking-[0.18em] uppercase pb-2.5 border-b-2 whitespace-nowrap snap-center transition-all duration-300 ${
                  currentSlug === cat.slug
                    ? 'text-bark-soil dark:text-soft-earth border-golden-hour font-bold'
                    : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-golden-hour font-semibold'
                }`}
              >
                {cat.name} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
      )}

      {/* Masonry Grid */}
      <div
        ref={section.ref}
        className={`scroll-fade-in ${section.isVisible ? 'visible' : ''}`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28">
            <div className="w-12 h-12 border-4 border-golden-hour/20 border-t-golden-hour rounded-full animate-spin mb-4" />
            <p className="text-bark-soil dark:text-soft-earth font-accent text-xs tracking-widest uppercase font-bold">
              Loading gallery...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white/90 dark:bg-bark-soil/80 rounded-2xl border border-gray-300/70 dark:border-gray-700 shadow-md max-w-lg mx-auto my-8">
            <span className="text-4xl block mb-3">📸</span>
            <h3 className="font-display text-xl font-bold text-bark-soil dark:text-soft-earth mb-2">
              No Images Found in {selectedCat?.name || 'this category'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 font-medium">
              We are currently adding fresh photographs for this section. Check out our other categories or contact us for inquiries!
            </p>
            <Link to="/contact" className="btn-brush btn-brush-gold text-sm">
              Inquire With Us
            </Link>
          </div>
        ) : (
          <>
            <div className="masonry-grid" key={currentSlug}>
              {visibleImages.map((img, index) => {
                const src = img.imageUrl || img.image_url || '/gallery/homestay.jpg';
                const alt = img.altText || img.alt_text || img.title || `${selectedCat?.name || 'Gallery'} image ${index + 1}`;
                const caption = img.caption || img.title || alt;

                return (
                  <figure key={img.id || index} className="masonry-item group">
                    <div
                      className="w-full overflow-hidden rounded-card shadow-md border border-gray-200/50 dark:border-gray-800"
                      style={{ height: HEIGHTS[index % HEIGHTS.length] }}
                    >
                      <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                        height={img.height ?? undefined}
                        loading="lazy"
                        title={img.title || alt}
                        width={img.width ?? undefined}
                      />
                    </div>
                    {caption && (
                      <figcaption className="mt-3 text-xs font-accent uppercase tracking-[0.14em] text-gray-700 dark:text-gray-300 font-semibold">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>

            {/* See More Button */}
            {hasMore && (
              <div className="text-center mt-14">
                <button
                  aria-label="Show all gallery images"
                  onClick={handleSeeMore}
                  type="button"
                  className="btn-brush btn-brush-gold"
                >
                  See More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
