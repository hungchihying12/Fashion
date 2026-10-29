export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        jumino: {
          bg: '#f6f7f2',
          card: '#ffffff',
          sage: '#7a9e7e',
          sageDeep: '#4f6f52',
          mist: '#e8ede4',
          ink: '#3d4a3e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
