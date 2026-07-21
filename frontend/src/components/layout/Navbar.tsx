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
    'font-accent text-[11px] tracking-[0.16em] uppercase text-white/90 drop-shadow-md hover:text-accent-gold transition-colors duration-300';

  return (
    <>
    <nav
      className={`fixed w-full z-[70] transition-all duration-500 ${
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
            <span className="font-display text-white text-sm tracking-[0.15em] uppercase leading-tight text-center drop-shadow-md">
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
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img
              src="/logo.png"
              alt="Bardia Eco-Friendly Homestay"
              width={468}
              height={322}
              className="h-9 w-auto flex-shrink-0 sm:h-10"
            />
            <span className="font-display text-[11px] text-white tracking-[0.1em] uppercase leading-tight drop-shadow-md sm:text-xs sm:tracking-[0.12em]">
              Bardia Eco-Friendly<br />Homestay
            </span>
          </Link>

          <button
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded bg-background-dark/70 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:text-accent-gold"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label="Toggle menu"
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
          className="fixed inset-0 z-[60] overflow-y-auto bg-[#1C2B1A] px-4 pb-6 pt-24 shadow-2xl lg:hidden"
        >
          <div className="mx-auto max-w-[1400px] space-y-1">
            {ALL_LINKS.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block border-b border-white/10 px-3 py-3.5 font-accent text-[12px] tracking-[0.14em] uppercase text-white/90 last:border-b-0 hover:text-accent-gold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="block border-b border-white/10 px-3 py-3.5 font-accent text-[12px] tracking-[0.14em] uppercase text-white/90 last:border-b-0 hover:text-accent-gold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </>
  );
}
