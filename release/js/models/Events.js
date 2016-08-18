"use strict";
const mongoose_1 = require('../utils/mongoose');
const Mongoose = require('mongoose');
const eventSchema = new mongoose_1.mongoose.Schema({
    title: String,
    content: String
});
;
exports.Event = Mongoose.model('Event', eventSchema);
