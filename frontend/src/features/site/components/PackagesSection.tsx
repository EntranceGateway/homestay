import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { Link } from 'react-router-dom';
import { getApiBaseUrl } from '@/lib/apiBase';
import { PackageCard } from './PackageCard';
import { PackageModal } from './PackageModal';
import type { Package } from './packageUtils';

const API_BASE = getApiBaseUrl();

export function PackagesSection() {
  const [headingRef, headingVisible] = useScrollAnimation();
  const [cardsRef] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation();

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenItinerary = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const { data, loading } = useApi<Package[]>({ url: `${API_BASE}/packages/list`});
  const all = Array.isArray(data) ? data : [];
  const featured = all.filter((p) => p.is_featured).slice(0, 3);
  const packages = featured.length > 0 ? featured : all.slice(0, 3);

  // If loading finished and no packages exist in API, hide section entirely
  if (!loading && packages.length === 0) {
    return null;
  }

  return (
    <section id="packages" className="py-24 bg-moonlight/40 relative overflow-hidden transition-colors duration-300 border-b border-gray-200/50">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden-hour/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headingRef}
          className={`text-center mb-16 scroll-fade-in ${headingVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-xs uppercase tracking-widest text-golden-hour font-bold block mb-2">
            Tailored Journeys
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            Choose Your Bardia Adventure
          </h2>
          <div className="divider-organic" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/60 h-72 rounded-2xl animate-pulse p-8 border border-gray-200/50"
              />
            ))}
          </div>
        ) : (
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onOpenItinerary={handleOpenItinerary}
                featuredScale={false}
              />
            ))}
          </div>
        )}

        <PackageModal
          pkg={selectedPackage}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <div
          ref={ctaRef}
          className={`text-center mt-16 scroll-fade-in stagger-2 ${ctaVisible ? 'visible' : ''}`}
        >
          <Link to="/packages" className="btn-brush btn-brush-gold">
            See All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
