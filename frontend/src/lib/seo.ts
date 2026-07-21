import { SITE_URL } from '@/components/seo/PageSeo';

export function breadcrumbJsonLd(items: Array<{ label: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export const lodgingBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${SITE_URL}/#lodging`,
  name: 'Bardia Eco-Friendly Homestay',
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  description:
    'Eco-friendly homestay and wildlife travel experiences near Bardia National Park in Thakurdwara, Nepal.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Thakurdwara',
    addressRegion: 'Bardiya',
    addressCountry: 'NP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.4411,
    longitude: 81.2858,
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Bardia Eco-Friendly Homestay',
  url: SITE_URL,
  publisher: {
    '@id': `${SITE_URL}/#lodging`,
  },
};
