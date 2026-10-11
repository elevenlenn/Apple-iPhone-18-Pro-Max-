/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          black: '#000000',
          light: '#fbfbfd',
          text: '#f5f5f7',
          gray: '#86868b',
          blue: '#2997ff',
        },
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'Inter', '"Helvetica Neue"', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        bob: 'bob 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

