/** @type {import('tailwindcss').Config} */
// apps/shell/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../header/src/**/*.{js,ts,jsx,tsx}", 
    "../cards/src/**/*.{js,ts,jsx,tsx}",  
    "../footer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
