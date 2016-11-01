import { Schema } from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const replySchema = new Schema({
  cotent: String,
  memberId: { type: Schema.Types.ObjectId, ref: 'Members' },
  created: { type: Date, default: Date.now },
  deleted: { type: Date }
});

export interface IReply {
  content: string;
  memberId: string;
  created: Date;
  deleted: Date;
};

export interface ReplyDocument extends IReply, Mongoose.Document {};
export const Reply: Mongoose.Model<ReplyDocument> = Mongoose.model<ReplyDocument>('Reply', replySchema);
