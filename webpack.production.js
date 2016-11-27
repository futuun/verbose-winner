const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
/* eslint-disable no-unused-vars */
const postcss = require('postcss-loader')
const Promise = require('es6-promise').Promise
/* eslint-enable no-unused-vars */

const APP = path.resolve(`${__dirname}/app`)
const BUILD = path.resolve(`${__dirname}/build`)

const staticAssets = [{
  from: `${APP}/static`,
  to: `${BUILD}`,
}]

const config = {
  resolve: {
    modules: ['./app', 'node_modules']
  },

  entry: {
    app: [
      `${APP}/index`,
    ],
  },

  output: {
    pathinfo: false,
    path: BUILD,
    filename: '/[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
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
        loaders: ExtractTextPlugin.extract([
          'css-loader?minimize&modules&sourceMap&localIdentName=[hash:base64:5]',
          'postcss-loader?pack=custom',
          'resolve-url-loader',
          'sass-loader?outputStyle=expanded&indentedSyntax=true&sourceMap'
        ].join('!')),
      }, {
        test: /\.raw\.sass$/,
        loaders: ExtractTextPlugin.extract([
          'css-loader?minimize&sourceMap',
          'postcss-loader?pack=custom',
          'resolve-url-loader',
          'sass-loader?outputStyle=expanded&indentedSyntax=true&sourceMap'
        ].join('!')),
      }, {
        test: /\.pug$/,
        loader: 'pug-loader'
      }, {
        test: /\.png$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('/[name].css?[chunkhash]'),
    new CopyWebpackPlugin(staticAssets, {}),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        output: { path: './' },
        postcss: () => ({
          defaults: [autoprefixer],
          custom: [
            autoprefixer({
              browsers: [
                'last 2 versions'
              ]
            })
          ]
        })
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {
        drop_debugger: true,
        drop_console: true,
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Hangman',
      filename: 'index.html',
      template: `${APP}/index.pug`,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],

  devtool: 'source-map',
  profile: false,
  stats: {
    hash: true,
    version: true,
    timings: true,
    assets: true,
    chunks: true,
    modules: true,
    reasons: true,
    children: false,
    source: true,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true,
  },
}

module.exports = config
