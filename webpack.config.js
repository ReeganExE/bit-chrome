const Copy = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'background.js'
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    copy('src/manifest.json', 'src/icon.png', 'src/options.html', 'src/options.js')
  ].concat(PROD ? new UglifyJSPlugin({
    uglifyOptions: {
      beautify: false,
      ecma: 6,
      compress: true,
      comments: false
    }
  }) : [])
};

function copy(...args) {
  return new Copy(args.map(arg => (typeof arg === 'string' ? { from: arg } : arg)));
}
