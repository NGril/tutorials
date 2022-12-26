const path = require('path');

module.exports = {
  mode: 'development',
  // app entry point
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    // can't use relative path to dist folder here
    path: path.resolve(__dirname, 'dist'),
    // for webpack dev server
    publicPath: 'dist'
  },
  // devtool source map enables us to use debugger with original ts files
  devtool: 'inline-source-map',
  // tells webpack to look for ts files
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    // tells webpack to resolve both ts and js files
    extensions: ['.ts', '.js']
  }
};