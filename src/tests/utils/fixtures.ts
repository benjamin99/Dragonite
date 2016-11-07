import * as Promise from 'bluebird';
import * as _ from 'lodash';
import { Model, Document } from 'mongoose';
import { IEvent, Event } from '../../models/Events';

export function insertFixtures(model: Model<any>, data: any[]) {
  return Promise.map(data, function(item) {
    return new model(item);
  });
}

export function insterEventFixtures(data: any[]) {
  const fixtures = _.map(data, item => {
    return {
      title: item.title,
      content: item.content,
      duration: item.duration, 
      location: [item.longitude, item.latitude],
      image_url: item.imageUrl
    };
  });

  return insertFixtures(Event, fixtures);
}

export const deleteFixtures = Promise.coroutine(function*(fixtures: Document[]) {
  if (!fixtures || !fixtures.length) {
    return;
  }

  for (let fixture of fixtures) {
    yield fixture.remove();
  }
});
