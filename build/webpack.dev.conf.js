'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const portfinder = require('portfinder');
const utils = require('./utils');
const webpack = require('webpack');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        compress: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        historyApiFallback: {
            rewrites: [
                { 
                    from: /.*/, 
                    to: path.posix.join(config.dev.assetsPublicPath, 'index.htm') 
                },
            ],
        },
        host: HOST || config.dev.host,
        hot: true,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        port: PORT || config.dev.port,
        proxy: config.dev.proxyTable,
        publicPath: config.dev.assetsPublicPath,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    entry: {
        app: [
            'babel-polyfill',
            'event-source-polyfill', 
            './dev.js',
        ],
    },
    module: {
        rules: utils.styleLoaders({ 
            sourceMap: config.dev.cssSourceMap, 
            usePostCSS: true,
        }),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.

        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.htm',
            inject: true,
            minify: {
                // https://github.com/kangax/html-minifier#options-quick-reference
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            template: 'index.htm',
        }),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                ignore: ['.*'],
                to: config.dev.assetsSubDirectory,
            },
        ]),
    ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
