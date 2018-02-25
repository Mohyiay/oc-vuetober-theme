import homeComponent from 'src/pages/home/home';
import { fetchRepositoryFixture } from './fixtures';

//
// factory
//
const mount = factory({
    components: {
        // any non-global components should be registered here
        'v-home': homeComponent,
    },
    modules: {
        // all modules registered in src/app/store/modules are
        // available by default. any lazy-loaded modules will
        // need to be registered here for the test environment
    },
    routes: [
        // if your component renders a <router-link> component
        // with a named route, you'll need to let the factory
        // know about them to prevent unknown route warnings
        'videos',
    ],
});

//
// specs
//
describe('home page', function () {
    // stub any xhr requests that the home page will make
    beforeEach(function () {
        stubRequests({
            get: {
                'https://api.github.com/repos/scottbedard/oc-vuetober-theme': fetchRepositoryFixture,
            },
        });
    });

    it('displays a welcome message', function () {
        vm = mount({
            template: `<v-home />`,
        });

        expect(vm.$el).to.contain('[data-test-welcome]');
    });

    it('fetches the number of github stars', function (done) {
        vm = mount({
            template: `<v-home ref="home" />`,
        });

        setTimeout(function () {
            // the star count should match the value in our fixture
            expect(vm.$refs.home.stars).to.equal(164);
            done();
        }, 10);
    });
});
