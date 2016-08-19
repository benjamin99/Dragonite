"use strict";
const _ = require('lodash');
const Promise = require('bluebird');
const joi = require('joi');
const Events_1 = require('../models/Events');
const eventListSchema = joi.object().keys({
    all: joi.boolean().default(false)
});
const joiValidate = Promise.promisify(joi.validate);
function normalizedEventInfo(e) {
    return {
        id: e._id,
        created: e.created.getTime(),
        duration: e.duration,
        end: e.end,
        title: e.title,
        imageUrl: e.image_url,
        content: e.content,
        latitude: e.latitude,
        longitude: e.longitude,
        confirms: e.confirms
    };
}
function* create() {
    const body = this.request.body;
    const event = new Events_1.Event({
        title: body.title,
        content: body.content,
        location: [body.longitude, body.latitude],
        image_url: body.imageUrl
    });
    yield event.save();
    this.type = 'json';
    this.status = 201;
    this.body = normalizedEventInfo(event);
}
exports.create = create;
;
function* list() {
    let form = undefined;
    try {
        form = yield joiValidate(this.query, eventListSchema);
    }
    catch (error) {
        this.type = 'json';
        this.status = 400;
        this.body = error;
        return;
    }
    let events = yield Events_1.Event.find({}).limit(100).exec();
    if (!form.all) {
        events = _.filter(events, (e) => { return e.end > Date.now(); });
    }
    this.type = 'json';
    this.status = 200;
    this.body = {
        content: _.map(events, normalizedEventInfo),
        count: events.length
    };
}
exports.list = list;
;
function* show() {
    const event = this.state.event;
    this.type = 'json';
    this.status = 200;
    this.body = normalizedEventInfo(event);
}
exports.show = show;
function* makeConfirm() {
    const event = this.state.event;
    event.confirms = event.confirms + 1;
    yield event.save();
    this.type = 'json';
    this.status = 200;
    this.body = normalizedEventInfo(event);
}
exports.makeConfirm = makeConfirm;
;
