import { Header } from '@/components/layout/Header';
import { IntroSection } from '../components/IntroSection';
import { TestimonialSection } from '../components/TestimonialSection';
import { AccommodationsSection } from '../components/AccommodationsSection';
import { SafariSection } from '../components/SafariSection';
import { PackagesSection } from '../components/PackagesSection';
import { WildlifeSection } from '../components/WildlifeSection';
import { BlogSection } from '../components/BlogSection';
import { PageSeo } from '@/components/seo/PageSeo';
import { lodgingBusinessJsonLd } from '@/lib/seo';
import { usePageSeo } from '@/hooks/usePageSeo';

export function HomePage() {
  const seo = usePageSeo('home', {
    title: 'Bardia Eco-Friendly Homestay',
    description: 'Stay near Bardia National Park at an eco-friendly homestay offering wildlife safaris, local food, and responsible travel experiences.',
    image: '/tiger.jpg',
  });

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        jsonLd={lodgingBusinessJsonLd}
      />
      <Header />
      <IntroSection />
      <TestimonialSection />
      <AccommodationsSection />
      <SafariSection />
      <PackagesSection />
      <WildlifeSection />
      <BlogSection />
    </>
  );
}

