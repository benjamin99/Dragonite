"use strict";
const _ = require('lodash');
const Promise = require('bluebird');
const joi = require('joi');
const Events_1 = require('../models/Events');
const DEFAULT_RANGE = 1; // in km
const eventListSchema = joi.object().keys({
    all: joi.boolean().default(false),
    range: joi.number(),
    latitude: joi.number(),
    longitude: joi.number()
}).and('longitude', 'latitude');
const joiValidate = Promise.promisify(joi.validate);
function normalizedEventInfo(e) {
    return {
        id: e._id,
        created: e.created.getTime() / 1000,
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
        image_url: body.imageUrl,
        duration: body.duration
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
    let events;
    if (form.range) {
        const center = [form.longitude, form.latitude];
        const range = (form.range || DEFAULT_RANGE) / 100;
        events = yield Events_1.Event.find({
            location: {
                $nearSphere: center,
                $maxDistance: range
            }
        }).limit(100).exec();
    }
    else {
        events = yield Events_1.Event.find({}).limit(100).exec();
    }
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
function* options() {
    const vlsOrigin = this.request.headers.ORIGIN;
    this.headers['Access-Control-Allow-Origin'] = vlsOrigin;
    this.headers['Access-Control-Allow-Methods'] = 'POST';
    this.headers['Access-Control-Allow-Headers'] = 'accept, content-type';
    this.headers['Access-Control-Max-Age'] = '1728000';
}
exports.options = options;
;
