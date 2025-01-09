/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: {
          light: '#001D52',
          DEFAULT: '#001233',
          dark: '#00072D',
        }
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        roboto_mono: ['Roboto Mono', 'sans-serif']
      },
    },
    plugins: [],
  }
}
