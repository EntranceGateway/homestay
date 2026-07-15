import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const hosts = [
  {
    src: '/gallery/tourguide.jpg',
    alt: 'Local Bardia nature guide',
    width: 1200,
    height: 1600,
  },
  {
    src: '/gallery/homestay.jpg',
    alt: 'Bardia Eco-Friendly Homestay outdoor area',
    width: 1280,
    height: 720,
  },
  {
    src: '/gallery/homestay1.jpg',
    alt: 'Eco-friendly homestay accommodation in Bardia',
    width: 1280,
    height: 854,
  },
  {
    src: '/gallery/room.jpg',
    alt: 'Guest room at Bardia Eco-Friendly Homestay',
    width: 1280,
    height: 876,
  },
];

export function HostsSection() {
  const heading = useScrollAnimation();
  const grid = useScrollAnimation({ threshold: 0.1 });
  const cta = useScrollAnimation();

  return (
    <section className="py-24 bg-surface-dark relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={heading.ref}
          className={`text-center mb-16 scroll-fade-in ${heading.isVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-secondary font-bold text-xl uppercase tracking-widest mb-2">
            Meet <br />
            <span className="font-script text-6xl text-white capitalize normal-case">your hosts</span>
          </h2>
          <div className="divider-organic" />
        </div>

        <div
          ref={grid.ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {hosts.map((host, index) => (
            <div
              key={host.src}
              className={`aspect-square overflow-hidden rounded-lg group relative hover-shine scroll-scale-in stagger-${index + 1} ${grid.isVisible ? 'visible' : ''}`}
            >
              <img
                alt={host.alt}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                height={host.height}
                loading="lazy"
                src={host.src}
                width={host.width}
              />
              {/* Golden frame on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-gold/40 rounded-lg transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        <div
          ref={cta.ref}
          className={`text-center mt-12 scroll-fade-in stagger-2 ${cta.isVisible ? 'visible' : ''}`}
        >
          <Link className="btn-brush btn-brush-gold" to="/contact">
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
