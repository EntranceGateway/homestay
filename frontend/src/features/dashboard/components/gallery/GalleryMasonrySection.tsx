import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useApi } from '@/hooks/useApi';
import { getApiBaseUrl } from '@/lib/apiBase';

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
  categoryId: number;
  categorySlug: string;
  categoryName: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isActive: boolean;
  width?: number | null;
  height?: number | null;
  caption?: string | null;
  title?: string | null;
}

const API_BASE = getApiBaseUrl();
const INITIAL_COUNT = 6;
const HEIGHTS = ['380px', '480px', '320px', '420px', '540px', '360px', '460px', '300px'];

const FALLBACK_CATEGORIES: GalleryCategory[] = [
  {
    id: 1,
    name: 'Wildlife and Homestay',
    slug: 'wildlife-and-homestay',
    display_order: 1,
    is_active: true,
  },
];

const FALLBACK_IMAGES: GalleryImage[] = [
  {
    id: 1,
    categoryId: 1,
    categorySlug: 'wildlife-and-homestay',
    categoryName: 'Wildlife and Homestay',
    imageUrl: '/gallery/tiger.jpg',
    altText: 'Tiger in Bardia National Park',
    displayOrder: 1,
    isActive: true,
    width: 1280,
    height: 852,
  },
  {
    id: 2,
    categoryId: 1,
    categorySlug: 'wildlife-and-homestay',
    categoryName: 'Wildlife and Homestay',
    imageUrl: '/gallery/rhino.jpg',
    altText: 'One horned rhinoceros near Bardia',
    displayOrder: 2,
    isActive: true,
    width: 1600,
    height: 1066,
  },
  {
    id: 3,
    categoryId: 1,
    categorySlug: 'wildlife-and-homestay',
    categoryName: 'Wildlife and Homestay',
    imageUrl: '/gallery/homestay.jpg',
    altText: 'Bardia Eco-Friendly Homestay accommodation',
    displayOrder: 3,
    isActive: true,
    width: 1280,
    height: 720,
  },
  {
    id: 4,
    categoryId: 1,
    categorySlug: 'wildlife-and-homestay',
    categoryName: 'Wildlife and Homestay',
    imageUrl: '/gallery/tourguide.jpg',
    altText: 'Local nature guide in Bardia',
    displayOrder: 4,
    isActive: true,
    width: 1200,
    height: 1600,
  },
  {
    id: 5,
    categoryId: 1,
    categorySlug: 'wildlife-and-homestay',
    categoryName: 'Wildlife and Homestay',
    imageUrl: '/gallery/room.jpg',
    altText: 'Guest room at Bardia Eco-Friendly Homestay',
    displayOrder: 5,
    isActive: true,
    width: 1280,
    height: 876,
  },
  {
    id: 6,
    categoryId: 1,
    categorySlug: 'wildlife-and-homestay',
    categoryName: 'Wildlife and Homestay',
    imageUrl: '/gallery/deer.jpg',
    altText: 'Deer wildlife sighting in Bardia',
    displayOrder: 6,
    isActive: true,
    width: 1280,
    height: 852,
  },
];

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

  const apiCategories = categories || [];
  const apiImages = images || [];
  const loading = (loadingCats || loadingImgs) && apiImages.length > 0;

  const safetyCategories = apiCategories.length > 0 ? apiCategories : FALLBACK_CATEGORIES;
  useEffect(() => {
    if (safetyCategories.length > 0 && !activeSlug) {
      setActiveSlug(safetyCategories[0].slug);
    }
  }, [categories, activeSlug, safetyCategories]);

  const safeCategories = apiCategories.length > 0 ? apiCategories : FALLBACK_CATEGORIES;
  const safeImages = apiImages.length > 0 ? apiImages : FALLBACK_IMAGES;

  const currentSlug = activeSlug || safeCategories[0]?.slug || '';
  const filtered = safeImages.filter((img) => img.categorySlug === currentSlug);
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
      {safeCategories.length > 1 && (
        <div className="flex justify-center gap-8 mb-14">
          {safeCategories.map((cat) => (
            <button
              aria-label={`Show ${cat.name} gallery`}
              key={cat.id}
              onClick={() => handleTabChange(cat.slug)}
              type="button"
              className={`font-accent text-xs tracking-[0.16em] uppercase pb-2 border-b-2 transition-all duration-300 ${
                currentSlug === cat.slug
                  ? 'text-bark-soil border-golden-hour font-semibold'
                  : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <div
        ref={section.ref}
        className={`scroll-fade-in ${section.isVisible ? 'visible' : ''}`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-golden-hour/20 border-t-golden-hour rounded-full animate-spin mb-4" />
            <p className="text-gray-400 font-accent text-xs tracking-widest uppercase">Loading gallery...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-accent text-sm tracking-widest uppercase">
            No images found
          </div>
        ) : (
          <>
            <div className="masonry-grid" key={currentSlug}>
              {visibleImages.map((img, index) => {
                const imageLabel = img.altText || `${img.categoryName} photo ${index + 1}`;
                const caption = img.caption || img.altText || img.categoryName;

                return (
            <figure key={img.id} className="masonry-item group">
              <div
                className="w-full overflow-hidden rounded-card"
                style={{ height: HEIGHTS[index % HEIGHTS.length] }}
              >
                <img
                  src={img.imageUrl}
                  alt={imageLabel}
                  className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                  height={img.height ?? undefined}
                  loading="lazy"
                  title={img.title || imageLabel}
                  width={img.width ?? undefined}
                />
              </div>
              <figcaption className="mt-3 text-xs font-accent uppercase tracking-[0.12em] text-gray-500">
                {caption}
              </figcaption>
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
