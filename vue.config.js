// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 主题变量
          'primary-color': '#1890ff',
        },
      },
    },
  },
  transpileDependencies: true,
};