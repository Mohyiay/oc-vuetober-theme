import axios from 'axios';
import modules from 'src/app/store/modules';

// click an element
window.click = function (el) {
    el.click();
};

// component factory
/* eslint-disable-next-line */
window.factory = (opts = {}) => require('spyfu-vue-factory').factory({
    modules,
    ...opts,
});

// mount vue components that don't require any config
// this will usually be overwritten in spec files
window.mount = window.factory();

// simulate an html event
window.simulate = function (name, el, setupFn) {
    const e = new Event(name);

    if (setupFn) {
        setupFn(e);
    }

    return el.dispatchEvent(e);
};

// stub xhr requests
window.stubRequests = function (requests = {}) {
    Object.keys(requests).forEach((method) => {
        if (axios[method]) {
            Object.entries(requests[method] || {}).forEach(([endpoint, fixture]) => {
                axios[method].withArgs(endpoint).resolves({ data: fixture() });
            });
        }
    });
};
