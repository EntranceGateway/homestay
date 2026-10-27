export const SITE_URL = 'https://www.bardiaecofriendlyhomestay.com';
export const SITE_NAME = 'Bardia Eco-Friendly Homestay';
export const WHATSAPP_NUMBER = '9779842364787';

// Digits only, with Nepal's 977 code added to local 10-digit mobile numbers
export function internationalDigits(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? `977${digits}` : digits;
}

export function whatsappUrl(text?: string, phone: string = WHATSAPP_NUMBER) {
  const params = new URLSearchParams({ phone: internationalDigits(phone), type: 'phone_number', app_absent: '0' });
  if (text) params.set('text', text);
  return `https://api.whatsapp.com/send/?${params}`;
}
