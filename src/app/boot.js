import Vue from 'vue';

// register plugins
import './plugins/router';

// register global components
import globalComponents from 'src/components/global';

Object.keys(globalComponents).forEach((name) => {
    Vue.component(name, globalComponents[name]);
});

// disable the production tip
Vue.config.productionTip = false;
