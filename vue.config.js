module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#1677ff',
        },
      },
    },
  },
  transpileDependencies: true,
  devServer: {
    port: 8080,
  },
}
