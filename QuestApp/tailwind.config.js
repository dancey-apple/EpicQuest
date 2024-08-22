module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wood-wall': "url('https://github.com/dancey-apple/EpicQuest/blob/TailwindStyles/QuestApp/src/img/bountyBoard.png?raw=true')",
      },
      colors: {
        'primary': '#6C3428',
        'secondary': '#DFA878',
        'glow': '#FF5580',
      },
      dropShadow: {
        'lg': '0 10px 15px rgba(0, 0, 0, 1)',
        'gl': '0px 0px 10px rgba(255, 0, 128, 1)',
      },
      }
    },

  plugins: [],
}

