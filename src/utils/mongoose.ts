import * as _mongoose from 'mongoose';
import * as _autoIncrement from 'mongoose-auto-increment';
import * as Promise from 'bluebird';
import { config } from '../config';

const MONGODB_URI = config.mongodb;

console.log('conntect mongodb: ' + MONGODB_URI);

_mongoose.connect(MONGODB_URI);
(<any> _mongoose).Promise = Promise;
const database = _mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('connected to the database');
});

_autoIncrement.initialize(_mongoose.connection);

export const mongoose = _mongoose;
export const Schema = _mongoose.Schema;
export const autoIncrement = _autoIncrement;
