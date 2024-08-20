module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wood-wall': "url('/img/wood-wall.jpg')",
      },
      colors: {
        'primary': '#6C3428',
        'secondary': '#DFA878',
      },
      }
    },

  plugins: [],
}

