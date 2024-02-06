/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      whiteBG: "rgba(255, 255, 255, 1)",
      white1: "rgba(245, 245, 245, 1)",
      white2: "rgba(228, 228, 228, 1)",
      black1: "rgba(31, 31, 41, 1)",
      black2: "rgba(78, 78, 84, 1)",
      blue1: "rgba(38, 155, 208, 1)",
      blue2: "rgba(120, 201, 238, 1)",
      red: "rgba(246, 44, 16, 1)",
      green: "rgba(0, 219, 88, 1)",
    },
    fontFamily: {
      "plus-jakarta": ["Signika", "sans-serif"],
    },
    extend: {},
    fontSize: {
      h1: ["70px"],
      h2: ["50px"],
      h3: ["40px"],
      h4: ["30px"],
      h5: ["25px"],
      h6: ["20px"],
      h7: ["15px"],
      h8: ["5px"],
    },
  },
  plugins: [],
}
