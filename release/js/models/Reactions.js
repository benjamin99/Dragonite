"use strict";
const mongoose_1 = require('../utils/mongoose');
const Mongoose = require('mongoose');
const reactionSchema = new mongoose_1.Schema({
    type: Number,
    memberId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Members' },
    created: { type: Date, default: Date.now },
    deleted: { type: Date }
});
;
;
exports.Reaction = Mongoose.model('Reaction', reactionSchema);
