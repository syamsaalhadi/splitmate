import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary": "#ffffff",
        "on-error-container": "#93000a",
        "surface": "#fcf8ff",
        "on-tertiary": "#ffffff",
        "on-background": "#1c1b22",
        "primary-fixed-dim": "#c5c0ff",
        "inverse-on-surface": "#f3eff9",
        "inverse-surface": "#312f37",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-fixed": "#241a00",
        "tertiary-fixed": "#ffdf93",
        "surface-variant": "#e5e1eb",
        "tertiary-container": "#705600",
        "primary": "#3b309e",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#f7cc58",
        "on-primary-container": "#d1ccff",
        "secondary": "#006c4e",
        "surface-container-high": "#ebe6f0",
        "on-secondary-container": "#007151",
        "on-surface-variant": "#474553",
        "error": "#ba1a1a",
        "inverse-primary": "#c5c0ff",
        "primary-container": "#534ab7",
        "outline-variant": "#c8c4d5",
        "tertiary": "#533f00",
        "on-primary-fixed-variant": "#3f35a3",
        "surface-dim": "#dcd8e2",
        "on-secondary-fixed-variant": "#00513a",
        "tertiary-fixed-dim": "#ecc14e",
        "primary-fixed": "#e3dfff",
        "on-primary": "#ffffff",
        "surface-container-highest": "#e5e1eb",
        "surface-bright": "#fcf8ff",
        "secondary-fixed-dim": "#68dbae",
        "on-primary-fixed": "#140067",
        "secondary-container": "#83f5c6",
        "surface-container": "#f0ecf6",
        "on-tertiary-fixed-variant": "#594400",
        "surface-tint": "#584fbc",
        "surface-container-low": "#f6f2fc",
        "outline": "#787584",
        "on-error": "#ffffff",
        "secondary-fixed": "#86f8c9",
        "background": "#fcf8ff",
        "on-surface": "#1c1b22",
        "on-secondary-fixed": "#002115"
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"],
        "plus-jakarta": ["Plus Jakarta Sans", "sans-serif"]
      },
    },
  },
  plugins: [
    forms, 
    containerQueries
  ],
}
