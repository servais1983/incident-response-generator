module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Permet de basculer en mode sombre avec la classe 'dark'
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées pour le thème
        primary: {
          light: '#3B82F6', // Bleu
          dark: '#1D4ED8',  // Bleu foncé
        },
        // Couleurs supplémentaires spécifiques au thème sombre
        dark: {
          bg: {
            primary: '#1F2937',
            secondary: '#111827',
            tertiary: '#374151',
          },
          text: {
            primary: '#F9FAFB',
            secondary: '#D1D5DB',
            muted: '#9CA3AF',
          }
        },
      },
      spacing: {
        // Espacement responsive
        'xs': '0.25rem',  // 4px
        'sm': '0.5rem',   // 8px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
      },
      screens: {
        'xs': '480px', // Très petits écrans
      },
      // Transition pour le changement de thème
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [],
}
