import { Link, useLocation } from 'react-router-dom';
import { whatsappUrl } from '@/constants';
import { SocialIcon } from '@/components/common/SocialIcon';

export function ContactButtons() {
  const isContactPage = useLocation().pathname.replace(/\/+$/, '') === '/contact';

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
      {!isContactPage && (
        <Link
          className="bg-white text-living-canopy font-bold text-xs uppercase px-6 py-3 rounded-full shadow-lg hover:bg-moonlight transition-colors"
          to="/contact"
        >
          Contact Us!
        </Link>
      )}
      <a
        aria-label="Chat with us on WhatsApp"
        className="bg-living-canopy p-3 rounded-full text-white shadow-lg hover:bg-deep-forest transition-colors"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialIcon name="whatsapp" className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
