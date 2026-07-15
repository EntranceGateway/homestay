import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageSeo } from '@/components/seo/PageSeo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { usePageSeo } from '@/hooks/usePageSeo';

/* ── Data ── */

const PRINCIPLES = [
  { icon: '🌱', title: 'Zero Chemicals', desc: 'No pesticides, herbicides, or synthetic fertilizers have touched our soil in over a decade.' },
  { icon: '💧', title: 'Rainwater First', desc: 'We harvest every drop of rain. Our crops drink from the sky, not from depleted groundwater.' },
  { icon: '🌾', title: 'Heirloom Seeds', desc: 'Traditional varieties that have fed generations. Never GMO, never hybrid. Seeds we save and pass forward.' },
  { icon: '🔄', title: 'Crop Rotation', desc: 'We let the soil rest. Each season, different crops in different beds keep the earth healthy.' },
  { icon: '🦋', title: 'Biodiversity', desc: 'Over 40 varieties growing at any time. Companion planting. Native flowers for pollinators.' },
  { icon: '👨‍🌾', title: 'Human Hands', desc: 'Every plant is touched by human care. No machines for planting or harvesting.' },
];

const MENU_ITEMS = [
  { category: 'Garden Fresh', name: 'Farm Salad', ingredients: 'Lettuce, tomatoes, cucumber, radish, mint — all picked this morning', image: '/farmtotable/salad-1200.webp', width: 1200, height: 1553 },
  { category: 'Daily Staple', name: 'Organic Dal', ingredients: 'Lentils from our partner farm, spiced with garden herbs and ghee', image: '/farmtotable/dal.jpg', width: 612, height: 407 },
  { category: 'Dessert', name: 'Seasonal Fruits', ingredients: 'Whatever is ripe — papaya, banana, guava, or mango depending on the month', image: '/farmtotable/fruit.webp', width: 1024, height: 681 },
  { category: 'Beverages', name: 'Forest Tea', ingredients: 'Lemongrass, ginger, tulsi, mint — brewed fresh every evening', image: '/farmtotable/tea.jpg', width: 612, height: 408 },
  { category: 'Dinner Special', name: 'Roasted Vegetables', ingredients: 'Eggplant, peppers, zucchini — charred over wood fire', image: '/farmtotable/roastedvegetable.jpg', width: 1200, height: 800 },
  { category: 'Complete Meal', name: 'Forest Thali', ingredients: 'A plate that changes daily — 5 preparations, all organic, all from the farm', image: '/farmtotable/ForestThali.jpg', width: 348, height: 348 },
];

const WELLNESS_FEATURES = [
  { icon: '🌿', title: 'Naturally Alkaline', desc: 'Fresh vegetables balance pH without trying' },
  { icon: '💚', title: 'Gut-Friendly', desc: 'Fiber, probiotics, live enzymes intact' },
  { icon: '⚡', title: 'Energy, Not Stimulation', desc: 'No caffeine crashes, no sugar spikes' },
  { icon: '😌', title: 'Mindful Portions', desc: 'You eat till satisfied, not stuffed' },
];

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Farm to Table', href: '/farm-to-table' },
];

/* ── Component ── */

