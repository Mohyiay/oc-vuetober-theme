'use strict'

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const glob = require('glob-all');
const merge = require('webpack-merge');
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');

const env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : require('../config/prod.env');

const webpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    module: {
        rules: utils.styleLoaders({
            extract: true,
            sourceMap: config.build.productionSourceMap,
            usePostCSS: true,
        })
    },
    output: {
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        path: config.build.assetsRoot,
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
          'process.env': env
        }),

        new UglifyJsPlugin({
            parallel: true,
            sourceMap: config.build.productionSourceMap,
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
        }),

        // extract css into its own file
        new ExtractTextPlugin({
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            // when true all css will be extracted to one file
            allChunks: true,
            filename: utils.assetsPath('css/[name].[contenthash].css'),
        }),

        // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
        // for more information about purgecss.
        new PurgecssPlugin({
            paths: glob.sync([
                path.join(__dirname, './../src/index.html'),
                path.join(__dirname, './../**/*.vue'),
                path.join(__dirname, './../src/**/*.js')
            ]),
            whitelist: [
                'html', 
                'body',
            ],
        }),

        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunksSortMode: 'dependency',
            filename: path.resolve(__dirname, '../pages/index.htm'),
            inject: true,
            minify: {
                // https://github.com/kangax/html-minifier#options-quick-reference
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            template: 'index.htm',
        }),

        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),

        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),

        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks (module) {
                // any required modules inside node_modules are extracted to vendor
                return module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0;
            },
        }),

        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: Infinity,
            name: 'manifest',
        }),

        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        new webpack.optimize.CommonsChunkPlugin({
            async: 'vendor-async',
            children: true,
            minChunks: 3,
            name: 'app',
        }),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../static'),
              ignore: ['.*'],
              to: config.build.assetsSubDirectory,
            },
        ]),
    ],
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            asset: '[path].gz[query]',
            minRatio: 0.8,
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
