import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useApi } from '@/hooks/useApi';
import { useParallax } from '@/hooks/useParallax';
import { usePageSeo } from '@/hooks/usePageSeo';
import { getApiBaseUrl } from '@/lib/apiBase';
import { aboutPageJsonLd, breadcrumbJsonLd, lodgingBusinessJsonLd, ownerJsonLd } from '@/lib/seo';
import { contactHref, type ContactMethod } from '@/lib/contact';
import { getPrerenderData } from '@/lib/prerender';
import { internationalDigits, whatsappUrl } from '@/constants';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { PackageIcon } from '@/components/common/PackageIcon';
import type { AboutBlock, AboutContent } from '@/types/about';
import type { BlogPostsResponse } from '@/types/blog';

const API_BASE = getApiBaseUrl();

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
];

// Shown until the CMS has content (or if the API is unreachable). Mirrors migrations/add_about_sections.sql.
const block = (id: number, fields: Partial<AboutBlock> & Pick<AboutBlock, 'title'>): AboutBlock => ({
  id,
  subtitle: null,
  body: null,
  image_url: null,
  image_alt: null,
  icon: null,
  display_order: id,
  ...fields,
});

const DEFAULT_ABOUT: AboutContent = {
  hero: block(-1, {
    title: 'A Family Home at the Edge of the Jungle',
    subtitle: 'We are a small, locally run homestay in Thakurdwara, a short walk from Bardia National Park.',
    image_url: '/gallery/homestay.jpg',
    image_alt: 'Bardia Eco-Friendly Homestay surrounded by green trees',
  }),
  story: block(-2, {
    title: 'Why We Opened Our Home',
    subtitle: 'We want every guest to leave knowing the forest a little better, and caring about it a little more.',
    body:
      'Bardia Eco-Friendly Homestay started as our family home on the edge of the park. Travelers kept asking where to stay close to the tigers, so we opened our doors.\n\n' +
      'Today our guests sleep in simple, comfortable rooms, eat vegetables from our own farm, and head into the jungle with guides who grew up beside it.\n\n' +
      'We keep things small on purpose. Fewer guests means quieter safaris, real conversations around the fire, and less pressure on the forest we depend on.',
    image_url: '/gallery/homestay1.jpg',
    image_alt: 'Guest area at Bardia Eco-Friendly Homestay',
  }),
  owner: block(-10, {
    title: 'Shardul Bhattarai',
    subtitle: 'Wildlife Guide | Safari Specialist | Wildlife Photographer | Human-Wildlife Coexistence Advocate',
    body:
      "Shardul Bhattarai is a passionate wildlife professional based in the Bardia region of Nepal, with experience in wildlife tourism since 2014. Through his work as a safari guide, photographer, and tourism entrepreneur, he is dedicated to showcasing Nepal's rich biodiversity while promoting responsible wildlife tourism and conservation awareness.\n\n" +
      '• Wildlife & Safari Expertise: Experienced in wildlife tracking, tiger observation, and guiding visitors through the natural habitats of Bardia National Park.\n' +
      '• Human-Wildlife Conflict Support: Committed to supporting people affected by human-wildlife conflict and advocating for practical solutions that protect local communities while conserving wildlife.\n' +
      '• Wildlife Photography: Captures the beauty, behaviour, and ecological importance of wildlife to inspire conservation awareness.\n' +
      '• Sustainable Tourism: Owner of Bardia Eco Friendly Homestay, promoting authentic local hospitality, nature-based tourism, and meaningful cultural experiences.\n' +
      "• Communication Skills: Excellent English communication skills and the ability to speak Japanese, helping connect international visitors with Nepal's wildlife and local communities.\n" +
      "• Conservation Vision: Dedicated to strengthening the relationship between people and nature, encouraging peaceful coexistence, and promoting the long-term conservation of Bardia's unique ecosystems.",
    image_url: '/gallery/shardul-bhattarai.webp',
    image_alt: 'Shardul Bhattarai with binoculars beside a safari jeep in Bardia National Park',
    phone: '+977 9842364787',
    email: 'shardul.bhattarai@gmail.com',
  }),
  values: [
    block(-3, { title: 'Wildlife Comes First', icon: 'binoculars', body: 'Our safaris follow park rules and keep a respectful distance. A good sighting is never worth stressing an animal.' }),
    block(-4, { title: 'Local Hands, Local Knowledge', icon: 'hiking', body: 'Our guides, cooks and staff are from Bardia. Your stay supports families in the village, not distant investors.' }),
    block(-5, { title: 'Food From Our Own Soil', body: 'Most of what you eat is grown on our organic farm, a few steps from the dining table.' }),
    block(-6, { title: 'Small by Design', icon: 'compass', body: 'A handful of rooms keeps the homestay calm and lets us give every guest real attention.' }),
  ],
  team: [
    block(-7, { title: 'Our Naturalist Guides', subtitle: 'Jungle walks and jeep safaris', body: "Licensed guides who know the tracks, calls and habits of Bardia's tigers, rhinos and elephants.", image_url: '/gallery/tourguide.jpg', image_alt: 'Naturalist guide in Bardia National Park' }),
    block(-8, { title: 'The Homestay Family', subtitle: 'Your hosts', body: 'We look after your rooms, your plans and your questions from the moment you arrive.', image_url: '/gallery/homestay2.jpg', image_alt: 'The homestay grounds' }),
    block(-9, { title: 'Our Kitchen', subtitle: 'Farm-to-table cooking', body: 'Home-style Nepali and Tharu meals, cooked fresh every day with produce from our farm.', image_url: '/gallery/homestay3.jpg', image_alt: 'Homestay kitchen and dining area' }),
  ],
};

