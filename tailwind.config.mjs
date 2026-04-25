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
        'bg-primary': '#F5F1ED',    /* Luxury Off-white */
        'bg-secondary': '#EAE4DD',  /* Beige Tone 1 */
        'bg-tertiary': '#D6CFC7',   /* Beige Tone 2 */
        'text-primary': '#2B2B2B',  /* Soft Black (No pure black) */
        border: 'rgba(43, 43, 43, 0.08)',
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
    },
  },
  plugins: [],
};

