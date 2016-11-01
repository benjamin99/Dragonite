import { Schema } from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const fbMemberSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'Members'},
  facebookId: String,
  facebookName: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date }
});

export interface IFbMember {
  memberId: string;
  facebookId: string;
  facebookName: string;
  created: Date;
  updated: Date;
};

export interface FbMemberDocument extends IFbMember, Mongoose.Document {};
export const Device: Mongoose.Model<FbMemberDocument> = Mongoose.model<FbMemberDocument>('FbMember', fbMemberSchema);
