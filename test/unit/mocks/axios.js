import realAxios from '../../../node_modules/axios';

// in our test environment, this object will be
// used in place of axios. doing this allows
// us to stub any xhr that the app makes.
export default {

    // stub xhr requests
    delete: sinon.stub().resolves({}),
    get: sinon.stub().resolves({}),
    patch: sinon.stub().resolves({}),
    post: sinon.stub().resolves({}),
    put: sinon.stub().resolves({}),

    // use the real axios cancellation token
    CancelToken: realAxios.CancelToken,

    // helper function to reset all xhr stubs
    reset() {
        this.delete.reset();
        this.get.reset();
        this.patch.reset();
        this.post.reset();
        this.put.reset();
    },
};
