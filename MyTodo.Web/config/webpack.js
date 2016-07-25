'use strict';

var webpack = require('webpack');

module.exports = function (release) {
  return {
    output: {
      path: './build/',
      filename: 'app.js',
      publicPatch: './build/'
    },

    cache: !release,
    debug: !release,
    devtool: false,
    entry: './src/App.jsx',

    stats: {
      colors: true,
      reasons: !release
    },

    plugins: release ? [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [],

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    module: {
      loaders: [
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.css$/,
            loader: 'style!css'
        },
        {
            test: /\.less$/,
            loader: 'style!css!less'
        },
        {
            test: /\.gif/,
            loader: 'url-loader?limit=10000&mimetype=image/gif'
        },
        {
            test: /\.jpg/,
            loader: 'url-loader?limit=10000&mimetype=image/jpg'
        },
        {
            test: /\.png/,
            loader: 'url-loader?limit=10000&mimetype=image/png'
        }
      ]
    }
  };
};
