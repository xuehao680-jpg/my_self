/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#f6f4f0",
        beige: "#e8e4de",
        rust: "#e85d3a",
        "rust-light": "rgba(232, 93, 58, 0.08)",
        "rust-glow": "rgba(232, 93, 58, 0.15)",
        stone: "#8a8a8a",
        "stone-light": "#c8c4c0",
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Noto Serif SC"', "serif"],
        sans: ['"DM Sans"', '"Helvetica Neue"', "sans-serif"],
        serif: ['"Noto Serif SC"', "serif"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
