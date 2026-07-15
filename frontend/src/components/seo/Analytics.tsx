import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const SITE_URL = 'https://www.bardiaecofriendlyhomestay.com';
let isInitialized = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return;
  }

  if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer?.push(Array.from(arguments));
  };

  if (!isInitialized) {
    window.gtag('js', new Date());
    isInitialized = true;
  }
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    loadGoogleAnalytics();
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: `${SITE_URL}${location.pathname}${location.search}`,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [location.pathname, location.search]);

  return null;
}
