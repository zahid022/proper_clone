/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '851px',
        hv: '970px',
        lg: '1024px',
        sl: '1030px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        'gt-america': ['GT America'],
      },
    },
  },
  plugins: [],
};
