"use strict";
const Promise = require('bluebird');
function insertFixtures(model, data) {
    return Promise.map(data, function (item) {
        return new model(item);
    });
}
exports.insertFixtures = insertFixtures;
exports.deleteFixtures = Promise.coroutine(function* (fixtures) {
    if (!fixtures || !fixtures.length) {
        return;
    }
    for (let fixture of fixtures) {
        yield fixture.remove();
    }
});
