/**
 * Animation Utilities
 * Following the "nature-like" animation principle:
 * Nothing snaps, nothing bounces aggressively.
 * All easing curves decelerate gently, like an animal slowing to rest.
 */

import { ANIMATION } from '@/constants/design';

/**
 * Intersection Observer for scroll-triggered animations
 */
export const createScrollObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Stagger animation for multiple elements
 * @param elements - Array of elements to animate
 * @param delay - Delay between each element (default: 80ms)
 */
export const staggerFadeIn = (elements: HTMLElement[], delay = 80) => {
  elements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity ${ANIMATION.DURATIONS.SLOW} ${ANIMATION.EASINGS.EASE_OUT}, transform ${ANIMATION.DURATIONS.SLOW} ${ANIMATION.EASINGS.EASE_OUT}`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * delay);
  });
};

/**
 * Smooth scroll to element
 */
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * Parallax effect calculator
 * @param scrollY - Current scroll position
 * @param speed - Parallax speed (0.5 = half speed, 2 = double speed)
 */
export const calculateParallax = (scrollY: number, speed = 0.5): number => {
  return scrollY * speed;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Apply animation only if user doesn't prefer reduced motion
 */
export const safeAnimate = (callback: () => void) => {
  if (!prefersReducedMotion()) {
    callback();
  }
};

/**
 * Count-up animation for numbers
 */
export const animateNumber = (
  element: HTMLElement,
  start: number,
  end: number,
  duration = 1500
) => {
  const startTime = performance.now();
  const range = end - start;

  const updateNumber = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + range * easeProgress);
    
    element.textContent = current.toString();

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = end.toString();
    }
  };

  requestAnimationFrame(updateNumber);
};

/**
 * Floating animation for review cards
 */
export const createFloatingAnimation = (element: HTMLElement, duration = 20000) => {
  const randomDelay = Math.random() * duration;
  element.style.animationDelay = `${randomDelay}ms`;
  element.style.animationDuration = `${duration}ms`;
  element.classList.add('animate-float');
};

/**
 * Card hover effect with amber overlay
 */
export const addCardHoverEffect = (card: HTMLElement) => {
  card.classList.add('card-lift', 'amber-overlay', 'ease-nature');
};

/**
 * Navbar scroll behavior
 */
export const handleNavbarScroll = (navbar: HTMLElement, threshold = 100) => {
  const handleScroll = () => {
    if (window.scrollY > threshold) {
      navbar.classList.add('bg-deep-forest', 'shadow-lg');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-deep-forest', 'shadow-lg');
      navbar.classList.add('bg-transparent');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

/**
 * Lazy load images with fade-in
 */
export const lazyLoadImage = (img: HTMLImageElement) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        const src = image.dataset.src;
        
        if (src) {
          image.src = src;
          image.classList.add('animate-fade-in-up');
          observer.unobserve(image);
        }
      }
    });
  });

  observer.observe(img);
};
