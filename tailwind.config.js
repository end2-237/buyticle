
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          '0%': { scaleX: '0' },
          '100%': { scaleX: '1' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        fadeUp: 'fadeUp 0.8s ease forwards',
        lineGrow: 'lineGrow 1s ease forwards',
      },
    },
  },
  plugins: [],
}
