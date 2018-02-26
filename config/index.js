

// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

require('dotenv').config();

const path = require('path');

const host = process.env.VUETOBER_URL || 'localhost';

module.exports = {
    dev: {
        assetsPublicPath: '/',
        assetsSubDirectory: 'static',
        autoOpenBrowser: true,
        cacheBusting: true, // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cssSourceMap: true,
        devtool: 'cheap-module-eval-source-map', // https://webpack.js.org/configuration/devtool/#development
        errorOverlay: true,
        host: process.env.VUETOBER_HOST || 'localhost',
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        proxyTable: {
            '/__october__': {
                target: host,
                changeOrigin: true,
                pathRewrite: {
                    '^/__october__': host,
                },
            },
        },
        showEslintErrorsInOverlay: false,
        useEslint: true,
    },

    build: {
        assetsPublicPath: '/themes/__vuetober__/assets/',
        assetsRoot: path.resolve(__dirname, '../assets'),
        assetsSubDirectory: 'static',
        bundleAnalyzerReport: process.env.npm_config_report,
        devtool: '#source-map', // https://webpack.js.org/configuration/devtool/#production
        index: path.resolve(__dirname, '../dist/index.html'),
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        productionSourceMap: true,
    },
};
