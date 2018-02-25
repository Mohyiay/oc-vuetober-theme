// for tests that are only working with global components,
// there is no need to define a mount() function. we can
// use the default one, which is just an empty factory.

//
// specs
//
describe('<v-button>', function () {
    it('emits a click event', function () {
        const onClick = sinon.stub();

        vm = mount({
            methods: { onClick },
            template: `<v-button @click="onClick" />`,
        });

        click(vm.$el);

        expect(onClick).to.have.been.called;
    });

    it('renders default slot content', function () {
        vm = mount({
            template: `<v-button>Hello world</v-button>`,
        });

        expect(vm.$el).to.have.text('Hello world');
    });

    it('renders an anchor tag when "href" prop is present', function () {
        vm = mount({
            template: `<v-button href="#foo" />`,
        });

        expect(vm.$el.tagName).to.equal('A');
        expect(vm.$el).to.have.attr('href', '#foo');
    });

    it('interacts with the router when a "to" prop is present', function () {
        vm = mount({
            template: `<v-button to="/foo" />`,
        });

        const push = sinon.stub(vm.$router, 'push');

        click(vm.$el);

        expect(vm.$el).to.have.attr('href', '#/foo');
        expect(push).to.have.been.calledWithMatch({ path: '/foo' });
    });
});
