const DEFAULT_API_BASE = 'https://api.bardiaecofriendlyhomestay.com/api';

export function getApiBaseUrl() {
  const configuredBase = import.meta.env.VITE_API_URL?.trim();
  if (configuredBase) {
    return configuredBase.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '/api';
    }
  }

  return DEFAULT_API_BASE;
}