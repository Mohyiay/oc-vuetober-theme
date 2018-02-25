import Vue from 'vue';

//
// plugins
//
import './plugins/router';
import './plugins/vuex';

//
// global components
//
import globalComponents from 'src/components/global';

Object.keys(globalComponents).forEach((name) => {
    Vue.component(name, globalComponents[name]);
});

//
// config
//
Vue.config.productionTip = false;
