import {Event} from '../models/Events';

export function getEventById(options?: any) {
  
  return function*(next): any {
    const eventId = this.params.id;
    let event = undefined;
    try {
      event = this.state.event = yield Event.findOne({ _id: eventId });
    } catch (error) {
      this.status = 400;
      this.type = 'json';
      this.body = {
        error: 2001,
        message: error.message || 'unknown error'
      };
      return;
    }

    if (!event) {
      this.status = 404;
      this.type = 'json';
      this.body = {
        error: 2002,
        message: 'cannot found the event with the requested deviceId'
      };
      return;
    }

    yield next;
  };
}
