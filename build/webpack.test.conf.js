

const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const utils = require('./utils');
const path = require('path');
const webpack = require('webpack');

const webpackConfig = merge(baseWebpackConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    devtool: '#inline-source-map',
    module: {
        rules: utils.styleLoaders(),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/test.env'),
        }),
    ],
    resolve: {
        alias: {
            // global axios mock
            axios$: path.resolve(__dirname, '../test/unit/mocks/axios.js'),

            // allow inline templates in our test environment
            vue$: 'vue/dist/vue.common.js',
        },
    },
    resolveLoader: {
        alias: {
            // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
            // see discussion at https://github.com/vuejs/vue-loader/issues/724
            'scss-loader': 'sass-loader',
        },
    },
});

// no need for app entry during tests
delete webpackConfig.entry;

module.exports = webpackConfig;
