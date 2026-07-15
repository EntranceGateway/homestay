import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const wildlifeImages = [
  '/bird.jpg',
  '/crocodile-1000.webp',
  '/deer.jpg',
  '/elephent.jpg',
  '/rhino.jpeg',
  '/hero-tiger.webp',
];

export function WildlifeSection() {
  const content = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wildlifeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Auto-scrolling background images */}
      {wildlifeImages.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
          style={{
            backgroundImage: `url('${image}')`,
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Centered content — same style as Safari section */}
      <div
        ref={content.ref}
        className={`container mx-auto px-4 max-w-3xl text-center relative z-10 scroll-fade-in ${content.isVisible ? 'visible' : ''}`}
      >
        {/* Paw print icon */}
        <div className="mb-6">
          <svg className="w-14 h-14 mx-auto text-accent-gold/70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.5 11c1.38 0 2.5-1.12 2.5-2.5S5.88 6 4.5 6 2 7.12 2 8.5 3.12 11 4.5 11zm15 0c1.38 0 2.5-1.12 2.5-2.5S20.88 6 19.5 6 17 7.12 17 8.5s1.12 2.5 2.5 2.5zm-3.5 1c-1.38 0-2.5 1.12-2.5 2.5S14.62 17 16 17s2.5-1.12 2.5-2.5S17.38 12 16 12zM8 12c-1.38 0-2.5 1.12-2.5 2.5S6.62 17 8 17s2.5-1.12 2.5-2.5S9.38 12 8 12zm4 3c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        </div>

        <h2 className={`text-white font-display text-4xl md:text-6xl font-bold leading-tight mb-4 scroll-fade-in stagger-1 ${content.isVisible ? 'visible' : ''}`}>
          Explore The
        </h2>
        <h3 className={`font-script text-accent-gold text-5xl md:text-6xl mb-8 scroll-fade-in stagger-2 ${content.isVisible ? 'visible' : ''}`}>
          Wildlife
        </h3>

        <div className="divider-organic" />

        <p className={`text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto scroll-fade-in stagger-3 ${content.isVisible ? 'visible' : ''}`}>
          From the majestic Bengal tiger to the one-horned rhinoceros, Bardia is home to over 53 species of mammals, 400 species of birds, and countless reptiles. Every safari is a new chapter in the story of the wild.
        </p>

        {/* Image indicator dots */}
        <div className={`flex justify-center gap-2 mb-8 scroll-fade-in stagger-3 ${content.isVisible ? 'visible' : ''}`}>
          {wildlifeImages.map((_, index) => (
            <button
              aria-label={`Show wildlife background ${index + 1}`}
              key={index}
              onClick={() => setCurrentIndex(index)}
              type="button"
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'bg-accent-gold w-8'
                  : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <div className={`scroll-fade-in stagger-4 ${content.isVisible ? 'visible' : ''}`}>
          <Link to="/gallery" className="btn-brush btn-brush-gold">
            Our Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
