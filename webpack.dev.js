const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entries = [
  path.join(__dirname, 'src/index.js')
];

module.exports = {
  name: 'Bundling dev',
  mode: 'development',
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/index.min.js'
  },
  devServer: {
    static: './dist',
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/*.html', to: "[name][ext]" },
      ]
    })
  ]
};