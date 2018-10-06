const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/scripts/app.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' }]),
    new HtmlWebpackPlugin({
      title: 'My Project',
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ]
};
