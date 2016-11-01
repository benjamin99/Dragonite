"use strict";
const Events_1 = require('../models/Events');
const error_1 = require('../common/error');
function getEventById(options) {
    return function* (next) {
        const eventId = this.params.id;
        const event = this.state.event = yield Events_1.Event.findOne({ _id: eventId });
        if (!event) {
            this.status = 404;
            this.type = 'json';
            this.body = {
                error: error_1.ERROR_CODE.eventNotFound,
                message: 'cannot found the event with the requested eventId'
            };
            return;
        }
        yield next;
    };
}
exports.getEventById = getEventById;
