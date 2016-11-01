"use strict";
const mongoose_1 = require('../utils/mongoose');
const Mongoose = require('mongoose');
const replySchema = new mongoose_1.Schema({
    cotent: String,
    memberId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Members' },
    created: { type: Date, default: Date.now },
    deleted: { type: Date }
});
;
;
exports.Reply = Mongoose.model('Reply', replySchema);
