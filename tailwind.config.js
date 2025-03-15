/** @type {import('tailwindcss').Config} */
module.exports = {
    // content: [
    //   "./src/**/*.{js,jsx,ts,tsx}", // Укажи пути к файлам, где используешь Tailwind
    // ],
    theme: {
      
      extend: {
        screens: {
            'mb': { max:'680px' },
          },
      },
    },
    plugins: [],
  };