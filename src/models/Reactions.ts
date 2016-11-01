import { Schema } from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const reactionSchema = new Schema({
  type: Number,
  memberId: { type: Schema.Types.ObjectId, ref: 'Members' },
  created: { type: Date, default: Date.now },
  deleted: { type: Date }
});

export interface IReaction {
  type: number;
  memberId: string;
  created: Date;
  deleted: Date;
};

export interface ReactionDocument extends IReaction, Mongoose.Document {};
export const Reaction: Mongoose.Model<ReactionDocument> = Mongoose.model<ReactionDocument>('Reaction', reactionSchema);
