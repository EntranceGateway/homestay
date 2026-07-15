import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function SafariSection() {
  const content = useScrollAnimation();

  return (
    <section
      className="py-32 relative parallax-fixed min-h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('/safari.webp')`,
      }}
    >
      <div
        ref={content.ref}
        className={`container mx-auto px-4 max-w-3xl text-center relative z-10 scroll-fade-in ${content.isVisible ? 'visible' : ''}`}
      >
        {/* Hiking icon */}
        <div className="mb-6">
          <svg className="w-14 h-14 mx-auto text-accent-gold/70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
          </svg>
        </div>

        <h2 className={`text-white font-display text-4xl md:text-6xl font-bold leading-tight mb-4 scroll-fade-in stagger-1 ${content.isVisible ? 'visible' : ''}`}>
          The Walking Safari:
        </h2>
        <h3 className={`font-script text-accent-gold text-5xl md:text-6xl mb-8 scroll-fade-in stagger-2 ${content.isVisible ? 'visible' : ''}`}>
          A Lifetime Experience!
        </h3>

        <div className="divider-organic" />

        <p className={`text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto scroll-fade-in stagger-3 ${content.isVisible ? 'visible' : ''}`}>
          We find Walking through Bardia National Park is one of the greatest ways to explore the jungle and see some wildlife. Immerse yourself in the wilderness and let it touch your soul, as you observe every detail around you, like paw prints or claw marks on trees.
        </p>


      </div>
    </section>
  );
}
