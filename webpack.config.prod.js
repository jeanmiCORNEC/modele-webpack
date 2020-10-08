// Fichier de configuration à utiliser dans un environnement de production

const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

let config = {
  entry: [
    './app/js/app.js',
    './app/scss/main.scss',
  ],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "js/app.js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      // Sass
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return autoprefixer({
                  overrideBrowserslist: ['last 4 versions']
                });
              }
            }
          },
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/style.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyPlugin([
      {
        from: 'app/assets/**',
        to: '.',
        toType: 'dir',
        transformPath: (targetPath) => targetPath.replace(/^app\/assets\//, '')
      }
    ]),
  ]
};

module.exports = config;
