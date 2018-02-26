'use strict'

require('./check-versions')();

process.env.NODE_ENV = 'production';

const chalk = require('chalk');
const config = require('../config');
const ora = require('ora');
const path = require('path');
const rm = require('rimraf');
const shell = require('shelljs');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
shell.rm('-rf', assetsPath);
shell.mkdir('-p', assetsPath);
shell.config.silent = true;
shell.cp('-R', 'static/*', assetsPath);
shell.config.silent = false;

webpack(webpackConfig, (err, stats) => {
    spinner.stop();

    if (err) {
        throw err;
    }

    process.stdout.write(stats.toString({
        children: false, // <- this can show TypeScript errors during build
        chunkModules: false,
        chunks: false,
        colors: true,
        modules: false,
    }) + '\n\n')

    if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'));
        process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
});