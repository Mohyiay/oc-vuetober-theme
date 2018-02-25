import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import initialize from 'src/app/store/initialize';
import modules from 'src/app/store/modules';
import rootComponent from './root';
import routes from 'src/app/routes';
import { isProduction } from 'src/app/constants';
import { sync } from 'vuex-router-sync';

// bootstrap our application
import './app/boot';

// create a router
const router = new VueRouter({
    routes,
    mode: 'history',
});

// create a store
const store = new Vuex.Store({
    modules,
    strict: !isProduction,
});

// configure axios and initialize our store
const metaData = document.querySelector('meta[name=vuetober]');

if (metaData) {
    const data = JSON.parse(metaData.content);

    // attach a csrf token to all local requests
    axios.interceptors.request.use((config) => {
        if (config.url.startsWith('/')) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    'X-CSRF-TOKEN': data.token,
                },
            };
        }

        return config;
    });

    initialize(store, data);
}

// sync the store with our router
sync(store, router);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(rootComponent),
    router,
    store,
});
