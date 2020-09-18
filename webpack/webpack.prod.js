const { resolve } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Webpack common config
const common = require('../webpack.config');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: '[name].[contentHash].js',
    chunkFilename: '[name].[contentHash].js',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          enforce: true,
        },
      },
    },
    runtimeChunk: 'single',
  },
  performance: {
    hints: 'warning',
    assetFilter: (fileName) =>
      !fileName.endsWith('.css') && !fileName.endsWith('.map'),
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/i,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new MiniCSSExtractPlugin({
      filename: '[name].[contentHash].css',
    }),
  ],
});
