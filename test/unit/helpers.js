// click an element
window.click = function (el) {
    el.click();
};

// component factory
/* eslint-disable-next-line */
window.factory = (opts = {}) => require('spyfu-vue-factory').factory(opts);

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
