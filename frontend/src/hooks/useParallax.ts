import { useEffect, useState } from 'react';

/**
 * Moves an element at `speed` × scroll distance (and optionally fades it out over `fadeDistance` px).
 * Writes styles directly, once per frame, so scrolling never re-renders React.
 */
export function useParallax<T extends HTMLElement>(speed: number, fadeDistance?: number) {
  // Callback ref (state), so the effect runs even if the element mounts after a loading state
  const [el, setEl] = useState<T | null>(null);

  useEffect(() => {
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      el.style.setProperty('transform', `translate3d(0, ${y * speed}px, 0)`);
      if (fadeDistance) el.style.setProperty('opacity', String(Math.max(0, 1 - y / fadeDistance)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [el, speed, fadeDistance]);

  return setEl;
}
