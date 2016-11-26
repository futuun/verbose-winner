const webpack = require('webpack')
const { dependencies } = require('./package.json')

const DLL = './dll'
const config = {
  entry: {
    vendors: Object.keys(dependencies),
  },

  devtool: 'cheap-module-source-map',

  output: {
    path: DLL,
    filename: '[name].js',
    library: '[name]_dll',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: `${DLL}/[name]-manifest.json`,
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_dll',
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
}

module.exports = config
