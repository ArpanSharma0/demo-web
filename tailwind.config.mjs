/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F9F6F1',    /* Cream Silk */
        'bg-secondary': '#D4A5A5',  /* Rose Accent */
        'bg-tertiary': '#F2EBE1',   /* Lighter Cream */
        'text-primary': '#2D2D2D',  /* Graphite */
        border: 'rgba(45, 45, 45, 0.08)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'luxury-wide': '0.4em',
        'luxury-widest': '0.6em',
      },
      padding: {
        'luxury-section': '120px',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #F9F6F1 0%, #FFFFFF 50%, #E2B2A7 100%)',
      },
    },
  },
  plugins: [],
};

