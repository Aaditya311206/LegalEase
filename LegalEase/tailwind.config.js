/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ef4444",
        "primary-dark": "#dc2626",
        "primary-light": "#fee2e2",
        background: "#f9fafb",
      },
    },
  },
  plugins: [],
}