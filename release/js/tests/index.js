"use strict";
const request_1 = require('./utils/request');
const app = require('../');
describe('dragnote', function () {
    before(function* () {
        this.request = request_1.request(app);
    });
    require('./models');
    require('./routes');
});
