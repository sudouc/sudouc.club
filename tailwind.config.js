module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      extrabold: ['CircularStd-Black'],
      bold: ['CircularStd-Bold'],
      serif: ['Camphor-Medium']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
