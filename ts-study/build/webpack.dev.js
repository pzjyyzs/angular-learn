const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devServer: {},
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.less/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  }
});
