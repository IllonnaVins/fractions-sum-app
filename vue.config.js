module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/fractions-sum-app/'
    : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/scss/variables.scss';
          @import '@/assets/scss/default.scss';
          @import '@/assets/scss/global.scss';
        `,
      },
    },
  },
};
