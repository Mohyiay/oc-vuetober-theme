'use strict';

const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const utils = require('./utils');

const sourceMapEnabled = isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap;

module.exports = {
    cacheBusting: config.dev.cacheBusting,
    cssSourceMap: sourceMapEnabled,
    loaders: utils.cssLoaders({
        extract: isProduction,
        sourceMap: sourceMapEnabled,
    }),
    transformToRequire: {
        image: 'xlink:href',
        img: 'src',
        source: 'src',
        video: ['src', 'poster'],
    }
}
