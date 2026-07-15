import { useState, type FormEvent } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useApi } from '@/hooks/useApi';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { usePageSeo } from '@/hooks/usePageSeo';

/* ── Types ── */

interface ContactMethod {
  id: number;
  icon: string;
  title: string;
  detail: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface SocialLink {
  id: number;
  icon_name: string;
  label: string;
  href: string;
  display_order: number;
  is_active: boolean;
}

const API_BASE = 'https://api.bardiaecofriendlyhomestay.com/api';
const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
];

function SocialIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  const cls = "w-7 h-7 sm:w-8 sm:h-8 fill-current";
  if (n === 'facebook') return <svg className={cls} viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>;
  if (n === 'instagram') return <svg className={cls} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
  if (n === 'youtube') return <svg className={cls} viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
  if (n === 'twitter' || n === 'x') return <svg className={cls} viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
  if (n === 'tiktok') return <svg className={cls} viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
  if (n === 'pinterest') return <svg className={cls} viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>;
  if (n === 'whatsapp') return <svg className={cls} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
  if (n === 'linkedin') return <svg className={cls} viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  // fallback globe icon
  return <svg className={cls} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>;
}

interface ApiPackage {
  id: number;
  name: string;
  duration: string;
}

const GUEST_OPTIONS = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests'];

/* ── Component ── */

