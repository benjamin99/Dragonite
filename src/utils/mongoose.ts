import * as _mongoose from 'mongoose';
import * as Promise from 'bluebird';

_mongoose.connect('mongodb://localhost/dragonite');
_mongoose.Promise = Promise;
const database = _mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('connected to the database');
});

export const mongoose = _mongoose;
