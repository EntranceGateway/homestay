import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function TestimonialSection() {
  const content = useScrollAnimation();

  return (
    <section
      className="py-24 text-center px-4 relative parallax-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(28, 43, 26, 0.78), rgba(28, 43, 26, 0.78)), url('/thakalifood.webp')`,
      }}
    >
      <div
        ref={content.ref}
        className={`max-w-4xl mx-auto scroll-fade-in ${content.isVisible ? 'visible' : ''}`}
      >
        {/* Large decorative quote marks */}
        <div className="text-accent-gold/30 mb-4">
          <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
        </div>

        <blockquote className="quote-decorative font-display text-2xl md:text-4xl text-gray-200 italic leading-relaxed mb-10 font-light">
          I would recommend this place to anyone who wants authentic place in Bardia, but still have the luxuries of home with amazing food!
        </blockquote>

        <div className="divider-organic" />

        <div className="flex flex-col items-center mt-6">
          <cite className={`not-italic font-script text-4xl text-accent-gold mb-3 scroll-fade-in stagger-2 ${content.isVisible ? 'visible' : ''}`}>
            Naomi, France
          </cite>
          <div className={`flex text-accent-gold text-sm gap-1.5 scroll-fade-in stagger-3 ${content.isVisible ? 'visible' : ''}`}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
