import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as joi from 'joi';
import {EventDocument, Event} from '../models/Events';

const DEFAULT_RANGE = 1; // in km

const eventListSchema = joi.object().keys({
  all: joi.boolean().default(false),
  range: joi.number(),
  latitude: joi.number(),
  longitude: joi.number()
}).and('longitude', 'latitude');

const joiValidate: (value: any, schema: joi.Schema) => void = Promise.promisify(joi.validate);

function normalizedEventInfo(e: EventDocument) {
  return {
    id: e._id,
    created: e.created.getTime() / 1000,
    duration: e.duration,
    end: e.end,
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
    location: [body.longitude, body.latitude],
    image_url: body.imageUrl,
    duration: body.duration
  });

  yield event.save();

  this.type = 'json';
  this.status = 201;
  this.body = normalizedEventInfo(event);
};

export function *list(): any {

  let form = undefined;
  try {
    form = yield joiValidate(this.query, eventListSchema);
  } catch (error) {
    this.type = 'json';
    this.status = 400;
    this.body = error;
    return;
  }

  let events; 
  
  if (form.range) {

    const center = [form.longitude, form.latitude];
    const range = (form.range || DEFAULT_RANGE) / 100;
    events = yield Event.find({
      location: {
        $nearSphere: center,
        $maxDistance: range
      }
    }).limit(100).exec();

  } else {
    events = yield Event.find({}).limit(100).exec();
  }

  if (!form.all) {
    events = _.filter(events, (e: EventDocument) => { return e.end > Date.now(); });
  }

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
  event.confirms = event.confirms + 1;
  yield event.save();
  this.type = 'json';
  this.status = 200;
  this.body  = normalizedEventInfo(event);
};
