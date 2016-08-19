"use strict";
const Devices_1 = require('../models/Devices');
function getDeviceById(options) {
    return function* (next) {
        const deviceId = this.params.deviceId;
        let device = undefined;
        try {
            device = this.state.device = yield Devices_1.Device.findOne({ '_id': deviceId });
        }
        catch (error) {
            this.status = 400;
            this.type = 'json';
            this.body = {
                error: 1001,
                message: error.message || 'unknown error'
            };
            return;
        }
        if (!device) {
            this.status = 404;
            this.type = 'json';
            this.body = {
                error: 1002,
                message: 'cannot found the device with the requested deviceId'
            };
            return;
        }
        yield next;
    };
}
exports.getDeviceById = getDeviceById;
;
