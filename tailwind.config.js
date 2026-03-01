/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        text: 'var(--text-color)',
        primary: 'var(--primary-color)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
