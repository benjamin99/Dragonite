"use strict";
const Events_1 = require('../models/Events');
const eventFixtures = require('../tests/fixtures/events');
function* refresh() {
    yield Events_1.Event.remove({});
    for (let fixture of eventFixtures) {
        const event = new Events_1.Event({
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
}
exports.refresh = refresh;
;
