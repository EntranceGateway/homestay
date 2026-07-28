import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useApi } from '@/hooks/useApi';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { SITE_URL } from '@/components/seo/PageSeo';
import { getApiBaseUrl } from '@/lib/apiBase';
import { breadcrumbJsonLd } from '@/lib/seo';
import { FaqSection, faqJsonLd } from '@/components/seo/FaqSection';
import { usePageSeo } from '@/hooks/usePageSeo';

/* ── Types matching API responses ── */

interface Category {
  id: number;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
}

interface Package {
  id: number;
  category_id: number;
  icon: string;
  name: string;
  duration: string;
  price: number;
  currency: string;
  price_note: string;
  description: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  category_name: string;
  category_slug: string;
  features: string[];
}

const API_BASE = getApiBaseUrl();
const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/packages' },
];

const FAQ_ITEMS = [
  {
    question: 'Do I need to book Bardia safari packages in advance?',
    answer: 'Advance booking is recommended, especially in peak wildlife travel months, so guides, permits, rooms, and meals can be prepared properly.',
  },
  {
    question: 'Are the packages suitable for first-time visitors to Bardia?',
    answer: 'Yes. Packages can be adjusted for first-time visitors, families, photographers, and travelers who want a slower homestay-focused experience.',
  },
  {
    question: 'Can packages include farm-to-table meals and local cultural experiences?',
    answer: 'Yes. Homestay meals, seasonal organic food, village time, and local cultural experiences can be included based on availability and guest interest.',
  },
];

