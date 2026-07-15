import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

export function LeopardSection() {
  const content = useScrollAnimation();
  const stats = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/leopard.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark gradient overlay on left for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

      {/* Subtle animated grain texture */}
      <div className="absolute inset-0 grain-texture pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            ref={content.ref}
            className={`max-w-xl scroll-slide-left ${content.isVisible ? 'visible' : ''}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-accent-gold" />
              <span className="text-accent-gold uppercase tracking-[0.3em] text-xs font-bold">
                Into the Wild
              </span>
            </div>

            <h2 className={`font-display text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 scroll-fade-in stagger-1 ${content.isVisible ? 'visible' : ''}`}>
              Where the
              <span className="block font-script text-accent-gold text-5xl md:text-7xl lg:text-8xl mt-2 font-normal">
                Leopard Reigns
              </span>
            </h2>

            <div className="divider-organic !mx-0 !ml-0" style={{ margin: '0 auto 1.5rem 0' }} />

            <p className={`text-gray-300 text-lg leading-relaxed mb-6 scroll-fade-in stagger-2 ${content.isVisible ? 'visible' : ''}`}>
              Few moments in life compare to locking eyes with a wild leopard as it moves silently through the dappled jungle light. Bardia National Park offers one of <strong className="text-white">South Asia's last untouched frontiers</strong> — where these elusive big cats still roam free in their ancient territory.
            </p>

            <p className={`text-gray-400 text-base leading-relaxed mb-10 scroll-fade-in stagger-3 ${content.isVisible ? 'visible' : ''}`}>
              Unlike the crowded reserves elsewhere, here you witness wildlife on their terms. No crowds. No barriers. Just you, your expert guide, and the raw, pulse-quickening thrill of the jungle at its most primal.
            </p>

            <div className={`flex flex-wrap gap-4 scroll-fade-in stagger-4 ${content.isVisible ? 'visible' : ''}`}>
              <Link to="/contact" className="btn-brush btn-brush-gold">
                Book Your Safari
              </Link>
              <Link to="/gallery" className="btn-brush">
                View Gallery
              </Link>
            </div>
          </div>

          {/* Right Content — Stats / Quick Facts */}
          <div
            ref={stats.ref}
            className="hidden lg:flex flex-col items-end gap-8"
          >
            {[
              { number: '968', unit: 'km²', label: 'Protected Wilderness', delay: '1' },
              { number: '30+', unit: '', label: 'Leopard Sightings Yearly', delay: '2' },
              { number: '53', unit: '', label: 'Mammal Species Recorded', delay: '3' },
              { number: '100%', unit: '', label: 'Guided Expert Safaris', delay: '4' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-8 py-5 w-72 text-right group hover:bg-white/10 hover:border-accent-gold/30 transition-all duration-500 scroll-slide-right stagger-${stat.delay} ${stats.isVisible ? 'visible' : ''}`}
              >
                <div className="flex items-baseline justify-end gap-1 mb-1">
                  <span className="text-white font-display text-3xl font-bold group-hover:text-accent-gold transition-colors duration-300">
                    {stat.number}
                  </span>
                  {stat.unit && (
                    <span className="text-accent-gold text-sm font-bold">{stat.unit}</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
    </section>
  );
}
