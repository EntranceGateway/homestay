import { GalleryHeroSection } from '../components/gallery/GalleryHeroSection';
import { GalleryMasonrySection } from '../components/gallery/GalleryMasonrySection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { usePageSeo } from '@/hooks/usePageSeo';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
];

export function GalleryPage() {
  const seo = usePageSeo('gallery', {
    title: 'Gallery',
    description: 'Explore rooms, wildlife, local culture, and nature photographs from Bardia Eco-Friendly Homestay near Bardia National Park.',
    image: '/gallery/tiger.jpg',
  });

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/gallery"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        jsonLd={breadcrumbJsonLd(breadcrumbs)}
      />
      <Breadcrumbs items={breadcrumbs} />
      <GalleryHeroSection />
      <GalleryMasonrySection />
    </>
  );
}
