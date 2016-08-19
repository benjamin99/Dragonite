import {mongoose} from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  content: String,
  image_url: String,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  created: { type: Date, default: Date.now },
  duration: { type: Number, default: 300000 },
  confirms: { type: Number, default: 0 }
});

export interface IEvent {
  title: string;
  content?: string;
  image_url?: string;
  latitude: number;
  longitude: number;
  created: Date;
  duration: number;
  confirms: number;
}

export interface EventDocument extends IEvent, Mongoose.Document {};
export let Event: Mongoose.Model<EventDocument> = Mongoose.model<EventDocument>('Event', eventSchema);
