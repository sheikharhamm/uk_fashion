/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGold: '#c5a059',
        brandGoldLight: '#e4ce9e',
        brandGoldDark: '#8a6829',
        brandMaroon: '#540f1a',
        brandDark: '#111111',
        brandCream: '#faf7f2',
      }
    },
  },
  plugins: [],
}