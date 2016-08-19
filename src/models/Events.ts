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

eventSchema.virtual('end').get(function () {
  return this.created.getTime() + this.duration + deltaTimeWithConforms(this.confirms);
});

function deltaTimeWithConforms(confirms: number) {
  return Math.round(Math.min(confirms, 100 * Math.exp(-0.1 * confirms)));
}

export interface IEvent {
  title: string;
  content?: string;
  image_url?: string;
  latitude: number;
  longitude: number;
  created: Date;
  duration: number;
  confirms: number;
  end: number;
}

export interface EventDocument extends IEvent, Mongoose.Document {};
export let Event: Mongoose.Model<EventDocument> = Mongoose.model<EventDocument>('Event', eventSchema);
