/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        surface: '#ffffff',
        canvas: '#f4f7fb',
        ink: '#172033',
        muted: '#64748b',
        accent: '#dbeafe',
        success: '#15803d',
        warning: '#b45309',
        danger: '#dc2626',
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};

