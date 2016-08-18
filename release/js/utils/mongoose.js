"use strict";
const _mongoose = require('mongoose');
const Promise = require('bluebird');
const LOCAL_URI = 'mongodb://localhost/dragonite';
const MLAB_URI = 'mongodb://heroku_9fkkgfwk:7c6b8rr1fjpk2mfe08q9icqjkk@ds161255.mlab.com:61255/heroku_9fkkgfwk';
const USE_LOCAL = false;
const MONGODB_URI = USE_LOCAL ? LOCAL_URI : MLAB_URI;
console.log('conntect mongodb: ' + MONGODB_URI);
_mongoose.connect(MONGODB_URI);
_mongoose.Promise = Promise;
const database = _mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
    console.log('connected to the database');
});
exports.mongoose = _mongoose;
