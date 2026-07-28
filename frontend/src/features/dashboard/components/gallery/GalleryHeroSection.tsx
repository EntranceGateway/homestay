import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function GalleryHeroSection() {
  const heading = useScrollAnimation();
  const desc = useScrollAnimation();

  return (
    <section className="pt-32 pb-16 px-4 sm:pt-36 sm:pb-20 md:pt-44 md:pb-24 text-center max-w-4xl mx-auto">
      <div
        ref={heading.ref}
        className={`scroll-fade-in ${heading.isVisible ? 'visible' : ''}`}
      >
        <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-bark-soil dark:text-soft-earth leading-tight mb-7">
          Create Moments With Us
        </h1>
      </div>

      <div
        ref={desc.ref}
        className={`scroll-fade-in stagger-1 ${desc.isVisible ? 'visible' : ''}`}
      >
        <p className="text-base sm:text-lg font-body font-medium leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10">
          Immerse yourself in our curated gallery of wildlife, authentic homestay moments, lush national park landscapes, and Tharu cultural experiences in Bardia.
        </p>

        <span className="font-accent text-xs tracking-[0.2em] uppercase text-golden-hour font-bold inline-block mt-2">
          EXPLORE OUR GALLERY
        </span>
      </div>
    </section>
  );
}
