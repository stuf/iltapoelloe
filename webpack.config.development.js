/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import formatter from 'eslint-formatter-pretty';
import baseConfig from './webpack.config.base';

const port = process.env.PORT || 3000;

export default validate(merge(baseConfig, {
  debug: true,

  // devtool: 'inline-source-map',
  devtool: 'eval',

  entry: {
    vendor: [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
      'babel-polyfill',
      'jquery',
      'react', 'react-dom', 'redux', 'react-redux', 'react-router-redux', 'rxjs', 'ramda', 'partial.lenses',
      'karet', 'karet.util', 'bootstrap'
    ],
    bundle: [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
      './app/index'
    ]
  },
  // entry: [
  //   './app/index'
  // ],

  output: {
    filename: '[name].js',
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint-loader',
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/, loader: 'url-loader?limit=100000'
      },
      {
        test: /^((?!\.module).)*\.s[a|c]ss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
        // loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
        test: /\.module\.s[a|c]ss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
        // loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
        test: /\.global\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      },
    ]
  },

  eslint: {
    formatter
  },

  plugins: [
    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    // “If you are using the CLI, the webpack process will not exit with an error code by enabling this plugin.”
    // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    new webpack.NoErrorsPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    //
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   file: 'vendor.js',
    //   minChunks: Infinity
    // })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
}));
