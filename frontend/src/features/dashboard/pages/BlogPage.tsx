import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { SITE_URL } from '@/components/seo/PageSeo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { usePageSeo } from '@/hooks/usePageSeo';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Bardiya National Park', href: '/blog' },
];

export function BlogPage() {
  const [scrollY, setScrollY] = useState(0);
  const para1 = useScrollAnimation();
  const img1 = useScrollAnimation();
  const para2 = useScrollAnimation();
  const img2 = useScrollAnimation();
  const para3 = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoTransform = scrollY * 0.3;
  const textTransform = scrollY * 0.15;
  const opacity = Math.max(0, 1 - scrollY / 800);
  const seo = usePageSeo('blog', {
    title: 'Bardiya National Park Guide',
    description: "Learn about Bardia National Park wildlife, walking safaris, Tharu culture, rivers, and tiger habitat in Nepal's wild west.",
    image: '/blogs/herosection.webp',
  });

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/blog"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        type="article"
        jsonLd={[
          breadcrumbJsonLd(breadcrumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Welcome to Bardiya National Park',
            description:
              "A travel guide to Bardia National Park wildlife, walking safaris, rivers, and Tharu culture.",
            image: `${SITE_URL}/blogs/herosection.webp`,
            mainEntityOfPage: `${SITE_URL}/blog`,
            publisher: {
              '@type': 'Organization',
              name: 'Bardia Eco-Friendly Homestay',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
              },
            },
          },
        ]}
      />
      {/* ───── Hero Section (parallax, same style as Header) ───── */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark">
        <div className="absolute inset-x-0 top-0 z-20">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div
          className="absolute inset-0 z-0 will-change-transform"
          style={{ transform: `translate3d(0, ${videoTransform}px, 0)` }}
        >
            <img
              src="/blogs/herosection.webp"
              alt="Bardiya National Park landscape"
              title="Bardiya National Park landscape"
              className="w-full h-full object-cover scale-110"
            width={1200}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark/40" />
        </div>

        <div
          className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto mt-10 md:mt-16 will-change-transform"
          style={{
            transform: `translate3d(0, ${textTransform}px, 0)`,
            opacity,
          }}
        >
          <p className="font-script text-accent-gold text-3xl sm:text-4xl md:text-6xl mb-4 animate-fade-in-up drop-shadow-lg">
            Explore the Wild
          </p>
          <h1 className="text-white font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 md:mb-8 leading-tight drop-shadow-2xl">
            Welcome to <br /> Bardiya National Park
          </h1>
          <div className="animate-bounce mt-12">
            <svg className="w-10 h-10 mx-auto text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </header>

      {/* ───── Blog Content ───── */}
      <article className="bg-background-light dark:bg-surface-dark">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-14 sm:py-18 md:py-24">
          {/* Paragraph 1 */}
          <div
            ref={para1.ref}
            className={`scroll-fade-in ${para1.isVisible ? 'visible' : ''}`}
          >
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed-plus mb-8 sm:mb-12">
              Deep in Nepal's wild west, Bardia National Park remains a raw,
              prehistoric sanctuary where the jungle still dictates the rules of
              life. Spanning 968 square kilometers of towering sal forests and vast
              emerald grasslands, it is the largest undisturbed wilderness in the
              Terai and a legendary stronghold for the Royal Bengal Tiger. Unlike its
              more famous counterparts, Bardia offers a quiet, high-stakes intimacy
              with nature; as of 2026, its tiger population has reached a record high
              of 125, making it the premier destination on Earth for those who seek
              the heart-stopping thrill of a true big cat encounter.
            </p>
          </div>

          {/* Image 1 — Tiger */}
          <figure
            ref={img1.ref}
            className={`mb-12 overflow-hidden rounded-card scroll-scale-in ${img1.isVisible ? 'visible' : ''}`}
          >
            <img
              src="/blogs/tiger1.jpg"
              alt="Royal Bengal Tiger in its natural habitat"
              title="Royal Bengal Tiger in Bardia National Park"
              className="w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[500px] object-cover"
              width={1600}
              height={1218}
              loading="lazy"
            />
            <figcaption className="bg-bark-soil text-soft-earth text-sm px-5 py-3">
              Royal Bengal Tiger habitat in the Bardia wilderness.
            </figcaption>
          </figure>

          {/* Paragraph 2 */}
          <div
            ref={para2.ref}
            className={`scroll-fade-in stagger-1 ${para2.isVisible ? 'visible' : ''}`}
          >
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed-plus mb-8 sm:mb-12">
              What sets Bardia apart is the adrenaline-fueled walking safari, a rare
              opportunity to track apex predators on foot with nothing but a bamboo
              staff and the expertise of local naturalists. As you move silently
              through waist-high grass, every snap of a twig or alarm call from a
              spotted deer heightens your senses, bridging the gap between human and
              beast in a way no vehicle can. This is a landscape shared with the
              Greater One-horned Rhino and the massive wild elephants of the Karnali
              floodplains, offering a visceral, "boots-on-the-ground" adventure that
              feels more like an expedition than a typical tour.
            </p>
          </div>

          {/* Image 2 — Tharu culture */}
          <figure
            ref={img2.ref}
            className={`mb-12 overflow-hidden rounded-card scroll-scale-in ${img2.isVisible ? 'visible' : ''}`}
          >
            <img
              src="/blogs/tharuculture-1600.webp"
              alt="Tharu dancers in traditional white dress"
              title="Tharu cultural dance in Bardiya"
              className="w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[500px] object-cover"
              width={1600}
              height={1067}
              loading="lazy"
            />
            <figcaption className="bg-bark-soil text-soft-earth text-sm px-5 py-3">
              Tharu cultural traditions remain central to the Bardiya travel experience.
            </figcaption>
          </figure>

          {/* Paragraph 3 */}
          <div
            ref={para3.ref}
            className={`scroll-fade-in stagger-1 ${para3.isVisible ? 'visible' : ''}`}
          >
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed-plus mb-8 sm:mb-12">
              Beyond the dense thickets, the park's lifeblood flows through the
              Karnali and Babai Rivers, where the water reveals a different side of
              the wild. A drift down these ancient currents might grant you a glimpse
              of the rare, prehistoric-looking Gharial crocodile or the shy Gangetic
              River Dolphin surfacing in the mist. Your journey is completed by the
              vibrant Tharu culture, the indigenous soul of the region whose
              mud-walled villages and rhythmic dances tell a story of centuries-old
              harmony with the tigers. In Bardia, the adventure isn't just about what
              you see—it's about the wild, untamed spirit that stays with you long
              after the jungle silence returns.
            </p>
          </div>

        </div>

        {/* ───── Contact Section (full-width parallax) ───── */}
        <section
          className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden parallax-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/blogs/contect.jpg')`,
          }}
        >
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <h2 className="text-white font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4">
              Ready for the
            </h2>
            <h3 className="font-script text-accent-gold text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8">
              Adventure?
            </h3>

            <div className="divider-organic mb-10" />

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              Let us plan your Bardia experience. From walking safaris to cultural
              immersions, every journey is crafted just for you.
            </p>

          <Link to="/contact" className="btn-brush btn-brush-gold">
            Contact Us
          </Link>
          </div>
        </section>
      </article>
    </>
  );
}
