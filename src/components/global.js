// global component registration. any components defined
// here will be available throughout the site. be aware
// they will all be downloaded in the initial request.

import slide from './transitions/slide';

export default {

    //
    // transitions
    //
    'v-slide-transition': slide,
};
