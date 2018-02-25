import realAxios from '../../../node_modules/axios';

module.exports = {

    // stub xhr requests
    delete: sinon.stub().resolves({}),
    get: sinon.stub().resolves({}),
    post: sinon.stub().resolves({}),
    put: sinon.stub().resolves({}),

    // use the real axios cancellation token
    CancelToken: realAxios.CancelToken,

    // helper function to reset all xhr stubs
    reset() {
        this.delete.reset();
        this.get.reset();
        this.post.reset();
        this.put.reset();
    },
};
