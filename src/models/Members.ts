import { Schema, autoIncrement } from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const MODEL_NAME = 'Member';

const memberSchema = new Schema({
  username: String,
  password: String,
  scopes: [String],
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  deleted: { type: Date }
});

memberSchema.plugin(autoIncrement.plugin, MODEL_NAME);

export interface IMember {
  username: string;
  password: string;
  scopes: [string];
  created: Date;
  updated: Date;
  deleted: Date;
};

export interface MemberDocument extends IMember, Mongoose.Document {};
export const Member: Mongoose.Model<MemberDocument> = Mongoose.model<MemberDocument>(MODEL_NAME, memberSchema);
