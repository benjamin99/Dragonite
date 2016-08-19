import {Event} from '../models/Events';

const eventFixtures = require('../tests/fixtures/events');

export function *refresh(): any {

  yield Event.remove({});

  for (let fixture of eventFixtures) {
    const event = new Event({
      title: fixture.title, 
      content: fixture.content,
      location: [fixture.longitude, fixture.latitude],
      image_url: fixture.imageUrl,
      duration: fixture.duration
    });

    yield event.save();
  }

  this.status = 200;
  this.type = 'json';
  this.body = eventFixtures;
};
