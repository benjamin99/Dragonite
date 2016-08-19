"use strict";
const mongoose_1 = require('../utils/mongoose');
const Mongoose = require('mongoose');
const eventSchema = new mongoose_1.mongoose.Schema({
    title: String,
    content: String,
    image_url: String,
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    created: { type: Date, default: Date.now },
    duration: { type: Number, default: 300000 },
    confirms: { type: Number, default: 0 }
});
eventSchema.virtual('end').get(function () {
    return this.created.getTime() + this.duration + deltaTimeWithConforms(this.confirms);
});
function deltaTimeWithConforms(confirms) {
    return Math.round(Math.min(confirms, 100 * Math.exp(-0.1 * confirms)));
}
;
exports.Event = Mongoose.model('Event', eventSchema);
