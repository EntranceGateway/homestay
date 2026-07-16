import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LEFT_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Farm to Table', href: '/farm-to-table' },
];

const RIGHT_LINKS = [
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

  const linkClass =
    'font-accent text-[11px] tracking-[0.16em] uppercase text-white/80 hover:text-accent-gold transition-colors duration-300';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background-dark/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-gradient-to-b from-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Desktop: centered logo with split links ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] items-center gap-14">
          {/* Left links */}
          <div className="flex items-center justify-end gap-8">
            {LEFT_LINKS.map((link) => (
              link.href.startsWith('/') ? (
                <Link key={link.href} to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Center logo */}
          <Link to="/" className="flex flex-col items-center gap-1 group">
            <img
              src="/logo.png"
              alt="Bardia Eco-Friendly Homestay"
              width={468}
              height={322}
              className="h-16 w-auto group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-display text-white text-sm tracking-[0.15em] uppercase leading-tight text-center">
              Bardia Eco-Friendly<br />Homestay
            </span>
          </Link>

          {/* Right links */}
          <div className="flex items-center justify-start gap-8">
            {RIGHT_LINKS.map((link) => (
              link.href.startsWith('/') ? (
                <Link key={link.href} to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>

        {/* ── Mobile: logo left, hamburger right ── */}
        <div className="flex lg:hidden items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Bardia Eco-Friendly Homestay"
              width={468}
              height={322}
              className="h-10 w-auto"
            />
            <span className="font-display text-white text-xs tracking-[0.12em] uppercase">
              Bardia Eco-Friendly<br />Homestay
            </span>
          </Link>

          <button
            className="p-2 text-white hover:text-accent-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label="Toggle menu"
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

      {/* ── Mobile menu ── */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-1 bg-background-dark/95 backdrop-blur-md border-t border-white/10">
            {ALL_LINKS.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-3 py-2.5 font-accent text-[11px] tracking-[0.14em] uppercase text-white/80 hover:text-accent-gold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 font-accent text-[11px] tracking-[0.14em] uppercase text-white/80 hover:text-accent-gold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
