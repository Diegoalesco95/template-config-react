const { resolve, join } = require('path');
const { merge } = require('webpack-merge');

// Webpack common configuration
const common = require('../webpack.config');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(s*)css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: join(__dirname, '..', 'dist'),
    publicPath: '/',
    port: 3000,
    historyApiFallback: true,
  },
});
