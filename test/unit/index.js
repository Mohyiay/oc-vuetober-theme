import axios from 'axios';
import Vue from 'vue';

import './helpers';

// boot up our application
import 'src/app/boot';

// turn off hints, we know what we're doing
Vue.config.devtools = false;
Vue.config.productionTip = false;

// global setup function
beforeEach(function () {
    // reset all axios stubs
    axios.reset();

    // reset global vm containers
    ['vm'].forEach((varName) => {
        if (window[varName] !== null) window[varName] = null;
    });
});

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// files to ignore from code coverage
const blacklist = [
    './app/routes.js',
    './index.htm',
    './main.js',
];

// require all src files that aren't blacklisted for coverage
const srcContext = require.context('../../src', true, /^\.\/(.*)(\.vue$|\.js$)/);
srcContext.keys().filter(file => blacklist.indexOf(file) === -1).forEach(srcContext);
