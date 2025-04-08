/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './assets/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        simplicity: '#3B82F6', // Blue
        patience: '#4CAF50',   // Green
        compassion: '#9333EA', // Purple
        background: '#F8FAFC',
        cardface: '#FFFFFF'
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      }
    }
  }
}
