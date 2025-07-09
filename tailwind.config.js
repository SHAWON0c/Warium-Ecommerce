/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       keyframes: {
        'insta-slide': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },  // Slide half, since we duplicate images
        },
      },
      animation: {
        'insta-slide': 'insta-slide 40s linear infinite',
      },
    },
  },
  plugins: [require("daisyui")],
}

