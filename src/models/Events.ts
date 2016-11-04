import { Schema } from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const eventSchema = new Schema({
  title: String,
  content: String,
  image_url: String,
  location: {
    type: [Number],
    index: '2d',
    required: true
  },
  memberId: { type: Schema.Types.ObjectId, ref: 'Members' },
  created: { type: Date, default: Date.now },
  duration: { type: Number, default: 300 },
  confirms: { type: Number, default: 0 },
  reactions: [
    {type: Schema.Types.ObjectId, ref: 'Reactions'}
  ],
  replys: [
    {type: Schema.Types.ObjectId, ref: 'Replies' }
  ]
});

eventSchema.virtual('end').get(function() {
  return this.created.getTime() / 1000 + this.duration + deltaTimeWithConforms(this.confirms);
});

eventSchema.virtual('longitude').get(function() {
  return this.location[0];
});

eventSchema.virtual('latitude').get(function() {
  return this.location[1];
});

function deltaTimeWithConforms(confirms: number) {
  return Math.round(Math.min(confirms, 100 * Math.exp(-0.1 * confirms)));
}

export interface IEvent {
  title: string;
  content?: string;
  image_url?: string;
  memberId: string;
  latitude: number;
  longitude: number;
  created: Date;
  duration: number;
  confirms: number;
  end: number;
  reactions: [string];
  replies: [string];
}

export interface EventDocument extends IEvent, Mongoose.Document {};
export const Event: Mongoose.Model<EventDocument> = Mongoose.model<EventDocument>('Event', eventSchema);
