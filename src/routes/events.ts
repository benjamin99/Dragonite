import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';

mongoose.connect('mongodb://localhost/dragonite');
mongoose.Promise = Promise;
const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('connected to the database');
});

const eventSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Event = mongoose.model('Event', eventSchema);

export function create(title: string, content: string): any {
  return new Event({
    title: 'test',
    content: 'asldkjAPDSOG9UADF'
  });
};
