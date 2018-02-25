// https://eslint.org/docs/user-guide/configuring

module.exports = {
    env: { 
        mocha: true,
    },
    globals: { 
        click: true,
        expect: true,
        factory: true,
        mount: true,
        simulate: true,
        sinon: true,
        stubRequests: true,
        vm1: true,
        vm2: true,
        vm: true,
    },
    plugins: [
        'mocha',
    ],
    rules: {
        // mocha doesn't recommend arrow functions, this auto-fixes them
        'mocha/no-mocha-arrows': 'error',

        // allow unused variables
        'no-unused-vars': 0,

        // allow arrow functions to return assignments
        'no-return-assign': 0,

        // this rule conflicts with mocha/no-mocha-arrows, so lets disable it
        'prefer-arrow-callback': 0,

        // prevent auto-fixed quotes in our test environment
        'quotes': 0,
    }
}
