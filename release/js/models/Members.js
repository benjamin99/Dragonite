"use strict";
const mongoose_1 = require('../utils/mongoose');
const Mongoose = require('mongoose');
const memberSchema = new mongoose_1.Schema({
    username: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date },
    deleted: { type: Date }
});
;
;
exports.Member = Mongoose.model('Reaction', memberSchema);