export function ContactPage() {
  const hero = useScrollAnimation();
  const methods = useScrollAnimation();
  const formSection = useScrollAnimation();
  const social = useScrollAnimation();
  const seo = usePageSeo('contact', {
    title: 'Contact',
    description: 'Contact Bardia Eco-Friendly Homestay to plan your stay, ask about safari packages, or request travel information.',
    image: '/logo.png',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: contactMethods = [] } = useApi<ContactMethod[]>({
    url: `${API_BASE}/contact-methods/list`
  });

  const { data: socials = [] } = useApi<SocialLink[]>({
    url: `${API_BASE}/social-links/list`
  });

  const { data: packages = [] } = useApi<ApiPackage[]>({
    url: `${API_BASE}/packages/list`
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      num_guests: formData.get('num_guests') as string,
      preferred_package: formData.get('preferred_package') as string,
      travel_dates: formData.get('travel_dates') as string,
      message: formData.get('message') as string,
    };

    try {
      await fetch(`${API_BASE}/contact-submissions/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Failed to submit:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getHref = (method: ContactMethod) => {
    const title = method.title.toLowerCase();
    if (title.includes('call') || title.includes('phone')) return `tel:${method.detail}`;
    if (title.includes('email') || title.includes('mail')) return `mailto:${method.detail}`;
    if (title.includes('whatsapp') || title.includes('message')) return `https://wa.me/${method.detail.replace(/\D/g, '')}`;
    return '#';
  };

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/contact"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        jsonLd={breadcrumbJsonLd(breadcrumbs)}
      />
      <Breadcrumbs items={breadcrumbs} />
      {/* ════════ HERO ════════ */}
      <section className="pt-36 sm:pt-44 pb-16 md:pb-20 px-6 sm:px-10 text-center max-w-4xl mx-auto">
        <div
          ref={hero.ref}
          className={`scroll-fade-in ${hero.isVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-[11px] tracking-[0.25em] uppercase text-golden-hour inline-flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-golden-hour" />
            Get in Touch
            <span className="w-8 h-px bg-golden-hour" />
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-bark-soil leading-[1.15] mb-7">
            Let's Start
            <br />
            <em className="text-golden-hour italic">Planning</em> Your Journey
          </h1>

          <p className="text-base sm:text-lg font-light leading-relaxed-plus text-gray-500 max-w-2xl mx-auto">
            Whether you're ready to book or just exploring possibilities, we're
            here to answer every question. The forest is waiting.
          </p>
        </div>
      </section>

      {/* ════════ CONTACT METHODS ════════ */}
      <section className="px-4 sm:px-10 pb-20 max-w-[1200px] mx-auto">
        <div
          ref={methods.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 scroll-fade-in ${methods.isVisible ? 'visible' : ''}`}
        >
          {(contactMethods || []).map((m, i) => {
            const href = getHref(m);
            return (
              <div
                key={m.id}
                className={`bg-white dark:bg-surface-dark p-10 rounded-2xl text-center shadow-card card-lift relative overflow-hidden scroll-fade-in stagger-${i + 1} ${methods.isVisible ? 'visible' : ''}`}
              >
                <div className="w-[72px] h-[72px] mx-auto mb-6 rounded-full bg-gradient-to-br from-golden-hour to-burnt-rust flex items-center justify-center text-3xl animate-float">
                  {m.icon}
                </div>
                <h3 className="font-display text-2xl text-bark-soil dark:text-soft-earth mb-3">{m.title}</h3>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-golden-hour hover:text-burnt-rust transition-colors duration-300 font-medium block mb-3 break-all text-sm sm:text-base"
                >
                  {m.detail}
                </a>
                {m.description && (
                  <p className="text-sm font-light leading-relaxed text-gray-400">{m.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════ FORM & MAP ════════ */}
      <section className="py-20 md:py-24 px-4 sm:px-10 bg-deep-forest relative grain-texture">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #C8843A 50%, transparent 100%)' }} />

        <div
          ref={formSection.ref}
          className={`max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 scroll-fade-in ${formSection.isVisible ? 'visible' : ''}`}
        >
          {/* Form Side */}
          <div>
            <div className="mb-10">
              <span className="font-accent text-[10px] tracking-[0.28em] uppercase text-golden-hour block mb-5">
                Send a Message
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-soft-earth leading-tight mb-4">
                Tell Us About
                <br />
                Your <em className="text-golden-hour italic">Travel Plans</em>
              </h2>
              <p className="text-base font-light leading-relaxed text-soft-earth/60">
                Fill out this form and we'll respond within a few hours with
                availability, recommendations, and answers.
              </p>
            </div>

            {submitted ? (
              <div className="py-5 px-6 rounded-lg bg-teal/20 border border-teal text-soft-earth text-center animate-fade-in">
                ✓ Thank you! We will contact you soon.
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-deep-forest px-2 font-accent text-[10px] tracking-[0.16em] uppercase text-golden-hour font-medium">
                    Your Name
                  </label>
                  <input
                    name="full_name"
                    type="text"
                    required
                    placeholder="Full name"
                    className="w-full py-4 px-5 bg-soft-earth/5 border border-soft-earth/15 rounded-lg text-soft-earth placeholder-soft-earth/30 focus:border-golden-hour focus:bg-soft-earth/[0.08] transition-all duration-300 outline-none"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-deep-forest px-2 font-accent text-[10px] tracking-[0.16em] uppercase text-golden-hour font-medium">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full py-4 px-5 bg-soft-earth/5 border border-soft-earth/15 rounded-lg text-soft-earth placeholder-soft-earth/30 focus:border-golden-hour focus:bg-soft-earth/[0.08] transition-all duration-300 outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-deep-forest px-2 font-accent text-[10px] tracking-[0.16em] uppercase text-golden-hour font-medium">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full py-4 px-5 bg-soft-earth/5 border border-soft-earth/15 rounded-lg text-soft-earth placeholder-soft-earth/30 focus:border-golden-hour focus:bg-soft-earth/[0.08] transition-all duration-300 outline-none"
                  />
                </div>

                {/* Guests */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-deep-forest px-2 font-accent text-[10px] tracking-[0.16em] uppercase text-golden-hour font-medium z-10">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <select
                      name="num_guests"
                      required
                      className="w-full py-4 px-5 pr-10 bg-soft-earth/5 border border-soft-earth/15 rounded-lg text-soft-earth focus:border-golden-hour focus:bg-soft-earth/[0.08] transition-all duration-300 outline-none appearance-none cursor-pointer [&>option]:bg-[#1C2B1A] [&>option]:text-soft-earth"
                    >
                      <option value="">Select</option>
                      {GUEST_OPTIONS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-earth/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Package */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-deep-forest px-2 font-accent text-[10px] tracking-[0.16em] uppercase text-golden-hour font-medium z-10">
                    Preferred Package
                  </label>
                  <div className="relative">
                    <select
                        id="preferred_package"
                        name="preferred_package"
                        className="w-full bg-soft-earth/5 border border-soft-earth/10 rounded-xl px-5 py-4 text-soft-earth focus:outline-none focus:border-golden-hour transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-deep-forest text-soft-earth">General Inquiry</option>
                        {(packages || []).map((pkg) => (
                          <option key={pkg.id} value={pkg.name} className="bg-deep-forest text-soft-earth">
                            {pkg.name}
                          </option>
                        ))}
                      </select><svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-earth/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                {/* Dates */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-deep-forest px-2 font-accent text-[10px] tracking-[0.16em] uppercase text-golden-hour font-medium">
                    Travel Dates
                  </label>
                  <input
                    name="travel_dates"
                    type="date"
                    className="w-full py-4 px-5 bg-soft-earth/5 border border-soft-earth/15 rounded-lg text-soft-earth placeholder-soft-earth/30 focus:border-golden-hour focus:bg-soft-earth/[0.08] transition-all duration-300 outline-none [color-scheme:dark]"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-deep-forest px-2 font-accent text-[10px] tracking-[0.16em] uppercase text-golden-hour font-medium">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your interests, special requirements, questions..."
                    className="w-full py-4 px-5 bg-soft-earth/5 border border-soft-earth/15 rounded-lg text-soft-earth placeholder-soft-earth/30 focus:border-golden-hour focus:bg-soft-earth/[0.08] transition-all duration-300 outline-none resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-golden-hour text-bark-soil font-accent text-[12px] tracking-[0.18em] uppercase font-semibold rounded-lg hover:shadow-lg hover:shadow-golden-hour/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Map Side */}
          <div className="lg:sticky lg:top-28">
            <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d81.2400799!3d28.4358814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI2JzA5LjIiTiA4McKwMTQnMjQuMyJF!5e0!3m2!1sen!2snp!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bardia Eco-Friendly Homestay Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SOCIAL MEDIA ════════ */}
      <section className="py-20 md:py-24 px-6 sm:px-10 bg-deep-forest text-center grain-texture">
        <div
          ref={social.ref}
          className={`max-w-2xl mx-auto scroll-fade-in ${social.isVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-[10px] tracking-[0.28em] uppercase text-golden-hour block mb-5">
            Follow Our Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-soft-earth leading-tight mb-5">
            Connect With Us on <em className="text-golden-hour italic">Social Media</em>
          </h2>
          <p className="text-base font-light leading-relaxed-plus text-soft-earth/60 mb-12">
            Daily stories from the forest, guest experiences, wildlife sightings,
            and seasonal updates. Join our community.
          </p>

          <div className="flex justify-center gap-5 flex-wrap">
            {(socials || []).map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-soft-earth/5 border border-soft-earth/15 flex items-center justify-center text-soft-earth/70 hover:bg-golden-hour hover:text-white hover:border-golden-hour hover:-translate-y-2 hover:rotate-6 transition-all duration-400"
              >
                <SocialIcon name={s.icon_name} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
