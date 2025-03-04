/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // Disable dark mode entirely
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#111827',
        primary: {
          DEFAULT: '#00AAFF',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        border: '#e5e7eb',
      },
    },
  },
  plugins: [],
} 