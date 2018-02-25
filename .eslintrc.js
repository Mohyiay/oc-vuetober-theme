// https://eslint.org/docs/user-guide/configuring

module.exports = {
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/essential', 
        'airbnb-base',
    ],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    root: true,
    rules: {
        // allow annonymous functions
        'func-names': 0,
        
        // don't require .vue extension when importing
        'import/extensions': 0,

        // don't enforce an absolute/relative import order
        'import/first': 0,

        // allow modules to have a single named export
        'import/prefer-default-export': 0,

        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            optionalDependencies: [
                'test/unit/index.js',
            ],
        }],

        // indentation style
        'indent': ['error', 4],

        // allow console logs, they'll get removed by the minifier anyway
        'no-console': 0,

        // only allow debugger in development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': ['error', {
            ignorePropertyModificationsFor: [
                'acc', // for reduce accumulators
                'e', // for e.returnvalue
                'state', // for vuex state
            ],
            props: true,
        }],
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js',
            },
        },
    },
};

// module.exports = {
//     root: true,
//     parserOptions: {
//         parser: 'babel-eslint',
//         sourceType: 'module',
//     },
//     env: {
//         browser: true,
//     },
//     extends: [
//         'plugin:vue/essential', 
//         'airbnb-base',
//     ],
//     plugins: [
//         'vue',
//     ],
//     settings: {
//         'import/resolver': {
//             webpack: {
//                 config: 'build/webpack.base.conf.js',
//             },
//         },
//     },
//     rules: {
//         // allow annonymous functions
//         'func-names': 0,
        
//         // don't require .vue extension when importing
//         'import/extensions': 0,

//         // don't enforce an absolute/relative import order
//         'import/first': 0,

//         // allow modules to have a single named export
//         'import/prefer-default-export': 0,

//         // allow optionalDependencies
//         'import/no-extraneous-dependencies': ['error', {
//             optionalDependencies: [
//                 'test/unit/index.js',
//             ],
//         }],

//         // indentation style
//         'indent': ['error', 4],

//         // allow console logs, they'll get removed by the minifier anyway
//         'no-console': 0,

//         // only allow debugger in development
//         'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

//         // disallow reassignment of function parameters
//         // disallow parameter object manipulation except for specific exclusions
//         'no-param-reassign': ['error', {
//             ignorePropertyModificationsFor: [
//                 'acc', // for reduce accumulators
//                 'e', // for e.returnvalue
//                 'state', // for vuex state
//             ],
//             props: true,
//         }],
//     },
// }