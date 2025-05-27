/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ダークモード用のカスタムカラー
        dark: {
          bg: {
            primary: '#0a0a0a',
            secondary: '#171717',
            tertiary: '#262626',
          },
          text: {
            primary: '#fafafa',
            secondary: '#a3a3a3',
            tertiary: '#737373',
          },
          border: {
            primary: '#404040',
            secondary: '#525252',
          }
        }
      },
    },
  },
  plugins: [],
};