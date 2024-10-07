const { merge } = require('webpack-merge');
var path = require('path')
const common = require('./webpack.common.js');

var webpack = require('webpack')

module.exports = merge(common,{
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(true),
      PRODUCTION: JSON.stringify(false)
    })
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    client: {
      logging: 'error'
    },
    static: './dist',
  },
  performance: {
    hints: false
  },
});
