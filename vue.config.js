module.exports = {
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
