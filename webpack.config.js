const path = require('path');

module.exports = {
  entry: {
    bundle: './app/index.ts'
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
  target: "ts-node",
  devtool: "source-map"
};