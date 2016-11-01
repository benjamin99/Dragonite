import { Device } from '../models/Devices';
import { ERROR_CODE } from '../common/error';

export function getDeviceById(options?: any) {

  return function*(next): any {
    const deviceId = this.params.id;
    const device = this.state.device = yield Device.findOne({ _id: deviceId });

    if (!device) {
      this.status = 404;
      this.type = 'json';
      this.body = {
        error: ERROR_CODE.deviceNotFound,
        message: 'cannot found the device with the requested deviceId'
      };
      return;
    }

    yield next;
  };
};
