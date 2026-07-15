# Vanavasam - Luxury Jungle Homestay

A modern, responsive website for Vanavasam luxury jungle homestay built with React, TypeScript, and Tailwind CSS.

## 📚 Documentation

- **[Design System](docs/design.md)** - Complete design blueprint with user psychology, color palette, and page-by-page plans
- **[Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)** - Step-by-step technical implementation instructions
- **[Project Summary](docs/PROJECT_SUMMARY.md)** - High-level overview and key decisions
- **[Quick Reference](docs/QUICK_REFERENCE.md)** - Developer quick reference card
- **[Project Structure](docs/PROJECT_STRUCTURE.md)** - Visual project structure and architecture

## Features

- Responsive design with mobile-first approach
- Emotion-first design based on user psychology
- Feature-based architecture
- Type-safe with TypeScript
- Custom design system with "Dusk in the Canopy" palette
- Nature-like animations (nothing snaps or bounces)
- Grain texture overlays for premium feel
- SEO-friendly structure

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Path aliases (@/* imports)

## Design System

The project uses a comprehensive design system called "Dusk in the Canopy":

### Colors
- **Deep Forest** (#1C2B1A) - Primary dark background
- **Golden Hour** (#C8843A) - Primary CTA color
- **Soft Earth** (#F2EAD3) - Light backgrounds and text
- **Living Canopy** (#4A6741) - Secondary elements
- **Bark & Soil** (#3D2B1F) - Grounding elements

### Typography
- **Display**: Playfair Display (headings, luxury feel)
- **Body**: DM Sans (readable, modern)
- **Accent**: Josefin Sans (labels, all caps)
- **Script**: Mrs Saint Delafield (decorative touches)

See [docs/design.md](docs/design.md) for complete design system documentation.

## Project Structure

```
src/
├── app/                    # App-level configuration
├── assets/                 # Static files
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   └── common/            # Generic reusable components
├── features/              # Feature-based modules
│   └── dashboard/
│       ├── components/    # Feature-specific components
│       ├── pages/         # Feature pages
│       └── types.ts       # Feature types
├── hooks/                 # Global reusable hooks
├── lib/                   # API clients and utilities
├── services/              # Global services
├── types/                 # Global TypeScript types
├── constants/             # App-wide constants
└── styles/                # Global styles
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The project uses a feature-based architecture where each feature (auth, users, dashboard) has its own isolated module with components, hooks, types, and pages.

Path aliases are configured for cleaner imports:
```typescript
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants/design';
```

### Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Key Principles

1. **Emotion-First Design**: Every design decision follows the Trust → Desire → Ease → Action framework
2. **Nature-Like Animations**: Nothing snaps or bounces aggressively; all animations decelerate gently
3. **Texture is Premium**: 5-8% grain overlay makes everything feel more luxurious
4. **Authentic Photography**: No stock photos, only real moments

## Target Audience

- **Urban Escapists** (35-55): Seeking authentic disconnection
- **Adventure Seekers** (22-35): Instagram-driven experience collectors
- **Families** (30-45): Safety-conscious parents
- **Photographers/Birders** (28-60): Research-driven enthusiasts

## Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

## Accessibility

- WCAG 2.1 Level AA compliance
- Color contrast ratios: 4.5:1 for body text
- Keyboard navigation support
- Screen reader friendly
- Visible focus indicators

## Contributing

1. Read [docs/design.md](docs/design.md) for design principles
2. Check [docs/IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md) for implementation details
3. Use [docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md) while coding
4. Follow the established patterns in existing components

## License

Private project - All rights reserved

---

**Project Status**: Foundation Complete ✅  
**Version**: 1.0  
**Last Updated**: February 2026
