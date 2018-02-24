import Vue from 'vue';
import VueRouter from 'vue-router';
import rootComponent from './root';
import routes from 'src/app/routes';

// bootstrap our application
import './app/boot';

// instantiate a router
const router = new VueRouter({
    mode: 'history',
    routes,
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(rootComponent),
    router,
});