export function PackagesPage() {
  const hero = useScrollAnimation();
  const grid = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  const { data: categories = [], loading: loadingCats } = useApi<Category[]>({
    url: `${API_BASE}/package-categories/list`
  });

  const { data: packages = [], loading: loadingPkgs } = useApi<Package[]>({
    url: `${API_BASE}/packages/list`
  });

  const [activeSlug, setActiveSlug] = useState<string>('');

  const apiCategories = Array.isArray(categories) ? categories : [];
  const apiPackages = Array.isArray(packages) ? packages : [];
  const loading = loadingCats || loadingPkgs;

  useEffect(() => {
    if (apiCategories.length > 0 && !activeSlug) {
      setActiveSlug(apiCategories[0].slug);
    }
  }, [apiCategories, activeSlug]);

  const currentSlug = activeSlug || apiCategories[0]?.slug || '';
  const filtered = currentSlug
    ? apiPackages.filter((p) => p.category_slug === currentSlug)
    : apiPackages;

  const seo = usePageSeo('packages', {
    title: 'Bardia Safari and Homestay Packages',
    description: 'Choose Bardia wildlife safari, homestay, and forest escape packages designed for responsible travel near Bardia National Park.',
    image: '/safari.webp',
  });

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/packages"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        jsonLd={[
          breadcrumbJsonLd(breadcrumbs),
          faqJsonLd(FAQ_ITEMS),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Bardia Eco-Friendly Homestay packages',
            itemListElement: apiPackages.slice(0, 10).map((pkg, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${SITE_URL}/packages`,
              name: pkg.name,
              description: pkg.description,
            })),
          },
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      {/* ════════ HERO ════════ */}
      <section className="pt-36 sm:pt-44 pb-16 md:pb-20 px-6 sm:px-10 text-center max-w-4xl mx-auto">
        <div
          ref={hero.ref}
          className={`scroll-fade-in ${hero.isVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-xs sm:text-sm tracking-[0.25em] uppercase text-golden-hour inline-flex items-center gap-4 mb-6 font-bold">
            <span className="w-8 h-px bg-golden-hour" />
            Choose Your Journey
            <span className="w-8 h-px bg-golden-hour" />
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-bark-soil dark:text-soft-earth leading-[1.15] mb-7">
            Find Your Perfect
            <br />
            <em className="text-golden-hour italic font-normal">Forest Escape</em>
          </h1>

          <p className="text-base sm:text-lg font-body font-medium leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            From weekend getaways to extended wilderness immersions, each
            package is designed to help you disconnect from the world and
            reconnect with what matters.
          </p>
        </div>
      </section>

      {/* ════════ TABS ════════ */}
      {apiCategories.length > 0 && (
        <div className="flex justify-center gap-6 sm:gap-8 mb-12 px-4 overflow-x-auto snap-x snap-mandatory scroll-hide">
          {apiCategories.map((cat) => (
            <button
              aria-label={`Show ${cat.name} packages`}
              key={cat.id}
              onClick={() => setActiveSlug(cat.slug)}
              type="button"
              className={`font-accent text-xs sm:text-sm tracking-[0.18em] uppercase pb-2.5 border-b-2 whitespace-nowrap snap-center transition-all duration-300 ${
                currentSlug === cat.slug
                  ? 'text-bark-soil dark:text-soft-earth border-golden-hour font-bold'
                  : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-golden-hour font-semibold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* ════════ PACKAGES GRID ════════ */}
      <section className="px-4 sm:px-10 pb-20 md:pb-28 max-w-[1400px] mx-auto">
        <div
          ref={grid.ref}
          className={`scroll-fade-in ${grid.isVisible ? 'visible' : ''}`}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-12 h-12 border-4 border-golden-hour/20 border-t-golden-hour rounded-full animate-spin mb-4" />
              <p className="text-bark-soil dark:text-soft-earth font-accent text-xs tracking-widest uppercase font-bold">
                Loading packages...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white/90 dark:bg-bark-soil/80 rounded-2xl border border-gray-300/70 dark:border-gray-700 shadow-md max-w-lg mx-auto my-8">
              <span className="text-4xl block mb-3">🌿</span>
              <h3 className="font-display text-xl font-bold text-bark-soil dark:text-soft-earth mb-2">
                No Packages Available In This Category
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                We are currently updating custom packages for this category. Contact us directly to tailor your Bardia safari experience!
              </p>
              <Link to="/contact" className="btn-brush btn-brush-gold text-sm">
                Inquire For Custom Package
              </Link>
            </div>
          ) : (
            <div
              key={currentSlug}
              className={`grid grid-cols-1 ${
                filtered.length === 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' : 'lg:grid-cols-3'
              } gap-8`}
            >
              {filtered.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className={`bg-white dark:bg-bark-soil/90 rounded-2xl overflow-hidden shadow-md border border-gray-200/80 dark:border-gray-700/60 card-lift relative scroll-fade-in stagger-${
                    i + 1
                  } ${grid.isVisible ? 'visible' : ''} ${
                    pkg.is_featured ? 'border-2 border-golden-hour ring-2 ring-golden-hour/20 lg:scale-105' : ''
                  }`}
                >
                  {pkg.is_featured && (
                    <span className="absolute top-6 right-6 bg-golden-hour text-white px-4 py-1.5 rounded-full font-accent text-[9px] tracking-[0.18em] uppercase font-bold z-10 shadow-md">
                      Most Popular
                    </span>
                  )}

                  {/* Header */}
                  <div className="p-8 sm:p-10 relative overflow-hidden">
                    <span className="text-5xl mb-4 block relative z-10">{pkg.icon || '🥾'}</span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-bark-soil dark:text-soft-earth mb-2 relative z-10">
                      {pkg.name}
                    </h3>
                    <p className="font-accent text-xs tracking-widest uppercase text-golden-hour font-bold relative z-10">
                      {pkg.duration}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="px-8 sm:px-10 pb-8 sm:pb-10">
                    {pkg.description && (
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                        {pkg.description}
                      </p>
                    )}

                    {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                      <ul className="space-y-2 mb-8">
                        {pkg.features.map((feat, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 py-2 border-b border-gray-100 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200 font-medium"
                          >
                            <span className="text-golden-hour font-bold flex-shrink-0">✓</span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link to="/contact" className="btn-brush btn-brush-gold w-full text-center block text-sm">
                      Inquire This Package
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <FaqSection items={FAQ_ITEMS} />

      {/* ════════ FINAL CTA ════════ */}
      <section
        className="py-28 md:py-36 px-6 sm:px-10 text-center relative parallax-fixed min-h-[60vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/camping.jpg')" }}
      >
        <div className="absolute inset-0 bg-deep-forest/75" />

        <div
          ref={ctaRef.ref}
          className={`max-w-2xl mx-auto relative z-10 scroll-fade-in ${ctaRef.isVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Ready to <em className="text-golden-hour italic font-normal">Disconnect</em>
            <br />
            and Discover?
          </h2>
          <p className="text-base font-light leading-relaxed text-gray-200 mb-10">
            Availability fills up 6-8 weeks ahead, especially for weekends and
            holidays. Reserve your dates now and we'll take care of everything.
          </p>
          <Link
            to="/contact"
            className="btn-brush btn-brush-gold"
          >
            Talk to Us First
          </Link>
        </div>
      </section>
    </>
  );
}
