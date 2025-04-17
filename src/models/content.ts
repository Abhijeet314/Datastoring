// models/Content.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define interface for Content document
export interface IContent extends Document {
  _id(_id: any): void;
  title: string;
  description: string;
  content: string;
  categories: string[];
  contentType: string;
  format: string;
  platform: string;
  marketingPatterns: string[];
  engagementMetrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    conversionRate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const ContentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    categories: { type: [String], default: [] },
    contentType: { type: String, required: true },
    format: { type: String, required: true },
    platform: { type: String, required: true },
    marketingPatterns: { type: [String], default: [] },
    engagementMetrics: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      conversionRate: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Create and export the model
export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);