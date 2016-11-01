"use strict";
const Devices_1 = require('../models/Devices');
const error_1 = require('../common/error');
function getDeviceById(options) {
    return function* (next) {
        const deviceId = this.params.id;
        const device = this.state.device = yield Devices_1.Device.findOne({ _id: deviceId });
        if (!device) {
            this.status = 404;
            this.type = 'json';
            this.body = {
                error: error_1.ERROR_CODE.deviceNotFound,
                message: 'cannot found the device with the requested deviceId'
            };
            return;
        }
        yield next;
    };
}
exports.getDeviceById = getDeviceById;
;
