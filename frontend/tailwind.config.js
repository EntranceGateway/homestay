/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Palette - "Dusk in the Canopy"
        'deep-forest': '#1C2B1A',      // Safety, depth, the forest at night
        'living-canopy': '#4A6741',    // Growth, calm, nature
        'golden-hour': '#C8843A',      // Warmth, adventure, campfire, dawn light
        'soft-earth': '#F2EAD3',       // Comfort, rest, the homestay feeling
        'bark-soil': '#3D2B1F',        // Grounding, authenticity, rawness
        
        // Accent Palette
        'dew-drop': '#7AADA8',         // Interactive elements, hover states
        'bird-paradise': '#B85C2C',    // CTAs, urgency elements
        'moonlight': '#FAF6EE',        // Text backgrounds, cards
        
        // Legacy colors (for backward compatibility)
        primary: '#C8843A',            // Maps to golden-hour
        secondary: '#4A6741',          // Maps to living-canopy
        'background-light': '#F2EAD3', // Maps to soft-earth
        'background-dark': '#1C2B1A',  // Maps to deep-forest
        'surface-dark': '#3D2B1F',     // Maps to bark-soil
        'accent-gold': '#C8843A',      // Maps to golden-hour
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'Inter', 'sans-serif'],
        accent: ['Josefin Sans', 'sans-serif'],
        script: ['Mrs Saint Delafield', 'cursive'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '1.1', fontWeight: '300' }],
        'hero-lg': ['96px', { lineHeight: '1.1', fontWeight: '300' }],
      },
      letterSpacing: {
        'accent': '0.08em',
      },
      lineHeight: {
        'relaxed-plus': '1.8',
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(200, 132, 58, 0.3)',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'auto-scroll': 'autoScroll 70s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200, 132, 58, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(200, 132, 58, 0.5)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
