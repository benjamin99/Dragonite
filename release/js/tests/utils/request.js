"use strict";
const superagent = require('supertest');
function request(app) {
    return superagent(app.listen());
}
exports.request = request;
;
