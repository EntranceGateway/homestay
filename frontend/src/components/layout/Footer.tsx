import { Link, useLocation } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { getApiBaseUrl } from '@/lib/apiBase';
import { SocialIcon, type SocialLink } from '@/components/common/SocialIcon';

const API_BASE = getApiBaseUrl();

export function Footer() {
  const location = useLocation();
  const isContactPage = location.pathname.replace(/\/+$/, '') === '/contact';

  const { data: rawSocials = [] } = useApi<SocialLink[]>({
    url: `${API_BASE}/social-links/list`,
  });

  const socials = (rawSocials || []).filter((s) => s.is_active);

  return (
    <footer className="bg-secondary text-white relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[50px] fill-background-light dark:fill-background-dark"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="font-display font-bold text-2xl md:text-3xl mb-6 text-white/90">
            Our Commitment to Responsible Wildlife Travel
          </h3>
          <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
            At <strong className="text-white">Bardia Eco-Friendly Homestay</strong>, we believe that responsible wildlife tourism begins with protecting the environment that makes Bardia so special.
          </p>
        </div>

        {!isContactPage && (
          <div className="flex flex-col items-center gap-4 mb-10">
            <Link
              to="/contact"
              className="font-accent text-xs uppercase tracking-[0.22em] text-accent-gold font-semibold hover:text-white transition-colors duration-300"
            >
              Contact Us
            </Link>
            {socials.length > 0 && (
              <div className="flex justify-center items-center gap-4 flex-wrap">
                {socials.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent-gold hover:text-secondary text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  >
                    <SocialIcon name={link.icon_name} />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-white/60">Copyright Bardia Eco-Friendly Homestay 2026</div>
        </div>
      </div>
    </footer>
  );
}
