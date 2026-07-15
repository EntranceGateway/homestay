# Quick Reference Card

## 🎨 Color Classes

```tsx
// Backgrounds
bg-deep-forest      // #1C2B1A - Dark forest green
bg-living-canopy    // #4A6741 - Muted sage
bg-golden-hour      // #C8843A - Warm amber (CTAs)
bg-soft-earth       // #F2EAD3 - Warm cream
bg-bark-soil        // #3D2B1F - Deep brown

// Accents
bg-dew-drop         // #7AADA8 - Misty teal (hover)
bg-bird-paradise    // #B85C2C - Rust orange (urgency)
bg-moonlight        // #FAF6EE - Off-white

// Text
text-deep-forest
text-soft-earth
text-golden-hour
text-moonlight
```

## 📝 Typography Classes

```tsx
// Fonts
font-display        // Playfair Display (headings)
font-body           // DM Sans (body text)
font-accent         // Josefin Sans (labels)
font-script         // Mrs Saint Delafield (decorative)

// Sizes
text-hero           // 72px
text-hero-lg        // 96px
text-5xl            // 48px (H2)
text-lg             // 18px (body)
text-xs             // 13px (captions)

// Spacing
leading-relaxed-plus  // 1.8 line height
tracking-accent       // 0.08em letter spacing
```

## ✨ Utility Classes

```tsx
// Textures & Effects
grain-texture       // Adds 6% grain overlay
text-outline        // Transparent text with stroke
scroll-hide         // Hides scrollbar

// Animations
card-lift           // Hover lift effect
amber-overlay       // Hover amber overlay
ease-nature         // Natural easing curve

animate-float       // 20s floating animation
animate-pulse-glow  // 2s glow pulse
animate-fade-in-up  // Fade in from bottom

// Borders
rounded-card        // 12px border radius
```

## 🎬 Animation Utilities

```tsx
import { 
  staggerFadeIn,
  smoothScrollTo,
  calculateParallax,
  animateNumber,
  createFloatingAnimation,
  addCardHoverEffect,
  handleNavbarScroll,
  lazyLoadImage,
} from '@/lib/animations';

// Stagger animation
staggerFadeIn(elements, 80); // 80ms delay

// Smooth scroll
smoothScrollTo('section-id');

// Parallax
const offset = calculateParallax(scrollY, 0.5);

// Count up numbers
animateNumber(element, 0, 100, 1500);

// Floating cards
createFloatingAnimation(element, 20000);

// Card hover
addCardHoverEffect(card);

// Navbar scroll
handleNavbarScroll(navbar, 100);

// Lazy load
lazyLoadImage(img);
```

## 🧩 Component Patterns

### Button

```tsx
<Button variant="primary" glow>
  Book Now
</Button>

<Button variant="ghost">
  Learn More
</Button>
```

### Card

```tsx
<Card 
  image="url"
  title="Title"
  description="Description"
  hover={true}
/>
```

### Section Layout

```tsx
<section className="py-24 bg-soft-earth grain-texture">
  <div className="container mx-auto px-4">
    <h2 className="text-center font-display text-5xl text-deep-forest mb-16">
      Section <span className="font-script text-6xl text-golden-hour">Title</span>
    </h2>
    {/* Content */}
  </div>
</section>
```

## 📱 Responsive Breakpoints

```tsx
// Tailwind breakpoints
sm:   // 640px
md:   // 768px
lg:   // 1024px
xl:   // 1280px
2xl:  // 1536px

// Usage
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

## 🎯 Common Patterns

### Hero Section

```tsx
<header className="relative h-screen bg-deep-forest grain-texture">
  <div className="absolute inset-0 z-0">
    <img className="w-full h-full object-cover opacity-60" />
    <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/80 to-deep-forest" />
  </div>
  
  <div className="relative z-10 text-center">
    <p className="font-script text-golden-hour text-6xl">Script Text</p>
    <h1 className="font-display text-hero text-soft-earth">Main Heading</h1>
    <Button variant="primary">CTA</Button>
  </div>
</header>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item) => (
    <div className="card-lift amber-overlay rounded-card overflow-hidden">
      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="p-6">
        <h3 className="font-display text-2xl">{item.title}</h3>
      </div>
    </div>
  ))}
</div>
```

### Floating Reviews

```tsx
<div className="relative h-[600px]">
  {reviews.map((review, i) => (
    <div 
      className="absolute animate-float bg-bark-soil/80 backdrop-blur-sm p-6 rounded-card"
      style={{
        left: `${(i * 25) % 75}%`,
        top: `${(i * 30) % 60}%`,
      }}
    >
      {/* Review content */}
    </div>
  ))}
</div>
```

## 🎨 Design Tokens (TypeScript)

```tsx
import { COLORS, TYPOGRAPHY, ANIMATION, SPACING } from '@/constants/design';

// Usage
const buttonStyle = {
  backgroundColor: COLORS.GOLDEN_HOUR,
  fontFamily: TYPOGRAPHY.FONTS.DISPLAY,
  transition: `all ${ANIMATION.DURATIONS.NORMAL} ${ANIMATION.EASINGS.NATURE}`,
  borderRadius: SPACING.BORDER_RADIUS.BUTTON,
};
```

## 🚫 Don'ts

```tsx
// ❌ Don't use pure saturated greens
className="bg-green-500"

// ❌ Don't use cool grays
className="bg-gray-500"

// ❌ Don't use bright whites
className="bg-white"

// ❌ Don't use rounded buttons for CTAs
className="rounded-full" // Use rounded-none instead

// ❌ Don't use Bootstrap icons
import { Icon } from 'bootstrap-icons'

// ❌ Don't use aggressive animations
className="animate-bounce" // Too aggressive
```

## ✅ Do's

```tsx
// ✅ Use design system colors
className="bg-golden-hour text-deep-forest"

// ✅ Use sharp buttons for CTAs
className="rounded-none"

// ✅ Use grain texture on sections
className="grain-texture"

// ✅ Use natural animations
className="ease-nature"

// ✅ Use semantic HTML
<nav>, <header>, <section>, <article>

// ✅ Add alt text to images
<img src="..." alt="Descriptive text" />
```

## 🔍 Debugging

```tsx
// Check if animation is disabled
import { prefersReducedMotion } from '@/lib/animations';
console.log('Reduced motion:', prefersReducedMotion());

// Check color values
import { COLORS } from '@/constants/design';
console.log('Golden hour:', COLORS.GOLDEN_HOUR);

// Check if element is in viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log('In viewport:', entry.isIntersecting);
  });
});
```

## 📊 Performance Checklist

- [ ] Images < 200KB each
- [ ] Use WebP format
- [ ] Lazy load below fold
- [ ] Preload critical fonts
- [ ] Code split by route
- [ ] Minimize JavaScript
- [ ] Use CSS animations over JS
- [ ] Debounce scroll handlers

## ♿ Accessibility Checklist

- [ ] Semantic HTML
- [ ] Alt text on images
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] ARIA labels
- [ ] Color contrast 4.5:1
- [ ] Skip to content link
- [ ] Screen reader testing

---

**Keep this card handy while developing!**
