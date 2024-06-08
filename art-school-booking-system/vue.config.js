const { defineConfig } = require('@vue/cli-service')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false, // 取消默认的错误遮罩展示
    },
  },
  configureWebpack: {
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        onErrors(severity, errors) {
          const error = errors[0];
          if (error && error.message.includes('ResizeObserver loop completed with undelivered notifications')) {
            return false;
          }
        },
      }),
    ],
  },
});