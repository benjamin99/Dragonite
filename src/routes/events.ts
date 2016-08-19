import * as _ from 'lodash';
import {EventDocument, Event} from '../models/Events';

export function normalizedEventInfo(e: EventDocument) {
  return {
    id: e._id,
    created: e.created.getTime(),
    duration: e.duration,
    title: e.title,
    imageUrl: e.image_url,
    content: e.content,
    latitude: e.latitude,
    longitude: e.longitude,
    confirms: e.confirms
  };
}

export function *create(): any {

  const body = this.request.body;
  const event = new Event({
    title: body.title, 
    content: body.content,
    duration: body.duration,
    latitude: body.latitude,
    longitude: body.longitude,
    image_url: body.imageUrl
  });

  yield event.save();

  this.type = 'json';
  this.status = 201;
  this.body = normalizedEventInfo(event);
};

export function *list(): any {

  const events: [any] = yield Event.find({}).limit(100).exec();
  this.type = 'json';
  this.status = 200;
  this.body = {
    content: _.map(events, normalizedEventInfo),
    count: events.length
  };
};

export function *show() {
  const event = this.state.event;
  this.type = 'json';
  this.status = 200;
  this.body  = normalizedEventInfo(event);
}

export function *makeConfirm() {
  const event = this.state.event;
  event.confirmed = event.confirmed + 1;
  yield event.save();
  this.type = 'json';
  this.status = 200;
  this.body  = normalizedEventInfo(event);
};
