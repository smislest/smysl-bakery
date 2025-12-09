import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7BA862",
          light: "#9BC381",
          dark: "#5F8A48",
        },
        brown: {
          DEFAULT: "#5C5552",
          light: "#7A7170",
          dark: "#3E3735",
        },
        beige: {
          DEFAULT: "#F5E6D3",
          light: "#FFF5E6",
          dark: "#E8D4BD",
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      // Добавляем утилиты для отключения анимаций
      animation: {
        'none': 'none',
        'pulse-once': 'pulse 0.5s ease-in-out 1',
      },
      transitionProperty: {
        'none': 'none',
        'opacity-only': 'opacity',
        'transform-only': 'transform',
      },
      // Отключаем анимации на мобилках
      screens: {
        'mobile': {'max': '767px'},
        'desktop': {'min': '768px'},
      },
    },
  },
  plugins: [
    // Плагин для conditionally отключения анимаций
    function({ addVariant }: { addVariant: (name: string, definition: string) => void }) {
      addVariant('no-animations', '@media (max-width: 768px)');
      addVariant('mobile', '@media (max-width: 767px)');
      addVariant('desktop', '@media (min-width: 768px)');
    },
  ],
};

export default config;