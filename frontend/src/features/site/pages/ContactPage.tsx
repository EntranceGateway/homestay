import { useState, type FormEvent } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useApi } from '@/hooks/useApi';
import { getApiBaseUrl } from '@/lib/apiBase';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { usePageSeo } from '@/hooks/usePageSeo';
import { PackageIcon } from '@/components/common/PackageIcon';
import { SocialIcon, type SocialLink } from '@/components/common/SocialIcon';
import { whatsappUrl } from '@/constants';
import { contactHref, type ContactMethod } from '@/lib/contact';

const API_BASE = getApiBaseUrl();
const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
];

interface ApiPackage {
  id: number;
  name: string;
  duration: string;
}

const GUEST_OPTIONS = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests'];

const labelClass =
  'absolute -top-2.5 left-4 z-10 bg-deep-forest px-2 font-accent text-xs tracking-[0.16em] uppercase text-golden-hour font-medium';
const fieldClass =
  'w-full py-4 px-5 bg-soft-earth/5 border border-soft-earth/15 rounded-lg text-soft-earth placeholder-soft-earth/40 focus:border-golden-hour focus:bg-soft-earth/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-hour transition-all duration-300';
const selectClass = `${fieldClass} pr-10 appearance-none cursor-pointer [&>option]:bg-deep-forest [&>option]:text-soft-earth`;
const chevron = (
  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-earth/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/* ── Component ── */

export function ContactPage() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [methodsRef, methodsVisible] = useScrollAnimation();
  const [formSectionRef, formSectionVisible] = useScrollAnimation();
  const [socialRef, socialVisible] = useScrollAnimation();
  const seo = usePageSeo('contact', {
    title: 'Contact',
    description: 'Contact Bardia Eco-Friendly Homestay to plan your stay, ask about safari packages, or request travel information.',
    image: '/logo.png',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { data: contactMethods = [] } = useApi<ContactMethod[]>({
    url: `${API_BASE}/contact-methods/list`});

  const { data: socials = [] } = useApi<SocialLink[]>({
    url: `${API_BASE}/social-links/list`});

  const { data: packages = [] } = useApi<ApiPackage[]>({
    url: `${API_BASE}/packages/list`});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(`${API_BASE}/contact-submissions/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || json?.status !== 'success') {
        throw new Error(json?.message || `We couldn't send your message (error ${res.status}).`);
      }
      form.reset();
      setStatus('sent');
    } catch (err) {
      // fetch() only throws on network failure; HTTP errors are thrown above
      setErrorMessage(err instanceof TypeError ? 'Network error. Check your connection.' : (err as Error).message);
      setStatus('error');
    }
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
          ref={heroRef}
          className={`scroll-fade-in ${heroVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-xs tracking-[0.25em] uppercase text-golden-hour inline-flex items-center gap-4 mb-6">
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
          ref={methodsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 scroll-fade-in ${methodsVisible ? 'visible' : ''}`}
        >
          {(contactMethods || []).map((m, i) => {
            const href = contactHref(m);
            return (
              <div
                key={m.id}
                className={`bg-white p-10 rounded-2xl text-center shadow-card card-lift relative overflow-hidden scroll-fade-in stagger-${i + 1} ${methodsVisible ? 'visible' : ''}`}
              >
                <div className="w-[72px] h-[72px] mx-auto mb-6 rounded-full bg-gradient-to-br from-golden-hour to-burnt-rust flex items-center justify-center text-3xl animate-float text-white">
                  <PackageIcon icon={m.icon} className="w-8 h-8 flex items-center justify-center" />
                </div>
                <h3 className="font-display text-2xl text-bark-soil mb-3">{m.title}</h3>
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
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
      <section className="py-20 md:py-24 px-4 sm:px-10 bg-deep-forest relative grain-texture border-t border-golden-hour/30">

        <div
          ref={formSectionRef}
          className={`max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 scroll-fade-in ${formSectionVisible ? 'visible' : ''}`}
        >
          {/* Form Side */}
          <div>
            <div className="mb-10">
              <span className="font-accent text-xs tracking-[0.28em] uppercase text-golden-hour block mb-5">
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

            {status === 'sent' ? (
              <div role="status" className="py-6 px-6 rounded-lg bg-dew-drop/20 border border-dew-drop text-soft-earth text-center animate-fade-in">
                <p className="mb-4">✓ Thank you! We will contact you soon.</p>
                <button type="button" onClick={() => setStatus('idle')} className="font-accent text-xs tracking-[0.16em] uppercase text-golden-hour hover:text-soft-earth underline underline-offset-4">
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <label htmlFor="full_name" className={labelClass}>Your Name</label>
                  <input id="full_name" name="full_name" type="text" required autoComplete="name" placeholder="Full name" className={fieldClass} />
                </div>

                <div className="relative">
                  <label htmlFor="email" className={labelClass}>Email Address</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" className={fieldClass} />
                </div>

                <div className="relative">
                  <label htmlFor="phone" className={labelClass}>Phone Number</label>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+977 98XXXXXXXX" className={fieldClass} />
                </div>

                <div className="relative">
                  <label htmlFor="num_guests" className={labelClass}>Number of Guests</label>
                  <select id="num_guests" name="num_guests" required className={selectClass}>
                    <option value="">Select</option>
                    {GUEST_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  {chevron}
                </div>

                <div className="relative">
                  <label htmlFor="preferred_package" className={labelClass}>Preferred Package</label>
                  <select id="preferred_package" name="preferred_package" className={selectClass}>
                    <option value="">General Inquiry</option>
                    {(packages || []).map((pkg) => (
                      <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
                    ))}
                  </select>
                  {chevron}
                </div>

                <div className="relative">
                  <label htmlFor="travel_dates" className={labelClass}>Arrival Date</label>
                  <input id="travel_dates" name="travel_dates" type="date" className={`${fieldClass} [color-scheme:dark]`} />
                </div>

                <div className="relative">
                  <label htmlFor="message" className={labelClass}>Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your interests, special requirements, questions..."
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                {status === 'error' && (
                  <p role="alert" className="py-4 px-5 rounded-lg bg-bird-paradise/20 border border-bird-paradise text-soft-earth text-sm">
                    {errorMessage} Your message is still here, so you can try again or{' '}
                    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-golden-hour underline underline-offset-4">
                      message us on WhatsApp
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-5 bg-golden-hour text-bark-soil font-accent text-xs tracking-[0.18em] uppercase font-semibold rounded-lg hover:shadow-lg hover:shadow-golden-hour/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-hour"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
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
          ref={socialRef}
          className={`max-w-2xl mx-auto scroll-fade-in ${socialVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-xs tracking-[0.28em] uppercase text-golden-hour block mb-5">
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
                <SocialIcon name={s.icon_name} className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
