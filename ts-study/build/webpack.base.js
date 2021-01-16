const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: resolve(__dirname, '../src/ts/index.ts'),
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.(gif|jpg|jpeg|png|svg|ico)$/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 30000,
          name: '[name].[hash:8].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ts-study',
      template: resolve(__dirname, '../src/index.html'),
      favicon: resolve(__dirname, '../src/favicon.ico'),
      meta: {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no user-scalable=no',
        'apple-touch-fullscreen': 'yes'
      }
    })
  ]
}
