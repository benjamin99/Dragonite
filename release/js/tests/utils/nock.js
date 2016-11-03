"use strict";
const _nock = require('nock');
function defaultBodyFilter(body) { return true; }
;
function normalized(content) {
    let result = content;
    for (let key in content) {
        if (content.hasOwnProperty(key)) {
            let value = content[key];
            if (typeof value !== 'string') {
                continue;
            }
            result[key] = normalizedString(value);
        }
    }
    return result;
}
function normalizedString(value) {
    if (value[0] === '/' && value.slice(-1) === '/') {
        return RegExp(value.substring(1, value.length - 1));
    }
    return value;
}
function mock(options) {
    let scope = _nock(options.host);
    for (let route of options.routes || []) {
        if (route.method in ['post', 'put']) {
            let body = route.body ? normalized(route.body) : defaultBodyFilter;
            scope = scope[route.method](route.endpoint, body);
        }
        else {
            scope = scope[route.method](route.endpoint);
        }
        if (route.basicAuth) {
            scope = scope.matchHeader('Authorization', normalizedString(route.basicAuth));
        }
        // TODO: should fix the issues
        scope = scope
            .query(route.query ? normalized(route.query) : true)
            .times(route.times || Infinity)
            .reply(route.status, route.response);
    }
    return scope;
}
exports.mock = mock;
function cleanAll() {
    _nock.cleanAll();
}
exports.cleanAll = cleanAll;
