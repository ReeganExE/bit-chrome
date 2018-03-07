const Copy = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    background: './src/index.js',
    options: './src/options.js'
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
    copy('src/manifest.json', 'src/icon.png', 'src/options.html')
  ]
};

function copy(...args) {
  return new Copy(args.map(arg => (typeof arg === 'string' ? { from: arg } : arg)));
}
