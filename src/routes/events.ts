import {Event} from '../models/Events';

export function *create(): any {

  const body = this.request.body;
  const event = new Event({
    title: body.title, 
    content: body.content
  });

  yield event.save();

  this.type = 'json';
  this.status = 201;
  this.body = {
    title: event.title,
    content: event.content
  };
};

export function *list(): any {

  const events: [any] = yield Event.find({}).limit(100).lean().exec();
  this.type = 'json';
  this.status = 200;
  this.body = {
    events: events,
    count: events.length
  };
};
