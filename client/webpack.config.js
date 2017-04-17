'use strict';

const PATH = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ENV = process.env;

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: ENV.NODE_ENV === "development"
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: PATH.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: './fonts/[name].[ext]',
        },
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
  ]
}
