"use strict";
const _ = require('lodash');
const Events_1 = require('../models/Events');
function normalizedEventInfo(e) {
    return {
        id: e._id,
        created: e.created.getTime(),
        duration: e.duration,
        title: e.title,
        imageUrl: e.image_url,
        content: e.content,
        latitude: e.latitude,
        longitude: e.longitude,
        confirms: e.confirms
    };
}
exports.normalizedEventInfo = normalizedEventInfo;
function* create() {
    const body = this.request.body;
    const event = new Events_1.Event({
        title: body.title,
        content: body.content,
        duration: body.duration,
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
    const events = yield Events_1.Event.find({}).limit(100).exec();
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
    event.confirmed = event.confirmed + 1;
    yield event.save();
    this.type = 'json';
    this.status = 200;
    this.body = normalizedEventInfo(event);
}
exports.makeConfirm = makeConfirm;
;
