import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useApi } from '@/hooks/useApi';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { SITE_URL } from '@/components/seo/PageSeo';
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

const API_BASE = 'https://api.bardiaecofriendlyhomestay.com/api';
const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/packages' },
];

const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Safari Experiences',
    slug: 'safari-experiences',
    display_order: 1,
    is_active: true,
  },
];

const FALLBACK_PACKAGES: Package[] = [
  {
    id: 1,
    category_id: 1,
    icon: '🥾',
    name: 'Walking Safari',
    duration: 'Full day guided experience',
    price: 0,
    currency: 'USD',
    price_note: 'Contact for current pricing',
    description:
      'Track wildlife on foot with local naturalists around Bardia National Park and learn how to read the forest safely.',
    is_featured: true,
    display_order: 1,
    is_active: true,
    category_name: 'Safari Experiences',
    category_slug: 'safari-experiences',
    features: ['Guided forest walk', 'Wildlife tracking', 'Local naturalist support'],
  },
  {
    id: 2,
    category_id: 1,
    icon: '🐅',
    name: 'Tiger Territory Safari',
    duration: 'Multi-day wildlife escape',
    price: 0,
    currency: 'USD',
    price_note: 'Contact for current pricing',
    description:
      'A focused Bardia wildlife package for travelers hoping to explore tiger habitat, river edges, and grassland zones.',
    is_featured: false,
    display_order: 2,
    is_active: true,
    category_name: 'Safari Experiences',
    category_slug: 'safari-experiences',
    features: ['Bardia National Park access guidance', 'Flexible itinerary', 'Homestay meals'],
  },
  {
    id: 3,
    category_id: 1,
    icon: '🏡',
    name: 'Eco Homestay Retreat',
    duration: 'Custom stay package',
    price: 0,
    currency: 'USD',
    price_note: 'Contact for current pricing',
    description:
      'Stay close to the forest with organic meals, quiet village life, and responsible travel experiences.',
    is_featured: false,
    display_order: 3,
    is_active: true,
    category_name: 'Safari Experiences',
    category_slug: 'safari-experiences',
    features: ['Eco-friendly accommodation', 'Farm-to-table meals', 'Local cultural connection'],
  },
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

/* ── Component ── */

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
  
  const apiCategories = categories || [];
  const apiPackages = packages || [];
  const safeCategories = apiCategories.length > 0 ? apiCategories : FALLBACK_CATEGORIES;
  const safePackages = apiPackages.length > 0 ? apiPackages : FALLBACK_PACKAGES;
  const loading = (loadingCats || loadingPkgs) && apiPackages.length > 0;
  const currentSlug = activeSlug || safeCategories[0]?.slug || '';
  const seo = usePageSeo('packages', {
    title: 'Bardia Safari and Homestay Packages',
    description: 'Choose Bardia wildlife safari, homestay, and forest escape packages designed for responsible travel near Bardia National Park.',
    image: '/safari.webp',
  });

  useEffect(() => {
    if (safeCategories.length > 0 && !activeSlug) {
      setActiveSlug(safeCategories[0].slug);
    }
  }, [safeCategories, activeSlug]);

  const filtered = safePackages.filter((p) => p.category_slug === currentSlug);


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
            itemListElement: safePackages.slice(0, 10).map((pkg, index) => ({
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
          <span className="font-accent text-[11px] tracking-[0.25em] uppercase text-golden-hour inline-flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-golden-hour" />
            Choose Your Journey
            <span className="w-8 h-px bg-golden-hour" />
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-bark-soil leading-[1.15] mb-7">
            Find Your Perfect
            <br />
            <em className="text-golden-hour italic">Forest Escape</em>
          </h1>

          <p className="text-base sm:text-lg font-light leading-relaxed-plus text-gray-500 max-w-2xl mx-auto">
            From weekend getaways to extended wilderness immersions, each
            package is designed to help you disconnect from the world and
            reconnect with what matters.
          </p>
        </div>
      </section>

      {/* ════════ TABS ════════ */}
      {safeCategories.length > 1 && (
        <div className="flex justify-center gap-8 mb-14 px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {safeCategories
            .filter((cat) => safePackages.some((p) => p.category_slug === cat.slug))
            .map((cat) => (
              <button
                aria-label={`Show ${cat.name} packages`}
                key={cat.id}
                onClick={() => setActiveSlug(cat.slug)}
                type="button"
                className={`font-accent text-xs tracking-[0.16em] uppercase pb-2 border-b-2 whitespace-nowrap snap-center transition-all duration-300 ${
                  currentSlug === cat.slug
                    ? 'text-bark-soil dark:text-soft-earth border-golden-hour font-semibold'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
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
              <p className="text-gray-400 font-accent text-xs tracking-widest uppercase">Loading packages...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-accent text-sm tracking-widest uppercase">
              No packages available
            </div>
          ) : (
            <div
              key={currentSlug}
              className={`grid grid-cols-1 ${filtered.length === 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' : 'lg:grid-cols-3'} gap-8`}
            >
            {filtered.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-card card-lift relative scroll-fade-in stagger-${i + 1} ${grid.isVisible ? 'visible' : ''} ${
                  pkg.is_featured ? 'border-2 border-golden-hour lg:scale-105' : ''
                }`}
              >
                {pkg.is_featured && (
                  <span className="absolute top-6 right-6 bg-golden-hour text-bark-soil px-4 py-1.5 rounded-full font-accent text-[9px] tracking-[0.18em] uppercase font-semibold z-10 animate-pulse-glow">
                    Most Popular
                  </span>
                )}

                {/* Header */}
                <div className="p-10 sm:p-12 relative overflow-hidden">
                  <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-radial from-golden-hour/5 to-transparent opacity-60 pointer-events-none" />

                  <span className="text-5xl mb-5 block relative z-10 animate-float">{pkg.icon}</span>
                  <h3 className="font-display text-4xl text-bark-soil dark:text-soft-earth mb-2 relative z-10">{pkg.name}</h3>
                  <p className="font-accent text-[11px] tracking-[0.18em] uppercase text-gray-400 relative z-10">{pkg.duration}</p>
                </div>

                {/* Body */}
                <div className="px-10 sm:px-12 pb-10 sm:pb-12">
                  {pkg.description && (
                    <p className="font-display italic text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8">{pkg.description}</p>
                  )}

                  {pkg.features.length > 0 && (
                    <ul className="space-y-0">
                      {pkg.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 py-3.5 border-b border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 hover:pl-2 transition-all duration-300">
                          <span className="text-golden-hour flex-shrink-0 mt-0.5">✓</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}
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
        <div className="absolute inset-0 bg-deep-forest/70" />

        <div
          ref={ctaRef.ref}
          className={`max-w-2xl mx-auto relative z-10 scroll-fade-in ${ctaRef.isVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-soft-earth leading-tight mb-6">
            Ready to <em className="text-golden-hour italic">Disconnect</em>
            <br />
            and Discover?
          </h2>
          <p className="text-base font-light leading-relaxed-plus text-soft-earth/70 mb-10">
            Availability fills up 6-8 weeks ahead, especially for weekends and
            holidays. Reserve your dates now and we'll take care of everything.
          </p>
          <Link to="/contact" className="px-10 py-4 border-2 border-soft-earth/30 text-soft-earth font-accent text-[12px] tracking-[0.18em] uppercase font-semibold hover:border-soft-earth transition-all duration-300 hover:-translate-y-0.5">
            Talk to Us First
          </Link>
        </div>
      </section>
    </>
  );
}
