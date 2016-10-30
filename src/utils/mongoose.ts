import * as _mongoose from 'mongoose';
import * as Promise from 'bluebird';
import {config} from '../config';

const MONGODB_URI = config.mongodb;

console.log('conntect mongodb: ' + MONGODB_URI);

_mongoose.connect(MONGODB_URI);
(<any> _mongoose).Promise = Promise;
const database = _mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('connected to the database');
});

export const mongoose = _mongoose;
