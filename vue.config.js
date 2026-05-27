const apiDevServeUrl = process.env.VUE_APP_API_DEV_SERVE_URL || 'http://120.76.218.191/sit/gateway'
const apiBaseUrl = '/sit/gateway'

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
    proxy: {
      [apiBaseUrl]: {
        target: apiDevServeUrl,
        changeOrigin: true,
        pathRewrite: { [`^${apiBaseUrl}`]: apiBaseUrl },
      },
    },
  },
}
