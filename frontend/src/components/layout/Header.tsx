import { useEffect, useState } from 'react';

export function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate smoother parallax values
  const videoTransform = scrollY * 0.3; // Slower, smoother video movement
  const textTransform = scrollY * 0.15; // Much slower text movement
  const opacity = Math.max(0, 1 - scrollY / 800); // Slower fade out

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-background-dark">
      <div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${videoTransform}px, 0)`,
        }}
      >
        <picture className="block w-full h-full">
          <source srcSet="/hero-tiger.webp" type="image/webp" />
          <img
            alt="Royal Bengal tiger habitat near Bardia National Park"
            className="w-full h-full object-cover scale-110"
            fetchPriority="high"
            width={1920}
            height={1200}
            src="/tiger.jpg"
          />
        </picture>
        {/* Subtle gradient only at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark/40" />
      </div>

      {/* Original Text Content with Smooth Parallax */}
      <div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 will-change-transform"
        style={{
          transform: `translate3d(0, ${textTransform}px, 0)`,
          opacity: opacity,
        }}
        >
          <p className="font-script text-accent-gold text-4xl md:text-6xl mb-4 animate-fade-in-up drop-shadow-lg">
            Welcome to the Wild
          </p>
        <h1 className="text-white font-display text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight drop-shadow-2xl">
          Bardia Eco-Friendly <br /> Homestay
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide mb-10 max-w-2xl mx-auto drop-shadow-lg">
          Experience wildlife at its fullest at Bardia Eco-Friendly Homestay. A homestay nestled on the edge of the Bardia National Park.
        </p>
        <div className="animate-bounce mt-12">
          <svg className="w-10 h-10 mx-auto text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}
