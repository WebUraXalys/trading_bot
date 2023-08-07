/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
    {"light": {
    "color-scheme": "light",
    "primary": "#F40076",
    "secondary": "#8E4162",
    "accent": "#5c7f67",
    "neutral": "#291E00",
    "neutral-content": "#e9e7e7",
    "base-100": "#e9e7e7",
    "base-content": "#100f0f",
    }},
    "dark"
  ]}
};
