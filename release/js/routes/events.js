"use strict";
const _ = require('lodash');
const Events_1 = require('../models/Events');
function normalizedEventInfo(e) {
    return {
        id: e._id,
        created: e.created,
        title: e.title,
        imageUrl: e.image_url,
        content: e.content,
        latitude: e.latitude,
        longitude: e.longitude
    };
}
function* create() {
    const body = this.request.body;
    const event = new Events_1.Event({
        title: body.title,
        content: body.content,
        latitude: body.latitude,
        longitude: body.longitude,
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
    const events = yield Events_1.Event.find({}).limit(100).lean().exec();
    this.type = 'json';
    this.status = 200;
    this.body = {
        content: _.map(events, normalizedEventInfo),
        count: events.length
    };
}
exports.list = list;
;
