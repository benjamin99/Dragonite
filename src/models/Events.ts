import {mongoose} from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  content: String
});

export interface IEvent {
  title: string;
  content?: string;
}

export interface EventDocument extends IEvent, Mongoose.Document {};
export let Event: Mongoose.Model<EventDocument> = Mongoose.model<EventDocument>('Event', eventSchema);

