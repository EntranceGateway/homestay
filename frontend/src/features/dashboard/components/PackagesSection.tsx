import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApiBaseUrl } from '@/lib/apiBase';

const API_BASE = getApiBaseUrl();

const ICONS = ['hiking', 'binoculars', 'visibility'] as const;

interface ApiPackage {
  id: number;
  icon: string;
  name: string;
  duration: string;
  description: string;
  is_featured: boolean;
}

const FALLBACK_PACKAGES: ApiPackage[] = [
  {
    id: 1,
    icon: '🥾',
    name: 'Walking Safari',
    duration: 'Full day guided experience',
    description: 'Track wildlife on foot with experienced local naturalists around Bardia National Park.',
    is_featured: true,
  },
  {
    id: 2,
    icon: '🐅',
    name: 'Tiger Territory Safari',
    duration: 'Multi-day wildlife escape',
    description: 'Explore tiger habitat, river edges, and grassland zones with a flexible Bardia itinerary.',
    is_featured: false,
  },
  {
    id: 3,
    icon: '🏡',
    name: 'Eco Homestay Retreat',
    duration: 'Custom stay package',
    description: 'Stay near the forest with organic meals, quiet village life, and responsible travel experiences.',
    is_featured: false,
  },
];

export function PackagesSection() {
  const heading = useScrollAnimation();
  const cards = useScrollAnimation({ threshold: 0.1 });
  const cta = useScrollAnimation();

  const [packages, setPackages] = useState<ApiPackage[]>(FALLBACK_PACKAGES);

  useEffect(() => {
    fetch(`${API_BASE}/packages/list`)
      .then((res) => res.json())
      .then((data) => {
        const all: ApiPackage[] = data.data || [];
        const featured = all.filter((p) => p.is_featured).slice(0, 3);
        setPackages(featured.length > 0 ? featured : all.slice(0, 3));
      })
      .catch((err) => console.error('Failed to fetch packages:', err));
  }, []);

  return (
    <section id="packages" className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={heading.ref}
          className={`text-center mb-16 scroll-fade-in ${heading.isVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Choose your Bardia Adventure
          </h2>
          <div className="divider-organic" />
        </div>

        <div
          ref={cards.ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {packages.map((pkg, index) => {
            const iconKey = ICONS[index % ICONS.length];
            return (
              <div
                key={pkg.id}
                className={`bg-[#D3D6C1] dark:bg-[#3D4035] p-8 rounded-lg relative group transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl scroll-fade-in stagger-${index + 1} ${
                  pkg.is_featured ? 'shadow-xl border-b-4 border-primary ring-2 ring-primary/20' : 'hover:shadow-xl'
                } ${cards.isVisible ? 'visible' : ''}`}
              >
                {/* Featured badge */}
                {pkg.is_featured && (
                  <div className="absolute -top-3 right-4 bg-accent-gold text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Popular
                  </div>
                )}

                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    {iconKey === 'hiking' && <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />}
                    {iconKey === 'binoculars' && <path d="M7 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H7zm8 0c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-2z" />}
                    {iconKey === 'visibility' && <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />}
                  </svg>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="font-display font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">
                    {pkg.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-4">
                    {pkg.duration}
                  </p>
                  <div className="w-10 h-0.5 bg-primary mx-auto mb-4" />
                  {pkg.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {pkg.description}
                    </p>
                  )}

                  {/* Per-card brush button */}
                  <Link to="/packages" className={`btn-brush text-sm ${pkg.is_featured ? 'btn-brush-primary' : ''}`}
                    style={{ fontSize: '1.1rem', padding: '10px 24px' }}
                  >
                    Explore
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div
          ref={cta.ref}
          className={`text-center mt-16 scroll-fade-in stagger-2 ${cta.isVisible ? 'visible' : ''}`}
        >
          <Link to="/packages" className="btn-brush btn-brush-primary">
            See all packages
          </Link>
        </div>
      </div>
    </section>
  );
}
