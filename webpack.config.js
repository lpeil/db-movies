const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.jsx'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg)$/i,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: './src/assets/favicon.svg',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
    port: 3000,
  },
};