"use strict";
const _mongoose = require('mongoose');
const Promise = require('bluebird');
const config_1 = require('../config');
const MONGODB_URI = config_1.config.mongodb;
console.log('conntect mongodb: ' + MONGODB_URI);
_mongoose.connect(MONGODB_URI);
_mongoose.Promise = Promise;
const database = _mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
    console.log('connected to the database');
});
exports.mongoose = _mongoose;