export function FarmToTablePage() {
  const hero = useScrollAnimation();
  const phil = useScrollAnimation();
  const principles = useScrollAnimation();
  const menu = useScrollAnimation();
  const wellness = useScrollAnimation();
  const cta = useScrollAnimation();
  const seo = usePageSeo('farm-to-table', {
    title: 'Farm to Table Organic Meals',
    description: 'Discover organic farm-to-table meals grown near Bardia Eco-Friendly Homestay, from fresh vegetables to seasonal forest thali.',
    image: '/farmtotable/hero.jpg',
  });

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path="/farm-to-table"
        image={seo.image}
        canonicalUrl={seo.canonicalUrl}
        noindex={seo.noindex}
        jsonLd={breadcrumbJsonLd(breadcrumbs)}
      />
      {/* ════════ HERO ════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden parallax-fixed"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(28, 43, 26, 0.85), transparent), url('/farmtotable/hero.jpg')`,
        }}
      >
        <div className="absolute inset-x-0 top-0 z-20">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div
          ref={hero.ref}
          className={`relative z-10 max-w-xl px-6 sm:px-10 md:px-14 scroll-fade-in ${hero.isVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-[11px] tracking-[0.25em] uppercase text-golden-hour inline-flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-golden-hour" />
            Our Philosophy
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-soft-earth mb-6">
            From <em className="text-golden-hour italic">Our Soil</em>
            <br />
            To Your Soul
          </h1>

          <p className="text-base sm:text-lg font-light leading-relaxed-plus text-soft-earth/70 max-w-md">
            Every meal at Bardia Eco-Friendly Homestay begins in our organic farm. What you taste
            today was growing in the earth yesterday — no journey longer than
            200 meters from soil to plate.
          </p>
        </div>
      </section>

      {/* ════════ PHILOSOPHY ════════ */}
      <section className="py-20 md:py-36 px-6 sm:px-10 md:px-14 max-w-[1400px] mx-auto">
        <div
          ref={phil.ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center scroll-fade-in ${phil.isVisible ? 'visible' : ''}`}
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-bark-soil leading-tight mb-7">
              We don't just <em className="text-golden-hour italic">serve</em> food.
              <br />
              We share what we grow.
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-base font-light leading-relaxed-plus mb-5">
              Our 4-acre organic farm has been chemical-free for 12 years. No
              pesticides, no synthetic fertilizers, no shortcuts. The vegetables
              you'll eat tonight are the same ones we feed our own children.
            </p>

            <blockquote className="text-xl font-display italic text-living-canopy leading-relaxed my-8 pl-7 border-l-2 border-golden-hour">
              "When you care for the soil, the soil cares for you. When you care
              for the food, the food cares for those who eat it."
            </blockquote>

            <p className="text-gray-600 dark:text-gray-400 text-base font-light leading-relaxed-plus">
              That's the entire philosophy. Everything else — the menus, the
              recipes, the way we plan meals around what's ready to harvest —
              follows from that single belief.
            </p>
          </div>

          <div className="h-[350px] sm:h-[450px] md:h-[600px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="/farmtotable/farming-1600.webp"
              alt="Organic farming at Bardia Eco-Friendly Homestay"
              title="Organic farming at Bardia Eco-Friendly Homestay"
              className="w-full h-full object-cover"
              width={1600}
              height={1067}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ════════ PRINCIPLES ════════ */}
      <section className="py-20 md:py-36 px-6 sm:px-10 md:px-14">
        <div
          ref={principles.ref}
          className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 scroll-fade-in ${principles.isVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-[10px] tracking-[0.28em] uppercase text-golden-hour block mb-5">
            What Guides Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-bark-soil leading-tight">
            Six Promises We <em className="text-golden-hour italic">Never</em> Break
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {PRINCIPLES.map((p, i) => (
            <div
              key={i}
              className={`text-center p-10 sm:p-12 bg-white dark:bg-surface-dark rounded-2xl shadow-card card-lift scroll-fade-in stagger-${(i % 5) + 1} ${principles.isVisible ? 'visible' : ''}`}
            >
              <span className="text-5xl mb-6 block">{p.icon}</span>
              <h3 className="font-display text-2xl text-bark-soil dark:text-soft-earth mb-4">{p.title}</h3>
              <p className="text-sm font-light leading-relaxed text-gray-500 dark:text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ MENU PREVIEW ════════ */}
      <section className="py-20 md:py-28 px-6 sm:px-10 md:px-14 bg-bark-soil relative overflow-hidden grain-texture">
        <div
          ref={menu.ref}
          className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 scroll-fade-in ${menu.isVisible ? 'visible' : ''}`}
        >
          <span className="font-accent text-[10px] tracking-[0.28em] uppercase text-golden-hour block mb-5">
            What You'll Taste
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-soft-earth leading-tight mb-5">
            Meals That Change With the <em className="text-golden-hour italic">Season</em>
          </h2>
          <p className="text-base font-light leading-relaxed-plus text-soft-earth/60">
            We don't have a fixed menu. We have a garden. What's ripe today
            decides what you'll eat tonight.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 max-w-[1400px] mx-auto">
          {MENU_ITEMS.map((item, i) => (
            <figure
              key={i}
              className={`relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden cursor-pointer group scroll-scale-in stagger-${(i % 5) + 1} ${menu.isVisible ? 'visible' : ''}`}
            >
              <img
                src={item.image}
                alt={item.name}
                title={`${item.name} - ${item.ingredients}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                width={item.width}
                height={item.height}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-400">
                <span className="font-accent text-[9px] tracking-[0.22em] uppercase text-golden-hour mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-soft-earth leading-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-sm font-light text-soft-earth/70 leading-relaxed">
                  {item.ingredients}
                </p>
              </div>
              <figcaption className="sr-only">
                {item.name}: {item.ingredients}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ════════ WELLNESS ════════ */}
      <section className="py-20 md:py-36 px-6 sm:px-10 md:px-14">
        <div
          ref={wellness.ref}
          className={`max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center scroll-fade-in ${wellness.isVisible ? 'visible' : ''}`}
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-bark-soil leading-tight mb-8">
              We don't talk about
              <br />
              <em className="text-golden-hour italic">nutrition</em> much.
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-base font-light leading-relaxed-plus mb-5">
              Because when food is this fresh, this chemical-free, this carefully
              grown — nutrition takes care of itself.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base font-light leading-relaxed-plus mb-5">
              But here's what guests tell us: they sleep better. Their skin
              clears. Digestion improves. Energy feels different — steadier,
              calmer. Children who are picky eaters suddenly finish their plates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
              {WELLNESS_FEATURES.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-golden-hour/10 flex items-center justify-center text-xl">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-bark-soil dark:text-soft-earth mb-1">{f.title}</h4>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="h-[350px] sm:h-[450px] lg:h-[520px] rounded-card overflow-hidden shadow-xl">
              <img
                src="/farmtotable/rice.jpg"
                alt="Fresh organic rice"
                title="Fresh organic rice"
                className="w-full h-full object-cover"
                width={1200}
                height={800}
                loading="lazy"
              />
            </div>
            <div className="hidden md:block absolute -bottom-10 -right-10 w-[280px] h-[200px] rounded-card overflow-hidden shadow-xl border-4 border-background-light dark:border-background-dark">
              <img
                src="/farmtotable/tomato.jpg"
                alt="Fresh tomatoes"
                title="Fresh tomatoes"
                className="w-full h-full object-cover"
                width={375}
                height={500}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section
        className="py-20 md:py-28 px-6 sm:px-10 text-center relative overflow-hidden parallax-fixed min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('/farmtotable/farming-1600.webp')`,
        }}
      >

        <div
          ref={cta.ref}
          className={`max-w-2xl mx-auto relative z-10 scroll-fade-in ${cta.isVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-soft-earth leading-tight mb-6">
            Taste the difference
            <br />
            <em className="text-golden-hour italic">real food</em> makes
          </h2>
          <p className="text-base font-light leading-relaxed-plus text-soft-earth/70 mb-10">
            Book your stay and experience meals the way they're meant to be —
            grown with care, cooked with intention, served with warmth.
          </p>
        </div>
      </section>
    </>
  );
}
