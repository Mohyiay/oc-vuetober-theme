var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
    config.set({
        browsers: [
            'ChromeHeadless',
            // 'PhantomJS',
        ],
        frameworks: ['mocha', 'chai-dom', 'sinon-chai'],
        reporters: ['spec', 'coverage'],
        files: [
            '../../node_modules/babel-polyfill/dist/polyfill.js',
            './index.js',
        ],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' },
            ],
        },
    });
}
