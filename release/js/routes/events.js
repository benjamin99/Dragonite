"use strict";
const Events_1 = require('../models/Events');
function* create() {
    const body = this.request.body;
    const event = new Events_1.Event({
        title: body.title,
        content: body.content
    });
    yield event.save();
    this.type = 'json';
    this.status = 201;
    this.body = {
        title: event.title,
        content: event.content
    };
}
exports.create = create;
;
function* list() {
    const events = yield Events_1.Event.find({}).limit(100).lean().exec();
    this.type = 'json';
    this.status = 200;
    this.body = {
        events: events,
        count: events.length
    };
}
exports.list = list;
;
