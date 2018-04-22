const Copy = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    background: './src/index.js',
    options: './src/options/index.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    copy('src/manifest.json', 'src/icon.png', 'src/options/options.html')
  ],
  optimization: optimization()
};

function copy(...args) {
  return new Copy(args.map(arg => (typeof arg === 'string' ? { from: arg } : arg)));
}


function optimization() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  return {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 6,
          compress: true,
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ]
  };
}
