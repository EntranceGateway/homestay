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
        <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-bark-soil leading-tight mb-7">
          Create Moments With Us
        </h1>
      </div>

      <div
        ref={desc.ref}
        className={`scroll-fade-in stagger-1 ${desc.isVisible ? 'visible' : ''}`}
      >
        <p className="text-base font-light leading-relaxed-plus text-gray-500 max-w-2xl mx-auto mb-10">
          I have curated lifestyle photographs where we get to feel more
          expressive. I want you to imagine who you are and perhaps are searching
          to unravel that too is where such from. There we let to my world,
          creative hearts and make a statement. This is my perfect blend of
          direction from me and you, a human walk to warm heart.
        </p>

        <span className="font-accent text-[10px] tracking-[0.2em] uppercase text-gray-400 inline-block mt-4">
          LET'S WORK IT
        </span>
      </div>
    </section>
  );
}
