/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#C5F7FC',
          soft: '#6DEAF8',
          base: '#3CE3F6',
          dark: '#0BDCF4',
          ultra: {
            dark: '#09B0C3',
            light: '#F5FEFF',
          },
        },
        secondary: {
          light: '#C7D2FE',
          soft: '#818CF8',
          base: '#4F46E5',
          dark: '#3730A3',
          ultra: {
            light: '#EEF2FF',
            dark: '#1E1B4B',
          },
        },
        success: {
          light: '#A7F3D0',
          soft: '#34D399',
          base: '#059669',
          dark: '#065F46',
          ultra: {
            light: '#ECFDF5',
            dark: '#022C22',
          },
        },
        danger: {
          light: '#FECDD3',
          soft: '#FB7185',
          base: '#E11D48',
          dark: '#9F1239',
          ultra: {
            light: '#FFF1F2',
            dark: '#4C0519',
          },
        },
        warning: {
          light: '#FEF08A',
          soft: '#FACC15',
          base: '#EAB308',
          dark: '#CA8A04',
          ultra: {
            light: '#FEFCE8',
            dark: '#A16207',
          },
        },
        info: {
          light: '#BFDBFE',
          soft: '#60A5FA',
          base: '#2563EB',
          dark: '#1E40AF',
          ultra: {
            light: '#EFF6FF',
            dark: '#172554',
          },
        },
        neutral: {
          light: '#E4E4E7',
          soft: '#A1A1AA',
          base: '#52525B',
          dark: '#27272A',
          ultra: {
            light: '#FAFAFA',
            dark: '#09090B',
          },
        }
      },
    },
  },
  plugins: [],
};
