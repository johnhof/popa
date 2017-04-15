'use strict';

const PATH = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: PATH.resolve(__dirname, '../dist'),
    filename: 'webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
}
