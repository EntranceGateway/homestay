# Implementation Guide

This guide provides step-by-step instructions for implementing the design system outlined in `design.md`.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Phase 1: Foundation Setup ✅

### Completed
- [x] Color system configured in `tailwind.config.js`
- [x] Typography system (Playfair Display, DM Sans, Josefin Sans)
- [x] Grain texture overlay utility in `src/index.css`
- [x] Animation utilities in `src/lib/animations.ts`
- [x] Design constants in `src/constants/design.ts`

### Color Usage Guide

```tsx
// Primary colors
className="bg-deep-forest text-soft-earth"
className="bg-golden-hour text-deep-forest"
className="bg-living-canopy text-moonlight"

// Accent colors
className="hover:text-dew-drop"
className="bg-bird-paradise"

// Legacy support (backward compatible)
className="bg-primary" // Maps to golden-hour
className="bg-secondary" // Maps to living-canopy
```

### Typography Usage

```tsx
// Headings
<h1 className="font-display text-hero text-soft-earth">Hero Text</h1>
<h2 className="font-display text-5xl">Section Header</h2>

// Body text
<p className="font-body text-lg leading-relaxed-plus">Body content</p>

// Accent labels
<span className="font-accent text-xs uppercase tracking-accent">Label</span>

// Script font
<span className="font-script text-4xl text-golden-hour">Decorative</span>
```

## Phase 2: Core Components

### Button Component

Update `src/components/ui/Button.tsx`:

```tsx
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  glow?: boolean;
}

export function Button({ 
  variant = 'primary', 
  glow = false,
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-8 py-3 font-display italic text-lg transition-all duration-200';
  
  const variants = {
    primary: 'bg-golden-hour text-deep-forest hover:bg-opacity-90',
    ghost: 'border-2 border-soft-earth text-soft-earth hover:bg-soft-earth hover:text-deep-forest',
  };
  
  const glowStyles = glow ? 'animate-pulse-glow' : '';
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Card Component

Create `src/components/ui/Card.tsx`:

```tsx
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  image?: string;
  title?: string;
  description?: string;
  hover?: boolean;
  className?: string;
}

