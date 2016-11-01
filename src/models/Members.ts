import { Schema } from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const memberSchema = new Schema({
  username: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  deleted: { type: Date }
});

export interface IMember {
  username: string;
  created: Date;
  updated: Date;
  deleted: Date;
};

export interface MemberDocument extends IMember, Mongoose.Document {};
export const Member: Mongoose.Model<MemberDocument> = Mongoose.model<MemberDocument>('Reaction', memberSchema);
