// these are the routes for your appllcation. this is a
// good place to define points using dynamic imports
// https://webpack.js.org/guides/code-splitting/#dynamic-imports
export default [

    //
    // home
    //
    {
        name: 'home',
        path: '/',
        component: () => import('src/pages/home/home'),
    },

    //
    // videos
    //
    {
        name: 'videos',
        path: '/videos',
        component: () => import('src/pages/videos/videos'),
    },
];
