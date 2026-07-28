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

export function PackagesSection() {
  const heading = useScrollAnimation();
  const cards = useScrollAnimation({ threshold: 0.1 });
  const cta = useScrollAnimation();

  const [packages, setPackages] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/packages/list`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          const all: ApiPackage[] = Array.isArray(data.data) ? data.data : [];
          const featured = all.filter((p) => p.is_featured).slice(0, 3);
          setPackages(featured.length > 0 ? featured : all.slice(0, 3));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch packages:', err);
        if (isMounted) {
          setPackages([]);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // If loading finished and no packages exist in API, hide section entirely
  if (!loading && packages.length === 0) {
    return null;
  }

  return (
    <section id="packages" className="py-24 bg-moonlight/40 dark:bg-background-dark/80 relative overflow-hidden transition-colors duration-300 border-b border-gray-200/50 dark:border-gray-800/50">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={heading.ref}
          className={`text-center mb-16 scroll-fade-in ${heading.isVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-xs uppercase tracking-widest text-accent-gold font-bold block mb-2">
            Tailored Journeys
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Choose Your Bardia Adventure
          </h2>
          <div className="divider-organic" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/60 dark:bg-bark-soil/50 h-72 rounded-2xl animate-pulse p-8 border border-gray-200/50 dark:border-gray-700/50"
              />
            ))}
          </div>
        ) : (
          <div
            ref={cards.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {packages.map((pkg, index) => {
              const iconKey = ICONS[index % ICONS.length];
              return (
                <div
                  key={pkg.id}
                  className={`bg-white dark:bg-bark-soil/90 p-8 rounded-2xl relative group transition-all duration-300 hover:-translate-y-2 border border-gray-200/80 dark:border-gray-700/60 shadow-md hover:shadow-2xl scroll-scale-in stagger-${index + 1} ${
                    pkg.is_featured ? 'shadow-xl border-2 border-accent-gold ring-2 ring-accent-gold/20' : ''
                  } ${cards.isVisible ? 'visible' : ''}`}
                >
                  {/* Featured badge */}
                  {pkg.is_featured && (
                    <div className="absolute -top-3 right-4 bg-accent-gold text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Popular
                    </div>
                  )}

                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-moonlight dark:bg-background-dark p-3.5 rounded-2xl shadow-lg border border-accent-gold/30 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-7 h-7 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
                      {iconKey === 'hiking' && <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />}
                      {iconKey === 'binoculars' && <path d="M7 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H7zm8 0c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-2z" />}
                      {iconKey === 'visibility' && <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />}
                    </svg>
                  </div>

                  <div className="mt-8 text-center">
                    <h3 className="font-display font-bold text-xl mb-1.5 text-gray-900 dark:text-white group-hover:text-accent-gold transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-accent font-bold uppercase tracking-wider text-accent-gold mb-4">
                      {pkg.duration}
                    </p>
                    <div className="w-10 h-0.5 bg-accent-gold/40 mx-auto mb-4" />
                    {pkg.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {pkg.description}
                      </p>
                    )}

                    {/* Per-card brush button */}
                    <Link
                      to="/packages"
                      className={`btn-brush text-sm ${pkg.is_featured ? 'btn-brush-gold' : 'btn-brush-primary'}`}
                      style={{ fontSize: '1.1rem', padding: '10px 24px' }}
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div
          ref={cta.ref}
          className={`text-center mt-16 scroll-fade-in stagger-2 ${cta.isVisible ? 'visible' : ''}`}
        >
          <Link to="/packages" className="btn-brush btn-brush-gold">
            See All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
