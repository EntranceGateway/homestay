import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function IntroSection() {
  const heading = useScrollAnimation();
  const quote = useScrollAnimation();
  const body = useScrollAnimation();


  return (
    <section className="py-24 bg-background-light dark:bg-surface-dark relative overflow-hidden">
      {/* Decorative leaf pattern background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg height="100%" width="100%">
          <defs>
            <pattern height="100" id="leaf-pattern" patternUnits="userSpaceOnUse" width="100">
              <path d="M30 10 Q50 40 70 10 T90 40" fill="none" stroke="currentColor" />
            </pattern>
          </defs>
          <rect className="text-secondary" fill="url(#leaf-pattern)" height="100%" width="100%" />
        </svg>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-16 left-12 opacity-10 float-gentle pointer-events-none hidden md:block">
        <svg className="w-20 h-20 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.8 8C17.3 5 14.8 3 12 3c-2.2 0-4.2 1.2-5.2 3C4 6.2 2 8.3 2 11c0 2.8 2.2 5 5 5h10.5c2.5 0 4.5-2 4.5-4.5 0-2.3-1.9-4.3-4.2-4.5z" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-16 opacity-10 float-gentle-delay pointer-events-none hidden md:block">
        <svg className="w-16 h-16 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.05 4.14l-.39-.39c-.39-.39-1.02-.39-1.41 0l-.01.01c-.39.39-.39 1.02 0 1.41l.39.39c.39.39 1.02.39 1.41 0l.01-.01c.39-.38.39-1.02 0-1.41zM3.01 10.5H1.99c-.55 0-1.01.45-1.01 1s.45 1 1.01 1h1.02c.55 0 .99-.45.99-1s-.44-1-.99-1zm9-9.95C12.01.25 11.56-.2 11.01-.2s-1 .45-1 1v1.02c0 .55.45 1.01 1 1.01s1-.46 1-1.01V.55z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Tiger eyes icon with float */}
          <div
            ref={heading.ref}
            className={`mb-8 scroll-fade-in ${heading.isVisible ? 'visible' : ''}`}
          >
            <div className="flex gap-3 items-center justify-center">
              <svg className="w-12 h-12 text-amber-700" viewBox="0 0 64 64" fill="currentColor">
                <circle cx="32" cy="32" r="28" fill="#D97706" opacity="0.2"/>
                <circle cx="32" cy="32" r="16" fill="#92400E"/>
                <circle cx="32" cy="32" r="8" fill="#1C1917"/>
                <circle cx="28" cy="28" r="3" fill="#FFF" opacity="0.6"/>
              </svg>
              <svg className="w-12 h-12 text-amber-700" viewBox="0 0 64 64" fill="currentColor">
                <circle cx="32" cy="32" r="28" fill="#D97706" opacity="0.2"/>
                <circle cx="32" cy="32" r="16" fill="#92400E"/>
                <circle cx="32" cy="32" r="8" fill="#1C1917"/>
                <circle cx="28" cy="28" r="3" fill="#FFF" opacity="0.6"/>
              </svg>
            </div>
          </div>

          <h3
            ref={quote.ref}
            className={`text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 scroll-fade-in stagger-1 ${quote.isVisible ? 'visible' : ''}`}
          >
            From a Lodge to a Home...
          </h3>

          <div className="divider-organic" />

          <p
            ref={body.ref}
            className={`text-xl italic text-gray-600 dark:text-gray-300 mb-8 font-light scroll-fade-in stagger-2 ${body.isVisible ? 'visible' : ''}`}
          >
            Welcome to Bardia Eco-Friendly Homestay, a jungle paradise lodge where you will soon feel like home.
          </p>

          <p className={`text-gray-700 dark:text-gray-400 leading-relaxed mb-12 max-w-2xl scroll-fade-in stagger-3 ${body.isVisible ? 'visible' : ''}`}>
            Nestled on the edge of Bardia National Park, Bardia Eco-Friendly Homestay is a place for travelers to escape the roar of the city and find the roar of the tiger. It's a place of adventure and discovery, a pristine wilderness, where humans, elephants, rhinoceroses, tigers and many more live side by side...
          </p>


        </div>
      </div>
    </section>
  );
}
