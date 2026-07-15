/**
 * Design System Constants
 * Based on "Dusk in the Canopy" palette and Organic Editorial Luxury style
 */

export const COLORS = {
  // Primary Palette
  DEEP_FOREST: '#1C2B1A',      // Safety, depth, the forest at night
  LIVING_CANOPY: '#4A6741',    // Growth, calm, nature
  GOLDEN_HOUR: '#C8843A',      // Warmth, adventure, campfire, dawn light
  SOFT_EARTH: '#F2EAD3',       // Comfort, rest, the homestay feeling
  BARK_SOIL: '#3D2B1F',        // Grounding, authenticity, rawness
  
  // Accent Palette
  DEW_DROP: '#7AADA8',         // Interactive elements, hover states
  BIRD_PARADISE: '#B85C2C',    // CTAs, urgency elements
  MOONLIGHT: '#FAF6EE',        // Text backgrounds, cards
} as const;

export const TYPOGRAPHY = {
  FONTS: {
    DISPLAY: "'Playfair Display', serif",
    BODY: "'DM Sans', 'Inter', sans-serif",
    ACCENT: "'Josefin Sans', sans-serif",
    SCRIPT: "'Mrs Saint Delafield', cursive",
  },
  SIZES: {
    H1: '72px',
    H1_LG: '96px',
    H2: '48px',
    BODY: '18px',
    CAPTION: '13px',
  },
  LINE_HEIGHTS: {
    TIGHT: '1.1',
    RELAXED: '1.8',
  },
  LETTER_SPACING: {
    ACCENT: '0.08em',
  },
} as const;

export const ANIMATION = {
  DURATIONS: {
    FAST: '200ms',
    NORMAL: '400ms',
    SLOW: '600ms',
    FLOAT: '20s',
    GLOW: '2s',
  },
  EASINGS: {
    NATURE: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
  DELAYS: {
    STAGGER: '80ms',
    SUBTEXT: '400ms',
  },
} as const;

export const SPACING = {
  CARD_LIFT: '8px',
  BORDER_RADIUS: {
    CARD: '12px',
    BUTTON: '0px', // Sharp for premium feel
  },
  TOUCH_TARGET: '48px', // Minimum for mobile
} as const;

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

export const OPACITY = {
  GRAIN_TEXTURE: 0.06,
  AMBER_OVERLAY: 0.15,
  HOVER_OVERLAY: 0.9,
} as const;

/**
 * User Segments for targeted design decisions
 */
export const USER_SEGMENTS = {
  URBAN_ESCAPISTS: {
    age: '35-55',
    triggers: ['textures', 'earthy tones', 'slow reveals', 'authentic photography'],
    fear: 'inauthenticity',
  },
  ADVENTURE_SEEKERS: {
    age: '22-35',
    triggers: ['bold typography', 'action photography', 'quick CTAs', 'social proof'],
    desire: 'bragging rights',
  },
  FAMILIES: {
    age: '30-45',
    triggers: ['warm imagery', 'family photos', 'reassurance', 'clear packages'],
    concern: 'safety',
  },
  PHOTOGRAPHERS: {
    age: '28-60',
    triggers: ['data-rich pages', 'photography-forward', 'expert credibility'],
    behavior: 'highly research-driven',
  },
} as const;

/**
 * Trust → Desire → Ease → Action framework
 */
export const USER_JOURNEY = {
  TRUST: 'Can I trust this place?',
  DESIRE: 'Do I want to be here?',
  EASE: 'Is it easy to understand?',
  ACTION: 'How do I book?',
} as const;
