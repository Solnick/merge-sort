const path = require('path');

module.exports = {
  entry: {
    bundle: './app/index.ts'
  },
  mode: 'development',
  optimization: {
    minimize: false
  },
  output: {
    filename: 'build.js'
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['ts-loader', 'tslint-loader'],
        exclude: /node_modules/
      }
    ],
  },
  target: "node",
  devtool: "inline-source-map"
};