// CMS bodies are plain text; a blank line starts a new paragraph
const paragraphs = (text: string | null) => (text ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

// Owner body: bio paragraphs, plus one "• Label: text" highlight per bullet line
function splitProfile(text: string | null) {
  const highlights: { label: string; text: string }[] = [];
  const prose: string[] = [];
  for (const line of (text ?? '').split(/\r?\n/)) { // CMS textareas save \r\n
    const bullet = line.match(/^\s*[•*-]\s+(.+)$/);
    if (!bullet) {
      prose.push(line);
      continue;
    }
    const colon = bullet[1].indexOf(':');
    highlights.push(
      colon > 0
        ? { label: bullet[1].slice(0, colon).trim(), text: bullet[1].slice(colon + 1).trim() }
        : { label: '', text: bullet[1].trim() }
    );
  }
  return { paragraphs: paragraphs(prose.join('\n')), highlights };
}

const reveal = (visible: boolean, extra = '') => `scroll-fade-in ${extra} ${visible ? 'visible' : ''}`;

/** Live numbers pulled from the rest of the site; a stat is hidden when its API has nothing. */
function useSiteStats() {
  const activities = useApi<unknown[]>({ url: `${API_BASE}/activities/list` });
  const packages = useApi<unknown[]>({ url: `${API_BASE}/packages/list` });
  const photos = useApi<unknown[]>({ url: `${API_BASE}/gallery-images/list` });
  const posts = useApi<BlogPostsResponse>({ url: `${API_BASE}/blog-posts/list?page=1&per_page=1` });

  const stats = [
    { value: activities.data?.length ?? 0, label: 'Wildlife experiences', href: '/activities' },
    { value: packages.data?.length ?? 0, label: 'Safari and stay packages', href: '/packages' },
    { value: photos.data?.length ?? 0, label: 'Photos from Bardia', href: '/gallery' },
    { value: posts.data?.pagination?.total ?? 0, label: 'Stories on our blog', href: '/blog' },
  ].filter((s) => s.value > 0);

  return { stats, loading: activities.loading || packages.loading || photos.loading || posts.loading };
}

export function AboutPage() {
  const seo = usePageSeo('about', {
    title: 'About Us',
    description:
      'Meet the family, guides and kitchen behind Bardia Eco-Friendly Homestay, a small locally run homestay beside Bardia National Park.',
    image: '/gallery/homestay.jpg',
  });

  // Prerendered CMS content first (matches the static HTML), then fresh API data, then built-in defaults
  const { data } = useApi<AboutContent>({ url: `${API_BASE}/about/get` });
  const about = data ?? getPrerenderData().about ?? DEFAULT_ABOUT;
  const { hero, story, values, team } = about;
  // Older API responses (before the owner migration) have no owner key; fall back to the built-in profile
  const owner = about.owner === undefined ? DEFAULT_ABOUT.owner : about.owner;
  const profile = owner && splitProfile(owner.body);

  const { stats, loading: statsLoading } = useSiteStats();
  const { data: rawMethods } = useApi<ContactMethod[]>({ url: `${API_BASE}/contact-methods/list` });
  const contactMethods = (rawMethods || []).filter((m) => m.is_active !== false && contactHref(m));

  const heroImageRef = useParallax<HTMLImageElement>(0.25);
  const [heroRef, heroVisible] = useScrollAnimation();
  const [storyRef, storyVisible] = useScrollAnimation();
  const [ownerRef, ownerVisible] = useScrollAnimation({ threshold: 0.1 });
  const [valuesRef, valuesVisible] = useScrollAnimation({ threshold: 0.1 });
  const [teamRef, teamVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/about"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        jsonLd={[
          breadcrumbJsonLd(breadcrumbs),
          aboutPageJsonLd(seo.description),
          lodgingBusinessJsonLd,
          ...(owner ? [ownerJsonLd(owner)] : []),
        ]}
      />

      {/* ════════ HERO ════════ */}
      {hero && (
        <section className="relative min-h-[85dvh] flex items-end overflow-hidden bg-deep-forest">
          <div className="absolute inset-x-0 top-0 z-20">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          {hero.image_url && (
            <img
              ref={heroImageRef}
              src={hero.image_url}
              alt={hero.image_alt || ''}
              fetchPriority="high"
              width={1280}
              height={720}
              className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/90 via-deep-forest/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/70 via-transparent to-transparent" />

          <div
            ref={heroRef}
            className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 pb-16 md:pb-24 ${reveal(heroVisible)}`}
          >
            <span className="font-accent text-xs tracking-[0.25em] uppercase text-golden-hour inline-flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-golden-hour" />
              About Us
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-soft-earth max-w-3xl mb-6">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="text-base sm:text-lg font-light leading-relaxed-plus text-soft-earth/80 max-w-xl">
                {hero.subtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ════════ OWNER PROFILE ════════ */}
      {owner && profile && (
        <section className="py-20 md:py-28 px-6 sm:px-10 md:px-14 bg-moonlight" aria-labelledby="owner-name">
          <div ref={ownerRef} className={`max-w-[1300px] mx-auto ${reveal(ownerVisible)}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {owner.image_url && (
                <div className="lg:col-span-7 lg:order-2 overflow-hidden rounded-card shadow-card">
                  <img
                    src={owner.image_url}
                    alt={owner.image_alt || owner.title}
                    loading="lazy"
                    width={1600}
                    height={1146}
                    className="w-full aspect-[4/3] object-cover object-[25%_center]"
                  />
                </div>
              )}
              <div className={owner.image_url ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-12 max-w-3xl'}>
                <span className="font-accent text-xs tracking-[0.25em] uppercase text-golden-hour block mb-4">Meet Your Host</span>
                <h2 id="owner-name" className="font-display text-4xl md:text-5xl font-light text-bark-soil leading-[1.1] mb-4">
                  {owner.title}
                </h2>
                {owner.subtitle && (
                  <p className="flex flex-wrap gap-y-1 text-sm font-medium text-living-canopy mb-7">
                    {owner.subtitle.split('|').map((role, i) => (
                      <span key={role}>
                        {i > 0 && <span aria-hidden="true" className="text-golden-hour mx-2.5">/</span>}
                        {role.trim()}
                      </span>
                    ))}
                  </p>
                )}
                {profile.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="text-gray-700 font-light leading-relaxed-plus mb-5 max-w-[60ch]">
                    {p}
                  </p>
                ))}
                {(owner.phone || owner.email) && (
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
                    {owner.phone && (
                      <a
                        href={whatsappUrl(`Hello ${owner.title.split(' ')[0]}! I'd like to ask about a stay at your homestay.`, owner.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-brush btn-brush-gold"
                      >
                        Chat on WhatsApp
                      </a>
                    )}
                    {owner.phone && (
                      <a href={`tel:+${internationalDigits(owner.phone)}`} className="text-bark-soil hover:text-golden-hour transition-colors">
                        <span className="sr-only">Call </span>
                        {owner.phone}
                      </a>
                    )}
                    {owner.email && (
                      <a href={`mailto:${owner.email}`} className="text-bark-soil hover:text-golden-hour transition-colors break-all">
                        {owner.email}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {profile.highlights.length > 0 && (
              <dl className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
                {profile.highlights.map((h, i) => (
                  <div key={h.label || h.text.slice(0, 30)} className={`border-l-2 border-golden-hour/60 pl-5 ${reveal(ownerVisible, `stagger-${Math.min(i + 1, 5)}`)}`}>
                    {h.label && <dt className="font-display text-lg text-bark-soil mb-2">{h.label}</dt>}
                    <dd className="text-sm text-gray-700 font-light leading-relaxed">{h.text}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
      )}

      {/* ════════ STORY ════════ */}
      {story && (
        <section className="py-20 md:py-32 px-6 sm:px-10 md:px-14 max-w-[1400px] mx-auto">
          <div
            ref={storyRef}
            className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center ${reveal(storyVisible)}`}
          >
            {story.image_url && (
              <div className="md:col-span-5 overflow-hidden rounded-card shadow-card">
                <img
                  src={story.image_url}
                  alt={story.image_alt || ''}
                  loading="lazy"
                  width={1000}
                  height={1250}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            )}
            <div className={story.image_url ? 'md:col-span-7' : 'md:col-span-12 max-w-3xl'}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-bark-soil leading-tight mb-7">
                {story.title}
              </h2>
              {paragraphs(story.body).map((p) => (
                <p key={p.slice(0, 40)} className="text-gray-700 text-base font-light leading-relaxed-plus mb-5 max-w-[65ch]">
                  {p}
                </p>
              ))}
              {story.subtitle && (
                <blockquote className="text-xl md:text-2xl font-display italic text-living-canopy leading-relaxed mt-8 pl-7 border-l-2 border-golden-hour max-w-[55ch]">
                  “{story.subtitle}”
                </blockquote>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ════════ LIVE STATS ════════ */}
      {(statsLoading || stats.length > 0) && (
        <section className="py-14 md:py-16 px-6 sm:px-10 bg-deep-forest grain-texture relative" aria-label="Bardia Eco-Friendly Homestay in numbers">
          <dl className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {statsLoading && stats.length === 0
              ? Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-12 w-20 rounded bg-soft-earth/10 mb-3" />
                    <div className="h-3 w-32 rounded bg-soft-earth/10" />
                  </div>
                ))
              : stats.map((s) => (
                  <Link key={s.href} to={s.href} className="group block">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-4xl md:text-5xl text-golden-hour mb-2 group-hover:text-soft-earth transition-colors">
                      {s.value}
                    </dd>
                    <dd className="text-sm text-soft-earth/70 group-hover:text-soft-earth transition-colors" aria-hidden="true">
                      {s.label}
                    </dd>
                  </Link>
                ))}
          </dl>
        </section>
      )}

      {/* ════════ VALUES ════════ */}
      {values.length > 0 && (
        <section className="py-20 md:py-28 px-6 sm:px-10 md:px-14 bg-moonlight">
          <div ref={valuesRef} className="max-w-[1200px] mx-auto">
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-light text-bark-soil leading-tight mb-12 md:mb-16 max-w-2xl ${reveal(valuesVisible)}`}>
              What we care about
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {values.map((v, i) => (
                <article
                  key={v.id}
                  className={`border-t border-bark-soil/15 pt-7 flex gap-5 ${reveal(valuesVisible, `stagger-${Math.min(i + 1, 5)}`)}`}
                >
                  {v.icon && (
                    <PackageIcon icon={v.icon} className="w-8 h-8 shrink-0 text-golden-hour text-2xl leading-none flex items-center justify-center" />
                  )}
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-bark-soil mb-3">{v.title}</h3>
                    {paragraphs(v.body).map((p) => (
                      <p key={p.slice(0, 40)} className="text-gray-700 font-light leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ HOSTS & TEAM ════════ */}
      {team.length > 0 && (
        <section className="py-20 md:py-28 px-6 sm:px-10 md:px-14 max-w-[1400px] mx-auto">
          <div ref={teamRef}>
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-light text-bark-soil leading-tight mb-12 md:mb-16 ${reveal(teamVisible)}`}>
              The people you will meet
            </h2>
            {/* First member gets the tall feature slot; the rest stack beside it */}
            <div className={`grid grid-cols-1 gap-10 ${team.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl'}`}>
              {team.map((member, i) => {
                const featured = i === 0 && team.length > 2;
                return (
                  <article
                    key={member.id}
                    className={`group flex flex-col ${featured ? 'lg:row-span-2' : ''} ${reveal(teamVisible, `stagger-${Math.min(i + 1, 5)}`)}`}
                  >
                    {member.image_url && (
                      <div className={`overflow-hidden rounded-card mb-5 ${featured ? 'aspect-[4/5] lg:aspect-auto lg:flex-1 lg:min-h-[420px]' : 'aspect-[16/10]'}`}>
                        <img
                          src={member.image_url}
                          alt={member.image_alt || member.title}
                          loading="lazy"
                          width={1200}
                          height={featured ? 1500 : 750}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h3 className="font-display text-2xl text-bark-soil">{member.title}</h3>
                    {member.subtitle && <p className="text-sm text-golden-hour font-medium mt-1">{member.subtitle}</p>}
                    {member.body && <p className="text-gray-700 font-light leading-relaxed mt-3 max-w-[60ch]">{member.body}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════ CONTACT CTA ════════ */}
      <section className="py-20 md:py-28 px-6 sm:px-10 md:px-14 bg-deep-forest grain-texture relative border-t border-golden-hour/30">
        <div
          ref={ctaRef}
          className={`max-w-[1200px] mx-auto grid grid-cols-1 gap-12 ${contactMethods.length > 0 ? 'lg:grid-cols-[1.3fr_1fr] lg:gap-20' : ''} items-center ${reveal(ctaVisible)}`}
        >
          <div>
            <span className="font-accent text-xs tracking-[0.25em] uppercase text-golden-hour block mb-5">Plan Your Stay</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-soft-earth leading-tight mb-5">
              Come and stay <em className="text-golden-hour italic">with us</em>
            </h2>
            <p className="text-base font-light leading-relaxed-plus text-soft-earth/75 mb-10 max-w-lg">
              Tell us your dates and what you hope to see. We usually reply within a few hours with availability and ideas.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-brush btn-brush-gold">
                Contact Us
              </Link>
              <a
                href={whatsappUrl("Hello! I read about your homestay and I'd like to plan a stay.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-soft-earth/30 text-soft-earth font-accent text-xs tracking-[0.16em] uppercase hover:border-golden-hour hover:text-golden-hour transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {contactMethods.length > 0 && (
            <ul className="space-y-6 lg:border-l lg:border-soft-earth/15 lg:pl-12">
              {contactMethods.map((m) => {
                const href = contactHref(m)!;
                const external = href.startsWith('http');
                return (
                  <li key={m.id}>
                    <p className="text-xs uppercase tracking-[0.16em] text-soft-earth/60 mb-1">{m.title}</p>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="font-display text-base sm:text-xl md:text-2xl text-soft-earth hover:text-golden-hour transition-colors break-words"
                    >
                      {m.detail}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
