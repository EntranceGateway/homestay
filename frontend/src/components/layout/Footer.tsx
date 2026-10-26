import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { getApiBaseUrl } from '@/lib/apiBase';
import { contactHref, type ContactMethod } from '@/lib/contact';
import { SocialIcon, type SocialLink } from '@/components/common/SocialIcon';
import { SITE_NAME } from '@/constants';

const API_BASE = getApiBaseUrl();

const PAGE_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Activities', href: '/activities' },
  { label: 'Packages', href: '/packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Farm to Table', href: '/farm-to-table' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const headingClass = 'font-accent text-xs uppercase tracking-[0.22em] text-golden-hour font-semibold mb-4';

export function Footer() {
  const { data: rawSocials } = useApi<SocialLink[]>({ url: `${API_BASE}/social-links/list` });
  const { data: rawMethods } = useApi<ContactMethod[]>({ url: `${API_BASE}/contact-methods/list` });

  const socials = (rawSocials || []).filter((s) => s.is_active);
  const methods = (rawMethods || []).filter((m) => m.is_active !== false && contactHref(m));

  return (
    <footer className="bg-living-canopy text-white relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[50px] fill-soft-earth"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          aria-hidden="true"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-white/90">
            Our Commitment to Responsible Wildlife Travel
          </h2>
          <p className="text-white/80 text-sm leading-relaxed font-light">
            At <strong className="text-white">{SITE_NAME}</strong>, we believe that responsible wildlife tourism begins with protecting the environment that makes Bardia so special.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-12 text-sm">
          <div>
            <h3 className={headingClass}>Visit Us</h3>
            <address className="not-italic text-white/80 leading-relaxed">
              {SITE_NAME}
              <br />
              Thakurdwara, Bardiya
              <br />
              Lumbini Province, Nepal
            </address>
            {methods.length > 0 && (
              <ul className="mt-4 space-y-2">
                {methods.map((m) => {
                  const href = contactHref(m)!;
                  return (
                    <li key={m.id}>
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white/80 hover:text-golden-hour transition-colors break-all"
                      >
                        <span className="text-white/60">{m.title}:</span> {m.detail}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <nav aria-label="Footer">
            <h3 className={headingClass}>Explore</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/80 hover:text-golden-hour transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {socials.length > 0 && (
            <div>
              <h3 className={headingClass}>Follow Us</h3>
              <div className="flex items-center gap-4 flex-wrap">
                {socials.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-golden-hour hover:text-living-canopy text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  >
                    <SocialIcon name={link.icon_name} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/20 pt-8 text-xs text-white/60">
          © {new Date().getFullYear()} {SITE_NAME}
        </div>
      </div>
    </footer>
  );
}
