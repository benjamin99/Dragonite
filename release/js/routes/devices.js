"use strict";
const _ = require('lodash');
const Devices_1 = require('../models/Devices');
function normalizedDeviceInfo(d) {
    return {
        id: d._id,
        token: d.token,
        latitude: d.latitude,
        longitude: d.longitude
    };
}
function* create() {
    const body = this.request.body;
    const device = new Devices_1.Device({
        token: body.token,
        latitude: body.latitude,
        longitude: body.longitude
    });
    yield device.save();
    this.type = 'json';
    this.status = 201;
    this.body = normalizedDeviceInfo(device);
}
exports.create = create;
;
function* list() {
    const devices = yield Devices_1.Device.find({}).limit(100).exec();
    this.type = 'json';
    this.status = 200;
    this.body = {
        content: _.map(devices, normalizedDeviceInfo),
        count: devices.length
    };
}
exports.list = list;
;
function* show() {
    const device = this.state.device;
    this.type = 'json';
    this.status = 200;
    this.body = normalizedDeviceInfo(device);
}
exports.show = show;
;
function* destroy() {
    // TODO: ...
}
exports.destroy = destroy;
