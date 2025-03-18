/** @type {import('tailwindcss').Config} */
module.exports = {
    // content: [
    //   "./src/**/*.{js,jsx,ts,tsx}", // Укажи пути к файлам, где используешь Tailwind
    // ],
    theme: {
      extend: {
        screens: {
            'mb': { max:'640px' },
          },
        animation: {
          marquee: "marquee var(--duration) linear infinite",
          "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        },
        keyframes: {
          marquee: {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(calc(-100% - var(--gap)))" },
          },
          "marquee-vertical": {
            from: { transform: "translateY(0)" },
            to: { transform: "translateY(calc(-100% - var(--gap)))" },
          },
        },
      },
    },
    plugins: [],
  };