import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const rooms = [
  { image: '/gallery/room1.jpg', width: 1280, height: 654 },
  { image: '/gallery/room2.jpg', width: 1280, height: 960, offset: true },
  { image: '/gallery/room5.jpg', width: 1280, height: 742 },
];

export function AccommodationsSection() {
  const heading = useScrollAnimation();
  const cards = useScrollAnimation({ threshold: 0.1 });
  const cta = useScrollAnimation();

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Binoculars icon like reference site */}
        <div
          ref={heading.ref}
          className={`text-center mb-16 relative scroll-fade-in ${heading.isVisible ? 'visible' : ''}`}
        >
          <div className="flex justify-center mb-6">
            <svg className="w-16 h-16 text-secondary dark:text-accent-gold opacity-80" viewBox="0 0 64 64" fill="currentColor">
              <circle cx="20" cy="32" r="14" fill="currentColor" opacity="0.9"/>
              <circle cx="44" cy="32" r="14" fill="currentColor" opacity="0.9"/>
              <circle cx="32" cy="32" r="6" fill="#4A7C3F"/>
              <circle cx="20" cy="32" r="8" fill="#1C2B1A"/>
              <circle cx="44" cy="32" r="8" fill="#1C2B1A"/>
              <circle cx="17" cy="29" r="2" fill="#FFF" opacity="0.3"/>
              <circle cx="41" cy="29" r="2" fill="#FFF" opacity="0.3"/>
            </svg>
          </div>
          <h2 className="font-display text-secondary dark:text-secondary font-bold text-4xl uppercase tracking-widest relative z-10">
            Where You <br />
            <span className="font-script text-6xl text-gray-800 dark:text-gray-100 capitalize normal-case mt-2 block">
              will sleep
            </span>
          </h2>
          <div className="divider-organic" />
        </div>

        <div
          ref={cards.ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {rooms.map((room, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl shadow-xl aspect-[3/4] md:aspect-[4/5] cursor-pointer hover-shine scroll-scale-in stagger-${index + 1} ${
                room.offset ? 'md:-mt-8' : ''
              } ${cards.isVisible ? 'visible' : ''}`}
            >
              <img
                alt={`Room ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                decoding="async"
                height={room.height}
                loading="lazy"
                src={room.image}
                width={room.width}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-12">
          <button aria-label="Show accommodation slide 1" className="w-2.5 h-2.5 rounded-full bg-primary transition-all duration-300" type="button" />
          <button aria-label="Show accommodation slide 2" className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-primary transition-all duration-300" type="button" />
          <button aria-label="Show accommodation slide 3" className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-primary transition-all duration-300" type="button" />
          <button aria-label="Show accommodation slide 4" className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-primary transition-all duration-300" type="button" />
        </div>

        <div
          ref={cta.ref}
          className={`text-center mt-12 scroll-fade-in stagger-2 ${cta.isVisible ? 'visible' : ''}`}
        >
          <Link to="/gallery" className="btn-brush btn-brush-primary">
            View Accommodations
          </Link>
        </div>
      </div>
    </section>
  );
}
