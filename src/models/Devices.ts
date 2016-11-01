import { mongoose } from '../utils/mongoose';
import * as Mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  token: String,
  latitude: Number,
  longitude: Number
});

export interface IDevice {
  token: string;
  latitude: number;
  longitude: number;
}

export interface DeviceDocument extends IDevice, Mongoose.Document {};
export const Device: Mongoose.Model<DeviceDocument> = Mongoose.model<DeviceDocument>('Device', deviceSchema);
