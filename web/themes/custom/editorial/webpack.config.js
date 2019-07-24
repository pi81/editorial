const path = require('path');
const ExtractCss = require("mini-css-extract-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "js/main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.scss$/,
        use: [
          ExtractCss.loader, 'css-loader', 'postcss-loader', 'sass-loader'
        ]
      },
    ]
  },
  // devtool: 'source-map',
  plugins: [
    new ExtractCss({
      filename: 'css/main.css',
    }),
  ]
};
