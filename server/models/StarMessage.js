import mongoose from 'mongoose';

const starMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, default: 'Memory' },
    message: { type: String, required: true },
    x: { type: Number, default: 50 },
    y: { type: Number, default: 50 },
    constellation: { type: String, default: 'Orion' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.StarMessage || mongoose.model('StarMessage', starMessageSchema);
