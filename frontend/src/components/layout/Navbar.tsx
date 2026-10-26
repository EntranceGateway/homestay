import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDialog } from '@/hooks/useDialog';

const LEFT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Activities', href: '/activities' },
  { label: 'Gallery', href: '/gallery' },
];

const RIGHT_LINKS = [
  { label: 'Farm to Table', href: '/farm-to-table' },
  { label: 'Packages', href: '/packages' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };
  // Wraps bar + menu so the toggle button stays reachable while focus is trapped
  const menuRef = useDialog<HTMLDivElement>(isOpen, handleNavClick);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-accent text-xs tracking-[0.16em] uppercase drop-shadow-md hover:text-golden-hour transition-colors duration-300 whitespace-nowrap border-b pb-1 ${
      isActive ? 'text-golden-hour border-golden-hour' : 'text-white/90 border-transparent'
    }`;

  return (
    <div ref={menuRef}>
      <nav
        className={`fixed w-full z-[70] transition-all duration-500 ${
          isScrolled
            ? 'bg-deep-forest/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
            : 'bg-gradient-to-b from-black/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* ── Desktop: centered logo with split links ── */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] items-center gap-6 xl:gap-12">
            {/* Left links */}
            <div className="flex items-center justify-end gap-5 xl:gap-8">
              {LEFT_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={linkClass}
                  onClick={handleNavClick}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Center logo */}
            <Link to="/" className="flex flex-col items-center gap-1 group shrink-0">
              <img
                src="/logo.png"
                alt="Bardia Eco-Friendly Homestay"
                width={468}
                height={322}
                className="h-16 w-auto group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-display text-white text-xs xl:text-sm tracking-[0.15em] uppercase leading-tight text-center drop-shadow-md">
                Bardia Eco-Friendly<br />Homestay
              </span>
            </Link>

            {/* Right links */}
            <div className="flex items-center justify-start gap-5 xl:gap-8">
              {RIGHT_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={linkClass}
                  onClick={handleNavClick}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ── Mobile: logo left, hamburger right ── */}
          <div className="flex lg:hidden items-center justify-between">
            <Link to="/" className="flex min-w-0 items-center gap-2">
              <img
                src="/logo.png"
                alt="Bardia Eco-Friendly Homestay"
                width={468}
                height={322}
                className="h-9 w-auto flex-shrink-0 sm:h-10"
              />
              <span className="font-display text-xs text-white tracking-[0.1em] uppercase leading-tight drop-shadow-md sm:text-xs sm:tracking-[0.12em]">
                Bardia Eco-Friendly<br />Homestay
              </span>
            </Link>

            <button
              className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded bg-deep-forest/70 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:text-golden-hour"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[65] overflow-y-auto bg-deep-forest px-4 pb-6 pt-24 shadow-2xl lg:hidden"
        >
          <div className="mx-auto max-w-[1400px] space-y-1">
            {ALL_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `block border-b border-white/10 px-3 py-3.5 font-accent text-sm tracking-[0.14em] uppercase last:border-b-0 hover:text-golden-hour transition-colors ${
                    isActive ? 'text-golden-hour' : 'text-white/90'
                  }`
                }
                onClick={handleNavClick}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
