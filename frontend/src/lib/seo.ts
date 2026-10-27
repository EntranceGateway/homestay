import { SITE_URL } from '@/constants';
import type { AboutBlock } from '@/types/about';

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

// About page entity, linked to the business described by lodgingBusinessJsonLd
export function aboutPageJsonLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: 'About Us',
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#lodging` },
  };
}

// Owner of the homestay, linked to the business as its founder
export function ownerJsonLd(owner: AboutBlock) {
  const image = owner.image_url && (owner.image_url.startsWith('http') ? owner.image_url : `${SITE_URL}${owner.image_url}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/about#owner`,
    name: owner.title,
    jobTitle: owner.subtitle?.split('|')[0].trim() || undefined,
    description: owner.subtitle || undefined,
    image: image || undefined,
    email: owner.email ? `mailto:${owner.email}` : undefined,
    telephone: owner.phone || undefined,
    worksFor: { '@id': `${SITE_URL}/#lodging` },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
