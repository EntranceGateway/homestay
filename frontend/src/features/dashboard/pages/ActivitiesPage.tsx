import { ActivitiesSection } from '../components/ActivitiesSection';
import { PageSeo } from '@/components/seo/PageSeo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { usePageSeo } from '@/hooks/usePageSeo';

export function ActivitiesPage() {
  const seo = usePageSeo('activities', {
    title: 'Activities and Wildlife Experiences',
    description:
      'Explore Bardia wildlife activities, jungle safaris, river expeditions, birdwatching, and local nature experiences guided by veteran naturalists.',
    image: '/safari.webp',
  });

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/activities"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        jsonLd={breadcrumbJsonLd([
          { label: 'Home', href: '/' },
          { label: 'Activities', href: '/activities' },
        ])}
      />
      <ActivitiesSection />
    </>
  );
}
