"use strict";
const mongoose_1 = require('../utils/mongoose');
const Mongoose = require('mongoose');
const fbMemberSchema = new mongoose_1.Schema({
    memberId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Members' },
    facebookId: String,
    facebookName: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date }
});
;
;
exports.Device = Mongoose.model('FbMember', fbMemberSchema);
