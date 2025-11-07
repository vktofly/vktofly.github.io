/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#222222',
          500: '#222222',
          600: '#1a1a1a',
          700: '#111111',
        },
        palette: {
          primary: '#222222',
          secondary: '#7B7B7B',
          tertiary: '#F8F8F8',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};


