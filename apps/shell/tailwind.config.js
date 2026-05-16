/** @type {import('tailwindcss').Config} */
// apps/shell/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../header/src/**/*.{js,ts,jsx,tsx}", // Adicione isso
    "../cards/src/**/*.{js,ts,jsx,tsx}",  // Adicione isso
  ],
  theme: { extend: {} },
  plugins: [],
}
