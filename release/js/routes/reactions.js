"use strict";
const Promise = require('bluebird');
const joi = require('joi');
const listSchema = {
    all: joi.boolean().default(false)
};
const joiValidate = Promise.promisify(joi.validate);
function normalizedReactionInfo(reaction) {
    return {
        id: reaction._id,
        type: reaction.type,
        memberId: reaction.memberId,
        created: reaction.created.getTime() / 1000,
        deleted: reaction.deleted.getTime() / 1000
    };
}
function* list() {
    // TODO ...
    return null;
}
exports.list = list;
;
function* create() {
    // TODO ...
    return null;
}
exports.create = create;
;
function* destroy() {
    // TODO:
    return null;
}
exports.destroy = destroy;
;
