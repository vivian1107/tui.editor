/**
 * @fileoverview Configs for i18n bundle file
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const entry = require('webpack-glob-entry');

const TerserPlugin = require('terser-webpack-plugin');

function getOptimizationConfig(isMinified) {
  let minimizer = [];

  if (isMinified) {
    minimizer.push(
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        extractComments: false
      })
    );
  }

  return { minimizer };
}

module.exports = (env, argv) => {
  const isMinified = !!argv.minify;

  return {
    mode: 'production',
    entry: entry(filePath => {
      if (!/en-us.js$/g.test(filePath)) {
        return path.basename(filePath);
      }
    }, './src/js/i18n/*.js'),
    output: {
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist/i18n'),
      publicPath: '/dist',
      filename: `[name]${isMinified ? '.min' : ''}.js`
    },
    externals: [
      {
        '../editor': {
          commonjs: 'tui-editor',
          commonjs2: 'tui-editor',
          amd: 'tui-editor',
          root: ['tui', 'Editor']
        }
      }
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre',
          options: {
            failOnError: true
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules|dist/,
          loader: 'babel-loader?cacheDirectory',
          options: {
            rootMode: 'upward'
          }
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin(
        [
          'TOAST UI Editor : i18n',
          `@version ${pkg.version}`,
          `@author ${pkg.author}`,
          `@license ${pkg.license}`
        ].join('\n')
      )
    ],
    optimization: getOptimizationConfig(isMinified)
  };
};