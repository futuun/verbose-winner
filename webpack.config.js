const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: {
    modules: ['./app', 'node_modules']
  },

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './app/index.js',
    ],
  },
  cache: true,
  devtool: 'cheap-module-source-map',

  output: {
    pathinfo: true,
    path: '/',
    publicPath: '/',
    filename: '[name].js',
    library: 'futuun',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      }, {
        test: /\.sass$/,
        exclude: [/\.raw\.sass$/],
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader?outputStyle=expanded&indentedSyntax=true&sourceMap'
        ]
      }, {
        test: /\.raw\.sass$/,
        loaders: [
          'style-loader',
          'raw-loader',
          'resolve-url-loader',
          'sass-loader?outputStyle=expanded&indentedSyntax=true&sourceMap'
        ]
      }, {
        test: /\.pug$/,
        loader: 'pug-loader'
      }, {
        test: /\.png$/,
        loader: 'url-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Hangman',
      dll: ['./dll/vendors.js'],
      filename: 'index.html',
      template: './app/index.pug',
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./dll/vendors-manifest.json'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],
}
