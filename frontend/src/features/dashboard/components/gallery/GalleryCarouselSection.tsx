import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRef, useCallback, useEffect } from 'react';

const CAROUSEL_GRADIENTS: string[] = [
  'linear-gradient(180deg, #1C2B1A 0%, #2A3E27 50%, #4A6741 100%)',
  'linear-gradient(180deg, #3D2B1F 0%, #B85C2C 50%, #C8843A 100%)',
  'linear-gradient(180deg, #2A3E27 0%, #4A6741 50%, #7AADA8 100%)',
  'linear-gradient(180deg, #0D1A0C 0%, #1C2B1A 50%, #2A3E27 100%)',
  'linear-gradient(180deg, #C8843A 0%, #E09A50 50%, #F2EAD3 100%)',
  'linear-gradient(180deg, #4A6741 0%, #7AADA8 50%, #E09A50 100%)',
  'linear-gradient(180deg, #1C2B1A 0%, #3D2B1F 50%, #B85C2C 100%)',
  'linear-gradient(180deg, #7AADA8 0%, #4A6741 50%, #2A3E27 100%)',
];

// Duplicate for infinite scroll illusion
const allCards = [...CAROUSEL_GRADIENTS, ...CAROUSEL_GRADIENTS];

export function GalleryCarouselSection() {
  const header = useScrollAnimation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const velocity = useRef(0);
  const animFrame = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const track = trackRef.current;
    if (!track) return;

    track.style.animationPlayState = 'paused';
    startX.current = 'touches' in e ? e.touches[0].pageX : e.pageX;
    velocity.current = 0;
    cancelAnimationFrame(animFrame.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const track = trackRef.current;
    if (!track) return;

    const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const walk = (x - startX.current) * 1.5;

    const matrix = new DOMMatrix(getComputedStyle(track).transform);
    track.style.transform = `translateX(${matrix.m41 + walk}px)`;
    velocity.current = walk;
    startX.current = x;
  }, []);

  const applyMomentum = useCallback(() => {
    if (Math.abs(velocity.current) < 0.5) return;
    velocity.current *= 0.95;

    const track = trackRef.current;
    if (!track) return;

    const matrix = new DOMMatrix(getComputedStyle(track).transform);
    track.style.transform = `translateX(${matrix.m41 + velocity.current}px)`;
    animFrame.current = requestAnimationFrame(applyMomentum);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    applyMomentum();

    // Resume auto-scroll after a pause
    setTimeout(() => {
      const track = trackRef.current;
      if (track) track.style.animationPlayState = 'running';
    }, 2000);
  }, [applyMomentum]);

  // Reset position for infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      const matrix = new DOMMatrix(getComputedStyle(track).transform);
      const halfWidth = track.scrollWidth / 2;

      if (Math.abs(matrix.m41) >= halfWidth) {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        setTimeout(() => {
          if (track) track.style.transition = '';
        }, 50);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-28 bg-deep-forest overflow-hidden relative grain-texture">
      {/* Top subtle line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(242,234,211,0.3) 50%, transparent 100%)',
        }}
      />

      {/* Header */}
      <div
        ref={header.ref}
        className={`text-center mb-20 px-10 scroll-fade-in ${header.isVisible ? 'visible' : ''}`}
      >
        <span className="font-accent text-[10px] tracking-[0.24em] uppercase text-soft-earth/50 block mb-6">
          WILDLIFE GALLERY
        </span>
        <h2 className="font-display italic text-4xl sm:text-5xl md:text-6xl font-light text-soft-earth leading-tight">
          Moments in the Wild
        </h2>
      </div>

      {/* Carousel */}
      <div
        ref={wrapperRef}
        className="carousel-wrapper relative w-full overflow-hidden py-5 select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div ref={trackRef} className="carousel-track pl-10">
          {allCards.map((gradient, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[340px] md:w-[420px] overflow-hidden transition-transform duration-400 ease-out hover:scale-[1.02]"
            >
              <div
                className="w-full h-[480px] md:h-[560px] overflow-hidden"
                style={{ background: gradient }}
              >
                {/* Gradient placeholder — replace with <img> when real images are added */}
                <div className="w-full h-full transition-transform duration-[600ms] ease-out hover:scale-[1.08]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
