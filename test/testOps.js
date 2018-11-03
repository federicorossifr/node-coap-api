var expect = require('chai').expect;
var coapApi = require('../index.js');

describe('testTest',() => {
	it("Should test the test",() => {
		expect(true).to.equal(true);
	});
});

describe('testGet',() => {
	it("Should retrieve 'world'",done => {
		coapApi.GET('coap.me','hello','')
		.then(res => {
			expect(res.status).to.equal('2.05');
			expect(res.data).to.equal('world');
			done();
		})
		.catch(err => {
			done(err);
		});
	});
});

describe('testPost',() => {
	it("Should retrieve 'POST OK'",done => {
		coapApi.POST('coap.me','validate','','')
		.then(res => {
			expect(res.status).to.equal('2.01');
			expect(res.data).to.equal('POST OK');
			done();
		})
		.catch(err => {
			done(err);
		});
	});
});

describe('testPut',() => {
	it("Should retrieve 'PUT OK'",done => {
		coapApi.PUT('coap.me','validate','','')
		.then(res => {
			expect(res.status).to.equal('2.04');
			expect(res.data).to.equal('PUT OK');
			done();
		})
		.catch(err => {
			done(err);
		});
	});
});