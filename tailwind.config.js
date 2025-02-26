/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00AAFF',
        secondary: '#F3FCFF',
        text: {
          DEFAULT: '#1A1036',
          light: '#F3FCFF',
        }
      },
    },
  },
  plugins: [],
} 