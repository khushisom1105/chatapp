/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',                // For HTML files in the root
    './src/**/*.{js,ts,jsx,tsx,html}', // For all JS, TS, JSX, TSX, HTML files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

