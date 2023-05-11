/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Same as / Close to QuinLED Website
      colors: {
        'quin-light': '#393939',
        quin: '#252525',
        'quin-dark': '#111111'
      },
      fontFamily: {
        sans: ['PT-Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
