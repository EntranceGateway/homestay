import { whatsappUrl } from '@/constants';

export interface ContactMethod {
  id: number;
  icon: string;
  title: string;
  detail: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

// CMS contact methods have no type field, so infer the link from the title
export function contactHref(method: ContactMethod) {
  const title = method.title.toLowerCase();
  if (title.includes('call') || title.includes('phone')) return `tel:${method.detail.replace(/\s+/g, '')}`;
  if (title.includes('email') || title.includes('mail')) return `mailto:${method.detail}`;
  if (title.includes('whatsapp') || title.includes('message')) return whatsappUrl();
  return undefined;
}
