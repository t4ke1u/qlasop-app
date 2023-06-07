/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)"],
        roboto: ["var(--font-roboto)"],
      },
      animation: {
        "fade-in": "fade-in 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "fade-in-1/2": "fade-in-1/2 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        "fade-in-1/2": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "0.5",
          },
        },
      },
    },
  },
  plugins: [],
}
