import * as Promise from 'bluebird';
import { Model, Document } from 'mongoose';

export function insertFixtures(model: Model<any>, data: any[]) {
  return Promise.map(data, function(item) {
    return new model(item);
  });
}

export const deleteFixtures = Promise.coroutine(function*(fixtures: Document[]) {
  if (!fixtures || !fixtures.length) {
    return;
  }

  for (let fixture of fixtures) {
    yield fixture.remove();
  }
});
