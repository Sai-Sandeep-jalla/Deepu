import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, default: 'Special Day' },
    imageUrl: { type: String, default: '' },
    category: { type: String, default: 'Milestone' },
    icon: { type: String, default: 'Sparkles' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Memory || mongoose.model('Memory', memorySchema);
