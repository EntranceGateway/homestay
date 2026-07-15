import { useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Reviews() {
  const heading = useScrollAnimation();
  const widget = useScrollAnimation();

  useEffect(() => {
    if (!widget.isVisible) {
      return;
    }

    const loadWidget = () => {
      // Only load the script once
      if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const idleCallback = window.requestIdleCallback?.(loadWidget) ?? window.setTimeout(loadWidget, 1200);

    return () => {
      if (typeof idleCallback === 'number') {
        window.clearTimeout(idleCallback);
      } else {
        window.cancelIdleCallback?.(idleCallback);
      }
    };
  }, [widget.isVisible]);

  return (
    <section className="py-24 bg-background-light dark:bg-surface-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section heading — matches IntroSection / other sections */}
        <div
          ref={heading.ref}
          className={`text-center mb-12 scroll-fade-in ${heading.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            What Our Guests Say
          </h2>
          <div className="divider-organic" />
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Real reviews from travelers who experienced Bardia with us
          </p>
        </div>

        {/* Elfsight widget — responsive wrapper */}
        <div
          ref={widget.ref}
          className={`max-w-5xl mx-auto scroll-fade-in stagger-2 ${widget.isVisible ? 'visible' : ''}`}
        >
          <div className="w-full overflow-x-auto">
            <div
              className="elfsight-app-3060ee1f-6961-4de3-94cf-d01a7d8df594"
              data-elfsight-app-lazy
            />
          </div>
        </div>
      </div>
    </section>
  );
}
