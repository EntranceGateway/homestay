export const SITE_URL = 'https://www.bardiaecofriendlyhomestay.com';
export const SITE_NAME = 'Bardia Eco-Friendly Homestay';
export const WHATSAPP_NUMBER = '9779842364787';

export function whatsappUrl(text?: string) {
  const params = new URLSearchParams({ phone: WHATSAPP_NUMBER, type: 'phone_number', app_absent: '0' });
  if (text) params.set('text', text);
  return `https://api.whatsapp.com/send/?${params}`;
}
