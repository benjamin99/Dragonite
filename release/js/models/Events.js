"use strict";
const mongoose_1 = require('../utils/mongoose');
const Mongoose = require('mongoose');
const eventSchema = new mongoose_1.mongoose.Schema({
    title: String,
    content: String,
    image_url: String,
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    created: { type: Date, dedault: Date.now }
});
;
exports.Event = Mongoose.model('Event', eventSchema);