export function Card({ 
  children, 
  image, 
  title, 
  description, 
  hover = true,
  className = '' 
}: CardProps) {
  return (
    <div 
      className={`
        rounded-card overflow-hidden shadow-card grain-texture
        ${hover ? 'card-lift amber-overlay cursor-pointer' : ''}
        ${className}
      `}
    >
      {image && (
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={image} 
            alt={title || ''} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      )}
      
      <div className="p-6">
        {title && (
          <h3 className="font-display text-2xl mb-2 text-deep-forest dark:text-soft-earth">
            {title}
          </h3>
        )}
        {description && (
          <p className="font-body text-sm text-bark-soil dark:text-moonlight">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
```

## Phase 3: Section Components

### Hero Section (Emotion-First Design)

Update `src/components/layout/Header.tsx`:

```tsx
export function Header() {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-deep-forest grain-texture">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Misty jungle landscape"
          className="w-full h-full object-cover opacity-60"
          src="[YOUR_IMAGE_URL]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/80 via-transparent to-deep-forest" />
      </div>

      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none select-none opacity-20">
        <h1 className="text-[12vw] md:text-[15vw] font-display font-light text-outline tracking-wider leading-none text-center">
          VANAVASAM
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <p className="font-script text-golden-hour text-4xl md:text-6xl mb-4 animate-fade-in-up">
          Welcome to the Wild
        </p>
        <h2 className="text-soft-earth font-display text-hero md:text-hero-lg font-light mb-8 leading-tight">
          Where Silence <br /> Meets the Soul
        </h2>
        <p className="text-moonlight text-lg md:text-xl font-light tracking-wide mb-10 max-w-2xl mx-auto leading-relaxed-plus">
          Experience wildlife at its fullest at Vanavasam. A boutique lodge nestled on the edge of Bardia National Park.
        </p>
        
        <Button variant="primary" className="rounded-none">
          Explore Stays
        </Button>
        
        {/* Scroll Indicator */}
        <div className="animate-bounce mt-12">
          <svg className="w-10 h-10 mx-auto text-soft-earth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}
```

### Emotion Hook Section

Create `src/features/dashboard/components/EmotionHookSection.tsx`:

```tsx
const emotions = [
  "The 5am bird call that replaces your alarm.",
  "Dinner under stars you forgot existed.",
  "The silence that teaches you to listen again.",
];

export function EmotionHookSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {emotions.map((text, index) => (
        <div 
          key={index}
          className="h-[60vh] flex items-center justify-center p-8 grain-texture"
          style={{
            backgroundColor: index % 2 === 0 ? '#1C2B1A' : '#3D2B1F',
          }}
        >
          <p className="font-display text-2xl md:text-3xl text-soft-earth italic text-center leading-relaxed">
            {text}
          </p>
        </div>
      ))}
    </section>
  );
}
```

### Experiences Grid (Masonry Layout)

Update `src/features/dashboard/components/ExperiencesSection.tsx`:

```tsx
const experiences = [
  {
    title: 'Safari',
    image: '[IMAGE_URL]',
    description: 'Track tigers and leopards through dense jungle',
  },
  {
    title: 'Birdwatching',
    image: '[IMAGE_URL]',
    description: 'Over 400 species call this forest home',
  },
  // Add more...
];

export function ExperiencesSection() {
  return (
    <section className="py-24 bg-soft-earth grain-texture">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-display text-5xl text-deep-forest mb-16">
          Your <span className="font-script text-6xl text-golden-hour">Adventures</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-card shadow-card card-lift amber-overlay cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-deep-forest to-transparent transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-2xl text-soft-earth mb-2">
                  {exp.title}
                </h3>
                <p className="text-moonlight text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Trust Section (Floating Reviews)

Create `src/features/dashboard/components/TrustSection.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import { createFloatingAnimation } from '@/lib/animations';

const reviews = [
  {
    text: "The most authentic jungle experience we've ever had.",
    author: "Sarah M.",
    location: "London",
    rating: 5,
  },
  // Add more reviews...
];

export function TrustSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.review-card');
      cards.forEach((card) => {
        createFloatingAnimation(card as HTMLElement);
      });
    }
  }, []);

  return (
    <section className="py-24 bg-deep-forest grain-texture relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-display text-5xl text-soft-earth mb-16">
          Guest <span className="font-script text-6xl text-golden-hour">Stories</span>
        </h2>
        
        <div ref={containerRef} className="relative h-[600px]">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-card absolute bg-bark-soil/80 backdrop-blur-sm p-6 rounded-card shadow-card max-w-sm"
              style={{
                left: `${(index * 25) % 75}%`,
                top: `${(index * 30) % 60}%`,
              }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-golden-hour" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-moonlight italic mb-4">"{review.text}"</p>
              <p className="font-accent text-xs text-golden-hour uppercase tracking-accent">
                {review.author}, {review.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Phase 4: Advanced Features

### Navbar Scroll Behavior

Update `src/components/layout/Navbar.tsx`:

```tsx
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed w-full z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-deep-forest shadow-lg' 
          : 'bg-transparent'
        }
      `}
    >
      {/* Rest of navbar content */}
    </nav>
  );
}
```

### Lazy Loading Images

```tsx
import { useEffect, useRef } from 'react';

export function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.add('animate-fade-in-up');
          observer.unobserve(img);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={className}
    />
  );
}
```

## Phase 5: Performance Optimization

### Image Optimization

1. Use WebP format with fallbacks
2. Implement responsive images with `srcset`
3. Lazy load images below the fold
4. Compress images (aim for < 200KB per image)

```tsx
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="Description" />
</picture>
```

### Code Splitting

```tsx
import { lazy, Suspense } from 'react';

const ExperiencesSection = lazy(() => import('./components/ExperiencesSection'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExperiencesSection />
    </Suspense>
  );
}
```

## Testing Checklist

### Visual Testing
- [ ] All colors match design system
- [ ] Typography scales correctly on all devices
- [ ] Grain texture visible but subtle
- [ ] Animations feel natural (not snappy)
- [ ] Hover states work on all interactive elements

### Functional Testing
- [ ] Navigation works on mobile and desktop
- [ ] Forms validate correctly
- [ ] CTAs lead to correct destinations
- [ ] Images load progressively
- [ ] Site works without JavaScript (progressive enhancement)

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] No layout shifts (CLS < 0.1)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast ratios meet WCAG AA
- [ ] Focus indicators visible
- [ ] Alt text on all images

## Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to hosting (example: Vercel)
vercel deploy --prod
```

## Maintenance

### Monthly Tasks
- Update guest reviews
- Refresh hero imagery
- Check for broken links
- Update wildlife sighting reports

### Quarterly Tasks
- Review analytics
- A/B test CTAs
- Update seasonal packages
- Performance audit

## Support

For questions or issues, refer to:
- `design.md` - Complete design system
- `src/constants/design.ts` - Design tokens
- `src/lib/animations.ts` - Animation utilities

---

**Last Updated**: February 2026  
**Version**: 1.0
