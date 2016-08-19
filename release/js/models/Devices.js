"use strict";
const mongoose_1 = require('../utils/mongoose');
const Mongoose = require('mongoose');
const deviceSchema = new mongoose_1.mongoose.Schema({
    token: String,
    latitude: Number,
    longitude: Number
});
;
exports.Device = Mongoose.model('Device', deviceSchema);
