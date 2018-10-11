require('dotenv').config();

const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

const { API_URL, NODE_ENV, ORG_ID } = process.env;

function getFilename(isProd, extension = 'js') {
  return `[name]${isProd ? '-[contenthash:16]' : ''}.${extension}`;
}

module.exports = (env, argv) => {
  const PROD = argv.mode === 'production';

  return {
    context: path.join(__dirname),
    entry: {
      app: './client.js',
      vendor: [
        'classnames',
        'history',
        'isomorphic-fetch',
        'lodash',
        'moment',
        'moment-timezone',
        'prop-types',
        'react',
        'react-bootstrap',
        'react-dom',
        'react-redux',
        'react-router-bootstrap',
        'react-router-dom',
        'redux',
        'redux-thunk',
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
        },
        {
          test: /\.css$/,
          use: [
            // PROD ? MiniCssExtractPlugin.loader : 'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 0,
                modules: false,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            // PROD ? MiniCssExtractPlugin.loader : 'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          // Inline base64 URLs for <=8k images, direct URLs for the rest
          test: /\.(png|jpg)$/,
          use: 'url-loader?limit=8192',
        },
      ],
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin({
          cache: true,
          uglifyOptions: { output: { comments: false } },
        }),
      ],
      splitChunks: {
        minChunks: Infinity,
        name: 'vendor',
      },
    },
    output: {
      chunkFilename: getFilename(PROD),
      filename: getFilename(PROD),
      path: path.resolve(__dirname, 'public', 'build'),
      publicPath: '/build/',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_URL: JSON.stringify(API_URL),
          NODE_ENV: JSON.stringify(NODE_ENV),
          ORG_ID: JSON.stringify(ORG_ID),
        },
      }),
      // Don't pull in all of Moment's locales
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new ManifestPlugin({
        fileName: 'webpack-manifest.json',
      }),
      new MiniCssExtractPlugin({
        filename: getFilename(PROD, 'css'),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
      ],
    },
  };
};
