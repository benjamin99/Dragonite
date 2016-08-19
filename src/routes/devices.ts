import * as _ from 'lodash';
import {DeviceDocument, Device} from '../models/Devices';


function normalizedDeviceInfo(d: DeviceDocument) {
  return {
    id: d._id,
    token: d.token,
    latitude: d.latitude,
    longitude: d.longitude
  };
}

export function *create(): any {
  const body = this.request.body;
  const device = new Device({
    token: body.token,
    latitude: body.latitude,
    longitude: body.longitude
  });

  yield device.save();

  this.type = 'json';
  this.status = 201;
  this.body = normalizedDeviceInfo(device);
};

export function *list(): any {
  const devices: [any] = yield Device.find({}).limit(100).lean().exec();
  this.type = 'json';
  this.status = 200;
  this.body = {
    devices: _.map(devices, normalizedDeviceInfo),
    count: devices.length
  };
};

export function *show(): any {
  const device = this.state.device;
  this.type = 'json';
  this.status = 200;
  this.body  = normalizedDeviceInfo(device);
};
