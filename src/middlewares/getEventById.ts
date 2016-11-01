import { Event } from '../models/Events';
import { ERROR_CODE } from '../common/error';

export function getEventById(options?: any) {
  
  return function*(next): any {
    const eventId = this.params.id;
    const event = this.state.event = yield Event.findOne({ _id: eventId });

    if (!event) {
      this.status = 404;
      this.type = 'json';
      this.body = {
        error: ERROR_CODE.eventNotFound,
        message: 'cannot found the event with the requested eventId'
      };
      return;
    }

    yield next;
  };
}
