"use strict";
const chai_1 = require('chai');
const should = chai_1.should(); // tslint:ignore-line
describe('routes', function () {
    it('health check', function* () {
        const response = yield this.request.get('/');
        console.log(response.text);
        response.text.should.equals('ok');
    });
});
