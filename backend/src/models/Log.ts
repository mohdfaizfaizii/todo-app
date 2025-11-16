import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  level: string;
  message: string;
  stack?: string;
  timestamp: Date;
  user?: string;
  endpoint?: string;
  method?: string;
}

const logSchema = new Schema<ILog>({
  level: {
    type: String,
    required: true,
    enum: ['error', 'warn', 'info'],
  },
  message: {
    type: String,
    required: true,
  },
  stack: String,
  user: String,
  endpoint: String,
  method: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ILog>('Log', logSchema);
