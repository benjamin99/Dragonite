import * as Mongoose from 'mongoose';
import * as _ from 'lodash';
import { IEvent } from '../../models/Events';

import * as fixtureUtils from '../utils/fixtures';

const eventFixtures: IEvent[] = require('../fixtures/events');

describe('Events', function() {
  let events: IEvent[];

  before(function*() {
    events = yield fixtureUtils.insterEventFixtures(eventFixtures);
  });

  after(function*() {
    yield fixtureUtils.deleteFixtures(events);
  });

  it('should have the event properties been properly setup', function*() {
    for (const e of events) {
      _.assign(e, { imageUrl: e.image_url });
      const template = _.find(eventFixtures, fixture => fixture.title === e.title);
      template.should.eql({
        title: e.title,
        content: e.content,
        imageUrl: e.image_url,
        latitude: e.latitude,
        longitude: e.longitude,
        duration: e.duration
      });
    }
  });
});
