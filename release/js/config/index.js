"use strict";
const _ = require('lodash');
const env = process.env.NODE_ENV || 'development';
exports.config = {
    version: process.env.VERSION || 1,
    port: process.env.SERVER_PORT || 80,
    host: process.env.SERVER_HOST || '0.0.0.0',
    mongodb: process.env.MONGODB,
    log: true
};
try {
    _.merge(exports.config, require(`./${env}`));
}
catch (error) {
    console.log(`Cannot load config from: ${env}`);
}
